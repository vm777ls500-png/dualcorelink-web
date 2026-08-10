import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import {
  arP0CmsSourceIds,
  arP0OwnerWaivedCmsImportPayload,
  arP0OwnerWaiverScopeSha256,
} from "../src/content/locales/cms-import";
import { splitBidiTechnicalText } from "../src/lib/bidi-technical-text";
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

const ar3Paths = [
  "/ar/products/hotel-smart-room-rcu-host-3/",
  "/ar/products/hotel-delivery-robot-charging-dock/",
  "/ar/products/hotel-smart-room-rcu-host-2/",
  "/ar/products/smart-curtain-motor/",
  "/ar/products/smart-four-key-curtain-control-panel/",
  "/ar/products/smart-key-card-energy-saver-panel/",
  "/ar/products/hotel-guest-room-doorbell/",
  "/ar/products/hotel-room-door-magnetic-sensor/",
  "/ar/products/embedded-human-presence-sensor/",
  "/ar/products/hotel-smart-delivery-cabinet/",
  "/ar/products/hotel-delivery-robot/",
  "/ar/products/ai-music-control-panel/",
  "/ar/products/thermostat-hvac-control-panel/",
  "/ar/products/rotary-knob-smart-control-display/",
  "/ar/products/ai-large-smart-display/",
] as const;

const ar3PathSet = new Set<string>(ar3Paths);
const arabicEntries = multilingualPublicationManifest.filter(
  (entry) => entry.locale === "ar",
);
const ar3Entries = arabicEntries.filter((entry) =>
  ar3PathSet.has(new URL(entry.localizedUrl).pathname),
);
const previewPages = getReviewPreviewPublicationPages("ar");
const ar3Pages = previewPages.filter((page) =>
  ar3PathSet.has(new URL(page.localizedUrl).pathname),
);
const previewPathSet = new Set(
  previewPages.map((page) => new URL(page.localizedUrl).pathname),
);

