import { nativeReviewEvidenceOverrides } from "@/content/locales/native-review-decisions";

export const nativeReviewDecisionStatuses = [
  "pending",
  "changes_required",
  "approved",
] as const;

export type NativeReviewDecisionStatus =
  (typeof nativeReviewDecisionStatuses)[number];

export type NativeReviewEvidenceOverride = {
  localizedUrl: string;
  locale: string;
  nativeReviewStatus: Exclude<NativeReviewDecisionStatus, "pending">;
  nativeReviewer: string;
  nativeReviewDate: string;
  nativeReviewNotes: string;
  productionReleaseReady: boolean;
};

export type NativeReviewDecisionRow = {
  localizedUrl: string;
  decision: NativeReviewDecisionStatus;
  reviewer: string;
  reviewDate: string;
  notes: string;
};

export type NativeReviewEvidence = {
  nativeReviewStatus: NativeReviewDecisionStatus;
  nativeReviewer: string | null;
  nativeReviewDate: string | null;
  nativeReviewNotes: string;
  productionReleaseReady: boolean;
};

const pendingEvidence: NativeReviewEvidence = {
  nativeReviewStatus: "pending",
  nativeReviewer: null,
  nativeReviewDate: null,
  nativeReviewNotes:
    "Local content is complete; documented native-language editorial review is pending.",
  productionReleaseReady: false,
};

export function getNativeReviewEvidence(
  localizedUrl: string,
): NativeReviewEvidence {
  const evidence = nativeReviewEvidenceOverrides.find(
    (entry) => entry.localizedUrl === localizedUrl,
  );
  return evidence ?? pendingEvidence;
}

function splitMarkdownRow(line: string): string[] {
  return line
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim().replace(/\\\|/g, "|"));
}

export function parseNativeReviewDecisions(
  markdown: string,
): NativeReviewDecisionRow[] {
  const rows: NativeReviewDecisionRow[] = [];
  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    const cells = splitMarkdownRow(line);
    if (
      cells[0] === "Localized URL" ||
      cells.every((cell) => /^:?-{3,}:?$/.test(cell))
    ) {
      continue;
    }
    if (!cells[0]?.startsWith("https://dualcorelink.com/")) continue;
    if (cells.length !== 5) {
      throw new Error(
        `Native review decision row must contain five columns: ${cells[0]}`,
      );
    }
    rows.push({
      localizedUrl: cells[0],
      decision: cells[1] as NativeReviewDecisionStatus,
      reviewer: cells[2],
      reviewDate: cells[3],
      notes: cells[4],
    });
  }
  return rows;
}

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function validateNativeReviewDecisions(input: {
  rows: readonly NativeReviewDecisionRow[];
  locale: string;
  expectedUrls: readonly string[];
}): string[] {
  const errors: string[] = [];
  const expected = new Set(input.expectedUrls);
  const seen = new Set<string>();

  if (input.rows.length !== input.expectedUrls.length) {
    errors.push(
      `${input.locale} decisions must contain ${input.expectedUrls.length} rows; found ${input.rows.length}`,
    );
  }

  for (const row of input.rows) {
    if (!expected.has(row.localizedUrl)) {
      errors.push(`unexpected ${input.locale} URL: ${row.localizedUrl}`);
    }
    if (seen.has(row.localizedUrl)) {
      errors.push(`duplicate decision URL: ${row.localizedUrl}`);
    }
    seen.add(row.localizedUrl);

    if (!nativeReviewDecisionStatuses.includes(row.decision)) {
      errors.push(
        `${row.localizedUrl} has invalid decision "${row.decision}"`,
      );
      continue;
    }

    if (row.decision === "pending") {
      if (row.reviewer || row.reviewDate) {
        errors.push(
          `${row.localizedUrl} is pending and must not claim reviewer evidence`,
        );
      }
      continue;
    }

    if (!row.reviewer) {
      errors.push(`${row.localizedUrl} requires a real reviewer`);
    }
    if (!isValidIsoDate(row.reviewDate)) {
      errors.push(`${row.localizedUrl} requires a valid ISO review date`);
    }
    if (!row.notes) {
      errors.push(`${row.localizedUrl} requires review notes`);
    }
  }

  for (const url of expected) {
    if (!seen.has(url)) errors.push(`missing decision URL: ${url}`);
  }
  return errors;
}

export function mergeNativeReviewEvidence(input: {
  existing: readonly NativeReviewEvidenceOverride[];
  locale: string;
  rows: readonly NativeReviewDecisionRow[];
  technicalValidationPassed: boolean;
}): NativeReviewEvidenceOverride[] {
  const preserved = input.existing.filter(
    (entry) => entry.locale !== input.locale,
  );
  const imported = input.rows
    .filter(
      (
        row,
      ): row is NativeReviewDecisionRow & {
        decision: "approved" | "changes_required";
      } => row.decision !== "pending",
    )
    .map((row) => ({
      localizedUrl: row.localizedUrl,
      locale: input.locale,
      nativeReviewStatus: row.decision,
      nativeReviewer: row.reviewer,
      nativeReviewDate: row.reviewDate,
      nativeReviewNotes: row.notes,
      productionReleaseReady:
        row.decision === "approved" && input.technicalValidationPassed,
    }));
  return [...preserved, ...imported].sort((left, right) =>
    left.localizedUrl.localeCompare(right.localizedUrl),
  );
}

export function renderNativeReviewEvidenceModule(
  entries: readonly NativeReviewEvidenceOverride[],
): string {
  const json = JSON.stringify(entries, null, 2);
  return [
    'import type { NativeReviewEvidenceOverride } from "@/lib/native-review-evidence";',
    "",
    "/**",
    " * Human native-review evidence imported from the controlled review decisions",
    " * workbooks. Pending rows are intentionally omitted because pending is the",
    " * publication model's fail-closed default.",
    " */",
    `export const nativeReviewEvidenceOverrides: readonly NativeReviewEvidenceOverride[] = ${json};`,
    "",
  ].join("\n");
}
