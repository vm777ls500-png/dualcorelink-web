import type { LocalizedFileContent } from "@/content/locales";
import {
  validateCmsTranslation,
  type CmsTranslationRecord,
} from "./multilingual-cms";
import {
  auditMultilingualFoundation,
  type MultilingualAuditInput,
} from "./multilingual-audit";
import {
  hasApprovedPublicationGate,
  hasProductionReleaseGate,
  type MultilingualPublicationEntry,
} from "./multilingual-publication-manifest";
import type { MultilingualReleaseBatch } from "./multilingual-release-batches";
import { hasApprovedOwnerReviewWaiver } from "./owner-review-waiver";

const arabicP0OwnerWaiverWarning =
  "WARNING: Arabic P0 was released under owner review waiver and was not approved by an independent native Arabic reviewer.";

export type MultilingualReleaseCheckInput = MultilingualAuditInput & {
  localContent: readonly LocalizedFileContent[];
  cmsTranslations: readonly CmsTranslationRecord[];
  releaseScopeUrls?: readonly string[];
  ownerReviewWaiver?: NonNullable<
    MultilingualReleaseBatch["ownerReviewWaiver"]
  >;
};

export type MultilingualReleaseCheckResult = {
  errors: string[];
  warnings: string[];
  pendingUrls: string[];
  candidateCount: number;
  productionReleaseReadyCount: number;
  ownerReviewWaiverApprovedCount: number;
  releaseEligibleCount: number;
  cmsPayloadCount: number;
  cmsPayloadStructurallyReadyCount: number;
  cmsPayloadNativeApprovedCount: number;
  technicalValidationPassed: boolean;
};

function findCmsManifestEntry(
  manifest: readonly MultilingualPublicationEntry[],
  payload: CmsTranslationRecord,
): MultilingualPublicationEntry | undefined {
  return manifest.find(
    (entry) =>
      entry.locale === payload.locale &&
      entry.pageType === payload.contentType &&
      entry.slug === payload.sourceEnglishSlug,
  );
}

