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
import type { ProductDetailModel } from "../src/types/content";

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

test("resources are included in the sitemap without non-English or PDF URLs", async () => {
  const urls = (await sitemap()).map((entry) => entry.url);

  assert.equal(urls.length, 61 + resources.length);
  assert.ok(urls.includes("https://dualcorelink.com/en/resources/"));
  for (const resource of resources) {
    assert.ok(
      urls.includes(`https://dualcorelink.com/en/resources/${resource.slug}/`),
      `Expected sitemap to include resource ${resource.slug}`,
    );
  }
  assert.equal(urls.some((url) => /\/(zh|de|es|ar|vi|fa)\//.test(url)), false);
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

  for (const resource of resources) {
    assert.equal(slugs.has(resource.slug), false, `Duplicate ${resource.slug}`);
    slugs.add(resource.slug);
    assert.ok(resource.h1);
    assert.ok(resource.seoTitle);
    assert.ok(resource.metaDescription);
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
  }
});

test("Phase 2C resource conversion maps are complete and internally valid", () => {
  const conversionResources = resources.filter((resource) => resource.conversion);
  const resourceSlugs = new Set(resources.map((resource) => resource.slug));

  assert.equal(conversionResources.length, 5);

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
    }

    for (const relatedSlug of conversion.continueReadingSlugs) {
      assert.notEqual(relatedSlug, resource.slug);
      assert.ok(resourceSlugs.has(relatedSlug));
    }
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
