import assert from "node:assert/strict";
import test from "node:test";
import { evaluateDownloadAccess } from "../src/lib/downloads/access";
import {
  adaptDownload,
  adaptProduct,
  adaptProducts,
  adaptRegion,
} from "../src/lib/wordpress/adapters";
import { createWordPressClient } from "../src/lib/wordpress/client";
import { publicCollectionEndpoints } from "../src/lib/wordpress/endpoints";
import { discardInternalFields } from "../src/lib/wordpress/internal-fields";
import {
  normalizeMediaId,
  normalizeRelationshipIds,
} from "../src/lib/wordpress/relationships";
import { validatePost } from "../src/lib/wordpress/validators";

test("download access exposes files only for public direct downloads", () => {
  const cases = [
    {
      input: {
        isPublic: true,
        leadCaptureRequired: false,
        directDownloadEnabled: true,
      },
      expected: true,
    },
    {
      input: {
        isPublic: false,
        leadCaptureRequired: false,
        directDownloadEnabled: true,
      },
      expected: false,
    },
    {
      input: {
        isPublic: true,
        leadCaptureRequired: true,
        directDownloadEnabled: true,
      },
      expected: false,
    },
    {
      input: {
        isPublic: true,
        leadCaptureRequired: false,
        directDownloadEnabled: false,
      },
      expected: false,
    },
  ];

  for (const item of cases) {
    assert.equal(evaluateDownloadAccess(item.input).exposeFile, item.expected);
  }
});

test("relationship and media IDs are normalized and deduplicated", () => {
  assert.deepEqual(
    normalizeRelationshipIds([1, "2", { ID: 3 }, { id: 3 }, 0, "bad"]),
    [1, 2, 3],
  );
  assert.equal(normalizeMediaId({ id: 14 }), 14);
  assert.equal(normalizeMediaId(null), null);
});

test("internal, CRM, HubSpot, and Inquiry fields are discarded", () => {
  assert.deepEqual(
    discardInternalFields({
      product_model: "DL-100",
      internal_sku: "secret",
      partner_crm_company_id: "crm",
      partner_hubspot_company_id: "hubspot",
      inquiry_language: "en",
    }),
    { product_model: "DL-100" },
  );
});

test("post validation removes sensitive ACF values before adapting", () => {
  const result = validatePost({
    id: 10,
    slug: "smart-switch",
    status: "publish",
    type: "product",
    link: "http://localhost/product/smart-switch/",
    title: { rendered: "Smart Switch" },
    excerpt: { rendered: "Product excerpt" },
    content: { rendered: "Product body" },
    featured_media: 0,
    language: "en",
    direction: "ltr",
    translations: {},
    translation_group: "shb2b-product-10",
    hreflang: {},
    acf: {
      product_model: "DL-100",
      product_short_description: "A connected switch.",
      product_image_1: 21,
      related_solutions: [31, "32"],
      internal_sku: "secret",
      product_internal_notes: "private",
    },
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  const product = adaptProduct(result.value);
  assert.equal(product.model, "DL-100");
  assert.deepEqual(product.imageIds, [21]);
  assert.deepEqual(product.relatedSolutionIds, [31, 32]);
  assert.equal("internal_sku" in product, false);
  assert.equal("product_internal_notes" in product, false);
  assert.equal("internal_sku" in result.value.acf, false);
});

test("empty product collections adapt without errors", () => {
  assert.deepEqual(adaptProducts([]), []);
});

test("client media resolver accepts IDs and handles 404", async () => {
  const fetcher: typeof fetch = async () =>
    new Response(JSON.stringify({ code: "rest_post_invalid_id" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  const client = createWordPressClient({
    restRoot: "http://127.0.0.1:8080/wp-json",
    fetcher,
  });

  assert.equal(await client.getMedia(0), null);
  assert.equal(await client.getMedia(999), null);
});

test("client validates and maps a public media response", async () => {
  const fetcher: typeof fetch = async () =>
    Response.json({
      id: 44,
      source_url: "http://127.0.0.1:8080/image.jpg",
      alt_text: "Smart switch",
      media_type: "image",
      mime_type: "image/jpeg",
      media_details: { width: 1200, height: 800 },
    });
  const client = createWordPressClient({
    restRoot: "http://127.0.0.1:8080/wp-json",
    fetcher,
  });

  assert.deepEqual(await client.getMedia(44), {
    id: 44,
    sourceUrl: "http://127.0.0.1:8080/image.jpg",
    altText: "Smart switch",
    mediaType: "image",
    mimeType: "image/jpeg",
    width: 1200,
    height: 800,
  });
});

test("Inquiry is absent from the allowed collection endpoints", () => {
  assert.equal(publicCollectionEndpoints.includes("inquiry" as never), false);
});

test("controlled Download adapter drops file URLs", () => {
  const result = validatePost({
    id: 80,
    slug: "catalog",
    status: "publish",
    type: "download",
    link: "http://localhost/downloads/catalog/",
    title: { rendered: "Catalog" },
    excerpt: { rendered: "Catalog excerpt" },
    content: { rendered: "" },
    featured_media: 0,
    language: "en",
    direction: "ltr",
    translations: {},
    translation_group: "download-80",
    hreflang: {},
    acf: {
      download_file_name: "Catalog",
      download_file: 900,
      download_file_type: "catalog",
      download_file_language: "en",
      download_description: "Product catalog.",
      download_is_public: true,
      download_lead_capture_required: true,
      download_direct_enabled: true,
      download_external_url: "https://cms.example.com/private.pdf",
    },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;

  const download = adaptDownload(result.value);
  assert.equal(download.access.exposeFile, false);
  assert.equal(download.publicFileUrl, undefined);
});

test("Region adapter exposes WhatsApp only when enabled", () => {
  const result = validatePost({
    id: 90,
    slug: "middle-east",
    status: "publish",
    type: "region",
    link: "http://localhost/regions/middle-east/",
    title: { rendered: "Middle East" },
    excerpt: { rendered: "Regional overview" },
    content: { rendered: "" },
    featured_media: 0,
    language: "en",
    direction: "ltr",
    translations: {},
    translation_group: "region-90",
    hreflang: {},
    acf: {
      region_code: "middle_east",
      region_type: "market",
      region_market_summary: "Regional overview",
      region_whatsapp_cta_enabled: false,
      region_whatsapp_number: "+85270390436",
      region_whatsapp_message: "Private message",
    },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(adaptRegion(result.value).whatsapp, undefined);
});
