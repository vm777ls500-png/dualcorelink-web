import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  getDirection,
  indexableLocales,
  legacyLocales,
  locales,
  rtlLocales,
  visibleLocales,
} from "../src/config/i18n";
import { localizedFileContent } from "../src/content/locales";
import {
  cmsTranslationImportPayload,
  zhP0ReviewedCmsImportPayload,
  zhP1ReviewedCmsImportPayload,
  zhRemainingFinalReviewedCmsImportPayload,
} from "../src/content/locales/cms-import";
import {
  m3aProductCatalog,
  m3aSolutionCatalog,
} from "../src/content/locales/m3a-catalog";
import {
  englishContentMaster,
  hasProductionReleaseGate,
  isValidNativeReviewDate,
  m3aFullCoveragePaths,
  m2aApprovedPaths,
  multilingualLocales,
  multilingualPublicationManifest,
  sixLanguageFullCoveragePaths,
  type MultilingualPublicationEntry,
} from "../src/lib/multilingual-publication-manifest";
import { checkMultilingualProductionRelease } from "../src/lib/multilingual-release";
import {
  buildPublishedNavigationHref,
  arReviewedReleaseUrls,
  getReleasedLocalesForPath,
  isReleasedLocalizedPath,
  zhP0ReleaseUrls,
  zhP1ReleaseUrls,
  zhRemainingFinalReleaseUrls,
  zhReviewedReleaseUrls,
  viReviewedReleaseUrls,
} from "../src/lib/multilingual-release-batches";
import {
  findPublicationEvidence,
  getCandidatePublicationEntries,
  getHreflangEligibleEntries,
  getSitemapEligibleEntries,
  getStaticExportEligibleEntries,
  isPublicationEligible,
} from "../src/lib/multilingual-publication-control";
import {
  getLocalizedPublicationPage,
  getPublicationHreflang,
  localizedPublicationPages,
} from "../src/lib/localized-publication";
import { validateCmsTranslation } from "../src/lib/multilingual-cms";
import {
  mergeNativeReviewEvidence,
  parseNativeReviewDecisions,
  validateNativeReviewDecisions,
  type NativeReviewEvidenceOverride,
} from "../src/lib/native-review-evidence";

function publication(
  overrides: Partial<MultilingualPublicationEntry> = {},
): MultilingualPublicationEntry {
  return {
    ...multilingualPublicationManifest[0],
    ...overrides,
  };
}

test("all six multilingual locales are configured and RTL is limited to ar/fa", () => {
  assert.deepEqual(multilingualLocales, ["ar", "zh", "de", "es", "vi", "fa"]);
  assert.deepEqual(rtlLocales, ["ar", "fa"]);
  for (const locale of multilingualLocales) assert.ok(locales.includes(locale));
  for (const locale of locales) {
    assert.equal(
      getDirection(locale),
      locale === "ar" || locale === "fa" ? "rtl" : "ltr",
    );
  }
});

test("the publication manifest covers 69 English sources across six locales", () => {
  assert.equal(englishContentMaster.length, 69);
  assert.equal(multilingualPublicationManifest.length, 414);
  for (const locale of multilingualLocales) {
    assert.equal(
      multilingualPublicationManifest.filter((entry) => entry.locale === locale)
        .length,
      69,
    );
  }
  const urls = multilingualPublicationManifest.map((entry) => entry.localizedUrl);
  assert.equal(new Set(urls).size, urls.length);
});

test("M2A P0 pages remain included in the six-language full-coverage scope", () => {
  const approved = multilingualPublicationManifest.filter(
    (entry) => entry.publishReady,
  );
  assert.equal(approved.length, 414);
  assert.equal(m2aApprovedPaths.ar.length, 15);
  assert.equal(m2aApprovedPaths.zh.length, 12);
  for (const locale of ["ar", "zh"] as const) {
    for (const approvedPath of m2aApprovedPaths[locale]) {
      assert.ok(
        approved.some(
          (entry) =>
            entry.locale === locale &&
            new URL(entry.localizedUrl).pathname ===
              `/${locale}/${approvedPath}/`,
        ),
      );
    }
  }
});

test("M3A completes all 69 Arabic and 69 Chinese source paths", () => {
  const approved = multilingualPublicationManifest.filter(
    (entry) => entry.publishReady,
  );
  for (const locale of ["ar", "zh"] as const) {
    const actual = approved
      .filter((entry) => entry.locale === locale)
      .map((entry) =>
        new URL(entry.localizedUrl).pathname.replace(
          new RegExp(`^/${locale}/|/$`, "g"),
          "",
        ),
      )
      .sort();
    assert.equal(actual.length, 69);
    assert.deepEqual(actual, [...m3aFullCoveragePaths[locale]].sort());
  }
});

