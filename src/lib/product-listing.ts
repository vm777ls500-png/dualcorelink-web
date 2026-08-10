import type { Locale } from "@/config/i18n";
import { getDirection } from "@/config/i18n";
import { productCategories } from "@/config/product-taxonomy";
import { getLocalizedPublicationPage } from "@/lib/localized-publication";
import { isReviewPreviewLocale } from "@/lib/multilingual-review-preview";
import type { ProductListItem } from "@/types/content";

export function getProductListingSourceLocale(locale: Locale): Locale {
  return locale === "zh" || isReviewPreviewLocale(locale) ? "en" : locale;
}

const arabicCategoryNames: Record<string, string> = {
  "smart-panels-switches": "اللوحات والمفاتيح الذكية",
  "ai-smart-displays": "شاشات التحكم الذكية بالذكاء الاصطناعي",
  "rcu-room-control-host": "مضيف التحكم بالغرفة RCU",
  sensors: "المستشعرات",
  "smart-sockets-power-modules": "المقابس الذكية ووحدات الطاقة",
  "hvac-thermostat-control": "التحكم في HVAC والثرموستات",
  "curtain-control-panels": "لوحات التحكم في الستائر",
  "room-status-hotel-service-panels": "لوحات حالة الغرفة وخدمات الفندق",
  "hotel-audio-communication-devices": "أجهزة الصوت والاتصال الفندقية",
  "hotel-delivery-robot-system": "نظام روبوت التوصيل الفندقي",
};

export function getProductListingCategoryLabel(
  locale: Locale,
  category: (typeof productCategories)[number],
): string {
  if (locale === "zh") return category.chineseTitle;
  if (locale === "ar") return arabicCategoryNames[category.slug] ?? category.title;
  return category.title;
}

export function localizeProductListingProducts(
  locale: Locale,
  products: readonly ProductListItem[],
): ProductListItem[] {
  if (locale !== "zh" && !isReviewPreviewLocale(locale)) return [...products];

  const categoryNames = new Map(
    productCategories.map((category) => [
      category.slug,
      getProductListingCategoryLabel(locale, category),
    ]),
  );

  return products.flatMap((product) => {
    const localizedPage = getLocalizedPublicationPage(
      locale,
      "product",
      product.slug,
    );
    if (!localizedPage) return [];

    return [
      {
        ...product,
        language: locale,
        direction: getDirection(locale),
        title: localizedPage.title,
        excerpt: localizedPage.description,
        shortDescription: localizedPage.description,
        categoryNames: product.categorySlugs.map(
          (slug) => categoryNames.get(slug) ?? slug,
        ),
      },
    ];
  });
}
