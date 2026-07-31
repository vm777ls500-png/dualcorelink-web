import { getNativeReviewEvidence } from "./native-review-evidence";
import {
  getOwnerReviewWaiverEvidence,
  type OwnerReviewWaiverStatus,
} from "./owner-review-waiver";

export const multilingualLocales = ["ar", "zh", "de", "es", "vi", "fa"] as const;

export type MultilingualLocale = (typeof multilingualLocales)[number];

export const publicationStatuses = [
  "missing",
  "draft",
  "reviewed",
  "approved",
] as const;

export type PublicationStatus = (typeof publicationStatuses)[number];
export type PublicationPriority = "P0" | "P1" | "P2";

export const nativeReviewStatuses = [
  "pending",
  "changes_required",
  "approved",
] as const;

export type NativeReviewStatus = (typeof nativeReviewStatuses)[number];

export type MultilingualPageType =
  | "product-listing"
  | "product"
  | "solution-listing"
  | "solution"
  | "resource-listing"
  | "resource"
  | "region-listing"
  | "region"
  | "static";

export type EnglishContentSource = {
  pageType: MultilingualPageType;
  slug: string;
  path: string;
  priority: PublicationPriority;
};

export type MultilingualPublicationEntry = {
  locale: MultilingualLocale;
  pageType: MultilingualPageType;
  slug: string;
  sourceUrl: string;
  localizedUrl: string;
  translationStatus: PublicationStatus;
  seoMetadataStatus: PublicationStatus;
  contentReviewStatus: PublicationStatus;
  publishReady: boolean;
  nativeReviewStatus: NativeReviewStatus;
  nativeReviewer: string | null;
  nativeReviewDate: string | null;
  nativeReviewNotes: string;
  ownerReviewWaiverStatus: OwnerReviewWaiverStatus;
  ownerReviewWaiverBy: string | null;
  ownerReviewWaiverDate: string | null;
  ownerReviewWaiverReason: string;
  productionReleaseReady: boolean;
  priority: PublicationPriority;
  notes: string;
};

const siteOrigin = "https://dualcorelink.com";

export const m2aApprovedPaths = {
  ar: [
    "about",
    "contact",
    "faqs",
    "products",
    "solutions",
    "regions",
    "solutions/rcu-room-control-solution",
    "solutions/smart-hotel-automation-solution",
    "solutions/hotel-guest-room-control-solution",
    "regions/middle-east",
    "regions/saudi-arabia",
    "regions/uae",
    "products/hotel-smart-room-rcu-host-1",
    "products/rcu-controller-cabinet",
    "products/86-type-ai-smart-control-display",
  ],
  zh: [
    "about",
    "contact",
    "faqs",
    "products",
    "solutions",
    "solutions/oem-odm-custom-panel-solution",
    "solutions/rcu-room-control-solution",
    "solutions/smart-hotel-automation-solution",
    "products/hotel-smart-room-rcu-host-1",
    "products/rcu-controller-cabinet",
    "products/86-type-ai-smart-control-display",
    "products/smart-four-key-scene-control-panel",
  ],
} as const satisfies Partial<Record<MultilingualLocale, readonly string[]>>;

