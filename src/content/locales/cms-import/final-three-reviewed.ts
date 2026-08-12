import type { CmsTranslationRecord } from "@/lib/multilingual-cms";
import {
  multilingualPublicationManifest,
  type PublicationPriority,
} from "@/lib/multilingual-publication-manifest";
import { arFinalCmsApprovedIdentities } from "./ar-final-reviewed";
import { m4aCmsImportPayloadByLocale } from "./m4a-generated";

export const finalThreeCmsLocales = ["de", "es", "fa"] as const;
export type FinalThreeCmsLocale = (typeof finalThreeCmsLocales)[number];

export type FinalThreeReviewedCmsImportRecord = CmsTranslationRecord & {
  locale: FinalThreeCmsLocale;
  batch: "remaining-final";
  priority: PublicationPriority;
  productionReleaseReady: true;
  translationGroup: string;
};

export const finalThreeCmsApprovedIdentities = arFinalCmsApprovedIdentities;

const identityBySourceId = new Map(
  finalThreeCmsApprovedIdentities.map((identity) => [identity.sourceId, identity]),
);

function reviewedPayloadFor(
  locale: FinalThreeCmsLocale,
): readonly FinalThreeReviewedCmsImportRecord[] {
  const payload = m4aCmsImportPayloadByLocale[locale].map((record) => {
    const entry = multilingualPublicationManifest.find(
      (candidate) =>
        candidate.locale === locale &&
        candidate.pageType === record.contentType &&
        candidate.slug === record.sourceEnglishSlug,
    );
    if (!entry) {
      throw new Error(`Missing ${locale} manifest entry: ${record.sourceEnglishSlug}`);
    }
    return {
      ...record,
      localizedSlug: record.sourceEnglishSlug,
      locale,
      batch: "remaining-final" as const,
      priority: entry.priority,
      productionReleaseReady: true as const,
      translationGroup: `shb2b-${record.contentType}-${record.sourceEnglishContentId}`,
    };
  });

  if (
    payload.length !== 42 ||
    new Set(payload.map((record) => record.sourceEnglishContentId)).size !== 42 ||
    payload.filter((record) => record.contentType === "product").length !== 36 ||
    payload.filter((record) => record.contentType === "solution").length !== 6 ||
    payload.some((record) => {
      const identity = identityBySourceId.get(record.sourceEnglishContentId);
      return (
        !identity ||
        identity.postType !== record.contentType ||
        identity.slug !== record.sourceEnglishSlug ||
        identity.priority !== record.priority ||
        record.nativeReviewStatus !== "approved" ||
        record.nativeReviewer !== "Allan" ||
        record.nativeReviewDate !== "2026-08-12"
      );
    })
  ) {
    throw new Error(
      `Final ${locale} CMS payload must contain exactly 36 Products and 6 Solutions with approved review evidence.`,
    );
  }
  return payload;
}

export const finalThreeReviewedCmsImportPayloadByLocale = {
  de: reviewedPayloadFor("de"),
  es: reviewedPayloadFor("es"),
  fa: reviewedPayloadFor("fa"),
} as const;

export const finalThreeReviewedCmsImportPayload = finalThreeCmsLocales.flatMap(
  (locale) => finalThreeReviewedCmsImportPayloadByLocale[locale],
);
