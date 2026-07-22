import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { createWhatsAppUrl } from "../src/config/brand";
import {
  buildInquiryEmailDraft,
  createInquiryDraftLaunchGate,
  validateInquiryDraftFields,
  type InquiryDraftFields,
} from "../src/lib/inquiry/email-draft";
import { createInquiryEvent } from "../src/lib/inquiry/events";

const validFields: InquiryDraftFields = {
  name: "Internal QA",
  email: "qa@example.invalid",
  country: "Singapore",
  customerType: "System Integrator",
  productInterests: ["RCU Room Control Host"],
  message: "Delivery workflow review with no customer data.",
};

const attribution = {
  sourcePage: "/en/products/hotel-smart-room-rcu-host-1/",
  contentType: "product" as const,
  contentSlug: "hotel-smart-room-rcu-host-1",
  sourceTitle: "Hotel Smart Room RCU Host 1",
  ctaPosition: "product_hero",
};

test("inquiry draft validation keeps required and optional field rules distinct", () => {
  assert.deepEqual(validateInquiryDraftFields(validFields), []);
  assert.deepEqual(
    validateInquiryDraftFields({
      ...validFields,
      name: "",
      email: "invalid",
      country: "",
      customerType: "",
      productInterests: [],
      message: "",
      company: "",
      phone: "",
      quantity: "",
      projectStage: "",
      targetDelivery: "",
    }),
    ["name", "email", "country", "customerType", "productInterests", "message"],
  );
});

test("email drafts omit empty optional fields and preserve readable attribution", () => {
  const draft = new URL(buildInquiryEmailDraft(validFields, attribution));
  const body = draft.searchParams.get("body") ?? "";

  assert.equal(draft.protocol, "mailto:");
  assert.match(draft.pathname, /sales@dualcorelink\.com/);
  assert.equal(draft.searchParams.get("subject"), `Website Inquiry: ${attribution.sourceTitle}`);
  assert.match(body, /Email: qa@example\.invalid/);
  assert.match(body, /Content Slug: hotel-smart-room-rcu-host-1/);
  assert.match(body, /attach project files manually/i);
  assert.doesNotMatch(body, /Company:/);
  assert.doesNotMatch(body, /WhatsApp \/ Phone:/);
  assert.doesNotMatch(body, /Estimated Quantity:/);
  assert.doesNotMatch(body, /Project Stage:/);
  assert.doesNotMatch(body, /Target Delivery Timing:/);
});

test("email drafts include only optional fields that were entered", () => {
  const body = new URL(
    buildInquiryEmailDraft(
      {
        ...validFields,
        company: "DualCoreLink QA",
        projectStage: "Sample evaluation",
      },
      attribution,
    ),
  ).searchParams.get("body") ?? "";

  assert.match(body, /Company: DualCoreLink QA/);
  assert.match(body, /Project Stage: Sample evaluation/);
  assert.doesNotMatch(body, /Estimated Quantity:/);
});

test("draft launch gate blocks a duplicate action and permits a manual retry", () => {
  const gate = createInquiryDraftLaunchGate();
  assert.equal(gate.tryStart(), true);
  assert.equal(gate.tryStart(), false);
  gate.release();
  assert.equal(gate.tryStart(), true);
});

test("draft analytics describe a handoff and retain the approved PII-safe keys", () => {
  const event = createInquiryEvent("email_draft_open", "email", attribution);
  assert.deepEqual(event, {
    event: "inquiry_email_draft_open",
    source_type: "product",
    source_slug: "hotel-smart-room-rcu-host-1",
    cta_location: "product_hero",
    category: "email",
    page_path: "/en/products/hotel-smart-room-rcu-host-1/",
  });
  assert.deepEqual(Object.keys(event).sort(), [
    "category",
    "cta_location",
    "event",
    "page_path",
    "source_slug",
    "source_type",
  ]);
  assert.equal(JSON.stringify(event).includes("Internal QA"), false);
  assert.equal(JSON.stringify(event).includes("qa@example.invalid"), false);
});

test("contact form exposes honest, recoverable draft and attachment semantics", async () => {
  const source = await readFile(
    path.join(process.cwd(), "src/components/contact/get-quote-form.tsx"),
    "utf8",
  );

  assert.match(source, /type="email" required/);
  assert.match(source, /name="company" className=/);
  assert.match(source, /name="phone" className=/);
  assert.match(source, /name="quantity"/);
  assert.match(source, /disabled=\{status === "preparing" \|\| status === "submitting"\}/);
  assert.match(source, /role="status"/);
  assert.match(source, /role="alert"/);
  assert.match(source, /Your entries are still here/);
  assert.match(source, /This website has not sent or delivered/);
  assert.match(source, /This website does not upload files/);
  assert.doesNotMatch(source, /name="projectFiles"/);
  assert.doesNotMatch(source, /trackInquiryEvent\("form_submit"/);
  assert.equal(source.match(/form\.reset\(\)/g)?.length, 1);
});

test("WhatsApp fallback uses HTTPS and encodes the message without form PII", () => {
  const url = new URL(createWhatsAppUrl("Hello DUALCORE LINK, B2B project review."));
  assert.equal(url.protocol, "https:");
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.searchParams.get("text"), "Hello DUALCORE LINK, B2B project review.");
  assert.equal(url.toString().includes("qa@example.invalid"), false);
});
