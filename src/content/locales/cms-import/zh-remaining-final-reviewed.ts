import type { CmsTranslationRecord } from "@/lib/multilingual-cms";
import {
  multilingualPublicationManifest,
  type PublicationPriority,
} from "@/lib/multilingual-publication-manifest";
import { zhRemainingFinalReleaseUrls } from "@/lib/multilingual-release-batches";
import { zhM3aCmsImportPayload } from "./m3a-generated";

export type ZhRemainingFinalReviewedCmsImportRecord = CmsTranslationRecord & {
  batch: "remaining-final";
  priority: PublicationPriority;
  productionReleaseReady: true;
  translationGroup: string;
};

export const zhRemainingFinalCmsApprovedIdentities = [
  { sourceId: 238, postType: "product", slug: "hotel-ceiling-background-speaker", priority: "P2" },
  { sourceId: 226, postType: "product", slug: "brushed-aluminum-voice-telephone-information-panel", priority: "P2" },
  { sourceId: 225, postType: "product", slug: "borui-red-matte-triple-socket-panel", priority: "P2" },
  { sourceId: 224, postType: "product", slug: "smart-series-dual-vertical-socket-panel", priority: "P2" },
  { sourceId: 223, postType: "product", slug: "smart-footlight-night-light-panel", priority: "P2" },
  { sourceId: 221, postType: "product", slug: "smart-three-key-music-control-panel", priority: "P2" },
  { sourceId: 220, postType: "product", slug: "smart-single-key-switch-panel", priority: "P2" },
  { sourceId: 197, postType: "product", slug: "smart-voice-telephone-information-socket", priority: "P2" },
  { sourceId: 196, postType: "product", slug: "brushed-aluminum-thermostat-control-panel", priority: "P2" },
  { sourceId: 195, postType: "product", slug: "brushed-aluminum-sos-alarm-panel", priority: "P2" },
  { sourceId: 194, postType: "product", slug: "vintage-gold-four-key-smart-switch-panel", priority: "P2" },
  { sourceId: 193, postType: "product", slug: "vintage-gold-key-card-energy-saver-panel", priority: "P2" },
  { sourceId: 192, postType: "product", slug: "borui-red-matte-room-status-four-key-switch-panel", priority: "P2" },
  { sourceId: 191, postType: "product", slug: "borui-red-matte-usb-five-hole-socket", priority: "P2" },
  { sourceId: 52, postType: "product", slug: "brushed-aluminum-86-base-doorbell-panel", priority: "P2" },
  { sourceId: 49, postType: "product", slug: "smart-usb-five-hole-socket", priority: "P2" },
  { sourceId: 44, postType: "product", slug: "infrared-repeater", priority: "P2" },
  { sourceId: 137, postType: "solution", slug: "hotel-guest-room-control-solution", priority: "P0" },
] as const satisfies readonly {
  sourceId: number;
  postType: "product" | "solution";
  slug: string;
  priority: PublicationPriority;
}[];

const reviewedCmsUrls = new Set<string>(
  zhRemainingFinalReleaseUrls.filter(
    (url) => url.includes("/zh/products/") || url.includes("/zh/solutions/"),
  ),
);

function payloadUrl(payload: CmsTranslationRecord): string {
  return `https://dualcorelink.com/zh/${payload.contentType}s/${payload.sourceEnglishSlug}/`;
}

export const zhRemainingFinalReviewedCmsImportPayload: readonly ZhRemainingFinalReviewedCmsImportRecord[] =
  zhM3aCmsImportPayload
    .filter((payload) => reviewedCmsUrls.has(payloadUrl(payload)))
    .map((payload) => {
      const entry = multilingualPublicationManifest.find(
        (candidate) => candidate.localizedUrl === payloadUrl(payload),
      );
      if (!entry) throw new Error(`Missing manifest entry: ${payloadUrl(payload)}`);
      return {
        ...payload,
        localizedSlug: payload.sourceEnglishSlug,
        batch: "remaining-final" as const,
        priority: entry.priority,
        productionReleaseReady: true as const,
        translationGroup: `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`,
      };
    });

const identityBySourceId = new Map<
  number,
  (typeof zhRemainingFinalCmsApprovedIdentities)[number]
>(
  zhRemainingFinalCmsApprovedIdentities.map((identity) => [identity.sourceId, identity]),
);
if (
  zhRemainingFinalReviewedCmsImportPayload.length !== 18 ||
  new Set(
    zhRemainingFinalReviewedCmsImportPayload.map(
      (payload) => payload.sourceEnglishContentId,
    ),
  ).size !== 18 ||
  zhRemainingFinalReviewedCmsImportPayload.filter(
    (payload) => payload.contentType === "product",
  ).length !== 17 ||
  zhRemainingFinalReviewedCmsImportPayload.filter(
    (payload) => payload.contentType === "solution",
  ).length !== 1 ||
  zhRemainingFinalReviewedCmsImportPayload.some((payload) => {
    const identity = identityBySourceId.get(payload.sourceEnglishContentId);
    return (
      !identity ||
      identity.postType !== payload.contentType ||
      identity.slug !== payload.sourceEnglishSlug ||
      identity.priority !== payload.priority ||
      payload.locale !== "zh" ||
      payload.nativeReviewStatus !== "approved" ||
      payload.nativeReviewer !== "Allan" ||
      payload.nativeReviewDate !== "2026-08-03" ||
      payload.nativeReviewNotes !== "Human Chinese review approved" ||
      payload.translationGroup !==
        `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`
    );
  })
) {
  throw new Error(
    "Final Chinese reviewed CMS import payload must contain exactly 17 P2 Products and 1 historical P0 Solution.",
  );
}
