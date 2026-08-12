import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getDirection } from "../src/config/i18n";
import { productGalleries } from "../src/config/product-galleries";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import {
  germanStaticFaqItems,
  persianStaticFaqItems,
  spanishStaticFaqItems,
} from "../src/config/static-faqs";
import {
  localizeRegionLandingPage,
  localizeReleasedHref,
  localizeResourceGuide,
} from "../src/lib/localized-nonproduct";
import {
  createLocalizedProductDetailCopy,
  localizeProductGallery,
  productDetailSectionKeys,
} from "../src/lib/localized-product-detail";
import {
  getPublicationHreflang,
  getReviewPreviewPublicationPages,
} from "../src/lib/localized-publication";
import {
  getSitemapEligibleEntries,
  getStaticExportEligibleEntries,
} from "../src/lib/multilingual-publication-control";
import { multilingualPublicationManifest } from "../src/lib/multilingual-publication-manifest";
import {
  getReviewPreviewLocales,
  supportsSpecializedLocalizedComposition,
} from "../src/lib/multilingual-review-preview";
import {
  buildHeaderLanguageOptions,
  buildHeaderPrimaryNavigation,
  buildHeaderProductsMenu,
} from "../src/lib/navigation-publication";

const locales = ["de", "es", "fa"] as const;
const faqItems = {
  de: germanStaticFaqItems,
  es: spanishStaticFaqItems,
  fa: persianStaticFaqItems,
};
const expectedDistribution = {
  "product-listing": 1,
  product: 36,
  "solution-listing": 1,
  solution: 6,
  "resource-listing": 1,
  resource: 15,
  "region-listing": 1,
  region: 5,
  static: 3,
};

test("DE, ES, and FA inventories are exactly 69 each and production ready", () => {
  assert.deepEqual(getReviewPreviewLocales("de,es,fa"), locales);
  let total = 0;
  for (const locale of locales) {
    const pages = getReviewPreviewPublicationPages(locale);
    const entries = multilingualPublicationManifest.filter(
      (entry) => entry.locale === locale,
    );
    total += pages.length;
    assert.equal(pages.length, 69, locale);
    assert.equal(entries.length, 69, locale);
    assert.deepEqual(
      Object.fromEntries(
        [...new Set(pages.map((page) => page.pageType))].map((pageType) => [
          pageType,
          pages.filter((page) => page.pageType === pageType).length,
        ]),
      ),
      expectedDistribution,
      locale,
    );
    assert.equal(
      pages.filter((page) => page.deliveryMode === "validated-import-payload").length,
      42,
      locale,
    );
    assert.equal(pages.filter((page) => page.deliveryMode === "file").length, 27, locale);
    assert.equal(entries.filter((entry) => entry.nativeReviewStatus === "pending").length, 0, locale);
    assert.equal(entries.filter((entry) => entry.nativeReviewStatus === "approved").length, 69, locale);
    assert.equal(entries.every((entry) => entry.nativeReviewer === "Allan"), true, locale);
    assert.equal(entries.every((entry) => entry.nativeReviewDate === "2026-08-12"), true, locale);
    assert.equal(entries.filter((entry) => entry.productionReleaseReady).length, 69, locale);
    assert.equal(getStaticExportEligibleEntries(entries).length, 69, locale);
    assert.equal(getSitemapEligibleEntries(entries).length, 69, locale);
  }
  assert.equal(total, 207);
});

test("all eleven specialized route families are shared by the three review locales", () => {
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
    assert.match(
      readFileSync(`src/app/[locale]/${route}`, "utf8"),
      /supportsSpecializedLocalizedComposition/,
      route,
    );
  }
  for (const locale of locales) {
    assert.equal(supportsSpecializedLocalizedComposition(locale), true, locale);
  }
});

test("product media and semantic structure are complete for all 108 localized details", () => {
  assert.equal(productDetailSectionKeys.length, 12);
  for (const locale of locales) {
    const products = getReviewPreviewPublicationPages(locale).filter(
      (page) => page.pageType === "product",
    );
    let imageCount = 0;
    for (const page of products) {
      const source = productGalleries[page.slug];
      assert.ok(source, `${locale}:${page.slug}`);
      const localized = localizeProductGallery(source, page);
      imageCount += localized.gallery.length + 1;
      assert.equal(localized.featuredImage.src, source.featuredImage.src, page.slug);
      assert.deepEqual(
        localized.gallery.map((image) => [image.src, image.thumbnailSrc]),
        source.gallery.map((image) => [image.src, image.thumbnailSrc]),
        `${locale}:${page.slug}`,
      );
      assert.ok(localized.featuredImage.alt.trim().length > 0, page.slug);
      assert.ok(page.specifications.length > 0, page.slug);
      assert.ok(page.content.faqs.length > 0, page.slug);
      const copy = createLocalizedProductDetailCopy(page);
      for (const section of [
        copy.overview,
        copy.coreFunctions,
        copy.features,
        copy.applications,
        copy.installation,
        copy.customization,
      ]) {
        assert.ok(section.trim().length > 0, `${locale}:${page.slug}`);
      }
    }
    assert.equal(products.length, 36, locale);
    assert.equal(imageCount, 132, locale);
  }
});

