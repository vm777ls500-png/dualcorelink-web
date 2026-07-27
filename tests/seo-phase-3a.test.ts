import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { productDisplayImages } from "../src/config/product-display-images";
import {
  priorityProductReinforcements,
} from "../src/config/product-conversion";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import { createProductSeoTitle } from "../src/lib/seo/product-metadata";

const priorityResourceSlugs = [
  "hotel-rcu-buying-guide",
  "smart-hotel-room-control-system-guide",
  "hotel-guest-room-control-interfaces-guide",
] as const;

const priorityRegionSlugs = ["saudi-arabia", "uae"] as const;

const priorityProductSlugs = [
  "hotel-smart-room-rcu-host-1",
  "86-type-ai-smart-control-display",
  "smart-four-key-scene-control-panel",
] as const;

const solutionSlugs = new Set([
  "ai-smart-display-solution",
  "hotel-guest-room-control-solution",
  "oem-odm-custom-panel-solution",
  "rcu-room-control-solution",
  "smart-hotel-automation-solution",
]);

const resourceSlugs = new Set(resources.map((resource) => resource.slug));
const regionSlugs = new Set(regionLandingPages.map((region) => region.slug));
const productSlugs = new Set(Object.keys(productDisplayImages));

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function assertPublishedEnglishLink(href: string) {
  assert.equal(
    /localhost|127\.0\.0\.1|pages\.dev|cms\./i.test(href),
    false,
    `Unsafe internal link ${href}`,
  );

  const parts = href.split("/").filter(Boolean);
  const localized = parts[0] === "en";
  const routeType = parts[localized ? 1 : 0];
  const slug = parts[localized ? 2 : 1];

  assert.ok(slug, `Missing slug in ${href}`);
  if (routeType === "products") {
    assert.ok(productSlugs.has(slug), `Unknown product ${href}`);
  } else if (routeType === "resources") {
    assert.ok(resourceSlugs.has(slug), `Unknown resource ${href}`);
  } else if (routeType === "regions") {
    assert.ok(regionSlugs.has(slug), `Unknown region ${href}`);
  } else if (routeType === "solutions") {
    assert.ok(solutionSlugs.has(slug), `Unknown solution ${href}`);
  } else {
    assert.fail(`Unexpected internal route ${href}`);
  }
}

test("Phase 3A resource answer capsules are concise and link to published pages", () => {
  assert.equal(priorityResourceSlugs.length, 3);

  for (const slug of priorityResourceSlugs) {
    const resource = resources.find((item) => item.slug === slug);
    assert.ok(resource, `Missing priority resource ${slug}`);
    assert.ok(resource.answerCapsule, `Missing answer capsule for ${slug}`);
    assert.ok(wordCount(resource.answerCapsule.body) >= 50);
    assert.ok(wordCount(resource.answerCapsule.body) <= 100);
    assert.ok(resource.answerCapsule.links.length >= 2);
    assert.ok(resource.answerCapsule.links.length <= 5);
    for (const link of resource.answerCapsule.links) {
      assertPublishedEnglishLink(link.href);
    }
  }
});

test("Phase 3A region answer capsules remain factual and locally linked", () => {
  assert.equal(priorityRegionSlugs.length, 2);

  for (const slug of priorityRegionSlugs) {
    const region = regionLandingPages.find((item) => item.slug === slug);
    assert.ok(region, `Missing priority region ${slug}`);
    assert.ok(region.answerCapsule, `Missing answer capsule for ${slug}`);
    assert.ok(wordCount(region.answerCapsule.body) >= 50);
    assert.ok(wordCount(region.answerCapsule.body) <= 100);
    assert.ok(region.answerCapsule.links.length >= 2);
    assert.ok(region.answerCapsule.links.length <= 5);
    for (const link of region.answerCapsule.links) {
      assertPublishedEnglishLink(link.href);
    }
  }
});

test("Phase 3A commercial pages have differentiated answers and SEO titles", () => {
  const expectedTitles: Record<string, string> = {
    "hotel-smart-room-rcu-host-1":
      "Hotel RCU Host for Guest Room Control Projects",
    "86-type-ai-smart-control-display":
      "86-Type AI Smart Control Display for Hotel Rooms",
    "smart-four-key-scene-control-panel":
      "Smart Four-Key Scene Control Panel for Hotel Rooms",
  };

  assert.deepEqual(
    Object.keys(priorityProductReinforcements).sort(),
    [...priorityProductSlugs].sort(),
  );

  for (const slug of priorityProductSlugs) {
    const reinforcement = priorityProductReinforcements[slug];
    assert.ok(productSlugs.has(slug), `Unknown priority product ${slug}`);
    assert.ok(wordCount(reinforcement.answer) >= 50);
    assert.ok(wordCount(reinforcement.answer) <= 100);
    assert.equal(reinforcement.decisionPoints.length, 4);
    assert.ok(reinforcement.links.length >= 2);
    assert.ok(reinforcement.links.length <= 5);
    for (const link of reinforcement.links) {
      assertPublishedEnglishLink(link.href);
    }
    assert.equal(
      createProductSeoTitle(slug, "Fallback product title"),
      expectedTitles[slug],
    );
  }
});

test("Phase 3A copy avoids unsupported claims and llms.txt remains absent", async () => {
  const copy = JSON.stringify({
    resources: priorityResourceSlugs.map((slug) =>
      resources.find((resource) => resource.slug === slug)?.answerCapsule,
    ),
    regions: priorityRegionSlugs.map((slug) =>
      regionLandingPages.find((region) => region.slug === slug)?.answerCapsule,
    ),
    products: priorityProductReinforcements,
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

  await assert.rejects(
    access(path.join(process.cwd(), "public", "llms.txt")),
  );
});
