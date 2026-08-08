import type {
  NativeReviewDecisionRow,
  NativeReviewEvidenceOverride,
} from "./native-review-evidence";
import { validateNativeReviewDecisions } from "./native-review-evidence";
import type { MultilingualPublicationEntry } from "./multilingual-publication-manifest";
import type { MultilingualReleaseBatch } from "./multilingual-release-batches";

export const humanApprovalNotes = "Human Chinese review approved";

export function validateNativeReviewBatchDecisions(input: {
  rows: readonly NativeReviewDecisionRow[];
  batch: MultilingualReleaseBatch;
  manifest: readonly MultilingualPublicationEntry[];
}): string[] {
  const errors = validateNativeReviewDecisions({
    rows: input.rows,
    locale: input.batch.locale,
    expectedUrls: input.batch.localizedUrls,
  });
  const expectedUrls = new Set(input.batch.localizedUrls);

  for (const localizedUrl of input.batch.localizedUrls) {
    const entry = input.manifest.find(
      (candidate) => candidate.localizedUrl === localizedUrl,
    );
    if (!entry) {
      errors.push(`batch URL has no manifest entry: ${localizedUrl}`);
      continue;
    }
    if (entry.locale !== input.batch.locale) {
      errors.push(`batch URL has wrong locale: ${localizedUrl}`);
    }
    if (
      input.batch.priority !== "mixed" &&
      entry.priority !== input.batch.priority
    ) {
      errors.push(
        `batch URL has wrong priority ${entry.priority}; expected ${input.batch.priority}: ${localizedUrl}`,
      );
    }
  }

  if (input.batch.priority === "mixed") {
    for (const priority of ["P0", "P1", "P2"] as const) {
      const expectedCount = input.batch.priorityCounts?.[priority] ?? 0;
      const actualCount = input.batch.localizedUrls.filter((localizedUrl) =>
        input.manifest.some(
          (entry) =>
            entry.localizedUrl === localizedUrl && entry.priority === priority,
        ),
      ).length;
      if (actualCount !== expectedCount) {
        errors.push(
          `batch priority ${priority} count must be ${expectedCount}; found ${actualCount}`,
        );
      }
    }
  }

  for (const row of input.rows) {
    if (!expectedUrls.has(row.localizedUrl)) continue;
    if (row.decision !== "approved") {
      errors.push(`batch decision must be approved: ${row.localizedUrl}`);
    }
    if (row.reviewer !== input.batch.reviewer) {
      errors.push(
        `batch reviewer must be ${input.batch.reviewer}: ${row.localizedUrl}`,
      );
    }
    if (row.reviewDate !== input.batch.reviewDate) {
      errors.push(
        `batch review date must be ${input.batch.reviewDate}: ${row.localizedUrl}`,
      );
    }
    if (row.notes !== humanApprovalNotes) {
      errors.push(
        `batch review notes must be "${humanApprovalNotes}": ${row.localizedUrl}`,
      );
    }
  }

  return errors;
}

function evidenceRow(
  evidence: NativeReviewEvidenceOverride,
): NativeReviewDecisionRow {
  return {
    localizedUrl: evidence.localizedUrl,
    decision: evidence.nativeReviewStatus,
    reviewer: evidence.nativeReviewer,
    reviewDate: evidence.nativeReviewDate,
    notes: evidence.nativeReviewNotes,
  };
}

export function mergeNativeReviewBatchRows(input: {
  baseRows: readonly NativeReviewDecisionRow[];
  existing: readonly NativeReviewEvidenceOverride[];
  locale: string;
  batchRows: readonly NativeReviewDecisionRow[];
}): NativeReviewDecisionRow[] {
  const byUrl = new Map(
    input.baseRows.map((row) => [row.localizedUrl, row] as const),
  );

  for (const evidence of input.existing.filter(
    (entry) => entry.locale === input.locale,
  )) {
    if (byUrl.has(evidence.localizedUrl)) {
      byUrl.set(evidence.localizedUrl, evidenceRow(evidence));
    }
  }
  for (const row of input.batchRows) {
    if (byUrl.has(row.localizedUrl)) {
      byUrl.set(row.localizedUrl, row);
    }
  }

  return input.baseRows.map((row) => byUrl.get(row.localizedUrl) ?? row);
}
