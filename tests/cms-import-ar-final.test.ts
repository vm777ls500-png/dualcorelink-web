import assert from "node:assert/strict";
import test from "node:test";
import {
  arFinalCmsApprovedIdentities,
  arFinalReviewedCmsImportPayload,
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
    arFinalReviewedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
}

function expectFailure(value: ImportPayloadRecord[], pattern: RegExp): void {
  const repository = buildSourceRepository(value);
  assert.throws(
    () =>
      preflight(value, repository, {
        locale: "ar",
        batch: "remaining-final",
      }),
    (error: unknown) =>
      error instanceof ImportFailure && pattern.test(error.message),
  );
}

test("final Arabic exact 42-record payload passes read-only preflight", () => {
  const value = payload();
  const repository = buildSourceRepository(value);
  const before = canonicalJson(repository);
  const result = preflight(value, repository, {
    locale: "ar",
    batch: "remaining-final",
  });

  assert.equal(result.mapped.length, 42);
  assert.equal(value.filter((record) => record.contentType === "product").length, 36);
  assert.equal(value.filter((record) => record.contentType === "solution").length, 6);
  assert.equal(canonicalJson(repository), before);
  assert.deepEqual(
    new Set(result.mapped.map((record) => record.sourceId)),
    new Set(arFinalCmsApprovedIdentities.map((identity) => identity.sourceId)),
  );
});

test("final Arabic batch rejects fewer, extra, and duplicate records", () => {
  const fewer = payload();
  fewer.pop();
  expectFailure(fewer, /exactly 42|whitelist mismatch/);

  const extra = payload();
  extra.push(structuredClone(extra[0]));
  expectFailure(extra, /exactly 42|duplicate source ID/);

  const duplicate = payload();
  duplicate[1] = structuredClone(duplicate[0]);
  expectFailure(duplicate, /duplicate source ID|whitelist mismatch/);
});

test("final Arabic batch rejects identity and priority drift", () => {
  const cases: Array<(record: ImportPayloadRecord) => void> = [
    (record) => { record.localizedSlug = "wrong-slug"; },
    (record) => { record.sourceEnglishContentId = 999999; },
    (record) => { record.contentType = record.contentType === "product" ? "solution" : "product"; },
    (record) => { record.priority = record.priority === "P0" ? "P1" : "P0"; },
  ];
  for (const mutate of cases) {
    const value = payload();
    mutate(value[0]);
    expectFailure(value, /unapproved identity|whitelist mismatch|priority whitelist mismatch/);
  }
});

test("final Arabic batch rejects review evidence and release readiness drift", () => {
  const cases: Array<(record: ImportPayloadRecord) => void> = [
    (record) => { record.nativeReviewStatus = "pending"; },
    (record) => { record.nativeReviewer = "Unknown"; },
    (record) => { record.nativeReviewDate = "2026-08-10"; },
    (record) => { record.productionReleaseReady = false; },
    (record) => { record.locale = "zh"; },
    (record) => { record.batch = "p0"; },
  ];
  for (const mutate of cases) {
    const value = payload();
    mutate(value[0]);
    expectFailure(value, /native review evidence mismatch|release evidence mismatch|unapproved identity/i);
  }
});
