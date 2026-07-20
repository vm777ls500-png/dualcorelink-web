import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { productDisplayImages } from "../src/config/product-display-images";
import { productGalleries } from "../src/config/product-galleries";

function publicFile(src: string) {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

function assertWebp(src: string) {
  const file = publicFile(src);
  assert.equal(existsSync(file), true, `Missing image ${src}`);
  const buffer = readFileSync(file);
  assert.equal(buffer.subarray(0, 4).toString("ascii"), "RIFF", src);
  assert.equal(buffer.subarray(8, 12).toString("ascii"), "WEBP", src);
  assert.ok(statSync(file).size > 0, `Empty image ${src}`);
  assert.ok(statSync(file).size < 1024 * 1024, `Oversized image ${src}`);
  assert.equal(buffer.includes(Buffer.from("Exif\0\0")), false, `EXIF retained in ${src}`);
  return createHash("sha256").update(buffer).digest("hex");
}

test("all products have an optimized featured image and explicit gallery mapping", () => {
  const slugs = Object.keys(productGalleries);
  assert.equal(slugs.length, 36);
  assert.deepEqual(slugs, Object.keys(productDisplayImages));

  const galleryCounts = slugs.map((slug) => productGalleries[slug].gallery.length);
  assert.equal(galleryCounts.reduce((total, count) => total + count, 0), 96);
  assert.equal(galleryCounts.filter((count) => count >= 2).length, 31);
  assert.equal(galleryCounts.filter((count) => count === 1).length, 4);
  assert.equal(galleryCounts.filter((count) => count === 0).length, 1);
  assert.deepEqual(
    slugs.filter((slug) => productGalleries[slug].gallery.length === 0),
    ["rotary-knob-smart-control-display"],
  );
});

test("high-value products lead with a clear product-body view", () => {
  assert.equal(
    productGalleries["embedded-human-presence-sensor"].featuredImage.src,
    "/media/products/embedded-human-presence-sensor/detail-01.webp",
  );
  assert.equal(
    productGalleries["hotel-delivery-robot"].featuredImage.src,
    "/media/products/hotel-delivery-robot/application-01.webp",
  );
});

test("optimized gallery files, thumbnails, dimensions, and alt text are valid", () => {
  const fullHashes = new Set<string>();
  let fullImageCount = 0;
  let thumbnailCount = 0;

  for (const [slug, product] of Object.entries(productGalleries)) {
    const images = [product.featuredImage, ...product.gallery];
    const productSources = new Set<string>();
    const productAlts = new Set<string>();

    assert.equal(productDisplayImages[slug].src, product.featuredImage.src);
    assert.equal(productDisplayImages[slug].width, product.featuredImage.width);
    assert.equal(productDisplayImages[slug].height, product.featuredImage.height);

    for (const image of images) {
      assert.ok(image.alt.trim().length >= 5, `Weak alt text for ${slug}`);
      assert.equal(productAlts.has(image.alt), false, `Duplicate alt text in ${slug}`);
      productAlts.add(image.alt);
      assert.ok(image.width > 0 && image.height > 0, `Invalid dimensions for ${slug}`);
      assert.equal(productSources.has(image.src), false, `Duplicate image in ${slug}`);
      productSources.add(image.src);

      const hash = assertWebp(image.src);
      assert.equal(fullHashes.has(hash), false, `Duplicate optimized image ${image.src}`);
      fullHashes.add(hash);
      fullImageCount += 1;

      assertWebp(image.thumbnailSrc);
      thumbnailCount += 1;
    }
  }

  assert.equal(fullImageCount, 132);
  assert.equal(thumbnailCount, 132);
});

test("gallery image types stay within the approved taxonomy", () => {
  const allowed = new Set([
    "front",
    "side",
    "back",
    "detail",
    "interface",
    "application",
  ]);

  for (const [slug, product] of Object.entries(productGalleries)) {
    for (const image of product.gallery) {
      assert.equal(allowed.has(image.type), true, `Unexpected type in ${slug}`);
    }
  }
});
