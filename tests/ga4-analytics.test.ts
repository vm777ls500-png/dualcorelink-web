import assert from "node:assert/strict";
import test from "node:test";
import {
  analyticsConsentStorageKey,
  createGa4InquiryEvent,
  normalizeGa4MeasurementId,
  sendGa4InquiryEvent,
} from "../src/lib/analytics/ga4";
import { createInquiryEvent } from "../src/lib/inquiry/events";

test("GA4 measurement IDs are validated without a repository default", () => {
  assert.equal(normalizeGa4MeasurementId(), undefined);
  assert.equal(normalizeGa4MeasurementId("G-ABC1234567"), "G-ABC1234567");
  assert.equal(normalizeGa4MeasurementId(" g-abc1234567 "), "G-ABC1234567");
  assert.equal(normalizeGa4MeasurementId("G-TEST"), undefined);
  assert.equal(normalizeGa4MeasurementId("GTM-ABC123"), undefined);
});

test("GA4 inquiry mapping preserves only the approved non-PII payload", () => {
  const inquiryEvent = createInquiryEvent(
    "cta_click",
    "whatsapp",
    {
      sourcePage: "/en/products/hotel-smart-room-rcu-host-1/",
      contentType: "product",
      contentSlug: "hotel-smart-room-rcu-host-1",
      sourceTitle: "Hotel Smart Room RCU Host 1",
      ctaPosition: "product_buying_guide_whatsapp",
    },
  );
  const ga4Event = createGa4InquiryEvent(inquiryEvent);

  assert.equal(ga4Event.name, "inquiry_cta_click");
  assert.deepEqual(ga4Event.params, {
    source_type: "product",
    source_slug: "hotel-smart-room-rcu-host-1",
    cta_location: "product_buying_guide_whatsapp",
    category: "whatsapp",
    page_path: "/en/products/hotel-smart-room-rcu-host-1/",
  });
  assert.deepEqual(Object.keys(ga4Event.params).sort(), [
    "category",
    "cta_location",
    "page_path",
    "source_slug",
    "source_type",
  ]);
  assert.equal(JSON.stringify(ga4Event).includes("Hotel Smart Room RCU Host 1"), false);
});

test("GA4 inquiry delivery requires consent and emits one sanitized event", () => {
  const originalWindow = globalThis.window;
  const calls: unknown[][] = [];
  let consent = "denied";
  const browserWindow = {
    dualcorelinkGa4Configured: true,
    gtag: (...args: unknown[]) => calls.push(args),
    localStorage: {
      getItem: (key: string) =>
        key === analyticsConsentStorageKey ? consent : null,
    },
  };
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: browserWindow,
  });

  try {
    const inquiryEvent = createInquiryEvent(
      "form_submit",
      "form",
      {
        sourcePage: "/en/resources/hotel-rcu-buying-guide/",
        contentType: "resource",
        contentSlug: "hotel-rcu-buying-guide",
        sourceTitle: "Hotel RCU Buying Guide",
        ctaPosition: "resource_final",
      },
    );

    assert.equal(sendGa4InquiryEvent(inquiryEvent), false);
    assert.equal(calls.length, 0);

    consent = "granted";
    assert.equal(sendGa4InquiryEvent(inquiryEvent), true);
    assert.deepEqual(calls, [
      [
        "event",
        "inquiry_form_submit",
        {
          source_type: "resource",
          source_slug: "hotel-rcu-buying-guide",
          cta_location: "resource_final",
          category: "form",
          page_path: "/en/resources/hotel-rcu-buying-guide/",
        },
      ],
    ]);
    assert.equal(JSON.stringify(calls).includes("Hotel RCU Buying Guide"), false);
  } finally {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: originalWindow,
    });
  }
});
