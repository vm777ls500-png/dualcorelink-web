import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { productCategories } from "../src/config/product-taxonomy";
import { productSeries } from "../src/config/product-series";
import { englishContentMaster } from "../src/lib/multilingual-publication-manifest";
import {
  getProductListingSourceLocale,
  localizeProductListingProducts,
} from "../src/lib/product-listing";
import { filterProductListingItems } from "../src/components/content/product-filtered-list";
import type { ProductListItem } from "../src/types/content";

const projectRoot = process.cwd();
const productSources = englishContentMaster.filter(
  (entry) => entry.pageType === "product",
);
const categorySlugs = productCategories.map((category) => category.slug);

const sourceProducts = productSources.map(
  (entry, index) =>
    ({
      id: index + 1,
      slug: entry.slug,
      language: "en",
      direction: "ltr",
      title: `English product ${index + 1}`,
      excerpt: `English excerpt ${index + 1}`,
      shortDescription: `English summary ${index + 1}`,
      categorySlugs: [categorySlugs[index % categorySlugs.length]],
      categoryNames: ["English category"],
      primaryImage: null,
    }) as ProductListItem,
);

const chineseProducts = localizeProductListingProducts("zh", sourceProducts);
const filterItems = chineseProducts.map((product) => ({
  id: product.id,
  slug: product.slug,
  title: product.title,
  description: product.shortDescription,
  hasMedia: true,
  categorySlugs: product.categorySlugs,
  seriesSlugs: productSeries
    .filter((series) => series.productSlugs.includes(product.slug))
    .map((series) => series.slug),
}));

test("Chinese products listing uses all 36 released product sources", () => {
  assert.equal(sourceProducts.length, 36);
  assert.equal(getProductListingSourceLocale("zh"), "en");
  assert.equal(chineseProducts.length, 36);
  assert.equal(new Set(chineseProducts.map((item) => item.slug)).size, 36);
});

test("Chinese product cards have Chinese copy and Chinese detail hrefs", () => {
  const hrefs = chineseProducts.map(
    (product) => `/zh/products/${product.slug}/`,
  );

  assert.equal(hrefs.length, 36);
  assert.equal(hrefs.every((href) => href.startsWith("/zh/products/")), true);
  assert.equal(hrefs.some((href) => href.includes("?")), false);
  assert.equal(
    chineseProducts.every(
      (product) =>
        /[\u3400-\u9fff]/u.test(product.title) &&
        /[\u3400-\u9fff]/u.test(product.shortDescription),
    ),
    true,
  );
  assert.equal(
    chineseProducts.some((product) => product.title.startsWith("English product")),
    false,
  );
});

test("English listing remains a 36-product pass-through", () => {
  const englishProducts = localizeProductListingProducts("en", sourceProducts);

  assert.equal(getProductListingSourceLocale("en"), "en");
  assert.equal(englishProducts.length, 36);
  assert.deepEqual(englishProducts, sourceProducts);
});

test("Chinese category and series filters return products and reset to 36", () => {
  const category = filterItems.find((item) => item.categorySlugs.length > 0)
    ?.categorySlugs[0];
  const series = filterItems.find((item) => item.seriesSlugs.length > 0)
    ?.seriesSlugs[0];

  assert.ok(category);
  assert.ok(series);
  assert.ok(
    filterProductListingItems(filterItems, {
      categorySlug: category,
      seriesSlug: "",
    }).length > 0,
  );
  assert.ok(
    filterProductListingItems(filterItems, {
      categorySlug: "",
      seriesSlug: series,
    }).length > 0,
  );
  assert.equal(
    filterProductListingItems(filterItems, {
      categorySlug: "",
      seriesSlug: "",
    }).length,
    36,
  );
});

test("pending locales keep their existing listing source behavior", () => {
  for (const locale of ["ar", "de", "es", "vi", "fa"] as const) {
    assert.equal(getProductListingSourceLocale(locale), locale);
    assert.deepEqual(
      localizeProductListingProducts(locale, sourceProducts),
      sourceProducts,
    );
  }
});

test("Chinese products page renders the catalog instead of returning the editorial page", async () => {
  const source = await readFile(
    path.join(projectRoot, "src", "app", "[locale]", "products", "page.tsx"),
    "utf8",
  );

  assert.match(source, /locale === "zh" && Boolean\(localizedPage\)/);
  assert.match(source, /localizeProductListingProducts\(locale, sourceProducts\)/);
  assert.match(source, /<ProductFilteredList/);
  assert.match(source, /items=\{productListItems\}/);
});

test("filter reset stores an empty history state without a query URL", async () => {
  const source = await readFile(
    path.join(
      projectRoot,
      "src",
      "components",
      "content",
      "product-filtered-list.tsx",
    ),
    "utf8",
  );

  assert.match(source, /function clearFilter\(\)/);
  assert.match(source, /\[productFilterHistoryKey\]: emptyFilterState/);
  assert.match(source, /window\.location\.pathname/);
  assert.doesNotMatch(source, /href=\{`\/\$\{locale\}\/products\/`\}/);
});
