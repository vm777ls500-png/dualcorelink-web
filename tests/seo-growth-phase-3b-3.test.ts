import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  getPriorityProductReinforcement,
  phase3bProductReinforcements,
  priorityProductReinforcements,
} from "../src/config/product-conversion";
import { resources } from "../src/config/resources";

const targetResourceSlug = "what-is-hotel-rcu-room-control-system";
const targetProductSlug = "rcu-controller-cabinet";
const protectedProductSlugs = [
  "hotel-smart-room-rcu-host-1",
  "86-type-ai-smart-control-display",
  "smart-four-key-scene-control-panel",
] as const;

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test("Phase 3B-3 keeps the Phase 3A product set unchanged", () => {
  assert.deepEqual(
    Object.keys(priorityProductReinforcements).sort(),
    [...protectedProductSlugs].sort(),
  );
});

test("RCU Controller Cabinet receives a slug-scoped conversion answer", () => {
  assert.deepEqual(Object.keys(phase3bProductReinforcements), [
    targetProductSlug,
  ]);

  const reinforcement = getPriorityProductReinforcement(targetProductSlug);
  assert.ok(reinforcement);
  assert.ok(wordCount(reinforcement.answer) >= 50);
  assert.ok(wordCount(reinforcement.answer) <= 100);
  assert.equal(reinforcement.decisionPoints.length, 4);
  assert.deepEqual(
    reinforcement.links.map((link) => link.href),
    ["/resources/what-is-hotel-rcu-room-control-system/"],
  );
  assert.equal(
    reinforcement.links.some((link) =>
      /smart-hotel-room-control-system-guide|86-type-ai-smart-control-display|regions\/(saudi-arabia|uae)/.test(
        link.href,
      ),
    ),
    false,
  );
});

test("RCU Resource preserves information ownership and commercial paths", () => {
  const resource = resources.find((item) => item.slug === targetResourceSlug);
  assert.ok(resource);
  assert.equal(
    resource.seoTitle,
    "What Is a Hotel RCU Room Control System? B2B Project Guide",
  );
  assert.match(
    resource.sections.find((section) => section.id === "product-selection")
      ?.body[0] ?? "",
    /Use this guide to define the room functions/,
  );
  assert.ok(
    resource.relatedProducts.some(
      (link) => link.href === "/en/products/rcu-controller-cabinet/",
    ),
  );
  assert.ok(
    resource.relatedSolutions.some(
      (link) => link.href === "/en/solutions/rcu-room-control-solution/",
    ),
  );
});

test("listing pages add role-specific links without metadata changes", async () => {
  const [solutionsSource, productsSource] = await Promise.all([
    readFile("src/app/[locale]/solutions/page.tsx", "utf8"),
    readFile("src/app/[locale]/products/page.tsx", "utf8"),
  ]);

  assert.match(
    solutionsSource,
    /resources\/what-is-hotel-rcu-room-control-system/,
  );
  assert.match(solutionsSource, /hotel RCU room control fundamentals/);
  assert.match(
    solutionsSource,
    /title: "Smart Hotel Room Control & Automation Solutions"/,
  );

  assert.match(productsSource, /href=\{`\/\$\{locale\}\/solutions\/`\}/);
  assert.match(productsSource, /compare hotel room automation solutions/);
  assert.match(
    productsSource,
    /title: "Smart Hotel Products & OEM\/ODM Devices"/,
  );
});

test("Phase 3B-3 copy avoids unsupported claims", () => {
  const resource = resources.find((item) => item.slug === targetResourceSlug);
  assert.ok(resource);
  const copy = JSON.stringify({
    products: phase3bProductReinforcements,
    resourceSection: resource.sections.find(
      (section) => section.id === "product-selection",
    ),
    relatedProduct: resource.relatedProducts.find(
      (link) => link.href === "/en/products/rcu-controller-cabinet/",
    ),
    relatedSolution: resource.relatedSolutions.find(
      (link) => link.href === "/en/solutions/rcu-room-control-solution/",
    ),
  }).toLowerCase();

  for (const forbidden of [
    "best",
    "leading",
    "number one",
    "guaranteed",
    "market share",
    "energy saving percentage",
    "local office",
    "local stock",
    "certified for",
  ]) {
    assert.equal(copy.includes(forbidden), false, `Forbidden claim: ${forbidden}`);
  }
});
