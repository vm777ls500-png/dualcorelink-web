import type { Locale } from "@/config/i18n";

export const supportedReviewPreviewLocales = ["ar", "vi"] as const;

export type ReviewPreviewLocale =
  (typeof supportedReviewPreviewLocales)[number];

export function getReviewPreviewLocale(
  value =
    process.env.MULTILINGUAL_REVIEW_LOCALE ??
    process.env.NEXT_PUBLIC_MULTILINGUAL_REVIEW_LOCALE,
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
  return (
    locale === "en" ||
    locale === "zh" ||
    locale === "ar" ||
    isReviewPreviewLocale(locale)
  );
}

export function getLocalizedCompositionHomePath(locale: Locale): string {
  return isReviewPreviewLocale(locale) ? `/${locale}/about/` : `/${locale}/`;
}
