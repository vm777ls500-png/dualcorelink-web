import type { Locale } from "@/config/i18n";
import { productCategories } from "@/config/product-taxonomy";
import { getLocalizedPublicationPage } from "@/lib/localized-publication";
import type { ProductListItem } from "@/types/content";

export function getProductListingSourceLocale(locale: Locale): Locale {
  return locale === "zh" ? "en" : locale;
}

export function localizeProductListingProducts(
  locale: Locale,
  products: readonly ProductListItem[],
): ProductListItem[] {
  if (locale !== "zh") return [...products];

  const categoryNames = new Map(
    productCategories.map((category) => [
      category.slug,
      category.chineseTitle,
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
        direction: "ltr" as const,
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
