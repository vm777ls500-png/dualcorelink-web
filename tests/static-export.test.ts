import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { legacyLocales } from "../src/config/i18n";
import { resources } from "../src/config/resources";
import { emptyStaticExportSlug } from "../src/lib/routing/static-export";
import { cleanStaticExport } from "../scripts/clean-static-export";

const projectRoot = path.resolve(process.cwd());

test("static export cleanup removes only collection sentinels", async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "dcl-export-clean-"));
  const englishRoot = path.join(temporaryRoot, "en");
  const productSentinel = path.join(
    englishRoot,
    "products",
    emptyStaticExportSlug,
  );
  const solutionSentinel = path.join(
    englishRoot,
    "solutions",
    emptyStaticExportSlug,
  );
  const realProduct = path.join(englishRoot, "products", "real-product");
  const retiredLocaleDirectories = legacyLocales.map((locale) =>
    path.join(temporaryRoot, locale),
  );
  const unknownLocale = path.join(temporaryRoot, "fr");

  try {
    for (const directory of [
      productSentinel,
      solutionSentinel,
      realProduct,
      ...retiredLocaleDirectories,
      unknownLocale,
    ]) {
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, "index.html"), "ok");
    }

    await cleanStaticExport(temporaryRoot);

    await assert.rejects(readFile(path.join(productSentinel, "index.html")));
    await assert.rejects(readFile(path.join(solutionSentinel, "index.html")));
    assert.equal(await readFile(path.join(realProduct, "index.html"), "utf8"), "ok");
    for (const directory of retiredLocaleDirectories) {
      await assert.rejects(readFile(path.join(directory, "index.html")));
    }
    assert.equal(
      await readFile(path.join(unknownLocale, "index.html"), "utf8"),
      "ok",
    );
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("static export keeps only the approved Chinese P0 batch", async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "dcl-m5b-clean-"));
  const approvedChineseAbout = path.join(temporaryRoot, "zh", "about");
  const approvedChinese = path.join(
    temporaryRoot,
    "zh",
    "products",
    "smart-four-key-scene-control-panel",
  );
  const blockedArabic = path.join(temporaryRoot, "ar", "about");
  const blockedChinese = path.join(
    temporaryRoot,
    "zh",
    "downloads",
    "unpublished-download",
  );

  try {
    for (const directory of [
      approvedChineseAbout,
      approvedChinese,
      blockedArabic,
      blockedChinese,
    ]) {
      await mkdir(directory, { recursive: true });
      await writeFile(
        path.join(directory, "index.html"),
        '<html lang="en" class="test"><body>ok</body></html>',
      );
    }
    await writeFile(path.join(temporaryRoot, "ar.html"), "retired root");
    await writeFile(path.join(temporaryRoot, "zh.txt"), "retired root");

    await cleanStaticExport(temporaryRoot);

    assert.match(
      await readFile(path.join(approvedChineseAbout, "index.html"), "utf8"),
      /<html lang="zh" dir="ltr"/,
    );
    assert.match(
      await readFile(path.join(approvedChinese, "index.html"), "utf8"),
      /<html lang="zh" dir="ltr"/,
    );
    await assert.rejects(readFile(path.join(blockedArabic, "index.html")));
    await assert.rejects(readFile(path.join(blockedChinese, "index.html")));
    await assert.rejects(readFile(path.join(temporaryRoot, "ar.html")));
    await assert.rejects(readFile(path.join(temporaryRoot, "zh.txt")));
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("static export cleanup CLI reports real failures with a nonzero exit", async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "dcl-export-error-"));
  const invalidOutputRoot = path.join(temporaryRoot, "not-a-directory");
  const tsxCli = path.join(projectRoot, "node_modules", "tsx", "dist", "cli.mjs");
  const script = path.join(projectRoot, "scripts", "clean-static-export.ts");

  try {
    await writeFile(invalidOutputRoot, "file blocks child paths");
    const result = spawnSync(
      process.execPath,
      [tsxCli, script, invalidOutputRoot],
      { cwd: projectRoot, encoding: "utf8" },
    );

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /\[export:clean\] failed/);
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("AWS export baselines include only the approved Chinese P0 batch", async () => {
  const workflow = await readFile(
    path.join(projectRoot, ".github", "workflows", "aws-production-deploy.yml"),
    "utf8",
  );
  const deployScript = await readFile(
    path.join(projectRoot, "deploy", "scripts", "deploy-static.sh"),
    "utf8",
  );

  assert.equal(resources.length, 15);
  assert.match(workflow, /Generating static pages\.\*163\/163/);
  assert.match(
    workflow,
    /- name: Validate data[\s\S]*?- name: Audit product media\s+run: npm run media:audit[\s\S]*?- name: Enforce multilingual production release gate\s+run: npm run multilingual:release-check -- --locale=zh --batch=p0[\s\S]*?- name: Build static export[\s\S]*?- name: Deploy atomic release/,
  );
  const mediaAuditStep = workflow.match(
    /- name: Audit product media\s+run: npm run media:audit/,
  )?.[0];
  assert.ok(mediaAuditStep);
  assert.doesNotMatch(mediaAuditStep, /continue-on-error|\|\| true/);
  assert.match(deployScript, /EXPECTED_RESOURCES:-15/);
  assert.match(deployScript, /EXPECTED_SITEMAP_URLS:-88/);
  assert.match(deployScript, /EXPECTED_AR_PAGES:-0/);
  assert.match(deployScript, /EXPECTED_ZH_PAGES:-12/);
  assert.match(deployScript, /EXPECTED_DE_PAGES:-0/);
  assert.match(deployScript, /EXPECTED_ES_PAGES:-0/);
  assert.match(deployScript, /EXPECTED_VI_PAGES:-0/);
  assert.match(deployScript, /EXPECTED_FA_PAGES:-0/);
  assert.match(deployScript, /EXPECTED_ARTICLES:-15/);
  assert.match(deployScript, /EXPECTED_BREADCRUMBS:-15/);
  assert.match(deployScript, /forbidden environment reference found/);
  assert.match(deployScript, /validate_localized_paths ar/);
  assert.match(deployScript, /validate_localized_paths zh/);
  assert.match(deployScript, /validate_localized_paths de/);
  assert.match(deployScript, /validate_localized_paths es/);
  assert.match(deployScript, /validate_localized_paths vi/);
  assert.match(deployScript, /validate_localized_paths fa/);
});

