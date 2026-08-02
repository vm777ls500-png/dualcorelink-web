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

const approvedBySourceId = new Map<
  number,
  { sourceId: number; postType: "product" | "solution"; slug: string }
>(
  zhP1CmsApprovedIdentities.map((identity) => [identity.sourceId, identity]),
);

export const zhP1ReviewedCmsImportPayload = zhM3aCmsImportPayload
  .filter((record) => approvedBySourceId.has(record.sourceEnglishContentId))
  .map((record) => ({
    ...record,
    localizedSlug: record.sourceEnglishSlug,
    batch: "p1" as const,
    nativeReviewStatus: "approved" as const,
    nativeReviewer: "Allan",
    nativeReviewDate: "2026-08-02",
    nativeReviewNotes: "Human Chinese review approved",
    productionReleaseReady: true,
  }));

if (
  zhP1ReviewedCmsImportPayload.length !== 17 ||
  zhP1ReviewedCmsImportPayload.some((record) => {
    const identity = approvedBySourceId.get(record.sourceEnglishContentId);
    return (
      !identity ||
      record.contentType !== identity.postType ||
      record.sourceEnglishSlug !== identity.slug ||
      record.locale !== "zh" ||
      record.batch !== "p1" ||
      record.nativeReviewStatus !== "approved" ||
      record.nativeReviewer !== "Allan" ||
      record.nativeReviewDate !== "2026-08-02" ||
      record.productionReleaseReady !== true
    );
  })
) {
  throw new Error(
    "Chinese P1 reviewed CMS import payload must contain exactly 17 Allan-approved records.",
  );
}
