import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import {
  createLocalizedProductDetailCopy,
  localizeProductConversionProfile,
  localizeProductGallery,
  productDetailSectionKeys,
} from "../src/lib/localized-product-detail";
import { localizedPublicationPages } from "../src/lib/localized-publication";

const zhProducts = localizedPublicationPages.filter(
  (page) => page.locale === "zh" && page.pageType === "product",
);

test("all 36 Chinese product publications have a shared English gallery pair", () => {
  assert.equal(zhProducts.length, 36);
  assert.equal(Object.keys(productGalleries).length, 36);

  for (const page of zhProducts) {
    const source = productGalleries[page.slug];
    assert.ok(source, `missing source gallery for ${page.slug}`);
    const localized = localizeProductGallery(source, page);

    assert.equal(localized.gallery.length, source.gallery.length, page.slug);
    assert.equal(localized.featuredImage.src, source.featuredImage.src, page.slug);
    assert.equal(
      localized.featuredImage.thumbnailSrc,
      source.featuredImage.thumbnailSrc,
      page.slug,
    );
    assert.deepEqual(
      localized.gallery.map((image) => [image.src, image.thumbnailSrc]),
      source.gallery.map((image) => [image.src, image.thumbnailSrc]),
      page.slug,
    );
    assert.match(localized.featuredImage.alt, /[\u3400-\u9fff]/, page.slug);
    for (const image of localized.gallery) {
      assert.match(image.alt, /[\u3400-\u9fff]/, page.slug);
    }
  }
});

test("all Chinese product publications supply the complete detail content structure", () => {
  assert.deepEqual(productDetailSectionKeys, [
    "overview",
    "coreFunctions",
    "features",
    "applications",
    "buyingGuide",
    "installation",
    "customization",
    "specifications",
    "relatedProducts",
    "faq",
    "commercialOptions",
    "quote",
  ]);

  for (const page of zhProducts) {
    const copy = createLocalizedProductDetailCopy(page);
    assert.match(page.title, /[\u3400-\u9fff]/, page.slug);
    assert.ok(copy.overview.trim(), `${page.slug}: overview`);
    assert.ok(copy.coreFunctions.trim(), `${page.slug}: core functions`);
    assert.ok(copy.features.trim(), `${page.slug}: features`);
    assert.ok(copy.applications.trim(), `${page.slug}: applications`);
    assert.ok(copy.installation.trim(), `${page.slug}: installation`);
    assert.ok(copy.customization.trim(), `${page.slug}: customization`);
    assert.ok(page.specifications.length > 0, `${page.slug}: specifications`);
    assert.ok(copy.faqs.length > 0, `${page.slug}: FAQ`);
    const profile = localizeProductConversionProfile(
      {
        key: "rcu",
        label: "English label",
        summary: "English summary",
        highlights: [],
        projectFit: [],
        selectionChecks: [],
        quoteChecklist: [],
        solutions: [],
        resources: [],
        whatsappPrompt: "English prompt",
      },
      page,
    );
    assert.equal(profile?.label, "项目采购规划", page.slug);
    assert.equal(profile?.summary, page.content.introduction, page.slug);
    assert.equal(profile?.highlights.length, 3, page.slug);
  }
});

test("Chinese product links remain localized and query-free", () => {
  for (const page of zhProducts) {
    assert.equal(
      new URL(page.localizedUrl).pathname,
      `/zh/products/${page.slug}/`,
      page.slug,
    );
    assert.equal(page.localizedUrl.includes("?"), false, page.slug);
    for (const link of page.content.relatedLinks) {
      assert.equal(link.href.includes("?"), false, `${page.slug}: ${link.href}`);
    }
  }
});

test("Chinese product route composes localized text with the English source model", () => {
  const route = readFileSync(
    "src/app/[locale]/products/[slug]/page.tsx",
    "utf8",
  );
  assert.match(route, /supportsSpecializedLocalizedComposition/);
  assert.match(route, /localizedPage \? "en" : locale/);
  assert.match(route, /localizeProductDetailModel\(sourceProduct, localizedPage\)/);
  assert.match(route, /localizeProductGallery\(sourceGallery, localizedPage\)/);
  assert.match(route, /createProductSchema\(product, url\)/);
});

test("pending product locales remain outside the released product pair set", () => {
  const pendingProducts = localizedPublicationPages.filter(
    (page) =>
      ["ar", "de", "es", "vi", "fa"].includes(page.locale) &&
      page.pageType === "product",
  );
  assert.equal(
    pendingProducts.some((page) => page.locale === "zh"),
    false,
  );
  assert.equal(zhProducts.length, 36);
});
