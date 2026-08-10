"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
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
  variant?: "product";
};

export type ProductFilterState = {
  categorySlug: string;
  seriesSlug: string;
};

type ProductFilterControlProps = {
  filterType: "category" | "series";
  slug: string;
  enabled: boolean;
  className: string;
  children: ReactNode;
};

const productFilterHistoryKey = "dualcorelinkProductFilter";
const productFilterEventName = "dualcorelink:product-filter";
const emptyFilterState: ProductFilterState = {
  categorySlug: "",
  seriesSlug: "",
};

export function filterProductListingItems(
  items: readonly ProductFilteredListItem[],
  filter: ProductFilterState,
): ProductFilteredListItem[] {
  return items.filter((item) => {
    if (
      filter.categorySlug &&
      !item.categorySlugs.includes(filter.categorySlug)
    ) {
      return false;
    }

    if (filter.seriesSlug && !item.seriesSlugs.includes(filter.seriesSlug)) {
      return false;
    }

    return true;
  });
}

function normalizeProductFilterState(
  value: unknown,
  categories: readonly ProductFilterOption[],
  series: readonly ProductFilterOption[],
): ProductFilterState {
  if (!value || typeof value !== "object") return emptyFilterState;
  const candidate = value as Partial<ProductFilterState>;
  const categorySlug =
    typeof candidate.categorySlug === "string" &&
    categories.some((item) => item.slug === candidate.categorySlug)
      ? candidate.categorySlug
      : "";
  const seriesSlug =
    typeof candidate.seriesSlug === "string" &&
    series.some((item) => item.slug === candidate.seriesSlug)
      ? candidate.seriesSlug
      : "";
  return { categorySlug, seriesSlug };
}

function currentHistoryRecord() {
  return window.history.state && typeof window.history.state === "object"
    ? (window.history.state as Record<string, unknown>)
    : {};
}

export function ProductFilterControl({
  filterType,
  slug,
  enabled,
  className,
  children,
}: ProductFilterControlProps) {
  function selectFilter() {
    if (!enabled) return;
    const filter: ProductFilterState =
      filterType === "category"
        ? { categorySlug: slug, seriesSlug: "" }
        : { categorySlug: "", seriesSlug: slug };
    window.history.pushState(
      {
        ...currentHistoryRecord(),
        [productFilterHistoryKey]: filter,
      },
      "",
      `${window.location.pathname}#product-results`,
    );
    window.dispatchEvent(
      new CustomEvent<ProductFilterState>(productFilterEventName, {
        detail: filter,
      }),
    );
  }

  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={selectFilter}
      className={`${className} w-full text-start disabled:cursor-default`}
    >
      {children}
    </button>
  );
}

export function ProductFilteredList({
  locale,
  items,
  categories,
  series,
  variant,
}: ProductFilteredListProps) {
  const copy =
    locale === "ar"
      ? {
          eyebrow: "نتائج المنتجات المصفاة",
          showing: (shown: number, total: number) =>
            `عرض ${shown} من أصل ${total} منتجاً.`,
          all: "عرض كل المنتجات",
          empty: "لم يتم العثور على منتجات",
          emptyDescription:
            "لا توجد منتجات منشورة تطابق هذا المرشح. اعرض كل المنتجات أو تواصل معنا لمطابقة المشروع.",
        }
      : {
          eyebrow: "Filtered product results",
          showing: (shown: number, total: number) =>
            `Showing ${shown} of ${total} products.`,
          all: "View all products",
          empty: "No products found",
          emptyDescription:
            "No published products match this filter. View all products or contact our team for project matching.",
        };
  const resultsRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<ProductFilterState>(emptyFilterState);
  const { categorySlug, seriesSlug } = filter;
  const activeCategory = categories.find((item) => item.slug === categorySlug);
  const activeSeries = series.find((item) => item.slug === seriesSlug);
  const filteredItems = filterProductListingItems(items, {
    categorySlug: activeCategory?.slug ?? "",
    seriesSlug: activeSeries?.slug ?? "",
  });
  const filterLabels = [
    activeCategory ? `Category: ${activeCategory.title}` : "",
    activeSeries ? `Series: ${activeSeries.title}` : "",
  ].filter(Boolean);
  const hasFilter = Boolean(activeCategory || activeSeries);

  function clearFilter() {
    window.history.pushState(
      {
        ...currentHistoryRecord(),
        [productFilterHistoryKey]: emptyFilterState,
      },
      "",
      window.location.pathname,
    );
    setFilter(emptyFilterState);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const legacyFilter = normalizeProductFilterState(
      {
        categorySlug: searchParams.get("category") ?? "",
        seriesSlug: searchParams.get("series") ?? "",
      },
      categories,
      series,
    );
    const historyFilter = normalizeProductFilterState(
      currentHistoryRecord()[productFilterHistoryKey],
      categories,
      series,
    );
    const initialFilter =
      legacyFilter.categorySlug || legacyFilter.seriesSlug
        ? legacyFilter
        : historyFilter;
    setFilter(initialFilter);

    if (window.location.search) {
      window.history.replaceState(
        {
          ...currentHistoryRecord(),
          [productFilterHistoryKey]: initialFilter,
        },
        "",
        `${window.location.pathname}${
          initialFilter.categorySlug || initialFilter.seriesSlug
            ? "#product-results"
            : window.location.hash
        }`,
      );
    }

    const handleFilter = (event: Event) => {
      setFilter(
        normalizeProductFilterState(
          (event as CustomEvent<ProductFilterState>).detail,
          categories,
          series,
        ),
      );
    };
    const handlePopState = () => {
      setFilter(
        normalizeProductFilterState(
          currentHistoryRecord()[productFilterHistoryKey],
          categories,
          series,
        ),
      );
    };
    window.addEventListener(productFilterEventName, handleFilter);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener(productFilterEventName, handleFilter);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [categories, series]);

  useEffect(() => {
    if (!hasFilter) return;

    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ block: "start" });
    });
  }, [hasFilter, categorySlug, seriesSlug]);

  return (
    <div
      id="product-results"
      ref={resultsRef}
      className="product-results-panel scroll-mt-24"
    >
      {filterLabels.length > 0 ? (
        <div className="product-filter-panel mb-6 border border-line bg-surface p-5">
          <p className="text-sm font-semibold uppercase text-brand">
            {copy.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            {filterLabels.join(" / ")}
          </h2>
          <p className="mt-2 leading-7 text-muted">
            {copy.showing(filteredItems.length, items.length)}
          </p>
          <button
            type="button"
            onClick={clearFilter}
            className="mt-4 inline-flex min-h-10 items-center border border-brand px-4 py-2 text-sm font-semibold text-brand"
          >
            {copy.all}
          </button>
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <EmptyState
          title={copy.empty}
          description={copy.emptyDescription}
        />
      ) : (
        <ContentList
          locale={locale}
          route="products"
          items={filteredItems}
          variant={variant}
        />
      )}
    </div>
  );
}
