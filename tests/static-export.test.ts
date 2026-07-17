import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
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
  const otherLocale = path.join(
    temporaryRoot,
    "de",
    "products",
    emptyStaticExportSlug,
  );

  try {
    for (const directory of [
      productSentinel,
      solutionSentinel,
      realProduct,
      otherLocale,
    ]) {
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, "index.html"), "ok");
    }

    await cleanStaticExport(englishRoot);

    await assert.rejects(readFile(path.join(productSentinel, "index.html")));
    await assert.rejects(readFile(path.join(solutionSentinel, "index.html")));
    assert.equal(await readFile(path.join(realProduct, "index.html"), "utf8"), "ok");
    assert.equal(await readFile(path.join(otherLocale, "index.html"), "utf8"), "ok");
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
});
