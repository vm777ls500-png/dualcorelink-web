import type { CmsTranslationRecord } from "@/lib/multilingual-cms";
import {
  multilingualPublicationManifest,
  type PublicationPriority,
} from "@/lib/multilingual-publication-manifest";
import { arFinalCmsApprovedIdentities } from "./ar-final-reviewed";
import { m4aCmsImportPayloadByLocale } from "./m4a-generated";

export type ViFinalReviewedCmsImportRecord = CmsTranslationRecord & {
  batch: "remaining-final";
  priority: PublicationPriority;
  productionReleaseReady: true;
  translationGroup: string;
};

export const viFinalCmsApprovedIdentities = arFinalCmsApprovedIdentities;

const identityBySourceId = new Map<
  number,
  (typeof viFinalCmsApprovedIdentities)[number]
>(
  viFinalCmsApprovedIdentities.map((identity) => [identity.sourceId, identity]),
);

export const viFinalReviewedCmsImportPayload: readonly ViFinalReviewedCmsImportRecord[] =
  m4aCmsImportPayloadByLocale.vi.map((payload) => {
    const entry = multilingualPublicationManifest.find(
      (candidate) =>
        candidate.locale === "vi" &&
        candidate.pageType === payload.contentType &&
        candidate.slug === payload.sourceEnglishSlug,
    );
    if (!entry) {
      throw new Error(`Missing Vietnamese manifest entry: ${payload.sourceEnglishSlug}`);
    }
    return {
      ...payload,
      localizedSlug: payload.sourceEnglishSlug,
      batch: "remaining-final" as const,
      priority: entry.priority,
      productionReleaseReady: true as const,
      translationGroup: `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`,
    };
  });

if (
  viFinalReviewedCmsImportPayload.length !== 42 ||
  new Set(
    viFinalReviewedCmsImportPayload.map(
      (payload) => payload.sourceEnglishContentId,
    ),
  ).size !== 42 ||
  viFinalReviewedCmsImportPayload.filter(
    (payload) => payload.contentType === "product",
  ).length !== 36 ||
  viFinalReviewedCmsImportPayload.filter(
    (payload) => payload.contentType === "solution",
  ).length !== 6 ||
  viFinalReviewedCmsImportPayload.some((payload) => {
    const identity = identityBySourceId.get(payload.sourceEnglishContentId);
    return (
      !identity ||
      identity.postType !== payload.contentType ||
      identity.slug !== payload.sourceEnglishSlug ||
      identity.priority !== payload.priority ||
      payload.locale !== "vi" ||
      payload.nativeReviewStatus !== "approved" ||
      payload.nativeReviewer !== "Allan" ||
      payload.nativeReviewDate !== "2026-08-11" ||
      payload.translationGroup !==
        `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`
    );
  })
) {
  throw new Error(
    "Final Vietnamese CMS import payload must contain exactly 36 Products and 6 Solutions with approved review evidence.",
  );
}
