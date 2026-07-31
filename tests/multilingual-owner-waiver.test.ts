import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { indexableLocales, locales, visibleLocales } from "../src/config/i18n";
import { localizedFileContent } from "../src/content/locales";
import { arCmsImportPayload, cmsTranslationImportPayload } from "../src/content/locales/cms-import";
import {
  arabicP0OwnerReviewWaiver,
  arabicP0OwnerReviewWaiverUrls,
} from "../src/content/locales/owner-review-waivers";
import { auditMultilingualFoundation } from "../src/lib/multilingual-audit";
import {
  multilingualPublicationManifest,
  type MultilingualPublicationEntry,
} from "../src/lib/multilingual-publication-manifest";
import { checkMultilingualProductionRelease } from "../src/lib/multilingual-release";
import { getMultilingualReleaseBatch } from "../src/lib/multilingual-release-batches";

const expectedWarning =
  "WARNING: Arabic P0 was released under owner review waiver and was not approved by an independent native Arabic reviewer.";

async function nginxConfig(): Promise<string> {
  return readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
}

function releaseInput(config: string) {
  return {
    manifest: multilingualPublicationManifest,
    localContent: localizedFileContent,
    cmsTranslations: cmsTranslationImportPayload,
    configuredLocales: locales,
    visibleLocales,
    indexableLocales,
    nginxConfig: config,
  };
}

test("Arabic P0 owner waiver remains distinct from native review approval", () => {
  const waived = multilingualPublicationManifest.filter(
    (entry) => entry.ownerReviewWaiverStatus === "approved",
  );
  assert.equal(waived.length, 15);
  assert.deepEqual(
    waived.map((entry) => entry.localizedUrl).sort(),
    [...arabicP0OwnerReviewWaiverUrls].sort(),
  );
  for (const entry of waived) {
    assert.equal(entry.locale, "ar");
    assert.equal(entry.nativeReviewStatus, "pending");
    assert.equal(entry.nativeReviewer, null);
    assert.equal(entry.nativeReviewDate, null);
    assert.equal(entry.productionReleaseReady, false);
    assert.equal(entry.ownerReviewWaiverBy, "Allan");
    assert.equal(entry.ownerReviewWaiverDate, "2026-07-31");
    assert.equal(
      entry.ownerReviewWaiverReason,
      arabicP0OwnerReviewWaiver.reason,
    );
  }
});

test("Arabic P0 release check requires the explicit owner-waiver option", async () => {
  const config = await nginxConfig();
  const withoutWaiver = checkMultilingualProductionRelease({
    ...releaseInput(config),
    releaseScopeUrls: arabicP0OwnerReviewWaiverUrls,
  });
  assert.equal(withoutWaiver.candidateCount, 15);
  assert.equal(withoutWaiver.ownerReviewWaiverApprovedCount, 0);
  assert.equal(withoutWaiver.releaseEligibleCount, 0);
  assert.equal(withoutWaiver.pendingUrls.length, 15);
  assert.ok(
    withoutWaiver.errors.some((error) =>
      error.includes("native review pending"),
    ),
  );

  const batch = getMultilingualReleaseBatch("ar", "p0");
  assert.ok(batch.ownerReviewWaiver);
  const withWaiver = checkMultilingualProductionRelease({
    ...releaseInput(config),
    releaseScopeUrls: batch.localizedUrls,
    ownerReviewWaiver: batch.ownerReviewWaiver,
  });
  assert.equal(withWaiver.technicalValidationPassed, true);
  assert.equal(withWaiver.candidateCount, 15);
  assert.equal(withWaiver.ownerReviewWaiverApprovedCount, 15);
  assert.equal(withWaiver.productionReleaseReadyCount, 0);
  assert.equal(withWaiver.releaseEligibleCount, 15);
  assert.equal(withWaiver.cmsPayloadCount, 6);
  assert.equal(withWaiver.cmsPayloadNativeApprovedCount, 0);
  assert.deepEqual(withWaiver.pendingUrls, []);
  assert.deepEqual(withWaiver.warnings, [expectedWarning]);
  assert.deepEqual(withWaiver.errors, []);
});