test("M4A completes 69 paths for every localized language", () => {
  const approved = multilingualPublicationManifest.filter(
    (entry) => entry.publishReady,
  );
  for (const locale of multilingualLocales) {
    const actual = approved
      .filter((entry) => entry.locale === locale)
      .map((entry) =>
        new URL(entry.localizedUrl).pathname.replace(
          new RegExp(`^/${locale}/|/$`, "g"),
          "",
        ),
      )
      .sort();
    assert.equal(actual.length, 69);
    assert.deepEqual(
      actual,
      [...sixLanguageFullCoveragePaths[locale]].sort(),
    );
  }
});

test("final Chinese release retains all 69 Chinese approvals", () => {
  const candidates = multilingualPublicationManifest.filter(
    (entry) => entry.publishReady,
  );
  assert.equal(candidates.length, 414);
  const approved = candidates.filter(
    (entry) => entry.locale === "zh" && entry.nativeReviewStatus === "approved",
  );
  const pending = candidates.filter(
    (entry) => entry.nativeReviewStatus === "pending",
  );
  assert.equal(approved.length, 69);
  assert.equal(pending.length, 207);
  assert.deepEqual(
    new Set(approved.map((entry) => entry.localizedUrl)),
    new Set(zhReviewedReleaseUrls),
  );
  for (const entry of approved) {
    assert.equal(entry.nativeReviewer, "Allan");
    assert.equal(
      entry.nativeReviewDate,
      zhP0ReleaseUrls.includes(entry.localizedUrl as (typeof zhP0ReleaseUrls)[number])
        ? "2026-07-29"
        : zhP1ReleaseUrls.includes(entry.localizedUrl as (typeof zhP1ReleaseUrls)[number])
          ? "2026-08-02"
          : "2026-08-03",
    );
    assert.equal(entry.nativeReviewNotes, "Human Chinese review approved");
    assert.equal(entry.productionReleaseReady, true);
    assert.equal(hasProductionReleaseGate(entry, true), true);
  }
  for (const entry of pending) {
    assert.equal(entry.nativeReviewer, null);
    assert.equal(entry.nativeReviewDate, null);
    assert.ok(entry.nativeReviewNotes);
    assert.equal(entry.productionReleaseReady, false);
    assert.equal(hasProductionReleaseGate(entry, true), false);
  }
});

test("production release requires approved native evidence and technical validation", () => {
  const candidate = multilingualPublicationManifest.find(
    (entry) => entry.publishReady,
  );
  assert.ok(candidate);
  const reviewed = {
    ...candidate,
    nativeReviewStatus: "approved" as const,
    nativeReviewer: "Verified Native Reviewer",
    nativeReviewDate: "2026-07-28",
    nativeReviewNotes: "Native-language review completed.",
    productionReleaseReady: true,
  };
  assert.equal(isValidNativeReviewDate("2026-02-29"), false);
  assert.equal(isValidNativeReviewDate(reviewed.nativeReviewDate), true);
  assert.equal(hasProductionReleaseGate(reviewed, false), false);
  assert.equal(hasProductionReleaseGate(reviewed, true), true);
  assert.equal(
    hasProductionReleaseGate({ ...reviewed, nativeReviewer: "" }, true),
    false,
  );
});

test("missing and draft translations cannot be published", () => {
  const missing = publication({
    translationStatus: "missing",
    seoMetadataStatus: "missing",
    contentReviewStatus: "missing",
    publishReady: false,
  });
  const draft = publication({
    translationStatus: "draft",
    seoMetadataStatus: "approved",
    contentReviewStatus: "approved",
    publishReady: true,
  });
  assert.equal(isPublicationEligible(missing, {}), false);
  assert.equal(isPublicationEligible(draft, {}), false);
});

