import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  createInquirySubmissionPayload,
  InquirySubmissionError,
  inquiryEndpointPath,
  isServerInquirySubmissionEnabled,
  submitInquiry,
} from "../src/lib/inquiry/submission";
import { createInquiryEvent } from "../src/lib/inquiry/events";

const fields = {
  name: "Internal QA",
  email: "qa@example.invalid",
  country: "Singapore",
  customerType: "System Integrator",
  productInterests: ["RCU Room Control Host"],
  message: "Synthetic integration test.",
};
const attribution = {
  sourcePage: "/en/products/hotel-smart-room-rcu-host-1/",
  contentType: "product" as const,
  contentSlug: "hotel-smart-room-rcu-host-1",
  sourceTitle: "Hotel Smart Room RCU Host 1",
  ctaPosition: "product_hero",
};
const payload = createInquirySubmissionPayload(fields, attribution, 1_000);

function response(status: number, body: object) {
  return Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    }),
  );
}

test("server submission feature flag is closed by default and requires the same-origin path", () => {
  assert.equal(isServerInquirySubmissionEnabled(undefined, undefined), false);
  assert.equal(isServerInquirySubmissionEnabled("false", inquiryEndpointPath), false);
  assert.equal(isServerInquirySubmissionEnabled("true", undefined), false);
  assert.equal(
    isServerInquirySubmissionEnabled("true", "https://example.invalid/api/inquiry"),
    false,
  );
  assert.equal(isServerInquirySubmissionEnabled("true", inquiryEndpointPath), true);
});

test("Contact copy describes server submission while retaining the email fallback", async () => {
  const contactPage = await readFile(
    path.join(
      process.cwd(),
      "src",
      "app",
      "[locale]",
      "contact",
      "page.tsx",
    ),
    "utf8",
  );

  assert.match(contactPage, /Submit inquiry details securely/);
  assert.match(contactPage, /If delivery is unavailable/);
  assert.match(contactPage, /mailto:/);
  assert.doesNotMatch(contactPage, /Until backend email delivery/);
});

test("payload maps attribution without source title or other analytics PII", () => {
  assert.deepEqual(payload.attribution, {
    sourceType: "product",
    sourceSlug: "hotel-smart-room-rcu-host-1",
    ctaLocation: "product_hero",
    category: "form",
    pagePath: "/en/products/hotel-smart-room-rcu-host-1/",
  });
  assert.equal(JSON.stringify(payload).includes("Hotel Smart Room RCU Host 1"), false);
});

test("202 is the only accepted response and preserves accepted semantics", async () => {
  const fetchImpl: typeof fetch = async () =>
    response(202, { submissionId: "submission-1", status: "accepted" });
  assert.deepEqual(
    await submitInquiry(payload, "controlled-test-key-0001", { fetchImpl }),
    { submissionId: "submission-1", status: "accepted" },
  );
});

for (const [status, category] of [
  [400, "invalid_request"],
  [403, "origin_rejected"],
  [409, "duplicate"],
  [413, "payload_too_large"],
  [429, "rate_limited"],
  [500, "server_error"],
  [502, "delivery_unavailable"],
] as const) {
  test(`HTTP ${status} maps to ${category}`, async () => {
    const fetchImpl: typeof fetch = async () => response(status, { error: category });
    await assert.rejects(
      submitInquiry(payload, "controlled-test-key-0001", { fetchImpl }),
      (error) =>
        error instanceof InquirySubmissionError &&
        error.category === category &&
        error.status === status,
    );
  });
}

test("timeout aborts the request and reports a recoverable category", async () => {
  const fetchImpl: typeof fetch = async (_input, init) =>
    new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () =>
        reject(new DOMException("aborted", "AbortError")),
      );
    });
  await assert.rejects(
    submitInquiry(payload, "controlled-test-key-0001", {
      fetchImpl,
      timeoutMs: 5,
    }),
    (error) =>
      error instanceof InquirySubmissionError && error.category === "timeout",
  );
});

test("unexpected 202 bodies and non-approved endpoints fail closed", async () => {
  const fetchImpl: typeof fetch = async () => response(202, { status: "accepted" });
  await assert.rejects(
    submitInquiry(payload, "controlled-test-key-0001", { fetchImpl }),
    (error) =>
      error instanceof InquirySubmissionError &&
      error.category === "unexpected_response",
  );
  await assert.rejects(
    submitInquiry(payload, "controlled-test-key-0001", {
      endpoint: "https://example.invalid/api/inquiry",
      fetchImpl,
    }),
  );
});

test("submission analytics include only approved fields and failure category", () => {
  const attempt = createInquiryEvent(
    "form_submit_attempt",
    "form",
    attribution,
  );
  const success = createInquiryEvent(
    "form_submit_success",
    "form",
    attribution,
  );
  const failure = createInquiryEvent(
    "form_submit_failure",
    "form",
    attribution,
    "/en/contact/",
    "timeout",
  );

  assert.equal(attempt.event, "inquiry_form_submit_attempt");
  assert.equal(success.event, "inquiry_form_submit_success");
  assert.equal(failure.event, "inquiry_form_submit_failure");
  assert.equal(failure.error_category, "timeout");
  assert.deepEqual(Object.keys(failure).sort(), [
    "category",
    "cta_location",
    "error_category",
    "event",
    "page_path",
    "source_slug",
    "source_type",
  ]);
  const serialized = JSON.stringify([attempt, success, failure]);
  assert.doesNotMatch(serialized, /Internal QA|qa@example\.invalid|Hotel Smart Room RCU Host 1/);
});

test("Contact integration retains fields on failure and resets only after accepted response", async () => {
  const source = await readFile(
    path.join(process.cwd(), "src/components/contact/get-quote-form.tsx"),
    "utf8",
  );
  const awaitIndex = source.indexOf("await submitInquiry");
  const resetIndex = source.indexOf("form.reset()");
  const catchIndex = source.indexOf("} catch (error)", awaitIndex);

  assert.ok(awaitIndex >= 0 && resetIndex > awaitIndex && catchIndex > resetIndex);
  assert.equal(source.match(/form\.reset\(\)/g)?.length, 1);
  assert.match(source, /createInquiryDraftLaunchGate/);
  assert.match(source, /idempotencyKey\.current \?\?= crypto\.randomUUID\(\)/);
  assert.match(source, /idempotencyKey\.current = undefined/);
  assert.match(source, /buildInquiryEmailDraft/);
  assert.match(source, /form_email_fallback/);
  assert.match(source, /form_whatsapp_fallback/);
  assert.match(source, /Your entries are still here/);
  assert.match(source, /serverSubmissionEnabled/);
});

test("production Nginx inquiry route is exact, POST-only, bounded, and included", async () => {
  const template = await readFile(
    path.join(process.cwd(), "deploy/nginx/inquiry-api.location.conf.template"),
    "utf8",
  );
  const productionTemplate = await readFile(
    path.join(process.cwd(), "deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );

  assert.match(template, /location = \/api\/inquiry/);
  assert.match(
    template,
    /if \(\$request_method != POST\) \{\s*return 404;\s*\}/,
  );
  assert.doesNotMatch(template, /limit_except/);
  assert.match(template, /client_max_body_size 16k/);
  assert.match(template, /proxy_(?:connect|send|read)_timeout/);
  assert.match(template, /proxy_pass_request_headers off/);
  assert.match(template, /Cache-Control "no-store" always/);
  assert.doesNotMatch(template, /access_log.*request_body|proxy_cache\s+on/);
  assert.match(
    productionTemplate,
    /include \/etc\/nginx\/snippets\/dualcorelink-inquiry-api\.conf;/,
  );
});
