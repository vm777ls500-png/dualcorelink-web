import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productCategories } from "../src/config/product-taxonomy";
import {
  arabicStaticFaqCategories,
  arabicStaticFaqItems,
} from "../src/config/static-faqs";
import { getReviewPreviewPublicationPages } from "../src/lib/localized-publication";
import {
  getSitemapEligibleEntries,
  getStaticExportEligibleEntries,
} from "../src/lib/multilingual-publication-control";
import { multilingualPublicationManifest } from "../src/lib/multilingual-publication-manifest";
import {
  getProductListingCategoryLabel,
} from "../src/lib/product-listing";
import { buildHeaderPrimaryNavigation } from "../src/lib/navigation-publication";

const foundationPaths = [
  "/ar/products/",
  "/ar/solutions/",
  "/ar/resources/",
  "/ar/regions/",
  "/ar/about/",
  "/ar/contact/",
  "/ar/faqs/",
] as const;

const foundationEntries = multilingualPublicationManifest.filter(
  (entry) =>
    entry.locale === "ar" &&
    foundationPaths.includes(new URL(entry.localizedUrl).pathname as (typeof foundationPaths)[number]),
);
const foundationPages = getReviewPreviewPublicationPages("ar").filter((page) =>
  foundationPaths.includes(new URL(page.localizedUrl).pathname as (typeof foundationPaths)[number]),
);

test("AR-1 scope contains exactly seven approved foundation candidates", () => {
  assert.equal(foundationEntries.length, 7);
  assert.deepEqual(
    foundationEntries.map((entry) => new URL(entry.localizedUrl).pathname).sort(),
    [...foundationPaths].sort(),
  );
  assert.equal(foundationEntries.every((entry) => entry.nativeReviewStatus === "approved"), true);
  assert.equal(foundationEntries.every((entry) => entry.productionReleaseReady), true);
  assert.equal(foundationEntries.every((entry) => entry.nativeReviewer === "Allan"), true);
  assert.equal(foundationEntries.every((entry) => entry.nativeReviewDate === "2026-08-11"), true);
  assert.deepEqual(
    Object.fromEntries(
      foundationEntries.map((entry) => [new URL(entry.localizedUrl).pathname, entry.priority]),
    ),
    {
      "/ar/products/": "P0",
      "/ar/solutions/": "P0",
      "/ar/resources/": "P1",
      "/ar/regions/": "P1",
      "/ar/about/": "P0",
      "/ar/contact/": "P0",
      "/ar/faqs/": "P1",
    },
  );
});

test("AR-1 listing candidates preserve exact inventory and Arabic destinations", () => {
  assert.equal(foundationPages.length, 7);
  const expectedListings = new Map([
    ["products", 36],
    ["solutions", 6],
    ["resources", 15],
    ["regions", 5],
  ]);
  for (const page of foundationPages.filter((candidate) => candidate.pageType.endsWith("-listing"))) {
    assert.equal(expectedListings.get(page.slug) !== undefined, true, page.slug);
    assert.match(page.content.h1, /[\u0600-\u06ff]/, page.slug);
    assert.equal(page.content.relatedLinks.every((link) => link.href.startsWith("/ar/")), true, page.slug);
  }
  assert.equal([...expectedListings.values()].reduce((total, count) => total + count, 0), 62);
  assert.equal(productCategories.length, 10);
  assert.equal(
    productCategories.every((category) => /[\u0600-\u06ff]/.test(getProductListingCategoryLabel("ar", category))),
    true,
  );
  assert.equal(
    buildHeaderPrimaryNavigation("ar").find((item) => item.key === "home")?.href,
    "/ar/about/",
  );
});

