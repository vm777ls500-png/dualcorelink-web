import assert from "node:assert/strict";
import test from "node:test";
import { evaluateDownloadAccess } from "../src/lib/downloads/access";
import {
  buildLocalizedPath,
  createContentHreflang,
  createMetadata,
  createStaticHreflang,
  validateCanonical,
} from "../src/lib/seo";
import sitemap from "../src/app/sitemap";
import { productDisplayImages } from "../src/config/product-display-images";
import { resources } from "../src/config/resources";
import { staticFaqItems } from "../src/config/static-faqs";
import {
  brandId,
  createArticleSchema,
  createBreadcrumbSchema,
  createDigitalDocumentSchema,
  createGlobalEntities,
  createProductSchema,
  createSchemaGraph,
  organizationId,
  websiteId,
} from "../src/lib/schema";
import { productRepository } from "../src/lib/wordpress/repositories";
import { buildQuoteHref } from "../src/lib/inquiry/attribution";
import { createInquiryEvent } from "../src/lib/inquiry/events";
import type { ProductDetailModel } from "../src/types/content";

const phase2DResourceSlugs = [
  "hotel-rcu-wiring-system-architecture-guide",
  "hotel-room-control-system-cost-factors",
  "hotel-occupancy-sensor-selection-guide",
  "hotel-doorplate-room-display-buying-guide",
] as const;

const phase2EResourceSlugs = [
  "oem-odm-hotel-control-panel-development-process",
  "hotel-renovation-smart-room-upgrade-guide",
  "smart-panel-material-finish-selection-guide",
  "knx-vs-rcu-hotel-room-control",
] as const;

const publishedSolutionSlugs = new Set([
  "hotel-guest-room-control-solution",
  "oem-odm-custom-panel-solution",
  "rcu-room-control-solution",
  "smart-hotel-automation-solution",
]);

function createProduct(): ProductDetailModel {
  return {
    id: 10,
    slug: "smart-switch",
    language: "en",
    direction: "ltr",
    translations: {},
    translationGroup: "product-10",
    hreflang: {},
    title: "Smart Switch",
    excerpt: "A connected wall switch.",
    content: "Product overview.",
    model: "DL-100",
    shortDescription: "A connected wall switch.",
    status: "active",
    categoryIds: [9],
    categorySlugs: ["smart-panels-switches"],
    categoryNames: ["Smart Panels & Switches"],
    isFeatured: false,
    isNew: false,
    specifications: [],
    commerce: {
      oemAvailable: false,
      odmAvailable: false,
      privateLabelAvailable: false,
      sampleAvailable: false,
    },
    imageIds: [21],
    relatedSolutionIds: [],
    images: [
      {
        id: 21,
        sourceUrl: "https://cdn.example.com/smart-switch.jpg",
        altText: "Smart switch",
      },
    ],
    seoOpenGraphImage: null,
    seoTwitterImage: null,
    relatedSolutions: [],
    seo: { sitemapExclude: false },
    schema: { enabled: true },
  };
}

test("canonical validation permits only the production frontend origin", () => {
  assert.equal(
    validateCanonical(
      "https://dualcorelink.com/en/products/smart-switch/",
      "/en/products/smart-switch/",
    ),
    "https://dualcorelink.com/en/products/smart-switch/",
  );
  assert.equal(
    validateCanonical(
      "http://dualcorelink.com/en/products/smart-switch/",
      "/en/products/smart-switch/",
    ),
    "https://dualcorelink.com/en/products/smart-switch/",
  );
  assert.equal(
    validateCanonical(
      "https://cms.dualcorelink.com/product/smart-switch/",
      "/en/products/smart-switch/",
    ),
    "https://dualcorelink.com/en/products/smart-switch/",
  );
});

test("hreflang includes only indexable published locales", () => {
  assert.deepEqual(createStaticHreflang(["en", "ar"], "products"), {
    en: "https://dualcorelink.com/en/products/",
    "x-default": "https://dualcorelink.com/en/products/",
  });

  assert.deepEqual(
    createContentHreflang({
      locale: "en",
      currentPath: "/en/products/smart-switch/",
      published: {
        ar: "https://dualcorelink.com/ar/products/smart-switch/",
        de: "https://cms.dualcorelink.com/de/product/smart-switch/",
      },
    }),
    {
      en: "https://dualcorelink.com/en/products/smart-switch/",
      "x-default": "https://dualcorelink.com/en/products/smart-switch/",
    },
  );
});