test("all candidates retain evidence while only reviewed pages enter production outputs", () => {
  const approved = multilingualPublicationManifest.filter(
    (entry) => entry.publishReady,
  );
  for (const entry of approved) {
    assert.equal(
      isPublicationEligible(entry, findPublicationEvidence(entry)),
      true,
      entry.localizedUrl,
    );
  }
  assert.equal(localizedFileContent.length, 162);
  assert.equal(cmsTranslationImportPayload.length, 252);
  assert.equal(
    getCandidatePublicationEntries(multilingualPublicationManifest).length,
    414,
  );
  assert.equal(localizedPublicationPages.length, 207);
  assert.equal(
    getStaticExportEligibleEntries(multilingualPublicationManifest).length,
    207,
  );
  assert.equal(
    getSitemapEligibleEntries(multilingualPublicationManifest).length,
    207,
  );
  assert.equal(
    getHreflangEligibleEntries(multilingualPublicationManifest).length,
    207,
  );
  assert.deepEqual(
    new Set(localizedPublicationPages.map((page) => page.localizedUrl)),
    new Set([...zhReviewedReleaseUrls, ...arReviewedReleaseUrls, ...viReviewedReleaseUrls]),
  );
});

test("CMS import payload uses verified source IDs without invented localized IDs", () => {
  const expectedIds = new Map([
    ...m3aProductCatalog.map(
      (entry) => [`product:${entry.slug}`, entry.id] as const,
    ),
    ...m3aSolutionCatalog.map(
      (entry) => [`solution:${entry.slug}`, entry.id] as const,
    ),
  ]);
  for (const payload of cmsTranslationImportPayload) {
    assert.deepEqual(validateCmsTranslation(payload), []);
    assert.equal(payload.deliveryMode, "validated-import-payload");
    assert.equal(payload.localizedContentId, null);
    assert.equal(
      payload.sourceEnglishContentId,
      expectedIds.get(`${payload.contentType}:${payload.sourceEnglishSlug}`),
    );
    assert.match(
      payload.importKey,
      /^m2a:(?:ar|zh|de|es|vi|fa):(product|solution):\d+$/,
    );
    const localizedUrl = `https://dualcorelink.com/${payload.locale}/${payload.contentType}s/${payload.sourceEnglishSlug}/`;
    if (zhReviewedReleaseUrls.includes(localizedUrl as (typeof zhReviewedReleaseUrls)[number])) {
      assert.equal(payload.nativeReviewStatus, "approved");
      assert.equal(payload.nativeReviewer, "Allan");
      assert.equal(
        payload.nativeReviewDate,
        zhP0ReleaseUrls.includes(localizedUrl as (typeof zhP0ReleaseUrls)[number])
          ? "2026-07-29"
          : zhP1ReleaseUrls.includes(localizedUrl as (typeof zhP1ReleaseUrls)[number])
            ? "2026-08-02"
            : "2026-08-03",
      );
    } else if (
      arReviewedReleaseUrls.includes(
        localizedUrl as (typeof arReviewedReleaseUrls)[number],
      )
    ) {
      assert.equal(payload.nativeReviewStatus, "approved");
      assert.equal(payload.nativeReviewer, "Allan");
      assert.equal(payload.nativeReviewDate, "2026-08-11");
    } else if (
      viReviewedReleaseUrls.includes(
        localizedUrl as (typeof viReviewedReleaseUrls)[number],
      )
    ) {
      assert.equal(payload.nativeReviewStatus, "approved");
      assert.equal(payload.nativeReviewer, "Allan");
      assert.equal(payload.nativeReviewDate, "2026-08-11");
    } else {
      assert.equal(payload.nativeReviewStatus, "pending");
      assert.equal(payload.nativeReviewer, null);
      assert.equal(payload.nativeReviewDate, null);
    }
  }
});

test("full release check blocks the 207 pending German, Spanish, and Persian pages", async () => {
  const nginxConfig = await readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
  const result = checkMultilingualProductionRelease({
    manifest: multilingualPublicationManifest,
    localContent: localizedFileContent,
    cmsTranslations: cmsTranslationImportPayload,
    configuredLocales: locales,
    visibleLocales,
    indexableLocales,
    nginxConfig,
  });
  assert.equal(result.technicalValidationPassed, true);
  assert.equal(result.candidateCount, 414);
  assert.equal(result.pendingUrls.length, 207);
  assert.equal(result.productionReleaseReadyCount, 207);
  assert.equal(result.cmsPayloadCount, 252);
  assert.equal(result.cmsPayloadStructurallyReadyCount, 252);
  assert.equal(result.cmsPayloadNativeApprovedCount, 126);
  assert.ok(result.errors.some((error) => error.includes("207/414")));
});

