import type { MultilingualLocale } from "./multilingual-publication-manifest";

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

export type MultilingualReleaseBatch = {
  locale: MultilingualLocale;
  batch: string;
  localizedUrls: readonly string[];
};

const releaseBatches: readonly MultilingualReleaseBatch[] = [
  {
    locale: "zh",
    batch: "p0",
    localizedUrls: zhP0ReleaseUrls,
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
      batch.localizedUrls.includes(
        localizedUrl as (typeof zhP0ReleaseUrls)[number],
      ),
  );
}

export function getReleasedLocalesForPath(
  pathname: string,
): MultilingualLocale[] {
  return releaseBatches
    .filter((batch) => isReleasedLocalizedPath(batch.locale, pathname))
    .map((batch) => batch.locale);
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
