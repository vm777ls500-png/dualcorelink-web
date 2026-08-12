import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  indexableLocales,
  locales,
  visibleLocales,
} from "../src/config/i18n";
import { localizedFileContent } from "../src/content/locales";
import { cmsTranslationImportPayload } from "../src/content/locales/cms-import";
import { nativeReviewEvidenceOverrides } from "../src/content/locales/native-review-decisions";
import { auditMultilingualFoundation } from "../src/lib/multilingual-audit";
import {
  mergeNativeReviewEvidence,
  parseNativeReviewDecisions,
  renderNativeReviewEvidenceModule,
  validateNativeReviewDecisions,
} from "../src/lib/native-review-evidence";
import {
  mergeNativeReviewBatchRows,
  validateNativeReviewBatchDecisions,
} from "../src/lib/multilingual-review-batches";
import {
  multilingualPublicationManifest,
  type MultilingualLocale,
} from "../src/lib/multilingual-publication-manifest";
import {
  getMultilingualReleaseBatch,
} from "../src/lib/multilingual-release-batches";

function requestedLocale(): MultilingualLocale {
  const argument = process.argv.find((value) => value.startsWith("--locale="));
  const locale = argument?.slice("--locale=".length);
  const supportedLocales: readonly MultilingualLocale[] = [
    "ar",
    "zh",
    "de",
    "es",
    "vi",
    "fa",
  ];
  if (!supportedLocales.includes(locale as MultilingualLocale)) {
    throw new Error(
      `Native-review import requires --locale=${supportedLocales.join("|")}`,
    );
  }
  return locale as MultilingualLocale;
}

function requestedBatch(): string | undefined {
  return process.argv
    .find((value) => value.startsWith("--batch="))
    ?.slice("--batch=".length);
}

function approvalOnlyRequested(): boolean {
  return process.argv.includes("--approval-only");
}

function decisionFileFor(locale: MultilingualLocale): string {
  if (["de", "es", "fa"].includes(locale)) {
    return `docs/reviews/multilingual/${locale}-full-decisions-20260812.md`;
  }
  return `docs/reviews/multilingual/${locale}-native-review-decisions-20260729.md`;
}

function normalizeFinalReviewDecisionSheet(
  markdown: string,
  locale: MultilingualLocale,
): string {
  if (!["de", "es", "fa"].includes(locale)) return markdown;
  return markdown
    .split(/\r?\n/)
    .map((line) => {
      if (!line.startsWith(`| /${locale}/`)) return line;
      const cells = line
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim());
      if (cells.length !== 6) {
        throw new Error(`Invalid ${locale} final review decision row: ${line}`);
      }
      const [localizedPath, pageType, decision, reviewer, reviewDate] = cells;
      return `| https://dualcorelink.com${localizedPath} | ${decision} | ${reviewer} | ${reviewDate} | Human ${locale.toUpperCase()} full-batch review approved for ${pageType} |`;
    })
    .join("\n");
}

async function main() {
  const locale = requestedLocale();
  const batchName = requestedBatch();
  if (batchName && locale !== "zh") {
    throw new Error("Review batches are currently supported only for zh");
  }
  const approvalOnly = approvalOnlyRequested();
  const decisionsPath = path.resolve(decisionFileFor(locale));
  const statePath = path.resolve(
    "src/content/locales/native-review-decisions.ts",
  );
  const markdown = normalizeFinalReviewDecisionSheet(
    await readFile(decisionsPath, "utf8"),
    locale,
  );
  const baseRows = parseNativeReviewDecisions(markdown);
  let rows = baseRows;

  if (locale === "zh") {
    const batchNames = batchName ? [batchName] : ["p0", "p1", "remaining-final"];
    for (const currentBatchName of batchNames) {
      const batch = getMultilingualReleaseBatch("zh", currentBatchName);
      const batchRows = parseNativeReviewDecisions(
        await readFile(path.resolve(batch.decisionFile), "utf8"),
      );
      const batchErrors = validateNativeReviewBatchDecisions({
        rows: batchRows,
        batch,
        manifest: multilingualPublicationManifest,
      });
      if (batchErrors.length > 0) {
        throw new Error(
          `Chinese ${currentBatchName.toUpperCase()} review batch is invalid:\n${batchErrors.join("\n")}`,
        );
      }
      rows = mergeNativeReviewBatchRows({
        baseRows: rows,
        existing: nativeReviewEvidenceOverrides,
        locale,
        batchRows,
      });
    }
  }

  const expectedUrls = multilingualPublicationManifest
    .filter((entry) => entry.locale === locale)
    .map((entry) => entry.localizedUrl);
  const decisionErrors = validateNativeReviewDecisions({
    rows,
    locale,
    expectedUrls,
  });
  if (decisionErrors.length > 0) {
    throw new Error(decisionErrors.join("\n"));
  }

  const nginxConfig = await readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
  const audit = auditMultilingualFoundation({
    manifest: multilingualPublicationManifest,
    localContent: localizedFileContent,
    cmsTranslations: cmsTranslationImportPayload,
    configuredLocales: locales,
    visibleLocales,
    indexableLocales,
    nginxConfig,
  });
  if (audit.errors.length > 0) {
    throw new Error(
      `Technical multilingual validation failed; review state was not written:\n${audit.errors.join("\n")}`,
    );
  }

  const next = mergeNativeReviewEvidence({
    existing: nativeReviewEvidenceOverrides,
    locale,
    rows,
    technicalValidationPassed: !approvalOnly,
  });
  await writeFile(
    statePath,
    renderNativeReviewEvidenceModule(next),
    "utf8",
  );

  const counts = {
    pending: rows.filter((row) => row.decision === "pending").length,
    approved: rows.filter((row) => row.decision === "approved").length,
    changesRequired: rows.filter(
      (row) => row.decision === "changes_required",
    ).length,
  };
  console.log(
    `[multilingual:apply-native-review] ${locale}${batchName ? `:${batchName}` : ""}: pending=${counts.pending} approved=${counts.approved} changes-required=${counts.changesRequired} release-ready=${approvalOnly ? 0 : counts.approved}`,
  );
  console.log(
    `[multilingual:apply-native-review] preserved other-locale overrides=${next.filter((entry) => entry.locale !== locale).length}`,
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[multilingual:apply-native-review] blocked: ${message}`);
  process.exitCode = 1;
});