test("M5B Chinese P0 batch release check passes exactly 12 pages and 7 CMS records", async () => {
  const nginxConfig = await readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
  const result = checkMultilingualProductionRelease({
    manifest: multilingualPublicationManifest,
    localContent: localizedFileContent,
    cmsTranslations: cmsTranslationImportPayload,
    configuredLocales: locales,
    visibleLocales,
    indexableLocales,
    nginxConfig,
    releaseScopeUrls: zhP0ReleaseUrls,
  });
  assert.equal(result.technicalValidationPassed, true);
  assert.equal(result.candidateCount, 12);
  assert.equal(result.pendingUrls.length, 0);
  assert.equal(result.productionReleaseReadyCount, 12);
  assert.equal(result.cmsPayloadCount, 7);
  assert.equal(result.cmsPayloadStructurallyReadyCount, 7);
  assert.equal(result.cmsPayloadNativeApprovedCount, 7);
  assert.deepEqual(result.errors, []);
  assert.equal(zhP0ReviewedCmsImportPayload.length, 7);
  assert.deepEqual(
    zhP0ReviewedCmsImportPayload.map((payload) => payload.sourceEnglishContentId),
    [48, 47, 6, 222, 142, 140, 138],
  );
  for (const payload of zhP0ReviewedCmsImportPayload) {
    assert.equal(payload.locale, "zh");
    assert.equal(payload.nativeReviewStatus, "approved");
    assert.equal(payload.nativeReviewer, "Allan");
    assert.equal(payload.nativeReviewDate, "2026-07-29");
  }
});

test("M7B Chinese P1 batch release check passes exactly 31 pages and 17 CMS records", async () => {
  const nginxConfig = await readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
  const result = checkMultilingualProductionRelease({
    manifest: multilingualPublicationManifest,
    localContent: localizedFileContent,
    cmsTranslations: cmsTranslationImportPayload,
    configuredLocales: locales,
    visibleLocales,
    indexableLocales,
    nginxConfig,
    releaseScopeUrls: zhP1ReleaseUrls,
  });
  assert.equal(result.technicalValidationPassed, true);
  assert.equal(result.candidateCount, 31);
  assert.equal(result.pendingUrls.length, 0);
  assert.equal(result.productionReleaseReadyCount, 31);
  assert.equal(result.cmsPayloadCount, 17);
  assert.equal(result.cmsPayloadStructurallyReadyCount, 17);
  assert.equal(result.cmsPayloadNativeApprovedCount, 17);
  assert.deepEqual(result.errors, []);
  assert.equal(zhP1ReviewedCmsImportPayload.length, 17);
  assert.equal(
    new Set(
      zhP1ReviewedCmsImportPayload.map(
        (payload) => payload.sourceEnglishContentId,
      ),
    ).size,
    17,
  );
  for (const payload of zhP1ReviewedCmsImportPayload) {
    assert.equal(payload.locale, "zh");
    assert.equal(payload.batch, "p1");
    assert.equal(payload.priority, "P1");
    assert.equal(payload.nativeReviewStatus, "approved");
    assert.equal(payload.nativeReviewer, "Allan");
    assert.equal(payload.nativeReviewDate, "2026-08-02");
    assert.equal(payload.productionReleaseReady, true);
    assert.equal(
      payload.translationGroup,
      `shb2b-${payload.contentType}-${payload.sourceEnglishContentId}`,
    );
  }
});

test("final Chinese batch passes exactly 26 pages and 18 CMS records", async () => {
  const nginxConfig = await readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
  const result = checkMultilingualProductionRelease({
    manifest: multilingualPublicationManifest,
    localContent: localizedFileContent,
    cmsTranslations: cmsTranslationImportPayload,
    configuredLocales: locales,
    visibleLocales,
    indexableLocales,
    nginxConfig,
    releaseScopeUrls: zhRemainingFinalReleaseUrls,
  });
  assert.equal(result.technicalValidationPassed, true);
  assert.equal(result.candidateCount, 26);
  assert.equal(result.pendingUrls.length, 0);
  assert.equal(result.productionReleaseReadyCount, 26);
  assert.equal(result.cmsPayloadCount, 18);
  assert.equal(result.cmsPayloadNativeApprovedCount, 18);
  assert.deepEqual(result.errors, []);
  assert.equal(zhRemainingFinalReviewedCmsImportPayload.length, 18);
});