function assertArabicLinks(hrefs: readonly string[], owner: string): void {
  for (const href of hrefs) {
    assert.equal(href.includes("?"), false, `${owner}: query URL ${href}`);
    assert.doesNotMatch(
      href,
      /^\/(en|de|es|vi|fa)\//,
      `${owner}: locale fallback ${href}`,
    );
    assert.match(href, /^\/ar\//, `${owner}: non-Arabic link ${href}`);
    const pathname = new URL(href, "https://dualcorelink.com").pathname;
    assert.equal(
      previewPathSet.has(pathname),
      true,
      `${owner}: missing Arabic candidate ${pathname}`,
    );
  }
}

test("AR-3 inventory is exactly fifteen approved Arabic P1 product details", () => {
  assert.equal(ar3Entries.length, 15);
  assert.deepEqual(
    ar3Entries.map((entry) => new URL(entry.localizedUrl).pathname).sort(),
    [...ar3Paths].sort(),
  );
  assert.equal(ar3Entries.every((entry) => entry.pageType === "product"), true);
  assert.equal(ar3Entries.every((entry) => entry.priority === "P1"), true);
  assert.equal(
    ar3Entries.every((entry) => entry.nativeReviewStatus === "approved"),
    true,
  );
  assert.equal(ar3Pages.length, 15);
});

test("the prior twenty-one approvals remain sealed and only AR-3 receives approval", () => {
  const approved = arabicEntries.filter(
    (entry) => entry.nativeReviewStatus === "approved",
  );
  assert.equal(arabicEntries.length, 69);
  assert.equal(approved.length, 36);
  assert.equal(
    approved.every(
      (entry) =>
        entry.nativeReviewer === "Allan" &&
        entry.nativeReviewDate === "2026-08-11",
    ),
    true,
  );
  assert.equal(ar3Entries.every((entry) => entry.nativeReviewer === "Allan"), true);
  assert.equal(
    ar3Entries.every((entry) => entry.nativeReviewDate === "2026-08-11"),
    true,
  );
  assert.equal(
    arabicEntries.filter((entry) => entry.nativeReviewStatus === "pending").length,
    33,
  );
  assert.equal(
    arabicEntries.filter((entry) => entry.productionReleaseReady).length,
    0,
  );
  assert.equal(getStaticExportEligibleEntries(arabicEntries).length, 0);
  assert.equal(getSitemapEligibleEntries(arabicEntries).length, 0);
});

test("all fifteen products retain complete localized product composition", () => {
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
  for (const page of ar3Pages) {
    const copy = createLocalizedProductDetailCopy(page);
    assert.equal(page.content.sections.length, 4, page.slug);
    assert.equal(page.specifications.length, 4, page.slug);
    assert.equal(copy.faqs.length, 3, page.slug);
    assert.match(page.title, /[\u0600-\u06ff]/, page.slug);
    assert.match(page.seoTitle, /[\u0600-\u06ff]/, page.slug);
    assert.match(page.metaDescription, /[\u0600-\u06ff]/, page.slug);
    assert.match(page.content.h1, /[\u0600-\u06ff]/, page.slug);
    assert.equal(page.content.h1, page.title, page.slug);
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
  }
});

test("gallery hero, order, full/thumb mapping, and Arabic alt parity pass 15/15", () => {
  let sourceImages = 0;
  let localizedImages = 0;
  for (const page of ar3Pages) {
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
  }
  assert.equal(sourceImages, 62);
  assert.equal(localizedImages, 62);
});

test("product-specific terminology stays within the English fact boundary", () => {
  const bySlug = new Map(ar3Pages.map((page) => [page.slug, page]));
  const presence = bySlug.get("embedded-human-presence-sensor");
  assert.equal(presence?.specifications[0]?.value, "مستشعر وجود لغرفة الفندق");
  assert.equal(
    presence?.specifications[1]?.value,
    "استشعار وجود الأشخاص لدعم منطق إشغال الغرفة المعتمد",
  );
  assert.doesNotMatch(presence?.specifications[1]?.value ?? "", /باب/);
  const door = bySlug.get("hotel-room-door-magnetic-sensor");
  assert.equal(
    door?.specifications[1]?.value,
    "توفير حالة فتح وإغلاق الباب لمنطق الغرفة المعتمد",
  );
  assert.equal(
    bySlug.get("smart-curtain-motor")?.specifications[0]?.value,
    "محرك للستائر الآلية",
  );
  assert.equal(
    bySlug.get("hotel-delivery-robot")?.specifications[0]?.value,
    "روبوت خدمة فندقي",
  );
  assert.equal(
    bySlug.get("hotel-smart-delivery-cabinet")?.specifications[0]?.value,
    "خزانة تسليم ذكية للفنادق",
  );
});

test("all AR-3 relationships stay on valid Arabic candidates without query URLs", () => {
  for (const page of ar3Pages) {
    assertArabicLinks(
      [
        ...page.content.relatedLinks.map((link) => link.href),
        page.content.cta.href,
        page.content.cta.secondaryHref ?? "/ar/solutions/",
      ],
      page.slug,
    );
  }
});

test("the established bidi helper isolates product models and technical units", () => {
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

test("RTL product hero grid items allow long Arabic headings to wrap", () => {
  const styles = readFileSync("src/app/globals.css", "utf8");
  assert.match(
    styles,
    /\[dir="rtl"\]\s+\.product-detail-hero\s*>\s*\*\s*\{[^}]*min-width:\s*0;/s,
  );
});

test("review-preview canonical, hreflang, Product schema, and breadcrumb evidence remain isolated", () => {
  const routeSource = readFileSync(
    "src/app/[locale]/products/[slug]/page.tsx",
    "utf8",
  );
  assert.match(routeSource, /supportsSpecializedLocalizedComposition/);
  assert.match(routeSource, /createProductSchema/);
  assert.match(routeSource, /createBreadcrumbSchema/);
  assert.doesNotMatch(routeSource, /createOfferSchema|AggregateRating|createReviewSchema/);
  for (const page of ar3Pages) {
    assert.equal(
      page.localizedUrl,
      `https://dualcorelink.com/ar/${page.path}/`,
      page.slug,
    );
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

test("owner-waiver and CMS payload safety evidence has not drifted", () => {
  assert.deepEqual(arP0CmsSourceIds, [48, 47, 6, 140, 138, 137]);
  assert.equal(
    arP0OwnerWaiverScopeSha256,
    "92eae81730ac445455385ff5f3811394dbb866d6f333dc6a290f5df60e4dc193",
  );
  assert.equal(arP0OwnerWaivedCmsImportPayload.length, 6);
  assert.deepEqual(
    arP0OwnerWaivedCmsImportPayload.map((record) => record.sourceEnglishContentId),
    [...arP0CmsSourceIds],
  );
  assert.equal(
    arP0OwnerWaivedCmsImportPayload.every(
      (record) =>
        record.productionReleaseReady &&
        record.ownerReviewWaiverStatus === "approved" &&
        record.ownerReviewWaiverBy === "Allan" &&
        record.ownerReviewWaiverDate === "2026-07-31",
    ),
    true,
  );
});

test("AR-3 review packet and decision sheet seal exactly fifteen approvals", () => {
  const packet = readFileSync(
    "docs/reviews/multilingual/ar-3-p1-products-final-human-review-20260811.md",
    "utf8",
  );
  const decisions = readFileSync(
    "docs/reviews/multilingual/ar-3-p1-products-final-decisions-20260811.md",
    "utf8",
  );
  for (const path of ar3Paths) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(packet, new RegExp(escaped));
    assert.match(decisions, new RegExp(`https://dualcorelink\\.com${escaped}`));
  }
  assert.equal((packet.match(/^### \d+\. /gm) ?? []).length, 15);
  assert.equal((packet.match(/Human Decision: approved$/gm) ?? []).length, 15);
  assert.equal((packet.match(/Reviewer: Allan$/gm) ?? []).length, 15);
  assert.equal((packet.match(/Review Date: 2026-08-11$/gm) ?? []).length, 15);
  assert.equal(
    (decisions.match(/\| P1 \| approved \| Allan \| 2026-08-11 \|/g) ?? [])
      .length,
    15,
  );
  assert.doesNotMatch(decisions, /\| P1 \| pending \|/);
});
