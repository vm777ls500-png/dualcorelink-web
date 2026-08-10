import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import { splitBidiTechnicalText } from "../src/lib/bidi-technical-text";
import {
  localizeRegionLandingPage,
  localizeResourceGuide,
  localizeSolutionDetail,
  localizedNonProductSemanticModules,
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
import { nativeReviewEvidenceOverrides } from "../src/content/locales/native-review-decisions";
import type { SolutionDetailModel } from "../src/types/content";

const final33Paths = [
  "/ar/products/hotel-ceiling-background-speaker/",
  "/ar/products/brushed-aluminum-voice-telephone-information-panel/",
  "/ar/products/borui-red-matte-triple-socket-panel/",
  "/ar/products/smart-series-dual-vertical-socket-panel/",
  "/ar/products/smart-footlight-night-light-panel/",
  "/ar/products/smart-three-key-music-control-panel/",
  "/ar/products/smart-single-key-switch-panel/",
  "/ar/products/smart-voice-telephone-information-socket/",
  "/ar/products/brushed-aluminum-thermostat-control-panel/",
  "/ar/products/brushed-aluminum-sos-alarm-panel/",
  "/ar/products/vintage-gold-four-key-smart-switch-panel/",
  "/ar/products/vintage-gold-key-card-energy-saver-panel/",
  "/ar/products/borui-red-matte-room-status-four-key-switch-panel/",
  "/ar/products/borui-red-matte-usb-five-hole-socket/",
  "/ar/products/brushed-aluminum-86-base-doorbell-panel/",
  "/ar/products/smart-usb-five-hole-socket/",
  "/ar/products/infrared-repeater/",
  "/ar/solutions/hotel-delivery-robot-solution/",
  "/ar/solutions/ai-smart-display-solution/",
  "/ar/resources/hotel-rcu-wiring-system-architecture-guide/",
  "/ar/resources/hotel-smart-switch-panel-guide/",
  "/ar/resources/oem-odm-smart-panel-customization-guide/",
  "/ar/resources/hotel-guest-room-automation-guide/",
  "/ar/resources/hotel-room-control-system-cost-factors/",
  "/ar/resources/hotel-occupancy-sensor-selection-guide/",
  "/ar/resources/hotel-doorplate-room-display-buying-guide/",
  "/ar/resources/oem-odm-hotel-control-panel-development-process/",
  "/ar/resources/hotel-renovation-smart-room-upgrade-guide/",
  "/ar/resources/smart-panel-material-finish-selection-guide/",
  "/ar/resources/knx-vs-rcu-hotel-room-control/",
  "/ar/resources/hotel-guest-room-control-interfaces-guide/",
  "/ar/regions/southeast-asia/",
  "/ar/regions/vietnam/",
] as const;

const final33PathSet = new Set<string>(final33Paths);
const arabicEntries = multilingualPublicationManifest.filter(
  (entry) => entry.locale === "ar",
);
const final33Entries = arabicEntries.filter((entry) =>
  final33PathSet.has(new URL(entry.localizedUrl).pathname),
);
const previewPages = getReviewPreviewPublicationPages("ar");
const final33Pages = previewPages.filter((page) =>
  final33PathSet.has(new URL(page.localizedUrl).pathname),
);
const previewPathSet = new Set(
  previewPages.map((page) => new URL(page.localizedUrl).pathname),
);

function solutionFixture(slug: string): SolutionDetailModel {
  return {
    id: 1,
    slug,
    language: "en",
    direction: "ltr",
    translations: {},
    translationGroup: `solution-${slug}`,
    hreflang: {},
    title: "English solution",
    excerpt: "English excerpt",
    content: "English content",
    summary: "English summary",
    customerChallenges: "English challenges",
    architecture: "English architecture",
    keyBenefitsText: "English benefits",
    deploymentProcess: "English deployment",
    supportedProtocolsSummary: "English protocols",
    integrationNotes: "English integration",
    compatibilityNotes: "English compatibility",
    knownLimitations: "English limitations",
    heroImageId: 10,
    heroImage: {
      id: 10,
      sourceUrl: "/shared-solution.webp",
      altText: "Shared hero",
    },
    seoOpenGraphImage: null,
    seoTwitterImage: null,
    relatedProductIds: [2],
    relatedProducts: [
      {
        id: 2,
        slug: "hotel-smart-room-rcu-host-1",
        language: "en",
        direction: "ltr",
        translations: {},
        translationGroup: "product-2",
        hreflang: {},
        title: "Hotel Smart Room RCU Host 1",
        excerpt: "English product excerpt",
      },
    ],
    seo: { sitemapExclude: false },
    schema: { enabled: true },
  };
}

function assertArabicLinks(hrefs: readonly string[], owner: string): void {
  for (const href of hrefs) {
    assert.equal(href.includes("?"), false, `${owner}: query URL ${href}`);
    assert.match(href, /^\/ar\//, `${owner}: non-Arabic link ${href}`);
    assert.doesNotMatch(
      href,
      /^\/(en|de|es|vi|fa)\//,
      `${owner}: locale fallback ${href}`,
    );
    const pathname = new URL(href, "https://dualcorelink.com").pathname;
    assert.equal(
      previewPathSet.has(pathname),
      true,
      `${owner}: missing Arabic candidate ${pathname}`,
    );
  }
}

test("FINAL-33 inventory is exact and approved only by Allan", () => {
  assert.equal(arabicEntries.length, 69);
  assert.equal(final33Entries.length, 33);
  assert.equal(final33Pages.length, 33);
  assert.deepEqual(
    final33Entries.map((entry) => new URL(entry.localizedUrl).pathname).sort(),
    [...final33Paths].sort(),
  );
  assert.deepEqual(
    Object.fromEntries(
      ["product", "solution", "resource", "region"].map((pageType) => [
        pageType,
        final33Entries.filter((entry) => entry.pageType === pageType).length,
      ]),
    ),
    { product: 17, solution: 2, resource: 12, region: 2 },
  );
  assert.equal(
    final33Entries.every(
      (entry) =>
        entry.nativeReviewStatus === "approved" &&
        entry.nativeReviewer === "Allan" &&
        entry.nativeReviewDate === "2026-08-11" &&
        !entry.productionReleaseReady,
    ),
    true,
  );
});

test("all sixty-nine approvals retain exact batch counts behind the publication gate", () => {
  const approved = arabicEntries.filter(
    (entry) => entry.nativeReviewStatus === "approved",
  );
  assert.equal(approved.length, 69);
  assert.equal(
    approved.every(
      (entry) =>
        entry.nativeReviewer === "Allan" &&
        entry.nativeReviewDate === "2026-08-11",
    ),
    true,
  );
  assert.equal(
    arabicEntries.filter((entry) => entry.nativeReviewStatus === "pending").length,
    0,
  );
  const arabicOverrides = nativeReviewEvidenceOverrides.filter(
    (entry) => entry.locale === "ar",
  );
  const batchCount = (batch: string) =>
    arabicOverrides.filter((entry) => entry.nativeReviewNotes.includes(batch)).length;
  assert.equal(batchCount("AR-1 foundation batch"), 7);
  assert.equal(batchCount("AR-2 P0 detail batch"), 14);
  assert.equal(batchCount("AR-3 P1 product detail batch"), 15);
  assert.equal(batchCount("FINAL-33 batch"), 33);
  assert.equal(arabicOverrides.length, 69);
  assert.deepEqual(
    approved.map((entry) => new URL(entry.localizedUrl).pathname).sort(),
    previewPages.map((page) => new URL(page.localizedUrl).pathname).sort(),
  );
  assert.equal(
    arabicEntries.filter((entry) => entry.productionReleaseReady).length,
    0,
  );
  assert.equal(getStaticExportEligibleEntries(arabicEntries).length, 0);
  assert.equal(getSitemapEligibleEntries(arabicEntries).length, 0);
});

test("the seventeen products retain full composition and 55-image parity", () => {
  const pages = final33Pages.filter((page) => page.pageType === "product");
  assert.equal(pages.length, 17);
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
  let sourceImages = 0;
  let localizedImages = 0;
  for (const page of pages) {
    const source = productGalleries[page.slug];
    assert.ok(source, page.slug);
    const localized = localizeProductGallery(source, page);
    sourceImages += source.gallery.length + 1;
    localizedImages += localized.gallery.length + 1;
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
    assert.match(localized.featuredImage.alt, /[\u0600-\u06ff]/, page.slug);
    assert.equal(
      localized.gallery.every((image) => /[\u0600-\u06ff]/.test(image.alt)),
      true,
      page.slug,
    );
    const copy = createLocalizedProductDetailCopy(page);
    assert.equal(page.content.sections.length, 4, page.slug);
    assert.equal(page.specifications.length, 4, page.slug);
    assert.equal(copy.faqs.length, 3, page.slug);
    for (const value of [
      copy.overview,
      copy.coreFunctions,
      copy.features,
      copy.applications,
      copy.installation,
      copy.customization,
    ]) {
      assert.ok(value.trim(), page.slug);
    }
    assert.match(copy.coreFunctions, /^يندرج هذا المنتج ضمن فئة /, page.slug);
    assert.doesNotMatch(copy.coreFunctions, / هو .* يخدم /, page.slug);
    assert.equal(
      copy.faqs[0]?.question,
      "ما الاستخدام الأساسي لهذا المنتج؟",
      page.slug,
    );
    assertArabicLinks(
      [
        ...page.content.relatedLinks.map((link) => link.href),
        page.content.cta.href,
        page.content.cta.secondaryHref ?? "/ar/solutions/",
      ],
      page.slug,
    );
  }
  assert.equal(sourceImages, 55);
  assert.equal(localizedImages, 55);
});

test("the two solutions preserve semantic, media, relationship, FAQ, and CTA parity", () => {
  const pages = final33Pages.filter((page) => page.pageType === "solution");
  assert.equal(pages.length, 2);
  assert.equal(localizedNonProductSemanticModules.solution.length, 13);
  for (const page of pages) {
    const source = solutionFixture(page.slug);
    const localized = localizeSolutionDetail(source, page);
    assert.equal(localized.direction, "rtl", page.slug);
    assert.equal(localized.heroImage?.sourceUrl, source.heroImage?.sourceUrl, page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.match(localized.relatedProducts[0].title, /[\u0600-\u06ff]/, page.slug);
    assert.equal(page.content.sections.length, 4, page.slug);
    assert.equal(page.content.faqs.length, 3, page.slug);
    for (const value of [
      localized.summary,
      localized.customerChallenges,
      localized.architecture,
      localized.keyBenefitsText,
      localized.deploymentProcess,
      localized.integrationNotes,
      localized.compatibilityNotes,
      localized.knownLimitations,
    ]) {
      assert.ok(value.trim(), page.slug);
    }
    assert.equal(localized.schema.enabled, true, page.slug);
    assert.equal(localized.inquiryCtaLabel, page.content.cta.label, page.slug);
    assertArabicLinks(
      [...page.content.relatedLinks.map((link) => link.href), page.content.cta.href],
      page.slug,
    );
  }
});

test("the twelve resources retain article and conversion relationships", () => {
  const pages = final33Pages.filter((page) => page.pageType === "resource");
  assert.equal(pages.length, 12);
  assert.equal(localizedNonProductSemanticModules.resource.length, 11);
  for (const page of pages) {
    const source = resources.find((resource) => resource.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeResourceGuide(source, page);
    assert.equal(localized.sections.length, 4, page.slug);
    assert.equal(
      localized.sections.every((section) => section.body.length > 0),
      true,
      page.slug,
    );
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.equal(localized.relatedSolutions.length, source.relatedSolutions.length, page.slug);
    assert.equal(
      localized.conversion?.continueReadingSlugs.length,
      source.conversion?.continueReadingSlugs.length,
      page.slug,
    );
    assert.equal(localized.conversion?.midCtaAfterSectionId, "ar-section-2", page.slug);
    assertArabicLinks(
      [
        ...localized.relatedProducts.map((link) => link.href),
        ...localized.relatedSolutions.map((link) => link.href),
        ...localized.relatedRegions.map((link) => link.href),
        ...localized.relatedDownloads.map((link) => link.href),
        localized.cta.primaryHref,
        localized.cta.secondaryHref,
        ...(localized.conversion?.continueReadingSlugs.map(
          (slug) => `/ar/resources/${slug}/`,
        ) ?? []),
      ],
      page.slug,
    );
  }
});

test("the two regions preserve market guidance and relationship composition", () => {
  const pages = final33Pages.filter((page) => page.pageType === "region");
  assert.equal(pages.length, 2);
  assert.equal(localizedNonProductSemanticModules.region.length, 9);
  for (const page of pages) {
    const source = regionLandingPages.find((region) => region.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeRegionLandingPage(source, page);
    assert.ok(localized.regionalNeeds.trim(), page.slug);
    assert.match(localized.regionalNeeds, /^ابدأ بمراجعة /, page.slug);
    assert.ok(localized.solutionPlanning.trim(), page.slug);
    assert.ok(localized.customization.trim(), page.slug);
    assert.equal(localized.recommendedCategories.length, source.recommendedCategories.length, page.slug);
    assert.equal(localized.recommendedSolutions.length, source.recommendedSolutions.length, page.slug);
    assert.equal(localized.faqs.length, 3, page.slug);
    assert.equal(localized.primaryCta, page.content.cta.label, page.slug);
    assertArabicLinks(
      [...page.content.relatedLinks.map((link) => link.href), page.content.cta.href],
      page.slug,
    );
  }
});

test("technical tokens remain isolated by the established bidi helper", () => {
  const segments = splitBidiTechnicalText(
    "يدعم RCU وKNX وHVAC وRS485 وOEM/ODM وUSB وI/O وAC/DC بجهد 220V وتردد 50Hz ومقاس 86mm وحماية IP20.",
  );
  const ltr = segments
    .filter((segment) => segment.direction === "ltr")
    .map((segment) => segment.value.replace(/\s/g, ""));
  for (const token of [
    "RCU",
    "KNX",
    "HVAC",
    "RS485",
    "OEM/ODM",
    "USB",
    "I/O",
    "AC/DC",
    "220V",
    "50Hz",
    "86mm",
    "IP20",
  ]) {
    assert.equal(ltr.includes(token), true, token);
  }
});

test("canonical, hreflang, and schema evidence remain review-only", () => {
  const routeEvidence = [
    ["src/app/[locale]/products/[slug]/page.tsx", ["createProductSchema", "createBreadcrumbSchema"]],
    ["src/app/[locale]/solutions/[slug]/page.tsx", ["createServiceSchema", "createBreadcrumbSchema"]],
    ["src/app/[locale]/resources/[slug]/page.tsx", ["createArticleSchema", "createBreadcrumbSchema"]],
    ["src/app/[locale]/regions/[slug]/page.tsx", ["createCreativeWorkSchema", "createBreadcrumbSchema"]],
  ] as const;
  for (const [path, markers] of routeEvidence) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /supportsSpecializedLocalizedComposition/, path);
    for (const marker of markers) {
      assert.match(source, new RegExp(marker), `${path}: ${marker}`);
    }
  }
  for (const page of final33Pages) {
    assert.equal(page.localizedUrl, `https://dualcorelink.com/ar/${page.path}/`, page.slug);
    const hreflang = getPublicationHreflang(page.path);
    assert.equal(hreflang.ar, page.localizedUrl, page.slug);
    assert.equal(hreflang.en, page.sourceUrl, page.slug);
    assert.equal(hreflang["x-default"], page.sourceUrl, page.slug);
  }
  assert.equal(
    getSitemapEligibleEntries(multilingualPublicationManifest).some(
      (entry) => entry.locale === "ar",
    ),
    false,
  );
});

test("FINAL-33 review artifacts seal exactly thirty-three Allan approvals", () => {
  const packet = readFileSync(
    "docs/reviews/multilingual/ar-final-33-human-review-20260811.md",
    "utf8",
  );
  const decisions = readFileSync(
    "docs/reviews/multilingual/ar-final-33-decisions-20260811.md",
    "utf8",
  );
  const report = readFileSync(
    "docs/reports/multilingual-ar-final-33-human-review-preparation-20260811.md",
    "utf8",
  );
  for (const path of final33Paths) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(packet, new RegExp(escaped), path);
    assert.match(decisions, new RegExp(`https://dualcorelink\\.com${escaped}`), path);
  }
  assert.equal((packet.match(/^### \d+\. /gm) ?? []).length, 33);
  assert.equal((packet.match(/Human Decision: approved$/gm) ?? []).length, 33);
  assert.equal((packet.match(/Reviewer: Allan$/gm) ?? []).length, 33);
  assert.equal((packet.match(/Review Date: 2026-08-11$/gm) ?? []).length, 33);
  assert.equal(
    (decisions.match(/\| approved \| Allan \| 2026-08-11 \| false \|/g) ?? [])
      .length,
    33,
  );
  assert.doesNotMatch(decisions, /\| pending \|/);
  assert.match(report, /Automatic revisions: 19 pages/);
  assert.match(report, /FINAL-33 approved: 33/);
  assert.match(report, /Arabic approved total: 69/);
  assert.match(report, /Arabic pending: 0/);
  assert.match(report, /productionReleaseReady: 0/);
  assert.match(report, /Arabic public pages: 0/);
  assert.match(report, /Arabic sitemap URLs: 0/);
});
