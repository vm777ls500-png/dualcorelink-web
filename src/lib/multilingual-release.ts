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

export type MultilingualReleaseCheckInput = MultilingualAuditInput & {
  localContent: readonly LocalizedFileContent[];
  cmsTranslations: readonly CmsTranslationRecord[];
  releaseScopeUrls?: readonly string[];
};

export type MultilingualReleaseCheckResult = {
  errors: string[];
  pendingUrls: string[];
  candidateCount: number;
  productionReleaseReadyCount: number;
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
  }

  let productionReleaseReadyCount = 0;
  for (const entry of scopedCandidates) {
    if (entry.nativeReviewStatus === "pending") {
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
    } else {
      errors.push(
        `production release gate is incomplete: ${entry.localizedUrl}`,
      );
    }
  }

  if (cmsPayloadNativeApprovedCount !== scopedCmsTranslations.length) {
    errors.push(
      `CMS native review incomplete: ${cmsPayloadNativeApprovedCount}/${scopedCmsTranslations.length} approved`,
    );
  }
  if (productionReleaseReadyCount !== scopedCandidates.length) {
    errors.push(
      `production release readiness incomplete: ${productionReleaseReadyCount}/${scopedCandidates.length} ready`,
    );
  }

  return {
    errors,
    pendingUrls,
    candidateCount: scopedCandidates.length,
    productionReleaseReadyCount,
    cmsPayloadCount: scopedCmsTranslations.length,
    cmsPayloadStructurallyReadyCount,
    cmsPayloadNativeApprovedCount,
    technicalValidationPassed,
  };
}
