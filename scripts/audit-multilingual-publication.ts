import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  indexableLocales,
  locales,
  visibleLocales,
} from "../src/config/i18n";
import { localizedFileContent } from "../src/content/locales";
import { auditMultilingualFoundation } from "../src/lib/multilingual-audit";
import { cmsTranslationImportPayload } from "../src/content/locales/cms-import";
import {
  multilingualLocales,
  multilingualPublicationManifest,
} from "../src/lib/multilingual-publication-manifest";

async function main() {
  const nginxConfig = await readFile(
    path.resolve("deploy/nginx/dualcorelink.com.conf.template"),
    "utf8",
  );
  const result = auditMultilingualFoundation({
    manifest: multilingualPublicationManifest,
    localContent: localizedFileContent,
    cmsTranslations: cmsTranslationImportPayload,
    configuredLocales: locales,
    visibleLocales,
    indexableLocales,
    nginxConfig,
  });

  console.log(
    `[multilingual:audit] manifest ${result.manifestCount}; expected 414`,
  );
  for (const locale of multilingualLocales) {
    console.log(
      `[multilingual:audit] ${locale}: ${result.perLocaleCount[locale]}`,
    );
  }
  console.log(
    `[multilingual:audit] eligible static=${result.staticExportEligibleCount} sitemap=${result.sitemapEligibleCount} hreflang=${result.hreflangEligibleCount}`,
  );
  console.log(
    `[multilingual:audit] native-review-pending=${result.nativeReviewPendingCount} production-ready=${result.productionReleaseReadyCount}`,
  );
  for (const warning of result.warnings) {
    console.warn(`[multilingual:audit] warning: ${warning}`);
  }
  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(`[multilingual:audit] error: ${error}`);
    }
    process.exitCode = 1;
    return;
  }
  console.log("[multilingual:audit] passed");
}

main().catch((error: unknown) => {
  console.error("[multilingual:audit] failed", error);
  process.exitCode = 1;
});
