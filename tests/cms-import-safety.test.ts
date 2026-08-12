import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { buildSourceRepository, loadFixture } from "../scripts/cms-import/fixture";
import {
  ImportEngine,
  ImportFailure,
  MemoryRunStore,
  canonicalJson,
  fieldDiff,
  mapPayloadRecord,
  preflight,
  renderStructuredContent,
  sha256,
} from "../scripts/cms-import/model";

test("fixture is exactly the approved seven-record Chinese P0 payload", async () => {
  const payload = await loadFixture();
  assert.equal(payload.length, 7);
  assert.deepEqual(
    payload.map((record) => record.sourceEnglishContentId),
    [48, 47, 6, 222, 142, 140, 138],
  );
  assert.ok(
    payload.every(
      (record) =>
        record.locale === "zh" &&
        record.batch === "p0" &&
        record.nativeReviewer === "Allan" &&
        record.nativeReviewDate === "2026-07-29" &&
        record.productionReleaseReady,
    ),
  );
});

test("fixture canonical SHA-256 is stable", async () => {
  assert.equal(
    sha256(await loadFixture()),
    "592038dec549e494252bc1d3c5db6a98868386670588100d6630701ddb6b45ff",
  );
});

test("preflight is read-only and maps seven records", async () => {
  const payload = await loadFixture();
  const repository = buildSourceRepository(payload);
  const before = canonicalJson(repository);
  const result = preflight(payload, repository);
  assert.equal(result.mapped.length, 7);
  assert.equal(canonicalJson(repository), before);
});

test("renderer produces deterministic escaped HTML", async () => {
  const payload = await loadFixture();
  const first = renderStructuredContent(payload[0]);
  const second = renderStructuredContent(payload[0]);
  assert.equal(first, second);
  assert.match(first, /<h1>/);
  assert.doesNotMatch(first, /<script/i);
});

test("product and solution use distinct explicit ACF maps", async () => {
  const payload = await loadFixture();
  const hash = sha256(payload);
  const product = mapPayloadRecord(payload[0], hash);
  const solution = mapPayloadRecord(payload[4], hash);
  assert.ok("product_technical_specs" in product.acf);
  assert.ok(!("solution_architecture" in solution.acf));
  assert.ok("solution_summary" in solution.acf);
});

test("apply creates drafts and repeat payload is unchanged", async () => {
  const payload = await loadFixture();
  const repository = buildSourceRepository(payload);
  const runs = new MemoryRunStore();
  const engine = new ImportEngine(repository, runs);
  const first = engine.apply(payload, "tsx-idempotent-1", {
    confirmRunId: "tsx-idempotent-1",
  });
  const second = engine.apply(payload, "tsx-idempotent-2", {
    confirmRunId: "tsx-idempotent-2",
  });
  assert.equal(first.operations.length, 7);
  assert.equal(second.operations.filter((operation) => operation.operation === "unchanged").length, 7);
  assert.equal(repository.localized.size, 7);
});

test("changed record requires allow-update and exposes field diff", async () => {
  const payload = await loadFixture();
  const repository = buildSourceRepository(payload);
  const engine = new ImportEngine(repository, new MemoryRunStore());
  engine.apply(payload, "tsx-update-1", { confirmRunId: "tsx-update-1" });
  const changed = structuredClone(payload);
  changed[0].translatedTitle += " 修订";
  assert.throws(
    () =>
      engine.apply(changed, "tsx-update-2", {
        confirmRunId: "tsx-update-2",
      }),
    ImportFailure,
  );
  const updated = engine.apply(changed, "tsx-update-3", {
    confirmRunId: "tsx-update-3",
    allowUpdate: true,
  });
  assert.equal(updated.operations.filter((operation) => operation.operation === "updated").length, 7);
  assert.ok(Object.keys(updated.operations[0].diff).length > 0);
});

