import assert from "node:assert/strict";
import test from "node:test";
import {
  createProductRepository,
  createSolutionRepository,
} from "../src/lib/wordpress/repositories";
import type { WordPressClient } from "../src/lib/wordpress/client";
import type {
  WordPressMedia,
  WordPressPost,
} from "../src/types/wordpress";
import {
  emptyStaticExportSlug,
  ensureStaticExportParams,
} from "../src/lib/routing/static-export";

function createPost(
  type: "product" | "solution",
  overrides: Partial<WordPressPost> = {},
): WordPressPost {
  return {
    id: type === "product" ? 10 : 20,
    slug: type === "product" ? "smart-switch" : "hotel-automation",
    status: "publish",
    type,
    link: `http://127.0.0.1:8080/${type}/`,
    title: { rendered: type === "product" ? "Smart Switch" : "Hotel Automation" },
    excerpt: { rendered: `${type} excerpt` },
    content: { rendered: `${type} content` },
    featuredMedia: null,
    language: "en",
    direction: "ltr",
    translations: {},
    translationGroup: `shb2b-${type}`,
    hreflang: {},
    acf:
      type === "product"
        ? {
            product_model: "DL-100",
            product_short_description: "Connected wall switch.",
            product_image_1: 101,
            product_image_2: 404,
            related_solutions: [20, "20"],
            internal_sku: "must-not-leak",
          }
        : {
            solution_summary: "Hotel room automation.",
            solution_hero_image: 101,
            recommended_products: [10, "10"],
            solution_sales_notes: "must-not-leak",
          },
    ...overrides,
  };
}

function createMockClient(options?: {
  products?: WordPressPost[];
  solutions?: WordPressPost[];
  media?: Record<number, WordPressMedia | null>;
}) {
  const mediaCalls: number[] = [];
  const listCalls: string[] = [];
  const products = options?.products ?? [];
  const solutions = options?.solutions ?? [];

  const client: WordPressClient = {
    config: {
      restRoot: "http://127.0.0.1:8080/wp-json",
      timeoutMs: 10_000,
    },
    async getRoot() {
      return { name: "Test", url: "http://127.0.0.1:8080", namespaces: [] };
    },
    async listPosts(endpoint, query) {
      listCalls.push(endpoint);
      const source = endpoint === "products" ? products : solutions;
      const include = query?.include;
      return include?.length
        ? source.filter((post) => include.includes(post.id))
        : source;
    },
    async getMedia(id) {
      mediaCalls.push(id);
      return options?.media?.[id] ?? null;
    },
  };

  return { client, mediaCalls, listCalls };
}

const image: WordPressMedia = {
  id: 101,
  sourceUrl: "http://127.0.0.1:8080/image.jpg",
  altText: "Product",
  mediaType: "image",
  mimeType: "image/jpeg",
  width: 1200,
  height: 800,
};

test("empty repositories return empty lists and static params", async () => {
  const { client, listCalls } = createMockClient();
  const products = createProductRepository(client);
  const solutions = createSolutionRepository(client);

  assert.deepEqual(await products.list("en"), []);
  assert.deepEqual(await products.getStaticParams("en"), []);
  assert.equal(await products.getBySlug("en", "missing"), null);
  assert.deepEqual(await solutions.list("en"), []);
  assert.deepEqual(await solutions.getStaticParams("en"), []);
  assert.equal(await solutions.getBySlug("en", "missing"), null);
  assert.equal(listCalls.includes("inquiry"), false);
});

test("empty dynamic collections receive a non-content 404 build sentinel", () => {
  assert.deepEqual(ensureStaticExportParams([]), [
    { locale: "en", slug: emptyStaticExportSlug },
  ]);
});

test("product repository resolves media and related solutions in batches", async () => {
  const product = createPost("product");
  const solution = createPost("solution");
  const { client, mediaCalls, listCalls } = createMockClient({
    products: [product],
    solutions: [solution],
    media: { 101: image, 404: null },
  });
  const repository = createProductRepository(client, 2);

  const list = await repository.list("en");
  const detail = await repository.getBySlug("en", "smart-switch");

  assert.equal(list[0]?.primaryImage?.id, 101);
  assert.deepEqual(detail?.images.map((item) => item.id), [101]);
  assert.equal(detail?.seoOpenGraphImage, null);
  assert.equal(detail?.seoTwitterImage, null);
  assert.deepEqual(detail?.relatedSolutions.map((item) => item.id), [20]);
  assert.deepEqual([...new Set(mediaCalls)].sort(), [101, 404]);
  assert.equal(listCalls.filter((item) => item === "products").length, 1);
  assert.equal(listCalls.includes("solutions"), true);
  assert.equal("internal_sku" in (detail ?? {}), false);
});

test("solution repository resolves hero media and related products", async () => {
  const product = createPost("product");
  const solution = createPost("solution");
  const { client, listCalls } = createMockClient({
    products: [product],
    solutions: [solution],
    media: { 101: image },
  });
  const repository = createSolutionRepository(client);

  const list = await repository.list("en");
  const detail = await repository.getBySlug("en", "hotel-automation");

  assert.equal(list[0]?.heroImage?.id, 101);
  assert.equal(detail?.seoOpenGraphImage, null);
  assert.equal(detail?.seoTwitterImage, null);
  assert.deepEqual(detail?.relatedProducts.map((item) => item.id), [10]);
  assert.equal(listCalls.filter((item) => item === "solutions").length, 1);
  assert.equal(listCalls.includes("products"), true);
  assert.equal("solution_sales_notes" in (detail ?? {}), false);
});