test("owner waiver cannot spread beyond the exact Arabic P0 scope", async () => {
  const config = await nginxConfig();
  const batch = getMultilingualReleaseBatch("ar", "p0");
  assert.ok(batch.ownerReviewWaiver);

  const tooFew = checkMultilingualProductionRelease({
    ...releaseInput(config),
    releaseScopeUrls: batch.localizedUrls.slice(0, 14),
    ownerReviewWaiver: batch.ownerReviewWaiver,
  });
  assert.ok(
    tooFew.errors.some((error) =>
      error.includes("owner waiver URL is missing from scope"),
    ),
  );

  const extraArabicUrl = multilingualPublicationManifest.find(
    (entry) =>
      entry.locale === "ar" &&
      entry.priority !== "P0" &&
      !batch.localizedUrls.some((url) => url === entry.localizedUrl),
  )?.localizedUrl;
  assert.ok(extraArabicUrl);
  const tooMany = checkMultilingualProductionRelease({
    ...releaseInput(config),
    releaseScopeUrls: [...batch.localizedUrls, extraArabicUrl],
    ownerReviewWaiver: batch.ownerReviewWaiver,
  });
  assert.ok(
    tooMany.errors.some((error) =>
      error.includes("release scope exceeds owner waiver"),
    ),
  );
  assert.equal(getMultilingualReleaseBatch("zh", "p0").ownerReviewWaiver, undefined);
  assert.throws(
    () => getMultilingualReleaseBatch("ar", "p1"),
    /Unsupported multilingual release batch/,
  );
});

test("waiver reviewer/date mismatch and native-approval masquerading fail", async () => {
  const config = await nginxConfig();
  const batch = getMultilingualReleaseBatch("ar", "p0");
  assert.ok(batch.ownerReviewWaiver);
  const mismatchedPolicy = {
    ...batch.ownerReviewWaiver,
    by: "Other",
    date: "2026-08-01",
  };
  const mismatch = checkMultilingualProductionRelease({
    ...releaseInput(config),
    releaseScopeUrls: batch.localizedUrls,
    ownerReviewWaiver: mismatchedPolicy,
  });
  assert.ok(
    mismatch.errors.some((error) =>
      error.includes("does not match Allan's approved 2026-07-31"),
    ),
  );

  const firstWaivedUrl = arabicP0OwnerReviewWaiverUrls[0];
  const masqueradingManifest: MultilingualPublicationEntry[] =
    multilingualPublicationManifest.map((entry) =>
      entry.localizedUrl === firstWaivedUrl
        ? {
            ...entry,
            nativeReviewStatus: "approved",
            nativeReviewer: "Allan",
            nativeReviewDate: "2026-07-31",
            productionReleaseReady: true,
          }
        : entry,
    );
  const audit = auditMultilingualFoundation({
    ...releaseInput(config),
    manifest: masqueradingManifest,
  });
  assert.ok(
    audit.errors.some((error) =>
      error.includes("owner waiver must remain independent from native approval"),
    ),
  );
});

test("full-site release check still blocks all non-native-approved pages", async () => {
  const result = checkMultilingualProductionRelease({
    ...releaseInput(await nginxConfig()),
  });
  assert.equal(result.ownerReviewWaiverApprovedCount, 0);
  assert.equal(result.productionReleaseReadyCount, 12);
  assert.equal(result.pendingUrls.length, 402);
  assert.ok(result.errors.some((error) => error.includes("12/414")));
});

test("Arabic P0 uses the owner-selected RCU Host terminology without changing facts", () => {
  const host = arCmsImportPayload.find(
    (entry) => entry.sourceEnglishSlug === "hotel-smart-room-rcu-host-1",
  );
  assert.ok(host);
  assert.match(
    host.translatedTitle,
    /وحدة RCU رئيسية للتحكم \(RCU Host\)/,
  );
  assert.match(
    host.translatedStructuredContent.h1,
    /وحدة RCU رئيسية للتحكم \(RCU Host\)/,
  );
  assert.match(
    host.translatedStructuredContent.introduction,
    /وحدة RCU رئيسية للتحكم \(RCU Host\)/,
  );
  assert.equal(host.sourceEnglishContentId, 48);
  assert.equal(host.sourceEnglishSlug, "hotel-smart-room-rcu-host-1");
  assert.equal(host.locale, "ar");
  assert.doesNotMatch(JSON.stringify(arCmsImportPayload), /مضيف RCU/);
});
