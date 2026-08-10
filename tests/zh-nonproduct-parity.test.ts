import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { panelConfigurations } from "../src/config/static-oem-odm-configurations";
import { roomDisplayProjectReferences } from "../src/config/static-room-display-projects";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import {
  localizeRegionLandingPage,
  localizeReleasedHref,
  localizeResourceGuide,
  localizeSolutionDetail,
  localizedNonProductSemanticModules,
} from "../src/lib/localized-nonproduct";
import { localizedPublicationPages } from "../src/lib/localized-publication";
import type { SolutionDetailModel } from "../src/types/content";

const zhSolutions = localizedPublicationPages.filter(
  (page) => page.locale === "zh" && page.pageType === "solution",
);
const zhResources = localizedPublicationPages.filter(
  (page) => page.locale === "zh" && page.pageType === "resource",
);
const zhRegions = localizedPublicationPages.filter(
  (page) => page.locale === "zh" && page.pageType === "region",
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
      sourceUrl: "/media/shared-solution.webp",
      altText: "English alt",
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

test("Chinese solution, resource, and region inventories retain 6/15/5 pairs", () => {
  assert.equal(zhSolutions.length, 6);
  assert.equal(zhResources.length, 15);
  assert.equal(zhRegions.length, 5);
  assert.equal(resources.length, 15);
  assert.equal(regionLandingPages.length, 5);
});

test("all six Chinese solutions preserve shared structure, media, products, CTA, and schema inputs", () => {
  assert.equal(localizedNonProductSemanticModules.solution.length, 13);
  for (const page of zhSolutions) {
    const source = solutionFixture(page.slug);
    const localized = localizeSolutionDetail(source, page);
    assert.equal(localized.heroImage?.sourceUrl, source.heroImage?.sourceUrl, page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.match(localized.relatedProducts[0].title, /[\u3400-\u9fff]/, page.slug);
    assert.match(localized.title, /[\u3400-\u9fff]/, page.slug);
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
  }
  assert.equal(panelConfigurations.length, 9);
  assert.equal(roomDisplayProjectReferences.length, 8);
});

test("all fifteen Chinese resources preserve conversion and relationship modules", () => {
  assert.equal(localizedNonProductSemanticModules.resource.length, 11);
  for (const page of zhResources) {
    const source = resources.find((resource) => resource.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeResourceGuide(source, page);
    assert.equal(localized.sections.length, page.content.sections.length, page.slug);
    assert.ok(localized.sections.every((section) => section.body.length > 0), page.slug);
    assert.equal(localized.relatedProducts.length, source.relatedProducts.length, page.slug);
    assert.equal(localized.relatedSolutions.length, source.relatedSolutions.length, page.slug);
    assert.equal(
      localized.conversion?.continueReadingSlugs.length,
      source.conversion?.continueReadingSlugs.length,
      page.slug,
    );
    assert.equal(localized.conversion?.midCtaAfterSectionId, "zh-section-2", page.slug);
    assert.equal(localized.cta.primaryHref.includes("?"), false, page.slug);
    for (const link of [
      ...localized.relatedProducts,
      ...localized.relatedSolutions,
      ...localized.relatedRegions,
    ]) {
      assert.match(link.href, /^\/zh\//, `${page.slug}: ${link.href}`);
      assert.equal(link.href.includes("?"), false, `${page.slug}: ${link.href}`);
    }
  }
});

test("all five Chinese regions preserve market, recommendation, FAQ, CTA, and relationship structure", () => {
  assert.equal(localizedNonProductSemanticModules.region.length, 9);
  for (const page of zhRegions) {
    const source = regionLandingPages.find((region) => region.slug === page.slug);
    assert.ok(source, page.slug);
    const localized = localizeRegionLandingPage(source, page);
    assert.match(localized.h1, /[\u3400-\u9fff]/, page.slug);
    assert.ok(localized.regionalNeeds.trim(), page.slug);
    assert.ok(localized.solutionPlanning.trim(), page.slug);
    assert.ok(localized.customization.trim(), page.slug);
    assert.equal(localized.recommendedCategories.length, source.recommendedCategories.length, page.slug);
    assert.equal(localized.recommendedSolutions.length, source.recommendedSolutions.length, page.slug);
    assert.equal(localized.faqs.length, page.content.faqs.length, page.slug);
    assert.equal(localized.primaryCta, page.content.cta.label, page.slug);
    for (const link of page.content.relatedLinks) {
      assert.equal(link.href.includes("?"), false, `${page.slug}: ${link.href}`);
    }
  }
});

test("released internal links localize without query URLs or pending locales", () => {
  const localizedPaths = [
    localizeReleasedHref("/en/products/hotel-smart-room-rcu-host-1/", "zh"),
    localizeReleasedHref("/en/solutions/rcu-room-control-solution/", "zh"),
    localizeReleasedHref("/en/resources/hotel-rcu-buying-guide/", "zh"),
    localizeReleasedHref("/en/regions/saudi-arabia/", "zh"),
  ];
  assert.ok(localizedPaths.every((href) => href.startsWith("/zh/")));
  assert.ok(localizedPaths.every((href) => !href.includes("?")));
  assert.ok(
    localizedPaths.every((href) => !/^\/(ar|de|es|vi|fa)\//.test(href)),
  );
});

test("Chinese routes retain specialized listing/detail renderers and schema builders", () => {
  const routes = {
    solutionListing: readFileSync("src/app/[locale]/solutions/page.tsx", "utf8"),
    resourceListing: readFileSync("src/app/[locale]/resources/page.tsx", "utf8"),
    regionListing: readFileSync("src/app/[locale]/regions/page.tsx", "utf8"),
    solution: readFileSync("src/app/[locale]/solutions/[slug]/page.tsx", "utf8"),
    resource: readFileSync("src/app/[locale]/resources/[slug]/page.tsx", "utf8"),
    region: readFileSync("src/app/[locale]/regions/[slug]/page.tsx", "utf8"),
  };
  for (const route of Object.values(routes)) {
    assert.match(route, /localizedPage && locale !== "zh"/);
  }
  assert.match(routes.solution, /localizeSolutionDetail/);
  assert.match(routes.solution, /createServiceSchema/);
  assert.match(routes.resource, /localizeResourceGuide/);
  assert.match(routes.resource, /createArticleSchema/);
  assert.match(routes.resource, /ResourceMidArticleCta/);
  assert.match(routes.resource, /ResourceConversionSections/);
  assert.match(routes.region, /localizeRegionLandingPage/);
  assert.match(routes.region, /createCreativeWorkSchema/);
  assert.match(routes.region, /region-related-links/);
});
