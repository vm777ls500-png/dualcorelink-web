import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createHandler, formatEmail } = require("../src/handler.cjs");

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
      category: "quote",
      pagePath: "/en/products/hotel-smart-room-rcu-host-1/",
    },
    ...overrides,
  };

  return {
    requestContext: { http: { method: "POST" } },
    headers: {
      origin: "https://dualcorelink.com",
      "x-idempotency-key": "controlled-test-key-0001",
    },
    body: JSON.stringify(body),
  };
}

test("dry-run validates and records metadata without sending email", async () => {
  const state = createDependencies();
  const handler = createHandler(state.dependency, {
    allowedOrigin: "https://dualcorelink.com",
    dryRun: true,
    minimumCompletionMs: 3_000,
    ttlSeconds: 900,
  });
  const result = await handler(validEvent(), { awsRequestId: "test-request" });

  assert.equal(result.statusCode, 202);
  assert.equal(JSON.parse(result.body).status, "dry_run");
  assert.equal(state.claims.length, 1);
  assert.equal(state.claims[0].idempotencyKey.length, 64);
  assert.deepEqual(state.statuses, [[state.claims[0].idempotencyKey, "dry_run"]]);
  assert.equal(state.messages.length, 0);
  assert.deepEqual(Object.keys(state.claims[0]).sort(), [
    "createdAt",
    "expiresAt",
    "idempotencyKey",
    "status",
    "submissionId",
  ]);
});

test("rejects unapproved origins before parsing or persistence", async () => {
  const state = createDependencies();
  const handler = createHandler(state.dependency, {
    allowedOrigin: "https://dualcorelink.com",
    dryRun: true,
  });
  const event = validEvent();
  event.headers.origin = "https://example.invalid";
  const result = await handler(event);

  assert.equal(result.statusCode, 403);
  assert.equal(state.claims.length, 0);
  assert.equal(result.headers["access-control-allow-origin"], undefined);
});

test("honeypot is accepted silently without persistence or sending", async () => {
  const state = createDependencies();
  const handler = createHandler(state.dependency, {
    allowedOrigin: "https://dualcorelink.com",
    dryRun: true,
  });
  const result = await handler(validEvent({ website: "spam" }));

  assert.equal(result.statusCode, 202);
  assert.equal(state.claims.length, 0);
  assert.equal(state.messages.length, 0);
});

test("minimum completion time blocks automated submissions", async () => {
  const state = createDependencies();
  const handler = createHandler(state.dependency, {
    allowedOrigin: "https://dualcorelink.com",
    dryRun: true,
    minimumCompletionMs: 3_000,
  });
  const result = await handler(validEvent({ formStartedAt: Date.now() - 500 }));

  assert.equal(result.statusCode, 400);
  assert.equal(JSON.parse(result.body).error, "invalid_completion_time");
  assert.equal(state.claims.length, 0);
});

test("duplicate idempotency claims return accepted without sending", async () => {
  const state = createDependencies();
  state.dependency.claim = async () => {
    const error = new Error("conflict");
    error.name = "ConditionalCheckFailedException";
    throw error;
  };
  const handler = createHandler(state.dependency, {
    allowedOrigin: "https://dualcorelink.com",
    dryRun: false,
  });
  const result = await handler(validEvent());

  assert.equal(result.statusCode, 202);
  assert.deepEqual(JSON.parse(result.body), { status: "accepted" });
  assert.equal(state.messages.length, 0);
});

test("email rendering omits empty optional fields", () => {
  const event = validEvent();
  const payload = JSON.parse(event.body);
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
});
