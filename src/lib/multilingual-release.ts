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
  const cmsCandidates = candidates.filter(
    (entry) => entry.pageType === "product" || entry.pageType === "solution",
  );

  if (candidates.length !== 414) {
    errors.push(
      `release scope must contain exactly 414 six-language candidates; found ${candidates.length}`,
    );
  }
  if (
    input.cmsTranslations.length !== 252 ||
    cmsCandidates.length !== input.cmsTranslations.length
  ) {
    errors.push(
      `CMS payload/manifest mismatch: payloads=${input.cmsTranslations.length} manifest=${cmsCandidates.length}`,
    );
  }

  let cmsPayloadStructurallyReadyCount = 0;
  let cmsPayloadNativeApprovedCount = 0;
  for (const payload of input.cmsTranslations) {
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
  for (const entry of candidates) {
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

  if (cmsPayloadNativeApprovedCount !== input.cmsTranslations.length) {
    errors.push(
      `CMS native review incomplete: ${cmsPayloadNativeApprovedCount}/${input.cmsTranslations.length} approved`,
    );
  }
  if (productionReleaseReadyCount !== candidates.length) {
    errors.push(
      `production release readiness incomplete: ${productionReleaseReadyCount}/${candidates.length} ready`,
    );
  }

  return {
    errors,
    pendingUrls,
    candidateCount: candidates.length,
    productionReleaseReadyCount,
    cmsPayloadCount: input.cmsTranslations.length,
    cmsPayloadStructurallyReadyCount,
    cmsPayloadNativeApprovedCount,
    technicalValidationPassed,
  };
}