export function checkMultilingualProductionRelease(
  input: MultilingualReleaseCheckInput,
): MultilingualReleaseCheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const pendingUrls: string[] = [];
  const technicalAudit = auditMultilingualFoundation(input);
  const technicalValidationPassed = technicalAudit.errors.length === 0;

  for (const error of technicalAudit.errors) {
    errors.push(`technical validation: ${error}`);
  }

  const candidates = input.manifest.filter(hasApprovedPublicationGate);
  const requestedScope = input.releaseScopeUrls
    ? new Set(input.releaseScopeUrls)
    : null;
  const scopedCandidates = requestedScope
    ? candidates.filter((entry) => requestedScope.has(entry.localizedUrl))
    : candidates;
  if (requestedScope) {
    if (requestedScope.size !== input.releaseScopeUrls?.length) {
      errors.push("release scope contains duplicate URLs");
    }
    for (const localizedUrl of requestedScope) {
      if (!scopedCandidates.some((entry) => entry.localizedUrl === localizedUrl)) {
        errors.push(`release scope has no approved manifest entry: ${localizedUrl}`);
      }
    }
  } else if (candidates.length !== 414) {
    errors.push(
      `release scope must contain exactly 414 six-language candidates; found ${candidates.length}`,
    );
  }

  let ownerWaiverScopeValid = false;
  if (input.ownerReviewWaiver) {
    const waiverErrors: string[] = [];
    const expectedWaiverUrls = new Set(
      input.ownerReviewWaiver.localizedUrls,
    );
    if (!requestedScope) {
      waiverErrors.push("owner waiver requires an explicit release scope");
    }
    if (
      input.ownerReviewWaiver.status !== "approved" ||
      input.ownerReviewWaiver.by !== "Allan" ||
      input.ownerReviewWaiver.date !== "2026-07-31" ||
      input.ownerReviewWaiver.reason !==
        "Business owner explicitly waived Arabic native-language review and accepted localization risk." ||
      input.ownerReviewWaiver.warning !== arabicP0OwnerWaiverWarning
    ) {
      waiverErrors.push(
        "owner waiver policy does not match Allan's approved 2026-07-31 Arabic P0 evidence",
      );
    }
    if (
      input.ownerReviewWaiver.localizedUrls.length !== 15 ||
      expectedWaiverUrls.size !== 15
    ) {
      waiverErrors.push(
        `Arabic P0 owner waiver must contain exactly 15 unique URLs; found ${expectedWaiverUrls.size}`,
      );
    }
    if (
      input.ownerReviewWaiver.localizedUrls.some(
        (url) => !url.startsWith("https://dualcorelink.com/ar/"),
      )
    ) {
      waiverErrors.push("owner waiver contains a non-Arabic URL");
    }
    if (requestedScope) {
      for (const url of expectedWaiverUrls) {
        if (!requestedScope.has(url)) {
          waiverErrors.push(`owner waiver URL is missing from scope: ${url}`);
        }
      }
      for (const url of requestedScope) {
        if (!expectedWaiverUrls.has(url)) {
          waiverErrors.push(`release scope exceeds owner waiver: ${url}`);
        }
      }
    }
    errors.push(...waiverErrors);
    ownerWaiverScopeValid = waiverErrors.length === 0;
    warnings.push(arabicP0OwnerWaiverWarning);
  }

  const cmsCandidates = scopedCandidates.filter(
    (entry) => entry.pageType === "product" || entry.pageType === "solution",
  );
  const cmsCandidateUrls = new Set(
    cmsCandidates.map((entry) => entry.localizedUrl),
  );
  const scopedCmsTranslations = input.cmsTranslations.filter((payload) => {
    const entry = findCmsManifestEntry(input.manifest, payload);
    return entry ? cmsCandidateUrls.has(entry.localizedUrl) : false;
  });
  if (
    (!requestedScope && input.cmsTranslations.length !== 252) ||
    cmsCandidates.length !== scopedCmsTranslations.length
  ) {
    errors.push(
      `CMS payload/manifest mismatch: payloads=${scopedCmsTranslations.length} manifest=${cmsCandidates.length}`,
    );
  }

  let cmsPayloadStructurallyReadyCount = 0;
  let cmsPayloadNativeApprovedCount = 0;
  for (const payload of scopedCmsTranslations) {
    const payloadErrors = validateCmsTranslation(payload);
    if (payloadErrors.length === 0) {
      cmsPayloadStructurallyReadyCount += 1;
    } else {
      for (const error of payloadErrors) {
        errors.push(
          `CMS ${payload.locale}:${payload.sourceEnglishSlug}: ${error}`,
        );
      }
    }

    const manifestEntry = findCmsManifestEntry(input.manifest, payload);
    if (!manifestEntry || !hasApprovedPublicationGate(manifestEntry)) {
      errors.push(
        `CMS ${payload.locale}:${payload.sourceEnglishSlug} has no matching approved manifest entry`,
      );
      continue;
    }
    if (
      payload.nativeReviewStatus !== manifestEntry.nativeReviewStatus ||
      payload.nativeReviewer !== manifestEntry.nativeReviewer ||
      payload.nativeReviewDate !== manifestEntry.nativeReviewDate
    ) {
      errors.push(
        `CMS ${payload.locale}:${payload.sourceEnglishSlug} native review evidence does not match the manifest`,
      );
    }
    if (payload.nativeReviewStatus === "approved") {
      cmsPayloadNativeApprovedCount += 1;
    }
    if (
      input.ownerReviewWaiver &&
      payload.nativeReviewStatus !== "pending"
    ) {
      errors.push(
        `CMS ${payload.locale}:${payload.sourceEnglishSlug} owner waiver must not claim native approval`,
      );
    }
  }

  let productionReleaseReadyCount = 0;
  let ownerReviewWaiverApprovedCount = 0;
  let releaseEligibleCount = 0;
  for (const entry of scopedCandidates) {
    if (entry.nativeReviewStatus === "pending") {
      const waiverMatches =
        Boolean(input.ownerReviewWaiver) &&
        ownerWaiverScopeValid &&
        hasApprovedOwnerReviewWaiver(entry) &&
        entry.ownerReviewWaiverStatus === input.ownerReviewWaiver?.status &&
        entry.ownerReviewWaiverBy === input.ownerReviewWaiver?.by &&
        entry.ownerReviewWaiverDate === input.ownerReviewWaiver?.date &&
        entry.ownerReviewWaiverReason === input.ownerReviewWaiver?.reason &&
        entry.nativeReviewer === null &&
        entry.nativeReviewDate === null &&
        !entry.productionReleaseReady;
      if (waiverMatches) {
        ownerReviewWaiverApprovedCount += 1;
        releaseEligibleCount += 1;
        continue;
      }
      if (input.ownerReviewWaiver) {
        errors.push(
          `owner waiver evidence is incomplete or mismatched: ${entry.localizedUrl}`,
        );
      }
      pendingUrls.push(entry.localizedUrl);
      errors.push(`native review pending: ${entry.localizedUrl}`);
      continue;
    }
    if (entry.nativeReviewStatus === "changes_required") {
      errors.push(`native review changes required: ${entry.localizedUrl}`);
      continue;
    }
    if (
      hasProductionReleaseGate(entry, technicalValidationPassed)
    ) {
      productionReleaseReadyCount += 1;
      releaseEligibleCount += 1;
    } else {
      errors.push(
        `production release gate is incomplete: ${entry.localizedUrl}`,
      );
    }
  }

  if (
    !input.ownerReviewWaiver &&
    cmsPayloadNativeApprovedCount !== scopedCmsTranslations.length
  ) {
    errors.push(
      `CMS native review incomplete: ${cmsPayloadNativeApprovedCount}/${scopedCmsTranslations.length} approved`,
    );
  }
  if (releaseEligibleCount !== scopedCandidates.length) {
    errors.push(
      `release eligibility incomplete: ${releaseEligibleCount}/${scopedCandidates.length} eligible`,
    );
  }

  return {
    errors,
    warnings,
    pendingUrls,
    candidateCount: scopedCandidates.length,
    productionReleaseReadyCount,
    ownerReviewWaiverApprovedCount,
    releaseEligibleCount,
    cmsPayloadCount: scopedCmsTranslations.length,
    cmsPayloadStructurallyReadyCount,
    cmsPayloadNativeApprovedCount,
    technicalValidationPassed,
  };
}