test("AWS production deployment enforces all approved multilingual release gates", async () => {
  const workflow = await readFile(
    path.resolve(".github/workflows/aws-production-deploy.yml"),
    "utf8",
  );
  assert.match(
    workflow,
    /npm run multilingual:release-check -- --locale=zh --batch=p0/,
  );
  assert.ok(
    workflow.indexOf(
      "npm run multilingual:release-check -- --locale=zh --batch=p0",
    ) <
      workflow.indexOf("npm run build"),
  );
  assert.match(
    workflow,
    /npm run multilingual:release-check -- --locale=zh --batch=p1/,
  );
  assert.ok(
    workflow.indexOf(
      "npm run multilingual:release-check -- --locale=zh --batch=p1",
    ) < workflow.indexOf("npm run build"),
  );
  assert.match(
    workflow,
    /npm run multilingual:release-check -- --locale=zh\s/,
  );
  assert.match(
    workflow,
    /npm run multilingual:release-check -- --locale=ar --batch=remaining-final/,
  );
  assert.match(
    workflow,
    /npm run multilingual:release-check -- --locale=vi --batch=remaining-final/,
  );
  assert.match(workflow, /Generating static pages\.\*342\/342/);
});

test("native review packs cover all 414 M4A URLs without claiming reviewers", async () => {
  const reviewFiles = {
    ar: "ar-p0-native-review-20260728.md",
    zh: "zh-p0-native-review-20260728.md",
    de: "de-full-native-review-20260728.md",
    es: "es-full-native-review-20260728.md",
    vi: "vi-full-native-review-20260728.md",
    fa: "fa-full-native-review-20260728.md",
  } as const;
  for (const locale of multilingualLocales) {
    const reviewPack = await readFile(
      path.resolve(
        `docs/reviews/multilingual/${reviewFiles[locale]}`,
      ),
      "utf8",
    );
    for (const approvedPath of sixLanguageFullCoveragePaths[locale]) {
      assert.match(
        reviewPack,
        new RegExp(
          `https://dualcorelink\\.com/${locale}/${approvedPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`,
        ),
      );
      assert.match(
        reviewPack,
        new RegExp(
          `https://dualcorelink\\.com/en/${approvedPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`,
        ),
      );
    }
    assert.equal(
      reviewPack.match(/\| Native review conclusion \| \*\*PENDING\*\* \|/g)
        ?.length,
      sixLanguageFullCoveragePaths[locale].length,
    );
    assert.equal(
      reviewPack.match(/\| Native reviewer \| — \|/g)?.length,
      sixLanguageFullCoveragePaths[locale].length,
    );
  }

  const cmsReadiness = await readFile(
    path.resolve(
      "docs/reviews/multilingual/cms-import-readiness-20260728.md",
    ),
    "utf8",
  );
  assert.equal(
    cmsReadiness.match(/\| m2a:(?:ar|zh|de|es|vi|fa):/g)?.length,
    252,
  );
  assert.equal(
    cmsReadiness.match(/42\/42 structurally ready; 0\/42 native-approved/g)
      ?.length,
    6,
  );
});

