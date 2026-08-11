import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { nativeReviewEvidenceOverrides } from "../src/content/locales/native-review-decisions";
import {
  humanApprovalNotes,
  mergeNativeReviewBatchRows,
  validateNativeReviewBatchDecisions,
} from "../src/lib/multilingual-review-batches";
import {
  multilingualPublicationManifest,
  type MultilingualPublicationEntry,
} from "../src/lib/multilingual-publication-manifest";
import {
  getMultilingualReleaseBatch,
  zhP0ReleaseUrls,
  zhP1ReleaseUrls,
} from "../src/lib/multilingual-release-batches";
import {
  parseNativeReviewDecisions,
  type NativeReviewDecisionRow,
} from "../src/lib/native-review-evidence";

const p1Batch = getMultilingualReleaseBatch("zh", "p1");

async function p1Rows(): Promise<NativeReviewDecisionRow[]> {
  return parseNativeReviewDecisions(
    await readFile(path.resolve(p1Batch.decisionFile), "utf8"),
  );
}

function pendingRows(): NativeReviewDecisionRow[] {
  return multilingualPublicationManifest
    .filter((entry) => entry.locale === "zh")
    .map((entry) => ({
      localizedUrl: entry.localizedUrl,
      decision: "pending" as const,
      reviewer: "",
      reviewDate: "",
      notes: "",
    }));
}

test("Chinese P1 approval contains exactly 31 Allan-reviewed P1 URLs", async () => {
  const rows = await p1Rows();
  assert.equal(rows.length, 31);
  assert.deepEqual(
    new Set(rows.map((row) => row.localizedUrl)),
    new Set(zhP1ReleaseUrls),
  );
  assert.deepEqual(
    validateNativeReviewBatchDecisions({
      rows,
      batch: p1Batch,
      manifest: multilingualPublicationManifest,
    }),
    [],
  );
  for (const row of rows) {
    assert.equal(row.decision, "approved");
    assert.equal(row.reviewer, "Allan");
    assert.equal(row.reviewDate, "2026-08-02");
    assert.equal(row.notes, humanApprovalNotes);
  }
});

test("Chinese P1 approval rejects wrong reviewer, date, count and duplicate URL", async () => {
  const rows = await p1Rows();
  for (const [label, invalidRows, expected] of [
    [
      "reviewer",
      [{ ...rows[0], reviewer: "Not Allan" }, ...rows.slice(1)],
      "batch reviewer must be Allan",
    ],
    [
      "date",
      [{ ...rows[0], reviewDate: "2026-08-01" }, ...rows.slice(1)],
      "batch review date must be 2026-08-02",
    ],
    ["missing", rows.slice(1), "must contain 31 rows"],
    ["extra", [...rows, rows[0]], "must contain 31 rows"],
  ] as const) {
    const errors = validateNativeReviewBatchDecisions({
      rows: invalidRows,
      batch: p1Batch,
      manifest: multilingualPublicationManifest,
    });
    assert.ok(errors.some((error) => error.includes(expected)), label);
  }
});

test("Chinese P1 approval rejects P2 and other-locale URLs", async () => {
  const rows = await p1Rows();
  const p2 = multilingualPublicationManifest.find(
    (entry) => entry.locale === "zh" && entry.priority === "P2",
  );
  const otherLocale = multilingualPublicationManifest.find(
    (entry) => entry.locale === "de" && entry.priority === "P1",
  );
  assert.ok(p2);
  assert.ok(otherLocale);

  for (const replacement of [p2, otherLocale] as MultilingualPublicationEntry[]) {
    const invalidRows = [
      { ...rows[0], localizedUrl: replacement.localizedUrl },
      ...rows.slice(1),
    ];
    const errors = validateNativeReviewBatchDecisions({
      rows: invalidRows,
      batch: p1Batch,
      manifest: multilingualPublicationManifest,
    });
    assert.ok(
      errors.some((error) => error.includes("unexpected zh URL")),
      replacement.localizedUrl,
    );
  }
});

test("applying P1 preserves the original P0 reviewer history", async () => {
  const merged = mergeNativeReviewBatchRows({
    baseRows: pendingRows(),
    existing: nativeReviewEvidenceOverrides.filter((entry) =>
      zhP0ReleaseUrls.includes(
        entry.localizedUrl as (typeof zhP0ReleaseUrls)[number],
      ),
    ),
    locale: "zh",
    batchRows: await p1Rows(),
  });
  const p0Rows = merged.filter((row) =>
    zhP0ReleaseUrls.includes(
      row.localizedUrl as (typeof zhP0ReleaseUrls)[number],
    ),
  );
  const p1RowsAfterMerge = merged.filter((row) =>
    zhP1ReleaseUrls.includes(
      row.localizedUrl as (typeof zhP1ReleaseUrls)[number],
    ),
  );
  assert.equal(p0Rows.length, 12);
  assert.equal(p1RowsAfterMerge.length, 31);
  for (const row of p0Rows) {
    assert.equal(row.decision, "approved");
    assert.equal(row.reviewer, "Allan");
    assert.equal(row.reviewDate, "2026-07-29");
  }
  for (const row of p1RowsAfterMerge) {
    assert.equal(row.decision, "approved");
    assert.equal(row.reviewDate, "2026-08-02");
  }
});

test("the final release approves remaining Chinese pages while other locales remain pending", () => {
  const p2 = multilingualPublicationManifest.filter(
    (entry) => entry.locale === "zh" && entry.priority === "P2",
  );
  const arabic = multilingualPublicationManifest.filter((entry) => entry.locale === "ar");
  const pendingLocales = multilingualPublicationManifest.filter((entry) =>
    ["de", "es", "fa"].includes(entry.locale),
  );
  const remainingChinese = multilingualPublicationManifest.filter(
    (entry) => entry.locale === "zh" && entry.nativeReviewStatus === "pending",
  );
  assert.equal(p2.length, 19);
  assert.equal(remainingChinese.length, 0);
  assert.equal(arabic.length, 69);
  assert.equal(
    arabic.every(
      (entry) => entry.nativeReviewStatus === "approved" && entry.productionReleaseReady,
    ),
    true,
  );
  assert.equal(pendingLocales.length, 207);
  assert.ok(
    pendingLocales.every(
      (entry) =>
        entry.nativeReviewStatus === "pending" &&
        entry.productionReleaseReady === false,
    ),
  );
});
