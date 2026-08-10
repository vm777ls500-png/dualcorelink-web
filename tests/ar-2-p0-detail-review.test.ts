import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import { splitBidiTechnicalText } from "../src/lib/bidi-technical-text";
import {
  localizeRegionLandingPage,
  localizeReleasedHref,
  localizeResourceGuide,
  localizeSolutionDetail,
  localizedNonProductSemanticModules,
} from "../src/lib/localized-nonproduct";
import {
  createLocalizedProductDetailCopy,
  localizeProductConversionProfile,
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
import type { SolutionDetailModel } from "../src/types/content";

const ar2Paths = [
  "/ar/products/smart-four-key-scene-control-panel/",
  "/ar/products/hotel-smart-room-rcu-host-1/",
  "/ar/products/rcu-controller-cabinet/",
  "/ar/products/86-type-ai-smart-control-display/",
  "/ar/solutions/oem-odm-custom-panel-solution/",
  "/ar/solutions/rcu-room-control-solution/",
  "/ar/solutions/smart-hotel-automation-solution/",
  "/ar/solutions/hotel-guest-room-control-solution/",
  "/ar/resources/what-is-hotel-rcu-room-control-system/",
  "/ar/resources/hotel-rcu-buying-guide/",
  "/ar/resources/smart-hotel-room-control-system-guide/",
  "/ar/regions/middle-east/",
  "/ar/regions/saudi-arabia/",
  "/ar/regions/uae/",
] as const;

const ar1Paths = [
  "/ar/products/",
  "/ar/solutions/",
  "/ar/resources/",
  "/ar/regions/",
  "/ar/about/",
  "/ar/contact/",
  "/ar/faqs/",
] as const;

const ar2PathSet = new Set<string>(ar2Paths);
const arabicEntries = multilingualPublicationManifest.filter(
  (entry) => entry.locale === "ar",
);
const ar2Entries = arabicEntries.filter((entry) =>
  ar2PathSet.has(new URL(entry.localizedUrl).pathname),
);
const previewPages = getReviewPreviewPublicationPages("ar");
const ar2Pages = previewPages.filter((page) =>
  ar2PathSet.has(new URL(page.localizedUrl).pathname),
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
    heroImage: { id: 10, sourceUrl: "/shared-solution.webp", altText: "Shared hero" },
    seoOpenGraphImage: null,
    seoTwitterImage: null,
    relatedProductIds: [2],
    relatedProducts: [{
      id: 2,
      slug: "hotel-smart-room-rcu-host-1",
      language: "en",
      direction: "ltr",
      translations: {},
      translationGroup: "product-2",
      hreflang: {},
      title: "Hotel Smart Room RCU Host 1",
      excerpt: "English product excerpt",
    }],
    seo: { sitemapExclude: false },
    schema: { enabled: true },
  };
}

