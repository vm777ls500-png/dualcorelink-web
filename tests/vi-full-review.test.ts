import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import { vietnameseStaticFaqItems } from "../src/config/static-faqs";
import {
  localizeReleasedHref,
  localizeRegionLandingPage,
  localizeResourceGuide,
} from "../src/lib/localized-nonproduct";
import {
  createLocalizedProductDetailCopy,
  localizeProductGallery,
  productDetailSectionKeys,
} from "../src/lib/localized-product-detail";
import {
  getReviewPreviewPublicationPages,
} from "../src/lib/localized-publication";
import {
  getSitemapEligibleEntries,
  getStaticExportEligibleEntries,
} from "../src/lib/multilingual-publication-control";
import { multilingualPublicationManifest } from "../src/lib/multilingual-publication-manifest";
import {
  getReviewPreviewLocale,
  supportsSpecializedLocalizedComposition,
} from "../src/lib/multilingual-review-preview";

const pages = getReviewPreviewPublicationPages("vi");
const entries = multilingualPublicationManifest.filter(
  (entry) => entry.locale === "vi",
);
const candidatePaths = new Set(
  pages.map((page) => new URL(page.localizedUrl).pathname),
);

test("Vietnamese release inventory is exactly sixty-nine approved pages", () => {
  assert.equal(getReviewPreviewLocale("vi"), "vi");
  assert.equal(supportsSpecializedLocalizedComposition("vi"), true);
  assert.equal(pages.length, 69);
  assert.equal(entries.length, 69);
  assert.deepEqual(
    Object.fromEntries(
      [...new Set(pages.map((page) => page.pageType))].map((pageType) => [
        pageType,
        pages.filter((page) => page.pageType === pageType).length,
      ]),
    ),
    {
      "product-listing": 1,
      product: 36,
      "solution-listing": 1,
      solution: 6,
      "resource-listing": 1,
      resource: 15,
      "region-listing": 1,
      region: 5,
      static: 3,
    },
  );
  assert.equal(
    pages.filter((page) => page.deliveryMode === "validated-import-payload").length,
    42,
  );
  assert.equal(pages.filter((page) => page.deliveryMode === "file").length, 27);
  assert.equal(entries.filter((entry) => entry.nativeReviewStatus === "approved").length, 69);
  assert.equal(entries.filter((entry) => entry.nativeReviewStatus === "pending").length, 0);
  assert.equal(entries.every((entry) => entry.nativeReviewer === "Allan"), true);
  assert.equal(entries.every((entry) => entry.nativeReviewDate === "2026-08-11"), true);
  assert.equal(entries.filter((entry) => entry.productionReleaseReady).length, 69);
  assert.equal(getStaticExportEligibleEntries(entries).length, 69);
  assert.equal(getSitemapEligibleEntries(entries).length, 69);

  const decisionRows = readFileSync(
    "docs/reviews/multilingual/vi-full-decisions-20260811.md",
    "utf8",
  )
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| /vi/"));
  assert.equal(decisionRows.length, 69);
  assert.deepEqual(
    new Set(decisionRows.map((row) => row.split("|")[1].trim())),
    candidatePaths,
  );
  for (const row of decisionRows) {
    assert.match(
      row,
      /^\| \/vi\/.* \| [a-z-]+ \| approved \| Allan \| 2026-08-11 \| true \|$/,
    );
  }
});

test("all eleven Vietnamese route families use specialized composition", () => {
  const routeFiles = [
    "products/page.tsx",
    "products/[slug]/page.tsx",
    "solutions/page.tsx",
    "solutions/[slug]/page.tsx",
    "resources/page.tsx",
    "resources/[slug]/page.tsx",
    "regions/page.tsx",
    "regions/[slug]/page.tsx",
    "about/page.tsx",
    "contact/page.tsx",
    "faqs/page.tsx",
  ];
  assert.equal(routeFiles.length, 11);
  for (const route of routeFiles) {
    const source = readFileSync(`src/app/[locale]/${route}`, "utf8");
    assert.match(source, /supportsSpecializedLocalizedComposition/, route);
  }
});