test("AR-1 editorial corrections remove known machine-translation residues", () => {
  const arabicSource = readFileSync("src/content/locales/ar/pages.ts", "utf8");
  const resourceSource = readFileSync("src/content/locales/m3a-file-pages.ts", "utf8");
  const staticCopy = readFileSync("src/config/static-page-localization.ts", "utf8");
  const contactCopy = readFileSync("src/config/contact-form-copy.ts", "utf8");
  const contactRoute = readFileSync("src/app/[locale]/contact/page.tsx", "utf8");
  const contentList = readFileSync("src/components/content/content-list.tsx", "utf8");
  const productRoute = readFileSync("src/app/[locale]/products/page.tsx", "utf8");

  assert.doesNotMatch(arabicSource, /سلطة الحلول التجارية|صفحات المنتجات مخصصة للاختيار والتحويل/);
  assert.doesNotMatch(arabicSource, /Hotel Smart Room RCU Host 1|RCU Controller Cabinet|86-Type AI Smart Control Display/);
  assert.match(arabicSource, /دليل حلول المشروعات/);
  assert.match(arabicSource, /شريك لمنتجات وحلول التحكم الذكي في غرف الفنادق/);
  assert.match(resourceSource, /من دون إضافة مواصفات أو نتائج غير موثقة/);
  assert.match(staticCopy, /استفسارات المشروعات/);
  assert.match(contactCopy, /لا تُرفع الملفات عبر الموقع/);
  assert.doesNotMatch(
    JSON.stringify(arabicStaticFaqItems),
    /لسنا شركة تجارة بسيطة|مضيفات RCU|هل تدعمون تشغيل مشروع الفندق/,
  );
  assert.match(contactRoute, /arabicOfficeAddress/);
  assert.match(contentList, /عرض التفاصيل/);
  assert.match(contentList, /معاينة الوسائط غير متاحة/);
  assert.match(productRoute, /arabicProductCount/);
});

test("Arabic About preserves the approved commercial fact boundaries", () => {
  const about = foundationPages.find((page) => page.slug === "about");
  assert.ok(about);
  const body = JSON.stringify(about.content);
  for (const fact of ["OEM/ODM", "حد أدنى", "7–15", "قالب", "تغيير اللون"]) {
    assert.match(body, new RegExp(fact), fact);
  }
  const staticCopy = readFileSync("src/config/static-page-localization.ts", "utf8");
  assert.match(staticCopy, /MOQ/);
  assert.match(staticCopy, /اتصل بنا/);
  assert.doesNotMatch(body, /شهادة ISO|آلاف العملاء|حصة سوقية|ضمان التوفير/);
});

test("Arabic Contact retains the complete form, attribution, analytics, and bidi controls", () => {
  const form = readFileSync("src/components/contact/get-quote-form.tsx", "utf8");
  const route = readFileSync("src/app/[locale]/contact/page.tsx", "utf8");
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
    assert.match(form, new RegExp(`name=\\"${field}\\"`), field);
  }
  for (const evidence of [
    "arabicContactFormCopy",
    "trackInquiryEvent",
    "form_whatsapp_fallback",
    "form_email_fallback",
    'trackInquiryEvent("form_submit_attempt"',
    'trackInquiryEvent("form_submit_success"',
    '"form_submit_failure"',
  ]) {
    assert.equal(form.includes(evidence), true, evidence);
  }
  assert.match(route, /wechat-allan-qr\.png/);
  assert.match(route, /arabicOfficeAddress/);
  assert.match(route, /<bdi dir="ltr">/);
  assert.match(route, /"@type": "ContactPage"/);
  assert.match(route, /createBreadcrumbSchema/);
});

test("Arabic FAQ review set contains all thirty controlled purchasing answers", () => {
  assert.equal(arabicStaticFaqCategories.length, 6);
  assert.equal(arabicStaticFaqItems.length, 30);
  const faqBody = JSON.stringify(arabicStaticFaqItems);
  for (const term of [
    "MOQ",
    "قالب",
    "تغيير اللون",
    "7–15",
    "OEM/ODM",
    "RCU",
    "أوراق البيانات",
    "الشهادات",
    "مخططات التوصيل",
  ]) {
    assert.match(faqBody, new RegExp(term), term);
  }
  const faqRoute = readFileSync("src/app/[locale]/faqs/page.tsx", "utf8");
  assert.match(faqRoute, /createFaqPageSchema/);
  assert.match(faqRoute, /getStaticFaqCategories/);
});