test("M4B Chinese review workbook and pending decision sheet cover 69 URLs", async () => {
  const workbook = await readFile(
    path.resolve(
      "docs/reviews/multilingual/zh-native-review-workbook-20260729.md",
    ),
    "utf8",
  );
  const decisions = await readFile(
    path.resolve(
      "docs/reviews/multilingual/zh-native-review-decisions-20260729.md",
    ),
    "utf8",
  );
  const rows = parseNativeReviewDecisions(decisions);
  const expectedUrls = multilingualPublicationManifest
    .filter((entry) => entry.locale === "zh")
    .map((entry) => entry.localizedUrl);
  assert.equal(rows.length, 69);
  assert.deepEqual(
    validateNativeReviewDecisions({
      rows,
      locale: "zh",
      expectedUrls,
    }),
    [],
  );
  assert.ok(rows.every((row) => row.decision === "pending"));
  assert.ok(rows.every((row) => !row.reviewer && !row.reviewDate));
  for (const url of expectedUrls) {
    assert.match(workbook, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.equal(workbook.match(/\| 人工审核结论 \|  \|/g)?.length, 69);
  assert.equal(workbook.match(/\| 审核人 \|  \|/g)?.length, 69);
  assert.equal(workbook.match(/\| 审核日期 \|  \|/g)?.length, 69);
});

test("M4C pending-language workbooks and decision sheets cover 276 URLs", async () => {
  for (const locale of ["de", "es", "vi", "fa"] as const) {
    const workbook = await readFile(
      path.resolve(
        `docs/reviews/multilingual/${locale}-native-review-workbook-20260729.md`,
      ),
      "utf8",
    );
    const decisions = await readFile(
      path.resolve(
        `docs/reviews/multilingual/${locale}-native-review-decisions-20260729.md`,
      ),
      "utf8",
    );
    const rows = parseNativeReviewDecisions(decisions);
    const expectedUrls = multilingualPublicationManifest
      .filter((entry) => entry.locale === locale)
      .map((entry) => entry.localizedUrl);
    assert.equal(rows.length, 69);
    assert.deepEqual(
      validateNativeReviewDecisions({
        rows,
        locale,
        expectedUrls,
      }),
      [],
    );
    assert.ok(rows.every((row) => row.decision === "pending"));
    assert.ok(
      rows.every(
        (row) =>
          !row.reviewer &&
          !row.reviewDate &&
          !row.notes,
      ),
    );
    for (const url of expectedUrls) {
      assert.match(
        workbook,
        new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
    }
    assert.equal(
      workbook.match(/\| Human review decision \|  \|/g)?.length,
      69,
    );
    assert.equal(workbook.match(/\| Reviewer \|  \|/g)?.length, 69);
    assert.equal(workbook.match(/\| Review date \|  \|/g)?.length, 69);
  }
});

test("M4B/M4C review import rejects unsupported approvals and preserves other locales", () => {
  const zhUrls = multilingualPublicationManifest
    .filter((entry) => entry.locale === "zh")
    .map((entry) => entry.localizedUrl);
  const pendingRows = zhUrls.map((localizedUrl) => ({
    localizedUrl,
    decision: "pending" as const,
    reviewer: "",
    reviewDate: "",
    notes: "",
  }));
  const invalidApproval = [
    { ...pendingRows[0], decision: "approved" as const },
    ...pendingRows.slice(1),
  ];
  assert.ok(
    validateNativeReviewDecisions({
      rows: invalidApproval,
      locale: "zh",
      expectedUrls: zhUrls,
    }).some((error) => error.includes("requires a real reviewer")),
  );

  const existing: NativeReviewEvidenceOverride[] = [
    {
      localizedUrl: "https://dualcorelink.com/ar/about/",
      locale: "ar",
      nativeReviewStatus: "approved",
      nativeReviewer: "Real Arabic Reviewer",
      nativeReviewDate: "2026-07-29",
      nativeReviewNotes: "Documented external review.",
      productionReleaseReady: true,
    },
  ];
  const merged = mergeNativeReviewEvidence({
    existing,
    locale: "zh",
    rows: pendingRows,
    technicalValidationPassed: true,
  });
  assert.deepEqual(merged, existing);

  const completedRows = [
    {
      ...pendingRows[0],
      decision: "changes_required" as const,
      reviewer: "Real Chinese Reviewer",
      reviewDate: "2026-07-29",
      notes: "Revise the indicated terminology before approval.",
    },
    {
      ...pendingRows[1],
      decision: "approved" as const,
      reviewer: "Real Chinese Reviewer",
      reviewDate: "2026-07-29",
      notes: "Reviewed against the English fact source.",
    },
    ...pendingRows.slice(2),
  ];
  assert.deepEqual(
    validateNativeReviewDecisions({
      rows: completedRows,
      locale: "zh",
      expectedUrls: zhUrls,
    }),
    [],
  );
  const completed = mergeNativeReviewEvidence({
    existing,
    locale: "zh",
    rows: completedRows,
    technicalValidationPassed: true,
  });
  assert.equal(
    completed.find(
      (entry) => entry.localizedUrl === completedRows[0].localizedUrl,
    )?.productionReleaseReady,
    false,
  );
  assert.equal(
    completed.find(
      (entry) => entry.localizedUrl === completedRows[1].localizedUrl,
    )?.productionReleaseReady,
    true,
  );
  assert.ok(completed.some((entry) => entry.locale === "ar"));
});

test("M4C apply command supports each manifest locale and stays decision-file scoped", async () => {
  const packageJson = JSON.parse(
    await readFile(path.resolve("package.json"), "utf8"),
  ) as { scripts?: Record<string, string> };
  assert.equal(
    packageJson.scripts?.["multilingual:apply-native-review"],
    "tsx scripts/apply-native-review.ts",
  );
  const importer = await readFile(
    path.resolve("scripts/apply-native-review.ts"),
    "utf8",
  );
  for (const locale of multilingualLocales) {
    assert.match(importer, new RegExp(`"${locale}"`));
  }
  assert.match(
    importer,
    /docs\/reviews\/multilingual\/\$\{locale\}-native-review-decisions-20260729\.md/,
  );
  assert.match(
    importer,
    /const batchNames = batchName \? \[batchName\] : \["p0", "p1", "remaining-final"\]/,
  );
  assert.match(importer, /path\.resolve\(batch\.decisionFile\)/);
  assert.match(importer, /validateNativeReviewBatchDecisions/);
  assert.match(importer, /mergeNativeReviewBatchRows/);
  assert.match(importer, /preserved other-locale overrides/);
});

test("M4C decision validation rejects unknown, duplicate and wrong-locale rows", () => {
  const arUrls = multilingualPublicationManifest
    .filter((entry) => entry.locale === "ar")
    .map((entry) => entry.localizedUrl);
  const rows = arUrls.map((localizedUrl) => ({
    localizedUrl,
    decision: "pending" as const,
    reviewer: "",
    reviewDate: "",
    notes: "",
  }));
  const wrongLocale = [
    {
      ...rows[0],
      localizedUrl: multilingualPublicationManifest.find(
        (entry) => entry.locale === "de",
      )!.localizedUrl,
    },
    ...rows.slice(1),
  ];
  assert.ok(
    validateNativeReviewDecisions({
      rows: wrongLocale,
      locale: "ar",
      expectedUrls: arUrls,
    }).some((error) => error.includes("unexpected ar URL")),
  );

  const duplicate = [rows[0], rows[0], ...rows.slice(2)];
  assert.ok(
    validateNativeReviewDecisions({
      rows: duplicate,
      locale: "ar",
      expectedUrls: arUrls,
    }).some((error) => error.includes("duplicate decision URL")),
  );
});

test("the reviewed Chinese release batch is substantive and not an English shell", () => {
  const allText = localizedPublicationPages.map((page) => ({
    locale: page.locale,
    slug: page.slug,
    text: JSON.stringify(page.content),
  }));
  for (const page of allText) {
    assert.ok(page.text.length > 1200, `${page.locale}:${page.slug}`);
    const targetEvidence =
      page.locale === "ar" || page.locale === "fa"
        ? page.text.match(/[\u0600-\u06ff]/g)?.length ?? 0
        : page.locale === "zh"
          ? page.text.match(/[\u3400-\u9fff]/g)?.length ?? 0
          : page.locale === "vi"
            ? page.text.match(/[ăâđêôơưà-ỹ]/gi)?.length ?? 0
            : page.text.match(
                  page.locale === "de"
                    ? /\b(?:der|die|das|und|für|mit|Projekt|Zimmer)\b/gi
                    : /\b(?:el|la|los|las|de|para|con|proyecto|habitación)\b/gi,
                )?.length ?? 0;
    assert.ok(
      targetEvidence >
        (page.locale === "de" || page.locale === "es"
          ? 20
          : page.locale === "vi"
            ? 35
            : 120),
      `${page.locale}:${page.slug}`,
    );
  }
});

test("canonical and hreflang are self-consistent and reference only published pages", () => {
  for (const page of localizedPublicationPages) {
    const languages = getPublicationHreflang(page.path);
    assert.equal(languages[page.locale], page.localizedUrl);
    assert.equal(languages.en, page.sourceUrl);
    assert.equal(languages["x-default"], page.sourceUrl);
  }
  const shared = getPublicationHreflang("about");
  assert.ok(shared.zh);
  assert.ok(shared.ar);
  assert.equal(shared.de, undefined);
  assert.equal(shared.es, undefined);
  assert.equal(shared.vi, undefined);
  assert.equal(shared.fa, undefined);
});

test("navigation exposes only released localized paths", () => {
  for (const localizedUrl of zhReviewedReleaseUrls) {
    const pathname = new URL(localizedUrl).pathname;
    const contentPath = pathname.replace(/^\/zh\/|\/$/g, "");
    assert.equal(isReleasedLocalizedPath("zh", contentPath), true);
    assert.deepEqual(getReleasedLocalesForPath(contentPath), ["zh", "ar", "vi"]);
    assert.equal(
      buildPublishedNavigationHref("zh", contentPath),
      pathname,
    );
    assert.equal(isReleasedLocalizedPath("ar", contentPath), true);
    assert.equal(
      buildPublishedNavigationHref("ar", contentPath),
      pathname.replace("/zh/", "/ar/"),
    );
    assert.equal(isReleasedLocalizedPath("vi", contentPath), true);
    assert.equal(
      buildPublishedNavigationHref("vi", contentPath),
      pathname.replace("/zh/", "/vi/"),
    );
    for (const locale of ["de", "es", "fa"]) {
      assert.equal(isReleasedLocalizedPath(locale, contentPath), false);
      assert.equal(
        buildPublishedNavigationHref(locale, contentPath),
        `/en/${contentPath}/`,
      );
    }
  }

  assert.deepEqual(getReleasedLocalesForPath("regions"), ["zh", "ar", "vi"]);
  assert.equal(
    buildPublishedNavigationHref("zh", "regions"),
    "/zh/regions/",
  );
  assert.deepEqual(
    getReleasedLocalesForPath("products/hotel-ceiling-background-speaker"),
    ["zh", "ar", "vi"],
  );
  assert.equal(
    buildPublishedNavigationHref(
      "zh",
      "products/hotel-ceiling-background-speaker",
    ),
    "/zh/products/hotel-ceiling-background-speaker/",
  );
});

test("localized page lookup exposes all Chinese, Arabic, and Vietnamese pages but no pending language", () => {
  assert.ok(getLocalizedPublicationPage("ar", "region", "uae"));
  assert.ok(
    getLocalizedPublicationPage(
      "zh",
      "product",
      "smart-four-key-scene-control-panel",
    ),
  );
  assert.ok(getLocalizedPublicationPage("zh", "region", "uae"));
  assert.equal(getLocalizedPublicationPage("de", "region", "uae"), undefined);
  assert.equal(
    getLocalizedPublicationPage("es", "resource", "hotel-rcu-buying-guide"),
    undefined,
  );
  assert.ok(
    getLocalizedPublicationPage("vi", "product", "rcu-controller-cabinet"),
  );
  assert.equal(
    getLocalizedPublicationPage("fa", "solution", "rcu-room-control-solution"),
    undefined,
  );
  assert.equal(
    getLocalizedPublicationPage(
      "ar",
      "region",
      "unpublished-market",
    ),
    undefined,
  );
});

test("all reviewed Chinese, Arabic, and Vietnamese pages are served while pending locales retain redirects", async () => {
  const nginx = await readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
  const localePattern = legacyLocales.join("|");
  assert.match(nginx, new RegExp(`\\(\\?:${localePattern}\\)`));
  assert.match(
    nginx,
    /return 301 https:\/\/dualcorelink\.com\/en\$legacy_path\//,
  );
  assert.match(
    nginx,
    /Native-reviewed multilingual release batches: all 69 Chinese, 69 Arabic, and 69 Vietnamese content URLs\./,
  );
  assert.match(nginx, /\^\/\(\?<reviewed_locale>zh\|ar\|vi\)\/\(\?<reviewed_path>about\|contact\|faqs/);
  assert.match(
    nginx,
    /try_files \/\$reviewed_locale\/\$reviewed_path\/index\.html =404;/,
  );
  assert.match(
    nginx,
    /\^\/\(\?<reviewed_rsc_locale>zh\|ar\|vi\)\/\(\?<reviewed_rsc_path>about\|contact\|faqs/,
  );
  assert.match(
    nginx,
    /try_files \/\$reviewed_rsc_locale\/\$reviewed_rsc_path\/index\.txt =404;/,
  );
  assert.ok(
    nginx.indexOf("?<reviewed_rsc_path>") <
      nginx.indexOf(
        "?<legacy_path>",
        nginx.indexOf("?<reviewed_rsc_path>"),
      ),
    "approved multilingual RSC payloads must be matched before legacy locale redirects",
  );
  assert.doesNotMatch(nginx, /reviewed_rsc_path[^\n]*_rsc/);
  const rscLocationLine = nginx
    .split(/\r?\n/)
    .find((line) => line.includes("?<reviewed_rsc_path>"));
  assert.ok(rscLocationLine, "approved multilingual RSC location must exist");
  const rscLocationPattern = rscLocationLine
    .trim()
    .replace(/^location ~ /, "")
    .replace(/ \{$/, "");
  const approvedRscMatcher = new RegExp(rscLocationPattern);
  for (const localizedUrl of [...zhReviewedReleaseUrls, ...arReviewedReleaseUrls, ...viReviewedReleaseUrls]) {
    assert.match(`${new URL(localizedUrl).pathname}index.txt`, approvedRscMatcher);
  }
  assert.doesNotMatch(
    "/zh/resources/unpublished-resource/index.txt",
    approvedRscMatcher,
  );
  assert.match("/ar/about/index.txt", approvedRscMatcher);
  assert.match("/vi/about/index.txt", approvedRscMatcher);
  assert.match(nginx, /hotel-smart-room-rcu-host-1/);
  assert.match(nginx, /smart-hotel-automation-solution/);
  assert.match(nginx, /\^\/\(\?:ar\|zh\|de\|es\|vi\|fa\)\//);
  assert.match(nginx, /\(\?:zh\|de\|es\|ar\|vi\|fa\)/);
});