function assertArabicLinks(hrefs: readonly string[], owner: string): void {
  for (const href of hrefs) {
    assert.equal(href.includes("?"), false, `${owner}: query URL ${href}`);
    assert.doesNotMatch(href, /^\/(en|de|es|vi|fa)\//, `${owner}: fallback ${href}`);
    assert.match(href, /^\/ar\//, `${owner}: non-Arabic link ${href}`);
    const pathname = new URL(href, "https://dualcorelink.com").pathname;
    assert.equal(previewPathSet.has(pathname), true, `${owner}: missing target ${pathname}`);
  }
}

test("AR-2 inventory is the exact fourteen P0 detail candidates", () => {
  assert.equal(ar2Entries.length, 14);
  assert.deepEqual(
    ar2Entries.map((entry) => new URL(entry.localizedUrl).pathname).sort(),
    [...ar2Paths].sort(),
  );
  assert.deepEqual(
    Object.fromEntries(
      ["product", "solution", "resource", "region"].map((pageType) => [
        pageType,
        ar2Entries.filter((entry) => entry.pageType === pageType).length,
      ]),
    ),
    { product: 4, solution: 4, resource: 3, region: 3 },
  );
  assert.equal(ar2Entries.every((entry) => entry.priority === "P0"), true);
  assert.equal(ar2Pages.length, 14);
});

test("AR-1 stays sealed and only the exact AR-2 scope receives approval", () => {
  const approved = arabicEntries.filter(
    (entry) => entry.nativeReviewStatus === "approved",
  );
  assert.equal(arabicEntries.length, 69);
  assert.equal(approved.length, 21);
  assert.deepEqual(
    approved.map((entry) => new URL(entry.localizedUrl).pathname).sort(),
    [...ar1Paths, ...ar2Paths].sort(),
  );
  assert.equal(approved.every((entry) => entry.nativeReviewer === "Allan"), true);
  assert.equal(approved.every((entry) => entry.nativeReviewDate === "2026-08-11"), true);
  assert.equal(ar2Entries.every((entry) => entry.nativeReviewStatus === "approved"), true);
  assert.equal(ar2Entries.every((entry) => entry.nativeReviewer === "Allan"), true);
  assert.equal(ar2Entries.every((entry) => entry.nativeReviewDate === "2026-08-11"), true);
  assert.equal(
    arabicEntries.filter(
      (entry) => entry.nativeReviewStatus === "pending" && !ar2PathSet.has(new URL(entry.localizedUrl).pathname),
    ).length,
    48,
  );
  assert.equal(arabicEntries.filter((entry) => entry.nativeReviewStatus === "pending").length, 48);
  assert.equal(arabicEntries.filter((entry) => entry.productionReleaseReady).length, 0);
  assert.equal(getStaticExportEligibleEntries(arabicEntries).length, 0);
  assert.equal(getSitemapEligibleEntries(arabicEntries).length, 0);
});

test("the four AR-2 products preserve gallery, content, specification, and conversion parity", () => {
  const products = ar2Pages.filter((page) => page.pageType === "product");
  assert.equal(products.length, 4);
  assert.deepEqual(productDetailSectionKeys, [
    "overview", "coreFunctions", "features", "applications", "buyingGuide",
    "installation", "customization", "specifications", "relatedProducts",
    "faq", "commercialOptions", "quote",
  ]);
  let mediaCount = 0;
  for (const page of products) {
    const source = productGalleries[page.slug];
    assert.ok(source, page.slug);
    const localized = localizeProductGallery(source, page);
    mediaCount += localized.gallery.length + 1;
    assert.equal(localized.featuredImage.src, source.featuredImage.src, page.slug);
    assert.equal(localized.featuredImage.thumbnailSrc, source.featuredImage.thumbnailSrc, page.slug);
    assert.deepEqual(
      localized.gallery.map((image) => [image.src, image.thumbnailSrc]),
      source.gallery.map((image) => [image.src, image.thumbnailSrc]),
      page.slug,
    );
    assert.match(localized.featuredImage.alt, /[\u0600-\u06ff]/, page.slug);
    assert.equal(localized.gallery.every((image) => /[\u0600-\u06ff]/.test(image.alt)), true, page.slug);
    const copy = createLocalizedProductDetailCopy(page);
    assert.equal(page.content.sections.length, 4, page.slug);
    assert.equal(page.specifications.length, 4, page.slug);
    assert.equal(copy.faqs.length, 3, page.slug);
    for (const value of [
      copy.overview, copy.coreFunctions, copy.features, copy.applications,
      copy.installation, copy.customization,
    ]) assert.ok(value.trim(), page.slug);
    const conversion = localizeProductConversionProfile({
      key: "ar2", label: "English", summary: "English", highlights: [],
      projectFit: [], selectionChecks: [], quoteChecklist: [], solutions: [],
      resources: [], whatsappPrompt: "English",
    }, page);
    assert.match(conversion?.label ?? "", /[\u0600-\u06ff]/, page.slug);
    assertArabicLinks(
      [...page.content.relatedLinks.map((link) => link.href), page.content.cta.href],
      page.slug,
    );
  }
  assert.equal(mediaCount, 15);
});

test("the four AR-2 solutions preserve specialized semantic, media, relationship, CTA, and schema inputs", () => {
  const solutions = ar2Pages.filter((page) => page.pageType === "solution");
  assert.equal(solutions.length, 4);
  assert.equal(localizedNonProductSemanticModules.solution.length, 13);
  for (const page of solutions) {
    const source = solutionFixture(page.slug);
    const localized = localizeSolutionDetail(source, page);
    assert.equal(localized.direction, "rtl", page.slug);
    assert.equal(localized.heroImage?.sourceUrl, source.heroImage?.sourceUrl, page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.match(localized.relatedProducts[0].title, /[\u0600-\u06ff]/, page.slug);
    assert.equal(page.content.sections.length, 4, page.slug);
    assert.equal(page.content.faqs.length, 3, page.slug);
    for (const value of [
      localized.summary, localized.customerChallenges, localized.architecture,
      localized.keyBenefitsText, localized.deploymentProcess,
      localized.integrationNotes, localized.compatibilityNotes, localized.knownLimitations,
    ]) assert.ok(value.trim(), page.slug);
    assert.equal(localized.schema.enabled, true, page.slug);
    assert.equal(localized.inquiryCtaLabel, page.content.cta.label, page.slug);
    assertArabicLinks(
      [...page.content.relatedLinks.map((link) => link.href), page.content.cta.href],
      page.slug,
    );
  }
});

test("the three AR-2 resources retain complete article and conversion relationships", () => {
  const pages = ar2Pages.filter((page) => page.pageType === "resource");
  assert.equal(pages.length, 3);
  assert.equal(localizedNonProductSemanticModules.resource.length, 11);
  for (const page of pages) {
    const source = resources.find((resource) => resource.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeResourceGuide(source, page);
    assert.equal(localized.sections.length, 4, page.slug);
    assert.equal(localized.sections.every((section) => section.body.length > 0), true, page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.equal(localized.relatedSolutions.length, source.relatedSolutions.length, page.slug);
    assert.equal(localized.conversion?.continueReadingSlugs.length, source.conversion?.continueReadingSlugs.length, page.slug);
    assert.equal(localized.conversion?.midCtaAfterSectionId, "ar-section-2", page.slug);
    assertArabicLinks([
      ...localized.relatedProducts.map((link) => link.href),
      ...localized.relatedSolutions.map((link) => link.href),
      ...localized.relatedRegions.map((link) => link.href),
      ...localized.relatedDownloads.map((link) => link.href),
      localized.cta.primaryHref,
      localized.cta.secondaryHref,
    ], page.slug);
    assert.equal(
      localized.relatedDownloads.every((link) => /[\u0600-\u06ff]/.test(link.title)),
      true,
      page.slug,
    );
  }
});

test("the three AR-2 regions retain market guidance without losing relationships", () => {
  const pages = ar2Pages.filter((page) => page.pageType === "region");
  assert.equal(pages.length, 3);
  assert.equal(localizedNonProductSemanticModules.region.length, 9);
  for (const page of pages) {
    const source = regionLandingPages.find((region) => region.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeRegionLandingPage(source, page);
    assert.ok(localized.regionalNeeds.trim(), page.slug);
    assert.ok(localized.solutionPlanning.trim(), page.slug);
    assert.ok(localized.customization.trim(), page.slug);
    assert.equal(localized.recommendedCategories.length, source.recommendedCategories.length, page.slug);
    assert.equal(localized.recommendedSolutions.length, source.recommendedSolutions.length, page.slug);
    assert.equal(localized.faqs.length, 3, page.slug);
    assert.equal(localized.primaryCta, page.content.cta.label, page.slug);
    assert.equal(localized.secondaryCta, "مراجعة الأدلة الفنية", page.slug);
    assertArabicLinks(
      [...page.content.relatedLinks.map((link) => link.href), page.content.cta.href],
      page.slug,
    );
  }
  assert.equal(localizeReleasedHref("/en/downloads/", "ar"), "/ar/resources/");
});

test("AR-2 uses the existing bidi helper and contains only scoped editorial overrides", () => {
  const segments = splitBidiTechnicalText(
    "يدعم RCU وKNX وHVAC وRS485 وOEM/ODM وI/O وUSB بجهد 220V وطراز RCU-01.",
  );
  const ltr = segments.filter((segment) => segment.direction === "ltr").map((segment) => segment.value.replace(/\s/g, ""));
  for (const token of ["RCU", "KNX", "HVAC", "RS485", "OEM/ODM", "I/O", "USB", "220V", "RCU-01"]) {
    assert.equal(ltr.includes(token), true, token);
  }
  const catalog = readFileSync("src/content/locales/m3a-catalog.ts", "utf8");
  assert.equal((catalog.match(/arFaqQuestion:/g) ?? []).length, 1);
  assert.equal((catalog.match(/arAudienceQuestion:/g) ?? []).length, 1);
  const fourKey = ar2Pages.find((page) => page.slug === "smart-four-key-scene-control-panel");
  const rcuGuide = ar2Pages.find((page) => page.slug === "what-is-hotel-rcu-room-control-system");
  assert.equal(
    fourKey?.content.faqs[0]?.question,
    "ما الاستخدام الأساسي للوحة الذكية ذات المفاتيح الأربعة للتحكم في المشاهد؟",
  );
  assert.equal(
    rcuGuide?.content.faqs[0]?.question,
    "لمن يناسب هذا الدليل عن نظام RCU للتحكم في غرف الفنادق؟",
  );
});

test("review-preview SEO/schema composition stays isolated from production publication", () => {
  const routeEvidence = [
    ["src/app/[locale]/products/[slug]/page.tsx", ["createProductSchema", "createBreadcrumbSchema"]],
    ["src/app/[locale]/solutions/[slug]/page.tsx", ["createServiceSchema", "createBreadcrumbSchema"]],
    ["src/app/[locale]/resources/[slug]/page.tsx", ["createArticleSchema", "createBreadcrumbSchema"]],
    ["src/app/[locale]/regions/[slug]/page.tsx", ["createCreativeWorkSchema", "createBreadcrumbSchema"]],
  ] as const;
  for (const [path, markers] of routeEvidence) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /supportsSpecializedLocalizedComposition/, path);
    for (const marker of markers) assert.match(source, new RegExp(marker), `${path}: ${marker}`);
  }
  for (const page of ar2Pages) {
    assert.equal(page.localizedUrl, `https://dualcorelink.com/ar/${page.path}/`, page.slug);
    const hreflang = getPublicationHreflang(page.path);
    assert.equal(hreflang.ar, page.localizedUrl, page.slug);
    assert.equal(hreflang.en, page.sourceUrl, page.slug);
    assert.equal(hreflang["x-default"], page.sourceUrl, page.slug);
  }
  const productionLocalizedEntries = getSitemapEligibleEntries(
    multilingualPublicationManifest,
  );
  assert.equal(productionLocalizedEntries.length, 69);
  assert.equal(productionLocalizedEntries.some((entry) => entry.locale === "ar"), false);
});

test("AR-2 review package and decision sheet seal exactly fourteen approvals", () => {
  const packet = readFileSync(
    "docs/reviews/multilingual/ar-2-p0-details-final-human-review-20260811.md",
    "utf8",
  );
  const decisions = readFileSync(
    "docs/reviews/multilingual/ar-2-p0-details-final-decisions-20260811.md",
    "utf8",
  );
  for (const path of ar2Paths) {
    assert.match(packet, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(decisions, new RegExp(`https://dualcorelink\\.com${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  }
  assert.equal((packet.match(/^### \d+\. /gm) ?? []).length, 14);
  assert.equal((packet.match(/Human Decision: approved$/gm) ?? []).length, 14);
  assert.equal((packet.match(/Reviewer: Allan$/gm) ?? []).length, 14);
  assert.equal((packet.match(/Review Date: 2026-08-11$/gm) ?? []).length, 14);
  assert.equal((decisions.match(/\| approved \| Allan \| 2026-08-11 \|/g) ?? []).length, 14);
  assert.doesNotMatch(decisions, /\| pending \|/);
});
