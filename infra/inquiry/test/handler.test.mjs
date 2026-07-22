import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  buildSesMessageInput,
  createHandler,
  formatEmail,
} = require("../src/handler.cjs");

function createDependencies() {
  const claims = [];
  const statuses = [];
  const messages = [];
  return {
    claims,
    statuses,
    messages,
    dependency: {
      async claim(item) {
        claims.push(item);
      },
      isConditionalConflict(error) {
        return error?.name === "ConditionalCheckFailedException";
      },
      async setStatus(...args) {
        statuses.push(args);
      },
      async send(message) {
        messages.push(message);
      },
    },
  };
}

function validEvent(overrides = {}) {
  const body = {
    name: "Internal QA",
    email: "qa@example.invalid",
    country: "Singapore",
    customerType: "System Integrator",
    productInterests: ["RCU Room Control Host"],
    message: "Controlled dry-run inquiry payload.",
    formStartedAt: Date.now() - 5_000,
    website: "",
    attribution: {
      sourceType: "product",
      sourceSlug: "hotel-smart-room-rcu-host-1",
      ctaLocation: "product_hero",
      category: "form",
      pagePath: "/en/products/hotel-smart-room-rcu-host-1/",
    },
    ...overrides,
  };

  return {
    requestContext: { http: { method: "POST" } },
    headers: {
      origin: "https://dualcorelink.com",
      "content-type": "application/json",
      "x-idempotency-key": "controlled-test-key-0001",
    },
    body: JSON.stringify(body),
  };
}

function handlerFor(state, overrides = {}) {
  return createHandler(state.dependency, {
    allowedOrigin: "https://dualcorelink.com",
    dryRun: true,
    minimumCompletionMs: 3_000,
    ttlSeconds: 900,
    ...overrides,
  });
}

test("dry-run records only idempotency metadata and never calls SES", async () => {
  const state = createDependencies();
  const result = await handlerFor(state)(validEvent(), {
    awsRequestId: "test-request",
  });

  assert.equal(result.statusCode, 202);
  assert.equal(JSON.parse(result.body).status, "dry_run");
  assert.equal(state.claims.length, 1);
  assert.equal(state.claims[0].idempotencyKey.length, 64);
  assert.deepEqual(state.statuses, [[state.claims[0].idempotencyKey, "accepted"]]);
  assert.equal(state.messages.length, 0);
  assert.deepEqual(Object.keys(state.claims[0]).sort(), [
    "createdAt",
    "expiresAt",
    "idempotencyKey",
    "status",
    "submissionId",
  ]);
  assert.equal(state.claims[0].status, "processing");
});

test("real path sends UTF-8 mail with a validated Reply-To and marks accepted", async () => {
  const state = createDependencies();
  const result = await handlerFor(state, { dryRun: false })(validEvent());

  assert.equal(result.statusCode, 202);
  assert.equal(JSON.parse(result.body).status, "accepted");
  assert.equal(state.messages.length, 1);
  assert.equal(state.messages[0].replyTo, "qa@example.invalid");
  assert.deepEqual(state.statuses, [[state.claims[0].idempotencyKey, "accepted"]]);

  const input = buildSesMessageInput(
    state.messages[0],
    "sender@example.invalid",
    "recipient@example.invalid",
  );
  assert.deepEqual(input.ReplyToAddresses, ["qa@example.invalid"]);
  assert.equal(input.Content.Simple.Subject.Charset, "UTF-8");
  assert.equal(input.Content.Simple.Body.Text.Charset, "UTF-8");
  assert.equal("Attachments" in input, false);
});

test("rejects unapproved origins before parsing or persistence", async () => {
  const state = createDependencies();
  const event = validEvent();
  event.headers.origin = "https://example.invalid";
  const result = await handlerFor(state)(event);

  assert.equal(result.statusCode, 403);
  assert.equal(state.claims.length, 0);
  assert.equal(result.headers["access-control-allow-origin"], undefined);
});

test("rejects non-JSON content before persistence", async () => {
  const state = createDependencies();
  const event = validEvent();
  event.headers["content-type"] = "text/plain";
  const result = await handlerFor(state)(event);

  assert.equal(result.statusCode, 400);
  assert.equal(JSON.parse(result.body).error, "invalid_content_type");
  assert.equal(state.claims.length, 0);
});

test("rejects unknown top-level and attribution fields", async () => {
  const state = createDependencies();
  const topLevel = await handlerFor(state)(validEvent({ unexpected: "value" }));
  const nestedEvent = validEvent();
  const nested = JSON.parse(nestedEvent.body);
  nested.attribution.unexpected = "value";
  nestedEvent.body = JSON.stringify(nested);
  const attribution = await handlerFor(state)(nestedEvent);

  assert.equal(topLevel.statusCode, 400);
  assert.equal(JSON.parse(topLevel.body).error, "unknown_fields");
  assert.equal(attribution.statusCode, 400);
  assert.equal(JSON.parse(attribution.body).error, "invalid_attribution");
  assert.equal(state.claims.length, 0);
});

test("rejects invalid email and overlength fields instead of truncating", async () => {
  const state = createDependencies();
  const invalidEmail = await handlerFor(state)(validEvent({ email: "invalid" }));
  const longName = await handlerFor(state)(validEvent({ name: "x".repeat(121) }));

  assert.equal(invalidEmail.statusCode, 400);
  assert.equal(JSON.parse(invalidEmail.body).error, "invalid_email");
  assert.equal(longName.statusCode, 400);
  assert.equal(JSON.parse(longName.body).error, "invalid_name");
});

