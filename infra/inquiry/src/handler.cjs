"use strict";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};
const MAX_BODY_BYTES = 16_384;
const MAX_FORM_AGE_MS = 86_400_000;
const SAFE_SOURCE_TYPES = new Set([
  "contact",
  "global",
  "product",
  "resource",
  "solution",
]);

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

function parseBody(event) {
  const encoded = event?.body ?? "";
  const raw = event?.isBase64Encoded
    ? Buffer.from(encoded, "base64").toString("utf8")
    : encoded;

  if (!raw || Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    throw new ValidationError("invalid_body");
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
      throw new Error("Payload must be an object");
    }
    return parsed;
  } catch {
    throw new ValidationError("invalid_json");
  }
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function validatePayload(payload, now, minimumCompletionMs) {
  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 254).toLowerCase();
  const country = cleanText(payload.country, 100);
  const customerType = cleanText(payload.customerType, 100);
  const message = cleanText(payload.message, 4_000);
  const productInterests = Array.isArray(payload.productInterests)
    ? payload.productInterests
        .filter((item) => typeof item === "string")
        .slice(0, 12)
        .map((item) => cleanText(item, 120))
        .filter(Boolean)
    : [];
  const formStartedAt = Number(payload.formStartedAt);
  const elapsed = now - formStartedAt;

  if (
    !name ||
    !email ||
    !country ||
    !customerType ||
    !message ||
    productInterests.length === 0 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new ValidationError("invalid_fields");
  }

  if (
    !Number.isFinite(formStartedAt) ||
    elapsed < minimumCompletionMs ||
    elapsed > MAX_FORM_AGE_MS
  ) {
    throw new ValidationError("invalid_completion_time");
  }

  const sourceType = cleanText(payload.attribution?.sourceType, 32);
  const sourceSlug = cleanText(payload.attribution?.sourceSlug, 160);
  const ctaLocation = cleanText(payload.attribution?.ctaLocation, 80);
  const category = cleanText(payload.attribution?.category, 80);
  const pagePath = cleanText(payload.attribution?.pagePath, 240);

  if (
    !SAFE_SOURCE_TYPES.has(sourceType) ||
    !/^[a-z0-9][a-z0-9-]{0,159}$/.test(sourceSlug) ||
    !/^[a-z0-9][a-z0-9_-]{0,79}$/.test(ctaLocation) ||
    !pagePath.startsWith("/en/")
  ) {
    throw new ValidationError("invalid_attribution");
  }

  return {
    name,
    email,
    country,
    customerType,
    productInterests,
    message,
    company: cleanText(payload.company, 160),
    phone: cleanText(payload.phone, 80),
    quantity: cleanText(payload.quantity, 80),
    projectStage: cleanText(payload.projectStage, 100),
    targetDelivery: cleanText(payload.targetDelivery, 100),
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
  const key = cleanText(value, 128);
  if (!/^[A-Za-z0-9._:-]{16,128}$/.test(key)) {
    throw new ValidationError("invalid_idempotency_key");
  }
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(key),
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
    `Source: ${payload.attribution.sourceType} / ${payload.attribution.sourceSlug}`,
    `CTA: ${payload.attribution.ctaLocation}`,
    `Page: ${payload.attribution.pagePath}`,
  );

  return {
    subject: `Website inquiry: ${payload.attribution.sourceSlug}`,
    text: lines.join("\n"),
  };
}

function safeLog(level, details) {
  const entry = {
    submissionId: details.submissionId,
    requestId: details.requestId,
    sourceType: details.sourceType || "unknown",
    sourceSlug: details.sourceSlug || "unknown",
    ctaLocation: details.ctaLocation || "unknown",
    status: details.status,
    durationMs: details.durationMs,
    errorCategory: details.errorCategory || "none",
  };
  console[level](JSON.stringify(entry));
}

class ValidationError extends Error {
  constructor(category) {
    super(category);
    this.name = "ValidationError";
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
        return response(405, { error: "method_not_allowed" }, origin, config.allowedOrigin);
      }
      if (!origin || origin !== config.allowedOrigin) {
        return response(403, { error: "origin_not_allowed" }, origin, config.allowedOrigin);
      }

      const payload = parseBody(event);
      if (cleanText(payload.website, 200)) {
        return response(202, { status: "accepted" }, origin, config.allowedOrigin);
      }

      const validated = validatePayload(payload, Date.now(), config.minimumCompletionMs);
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
          safeLog("info", {
            submissionId,
            requestId,
            ...attribution,
            status: "duplicate",
            durationMs: Date.now() - started,
          });
          return response(202, { status: "accepted" }, origin, config.allowedOrigin);
        }
        throw error;
      }

      if (config.dryRun) {
        await dependencies.setStatus(claimedKey, "dry_run");
        safeLog("info", {
          submissionId,
          requestId,
          ...attribution,
          status: "dry_run",
          durationMs: Date.now() - started,
        });
        return response(
          202,
          { submissionId, status: "dry_run" },
          origin,
          config.allowedOrigin,
        );
      }

      const mail = formatEmail(validated);
      await dependencies.send(mail);
      await dependencies.setStatus(claimedKey, "sent");
      safeLog("info", {
        submissionId,
        requestId,
        ...attribution,
        status: "sent",
        durationMs: Date.now() - started,
      });
      return response(
        202,
        { submissionId, status: "accepted" },
        origin,
        config.allowedOrigin,
      );
    } catch (error) {
      const errorCategory =
        error instanceof ValidationError ? error.category : "submission_failed";
      if (claimedKey) {
        await dependencies.setStatus(claimedKey, "failed", errorCategory).catch(() => {});
      }
      safeLog("error", {
        submissionId,
        requestId,
        ...attribution,
        status: "failed",
        durationMs: Date.now() - started,
        errorCategory,
      });
      const statusCode = error instanceof ValidationError ? 400 : 503;
      return response(
        statusCode,
        { error: statusCode === 400 ? errorCategory : "temporarily_unavailable" },
        origin,
        config.allowedOrigin,
      );
    }
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

      await ses.send(
        new SendEmailCommand({
          FromEmailAddress: from,
          Destination: { ToAddresses: [to] },
          Content: {
            Simple: {
              Subject: { Data: mail.subject, Charset: "UTF-8" },
              Body: { Text: { Data: mail.text, Charset: "UTF-8" } },
            },
          },
        }),
      );
    },
  };
}

let productionHandler;
exports.handler = async (event, context) => {
  productionHandler ||= createHandler(await createAwsDependencies());
  return productionHandler(event, context);
};
exports.createHandler = createHandler;
exports.formatEmail = formatEmail;
exports.validatePayload = validatePayload;
