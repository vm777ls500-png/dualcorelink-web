import type { Locale } from "@/config/i18n";
import { isReleasedLocalizedPath } from "@/lib/multilingual-release-batches";

export const supportedReviewPreviewLocales = ["ar", "vi", "de", "es", "fa"] as const;

export type ReviewPreviewLocale =
  (typeof supportedReviewPreviewLocales)[number];

export function getReviewPreviewLocales(
  value =
    process.env.MULTILINGUAL_REVIEW_LOCALE ??
    process.env.NEXT_PUBLIC_MULTILINGUAL_REVIEW_LOCALE,
): ReviewPreviewLocale[] {
  return [...new Set(
    (value ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter((item): item is ReviewPreviewLocale =>
        supportedReviewPreviewLocales.includes(item as ReviewPreviewLocale),
      ),
  )];
}

export function getReviewPreviewLocale(
  value =
    process.env.MULTILINGUAL_REVIEW_LOCALE ??
    process.env.NEXT_PUBLIC_MULTILINGUAL_REVIEW_LOCALE,
): ReviewPreviewLocale | null {
  return getReviewPreviewLocales(value)[0] ?? null;
}

export function isReviewPreviewLocale(locale: string): boolean {
  return getReviewPreviewLocales().includes(locale as ReviewPreviewLocale);
}

export function supportsSpecializedLocalizedComposition(
  locale: Locale,
): boolean {
  return (
    locale === "en" ||
    locale === "zh" ||
    locale === "ar" ||
    (locale === "vi" && isReleasedLocalizedPath("vi", "about")) ||
    isReviewPreviewLocale(locale)
  );
}

export function getLocalizedCompositionHomePath(locale: Locale): string {
  return isReviewPreviewLocale(locale) ||
    (locale === "vi" && isReleasedLocalizedPath("vi", "about"))
    ? `/${locale}/about/`
    : `/${locale}/`;
}
