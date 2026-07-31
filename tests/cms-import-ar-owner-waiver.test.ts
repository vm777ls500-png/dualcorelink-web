import assert from "node:assert/strict";
import test from "node:test";
import {
  arP0CmsSourceIds,
  arP0OwnerWaivedCmsImportPayload,
  arP0OwnerWaiverScopeSha256,
} from "../src/content/locales/cms-import";
import { buildSourceRepository } from "../scripts/cms-import/fixture";
import {
  ImportEngine,
  ImportFailure,
  MemoryRunStore,
  canonicalJson,
  mapPayloadRecord,
  ownerWaiverReason,
  preflight,
  renderStructuredContent,
  sha256,
  type ImportPayloadRecord,
} from "../scripts/cms-import/model";

function payload(): ImportPayloadRecord[] {
  return structuredClone(
    arP0OwnerWaivedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
}

function expectPreflightFailure(
  mutate: (records: ImportPayloadRecord[]) => void,
): void {
  const records = payload();
  mutate(records);
  const repository = buildSourceRepository(records);
  assert.throws(
    () =>
      preflight(records, repository, {
        locale: "ar",
        batch: "p0",
        allowOwnerWaiver: true,
      }),
    ImportFailure,
  );
  assert.equal(repository.localized.size, 0);
}

test("Arabic P0 payload contains the exact six approved source IDs", () => {
  assert.deepEqual(
    payload().map((record) => record.sourceEnglishContentId),
    [...arP0CmsSourceIds],
  );
});

test("Arabic P0 payload preserves pending native review", () => {
  assert.ok(
    payload().every(
      (record) =>
        record.nativeReviewStatus === "pending" &&
        record.nativeReviewer === null &&
        record.nativeReviewDate === null,
    ),
  );
});

test("Arabic P0 owner waiver evidence is exact", () => {
  assert.ok(
    payload().every(
      (record) =>
        record.ownerReviewWaiverStatus === "approved" &&
        record.ownerReviewWaiverBy === "Allan" &&
        record.ownerReviewWaiverDate === "2026-07-31" &&
        record.ownerReviewWaiverReason === ownerWaiverReason &&
        record.ownerReviewWaiverScopeCount === 15 &&
        record.ownerReviewWaiverScopeSha256 ===
          arP0OwnerWaiverScopeSha256,
    ),
  );
});

test("Arabic P0 preflight is read-only and accepts six records", () => {
  const records = payload();
  const repository = buildSourceRepository(records);
  const before = canonicalJson(repository);
  const result = preflight(records, repository, {
    locale: "ar",
    batch: "p0",
    allowOwnerWaiver: true,
  });
  assert.equal(result.mapped.length, 6);
  assert.equal(canonicalJson(repository), before);
});

test("Arabic P0 fails without explicit owner-waiver flag", () => {
  const records = payload();
  assert.throws(
    () =>
      preflight(records, buildSourceRepository(records), {
        locale: "ar",
        batch: "p0",
      }),
    ImportFailure,
  );
});

test("owner waiver cannot be applied to Chinese P0", async () => {
  const { loadFixture } = await import("../scripts/cms-import/fixture");
  const records = await loadFixture();
  assert.throws(
    () =>
      preflight(records, buildSourceRepository(records), {
        locale: "zh",
        batch: "p0",
        allowOwnerWaiver: true,
      }),
    ImportFailure,
  );
});

test("owner waiver cannot be applied to an unsupported locale", () => {
  const records = payload();
  assert.throws(
    () =>
      preflight(records, buildSourceRepository(records), {
        locale: "zh",
        batch: "p0",
        allowOwnerWaiver: true,
      }),
    ImportFailure,
  );
});

test("Arabic P0 rejects fewer than six records", () => {
  expectPreflightFailure((records) => records.pop());
});

test("Arabic P0 rejects more than six records", () => {
  expectPreflightFailure((records) => records.push(structuredClone(records[0])));
});

test("Arabic P0 rejects an unapproved source ID", () => {
  expectPreflightFailure((records) => {
    records[0].sourceEnglishContentId = 999;
  });
});

test("Arabic P0 rejects a mismatched slug", () => {
  expectPreflightFailure((records) => {
    records[0].localizedSlug = "not-approved";
  });
});

test("Arabic P0 rejects Persian-specific content copied into Arabic", () => {
  expectPreflightFailure((records) => {
    records[1].translatedTitle = "کنترل پنل";
  });
});

test("Arabic P0 rejects a forged native approval", () => {
  expectPreflightFailure((records) => {
    records[0].nativeReviewStatus = "approved";
    records[0].nativeReviewer = "Allan";
    records[0].nativeReviewDate = "2026-07-31";
  });
});

test("Arabic P0 rejects waiver reviewer drift", () => {
  expectPreflightFailure((records) => {
    records[0].ownerReviewWaiverBy = "Someone Else";
  });
});

test("Arabic P0 rejects waiver date drift", () => {
  expectPreflightFailure((records) => {
    records[0].ownerReviewWaiverDate = "2026-08-01";
  });
});

test("Arabic P0 rejects waiver reason drift", () => {
  expectPreflightFailure((records) => {
    records[0].ownerReviewWaiverReason = "Different reason";
  });
});

test("Arabic P0 rejects waiver scope count drift", () => {
  expectPreflightFailure((records) => {
    records[0].ownerReviewWaiverScopeCount = 14;
  });
});

test("Arabic P0 rejects waiver scope hash drift", () => {
  expectPreflightFailure((records) => {
    records[0].ownerReviewWaiverScopeSha256 = "0".repeat(64);
  });
});

test("Arabic RCU Host first-use terminology is exact", () => {
  assert.match(
    payload()[0].translatedTitle,
    /وحدة RCU رئيسية للتحكم \(RCU Host\)/u,
  );
});

test("Arabic renderer uses Arabic headings and localized links", () => {
  const rendered = renderStructuredContent(payload()[0]);
  assert.match(rendered, /المواصفات ومعلومات الشراء/u);
  assert.match(rendered, /الأسئلة الشائعة/u);
  assert.match(rendered, /href="\/ar\//u);
  assert.doesNotMatch(rendered, /href="\/zh\//u);
});

test("Arabic mapped record has eight translation and five waiver meta fields", () => {
  const records = payload();
  const mapped = mapPayloadRecord(records[0], sha256(records), true);
  assert.equal(Object.keys(mapped.meta).length, 13);
  assert.equal(
    mapped.meta._dualcorelink_owner_review_waiver_status,
    "approved",
  );
  assert.equal(mapped.meta._dualcorelink_translation_reviewer, "");
});

test("Arabic apply is idempotent and creates exactly six drafts", () => {
  const records = payload();
  const repository = buildSourceRepository(records);
  const engine = new ImportEngine(repository, new MemoryRunStore());
  const options = {
    locale: "ar" as const,
    batch: "p0" as const,
    allowOwnerWaiver: true,
  };
  engine.apply(records, "ar-idempotent-1", {
    confirmRunId: "ar-idempotent-1",
    ...options,
  });
  const repeat = engine.apply(records, "ar-idempotent-2", {
    confirmRunId: "ar-idempotent-2",
    ...options,
  });
  assert.equal(repository.localized.size, 6);
  assert.equal(
    repeat.operations.filter((operation) => operation.operation === "unchanged")
      .length,
    6,
  );
});

test("Arabic publish requires explicit waiver flag and only publishes six", () => {
  const records = payload();
  const repository = buildSourceRepository(records);
  const engine = new ImportEngine(repository, new MemoryRunStore());
  engine.apply(records, "ar-publish", {
    confirmRunId: "ar-publish",
    locale: "ar",
    batch: "p0",
    allowOwnerWaiver: true,
  });
  engine.verify("ar-publish");
  assert.throws(
    () => engine.publish("ar-publish", "ar-publish"),
    ImportFailure,
  );
  engine.publish("ar-publish", "ar-publish", { allowOwnerWaiver: true });
  assert.equal(
    [...repository.localized.values()].filter(
      (record) => record.status === "publish",
    ).length,
    6,
  );
});

test("Arabic rollback needs no waiver flag and returns six records to draft", () => {
  const records = payload();
  const repository = buildSourceRepository(records);
  const engine = new ImportEngine(repository, new MemoryRunStore());
  engine.apply(records, "ar-rollback", {
    confirmRunId: "ar-rollback",
    locale: "ar",
    batch: "p0",
    allowOwnerWaiver: true,
  });
  engine.verify("ar-rollback");
  engine.publish("ar-rollback", "ar-rollback", {
    allowOwnerWaiver: true,
  });
  engine.rollback("ar-rollback", "ar-rollback");
  assert.equal(
    [...repository.localized.values()].filter(
      (record) => record.status === "draft",
    ).length,
    6,
  );
});

test("Arabic payload hash drift remains blocked", () => {
  const records = payload();
  const repository = buildSourceRepository(records);
  const runs = new MemoryRunStore();
  const engine = new ImportEngine(repository, runs);
  engine.apply(records, "ar-hash-drift", {
    confirmRunId: "ar-hash-drift",
    locale: "ar",
    batch: "p0",
    allowOwnerWaiver: true,
  });
  runs.runs.get("ar-hash-drift")!.request[0].translatedTitle += " drift";
  assert.throws(() => engine.verify("ar-hash-drift"), ImportFailure);
});

test("Arabic English-source hash drift remains blocked", () => {
  const records = payload();
  const repository = buildSourceRepository(records);
  const engine = new ImportEngine(repository, new MemoryRunStore());
  engine.apply(records, "ar-source-drift", {
    confirmRunId: "ar-source-drift",
    locale: "ar",
    batch: "p0",
    allowOwnerWaiver: true,
  });
  repository.sources.get(48)!.core.post_title = "changed source";
  assert.throws(() => engine.verify("ar-source-drift"), ImportFailure);
});
