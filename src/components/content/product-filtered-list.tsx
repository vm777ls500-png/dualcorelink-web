"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ContentList, type ContentListItem } from "./content-list";
import { EmptyState } from "./empty-state";
import type { Locale } from "@/config/i18n";

export type ProductFilterOption = {
  slug: string;
  title: string;
};

export type ProductFilteredListItem = ContentListItem & {
  categorySlugs: string[];
  seriesSlugs: string[];
};

type ProductFilteredListProps = {
  locale: Locale;
  items: ProductFilteredListItem[];
  categories: ProductFilterOption[];
  series: ProductFilterOption[];
};

export function ProductFilteredList({
  locale,
  items,
  categories,
  series,
}: ProductFilteredListProps) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") || "";
  const seriesSlug = searchParams.get("series") || "";
  const activeCategory = categories.find((item) => item.slug === categorySlug);
  const activeSeries = series.find((item) => item.slug === seriesSlug);
  const filteredItems = items.filter((item) => {
    if (activeCategory && !item.categorySlugs.includes(activeCategory.slug)) {
      return false;
    }

    if (activeSeries && !item.seriesSlugs.includes(activeSeries.slug)) {
      return false;
    }

    return true;
  });
  const filterLabels = [
    activeCategory ? `Category: ${activeCategory.title}` : "",
    activeSeries ? `Series: ${activeSeries.title}` : "",
  ].filter(Boolean);

  return (
    <div id="product-results">
      {filterLabels.length > 0 ? (
        <div className="mb-6 border border-line bg-surface p-5">
          <p className="text-sm font-semibold uppercase text-brand">
            Filtered product results
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            {filterLabels.join(" / ")}
          </h2>
          <p className="mt-2 leading-7 text-muted">
            Showing {filteredItems.length} of {items.length} products.
          </p>
          <Link
            href={`/${locale}/products/`}
            className="mt-4 inline-flex min-h-10 items-center border border-brand px-4 py-2 text-sm font-semibold text-brand"
          >
            View all products
          </Link>
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <EmptyState
          title="No products found"
          description="No published products match this filter. View all products or contact our team for project matching."
        />
      ) : (
        <ContentList locale={locale} route="products" items={filteredItems} />
      )}
    </div>
  );
}