test("Nginx retires only known legacy locales with verified English targets", async () => {
  const nginx = await readFile(
    path.join(
      projectRoot,
      "deploy",
      "nginx",
      "dualcorelink.com.conf.template",
    ),
    "utf8",
  );
  const localePattern = legacyLocales.join("|");

  assert.deepEqual(legacyLocales, ["zh", "de", "es", "ar", "vi", "fa"]);
  assert.match(nginx, new RegExp(`\\(\\?:${localePattern}\\)`));
  assert.match(
    nginx,
    /if \(-f \$document_root\/en\$legacy_path\/index\.html\)/,
  );
  assert.match(
    nginx,
    /return 301 https:\/\/dualcorelink\.com\/en\$legacy_path\//,
  );
  assert.match(nginx, /return 404/);
  assert.match(
    nginx,
    /location \/ \{\s+return 301 https:\/\/dualcorelink\.com\$request_uri;\s+\}/,
  );
  assert.doesNotMatch(
    nginx,
    /^    return 301 https:\/\/dualcorelink\.com\$request_uri;$/m,
  );
  assert.doesNotMatch(nginx, /location ~ \^\/\.\*.*return 301/);
});

test("Nginx redirects confirmed locale-less GSC URLs to exact English targets", async () => {
  const nginx = await readFile(
    path.join(
      projectRoot,
      "deploy",
      "nginx",
      "dualcorelink.com.conf.template",
    ),
    "utf8",
  );
  const redirectPairs = [
    {
      source: "/solutions/oem-odm-custom-panel-solution/",
      target: "/en/solutions/oem-odm-custom-panel-solution/",
    },
    {
      source: "/resources/hotel-rcu-wiring-system-architecture-guide/",
      target:
        "/en/resources/hotel-rcu-wiring-system-architecture-guide/",
    },
  ];

  for (const { source, target } of redirectPairs) {
    const escapedSource = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedTarget = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactRule = new RegExp(
      [
        `location = ${escapedSource} \\{`,
        `\\s+if \\(-f \\$document_root${escapedTarget}index\\.html\\) \\{`,
        `\\s+return 301 https:\\/\\/dualcorelink\\.com${escapedTarget};`,
        "\\s+\\}",
        "\\s+return 404;",
        "\\s+\\}",
      ].join(""),
      "g",
    );

    assert.equal(
      nginx.match(exactRule)?.length,
      3,
      `Expected exact redirect coverage in all server contexts for ${source}`,
    );
  }

  assert.doesNotMatch(
    nginx,
    /return 301 https:\/\/dualcorelink\.com\/en\/solutions\/;/,
  );
  assert.doesNotMatch(
    nginx,
    /return 301 https:\/\/dualcorelink\.com\/en\/resources\/rcu-wiring-architecture\/;/,
  );
});

test("products listing prerenders crawlable product links before hydration", async () => {
  const productsPage = await readFile(
    path.join(projectRoot, "src", "app", "[locale]", "products", "page.tsx"),
    "utf8",
  );

  assert.match(productsPage, /fallback=\{[\s\S]*?<ContentList/);
  assert.match(productsPage, /items=\{productListItems\}/);
  assert.doesNotMatch(productsPage, /title="Loading products"/);
});

test("priority crawl targets have relevant static solution links", async () => {
  const solutionsPage = await readFile(
    path.join(projectRoot, "src", "app", "[locale]", "solutions", "page.tsx"),
    "utf8",
  );

  for (const [solutionSlug, productSlug] of [
    ["hotel-delivery-robot-solution", "hotel-delivery-robot-charging-dock"],
    ["ai-smart-display-solution", "smart-three-key-music-control-panel"],
    ["oem-odm-custom-panel-solution", "vintage-gold-key-card-energy-saver-panel"],
  ]) {
    const solutionStart = solutionsPage.indexOf(`slug: "${solutionSlug}"`);
    const nextSolution = solutionsPage.indexOf("\n  {\n    slug:", solutionStart + 1);
    const solutionBlock = solutionsPage.slice(
      solutionStart,
      nextSolution === -1 ? undefined : nextSolution,
    );

    assert.notEqual(solutionStart, -1, `Missing solution ${solutionSlug}`);
    assert.match(
      solutionBlock,
      new RegExp(`"${productSlug}"`),
      `Expected ${solutionSlug} to link ${productSlug}`,
    );
  }
});
