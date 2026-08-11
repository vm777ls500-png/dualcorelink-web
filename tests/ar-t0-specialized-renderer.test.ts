import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import {
  arabicStaticFaqCategories,
  arabicStaticFaqItems,
} from "../src/config/static-faqs";
import { splitBidiTechnicalText } from "../src/lib/bidi-technical-text";
import {
  localizeRegionLandingPage,
  localizeResourceGuide,
  localizeSolutionDetail,
  localizedNonProductSemanticModules,
} from "../src/lib/localized-nonproduct";
import {
  localizeProductGallery,
  localizeProductConversionProfile,
} from "../src/lib/localized-product-detail";
import {
  getReviewPreviewLocale,
  supportsSpecializedLocalizedComposition,
} from "../src/lib/multilingual-review-preview";
import { multilingualPublicationManifest } from "../src/lib/multilingual-publication-manifest";
import type { SolutionDetailModel } from "../src/types/content";

import {
  getReviewPreviewPublicationPages,
  localizedPublicationPages,
} from "../src/lib/localized-publication";

const arabicPages = getReviewPreviewPublicationPages("ar");

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
    heroImage: { id: 10, sourceUrl: "/shared.webp", altText: "Shared" },
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
      title: "Hotel Smart Room RCU Host",
      excerpt: "English excerpt",
    }],
    seo: { sitemapExclude: false },
    schema: { enabled: true },
  };
}