export const englishContentMaster: readonly EnglishContentSource[] = [
  { pageType: "product-listing", slug: "products", path: "products", priority: "P0" },
  { pageType: "product", slug: "hotel-ceiling-background-speaker", path: "products/hotel-ceiling-background-speaker", priority: "P2" },
  { pageType: "product", slug: "brushed-aluminum-voice-telephone-information-panel", path: "products/brushed-aluminum-voice-telephone-information-panel", priority: "P2" },
  { pageType: "product", slug: "borui-red-matte-triple-socket-panel", path: "products/borui-red-matte-triple-socket-panel", priority: "P2" },
  { pageType: "product", slug: "smart-series-dual-vertical-socket-panel", path: "products/smart-series-dual-vertical-socket-panel", priority: "P2" },
  { pageType: "product", slug: "smart-footlight-night-light-panel", path: "products/smart-footlight-night-light-panel", priority: "P2" },
  { pageType: "product", slug: "smart-four-key-scene-control-panel", path: "products/smart-four-key-scene-control-panel", priority: "P0" },
  { pageType: "product", slug: "smart-three-key-music-control-panel", path: "products/smart-three-key-music-control-panel", priority: "P2" },
  { pageType: "product", slug: "smart-single-key-switch-panel", path: "products/smart-single-key-switch-panel", priority: "P2" },
  { pageType: "product", slug: "hotel-smart-room-rcu-host-3", path: "products/hotel-smart-room-rcu-host-3", priority: "P1" },
  { pageType: "product", slug: "smart-voice-telephone-information-socket", path: "products/smart-voice-telephone-information-socket", priority: "P2" },
  { pageType: "product", slug: "brushed-aluminum-thermostat-control-panel", path: "products/brushed-aluminum-thermostat-control-panel", priority: "P2" },
  { pageType: "product", slug: "brushed-aluminum-sos-alarm-panel", path: "products/brushed-aluminum-sos-alarm-panel", priority: "P2" },
  { pageType: "product", slug: "vintage-gold-four-key-smart-switch-panel", path: "products/vintage-gold-four-key-smart-switch-panel", priority: "P2" },
  { pageType: "product", slug: "vintage-gold-key-card-energy-saver-panel", path: "products/vintage-gold-key-card-energy-saver-panel", priority: "P2" },
  { pageType: "product", slug: "borui-red-matte-room-status-four-key-switch-panel", path: "products/borui-red-matte-room-status-four-key-switch-panel", priority: "P2" },
  { pageType: "product", slug: "borui-red-matte-usb-five-hole-socket", path: "products/borui-red-matte-usb-five-hole-socket", priority: "P2" },
  { pageType: "product", slug: "hotel-delivery-robot-charging-dock", path: "products/hotel-delivery-robot-charging-dock", priority: "P1" },
  { pageType: "product", slug: "hotel-smart-room-rcu-host-2", path: "products/hotel-smart-room-rcu-host-2", priority: "P1" },
  { pageType: "product", slug: "smart-curtain-motor", path: "products/smart-curtain-motor", priority: "P1" },
  { pageType: "product", slug: "brushed-aluminum-86-base-doorbell-panel", path: "products/brushed-aluminum-86-base-doorbell-panel", priority: "P2" },
  { pageType: "product", slug: "smart-four-key-curtain-control-panel", path: "products/smart-four-key-curtain-control-panel", priority: "P1" },
  { pageType: "product", slug: "smart-key-card-energy-saver-panel", path: "products/smart-key-card-energy-saver-panel", priority: "P1" },
  { pageType: "product", slug: "smart-usb-five-hole-socket", path: "products/smart-usb-five-hole-socket", priority: "P2" },
  { pageType: "product", slug: "hotel-smart-room-rcu-host-1", path: "products/hotel-smart-room-rcu-host-1", priority: "P0" },
  { pageType: "product", slug: "rcu-controller-cabinet", path: "products/rcu-controller-cabinet", priority: "P0" },
  { pageType: "product", slug: "hotel-guest-room-doorbell", path: "products/hotel-guest-room-doorbell", priority: "P1" },
  { pageType: "product", slug: "hotel-room-door-magnetic-sensor", path: "products/hotel-room-door-magnetic-sensor", priority: "P1" },
  { pageType: "product", slug: "infrared-repeater", path: "products/infrared-repeater", priority: "P2" },
  { pageType: "product", slug: "embedded-human-presence-sensor", path: "products/embedded-human-presence-sensor", priority: "P1" },
  { pageType: "product", slug: "hotel-smart-delivery-cabinet", path: "products/hotel-smart-delivery-cabinet", priority: "P1" },
  { pageType: "product", slug: "hotel-delivery-robot", path: "products/hotel-delivery-robot", priority: "P1" },
  { pageType: "product", slug: "ai-music-control-panel", path: "products/ai-music-control-panel", priority: "P1" },
  { pageType: "product", slug: "thermostat-hvac-control-panel", path: "products/thermostat-hvac-control-panel", priority: "P1" },
  { pageType: "product", slug: "rotary-knob-smart-control-display", path: "products/rotary-knob-smart-control-display", priority: "P1" },
  { pageType: "product", slug: "ai-large-smart-display", path: "products/ai-large-smart-display", priority: "P1" },
  { pageType: "product", slug: "86-type-ai-smart-control-display", path: "products/86-type-ai-smart-control-display", priority: "P0" },
  { pageType: "solution-listing", slug: "solutions", path: "solutions", priority: "P0" },
  { pageType: "solution", slug: "oem-odm-custom-panel-solution", path: "solutions/oem-odm-custom-panel-solution", priority: "P0" },
  { pageType: "solution", slug: "hotel-delivery-robot-solution", path: "solutions/hotel-delivery-robot-solution", priority: "P1" },
  { pageType: "solution", slug: "rcu-room-control-solution", path: "solutions/rcu-room-control-solution", priority: "P0" },
  { pageType: "solution", slug: "ai-smart-display-solution", path: "solutions/ai-smart-display-solution", priority: "P1" },
  { pageType: "solution", slug: "smart-hotel-automation-solution", path: "solutions/smart-hotel-automation-solution", priority: "P0" },
  { pageType: "solution", slug: "hotel-guest-room-control-solution", path: "solutions/hotel-guest-room-control-solution", priority: "P0" },
  { pageType: "resource-listing", slug: "resources", path: "resources", priority: "P1" },
  { pageType: "resource", slug: "what-is-hotel-rcu-room-control-system", path: "resources/what-is-hotel-rcu-room-control-system", priority: "P0" },
  { pageType: "resource", slug: "hotel-rcu-wiring-system-architecture-guide", path: "resources/hotel-rcu-wiring-system-architecture-guide", priority: "P1" },
  { pageType: "resource", slug: "hotel-rcu-buying-guide", path: "resources/hotel-rcu-buying-guide", priority: "P0" },
  { pageType: "resource", slug: "smart-hotel-room-control-system-guide", path: "resources/smart-hotel-room-control-system-guide", priority: "P0" },
  { pageType: "resource", slug: "hotel-smart-switch-panel-guide", path: "resources/hotel-smart-switch-panel-guide", priority: "P1" },
  { pageType: "resource", slug: "oem-odm-smart-panel-customization-guide", path: "resources/oem-odm-smart-panel-customization-guide", priority: "P1" },
  { pageType: "resource", slug: "hotel-guest-room-automation-guide", path: "resources/hotel-guest-room-automation-guide", priority: "P1" },
  { pageType: "resource", slug: "hotel-room-control-system-cost-factors", path: "resources/hotel-room-control-system-cost-factors", priority: "P1" },
  { pageType: "resource", slug: "hotel-occupancy-sensor-selection-guide", path: "resources/hotel-occupancy-sensor-selection-guide", priority: "P1" },
  { pageType: "resource", slug: "hotel-doorplate-room-display-buying-guide", path: "resources/hotel-doorplate-room-display-buying-guide", priority: "P2" },
  { pageType: "resource", slug: "oem-odm-hotel-control-panel-development-process", path: "resources/oem-odm-hotel-control-panel-development-process", priority: "P1" },
  { pageType: "resource", slug: "hotel-renovation-smart-room-upgrade-guide", path: "resources/hotel-renovation-smart-room-upgrade-guide", priority: "P1" },
  { pageType: "resource", slug: "smart-panel-material-finish-selection-guide", path: "resources/smart-panel-material-finish-selection-guide", priority: "P2" },
  { pageType: "resource", slug: "knx-vs-rcu-hotel-room-control", path: "resources/knx-vs-rcu-hotel-room-control", priority: "P1" },
  { pageType: "resource", slug: "hotel-guest-room-control-interfaces-guide", path: "resources/hotel-guest-room-control-interfaces-guide", priority: "P1" },
  { pageType: "region-listing", slug: "regions", path: "regions", priority: "P1" },
  { pageType: "region", slug: "middle-east", path: "regions/middle-east", priority: "P0" },
  { pageType: "region", slug: "saudi-arabia", path: "regions/saudi-arabia", priority: "P0" },
  { pageType: "region", slug: "uae", path: "regions/uae", priority: "P0" },
  { pageType: "region", slug: "southeast-asia", path: "regions/southeast-asia", priority: "P1" },
  { pageType: "region", slug: "vietnam", path: "regions/vietnam", priority: "P1" },
  { pageType: "static", slug: "about", path: "about", priority: "P0" },
  { pageType: "static", slug: "faqs", path: "faqs", priority: "P1" },
  { pageType: "static", slug: "contact", path: "contact", priority: "P0" },
] as const;