test("metadata maps canonical, robots, Open Graph, and Twitter safely", () => {
  const metadata = createMetadata({
    locale: "en",
    path: buildLocalizedPath("en", "products"),
    title: "Products",
    description: "Smart home products.",
    seo: {
      canonicalUrl: "https://cms.example.com/products/",
      robotsIndex: "noindex",
      robotsFollow: "nofollow",
      openGraphTitle: "Product catalog",
      twitterCard: "summary",
      sitemapExclude: false,
    },
  });

  assert.equal(metadata.title, "Products");
  assert.equal(metadata.description, "Smart home products.");
  assert.equal(
    metadata.alternates?.canonical,
    "https://dualcorelink.com/en/products/",
  );
  assert.deepEqual(metadata.robots, { index: false, follow: false });
  assert.equal(metadata.openGraph?.title, "Product catalog");
  assert.equal(
    (metadata.twitter as { card?: string } | undefined)?.card,
    "summary",
  );
});

test("global entities have stable unique IDs", () => {
  const entities = createGlobalEntities();
  assert.deepEqual(
    entities.map((node) => node["@id"]),
    [organizationId, brandId, websiteId],
  );
  assert.equal(new Set(entities.map((node) => node["@id"])).size, 3);
});

test("Product schema has no Offer or manufacturer by default", () => {
  const product = createProduct();
  const schema = createProductSchema(
    product,
    "https://dualcorelink.com/en/products/smart-switch/",
  );
  const serialized = JSON.stringify(schema);

  assert.equal("offers" in schema, false);
  assert.equal("manufacturer" in schema, false);
  assert.deepEqual(schema.category, ["Smart Panels & Switches"]);
  assert.equal(serialized.includes("internal"), false);
  assert.equal(serialized.includes("attachment"), false);
});

