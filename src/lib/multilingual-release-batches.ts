import type {
  MultilingualLocale,
  PublicationPriority,
} from "./multilingual-publication-manifest";

export const zhP0ReleaseUrls = [
  "https://dualcorelink.com/zh/about/",
  "https://dualcorelink.com/zh/contact/",
  "https://dualcorelink.com/zh/faqs/",
  "https://dualcorelink.com/zh/products/",
  "https://dualcorelink.com/zh/solutions/",
  "https://dualcorelink.com/zh/solutions/oem-odm-custom-panel-solution/",
  "https://dualcorelink.com/zh/solutions/rcu-room-control-solution/",
  "https://dualcorelink.com/zh/solutions/smart-hotel-automation-solution/",
  "https://dualcorelink.com/zh/products/hotel-smart-room-rcu-host-1/",
  "https://dualcorelink.com/zh/products/rcu-controller-cabinet/",
  "https://dualcorelink.com/zh/products/86-type-ai-smart-control-display/",
  "https://dualcorelink.com/zh/products/smart-four-key-scene-control-panel/",
] as const;

export const zhP1ReleaseUrls = [
  "https://dualcorelink.com/zh/products/hotel-smart-room-rcu-host-3/",
  "https://dualcorelink.com/zh/products/hotel-delivery-robot-charging-dock/",
  "https://dualcorelink.com/zh/products/hotel-smart-room-rcu-host-2/",
  "https://dualcorelink.com/zh/products/smart-curtain-motor/",
  "https://dualcorelink.com/zh/products/smart-four-key-curtain-control-panel/",
  "https://dualcorelink.com/zh/products/smart-key-card-energy-saver-panel/",
  "https://dualcorelink.com/zh/products/hotel-guest-room-doorbell/",
  "https://dualcorelink.com/zh/products/hotel-room-door-magnetic-sensor/",
  "https://dualcorelink.com/zh/products/embedded-human-presence-sensor/",
  "https://dualcorelink.com/zh/products/hotel-smart-delivery-cabinet/",
  "https://dualcorelink.com/zh/products/hotel-delivery-robot/",
  "https://dualcorelink.com/zh/products/ai-music-control-panel/",
  "https://dualcorelink.com/zh/products/thermostat-hvac-control-panel/",
  "https://dualcorelink.com/zh/products/rotary-knob-smart-control-display/",
  "https://dualcorelink.com/zh/products/ai-large-smart-display/",
  "https://dualcorelink.com/zh/solutions/hotel-delivery-robot-solution/",
  "https://dualcorelink.com/zh/solutions/ai-smart-display-solution/",
  "https://dualcorelink.com/zh/resources/",
  "https://dualcorelink.com/zh/resources/hotel-rcu-wiring-system-architecture-guide/",
  "https://dualcorelink.com/zh/resources/hotel-smart-switch-panel-guide/",
  "https://dualcorelink.com/zh/resources/oem-odm-smart-panel-customization-guide/",
  "https://dualcorelink.com/zh/resources/hotel-guest-room-automation-guide/",
  "https://dualcorelink.com/zh/resources/hotel-room-control-system-cost-factors/",
  "https://dualcorelink.com/zh/resources/hotel-occupancy-sensor-selection-guide/",
  "https://dualcorelink.com/zh/resources/oem-odm-hotel-control-panel-development-process/",
  "https://dualcorelink.com/zh/resources/hotel-renovation-smart-room-upgrade-guide/",
  "https://dualcorelink.com/zh/resources/knx-vs-rcu-hotel-room-control/",
  "https://dualcorelink.com/zh/resources/hotel-guest-room-control-interfaces-guide/",
  "https://dualcorelink.com/zh/regions/",
  "https://dualcorelink.com/zh/regions/southeast-asia/",
  "https://dualcorelink.com/zh/regions/vietnam/",
] as const;

export const zhReviewedReleaseUrls = [
  ...zhP0ReleaseUrls,
  ...zhP1ReleaseUrls,
] as const;

export type MultilingualReleaseBatch = {
  locale: MultilingualLocale;
  batch: string;
  priority: PublicationPriority;
  reviewer: string;
  reviewDate: string;
  decisionFile: string;
  cmsPayloadCount: number;
  localizedUrls: readonly string[];
};

const releaseBatches: readonly MultilingualReleaseBatch[] = [
  {
    locale: "zh",
    batch: "p0",
    priority: "P0",
    reviewer: "Allan",
    reviewDate: "2026-07-29",
    decisionFile:
      "docs/reviews/multilingual/zh-p0-final-decisions-20260729.md",
    cmsPayloadCount: 7,
    localizedUrls: zhP0ReleaseUrls,
  },
  {
    locale: "zh",
    batch: "p1",
    priority: "P1",
    reviewer: "Allan",
    reviewDate: "2026-08-02",
    decisionFile:
      "docs/reviews/multilingual/zh-p1-final-decisions-20260802.md",
    cmsPayloadCount: 17,
    localizedUrls: zhP1ReleaseUrls,
  },
];

function normalizeContentPath(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, "");
}

export function isReleasedLocalizedPath(
  locale: string,
  pathname: string,
): locale is MultilingualLocale {
  const normalizedPath = normalizeContentPath(pathname);
  const localizedUrl = `https://dualcorelink.com/${locale}/${normalizedPath}/`;

  return releaseBatches.some(
    (batch) =>
      batch.locale === locale &&
      batch.localizedUrls.includes(localizedUrl),
  );
}

export function getReleasedLocalesForPath(
  pathname: string,
): MultilingualLocale[] {
  const normalizedPath = normalizeContentPath(pathname);
  return [
    ...new Set(
      releaseBatches
        .filter((batch) =>
          batch.localizedUrls.includes(
            `https://dualcorelink.com/${batch.locale}/${normalizedPath}/`,
          ),
        )
        .map((batch) => batch.locale),
    ),
  ];
}

export function buildPublishedNavigationHref(
  locale: string,
  pathname: string,
): string {
  const normalizedPath = normalizeContentPath(pathname);
  const targetLocale =
    locale === "en" || isReleasedLocalizedPath(locale, normalizedPath)
      ? locale
      : "en";

  return `/${targetLocale}/${normalizedPath}/`;
}

export function getMultilingualReleaseBatch(
  locale: string,
  batch: string,
): MultilingualReleaseBatch {
  const match = releaseBatches.find(
    (candidate) =>
      candidate.locale === locale && candidate.batch === batch,
  );
  if (!match) {
    throw new Error(
      `Unsupported multilingual release batch: ${locale}:${batch}`,
    );
  }
  return match;
}