test("rejects request bodies over the byte limit with 413", async () => {
  const state = createDependencies();
  const event = validEvent();
  event.body = JSON.stringify({ message: "x".repeat(17_000) });
  const result = await handlerFor(state)(event);

  assert.equal(result.statusCode, 413);
  assert.equal(JSON.parse(result.body).error, "payload_too_large");
  assert.equal(state.claims.length, 0);
});

test("honeypot is accepted silently without persistence or sending", async () => {
  const state = createDependencies();
  const result = await handlerFor(state)(validEvent({ website: "spam" }));

  assert.equal(result.statusCode, 202);
  assert.equal(state.claims.length, 0);
  assert.equal(state.messages.length, 0);
});

test("minimum completion time blocks automated submissions", async () => {
  const state = createDependencies();
  const result = await handlerFor(state)(
    validEvent({ formStartedAt: Date.now() - 500 }),
  );

  assert.equal(result.statusCode, 400);
  assert.equal(JSON.parse(result.body).error, "invalid_completion_time");
  assert.equal(state.claims.length, 0);
});

test("invalid idempotency keys are rejected before persistence", async () => {
  const state = createDependencies();
  const event = validEvent();
  event.headers["x-idempotency-key"] = "short";
  const result = await handlerFor(state)(event);

  assert.equal(result.statusCode, 400);
  assert.equal(JSON.parse(result.body).error, "invalid_idempotency_key");
  assert.equal(state.claims.length, 0);
});

test("conditional idempotency conflicts return 409 without sending", async () => {
  const state = createDependencies();
  state.dependency.claim = async () => {
    const error = new Error("conflict");
    error.name = "ConditionalCheckFailedException";
    throw error;
  };
  const result = await handlerFor(state, { dryRun: false })(validEvent());

  assert.equal(result.statusCode, 409);
  assert.deepEqual(JSON.parse(result.body), { error: "duplicate_submission" });
  assert.equal(state.messages.length, 0);
});

test("DynamoDB claim failures return 500 and do not call SES", async () => {
  const state = createDependencies();
  state.dependency.claim = async () => {
    throw new Error("database unavailable");
  };
  const result = await handlerFor(state, { dryRun: false })(validEvent());

  assert.equal(result.statusCode, 500);
  assert.equal(JSON.parse(result.body).error, "persistence_unavailable");
  assert.equal(state.messages.length, 0);
});

test("dry-run status persistence failures return 500 without SES", async () => {
  const state = createDependencies();
  state.dependency.setStatus = async () => {
    throw new Error("database unavailable");
  };
  const result = await handlerFor(state)(validEvent());

  assert.equal(result.statusCode, 500);
  assert.equal(JSON.parse(result.body).error, "persistence_unavailable");
  assert.equal(state.messages.length, 0);
});

test("SES failure returns 502 and records failed without request data", async () => {
  const state = createDependencies();
  state.dependency.send = async () => {
    throw new Error("SES unavailable");
  };
  const result = await handlerFor(state, { dryRun: false })(validEvent());

  assert.equal(result.statusCode, 502);
  assert.equal(JSON.parse(result.body).error, "delivery_unavailable");
  assert.deepEqual(state.statuses, [
    [state.claims[0].idempotencyKey, "failed", "delivery_unavailable"],
  ]);
});

test("rejects CRLF injection in header-derived fields", async () => {
  const state = createDependencies();
  const email = await handlerFor(state)(
    validEvent({ email: "qa@example.invalid\r\nBcc:test@example.invalid" }),
  );
  const event = validEvent();
  const body = JSON.parse(event.body);
  body.attribution.sourceSlug = "safe-slug\r\nBcc-test";
  event.body = JSON.stringify(body);
  const slug = await handlerFor(state)(event);

  assert.equal(email.statusCode, 400);
  assert.equal(JSON.parse(email.body).error, "header_injection");
  assert.equal(slug.statusCode, 400);
  assert.equal(JSON.parse(slug.body).error, "header_injection");
});

test("mail rendering omits empty optional fields and cannot inject headers", () => {
  const payload = JSON.parse(validEvent().body);
  const message = formatEmail({
    ...payload,
    company: "",
    phone: "",
    quantity: "",
    projectStage: "",
    targetDelivery: "",
  });

  assert.match(message.text, /Email: qa@example\.invalid/);
  assert.doesNotMatch(message.text, /Company:/);
  assert.doesNotMatch(message.text, /WhatsApp \/ Phone:/);
  assert.doesNotMatch(message.subject, /[\r\n]/);
  assert.throws(() =>
    buildSesMessageInput(
      { ...message, replyTo: "qa@example.invalid\r\nBcc:test@example.invalid" },
      "sender@example.invalid",
      "recipient@example.invalid",
    ),
  );
});

test("structured logs contain only the approved metadata fields", async () => {
  const state = createDependencies();
  const originalInfo = console.info;
  const entries = [];
  console.info = (value) => entries.push(JSON.parse(value));
  try {
    await handlerFor(state)(validEvent(), { awsRequestId: "redaction-request" });
  } finally {
    console.info = originalInfo;
  }

  assert.equal(entries.length, 1);
  assert.deepEqual(Object.keys(entries[0]).sort(), [
    "ctaLocation",
    "durationMs",
    "errorCategory",
    "requestId",
    "sourceSlug",
    "sourceType",
    "status",
    "submissionId",
  ]);
  const serialized = JSON.stringify(entries[0]);
  assert.doesNotMatch(serialized, /qa@example\.invalid|Internal QA|Controlled dry-run/);
});
