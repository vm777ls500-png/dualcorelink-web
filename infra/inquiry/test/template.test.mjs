import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const template = (
  await readFile(path.join(root, "template.yaml"), "utf8")
).replace(/\r\n/g, "\n");

test("template keeps the approved resource names and parameterized dry-run mode", () => {
  assert.match(template, /FunctionName: dualcorelink-inquiry-submit/);
  assert.match(template, /Name: dualcorelink-inquiry-api/);
  assert.match(template, /TableName: dualcorelink-inquiry-idempotency/);
  assert.match(template, /Runtime: nodejs24\.x/);
  assert.match(
    template,
    /DryRunMode:\n\s+Type: String\n\s+Default: "true"\n\s+AllowedValues:\n\s+- "true"\n\s+- "false"/,
  );
  assert.match(template, /DRY_RUN: !Ref DryRunMode/);
  assert.doesNotMatch(template, /DRY_RUN:\s*["'](?:true|false)["']/);
  assert.match(template, /RouteKey: POST \/api\/inquiry/);
});

test("inline Lambda handler is valid JavaScript", () => {
  const startMarker = "          // BEGIN GENERATED HANDLER";
  const endMarker = "          // END GENERATED HANDLER";
  const start = template.indexOf(startMarker);
  const end = template.indexOf(endMarker);
  assert.ok(start >= 0 && end > start);

  const inlineHandler = template
    .slice(start, end + endMarker.length)
    .split(/\r?\n/)
    .map((line) => line.slice(10))
    .join("\n");

  assert.doesNotThrow(() => new Function(inlineHandler));
});

test("template has strict CORS, throttling, TTL, and retained state", () => {
  assert.match(template, /AllowOrigins:\n\s+- !Ref AllowedOrigin/);
  assert.doesNotMatch(template, /AllowOrigins:\n\s+- ["']?\*["']?/);
  assert.match(template, /ThrottlingBurstLimit: !Ref ApiThrottleBurst/);
  assert.match(template, /ThrottlingRateLimit: !Ref ApiThrottleRate/);
  assert.match(template, /TimeToLiveSpecification:[\s\S]*?Enabled: true/);
  assert.match(template, /DeletionPolicy: Retain/);
  assert.match(template, /RetentionInDays: !Ref LogRetentionDays/);
});

test("IAM policies contain no wildcard action or wildcard resource", () => {
  assert.doesNotMatch(template, /Action:\s*["']?\*["']?/);
  assert.doesNotMatch(template, /Resource:\s*["']?\*["']?/);
  assert.doesNotMatch(template, /dynamodb:(?:Scan|DeleteTable)/);
  assert.doesNotMatch(template, /s3:/);
  assert.doesNotMatch(template, /route53:/);
  assert.doesNotMatch(template, /iam:/);
});

test("API logs exclude body, authorization, and source IP", () => {
  const formatLine = template
    .split(/\r?\n/)
    .find((line) => line.includes("requestId") && line.includes("routeKey"));
  assert.ok(formatLine);
  assert.doesNotMatch(formatLine, /body|authorization|sourceIp/i);
});

test("parameter examples contain names but no mailbox or credential values", async () => {
  const example = await readFile(path.join(root, "parameters.example.json"), "utf8");
  assert.match(example, /"ParameterKey": "DryRunMode", "ParameterValue": "true"/);
  assert.match(example, /RecipientAddressParameterName/);
  assert.match(example, /SenderAddressParameterName/);
  assert.doesNotMatch(example, /@[A-Za-z0-9.-]+/);
  assert.doesNotMatch(example, /access[_-]?key|secret[_-]?key|credential/i);
});
