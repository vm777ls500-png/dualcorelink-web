import {
  localizedFileContent,
  type LocalizedFileContent,
} from "@/content/locales";
import { validateLocalizedStructuredContent } from "@/content/locales/types";
import {
  validateCmsTranslation,
  type CmsTranslationRecord,
} from "./multilingual-cms";
import { cmsTranslationImportPayload } from "@/content/locales/cms-import";
import {
  hasApprovedPublicationGate,
  type MultilingualPublicationEntry,
} from "./multilingual-publication-manifest";

export type PublicationEvidence = {
  localContent?: LocalizedFileContent;
  cmsTranslation?: CmsTranslationRecord;
};

export type PublicationEvidenceSource = {
  localContent: readonly LocalizedFileContent[];
  cmsTranslations: readonly CmsTranslationRecord[];
};

export const publicationEvidenceSource: PublicationEvidenceSource = {
  localContent: localizedFileContent,
  cmsTranslations: cmsTranslationImportPayload,
};

function isCmsPage(
  entry: MultilingualPublicationEntry,
): entry is MultilingualPublicationEntry & {
  pageType: "product" | "solution";
} {
  return entry.pageType === "product" || entry.pageType === "solution";
}

export function findPublicationEvidence(
  entry: MultilingualPublicationEntry,
  source: PublicationEvidenceSource = publicationEvidenceSource,
): PublicationEvidence {
  if (isCmsPage(entry)) {
    return {
      cmsTranslation: source.cmsTranslations.find(
        (translation) =>
          translation.locale === entry.locale &&
          translation.contentType === entry.pageType &&
          translation.sourceEnglishSlug === entry.slug,
      ),
    };
  }

  return {
    localContent: source.localContent.find(
      (content) =>
        content.locale === entry.locale &&
        content.pageType === entry.pageType &&
        content.slug === entry.slug,
    ),
  };
}

function validateLocalContent(
  entry: MultilingualPublicationEntry,
  content: LocalizedFileContent | undefined,
): string[] {
  if (!content) {
    return ["approved file-backed page is missing localized content"];
  }

  const errors: string[] = [];
  for (const [field, value] of [
    ["title", content.title],
    ["body", content.body],
    ["seoTitle", content.seoTitle],
    ["metaDescription", content.metaDescription],
    ["sourceEnglishContentHash", content.sourceEnglishContentHash],
    ["localizedContentHash", content.localizedContentHash],
  ] as const) {
    if (value.trim().length === 0) {
      errors.push(`${field} is required`);
    }
  }
  if (content.locale !== entry.locale) {
    errors.push("localized content locale does not match the manifest");
  }
  if (content.pageType !== entry.pageType || content.slug !== entry.slug) {
    errors.push("localized content identity does not match the manifest");
  }
  if (content.translationStatus !== "approved") {
    errors.push("localized content translationStatus must be approved");
  }
  if (content.reviewStatus !== "approved") {
    errors.push("localized content reviewStatus must be approved");
  }
  if (
    content.sourceEnglishContentHash.trim().length > 0 &&
    content.sourceEnglishContentHash === content.localizedContentHash
  ) {
    errors.push("localized content must not duplicate the English body");
  }
  errors.push(...validateLocalizedStructuredContent(content.structuredContent));
  return errors;
}

function validateCmsEvidence(
  entry: MultilingualPublicationEntry,
  translation: CmsTranslationRecord | undefined,
): string[] {
  if (!translation) {
    return ["approved CMS page is missing its translation association"];
  }

  const errors = validateCmsTranslation(translation);
  if (translation.locale !== entry.locale) {
    errors.push("CMS translation locale does not match the manifest");
  }
  if (
    translation.contentType !== entry.pageType ||
    translation.sourceEnglishSlug !== entry.slug
  ) {
    errors.push("CMS translation identity does not match the manifest");
  }
  if (translation.translationStatus !== "approved") {
    errors.push("CMS translationStatus must be approved");
  }
  if (translation.reviewStatus !== "approved") {
    errors.push("CMS reviewStatus must be approved");
  }
  return errors;
}

export function validatePublicationEvidence(
  entry: MultilingualPublicationEntry,
  evidence: PublicationEvidence,
): string[] {
  return isCmsPage(entry)
    ? validateCmsEvidence(entry, evidence.cmsTranslation)
    : validateLocalContent(entry, evidence.localContent);
}

export function isPublicationEligible(
  entry: MultilingualPublicationEntry,
  evidence: PublicationEvidence,
): boolean {
  return (
    hasApprovedPublicationGate(entry) &&
    validatePublicationEvidence(entry, evidence).length === 0
  );
}

export function getStaticExportEligibleEntries(
  entries: readonly MultilingualPublicationEntry[],
  source: PublicationEvidenceSource = publicationEvidenceSource,
): MultilingualPublicationEntry[] {
  return entries.filter((entry) =>
    isPublicationEligible(entry, findPublicationEvidence(entry, source)),
  );
}

export const getSitemapEligibleEntries = getStaticExportEligibleEntries;
export const getHreflangEligibleEntries = getStaticExportEligibleEntries;
