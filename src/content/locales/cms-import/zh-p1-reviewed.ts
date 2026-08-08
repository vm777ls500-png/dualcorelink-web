import type { CmsTranslationRecord } from "@/lib/multilingual-cms";
import { zhP1ReleaseUrls } from "@/lib/multilingual-release-batches";
import { zhM3aCmsImportPayload } from "./m3a-generated";

export const zhP1CmsApprovedIdentities = [
  { sourceId: 219, postType: "product", slug: "hotel-smart-room-rcu-host-3" },
  { sourceId: 190, postType: "product", slug: "hotel-delivery-robot-charging-dock" },
  { sourceId: 189, postType: "product", slug: "hotel-smart-room-rcu-host-2" },
  { sourceId: 188, postType: "product", slug: "smart-curtain-motor" },
  { sourceId: 51, postType: "product", slug: "smart-four-key-curtain-control-panel" },
  { sourceId: 50, postType: "product", slug: "smart-key-card-energy-saver-panel" },
  { sourceId: 46, postType: "product", slug: "hotel-guest-room-doorbell" },
  { sourceId: 45, postType: "product", slug: "hotel-room-door-magnetic-sensor" },
  { sourceId: 43, postType: "product", slug: "embedded-human-presence-sensor" },
  { sourceId: 13, postType: "product", slug: "hotel-smart-delivery-cabinet" },
  { sourceId: 12, postType: "product", slug: "hotel-delivery-robot" },
  { sourceId: 11, postType: "product", slug: "ai-music-control-panel" },
  { sourceId: 10, postType: "product", slug: "thermostat-hvac-control-panel" },
  { sourceId: 9, postType: "product", slug: "rotary-knob-smart-control-display" },
  { sourceId: 8, postType: "product", slug: "ai-large-smart-display" },
  { sourceId: 141, postType: "solution", slug: "hotel-delivery-robot-solution" },
  { sourceId: 139, postType: "solution", slug: "ai-smart-display-solution" },
] as const;

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
      localizedSlug: payload.sourceEnglishSlug,
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
