"use strict";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};
const MAX_BODY_BYTES = 16_384;
const MAX_FORM_AGE_MS = 86_400_000;
const TOP_LEVEL_FIELDS = new Set([
  "name",
  "company",
  "email",
  "phone",
  "country",
  "customerType",
  "projectStage",
  "productInterests",
  "quantity",
  "targetDelivery",
  "message",
  "formStartedAt",
  "website",
  "attribution",
]);
const ATTRIBUTION_FIELDS = new Set([
  "sourceType",
  "sourceSlug",
  "ctaLocation",
  "category",
  "pagePath",
]);
const SAFE_SOURCE_TYPES = new Set([
  "contact",
  "global",
  "product",
  "region",
  "resource",
  "site",
  "solution",
]);
const SOURCE_TYPES_REQUIRING_SLUG = new Set([
  "product",
  "region",
  "resource",
  "solution",
]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f]/;

function normalizeHeaders(headers = {}) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
  );
}

function response(statusCode, body, origin, allowedOrigin) {
  const headers = { ...JSON_HEADERS };
  if (origin === allowedOrigin) {
    headers["access-control-allow-origin"] = allowedOrigin;
    headers.vary = "Origin";
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

function assertKnownFields(value, knownFields, category) {
  if (
    !value ||
    Array.isArray(value) ||
    typeof value !== "object" ||
    Object.keys(value).some((key) => !knownFields.has(key))
  ) {
    throw new RequestError(400, category);
  }
}

function parseBody(event) {
  const encoded = event?.body ?? "";
  const raw = event?.isBase64Encoded
    ? Buffer.from(encoded, "base64").toString("utf8")
    : encoded;

  if (!raw) throw new RequestError(400, "invalid_body");
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    throw new RequestError(413, "payload_too_large");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new RequestError(400, "invalid_json");
  }
  assertKnownFields(parsed, TOP_LEVEL_FIELDS, "unknown_fields");
  return parsed;
}

function readText(value, field, maxLength, options = {}) {
  const { required = false, multiline = false } = options;
  if (value === undefined && !required) return "";
  if (typeof value !== "string") {
    throw new RequestError(400, `invalid_${field}`);
  }
  const cleaned = value.trim();
  if ((required && !cleaned) || cleaned.length > maxLength) {
    throw new RequestError(400, `invalid_${field}`);
  }
  if (!multiline && CONTROL_CHARACTER_PATTERN.test(cleaned)) {
    throw new RequestError(400, "header_injection");
  }
  if (multiline && /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(cleaned)) {
    throw new RequestError(400, `invalid_${field}`);
  }
  return cleaned;
}

function validatePayload(payload, now, minimumCompletionMs) {
  const website = readText(payload.website, "website", 200);
  if (website) return { honeypot: true };

  const name = readText(payload.name, "name", 120, { required: true });
  const email = readText(payload.email, "email", 254, { required: true }).toLowerCase();
  const country = readText(payload.country, "country", 100, { required: true });
  const customerType = readText(payload.customerType, "customer_type", 100, {
    required: true,
  });
  const message = readText(payload.message, "message", 4_000, {
    required: true,
    multiline: true,
  });

  if (!EMAIL_PATTERN.test(email)) {
    throw new RequestError(400, "invalid_email");
  }
  if (
    !Array.isArray(payload.productInterests) ||
    payload.productInterests.length === 0 ||
    payload.productInterests.length > 12
  ) {
    throw new RequestError(400, "invalid_product_interests");
  }
  const productInterests = payload.productInterests.map((value) =>
    readText(value, "product_interest", 120, { required: true }),
  );

  const formStartedAt = Number(payload.formStartedAt);
  const elapsed = now - formStartedAt;
  if (
    !Number.isFinite(formStartedAt) ||
    elapsed < minimumCompletionMs ||
    elapsed > MAX_FORM_AGE_MS
  ) {
    throw new RequestError(400, "invalid_completion_time");
  }

  assertKnownFields(payload.attribution, ATTRIBUTION_FIELDS, "invalid_attribution");
  const sourceType = readText(
    payload.attribution.sourceType,
    "source_type",
    32,
    { required: true },
  );
  const sourceSlug = readText(payload.attribution.sourceSlug, "source_slug", 160);
  const ctaLocation = readText(
    payload.attribution.ctaLocation,
    "cta_location",
    80,
    { required: true },
  );
  const category = readText(payload.attribution.category, "category", 80);
  const pagePath = readText(payload.attribution.pagePath, "page_path", 240, {
    required: true,
  });

  if (
    !SAFE_SOURCE_TYPES.has(sourceType) ||
    (sourceSlug && !/^[a-z0-9][a-z0-9-]{0,159}$/.test(sourceSlug)) ||
    (SOURCE_TYPES_REQUIRING_SLUG.has(sourceType) && !sourceSlug) ||
    !/^[a-z0-9][a-z0-9_-]{0,79}$/.test(ctaLocation) ||
    (category && !/^[a-z0-9][a-z0-9_-]{0,79}$/.test(category)) ||
    !/^\/en(?:\/|$)/.test(pagePath) ||
    /[?#]/.test(pagePath)
  ) {
    throw new RequestError(400, "invalid_attribution");
  }

  return {
    honeypot: false,
    name,
    email,
    country,
    customerType,
    productInterests,
    message,
    company: readText(payload.company, "company", 160),
    phone: readText(payload.phone, "phone", 80),
    quantity: readText(payload.quantity, "quantity", 80),
    projectStage: readText(payload.projectStage, "project_stage", 100),
    targetDelivery: readText(payload.targetDelivery, "target_delivery", 100),
    attribution: {
      sourceType,
      sourceSlug,
      ctaLocation,
      category,
      pagePath,
    },
  };
}

async function validateIdempotencyKey(value) {
  if (
    typeof value !== "string" ||
    value.length > 128 ||
    !/^[A-Za-z0-9._:-]{16,128}$/.test(value)
  ) {
    throw new RequestError(400, "invalid_idempotency_key");
  }
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Buffer.from(digest).toString("hex");
}

function formatEmail(payload) {
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Country: ${payload.country}`,
    `Customer Type: ${payload.customerType}`,
    `Product Interests: ${payload.productInterests.join(", ")}`,
  ];
  const optional = [
    ["Company", payload.company],
    ["WhatsApp / Phone", payload.phone],
    ["Estimated Quantity", payload.quantity],
    ["Project Stage", payload.projectStage],
    ["Target Delivery Timing", payload.targetDelivery],
  ];

  for (const [label, value] of optional) {
    if (value) lines.push(`${label}: ${value}`);
  }

  lines.push(
    "",
    "Project Requirements:",
    payload.message,
    "",
    `Source: ${payload.attribution.sourceType} / ${payload.attribution.sourceSlug || "direct"}`,
    `CTA: ${payload.attribution.ctaLocation}`,
    `Page: ${payload.attribution.pagePath}`,
  );

  return {
    subject: payload.attribution.sourceSlug
      ? `Website inquiry: ${payload.attribution.sourceSlug}`
      : "Website inquiry: direct contact",
    text: lines.join("\n"),
    replyTo: payload.email,
  };
}

function safeLog(level, details) {
  const entry = {
    submissionId: details.submissionId,
    requestId: details.requestId,
    status: details.status,
    durationMs: details.durationMs,
    errorCategory: details.errorCategory || "none",
    sourceType: details.sourceType || "unknown",
    sourceSlug: details.sourceSlug || "unknown",
    ctaLocation: details.ctaLocation || "unknown",
  };
  console[level](JSON.stringify(entry));
}

class RequestError extends Error {
  constructor(statusCode, category) {
    super(category);
    this.name = "RequestError";
    this.statusCode = statusCode;
    this.category = category;
  }
}

class ServiceError extends Error {
  constructor(statusCode, category) {
    super(category);
    this.name = "ServiceError";
    this.statusCode = statusCode;
    this.category = category;
  }
}

function createHandler(dependencies, overrides = {}) {
  const config = {
    allowedOrigin: overrides.allowedOrigin ?? process.env.ALLOWED_ORIGIN,
    dryRun: overrides.dryRun ?? process.env.DRY_RUN === "true",
    minimumCompletionMs: Number(
      overrides.minimumCompletionMs ?? process.env.MINIMUM_COMPLETION_MS ?? 3_000,
    ),
    ttlSeconds: Number(
      overrides.ttlSeconds ?? process.env.IDEMPOTENCY_TTL_SECONDS ?? 900,
    ),
  };

  return async function inquiryHandler(event, context = {}) {
    const started = Date.now();
    const submissionId = crypto.randomUUID();
    const requestId = context.awsRequestId || "local-request";
    const headers = normalizeHeaders(event?.headers);
    const origin = headers.origin || "";
    let attribution = {};
    let claimedKey = "";

    try {
      if (event?.requestContext?.http?.method !== "POST") {
        throw new RequestError(405, "method_not_allowed");
      }
      if (!origin || origin !== config.allowedOrigin) {
        throw new RequestError(403, "origin_not_allowed");
      }
      if (!String(headers["content-type"] || "").toLowerCase().startsWith("application/json")) {
        throw new RequestError(400, "invalid_content_type");
      }

      const payload = parseBody(event);
      const validated = validatePayload(payload, Date.now(), config.minimumCompletionMs);
      if (validated.honeypot) {
        safeLog("info", {
          submissionId,
          requestId,
          status: "accepted",
          durationMs: Date.now() - started,
          errorCategory: "honeypot",
        });
        return response(202, { status: "accepted" }, origin, config.allowedOrigin);
      }

      attribution = validated.attribution;
      claimedKey = await validateIdempotencyKey(headers["x-idempotency-key"]);
      const nowSeconds = Math.floor(Date.now() / 1_000);

      try {
        await dependencies.claim({
          idempotencyKey: claimedKey,
          submissionId,
          status: "processing",
          createdAt: new Date().toISOString(),
          expiresAt: nowSeconds + config.ttlSeconds,
        });
      } catch (error) {
        if (dependencies.isConditionalConflict(error)) {
          throw new RequestError(409, "duplicate_submission");
        }
        throw new ServiceError(500, "persistence_unavailable");
      }

      if (config.dryRun) {
        try {
          await dependencies.setStatus(claimedKey, "accepted");
        } catch {
          throw new ServiceError(500, "persistence_unavailable");
        }
        safeLog("info", {
          submissionId,
          requestId,
          ...attribution,
          status: "accepted",
          durationMs: Date.now() - started,
          errorCategory: "dry_run",
        });
        return response(
          202,
          { submissionId, status: "dry_run" },
          origin,
          config.allowedOrigin,
        );
      }

      const mail = formatEmail(validated);
      try {
        await dependencies.send(mail);
      } catch {
        await dependencies
          .setStatus(claimedKey, "failed", "delivery_unavailable")
          .catch(() => {});
        throw new ServiceError(502, "delivery_unavailable");
      }

      let statusUpdateFailed = false;
      try {
        await dependencies.setStatus(claimedKey, "accepted");
      } catch {
        statusUpdateFailed = true;
      }
      safeLog("info", {
        submissionId,
        requestId,
        ...attribution,
        status: "accepted",
        durationMs: Date.now() - started,
        errorCategory: statusUpdateFailed ? "persistence_update_failed" : "none",
      });
      return response(
        202,
        { submissionId, status: "accepted" },
        origin,
        config.allowedOrigin,
      );
    } catch (error) {
      const knownError =
        error instanceof RequestError || error instanceof ServiceError
          ? error
          : new ServiceError(500, "submission_failed");
      safeLog("error", {
        submissionId,
        requestId,
        ...attribution,
        status: "failed",
        durationMs: Date.now() - started,
        errorCategory: knownError.category,
      });
      return response(
        knownError.statusCode,
        { error: knownError.category },
        origin,
        config.allowedOrigin,
      );
    }
  };
}

function buildSesMessageInput(mail, from, to) {
  if (
    !EMAIL_PATTERN.test(from) ||
    !EMAIL_PATTERN.test(to) ||
    !EMAIL_PATTERN.test(mail.replyTo) ||
    /[\r\n]/.test(mail.subject) ||
    /[\r\n]/.test(mail.replyTo)
  ) {
    throw new Error("mail_configuration_unavailable");
  }
  return {
    FromEmailAddress: from,
    Destination: { ToAddresses: [to] },
    ReplyToAddresses: [mail.replyTo],
    Content: {
      Simple: {
        Subject: { Data: mail.subject, Charset: "UTF-8" },
        Body: { Text: { Data: mail.text, Charset: "UTF-8" } },
      },
    },
  };
}

async function createAwsDependencies() {
  const {
    DynamoDBClient,
    PutItemCommand,
    UpdateItemCommand,
  } = await import("@aws-sdk/client-dynamodb");
  const { SSMClient, GetParametersCommand } = await import("@aws-sdk/client-ssm");
  const { SESv2Client, SendEmailCommand } = await import("@aws-sdk/client-sesv2");
  const dynamodb = new DynamoDBClient({});
  const ssm = new SSMClient({});
  const ses = new SESv2Client({});

  return {
    async claim(item) {
      await dynamodb.send(
        new PutItemCommand({
          TableName: process.env.IDEMPOTENCY_TABLE,
          ConditionExpression: "attribute_not_exists(idempotencyKey)",
          Item: {
            idempotencyKey: { S: item.idempotencyKey },
            submissionId: { S: item.submissionId },
            status: { S: item.status },
            createdAt: { S: item.createdAt },
            expiresAt: { N: String(item.expiresAt) },
          },
        }),
      );
    },
    isConditionalConflict(error) {
      return error?.name === "ConditionalCheckFailedException";
    },
    async setStatus(idempotencyKey, status, errorCategory) {
      const names = { "#status": "status" };
      const values = { ":status": { S: status } };
      let expression = "SET #status = :status";
      if (errorCategory) {
        names["#errorCategory"] = "errorCategory";
        values[":errorCategory"] = { S: errorCategory };
        expression += ", #errorCategory = :errorCategory";
      }
      await dynamodb.send(
        new UpdateItemCommand({
          TableName: process.env.IDEMPOTENCY_TABLE,
          Key: { idempotencyKey: { S: idempotencyKey } },
          UpdateExpression: expression,
          ExpressionAttributeNames: names,
          ExpressionAttributeValues: values,
        }),
      );
    },
    async send(mail) {
      const names = [
        process.env.SENDER_ADDRESS_PARAMETER,
        process.env.RECIPIENT_ADDRESS_PARAMETER,
      ];
      const result = await ssm.send(
        new GetParametersCommand({ Names: names, WithDecryption: true }),
      );
      const values = new Map(
        (result.Parameters || []).map((parameter) => [parameter.Name, parameter.Value]),
      );
      const from = values.get(process.env.SENDER_ADDRESS_PARAMETER);
      const to = values.get(process.env.RECIPIENT_ADDRESS_PARAMETER);
      if (!from || !to) throw new Error("mail_configuration_unavailable");

      await ses.send(new SendEmailCommand(buildSesMessageInput(mail, from, to)));
    },
  };
}

let productionHandler;
exports.handler = async (event, context) => {
  productionHandler ||= createHandler(await createAwsDependencies());
  return productionHandler(event, context);
};
exports.buildSesMessageInput = buildSesMessageInput;
exports.createHandler = createHandler;
exports.formatEmail = formatEmail;
exports.validatePayload = validatePayload;