export const m3aFullCoveragePaths = {
  ar: englishContentMaster.map((source) => source.path),
  zh: englishContentMaster.map((source) => source.path),
} as const satisfies Record<"ar" | "zh", readonly string[]>;

const allEnglishPaths = englishContentMaster.map((source) => source.path);

export const sixLanguageFullCoveragePaths = {
  ar: allEnglishPaths,
  zh: allEnglishPaths,
  de: allEnglishPaths,
  es: allEnglishPaths,
  vi: allEnglishPaths,
  fa: allEnglishPaths,
} as const satisfies Record<MultilingualLocale, readonly string[]>;

export const multilingualPublicationManifest: readonly MultilingualPublicationEntry[] =
  multilingualLocales.flatMap((locale) =>
    englishContentMaster.map((source) => {
      const approved = true;
      const localizedUrl = `${siteOrigin}/${locale}/${source.path}/`;
      const nativeReview = getNativeReviewEvidence(localizedUrl);
      const ownerReviewWaiver = getOwnerReviewWaiverEvidence(localizedUrl);

      return {
        locale,
        pageType: source.pageType,
        slug: source.slug,
        sourceUrl: `${siteOrigin}/en/${source.path}/`,
        localizedUrl,
        translationStatus: approved ? "approved" : "missing",
        seoMetadataStatus: approved ? "approved" : "missing",
        contentReviewStatus: approved ? "approved" : "missing",
        publishReady: approved,
        nativeReviewStatus: nativeReview.nativeReviewStatus,
        nativeReviewer: nativeReview.nativeReviewer,
        nativeReviewDate: nativeReview.nativeReviewDate,
        nativeReviewNotes: nativeReview.nativeReviewNotes,
        ownerReviewWaiverStatus:
          ownerReviewWaiver.ownerReviewWaiverStatus,
        ownerReviewWaiverBy: ownerReviewWaiver.ownerReviewWaiverBy,
        ownerReviewWaiverDate: ownerReviewWaiver.ownerReviewWaiverDate,
        ownerReviewWaiverReason:
          ownerReviewWaiver.ownerReviewWaiverReason,
        productionReleaseReady: nativeReview.productionReleaseReady,
        priority: source.priority,
        notes: approved
          ? "M4A six-language translation approved as a local candidate with complete evidence; native review remains pending."
          : "Translation not supplied. Keep the existing legacy redirect to the verified English target.",
      };
    }),
  );

export function hasApprovedPublicationGate(
  entry: MultilingualPublicationEntry,
): boolean {
  return (
    entry.translationStatus === "approved" &&
    entry.seoMetadataStatus === "approved" &&
    entry.contentReviewStatus === "approved" &&
    entry.publishReady
  );
}

export function isValidNativeReviewDate(value: string | null): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function hasProductionReleaseGate(
  entry: MultilingualPublicationEntry,
  technicalValidationPassed: boolean,
): boolean {
  return (
    hasApprovedPublicationGate(entry) &&
    entry.nativeReviewStatus === "approved" &&
    Boolean(entry.nativeReviewer?.trim()) &&
    isValidNativeReviewDate(entry.nativeReviewDate) &&
    technicalValidationPassed &&
    entry.productionReleaseReady
  );
}