test("Vietnamese product details preserve all media and semantic sections", () => {
  const products = pages.filter((page) => page.pageType === "product");
  assert.equal(products.length, 36);
  assert.equal(productDetailSectionKeys.length, 12);
  let imageCount = 0;
  for (const page of products) {
    const source = productGalleries[page.slug];
    assert.ok(source, page.slug);
    const localized = localizeProductGallery(source, page);
    imageCount += localized.gallery.length + 1;
    assert.equal(localized.featuredImage.src, source.featuredImage.src, page.slug);
    assert.deepEqual(
      localized.gallery.map((image) => [image.src, image.thumbnailSrc]),
      source.gallery.map((image) => [image.src, image.thumbnailSrc]),
      page.slug,
    );
    assert.match(localized.featuredImage.alt, /[À-ỹ]/u, page.slug);
    assert.ok(page.specifications.length > 0, page.slug);
    assert.ok(page.content.faqs.length > 0, page.slug);
    const copy = createLocalizedProductDetailCopy(page);
    for (const value of [
      copy.overview,
      copy.coreFunctions,
      copy.features,
      copy.applications,
      copy.installation,
      copy.customization,
    ]) {
      assert.ok(value.trim().length > 0, page.slug);
    }
  }
  assert.equal(imageCount, 132);
});

test("Vietnamese non-product pages retain content and relationship modules", () => {
  const solutionPages = pages.filter((page) => page.pageType === "solution");
  const resourcePages = pages.filter((page) => page.pageType === "resource");
  const regionPages = pages.filter((page) => page.pageType === "region");
  assert.deepEqual([solutionPages.length, resourcePages.length, regionPages.length], [6, 15, 5]);

  for (const page of solutionPages) {
    assert.ok(page.content.sections.length >= 4, page.slug);
    assert.ok(page.content.relatedLinks.length > 0, page.slug);
  }
  for (const page of resourcePages) {
    const source = resources.find((resource) => resource.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeResourceGuide(source, page);
    assert.equal(localized.sections.length, page.content.sections.length, page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.equal(localized.relatedSolutions.length, source.relatedSolutions.length, page.slug);
    assert.ok(localized.conversion, page.slug);
  }
  for (const page of regionPages) {
    const source = regionLandingPages.find((region) => region.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeRegionLandingPage(source, page);
    assert.equal(localized.recommendedCategories.length, source.recommendedCategories.length, page.slug);
    assert.equal(localized.recommendedSolutions.length, source.recommendedSolutions.length, page.slug);
    assert.equal(localized.faqs.length, page.content.faqs.length, page.slug);
  }
});

test("Vietnamese listings, FAQ, contact, and schema surfaces are complete", () => {
  assert.deepEqual(
    pages
      .filter((page) => page.pageType.endsWith("-listing"))
      .map((page) => [page.slug, ({ products: 36, solutions: 6, resources: 15, regions: 5 } as const)[page.slug as "products" | "solutions" | "resources" | "regions"]]),
    [["products", 36], ["solutions", 6], ["resources", 15], ["regions", 5]],
  );
  assert.equal(vietnameseStaticFaqItems.length, 30);
  const contact = readFileSync("src/components/contact/get-quote-form.tsx", "utf8");
  assert.match(contact, /vietnameseContactFormCopy/);
  assert.match(contact, /trackInquiryEvent/);
  assert.match(contact, /form_whatsapp_fallback/);
  assert.match(contact, /form_email_fallback/);
  for (const field of ["name", "company", "email", "phone", "country", "customerType", "productInterest", "projectStage", "targetDelivery", "quantity", "message"]) {
    assert.match(contact, new RegExp(`name=\\"${field}\\"`), field);
  }
  const contactRoute = readFileSync("src/app/[locale]/contact/page.tsx", "utf8");
  assert.match(contactRoute, /wechat-allan-qr\.png/);
  assert.match(contactRoute, /"@type": "ContactPage"/);
  assert.match(contactRoute, /createBreadcrumbSchema/);
  const faqRoute = readFileSync("src/app/[locale]/faqs/page.tsx", "utf8");
  assert.match(faqRoute, /createFaqPageSchema/);
});

test("Vietnamese candidate links remain local and query-free", () => {
  assert.equal(localizeReleasedHref("/en/downloads/", "vi"), "/vi/resources/");
  let checked = 0;
  for (const page of pages) {
    for (const link of page.content.relatedLinks) {
      assert.equal(link.href.includes("?"), false, `${page.slug}: ${link.href}`);
      assert.match(link.href, /^\/vi\//, `${page.slug}: ${link.href}`);
      assert.doesNotMatch(link.href, /^\/(en|zh|ar|de|es|fa)\//, page.slug);
      assert.equal(candidatePaths.has(new URL(link.href, "https://dualcorelink.com").pathname), true, `${page.slug}: ${link.href}`);
      checked += 1;
    }
  }
  assert.ok(checked > 0);
});
