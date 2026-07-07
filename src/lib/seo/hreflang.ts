import {
  defaultLocale,
  indexableLocales,
  isLocale,
  type Locale,
} from "@/config/i18n";
import { buildLocalizedPath, buildSiteUrl, validateCanonical } from "./site";

export type HreflangMap = Partial<Record<Locale | "x-default", string>>;

export function createStaticHreflang(
  locales: readonly Locale[],
  pathname: string,
): HreflangMap {
  const publishedLocales = locales.filter((locale) =>
    indexableLocales.includes(locale),
  );

  const languages = Object.fromEntries(
    publishedLocales.map((locale) => [
      locale,
      buildSiteUrl(buildLocalizedPath(locale, pathname)),
    ]),
  ) as HreflangMap;

  if (publishedLocales.includes(defaultLocale)) {
    languages["x-default"] = languages[defaultLocale];
  }

  return languages;
}

export function createContentHreflang(input: {
  locale: Locale;
  currentPath: string;
  published: Partial<Record<Locale, string>>;
}): HreflangMap {
  const languages: HreflangMap = {};

  if (indexableLocales.includes(input.locale)) {
    languages[input.locale] = buildSiteUrl(input.currentPath);
  }

  for (const [locale, url] of Object.entries(input.published)) {
    if (!isLocale(locale) || !indexableLocales.includes(locale) || !url) {
      continue;
    }
    try {
      const normalized = new URL(url).toString();
      const validated = validateCanonical(url, input.currentPath);
      if (validated === normalized) {
        languages[locale] = validated;
      }
    } catch {
      // Ignore malformed and non-frontend translation URLs.
    }
  }

  if (languages[defaultLocale]) {
    languages["x-default"] = languages[defaultLocale];
  }

  return languages;
}