test("Arabic specialized composition remains available after production approval", () => {
  assert.equal(getReviewPreviewLocale("ar"), "ar");
  assert.equal(getReviewPreviewLocale("de"), null);
  assert.equal(supportsSpecializedLocalizedComposition("ar"), true);
  assert.equal(localizedPublicationPages.length, 207);
  assert.equal(
    localizedPublicationPages.filter((page) => page.locale === "ar").length,
    69,
  );
  assert.equal(arabicPages.length, 69);
  assert.equal(
    arabicPages.filter((page) => page.deliveryMode === "validated-import-payload").length,
    42,
  );
  assert.deepEqual(
    Object.fromEntries(
      [...new Set(arabicPages.map((page) => page.pageType))].map((pageType) => [
        pageType,
        arabicPages.filter((page) => page.pageType === pageType).length,
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
  const arabicEntries = multilingualPublicationManifest.filter(
    (entry) => entry.locale === "ar",
  );
  assert.deepEqual(
    Object.fromEntries(
      ["P0", "P1", "P2"].map((priority) => [
        priority,
        arabicEntries.filter((entry) => entry.priority === priority).length,
      ]),
    ),
    { P0: 18, P1: 32, P2: 19 },
  );
  assert.equal(arabicEntries.filter((entry) => entry.nativeReviewStatus === "approved").length, 69);
  assert.equal(arabicEntries.filter((entry) => entry.productionReleaseReady).length, 69);
  assert.equal(arabicEntries.filter((entry) => entry.nativeReviewer === "Allan").length, 69);
  assert.equal(arabicEntries.filter((entry) => entry.nativeReviewDate === "2026-08-11").length, 69);
});

test("all Arabic products share the complete English media inventory", () => {
  const products = arabicPages.filter((page) => page.pageType === "product");
  assert.equal(products.length, 36);
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
    assert.match(localized.featuredImage.alt, /[\u0600-\u06ff]/, page.slug);
    assert.ok(page.specifications.length > 0, page.slug);
    assert.ok(page.content.faqs.length > 0, page.slug);
    const profile = localizeProductConversionProfile({
      key: "test",
      label: "English",
      summary: "English",
      highlights: [],
      projectFit: [],
      selectionChecks: [],
      quoteChecklist: [],
      solutions: [],
      resources: [],
      whatsappPrompt: "English",
    }, page);
    assert.match(profile?.label ?? "", /[\u0600-\u06ff]/, page.slug);
  }
  assert.equal(imageCount, 132);
});

test("Arabic solution, resource, and region composition preserves semantic and relationship modules", () => {
  const solutions = arabicPages.filter((page) => page.pageType === "solution");
  const resourcePages = arabicPages.filter((page) => page.pageType === "resource");
  const regions = arabicPages.filter((page) => page.pageType === "region");
  assert.deepEqual([solutions.length, resourcePages.length, regions.length], [6, 15, 5]);
  assert.deepEqual(
    Object.values(localizedNonProductSemanticModules).map((items) => items.length),
    [13, 11, 9],
  );
  for (const page of solutions) {
    const source = solutionFixture(page.slug);
    const localized = localizeSolutionDetail(source, page);
    assert.equal(localized.direction, "rtl", page.slug);
    assert.equal(localized.heroImage?.sourceUrl, source.heroImage?.sourceUrl, page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.ok(localized.summary && localized.architecture && localized.deploymentProcess, page.slug);
  }
  for (const page of resourcePages) {
    const source = resources.find((item) => item.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeResourceGuide(source, page);
    assert.equal(localized.sections.length, page.content.sections.length, page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.equal(localized.relatedSolutions.length, source.relatedSolutions.length, page.slug);
    assert.equal(localized.conversion?.midCtaAfterSectionId, "ar-section-2", page.slug);
  }
  for (const page of regions) {
    const source = regionLandingPages.find((item) => item.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeRegionLandingPage(source, page);
    assert.equal(localized.recommendedCategories.length, source.recommendedCategories.length, page.slug);
    assert.equal(localized.recommendedSolutions.length, source.recommendedSolutions.length, page.slug);
    assert.equal(localized.faqs.length, page.content.faqs.length, page.slug);
  }
  assert.equal(
    arabicPages.filter((page) => page.pageType.endsWith("-listing")).reduce(
      (total, page) =>
        total + ({ products: 36, solutions: 6, resources: 15, regions: 5 }[page.slug] ?? 0),
      0,
    ),
    62,
  );
});

test("Arabic static pages retain specialized renderers and the full 30-item FAQ", () => {
  assert.equal(arabicStaticFaqCategories.length, 6);
  assert.equal(arabicStaticFaqItems.length, 30);
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
  for (const route of routeFiles) {
    const source = readFileSync(`src/app/[locale]/${route}`, "utf8");
    assert.match(source, /supportsSpecializedLocalizedComposition/, route);
  }
  const contact = readFileSync("src/components/contact/get-quote-form.tsx", "utf8");
  assert.match(contact, /arabicContactFormCopy/);
  assert.match(contact, /trackInquiryEvent/);
  assert.match(contact, /form_whatsapp_fallback/);
  assert.match(contact, /form_email_fallback/);
  for (const field of [
    "name",
    "company",
    "email",
    "phone",
    "country",
    "customerType",
    "productInterest",
    "projectStage",
    "targetDelivery",
    "quantity",
    "message",
  ]) {
    assert.match(contact, new RegExp(`name=\\"${field}\\"`), field);
  }
  const contactRoute = readFileSync("src/app/[locale]/contact/page.tsx", "utf8");
  assert.match(contactRoute, /wechat-allan-qr\.png/);
  assert.match(contactRoute, /"@type": "ContactPage"/);
  assert.match(contactRoute, /createBreadcrumbSchema/);
});

test("RTL technical tokens are isolated without altering Arabic prose", () => {
  const segments = splitBidiTechnicalText(
    "يدعم RCU وKNX وHVAC وRS485 وOEM/ODM وI/O وUSB بجهد 220V للطراز RCU-01.",
  );
  const ltr = segments.filter((segment) => segment.direction === "ltr").map((segment) => segment.value);
  for (const token of ["RCU", "KNX", "HVAC", "RS485", "OEM/ODM", "I/O", "USB", "220V", "RCU-01"]) {
    assert.ok(ltr.some((value) => value.replace(/\s/g, "") === token), token);
  }
  assert.ok(segments.some((segment) => segment.direction === "auto" && /[\u0600-\u06ff]/.test(segment.value)));
});

test("review preview build path is isolated from production sitemap and Nginx configuration", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as { scripts: Record<string, string> };
  assert.equal(packageJson.scripts["multilingual:review-preview"], "node scripts/build-multilingual-review-preview.mjs ar");
  const audit = readFileSync("scripts/audit-multilingual-export.ts", "utf8");
  assert.match(audit, /localizedRenderablePublicationPages/);
  assert.match(audit, /englishSitemapBaseline \+ localizedPublicationPages\.length/);
  const workflow = readFileSync(".github/workflows/aws-production-deploy.yml", "utf8");
  assert.doesNotMatch(workflow, /MULTILINGUAL_REVIEW_LOCALE/);
  const nginxFiles = readFileSync("deploy/nginx/dualcorelink.com.conf.template", "utf8");
  assert.doesNotMatch(nginxFiles, /location[^\n]*\/ar\//);
  const reviewSensitiveSources = [
    "src/app/[locale]/products/page.tsx",
    "src/app/[locale]/products/[slug]/page.tsx",
    "src/app/[locale]/solutions/page.tsx",
    "src/app/[locale]/solutions/[slug]/page.tsx",
    "src/app/[locale]/resources/page.tsx",
    "src/app/[locale]/resources/[slug]/page.tsx",
    "src/app/[locale]/regions/page.tsx",
    "src/app/[locale]/regions/[slug]/page.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/contact/page.tsx",
    "src/app/[locale]/faqs/page.tsx",
    "src/components/content/resource-conversion-sections.tsx",
  ].map((file) => readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(reviewSensitiveSources, /direction:\s*"ltr"/);
  assert.doesNotMatch(reviewSensitiveSources, /\b(?:border-l|pl|ml|left)-/);
  assert.match(
    readFileSync("src/app/[locale]/regions/[slug]/page.tsx", "utf8"),
    /"المنتجات والحلول ذات الصلة"/,
    "Arabic region relationships must not inherit the Chinese section title",
  );
  assert.doesNotMatch(
    JSON.stringify(arabicPages.map((page) => page.content)),
    /href[^\n]*\?/,
  );
});