test("sitemap includes English content and all reviewed Chinese and Arabic pages", async () => {
  const urls = (await sitemap()).map((entry) => entry.url);

  assert.equal(resources.length, 15);
  assert.equal(urls.length, 61 + resources.length + 138);
  assert.equal(urls.length, 214);
  assert.ok(urls.includes("https://dualcorelink.com/en/resources/"));
  for (const resource of resources) {
    assert.ok(
      urls.includes(`https://dualcorelink.com/en/resources/${resource.slug}/`),
      `Expected sitemap to include resource ${resource.slug}`,
    );
  }
  assert.equal(
    urls.filter((url) => /\/(zh|ar|de|es|vi|fa)\//.test(url)).length,
    138,
  );
  assert.equal(
    urls.filter((url) => /\/zh\//.test(url)).length,
    69,
  );
  assert.equal(urls.filter((url) => /\/ar\//.test(url)).length, 69);
  assert.equal(urls.some((url) => /\/(de|es|vi|fa)\//.test(url)), false);
  assert.equal(urls.some((url) => url.endsWith(".pdf")), false);
});

test("static FAQPage source still contains 30 questions", () => {
  assert.equal(staticFaqItems.length, 30);
});

test("RCU guide can emit safe Article schema and breadcrumbs", () => {
  const resource = resources.find(
    (item) => item.slug === "what-is-hotel-rcu-room-control-system",
  );
  assert.ok(resource);

  const url =
    "https://dualcorelink.com/en/resources/what-is-hotel-rcu-room-control-system/";
  const article = createArticleSchema({
    id: `${url}#article`,
    url,
    headline: resource.title,
    description: resource.metaDescription,
    datePublished: resource.lastReviewed,
    dateModified: resource.lastReviewed,
  });
  const breadcrumb = createBreadcrumbSchema(`${url}#breadcrumb`, [
    { name: "Home", url: "https://dualcorelink.com/en/" },
    { name: "Resources", url: "https://dualcorelink.com/en/resources/" },
    { name: resource.title, url },
  ]);
  const serializedArticle = JSON.stringify(article);

  assert.equal(article["@type"], "Article");
  assert.equal(article.url, url);
  assert.equal(article.headline, resource.title);
  assert.equal("offers" in article, false);
  assert.equal("price" in article, false);
  assert.equal("review" in article, false);
  assert.equal("aggregateRating" in article, false);
  assert.equal(serializedArticle.includes("author"), false);
  assert.equal(breadcrumb["@type"], "BreadcrumbList");
  assert.equal(breadcrumb.itemListElement.length, 3);
});

test("all resources have safe Article schema inputs", () => {
  const slugs = new Set<string>();
  const seoTitles = new Set<string>();
  const metaDescriptions = new Set<string>();
  let articleCount = 0;
  let breadcrumbCount = 0;

  for (const resource of resources) {
    assert.equal(slugs.has(resource.slug), false, `Duplicate ${resource.slug}`);
    slugs.add(resource.slug);
    assert.ok(resource.h1);
    assert.ok(resource.seoTitle);
    assert.ok(resource.metaDescription);
    assert.equal(seoTitles.has(resource.seoTitle), false);
    assert.equal(metaDescriptions.has(resource.metaDescription), false);
    seoTitles.add(resource.seoTitle);
    metaDescriptions.add(resource.metaDescription);
    assert.ok(resource.summary);
    assert.ok(resource.topic);
    assert.ok(resource.readingTime);
    assert.ok(resource.sections.length >= 6);
    assert.ok(resource.relatedSolutions.length >= 1);
    assert.ok(resource.relatedProducts.length >= 2);
    assert.ok(resource.relatedDownloads.length >= 1);
    assert.equal(resource.cta.primaryHref, "/en/contact/#get-a-quote");

    const url = `https://dualcorelink.com/en/resources/${resource.slug}/`;
    const article = createArticleSchema({
      id: `${url}#article`,
      url,
      headline: resource.title,
      description: resource.metaDescription,
      datePublished: resource.lastReviewed,
      dateModified: resource.lastReviewed,
    });
    const serialized = JSON.stringify({
      article,
      title: resource.title,
      h1: resource.h1,
      seoTitle: resource.seoTitle,
      metaDescription: resource.metaDescription,
      summary: resource.summary,
      sections: resource.sections,
      relatedSolutions: resource.relatedSolutions,
      relatedProducts: resource.relatedProducts,
      relatedRegions: resource.relatedRegions,
      relatedDownloads: resource.relatedDownloads,
      cta: resource.cta,
      safeClaims: resource.safeClaims,
    }).toLowerCase();

    assert.equal(article["@type"], "Article");
    articleCount += 1;
    const breadcrumb = createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: "https://dualcorelink.com/en/" },
      { name: "Resources", url: "https://dualcorelink.com/en/resources/" },
      { name: resource.title, url },
    ]);
    assert.equal(breadcrumb["@type"], "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement.length, 3);
    breadcrumbCount += 1;
    assert.equal("offers" in article, false);
    assert.equal("price" in article, false);
    assert.equal("review" in article, false);
    assert.equal("aggregateRating" in article, false);
    assert.equal(serialized.includes("local office"), false);
    assert.equal(serialized.includes("local stock"), false);
    assert.equal(serialized.includes("certified for saudi"), false);
    assert.equal(serialized.includes("certified for uae"), false);
    assert.equal(serialized.includes("certified for vietnam"), false);
    assert.equal(serialized.includes("fake price"), false);
    assert.equal(serialized.includes("fake review"), false);
    assert.equal(serialized.includes("fake rating"), false);
    assert.equal(serialized.includes("127.0.0.1"), false);
    assert.equal(serialized.includes("localhost"), false);
    assert.equal(serialized.includes("staging2.cms.dualcorelink.com"), false);
  }

  assert.equal(articleCount, 15);
  assert.equal(breadcrumbCount, 15);
  assert.equal(seoTitles.size, resources.length);
  assert.equal(metaDescriptions.size, resources.length);
});

test("Phase 2C resource conversion maps are complete and internally valid", () => {
  const conversionResources = resources.filter((resource) => resource.conversion);
  const resourceSlugs = new Set(resources.map((resource) => resource.slug));

  assert.equal(conversionResources.length, resources.length);

  for (const resource of conversionResources) {
    const conversion = resource.conversion;
    assert.ok(conversion);
    assert.ok(
      resource.sections.some(
        (section) => section.id === conversion.midCtaAfterSectionId,
      ),
      `Missing CTA insertion section for ${resource.slug}`,
    );
    assert.ok(resource.relatedProducts.length >= 2);
    assert.ok(resource.relatedProducts.length <= 4);
    assert.ok(resource.relatedSolutions.length >= 1);
    assert.ok(resource.relatedSolutions.length <= 3);
    assert.ok(conversion.continueReadingSlugs.length >= 2);
    assert.ok(conversion.continueReadingSlugs.length <= 3);
    assert.equal(
      new Set(conversion.continueReadingSlugs).size,
      conversion.continueReadingSlugs.length,
    );

    for (const product of resource.relatedProducts) {
      const productSlug = product.href.split("/").filter(Boolean).at(-1);
      assert.ok(product.href.startsWith("/en/products/"));
      assert.ok(product.description);
      assert.ok(productSlug && productDisplayImages[productSlug]);
    }

    for (const solution of resource.relatedSolutions) {
      assert.ok(solution.href.startsWith("/en/solutions/"));
      assert.ok(solution.description);
      const solutionSlug = solution.href.split("/").filter(Boolean).at(-1);
      assert.ok(solutionSlug && publishedSolutionSlugs.has(solutionSlug));
    }

    for (const relatedSlug of conversion.continueReadingSlugs) {
      assert.notEqual(relatedSlug, resource.slug);
      assert.ok(resourceSlugs.has(relatedSlug));
    }
  }
});

test("Phase 2D resources have complete topic-cluster content and links", async () => {
  const sitemapUrls = new Set((await sitemap()).map((entry) => entry.url));
  const resourceSlugs = new Set(resources.map((resource) => resource.slug));

  for (const slug of phase2DResourceSlugs) {
    const resource = resources.find((item) => item.slug === slug);
    assert.ok(resource, `Expected Phase 2D resource ${slug}`);
    assert.ok(resource.conversion);
    assert.ok(resource.sections.length >= 9);
    assert.ok(resource.sections.some((section) => section.subsections?.length));
    assert.ok(resource.sections.some((section) => section.relatedLinks?.length));
    assert.ok(
      sitemapUrls.has(`https://dualcorelink.com/en/resources/${slug}/`),
    );

    const contentWords = resource.sections
      .flatMap((section) => [
        ...section.body,
        ...(section.subsections?.flatMap((subsection) => subsection.body) ?? []),
      ])
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    assert.ok(contentWords >= 1000, `${slug} has only ${contentWords} words`);

    for (const section of resource.sections) {
      for (const link of section.relatedLinks ?? []) {
        assert.ok(link.href.startsWith("/en/resources/"));
        const relatedSlug = link.href.split("/").filter(Boolean).at(-1);
        assert.ok(relatedSlug && resourceSlugs.has(relatedSlug));
        assert.notEqual(relatedSlug, resource.slug);
      }
    }

    const allLinks = [
      ...resource.relatedProducts,
      ...resource.relatedSolutions,
      ...resource.relatedRegions,
      ...resource.relatedDownloads,
      ...resource.sections.flatMap((section) => section.relatedLinks ?? []),
      { href: resource.cta.primaryHref },
      { href: resource.cta.secondaryHref },
    ];
    assert.equal(allLinks.some((link) => link.href === "#"), false);
    assert.equal(
      allLinks.some((link) =>
        /localhost|127\.0\.0\.1|staging2\.cms\.dualcorelink\.com/i.test(
          link.href,
        ),
      ),
      false,
    );
  }
});

test("Phase 2E resources cover procurement topics with valid SEO and links", async () => {
  const sitemapUrls = new Set((await sitemap()).map((entry) => entry.url));
  const resourceSlugs = new Set(resources.map((resource) => resource.slug));

  for (const slug of phase2EResourceSlugs) {
    const resource = resources.find((item) => item.slug === slug);
    assert.ok(resource, `Expected Phase 2E resource ${slug}`);
    assert.ok(resource.conversion);
    assert.ok(resource.sections.length >= 9);
    assert.ok(resource.sections.some((section) => section.subsections?.length));
    assert.ok(resource.sections.some((section) => section.relatedLinks?.length));
    assert.ok(
      sitemapUrls.has(`https://dualcorelink.com/en/resources/${slug}/`),
    );

    const contentWords = resource.sections
      .flatMap((section) => [
        ...section.body,
        ...(section.subsections?.flatMap((subsection) => subsection.body) ?? []),
      ])
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    assert.ok(contentWords >= 1400, `${slug} has only ${contentWords} words`);

    const path = buildLocalizedPath("en", `resources/${resource.slug}`);
    const metadata = createMetadata({
      locale: "en",
      path,
      title: resource.seoTitle,
      description: resource.metaDescription,
      hreflang: createContentHreflang({
        locale: "en",
        currentPath: path,
        published: {},
      }),
    });
    assert.equal(metadata.title, resource.seoTitle);
    assert.equal(metadata.description, resource.metaDescription);
    assert.equal(
      metadata.alternates?.canonical,
      `https://dualcorelink.com/en/resources/${resource.slug}/`,
    );
    assert.equal(metadata.openGraph?.title, resource.seoTitle);
    assert.equal(metadata.openGraph?.description, resource.metaDescription);
    assert.ok(metadata.twitter);

    for (const section of resource.sections) {
      for (const link of section.relatedLinks ?? []) {
        assert.ok(link.href.startsWith("/en/resources/"));
        const relatedSlug = link.href.split("/").filter(Boolean).at(-1);
        assert.ok(relatedSlug && resourceSlugs.has(relatedSlug));
        assert.notEqual(relatedSlug, resource.slug);
      }
    }

    const allLinks = [
      ...resource.relatedProducts,
      ...resource.relatedSolutions,
      ...resource.relatedRegions,
      ...resource.relatedDownloads,
      ...resource.sections.flatMap((section) => section.relatedLinks ?? []),
      { href: resource.cta.primaryHref },
      { href: resource.cta.secondaryHref },
    ];
    assert.equal(allLinks.some((link) => link.href === "#"), false);
    assert.equal(
      allLinks.some((link) =>
        /localhost|127\.0\.0\.1|staging2\.cms\.dualcorelink\.com/i.test(
          link.href,
        ),
      ),
      false,
    );
  }
});

test("Phase 2E old-resource relationships are bidirectional and self-safe", () => {
  const requiredRelationships = new Map<string, string[]>([
    [
      "oem-odm-smart-panel-customization-guide",
      [
        "oem-odm-hotel-control-panel-development-process",
        "smart-panel-material-finish-selection-guide",
      ],
    ],
    [
      "hotel-smart-switch-panel-guide",
      ["smart-panel-material-finish-selection-guide"],
    ],
    [
      "hotel-doorplate-room-display-buying-guide",
      [
        "smart-panel-material-finish-selection-guide",
        "hotel-renovation-smart-room-upgrade-guide",
      ],
    ],
    [
      "hotel-room-control-system-cost-factors",
      [
        "oem-odm-hotel-control-panel-development-process",
        "hotel-renovation-smart-room-upgrade-guide",
      ],
    ],
    ["hotel-rcu-buying-guide", ["knx-vs-rcu-hotel-room-control"]],
    [
      "hotel-rcu-wiring-system-architecture-guide",
      ["knx-vs-rcu-hotel-room-control"],
    ],
    [
      "smart-hotel-room-control-system-guide",
      ["knx-vs-rcu-hotel-room-control"],
    ],
    [
      "hotel-guest-room-automation-guide",
      ["hotel-renovation-smart-room-upgrade-guide"],
    ],
    [
      "hotel-occupancy-sensor-selection-guide",
      ["hotel-renovation-smart-room-upgrade-guide"],
    ],
  ]);

  for (const [slug, targets] of requiredRelationships) {
    const resource = resources.find((item) => item.slug === slug);
    assert.ok(resource?.conversion, `Missing conversion map for ${slug}`);
    for (const target of targets) {
      assert.ok(
        resource.conversion.continueReadingSlugs.includes(target),
        `${slug} should link to ${target}`,
      );
    }
    assert.equal(
      resource.conversion.continueReadingSlugs.includes(resource.slug),
      false,
    );
  }
});

test("Phase 2E content keeps FAQ purchasing terms and KNX claims controlled", () => {
  const oemResource = resources.find(
    (resource) =>
      resource.slug === "oem-odm-hotel-control-panel-development-process",
  );
  const knxResource = resources.find(
    (resource) => resource.slug === "knx-vs-rcu-hotel-room-control",
  );
  assert.ok(oemResource);
  assert.ok(knxResource);

  const oemText = JSON.stringify(oemResource).toLowerCase();
  assert.ok(oemText.includes("regular products have no fixed moq"));
  assert.ok(
    oemText.includes(
      "existing mold is used and only the color is changed, no customization fee",
    ),
  );
  assert.ok(oemText.includes("customization or tooling fee"));
  assert.ok(oemText.includes("7-15 days"));
  assert.ok(oemText.includes("depending on product type"));
  assert.equal(oemText.includes("all customization is free of charge"), false);
  assert.equal(oemText.includes("all custom products have no moq"), false);

  const knxText = JSON.stringify(knxResource).toLowerCase();
  assert.ok(
    knxText.includes("standardized building automation protocol ecosystem"),
  );
  assert.ok(knxText.includes("rcu is an architecture and product-category"));
  assert.ok(knxText.includes("knx is not always more expensive"));
  assert.ok(knxText.includes("rcu is not always cheaper"));
  assert.equal(knxText.includes("all products support knx"), false);
  assert.equal(knxText.includes("dualcorelink products natively support knx"), false);
  assert.equal(
    knxResource.relatedProducts.some((product) =>
      /knx/i.test(product.href),
    ),
    false,
  );
  assert.equal(
    knxResource.relatedSolutions.some((solution) =>
      /knx/i.test(solution.href),
    ),
    false,
  );
});

test("Phase 2G control interfaces guide is complete, linked, and attribution-safe", async () => {
  const slug = "hotel-guest-room-control-interfaces-guide";
  const resource = resources.find((item) => item.slug === slug);
  assert.ok(resource);
  assert.equal(
    resource.h1,
    "Hotel Guest Room Control Interfaces: Wall Panels, Touchscreens, Bedside Controls, and Mobile Control",
  );
  assert.equal(
    resource.seoTitle,
    "Hotel Guest Room Control Interfaces Guide | DualCoreLink",
  );
  assert.ok(resource.metaDescription.length >= 140);
  assert.ok(resource.metaDescription.length <= 160);
  assert.equal(resource.primaryKeyword, "hotel guest room control interfaces");
  assert.equal(resource.listingGroup, "Buying Guides");
  assert.ok(resource.sections.length >= 12);
  assert.ok(resource.conversion);
  assert.equal(
    resource.conversion.midCtaAfterSectionId,
    "comparing-control-interfaces",
  );
  assert.deepEqual(resource.conversion.continueReadingSlugs, [
    "hotel-smart-switch-panel-guide",
    "smart-hotel-room-control-system-guide",
    "hotel-guest-room-automation-guide",
  ]);

  const comparison = resource.sections.find(
    (section) => section.id === "comparing-control-interfaces",
  );
  assert.ok(comparison);
  assert.equal(comparison.comparisonItems?.length, 5);
  assert.deepEqual(
    comparison.comparisonItems?.map((item) => item.interfaceType),
    [
      "Wall panel",
      "Touchscreen",
      "Bedside control",
      "Thermostat",
      "Mobile control",
    ],
  );

  const wordCount = resource.sections
    .flatMap((section) => [
      ...section.body,
      ...(section.subsections?.flatMap((subsection) => subsection.body) ?? []),
      ...(section.comparisonItems?.flatMap((item) => [
        item.bestFor,
        item.mainAdvantage,
        item.mainConsideration,
        item.typicalSystemRole,
      ]) ?? []),
    ])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  assert.ok(wordCount >= 1800, `Phase 2G guide has only ${wordCount} words`);

  const sitemapUrls = new Set((await sitemap()).map((entry) => entry.url));
  const resourceUrl = `https://dualcorelink.com/en/resources/${slug}/`;
  assert.ok(sitemapUrls.has(resourceUrl));

  const path = buildLocalizedPath("en", `resources/${slug}`);
  const metadata = createMetadata({
    locale: "en",
    path,
    title: resource.seoTitle,
    description: resource.metaDescription,
    hreflang: createContentHreflang({
      locale: "en",
      currentPath: path,
      published: {},
    }),
  });
  assert.equal(metadata.alternates?.canonical, resourceUrl);
  assert.equal(metadata.openGraph?.title, resource.seoTitle);
  assert.equal(metadata.openGraph?.description, resource.metaDescription);
  assert.ok(metadata.twitter);

  const article = createArticleSchema({
    id: `${resourceUrl}#article`,
    url: resourceUrl,
    headline: resource.title,
    description: resource.metaDescription,
    datePublished: resource.lastReviewed,
    dateModified: resource.lastReviewed,
  });
  const breadcrumb = createBreadcrumbSchema(`${resourceUrl}#breadcrumb`, [
    { name: "Home", url: "https://dualcorelink.com/en/" },
    { name: "Resources", url: "https://dualcorelink.com/en/resources/" },
    { name: resource.title, url: resourceUrl },
  ]);
  assert.equal(article["@type"], "Article");
  assert.equal(article.mainEntityOfPage, resourceUrl);
  assert.equal(breadcrumb["@type"], "BreadcrumbList");
  assert.equal(breadcrumb.itemListElement.length, 3);

  const productSlugs = new Set(
    (await productRepository.getStaticParams("en")).map((item) => item.slug),
  );
  assert.equal(resource.relatedProducts.length, 4);
  for (const product of resource.relatedProducts) {
    const productSlug = product.href.split("/").filter(Boolean).at(-1);
    assert.ok(productSlug && productSlugs.has(productSlug));
    assert.ok(productSlug && productDisplayImages[productSlug]);
  }
  for (const solution of resource.relatedSolutions) {
    const solutionSlug = solution.href.split("/").filter(Boolean).at(-1);
    assert.ok(solutionSlug && publishedSolutionSlugs.has(solutionSlug));
  }

  const requiredBacklinks = [
    "hotel-smart-switch-panel-guide",
    "smart-hotel-room-control-system-guide",
    "hotel-guest-room-automation-guide",
  ];
  for (const sourceSlug of requiredBacklinks) {
    const source = resources.find((item) => item.slug === sourceSlug);
    assert.ok(source?.conversion);
    assert.ok(source.conversion.continueReadingSlugs.includes(slug));
  }

  const bodyHrefs = resource.sections.flatMap((section) =>
    (section.relatedLinks ?? []).map((link) => link.href),
  );
  assert.ok(bodyHrefs.some((href) => href.includes("/products/hotel-smart-room-rcu-host-1/")));
  assert.ok(bodyHrefs.some((href) => href.includes("/products/86-type-ai-smart-control-display/")));
  assert.ok(bodyHrefs.some((href) => href.includes("/products/smart-four-key-scene-control-panel/")));
  assert.ok(bodyHrefs.some((href) => href.includes("/solutions/")));
  assert.ok(bodyHrefs.filter((href) => href.includes("/resources/")).length >= 2);
  assert.ok(bodyHrefs.includes("/en/contact/#get-a-quote"));

  const quoteHref = buildQuoteHref("en", {
    sourcePage: `/en/resources/${slug}/`,
    contentType: "resource",
    contentSlug: slug,
    sourceTitle: resource.h1,
    ctaPosition: "resource_mid_article",
  });
  const quoteUrl = new URL(quoteHref, "https://dualcorelink.com");
  assert.equal(quoteUrl.pathname, "/en/contact/");
  assert.equal(quoteUrl.hash, "#get-a-quote");
  assert.equal(quoteUrl.search, "");

  const inquiryEvent = createInquiryEvent("cta_click", "form", {
    sourcePage: `/en/resources/${slug}/`,
    contentType: "resource",
    contentSlug: slug,
    sourceTitle: resource.h1,
    ctaPosition: "resource_mid_article",
  });
  assert.deepEqual(Object.keys(inquiryEvent).sort(), [
    "category",
    "cta_location",
    "event",
    "page_path",
    "source_slug",
    "source_type",
  ]);
  assert.equal(JSON.stringify(inquiryEvent).includes(resource.h1), false);
  assert.equal(
    /name|email|phone|company|message|filename|whatsapp_number/i.test(
      Object.keys(inquiryEvent).join(" "),
    ),
    false,
  );

  const serialized = JSON.stringify(resource).toLowerCase();
  assert.equal(
    /localhost|127\.0\.0\.1|siteground|pages\.dev|cms-aws/.test(serialized),
    false,
  );
  assert.equal(serialized.includes('"href":"#"'), false);
});

test("Phase 2H priority resources preserve intent, links, and conversion safety", async () => {
  const priorityExpectations = [
    {
      slug: "smart-hotel-room-control-system-guide",
      requiredSections: [
        "system-architecture-map",
        "room-function-matrix",
        "commissioning-boundaries",
      ],
    },
    {
      slug: "hotel-guest-room-automation-guide",
      requiredSections: [
        "arrival-occupancy-workflows",
        "sleep-service-housekeeping",
        "fallback-operational-boundaries",
      ],
    },
    {
      slug: "hotel-smart-switch-panel-guide",
      requiredSections: [
        "panel-location-schedule",
        "panel-sample-approval",
        "panel-quotation-comparison",
      ],
    },
    {
      slug: "oem-odm-smart-panel-customization-guide",
      requiredSections: [
        "customization-workstreams",
        "controlled-sample-approval",
        "tooling-packaging-assumptions",
      ],
    },
    {
      slug: "hotel-rcu-buying-guide",
      requiredSections: [
        "rcu-io-load-schedule",
        "rcu-responsibility-boundaries",
        "rcu-supplier-response-review",
      ],
    },
  ];
  const resourceSlugs = new Set(resources.map((resource) => resource.slug));

  assert.equal(resources.length, 15);
  for (const expectation of priorityExpectations) {
    const resource = resources.find((item) => item.slug === expectation.slug);
    assert.ok(resource);
    assert.equal(resource.lastReviewed, "2026-07-17");
    assert.equal(resource.sections.length, 9);
    assert.ok(resource.conversion);
    assert.equal(resource.conversion.continueReadingSlugs.length, 3);
    assert.equal(resource.relatedProducts.length, 4);
    assert.ok(resource.relatedSolutions.length >= 2);
    assert.equal(resource.cta.primaryHref, "/en/contact/#get-a-quote");

    const sectionIds = new Set(resource.sections.map((section) => section.id));
    for (const requiredSection of expectation.requiredSections) {
      assert.ok(
        sectionIds.has(requiredSection),
        `Missing ${requiredSection} in ${resource.slug}`,
      );
    }

    const articleWords = resource.sections
      .flatMap((section) => [
        ...section.body,
        ...(section.subsections?.flatMap((subsection) => subsection.body) ?? []),
      ])
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    assert.ok(articleWords >= 500, `${resource.slug} has only ${articleWords} words`);

    const contextualResourceLinks = resource.sections.flatMap((section) =>
      (section.relatedLinks ?? []).map((link) => link.href),
    );
    assert.ok(contextualResourceLinks.length >= 3);
    for (const href of contextualResourceLinks) {
      assert.ok(href.startsWith("/en/resources/"));
      const targetSlug = href.split("/").filter(Boolean).at(-1);
      assert.ok(targetSlug && resourceSlugs.has(targetSlug));
      assert.notEqual(targetSlug, resource.slug);
    }

    const quoteHref = buildQuoteHref("en", {
      sourcePage: `/en/resources/${resource.slug}/`,
      contentType: "resource",
      contentSlug: resource.slug,
      sourceTitle: resource.h1,
      ctaPosition: "resource_final",
    });
    const quoteUrl = new URL(quoteHref, "https://dualcorelink.com");
    assert.equal(quoteUrl.pathname, "/en/contact/");
    assert.equal(quoteUrl.hash, "#get-a-quote");
    assert.equal(quoteUrl.search, "");

    const event = createInquiryEvent("cta_click", "form", {
      sourcePage: `/en/resources/${resource.slug}/`,
      contentType: "resource",
      contentSlug: resource.slug,
      sourceTitle: resource.h1,
      ctaPosition: "resource_final",
    });
    assert.deepEqual(Object.keys(event).sort(), [
      "category",
      "cta_location",
      "event",
      "page_path",
      "source_slug",
      "source_type",
    ]);
    assert.equal(JSON.stringify(event).includes(resource.h1), false);

    const serialized = JSON.stringify(resource).toLowerCase();
    assert.equal(
      /localhost|127\.0\.0\.1|siteground|pages\.dev|cms-aws/.test(serialized),
      false,
    );
    assert.equal(serialized.includes('"href":"#"'), false);
    const buyerFacingContent = JSON.stringify({
      title: resource.title,
      h1: resource.h1,
      summary: resource.summary,
      sections: resource.sections,
      relatedProducts: resource.relatedProducts,
      relatedSolutions: resource.relatedSolutions,
      cta: resource.cta,
    }).toLowerCase();
    assert.equal(
      /local stock|guaranteed compliance|fake review|aggregate rating/.test(
        buyerFacingContent,
      ),
      false,
    );
  }
});

test("all published product detail pages can emit safe Product schema", async () => {
  const params = await productRepository.getStaticParams("en");
  assert.equal(params.length, 36);

  const schemas = await Promise.all(
    params.map(async ({ slug }) => {
      const product = await productRepository.getBySlug("en", slug);
      assert.ok(product, `Expected product for ${slug}`);

      return createProductSchema(
        product,
        `https://dualcorelink.com/en/products/${slug}/`,
      );
    }),
  );

  assert.equal(
    schemas.filter((schema) => schema["@type"] === "Product").length,
    36,
  );

  for (const schema of schemas) {
    assert.ok(schema.name);
    assert.ok(schema.description);
    assert.ok(schema.url);
    assert.ok(schema.brand);
    assert.ok(Array.isArray(schema.category));
    assert.ok(schema.category.length > 0);
    assert.equal("price" in schema, false);
    assert.equal("availability" in schema, false);
    assert.equal("aggregateRating" in schema, false);
    assert.equal("review" in schema, false);
  }
});

test("manufacturer requires an explicit verified declaration", () => {
  const schema = createProductSchema(
    createProduct(),
    "https://dualcorelink.com/en/products/smart-switch/",
    {
      manufacturer: {
        verified: true,
        name: "Cangzhou Yitai Trading Co., Ltd.",
      },
    },
  );

  assert.equal(
    (schema.manufacturer as { name: string }).name,
    "Cangzhou Yitai Trading Co., Ltd.",
  );
});

test("controlled Download schema never exposes file URL or attachment ID", () => {
  const access = evaluateDownloadAccess({
    isPublic: true,
    leadCaptureRequired: true,
    directDownloadEnabled: true,
  });
  const schema = createDigitalDocumentSchema({
    id: "https://dualcorelink.com/en/downloads/catalog/#document",
    url: "https://dualcorelink.com/en/downloads/catalog/",
    name: "Catalog",
    access,
    publicFileUrl: "https://cms.example.com/uploads/private-catalog.pdf",
  });
  const serialized = JSON.stringify(schema);

  assert.equal("contentUrl" in schema, false);
  assert.equal(serialized.includes("private-catalog.pdf"), false);
  assert.equal(serialized.includes("attachment"), false);
});

test("schema graph deduplicates stable entities and builds breadcrumbs", () => {
  const breadcrumb = createBreadcrumbSchema(
    "https://dualcorelink.com/en/products/#breadcrumb",
    [
      { name: "Home", url: "https://dualcorelink.com/en/" },
      { name: "Products", url: "https://dualcorelink.com/en/products/" },
    ],
  );
  const graph = createSchemaGraph([createGlobalEntities()[0], breadcrumb]);

  assert.equal(
    graph["@graph"].filter((node) => node["@id"] === organizationId).length,
    1,
  );
  assert.equal(breadcrumb.itemListElement instanceof Array, true);
});
