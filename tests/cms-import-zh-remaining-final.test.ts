import assert from "node:assert/strict";
import test from "node:test";
import {
  zhRemainingFinalCmsApprovedIdentities,
  zhRemainingFinalReviewedCmsImportPayload,
} from "../src/content/locales/cms-import";
import { buildSourceRepository } from "../scripts/cms-import/fixture";
import {
  ImportFailure,
  canonicalJson,
  preflight,
  type ImportPayloadRecord,
} from "../scripts/cms-import/model";

function payload(): ImportPayloadRecord[] {
  return structuredClone(
    zhRemainingFinalReviewedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
}

function expectFailure(value: ImportPayloadRecord[], pattern: RegExp): void {
  const repository = buildSourceRepository(value);
  assert.throws(
    () =>
      preflight(value, repository, {
        locale: "zh",
        batch: "remaining-final",
      }),
    (error: unknown) =>
      error instanceof ImportFailure && pattern.test(error.message),
  );
}

test("final Chinese exact 18/18 payload passes read-only preflight", () => {
  const value = payload();
  const repository = buildSourceRepository(value);
  const before = canonicalJson(repository);
  const result = preflight(value, repository, {
    locale: "zh",
    batch: "remaining-final",
  });
  assert.equal(result.mapped.length, 18);
  assert.equal(value.filter((record) => record.contentType === "product").length, 17);
  assert.equal(value.filter((record) => record.contentType === "solution").length, 1);
  assert.equal(value.filter((record) => record.priority === "P2").length, 17);
  assert.equal(value.filter((record) => record.priority === "P0").length, 1);
  assert.equal(canonicalJson(repository), before);
  assert.deepEqual(
    new Set(result.mapped.map((record) => record.sourceId)),
    new Set(
      zhRemainingFinalCmsApprovedIdentities.map((identity) => identity.sourceId),
    ),
  );
});

test("final Chinese batch rejects fewer, extra, and duplicate records", () => {
  const fewer = payload();
  fewer.pop();
  expectFailure(fewer, /exactly 18|whitelist mismatch/);

  const extra = payload();
  extra.push(structuredClone(extra[0]));
  expectFailure(extra, /exactly 18|duplicate source ID/);

  const duplicate = payload();
  duplicate[1] = structuredClone(duplicate[0]);
  expectFailure(duplicate, /duplicate source ID|whitelist mismatch/);
});

test("final Chinese batch rejects identity and priority drift", () => {
  const cases: Array<[string, (record: ImportPayloadRecord) => void]> = [
    ["slug", (record) => { record.localizedSlug = "wrong-slug"; }],
    ["source", (record) => { record.sourceEnglishContentId = 48; }],
    ["type", (record) => { record.contentType = "solution"; }],
    ["priority", (record) => { record.priority = "P0"; }],
  ];
  for (const [, mutate] of cases) {
    const value = payload();
    mutate(value[0]);
    expectFailure(value, /unapproved identity|whitelist mismatch|priority whitelist mismatch/);
  }
});

test("final Chinese batch rejects other batches, locales, and owner waiver", () => {
  for (const mutate of [
    (record: ImportPayloadRecord) => { record.batch = "p0"; },
    (record: ImportPayloadRecord) => { record.batch = "p1"; },
    (record: ImportPayloadRecord) => { record.locale = "ar"; },
  ]) {
    const value = payload();
    mutate(value[0]);
    expectFailure(value, /release evidence mismatch/);
  }
  const value = payload();
  assert.throws(
    () =>
      preflight(value, buildSourceRepository(value), {
        locale: "zh",
        batch: "remaining-final",
        allowOwnerWaiver: true,
      }),
    /whitelist mismatch/,
  );
});

test("final Chinese batch rejects reviewer, date, and readiness drift", () => {
  for (const mutate of [
    (record: ImportPayloadRecord) => { record.nativeReviewer = "Unknown"; },
    (record: ImportPayloadRecord) => { record.nativeReviewDate = "2026-08-02"; },
    (record: ImportPayloadRecord) => { record.productionReleaseReady = false; },
  ]) {
    const value = payload();
    mutate(value[0]);
    expectFailure(value, /native review evidence mismatch|release evidence mismatch/i);
  }
});
