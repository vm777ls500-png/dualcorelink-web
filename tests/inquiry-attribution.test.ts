import assert from "node:assert/strict";
import test from "node:test";
import {
  buildQuoteHref,
  parseInquiryAttribution,
} from "../src/lib/inquiry/attribution";
import { createInquiryEvent } from "../src/lib/inquiry/events";

test("quote links preserve source context before the contact anchor", () => {
  const href = buildQuoteHref("en", {
    sourcePage: "/en/products/hotel-smart-room-rcu-host-1/",
    contentType: "product",
    contentSlug: "hotel-smart-room-rcu-host-1",
    sourceTitle: "Hotel Smart Room RCU Host 1",
    ctaPosition: "product_hero",
  });

  assert.ok(href.startsWith("/en/contact/?"));
  assert.ok(href.endsWith("#get-a-quote"));
  const query = href.slice(href.indexOf("?"), href.indexOf("#"));
  assert.deepEqual(parseInquiryAttribution(query), {
    sourcePage: "/en/products/hotel-smart-room-rcu-host-1/",
    contentType: "product",
    contentSlug: "hotel-smart-room-rcu-host-1",
    sourceTitle: "Hotel Smart Room RCU Host 1",
    ctaPosition: "product_hero",
  });
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
