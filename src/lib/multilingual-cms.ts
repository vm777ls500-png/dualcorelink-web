import {
  multilingualLocales,
  isValidNativeReviewDate,
  publicationStatuses,
  nativeReviewStatuses,
  type MultilingualLocale,
  type NativeReviewStatus,
  type PublicationStatus,
} from "./multilingual-publication-manifest";
import {
  validateLocalizedStructuredContent,
  type LocalizedStructuredContent,
} from "@/content/locales/types";

export type CmsTranslationContentType = "product" | "solution";

export type CmsTranslatedSpecification = {
  label: string;
  value: string;
};

export type CmsTranslationRecord = {
  contentType: CmsTranslationContentType;
  sourceEnglishContentId: number;
  sourceEnglishSlug: string;
  localizedContentId: number | null;
  importKey: string;
  deliveryMode: "cms-record" | "validated-import-payload";
  locale: MultilingualLocale;
  translatedTitle: string;
  translatedDescription: string;
  translatedSpecifications: readonly CmsTranslatedSpecification[];
  translatedSeoTitle: string;
  translatedMetaDescription: string;
  translatedStructuredContent: LocalizedStructuredContent;
  translationStatus: PublicationStatus;
  reviewStatus: PublicationStatus;
  nativeReviewStatus: NativeReviewStatus;
  nativeReviewer: string | null;
  nativeReviewDate: string | null;
  nativeReviewNotes: string;
};

export type CmsTranslationInput = Partial<CmsTranslationRecord>;

export const cmsTranslationRegistry: readonly CmsTranslationRecord[] = [];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateCmsTranslation(
  input: CmsTranslationInput,
): string[] {
  const errors: string[] = [];

  if (input.contentType !== "product" && input.contentType !== "solution") {
    errors.push("contentType must be product or solution");
  }
  if (
    !Number.isInteger(input.sourceEnglishContentId) ||
    (input.sourceEnglishContentId ?? 0) <= 0
  ) {
    errors.push("sourceEnglishContentId must be a positive integer");
  }
  if (!isNonEmptyString(input.sourceEnglishSlug)) {
    errors.push("sourceEnglishSlug is required");
  }
  if (input.deliveryMode === "cms-record") {
    if (
      !Number.isInteger(input.localizedContentId) ||
      (input.localizedContentId ?? 0) <= 0
    ) {
      errors.push("localizedContentId must be a positive integer for CMS records");
    }
  } else if (input.deliveryMode === "validated-import-payload") {
    if (input.localizedContentId !== null) {
      errors.push("validated import payloads must not invent a localizedContentId");
    }
  } else {
    errors.push("deliveryMode is invalid");
  }
  if (!isNonEmptyString(input.importKey)) {
    errors.push("importKey is required");
  }
  if (
    !input.locale ||
    !multilingualLocales.includes(input.locale as MultilingualLocale)
  ) {
    errors.push("locale must be one of the six multilingual locales");
  }
  if (!isNonEmptyString(input.translatedTitle)) {
    errors.push("translatedTitle is required");
  }
  if (!isNonEmptyString(input.translatedDescription)) {
    errors.push("translatedDescription is required");
  }
  if (
    !Array.isArray(input.translatedSpecifications) ||
    input.translatedSpecifications.length === 0 ||
    input.translatedSpecifications.some(
      (item) =>
        !isNonEmptyString(item?.label) || !isNonEmptyString(item?.value),
    )
  ) {
    errors.push("translatedSpecifications must contain translated label/value pairs");
  }
  if (!isNonEmptyString(input.translatedSeoTitle)) {
    errors.push("translatedSeoTitle is required");
  }
  if (!isNonEmptyString(input.translatedMetaDescription)) {
    errors.push("translatedMetaDescription is required");
  }
  errors.push(
    ...validateLocalizedStructuredContent(input.translatedStructuredContent),
  );
  if (
    !input.translationStatus ||
    !publicationStatuses.includes(input.translationStatus)
  ) {
    errors.push("translationStatus is invalid");
  }
  if (
    !input.reviewStatus ||
    !publicationStatuses.includes(input.reviewStatus)
  ) {
    errors.push("reviewStatus is invalid");
  }
  if (
    !input.nativeReviewStatus ||
    !nativeReviewStatuses.includes(input.nativeReviewStatus)
  ) {
    errors.push("nativeReviewStatus is invalid");
  }
  if (
    input.nativeReviewStatus !== "pending" &&
    (!isNonEmptyString(input.nativeReviewer) ||
      !isValidNativeReviewDate(input.nativeReviewDate ?? null))
  ) {
    errors.push(
      "completed native review requires nativeReviewer and a valid nativeReviewDate",
    );
  }
  if (
    input.nativeReviewStatus === "pending" &&
    (input.nativeReviewer !== null || input.nativeReviewDate !== null)
  ) {
    errors.push(
      "pending native review must not claim a reviewer or date",
    );
  }
  if (!isNonEmptyString(input.nativeReviewNotes)) {
    errors.push("nativeReviewNotes is required");
  }

  return errors;
}

export function adaptCmsTranslation(
  input: CmsTranslationInput,
): CmsTranslationRecord {
  const errors = validateCmsTranslation(input);
  if (errors.length > 0) {
    throw new Error(`Invalid CMS translation: ${errors.join("; ")}`);
  }
  return input as CmsTranslationRecord;
}
