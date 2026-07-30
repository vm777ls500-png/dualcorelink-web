import {
  adaptCmsTranslation,
  type CmsTranslatedSpecification,
  type CmsTranslationContentType,
  type CmsTranslationRecord,
} from "@/lib/multilingual-cms";
import type {
  LocalizedStructuredContent,
} from "../types";
import type {
  MultilingualLocale,
  NativeReviewStatus,
} from "@/lib/multilingual-publication-manifest";
import { getNativeReviewEvidence } from "@/lib/native-review-evidence";

export function defineCmsImportPayload(input: {
  contentType: CmsTranslationContentType;
  sourceEnglishContentId: number;
  sourceEnglishSlug: string;
  locale: MultilingualLocale;
  translatedTitle: string;
  translatedDescription: string;
  translatedSpecifications: readonly CmsTranslatedSpecification[];
  translatedSeoTitle: string;
  translatedMetaDescription: string;
  translatedStructuredContent: LocalizedStructuredContent;
  nativeReviewStatus?: NativeReviewStatus;
  nativeReviewer?: string | null;
  nativeReviewDate?: string | null;
  nativeReviewNotes?: string;
}): CmsTranslationRecord {
  const nativeReview = getNativeReviewEvidence(
    `https://dualcorelink.com/${input.locale}/${input.contentType}s/${input.sourceEnglishSlug}/`,
  );
  return adaptCmsTranslation({
    ...input,
    localizedContentId: null,
    importKey: `m2a:${input.locale}:${input.contentType}:${input.sourceEnglishContentId}`,
    deliveryMode: "validated-import-payload",
    translationStatus: "approved",
    reviewStatus: "approved",
    nativeReviewStatus:
      input.nativeReviewStatus ?? nativeReview.nativeReviewStatus,
    nativeReviewer: input.nativeReviewer ?? nativeReview.nativeReviewer,
    nativeReviewDate: input.nativeReviewDate ?? nativeReview.nativeReviewDate,
    nativeReviewNotes:
      input.nativeReviewNotes ??
      nativeReview.nativeReviewNotes,
  });
}
