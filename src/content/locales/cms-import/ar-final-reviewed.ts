import type { CmsTranslationRecord } from "@/lib/multilingual-cms";
import {
  multilingualPublicationManifest,
  type PublicationPriority,
} from "@/lib/multilingual-publication-manifest";
import { arCmsImportPayload } from "./ar";
import { arM3aCmsImportPayload } from "./m3a-generated";

export type ArFinalReviewedCmsImportRecord = CmsTranslationRecord & {
  batch: "remaining-final";
  priority: PublicationPriority;
  productionReleaseReady: true;
  translationGroup: string;
};

export const arFinalCmsApprovedIdentities = [
  { sourceId: 6, postType: "product", slug: "86-type-ai-smart-control-display", priority: "P0" },
  { sourceId: 8, postType: "product", slug: "ai-large-smart-display", priority: "P1" },
  { sourceId: 9, postType: "product", slug: "rotary-knob-smart-control-display", priority: "P1" },
  { sourceId: 10, postType: "product", slug: "thermostat-hvac-control-panel", priority: "P1" },
  { sourceId: 11, postType: "product", slug: "ai-music-control-panel", priority: "P1" },
  { sourceId: 12, postType: "product", slug: "hotel-delivery-robot", priority: "P1" },
  { sourceId: 13, postType: "product", slug: "hotel-smart-delivery-cabinet", priority: "P1" },
  { sourceId: 43, postType: "product", slug: "embedded-human-presence-sensor", priority: "P1" },
  { sourceId: 44, postType: "product", slug: "infrared-repeater", priority: "P2" },
  { sourceId: 45, postType: "product", slug: "hotel-room-door-magnetic-sensor", priority: "P1" },
  { sourceId: 46, postType: "product", slug: "hotel-guest-room-doorbell", priority: "P1" },
  { sourceId: 47, postType: "product", slug: "rcu-controller-cabinet", priority: "P0" },
  { sourceId: 48, postType: "product", slug: "hotel-smart-room-rcu-host-1", priority: "P0" },
  { sourceId: 49, postType: "product", slug: "smart-usb-five-hole-socket", priority: "P2" },
  { sourceId: 50, postType: "product", slug: "smart-key-card-energy-saver-panel", priority: "P1" },
  { sourceId: 51, postType: "product", slug: "smart-four-key-curtain-control-panel", priority: "P1" },
  { sourceId: 52, postType: "product", slug: "brushed-aluminum-86-base-doorbell-panel", priority: "P2" },
  { sourceId: 137, postType: "solution", slug: "hotel-guest-room-control-solution", priority: "P0" },
  { sourceId: 138, postType: "solution", slug: "smart-hotel-automation-solution", priority: "P0" },
  { sourceId: 139, postType: "solution", slug: "ai-smart-display-solution", priority: "P1" },
  { sourceId: 140, postType: "solution", slug: "rcu-room-control-solution", priority: "P0" },
  { sourceId: 141, postType: "solution", slug: "hotel-delivery-robot-solution", priority: "P1" },
  { sourceId: 142, postType: "solution", slug: "oem-odm-custom-panel-solution", priority: "P0" },
  { sourceId: 188, postType: "product", slug: "smart-curtain-motor", priority: "P1" },
  { sourceId: 189, postType: "product", slug: "hotel-smart-room-rcu-host-2", priority: "P1" },
  { sourceId: 190, postType: "product", slug: "hotel-delivery-robot-charging-dock", priority: "P1" },
  { sourceId: 191, postType: "product", slug: "borui-red-matte-usb-five-hole-socket", priority: "P2" },
  { sourceId: 192, postType: "product", slug: "borui-red-matte-room-status-four-key-switch-panel", priority: "P2" },
  { sourceId: 193, postType: "product", slug: "vintage-gold-key-card-energy-saver-panel", priority: "P2" },
  { sourceId: 194, postType: "product", slug: "vintage-gold-four-key-smart-switch-panel", priority: "P2" },
  { sourceId: 195, postType: "product", slug: "brushed-aluminum-sos-alarm-panel", priority: "P2" },
  { sourceId: 196, postType: "product", slug: "brushed-aluminum-thermostat-control-panel", priority: "P2" },
  { sourceId: 197, postType: "product", slug: "smart-voice-telephone-information-socket", priority: "P2" },
  { sourceId: 219, postType: "product", slug: "hotel-smart-room-rcu-host-3", priority: "P1" },
  { sourceId: 220, postType: "product", slug: "smart-single-key-switch-panel", priority: "P2" },
  { sourceId: 221, postType: "product", slug: "smart-three-key-music-control-panel", priority: "P2" },
  { sourceId: 222, postType: "product", slug: "smart-four-key-scene-control-panel", priority: "P0" },
  { sourceId: 223, postType: "product", slug: "smart-footlight-night-light-panel", priority: "P2" },
  { sourceId: 224, postType: "product", slug: "smart-series-dual-vertical-socket-panel", priority: "P2" },
  { sourceId: 225, postType: "product", slug: "borui-red-matte-triple-socket-panel", priority: "P2" },
  { sourceId: 226, postType: "product", slug: "brushed-aluminum-voice-telephone-information-panel", priority: "P2" },
  { sourceId: 238, postType: "product", slug: "hotel-ceiling-background-speaker", priority: "P2" },
] as const satisfies readonly {
  sourceId: number;
  postType: "product" | "solution";
  slug: string;
  priority: PublicationPriority;
}[];