test("AR-1 specialized schemas remain intact after production release", () => {
  const routeEvidence = [
    ["src/app/[locale]/about/page.tsx", ["AboutPage", "createBreadcrumbSchema"]],
    ["src/app/[locale]/contact/page.tsx", ["ContactPage", "createBreadcrumbSchema"]],
    ["src/app/[locale]/faqs/page.tsx", ["createFaqPageSchema", "createBreadcrumbSchema"]],
    ["src/app/[locale]/products/page.tsx", ["supportsSpecializedLocalizedComposition"]],
    ["src/app/[locale]/solutions/page.tsx", ["supportsSpecializedLocalizedComposition"]],
    ["src/app/[locale]/resources/page.tsx", ["supportsSpecializedLocalizedComposition"]],
    ["src/app/[locale]/regions/page.tsx", ["supportsSpecializedLocalizedComposition"]],
  ] as const;
  for (const [path, markers] of routeEvidence) {
    const source = readFileSync(path, "utf8");
    for (const marker of markers) assert.match(source, new RegExp(marker), `${path}: ${marker}`);
  }
  assert.equal(
    multilingualPublicationManifest.filter(
      (entry) => entry.locale === "ar" && entry.nativeReviewStatus === "approved",
    ).length,
    69,
  );
  const arabicEntries = multilingualPublicationManifest.filter((entry) => entry.locale === "ar");
  const pendingEntries = arabicEntries.filter((entry) => entry.nativeReviewStatus === "pending");
  assert.equal(arabicEntries.length, 69);
  assert.equal(pendingEntries.length, 0);
  assert.equal(
    multilingualPublicationManifest.filter(
      (entry) =>
        entry.locale !== "ar" &&
        entry.nativeReviewer === "Allan" &&
        entry.nativeReviewDate === "2026-08-11",
    ).length,
    0,
  );
  assert.equal(
    multilingualPublicationManifest.filter(
      (entry) => entry.locale === "ar" && entry.productionReleaseReady,
    ).length,
    69,
  );
  assert.equal(
    getStaticExportEligibleEntries(multilingualPublicationManifest).filter(
      (entry) => entry.locale === "ar",
    ).length,
    69,
  );
  assert.equal(
    getSitemapEligibleEntries(multilingualPublicationManifest).filter(
      (entry) => entry.locale === "ar",
    ).length,
    69,
  );
});

test("AR-1 approval evidence is synchronized across the controlled review records", () => {
  const decisionSheet = readFileSync(
    "docs/reviews/multilingual/ar-1-foundation-final-decisions-20260811.md",
    "utf8",
  );
  const workbook = readFileSync(
    "docs/reviews/multilingual/ar-native-review-workbook-20260729.md",
    "utf8",
  );
  const reviewPacket = readFileSync(
    "docs/reviews/multilingual/ar-1-foundation-final-human-review-20260811.md",
    "utf8",
  );
  const report = readFileSync(
    "docs/reports/multilingual-ar-1-foundation-human-review-preparation-20260811.md",
    "utf8",
  );

  assert.equal((decisionSheet.match(/\| approved \| Allan \| 2026-08-11 \|/g) ?? []).length, 7);
  assert.match(decisionSheet, /Actual approved pages: 7\/7\./);
  assert.match(decisionSheet, /Actual production-release-ready pages: 0\/7\./);
  for (const path of foundationPaths) {
    assert.equal(workbook.includes(`https://dualcorelink.com${path}`), true, path);
  }
  assert.match(reviewPacket, /Decision: approved/);
  assert.match(reviewPacket, /Reviewer: Allan/);
  assert.match(reviewPacket, /Review date: 2026-08-11/);
  assert.match(report, /Arabic approved pages: 7\./);
  assert.match(report, /Arabic production-release-ready pages: 0\./);
  assert.match(report, /Arabic public pages: 0\./);
  assert.match(report, /Arabic sitemap URLs: 0\./);
});
