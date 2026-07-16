import assert from "node:assert/strict";
import test from "node:test";
import { resources } from "../src/config/resources";
import {
  getProductConversionProfile,
  highValueProductCategorySlugs,
  productConversionProfilesByCategory,
} from "../src/config/product-conversion";

const solutionSlugs = new Set([
  "ai-smart-display-solution",
  "hotel-delivery-robot-solution",
  "hotel-guest-room-control-solution",
  "oem-odm-custom-panel-solution",
  "rcu-room-control-solution",
  "smart-hotel-automation-solution",
]);
const resourceSlugs = new Set(resources.map((resource) => resource.slug));

test("high-value product categories resolve to complete conversion profiles", () => {
  assert.equal(highValueProductCategorySlugs.length, 8);

  for (const categorySlug of highValueProductCategorySlugs) {
    const profile = getProductConversionProfile([categorySlug]);
    assert.ok(profile, `Missing conversion profile for ${categorySlug}`);
    assert.equal(profile.highlights.length, 3);
    assert.ok(profile.projectFit.length >= 3);
    assert.ok(profile.selectionChecks.length >= 4);
    assert.ok(profile.quoteChecklist.length >= 4);
    assert.equal(profile.solutions.length, 2);
    assert.equal(profile.resources.length, 2);
  }
});

test("product conversion links target existing solutions and resources", () => {
  const profiles = new Set(Object.values(productConversionProfilesByCategory));

  for (const profile of profiles) {
    for (const link of profile.solutions) {
      const slug = link.href.split("/").filter(Boolean).at(-1);
      assert.ok(slug && solutionSlugs.has(slug), `Unknown solution ${link.href}`);
    }
    for (const link of profile.resources) {
      const slug = link.href.split("/").filter(Boolean).at(-1);
      assert.ok(slug && resourceSlugs.has(slug), `Unknown resource ${link.href}`);
    }
  }
});

test("product conversion copy avoids commercial and compatibility claims", () => {
  const copy = JSON.stringify(productConversionProfilesByCategory).toLowerCase();
  const forbidden = [
    "aggregate rating",
    "in stock",
    "all products support",
    "guaranteed compatibility",
    "guaranteed delivery",
    "certified for",
    "local stock",
    "local office",
  ];

  for (const claim of forbidden) {
    assert.equal(copy.includes(claim), false, `Forbidden claim: ${claim}`);
  }
});