test("solutions, resources, and regions retain complete content and relationships", () => {
  for (const locale of locales) {
    const pages = getReviewPreviewPublicationPages(locale);
    const solutions = pages.filter((page) => page.pageType === "solution");
    const resourcePages = pages.filter((page) => page.pageType === "resource");
    const regions = pages.filter((page) => page.pageType === "region");
    assert.deepEqual([solutions.length, resourcePages.length, regions.length], [6, 15, 5]);
    for (const page of solutions) {
      assert.ok(page.content.sections.length >= 4, `${locale}:${page.slug}`);
      assert.ok(page.content.relatedLinks.length > 0, `${locale}:${page.slug}`);
      assert.ok(page.content.faqs.length > 0, `${locale}:${page.slug}`);
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
    for (const page of regions) {
      const source = regionLandingPages.find((region) => region.slug === page.slug);
      assert.ok(source, page.slug);
      const localized = localizeRegionLandingPage(source, page);
      assert.equal(localized.recommendedCategories.length, source.recommendedCategories.length, page.slug);
      assert.equal(localized.recommendedSolutions.length, source.recommendedSolutions.length, page.slug);
      assert.equal(localized.faqs.length, page.content.faqs.length, page.slug);
    }
  }
});

test("listings, header navigation, Contact, and FAQ stay localized and complete", () => {
  const contact = readFileSync("src/components/contact/get-quote-form.tsx", "utf8");
  const contactRoute = readFileSync("src/app/[locale]/contact/page.tsx", "utf8");
  const header = readFileSync("src/components/layout/header-navigation.tsx", "utf8");
  for (const locale of locales) {
    const pages = getReviewPreviewPublicationPages(locale);
    assert.deepEqual(
      pages.filter((page) => page.pageType.endsWith("-listing")).map((page) => page.slug),
      ["products", "solutions", "resources", "regions"],
      locale,
    );
    assert.equal(faqItems[locale].length, 30, locale);
    const navigation = buildHeaderPrimaryNavigation(locale);
    assert.equal(navigation.length, 7, locale);
    assert.equal(navigation.every((item) => item.href.startsWith(`/${locale}/`)), true, locale);
    const productMenu = buildHeaderProductsMenu(locale);
    assert.equal(
      [...productMenu.quickLinks, ...productMenu.categories, ...productMenu.series, ...productMenu.featured]
        .every((item) => item.href.startsWith(`/${locale}/`)),
      true,
      locale,
    );
    const languageOptions = buildHeaderLanguageOptions(locale, "products/hotel-smart-room-rcu-host-1");
    assert.deepEqual(
      languageOptions.filter((option) => ["de", "es", "fa"].includes(option.locale)).map((option) => option.locale),
      locales,
      locale,
    );
  }
  assert.match(contact, /getFinalReviewContactFormCopy/);
  assert.match(contact, /trackInquiryEvent/);
  assert.match(contact, /form_whatsapp_fallback/);
  assert.match(contact, /form_email_fallback/);
  assert.match(contactRoute, /wechat-allan-qr\.png/);
  assert.match(contactRoute, /"@type": "ContactPage"/);
  assert.match(contactRoute, /createBreadcrumbSchema/);
  const faqRoute = readFileSync("src/app/[locale]/faqs/page.tsx", "utf8");
  assert.match(faqRoute, /createFaqPageSchema/);
  assert.match(faqRoute, /isFinalReviewLocale\(locale\)/);
  assert.match(header, /href=\{navigation\[0\]\?\.href/);
});

test("all candidate relationship URLs are local, valid, and query-free", () => {
  for (const locale of locales) {
    const pages = getReviewPreviewPublicationPages(locale);
    const candidatePaths = new Set(
      pages.map((page) => new URL(page.localizedUrl).pathname),
    );
    let checked = 0;
    assert.equal(localizeReleasedHref("/en/downloads/", locale), `/${locale}/resources/`);
    for (const page of pages) {
      for (const link of page.content.relatedLinks) {
        assert.equal(link.href.includes("?"), false, `${locale}:${page.slug}`);
        assert.match(link.href, new RegExp(`^/${locale}/`), `${locale}:${page.slug}`);
        assert.equal(
          candidatePaths.has(new URL(link.href, "https://dualcorelink.com").pathname),
          true,
          `${locale}:${page.slug}:${link.href}`,
        );
        checked += 1;
      }
    }
    assert.ok(checked > 0, locale);
  }
});

test("candidate SEO surfaces expose complete hreflang while direction stays exact", () => {
  assert.equal(getDirection("de"), "ltr");
  assert.equal(getDirection("es"), "ltr");
  assert.equal(getDirection("fa"), "rtl");
  const hreflang = getPublicationHreflang("products/hotel-smart-room-rcu-host-1");
  assert.deepEqual(Object.keys(hreflang).sort(), ["ar", "de", "en", "es", "fa", "vi", "x-default", "zh"]);
  assert.equal(hreflang["x-default"], hreflang.en);
  for (const locale of locales) {
    for (const page of getReviewPreviewPublicationPages(locale)) {
      assert.ok(page.seoTitle.trim().length > 0, `${locale}:${page.slug}`);
      assert.ok(page.metaDescription.trim().length > 0, `${locale}:${page.slug}`);
      assert.match(new URL(page.localizedUrl).pathname, new RegExp(`^/${locale}/`));
    }
  }
});

test("decision sheets contain exactly 69 Allan approvals without release readiness", () => {
  for (const locale of locales) {
    const source = readFileSync(
      `docs/reviews/multilingual/${locale}-full-decisions-20260812.md`,
      "utf8",
    );
    const rows = source.split(/\r?\n/).filter((line) => line.startsWith(`| /${locale}/`));
    assert.equal(rows.length, 69, locale);
    for (const row of rows) {
      assert.match(row, new RegExp(`^\\| /${locale}/.* \\| [a-z-]+ \\| approved \\| Allan \\| 2026-08-12 \\| false \\|$`));
    }
  }
});
