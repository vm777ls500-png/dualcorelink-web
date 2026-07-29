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
import { multilingualPublicationManifest } from "../src/lib/multilingual-publication-manifest";

async function main() {
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

  console.log(
    `[multilingual:release-check] candidates=${result.candidateCount} production-ready=${result.productionReleaseReadyCount}`,
  );
  console.log(
    `[multilingual:release-check] CMS payloads=${result.cmsPayloadCount} structurally-ready=${result.cmsPayloadStructurallyReadyCount} native-approved=${result.cmsPayloadNativeApprovedCount}`,
  );
  console.log(
    `[multilingual:release-check] technical-validation=${result.technicalValidationPassed ? "passed" : "failed"}`,
  );

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
