import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  indexableLocales,
  locales,
  visibleLocales,
} from "../src/config/i18n";
import { localizedFileContent } from "../src/content/locales";
import { cmsTranslationImportPayload } from "../src/content/locales/cms-import";
import { checkMultilingualProductionRelease } from "../src/lib/multilingual-release";
import { getMultilingualReleaseBatch } from "../src/lib/multilingual-release-batches";
import { multilingualPublicationManifest } from "../src/lib/multilingual-publication-manifest";

function argumentValue(name: string): string | undefined {
  return process.argv
    .find((value) => value.startsWith(`--${name}=`))
    ?.slice(name.length + 3);
}

function hasArgument(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

async function main() {
  const locale = argumentValue("locale");
  const batch = argumentValue("batch");
  const allowOwnerWaiver = hasArgument("allow-owner-waiver");
  if (Boolean(locale) !== Boolean(batch)) {
    throw new Error("--locale and --batch must be provided together");
  }
  const releaseBatch =
    locale && batch
      ? getMultilingualReleaseBatch(locale, batch)
      : undefined;
  if (allowOwnerWaiver && !releaseBatch?.ownerReviewWaiver) {
    throw new Error(
      "--allow-owner-waiver is supported only for the approved ar:p0 batch",
    );
  }
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
    releaseScopeUrls: releaseBatch?.localizedUrls,
    ownerReviewWaiver: allowOwnerWaiver
      ? releaseBatch?.ownerReviewWaiver
      : undefined,
  });

  console.log(
    `[multilingual:release-check] scope=${releaseBatch ? `${releaseBatch.locale}:${releaseBatch.batch}` : "full"}`,
  );
  console.log(
    `[multilingual:release-check] candidates=${result.candidateCount} production-ready=${result.productionReleaseReadyCount}`,
  );
  console.log(
    `[multilingual:release-check] owner-waiver-approved=${result.ownerReviewWaiverApprovedCount} release-eligible=${result.releaseEligibleCount}`,
  );
  console.log(
    `[multilingual:release-check] CMS payloads=${result.cmsPayloadCount} structurally-ready=${result.cmsPayloadStructurallyReadyCount} native-approved=${result.cmsPayloadNativeApprovedCount}`,
  );
  console.log(
    `[multilingual:release-check] technical-validation=${result.technicalValidationPassed ? "passed" : "failed"}`,
  );
  for (const warning of result.warnings) {
    console.warn(`[multilingual:release-check] ${warning}`);
  }

  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(`[multilingual:release-check] blocked: ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("[multilingual:release-check] passed");
}

main().catch((error: unknown) => {
  console.error("[multilingual:release-check] failed", error);
  process.exitCode = 1;
});
