export const locales = ["en", "zh", "de", "es", "ar", "vi", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const visibleLocales: readonly Locale[] = ["en"];

export const indexableLocales: readonly Locale[] = ["en"];

export const rtlLocales: readonly Locale[] = ["ar", "fa"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  de: "Deutsch",
  es: "Español",
  ar: "العربية",
  vi: "Tiếng Việt",
  fa: "فارسی",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
