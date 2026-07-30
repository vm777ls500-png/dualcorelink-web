import type { CmsTranslationRecord } from "@/lib/multilingual-cms";
import { zhP0ReleaseUrls } from "@/lib/multilingual-release-batches";
import { zhCmsImportPayload } from "./zh";

const reviewedCmsUrls = new Set(
  zhP0ReleaseUrls.filter(
    (url) => url.includes("/zh/products/") || url.includes("/zh/solutions/"),
  ),
);

function payloadUrl(payload: CmsTranslationRecord): string {
  return `https://dualcorelink.com/zh/${payload.contentType}s/${payload.sourceEnglishSlug}/`;
}

export const zhP0ReviewedCmsImportPayload: readonly CmsTranslationRecord[] =
  zhCmsImportPayload.filter((payload) =>
    reviewedCmsUrls.has(
      payloadUrl(payload) as (typeof zhP0ReleaseUrls)[number],
    ),
  );

if (
  zhP0ReviewedCmsImportPayload.length !== 7 ||
  zhP0ReviewedCmsImportPayload.some(
    (payload) =>
      payload.locale !== "zh" ||
      payload.nativeReviewStatus !== "approved" ||
      payload.nativeReviewer !== "Allan" ||
      payload.nativeReviewDate !== "2026-07-29",
  )
) {
  throw new Error(
    "Chinese P0 reviewed CMS import payload must contain exactly seven Allan-approved records.",
  );
}
