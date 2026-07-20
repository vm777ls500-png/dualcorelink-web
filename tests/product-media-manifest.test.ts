import assert from "node:assert/strict";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import {
  createProductMediaManifest,
  getProductMedia,
  productMediaManifest,
  productMediaTypes,
} from "../src/lib/product-media-manifest";
import { auditProductMedia, getAuditExitCode } from "../scripts/audit-product-media";

test("product media manifest is derived from the existing gallery source", () => {
  const regenerated = createProductMediaManifest();
  assert.deepEqual(productMediaManifest, regenerated);
  assert.equal(productMediaManifest.length, 132);
  assert.equal(new Set(productMediaManifest.map((entry) => entry.productSlug)).size, 36);
  assert.equal(new Set(productMediaManifest.map((entry) => entry.src)).size, 132);
  assert.equal(new Set(productMediaManifest.map((entry) => entry.thumbnailSrc)).size, 132);

  for (const [productSlug, gallery] of Object.entries(productGalleries)) {
    const entries = getProductMedia(productSlug);
    assert.equal(entries.length, gallery.gallery.length + 1);
    assert.equal(entries[0].type, "hero");
    assert.equal(entries[0].order, 0);
    assert.equal(entries[0].src, gallery.featuredImage.src);
    assert.deepEqual(
      entries.map((entry) => entry.order),
      entries.map((_, index) => index),
    );
    assert.equal(entries.every((entry) => entry.reviewStatus === "confirmed"), true);
    assert.equal(entries.every((entry) => entry.source === "legacy"), true);
  }
});

test("product media manifest uses the governed image taxonomy", () => {
  const allowedTypes = new Set(productMediaTypes);
  assert.equal(
    productMediaManifest.every((entry) => allowedTypes.has(entry.type)),
    true,
  );
  assert.equal(productMediaManifest.some((entry) => entry.type === "rear"), true);
  assert.equal(productMediaManifest.some((entry) => entry.type === "hero"), true);
});

test("product media inventory audit passes the current production baseline", () => {
  const audit = auditProductMedia();
  assert.deepEqual(audit.errors, []);
  assert.equal(audit.summary.products, 36);
  assert.equal(audit.summary.manifestEntries, 132);
  assert.equal(audit.summary.fullImages, 132);
  assert.equal(audit.summary.thumbnails, 132);
  assert.equal(audit.summary.totalWebpAssets, 264);
  assert.equal(audit.summary.multiImageProducts, 35);
  assert.equal(audit.summary.singleImageProducts, 1);
  assert.equal(audit.summary.duplicateFullHashes, 0);
  assert.equal(audit.summary.orphanFullImages, 0);
  assert.equal(audit.summary.orphanThumbnails, 0);
  assert.equal(audit.summary.pendingReviews, 0);
  assert.equal(audit.summary.rejectedReviews, 0);
  assert.deepEqual(audit.singleImageProducts, ["rotary-knob-smart-control-display"]);
  assert.equal(audit.warnings.length, 1);
  assert.equal(getAuditExitCode(audit), 0);
});

test("product media audit rejects duplicated mappings", () => {
  const duplicate = { ...productMediaManifest[0], order: 1 };
  const audit = auditProductMedia([productMediaManifest[0], duplicate]);
  assert.equal(audit.errors.some((error) => error.includes("duplicate full-image mapping")), true);
  assert.equal(audit.errors.some((error) => error.includes("duplicate thumbnail mapping")), true);
  assert.equal(getAuditExitCode(audit), 1);
});