const identityBySourceId = new Map(
  arFinalCmsApprovedIdentities.map((identity) => [identity.sourceId, identity]),
);

function normalizeArabicRcuHostTerminology<T>(value: T): T {
  if (typeof value === "string") {
    return value.replaceAll(
      "مضيف RCU",
      "وحدة RCU رئيسية للتحكم (RCU Host)",
    ) as T;
  }
  if (Array.isArray(value)) {
    return value.map(normalizeArabicRcuHostTerminology) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        normalizeArabicRcuHostTerminology(child),
      ]),
    ) as T;
  }
  return value;
}

export const arFinalReviewedCmsImportPayload: readonly ArFinalReviewedCmsImportRecord[] =
  [...arCmsImportPayload, ...arM3aCmsImportPayload].map((payload) => {
    const entry = multilingualPublicationManifest.find(
      (candidate) =>
        candidate.locale === "ar" &&
        candidate.pageType === payload.contentType &&
        candidate.slug === payload.sourceEnglishSlug,
    );
    if (!entry) {
      throw new Error(`Missing Arabic manifest entry: ${payload.sourceEnglishSlug}`);
    }
    const reviewed = {
      ...payload,
      localizedSlug: payload.sourceEnglishSlug,
      batch: "remaining-final" as const,
      priority: entry.priority,
      productionReleaseReady: true as const,
      translationGroup: `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`,
    };
    return payload.sourceEnglishContentId === 48
      ? normalizeArabicRcuHostTerminology(reviewed)
      : reviewed;
  });

if (
  arFinalReviewedCmsImportPayload.length !== 42 ||
  new Set(
    arFinalReviewedCmsImportPayload.map(
      (payload) => payload.sourceEnglishContentId,
    ),
  ).size !== 42 ||
  arFinalReviewedCmsImportPayload.filter(
    (payload) => payload.contentType === "product",
  ).length !== 36 ||
  arFinalReviewedCmsImportPayload.filter(
    (payload) => payload.contentType === "solution",
  ).length !== 6 ||
  arFinalReviewedCmsImportPayload.some((payload) => {
    const identity = identityBySourceId.get(payload.sourceEnglishContentId);
    return (
      !identity ||
      identity.postType !== payload.contentType ||
      identity.slug !== payload.sourceEnglishSlug ||
      identity.priority !== payload.priority ||
      payload.locale !== "ar" ||
      payload.nativeReviewStatus !== "approved" ||
      payload.nativeReviewer !== "Allan" ||
      payload.nativeReviewDate !== "2026-08-11" ||
      payload.translationGroup !==
        `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`
    );
  })
) {
  throw new Error(
    "Final Arabic CMS import payload must contain exactly 36 Products and 6 Solutions with approved review evidence.",
  );
}
