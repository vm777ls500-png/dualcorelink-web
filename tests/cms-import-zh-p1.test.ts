import assert from "node:assert/strict";
import test from "node:test";
import {
  zhP1CmsApprovedIdentities,
  zhP1ReviewedCmsImportPayload,
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
    zhP1ReviewedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
}

function expectPreflightFailure(
  value: ImportPayloadRecord[],
  pattern: RegExp,
): void {
  const repository = buildSourceRepository(value);
  assert.throws(
    () => preflight(value, repository, { locale: "zh", batch: "p1" }),
    (error: unknown) =>
      error instanceof ImportFailure && pattern.test(error.message),
  );
}

test("Chinese P1 exact 17/17 payload passes read-only preflight", () => {
  const value = payload();
  const repository = buildSourceRepository(value);
  const before = canonicalJson(repository);
  const result = preflight(value, repository, { locale: "zh", batch: "p1" });
  assert.equal(result.mapped.length, 17);
  assert.equal(value.filter((record) => record.contentType === "product").length, 15);
  assert.equal(value.filter((record) => record.contentType === "solution").length, 2);
  assert.equal(canonicalJson(repository), before);
  assert.deepEqual(
    new Set(result.mapped.map((record) => record.sourceId)),
    new Set(zhP1CmsApprovedIdentities.map((identity) => identity.sourceId)),
  );
});

test("Chinese P1 rejects fewer, extra, and duplicate records", () => {
  const fewer = payload();
  fewer.pop();
  expectPreflightFailure(fewer, /exactly 17|whitelist mismatch/);

  const extra = payload();
  extra.push(structuredClone(extra[0]));
  expectPreflightFailure(extra, /exactly 17|duplicate source ID/);

  const duplicate = payload();
  duplicate[1] = structuredClone(duplicate[0]);
  expectPreflightFailure(duplicate, /duplicate source ID|whitelist mismatch/);
});

test("Chinese P1 rejects wrong slug, source ID, or post type", () => {
  const wrongSlug = payload();
  wrongSlug[0].localizedSlug = "wrong-slug";
  expectPreflightFailure(wrongSlug, /unapproved identity/);

  const wrongSource = payload();
  wrongSource[0].sourceEnglishContentId = 48;
  expectPreflightFailure(wrongSource, /unapproved identity|whitelist mismatch/);

  const wrongType = payload();
  wrongType[0].contentType = "solution";
  expectPreflightFailure(wrongType, /unapproved identity/);
});

test("Chinese P1 rejects P0, P2, and other locale evidence", () => {
  const p0 = payload();
  p0[0].batch = "p0";
  expectPreflightFailure(p0, /release evidence mismatch/);

  const p2 = payload();
  p2[0].batch = "p2";
  expectPreflightFailure(p2, /release evidence mismatch/);

  const otherLocale = payload();
  otherLocale[0].locale = "de";
  expectPreflightFailure(otherLocale, /release evidence mismatch/);
});

test("Chinese P1 rejects reviewer/date and release readiness drift", () => {
  const reviewer = payload();
  reviewer[0].nativeReviewer = "Unknown";
  expectPreflightFailure(reviewer, /native review evidence mismatch/);

  const date = payload();
  date[0].nativeReviewDate = "2026-08-01";
  expectPreflightFailure(date, /native review evidence mismatch/);

  const readiness = payload();
  readiness[0].productionReleaseReady = false;
  expectPreflightFailure(readiness, /release evidence mismatch/);
});

test("Chinese P1 cannot be admitted through owner waiver", () => {
  const value = payload();
  const repository = buildSourceRepository(value);
  assert.throws(
    () =>
      preflight(value, repository, {
        locale: "zh",
        batch: "p1",
        allowOwnerWaiver: true,
      }),
    /whitelist mismatch/,
  );
});
