import assert from "node:assert/strict";
import test from "node:test";
import {
  buildQuoteHref,
  cleanContactHistoryUrl,
  inquiryAttributionMaxAgeMs,
  inquiryAttributionStorageKey,
  parseInquiryAttribution,
  parseLegacyInquiryAttribution,
  readInquiryAttribution,
  writeInquiryAttribution,
} from "../src/lib/inquiry/attribution";
import { createInquiryEvent } from "../src/lib/inquiry/events";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
    values,
  };
}

const productAttribution = {
  sourcePage: "/en/products/hotel-smart-room-rcu-host-1/",
  contentType: "product" as const,
  contentSlug: "hotel-smart-room-rcu-host-1",
  sourceTitle: "Hotel Smart Room RCU Host 1",
  ctaPosition: "product_hero",
};

test("quote links use a clean Contact URL while attribution remains complete", () => {
  const href = buildQuoteHref("en", {
    ...productAttribution,
  });

  assert.equal(href, "/en/contact/#get-a-quote");
  assert.equal(new URL(href, "https://dualcorelink.com").search, "");
});

test("inquiry attribution rejects unknown content types and control characters", () => {
  const attribution = parseInquiryAttribution(
    "?source_page=%2Fen%2Fcontact%2F%0AInjected&content_type=unknown&cta_position=footer%0Dtest",
  );

  assert.equal(attribution.contentType, "contact");
  assert.equal(attribution.sourcePage, "/en/contact/");
  assert.equal(attribution.sourceTitle, undefined);
  assert.equal(attribution.ctaPosition, "contact_page");
  assert.equal(attribution.sourcePage.includes("\n"), false);
  assert.equal(attribution.ctaPosition.includes("\r"), false);
});

test("content attribution requiring a slug falls back when the slug is missing", () => {
  assert.deepEqual(
    parseInquiryAttribution(
      "?source_page=%2Fen%2Fresources%2F&content_type=resource&source_title=Untrusted&cta_position=qa",
    ),
    {
      sourcePage: "/en/contact/",
      contentType: "contact",
      contentSlug: undefined,
      sourceTitle: undefined,
      ctaPosition: "contact_page",
    },
  );
});

test("direct contact visits receive stable fallback attribution", () => {
  assert.deepEqual(parseInquiryAttribution(""), {
    sourcePage: "/en/contact/",
    contentType: "contact",
    contentSlug: undefined,
    sourceTitle: undefined,
    ctaPosition: "contact_page",
  });
});

test("legacy Contact parameters use a strict whitelist and length limits", () => {
  const parsed = parseLegacyInquiryAttribution(
    "?source_page=%2Fen%2Fproducts%2Fhotel-smart-room-rcu-host-1%2F&content_type=product&content_slug=hotel-smart-room-rcu-host-1&source_title=Hotel+Smart+Room+RCU+Host+1&cta_position=product_hero&email=private%40example.com&unknown=value",
  );
  assert.deepEqual(parsed, productAttribution);
  assert.equal(
    parseLegacyInquiryAttribution(
      "?source_page=https%3A%2F%2Fevil.example%2F&content_type=site&cta_position=footer",
    ),
    undefined,
  );
  assert.equal(
    parseLegacyInquiryAttribution(
      `?source_page=%2Fen%2Fproducts%2Fhost%2F&content_type=product&content_slug=${"x".repeat(121)}&cta_position=product_hero`,
    ),
    undefined,
  );
});

test("session attribution survives refresh but expires and is isolated per session", () => {
  const firstSession = memoryStorage();
  const secondSession = memoryStorage();
  const savedAt = 1_000_000;

  assert.equal(
    writeInquiryAttribution(firstSession, productAttribution, savedAt),
    true,
  );
  assert.deepEqual(
    readInquiryAttribution(firstSession, savedAt + 60_000),
    productAttribution,
  );
  assert.equal(readInquiryAttribution(secondSession, savedAt + 60_000), undefined);
  assert.equal(
    readInquiryAttribution(
      firstSession,
      savedAt + inquiryAttributionMaxAgeMs + 1,
    ),
    undefined,
  );
  assert.equal(firstSession.getItem(inquiryAttributionStorageKey), null);
});

test("session attribution stores only approved non-PII fields", () => {
  const storage = memoryStorage();
  writeInquiryAttribution(storage, productAttribution, 1_000_000);
  const serialized = storage.getItem(inquiryAttributionStorageKey) ?? "";
  assert.match(serialized, /hotel-smart-room-rcu-host-1/);
  assert.doesNotMatch(
    serialized,
    /email|phone|company|message|customer|private/i,
  );
  assert.deepEqual(
    Object.keys(JSON.parse(serialized).attribution).sort(),
    [
      "contentSlug",
      "contentType",
      "ctaPosition",
      "sourcePage",
      "sourceTitle",
    ],
  );
});

test("legacy Contact query cleanup preserves only the path and hash", () => {
  assert.equal(
    cleanContactHistoryUrl("/en/contact/", "#get-a-quote"),
    "/en/contact/#get-a-quote",
  );
  assert.equal(
    cleanContactHistoryUrl("https://evil.example/", "#get-a-quote"),
    "/en/contact/#get-a-quote",
  );
});

test("analytics events expose only approved non-PII attribution fields", () => {
  const event = createInquiryEvent(
    "cta_click",
    "whatsapp",
    {
      sourcePage: "/en/resources/hotel-rcu-buying-guide/",
      contentType: "resource",
      contentSlug: "hotel-rcu-buying-guide",
      sourceTitle: "Hotel RCU Buying Guide",
      ctaPosition: "resource_mid_article",
    },
  );

  assert.deepEqual(event, {
    event: "inquiry_cta_click",
    source_type: "resource",
    source_slug: "hotel-rcu-buying-guide",
    cta_location: "resource_mid_article",
    category: "whatsapp",
    page_path: "/en/resources/hotel-rcu-buying-guide/",
  });
  assert.deepEqual(Object.keys(event).sort(), [
    "category",
    "cta_location",
    "event",
    "page_path",
    "source_slug",
    "source_type",
  ]);
  assert.equal(JSON.stringify(event).includes("Hotel RCU Buying Guide"), false);
});
