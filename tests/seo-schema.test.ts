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
import {
  brandId,
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

test("hreflang includes only current or verified same-origin translations", () => {
  assert.deepEqual(createStaticHreflang(["en", "ar"], "products"), {
    en: "https://dualcorelink.com/en/products/",
    ar: "https://dualcorelink.com/ar/products/",
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
      ar: "https://dualcorelink.com/ar/products/smart-switch/",
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
