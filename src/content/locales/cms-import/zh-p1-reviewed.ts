import type { CmsTranslationRecord } from "@/lib/multilingual-cms";
import { zhP1ReleaseUrls } from "@/lib/multilingual-release-batches";
import { zhM3aCmsImportPayload } from "./m3a-generated";

export type ZhP1ReviewedCmsImportRecord = CmsTranslationRecord & {
  batch: "p1";
  priority: "P1";
  productionReleaseReady: true;
  translationGroup: string;
};

const reviewedCmsUrls = new Set<string>(
  zhP1ReleaseUrls.filter(
    (url) => url.includes("/zh/products/") || url.includes("/zh/solutions/"),
  ),
);

function payloadUrl(payload: CmsTranslationRecord): string {
  return `https://dualcorelink.com/zh/${payload.contentType}s/${payload.sourceEnglishSlug}/`;
}

export const zhP1ReviewedCmsImportPayload: readonly ZhP1ReviewedCmsImportRecord[] =
  zhM3aCmsImportPayload
    .filter((payload) => reviewedCmsUrls.has(payloadUrl(payload)))
    .map((payload) => ({
      ...payload,
      batch: "p1" as const,
      priority: "P1" as const,
      productionReleaseReady: true as const,
      translationGroup: `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`,
    }));

const sourceIds = zhP1ReviewedCmsImportPayload.map(
  (payload) => payload.sourceEnglishContentId,
);
if (
  zhP1ReviewedCmsImportPayload.length !== 17 ||
  new Set(sourceIds).size !== sourceIds.length ||
  zhP1ReviewedCmsImportPayload.some(
    (payload) =>
      payload.locale !== "zh" ||
      payload.nativeReviewStatus !== "approved" ||
      payload.nativeReviewer !== "Allan" ||
      payload.nativeReviewDate !== "2026-08-02" ||
      payload.nativeReviewNotes !== "Human Chinese review approved" ||
      payload.translationGroup !==
        `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}` ||
      !reviewedCmsUrls.has(payloadUrl(payload)),
  )
) {
  throw new Error(
    "Chinese P1 reviewed CMS import payload must contain exactly 17 Allan-approved P1 records.",
  );
}
