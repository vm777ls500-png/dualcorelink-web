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

test("AWS export baselines match the Phase 2G public content counts", async () => {
  const workflow = await readFile(
    path.join(projectRoot, ".github", "workflows", "aws-production-deploy.yml"),
    "utf8",
  );
  const deployScript = await readFile(
    path.join(projectRoot, "deploy", "scripts", "deploy-static.sh"),
    "utf8",
  );

  assert.equal(resources.length, 15);
  assert.match(workflow, /Generating static pages\.\*156\/156/);
  assert.doesNotMatch(workflow, /Generating static pages\.\*155\/155/);
  assert.match(deployScript, /EXPECTED_RESOURCES:-15/);
  assert.match(deployScript, /EXPECTED_SITEMAP_URLS:-76/);
  assert.match(deployScript, /EXPECTED_ARTICLES:-15/);
  assert.match(deployScript, /EXPECTED_BREADCRUMBS:-15/);
  assert.match(deployScript, /forbidden environment reference found/);
  assert.match(deployScript, /for retired_locale in zh de es ar vi fa/);
  assert.match(deployScript, /retired locale artifact found/);
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

test("products listing prerenders crawlable product links before hydration", async () => {
  const productsPage = await readFile(
    path.join(projectRoot, "src", "app", "[locale]", "products", "page.tsx"),
    "utf8",
  );

  assert.match(productsPage, /fallback=\{[\s\S]*?<ContentList/);
  assert.match(productsPage, /items=\{productListItems\}/);
  assert.doesNotMatch(productsPage, /title="Loading products"/);
});
