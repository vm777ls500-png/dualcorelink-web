import type { Locale } from "@/config/i18n";

export const supportedReviewPreviewLocales = ["ar"] as const;

export type ReviewPreviewLocale =
  (typeof supportedReviewPreviewLocales)[number];

export function getReviewPreviewLocale(
  value = process.env.MULTILINGUAL_REVIEW_LOCALE,
): ReviewPreviewLocale | null {
  return supportedReviewPreviewLocales.includes(
    value as ReviewPreviewLocale,
  )
    ? (value as ReviewPreviewLocale)
    : null;
}

export function isReviewPreviewLocale(locale: string): boolean {
  return getReviewPreviewLocale() === locale;
}

export function supportsSpecializedLocalizedComposition(
  locale: Locale,
): boolean {
  return locale === "en" || locale === "zh" || locale === "ar";
}

export function getLocalizedCompositionHomePath(locale: Locale): string {
  return isReviewPreviewLocale(locale) ? "/en/" : `/${locale}/`;
}