test("verify, publish and rollback enforce the command sequence", async () => {
  const payload = await loadFixture();
  const repository = buildSourceRepository(payload);
  const engine = new ImportEngine(repository, new MemoryRunStore());
  engine.apply(payload, "tsx-lifecycle", { confirmRunId: "tsx-lifecycle" });
  assert.throws(
    () => engine.publish("tsx-lifecycle", "tsx-lifecycle"),
    ImportFailure,
  );
  engine.verify("tsx-lifecycle");
  engine.publish("tsx-lifecycle", "tsx-lifecycle");
  assert.equal(
    [...repository.localized.values()].filter((record) => record.status === "publish").length,
    7,
  );
  engine.rollback("tsx-lifecycle", "tsx-lifecycle");
  assert.equal(
    [...repository.localized.values()].filter((record) => record.status === "draft").length,
    7,
  );
});

test("field diff is deterministic and field-level", () => {
  assert.deepEqual(fieldDiff({ a: { b: 1 } }, { a: { b: 2 } }), {
    "a.b": { before: 1, after: 2 },
  });
});

test("plugin entry is guarded by WP_CLI and has no REST write route", async () => {
  const entry = await readFile(
    path.join(
      process.cwd(),
      "infra/wordpress/plugins/dualcorelink-multilingual-import-cli/dualcorelink-multilingual-import-cli.php",
    ),
    "utf8",
  );
  assert.match(entry, /defined\('WP_CLI'\) && WP_CLI/);
  assert.doesNotMatch(entry, /register_rest_route/);
});

test("WordPress repository uses Core and ACF APIs without direct SQL", async () => {
  const repository = await readFile(
    path.join(
      process.cwd(),
      "infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/class-wordpress-repository.php",
    ),
    "utf8",
  );
  assert.match(repository, /wp_insert_post/);
  assert.match(repository, /wp_update_post/);
  assert.match(repository, /update_field/);
  assert.doesNotMatch(repository, /\$wpdb/);
});

test("WordPress repository validates a complete write plan before wp_insert_post", async () => {
  const repository = await readFile(
    path.join(
      process.cwd(),
      "infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/class-wordpress-repository.php",
    ),
    "utf8",
  );
  const createStart = repository.indexOf("public function create");
  const createEnd = repository.indexOf("public function update", createStart);
  const createMethod = repository.slice(createStart, createEnd);
  assert.ok(createMethod.indexOf("validate_write_plan") >= 0);
  assert.ok(
    createMethod.indexOf("validate_write_plan") <
      createMethod.indexOf("wp_insert_post"),
  );
  assert.match(repository, /meta_keys_for\(\$locale, \$batch\)/);
});

test("payload schema preserves review controls for every supported import batch", async () => {
  const schema = JSON.parse(
    await readFile(
      path.join(
        process.cwd(),
        "infra/wordpress/plugins/dualcorelink-multilingual-import-cli/schema/payload.schema.json",
      ),
      "utf8",
    ),
  ) as { items: { allOf: unknown[] } };
  assert.equal(schema.items.allOf.length, 6);
  assert.match(JSON.stringify(schema.items.allOf), /ownerReviewWaiverStatus/);
  assert.match(JSON.stringify(schema.items.allOf), /nativeReviewStatus/);
  assert.match(JSON.stringify(schema.items.allOf), /2026-08-02/);
  assert.match(JSON.stringify(schema.items.allOf), /2026-08-03/);
  assert.match(JSON.stringify(schema.items.allOf), /2026-08-11/);
  assert.match(JSON.stringify(schema.items.allOf), /remaining-final/);
  assert.match(
    JSON.stringify(schema.items.allOf),
    /"locale":\{"const":"vi"\}.*"batch":\{"const":"remaining-final"\}/,
  );
  assert.equal(schema.maxItems, 42);
});

test("ordinary build command contains no CMS import side effect", async () => {
  const packageJson = JSON.parse(
    await readFile(path.join(process.cwd(), "package.json"), "utf8"),
  ) as { scripts: Record<string, string> };
  assert.doesNotMatch(packageJson.scripts.build, /cms-import/);
  assert.match(packageJson.scripts["cms-import:fixture-preflight"], /fixture-preflight/);
});
