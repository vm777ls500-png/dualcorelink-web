import assert from "node:assert/strict";
import test from "node:test";
import {
  finalThreeCmsApprovedIdentities,
  finalThreeCmsLocales,
  finalThreeReviewedCmsImportPayloadByLocale,
} from "../src/content/locales/cms-import";
import { buildSourceRepository } from "../scripts/cms-import/fixture";
import {
  ImportFailure,
  canonicalJson,
  preflight,
  type ImportPayloadRecord,
  type SupportedImportLocale,
} from "../scripts/cms-import/model";

function payload(locale: "de" | "es" | "fa"): ImportPayloadRecord[] {
  return structuredClone(
    finalThreeReviewedCmsImportPayloadByLocale[locale],
  ) as unknown as ImportPayloadRecord[];
}

function expectFailure(
  locale: "de" | "es" | "fa",
  value: ImportPayloadRecord[],
  pattern: RegExp,
): void {
  const repository = buildSourceRepository(value);
  assert.throws(
    () => preflight(value, repository, { locale, batch: "remaining-final" }),
    (error: unknown) =>
      error instanceof ImportFailure && pattern.test(error.message),
  );
}

for (const locale of finalThreeCmsLocales) {
  test(`${locale} final exact 42-record payload passes read-only preflight`, () => {
    const value = payload(locale);
    const repository = buildSourceRepository(value);
    const before = canonicalJson(repository);
    const result = preflight(value, repository, {
      locale,
      batch: "remaining-final",
    });

    assert.equal(result.mapped.length, 42);
    assert.equal(value.filter((record) => record.contentType === "product").length, 36);
    assert.equal(value.filter((record) => record.contentType === "solution").length, 6);
    assert.equal(canonicalJson(repository), before);
    assert.deepEqual(
      new Set(result.mapped.map((record) => record.sourceId)),
      new Set(finalThreeCmsApprovedIdentities.map((identity) => identity.sourceId)),
    );
  });

  test(`${locale} final batch rejects count, identity, priority, and review drift`, () => {
    const short = payload(locale);
    short.pop();
    expectFailure(locale, short, /exactly 42|whitelist mismatch/);

    const mutations: Array<(record: ImportPayloadRecord) => void> = [
      (record) => { record.localizedSlug = "wrong-slug"; },
      (record) => { record.sourceEnglishContentId = 999999; },
      (record) => { record.contentType = record.contentType === "product" ? "solution" : "product"; },
      (record) => { record.priority = record.priority === "P0" ? "P1" : "P0"; },
      (record) => { record.nativeReviewStatus = "pending"; },
      (record) => { record.nativeReviewer = "Unknown"; },
      (record) => { record.nativeReviewDate = "2026-08-11"; },
      (record) => { record.productionReleaseReady = false; },
    ];
    for (const mutate of mutations) {
      const value = payload(locale);
      mutate(value[0]);
      expectFailure(
        locale,
        value,
        /unapproved identity|whitelist mismatch|priority whitelist mismatch|review evidence mismatch|release evidence mismatch/i,
      );
    }
  });

  test(`${locale} final batch rejects locale drift and owner waiver`, () => {
    const value = payload(locale);
    value[0].locale = (locale === "de" ? "es" : "de") as SupportedImportLocale;
    expectFailure(locale, value, /release evidence mismatch/);
    const valid = payload(locale);
    const repository = buildSourceRepository(valid);
    assert.throws(
      () => preflight(valid, repository, {
        locale,
        batch: "remaining-final",
        allowOwnerWaiver: true,
      }),
      (error: unknown) =>
        error instanceof ImportFailure && /whitelist mismatch/.test(error.message),
    );
  });
}
