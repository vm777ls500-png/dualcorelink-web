import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { productDisplayImages } from "../src/config/product-display-images";
import { productGalleries } from "../src/config/product-galleries";
import {
  productMediaManifest,
  productMediaTypes,
  type ProductMediaEntry,
  type ProductMediaType,
} from "../src/lib/product-media-manifest";

type ImageMetadata = {
  bytes: number;
  width: number;
  height: number;
  sha256: string;
};

type ProductCompletion = {
  productSlug: string;
  imageCount: number;
  types: ProductMediaType[];
  status: "single-image" | "basic" | "complete";
};

export type ProductMediaAudit = {
  generatedAt: string;
  summary: {
    products: number;
    manifestEntries: number;
    fullImages: number;
    thumbnails: number;
    totalWebpAssets: number;
    fullImageBytes: number;
    thumbnailBytes: number;
    totalBytes: number;
    multiImageProducts: number;
    singleImageProducts: number;
    duplicateFullHashes: number;
    pendingReviews: number;
    rejectedReviews: number;
    orphanFullImages: number;
    orphanThumbnails: number;
  };
  singleImageProducts: string[];
  orphanFullImages: string[];
  orphanThumbnails: string[];
  products: ProductCompletion[];
  errors: string[];
  warnings: string[];
};

const publicRoot = path.join(process.cwd(), "public");
const mediaRoot = path.join(publicRoot, "media", "products");
const allowedTypes = new Set<ProductMediaType>(productMediaTypes);

function publicFile(src: string) {
  return path.join(publicRoot, src.replace(/^\//, ""));
}

function toPublicPath(file: string) {
  return `/${path.relative(publicRoot, file).split(path.sep).join("/")}`;
}

function listFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(target) : [target];
  });
}

function readUInt24LE(buffer: Buffer, offset: number) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function readWebpDimensions(buffer: Buffer) {
  if (
    buffer.subarray(0, 4).toString("ascii") !== "RIFF" ||
    buffer.subarray(8, 12).toString("ascii") !== "WEBP"
  ) {
    throw new Error("not a RIFF WebP file");
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunk = buffer.subarray(offset, offset + 4).toString("ascii");
    const size = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;

    if (chunk === "VP8X" && data + 10 <= buffer.length) {
      return {
        width: readUInt24LE(buffer, data + 4) + 1,
        height: readUInt24LE(buffer, data + 7) + 1,
      };
    }

    if (chunk === "VP8 " && data + 10 <= buffer.length) {
      return {
        width: buffer.readUInt16LE(data + 6) & 0x3fff,
        height: buffer.readUInt16LE(data + 8) & 0x3fff,
      };
    }

    if (chunk === "VP8L" && data + 5 <= buffer.length) {
      const b1 = buffer[data + 1];
      const b2 = buffer[data + 2];
      const b3 = buffer[data + 3];
      const b4 = buffer[data + 4];
      return {
        width: 1 + (((b2 & 0x3f) << 8) | b1),
        height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6)),
      };
    }

    offset = data + size + (size % 2);
  }

  throw new Error("WebP dimensions not found");
}

function inspectImage(src: string): ImageMetadata {
  const file = publicFile(src);
  if (!existsSync(file)) throw new Error("file does not exist");
  const buffer = readFileSync(file);
  const dimensions = readWebpDimensions(buffer);
  if (buffer.includes(Buffer.from("Exif\0\0"))) throw new Error("EXIF metadata retained");
  return {
    bytes: statSync(file).size,
    ...dimensions,
    sha256: createHash("sha256").update(buffer).digest("hex"),
  };
}

export function auditProductMedia(entries: ProductMediaEntry[] = productMediaManifest): ProductMediaAudit {
  const errors: string[] = [];
  const warnings: string[] = [];
  const knownFull = new Set(entries.map((entry) => entry.src));
  const knownThumbnails = new Set(entries.map((entry) => entry.thumbnailSrc));
  const seenFull = new Set<string>();
  const seenThumbnails = new Set<string>();
  const seenHashes = new Map<string, string>();
  const duplicateHashes = new Set<string>();
  let fullImageBytes = 0;
  let thumbnailBytes = 0;

  for (const entry of entries) {
    if (!allowedTypes.has(entry.type)) errors.push(`${entry.src}: unsupported type ${entry.type}`);
    if (entry.reviewStatus !== "confirmed") {
      errors.push(`${entry.src}: ${entry.reviewStatus} media cannot be published`);
    }
    if (!entry.alt.trim()) errors.push(`${entry.src}: empty alt text`);
    if (seenFull.has(entry.src)) errors.push(`${entry.src}: duplicate full-image mapping`);
    if (seenThumbnails.has(entry.thumbnailSrc)) errors.push(`${entry.thumbnailSrc}: duplicate thumbnail mapping`);
    seenFull.add(entry.src);
    seenThumbnails.add(entry.thumbnailSrc);

    const expectedPrefix = `/media/products/${entry.productSlug}/`;
    if (!entry.src.startsWith(expectedPrefix) || !entry.thumbnailSrc.startsWith(`${expectedPrefix}thumb/`)) {
      errors.push(`${entry.productSlug}: image path is outside its product directory`);
    }
    if (path.basename(entry.src) !== path.basename(entry.thumbnailSrc)) {
      errors.push(`${entry.src}: full image and thumbnail basenames do not match`);
    }

    try {
      const full = inspectImage(entry.src);
      fullImageBytes += full.bytes;
      if (full.bytes >= 1024 * 1024) errors.push(`${entry.src}: full image is 1 MiB or larger`);
      if (full.width !== entry.width || full.height !== entry.height) {
        errors.push(
          `${entry.src}: configured ${entry.width}x${entry.height}, actual ${full.width}x${full.height}`,
        );
      }
      const duplicate = seenHashes.get(full.sha256);
      if (duplicate) {
        duplicateHashes.add(full.sha256);
        errors.push(`${entry.src}: same content as ${duplicate}`);
      } else {
        seenHashes.set(full.sha256, entry.src);
      }
    } catch (error) {
      errors.push(`${entry.src}: ${error instanceof Error ? error.message : String(error)}`);
    }

    try {
      const thumbnail = inspectImage(entry.thumbnailSrc);
      thumbnailBytes += thumbnail.bytes;
      if (thumbnail.width > 480 || thumbnail.height > 480) {
        errors.push(`${entry.thumbnailSrc}: thumbnail exceeds 480px`);
      }
    } catch (error) {
      errors.push(`${entry.thumbnailSrc}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const products = Object.keys(productGalleries).map((productSlug) => {
    const productEntries = entries
      .filter((entry) => entry.productSlug === productSlug)
      .sort((left, right) => left.order - right.order);
    const orders = productEntries.map((entry) => entry.order);
    if (orders.some((order, index) => order !== index)) {
      errors.push(`${productSlug}: order must be contiguous from 0`);
    }
    if (productEntries[0]?.type !== "hero") errors.push(`${productSlug}: first entry must be hero`);
    if (productEntries.filter((entry) => entry.type === "hero").length !== 1) {
      errors.push(`${productSlug}: requires exactly one hero`);
    }

    return {
      productSlug,
      imageCount: productEntries.length,
      types: [...new Set(productEntries.map((entry) => entry.type))],
      status:
        productEntries.length === 1
          ? ("single-image" as const)
          : productEntries.length === 2
            ? ("basic" as const)
            : ("complete" as const),
    };
  });

  for (const [productSlug, image] of Object.entries(productDisplayImages)) {
    const hero = entries.find((entry) => entry.productSlug === productSlug && entry.type === "hero");
    if (!hero || hero.src !== image.src || hero.width !== image.width || hero.height !== image.height) {
      errors.push(`${productSlug}: display image and manifest hero do not match`);
    }
  }

  const diskAssets = listFiles(mediaRoot)
    .filter((file) => path.extname(file).toLowerCase() === ".webp")
    .map(toPublicPath);
  const orphanFullImages = diskAssets.filter(
    (asset) => !asset.includes("/thumb/") && !knownFull.has(asset),
  );
  const orphanThumbnails = diskAssets.filter(
    (asset) => asset.includes("/thumb/") && !knownThumbnails.has(asset),
  );
  if (orphanFullImages.length) errors.push(`${orphanFullImages.length} untracked full image(s)`);
  if (orphanThumbnails.length) errors.push(`${orphanThumbnails.length} untracked thumbnail(s)`);

  const singleImageProducts = products
    .filter((product) => product.status === "single-image")
    .map((product) => product.productSlug);
  const unexpectedSingles = singleImageProducts.filter(
    (productSlug) => productSlug !== "rotary-knob-smart-control-display",
  );
  if (unexpectedSingles.length) errors.push(`Unexpected single-image products: ${unexpectedSingles.join(", ")}`);
  if (singleImageProducts.includes("rotary-knob-smart-control-display")) {
    warnings.push("rotary-knob-smart-control-display: verified reshoot required");
  }

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      products: products.length,
      manifestEntries: entries.length,
      fullImages: knownFull.size,
      thumbnails: knownThumbnails.size,
      totalWebpAssets: diskAssets.length,
      fullImageBytes,
      thumbnailBytes,
      totalBytes: fullImageBytes + thumbnailBytes,
      multiImageProducts: products.filter((product) => product.imageCount > 1).length,
      singleImageProducts: singleImageProducts.length,
      duplicateFullHashes: duplicateHashes.size,
      pendingReviews: entries.filter((entry) => entry.reviewStatus === "pending").length,
      rejectedReviews: entries.filter((entry) => entry.reviewStatus === "rejected").length,
      orphanFullImages: orphanFullImages.length,
      orphanThumbnails: orphanThumbnails.length,
    },
    singleImageProducts,
    orphanFullImages,
    orphanThumbnails,
    products,
    errors,
    warnings,
  };
}

function renderMarkdown(audit: ProductMediaAudit) {
  const rows = audit.products
    .map(
      (product) =>
        `| \`${product.productSlug}\` | ${product.imageCount} | ${product.types.join(", ")} | ${product.status} |`,
    )
    .join("\n");
  return `# Product Media Inventory Audit

Generated: ${audit.generatedAt}

## Summary

- Products: ${audit.summary.products}
- Manifest entries / full images: ${audit.summary.manifestEntries}
- Thumbnails: ${audit.summary.thumbnails}
- WebP assets on disk: ${audit.summary.totalWebpAssets}
- Multi-image products: ${audit.summary.multiImageProducts}
- Single-image products: ${audit.summary.singleImageProducts}
- Duplicate full-image hashes: ${audit.summary.duplicateFullHashes}
- Orphan full images: ${audit.summary.orphanFullImages}
- Orphan thumbnails: ${audit.summary.orphanThumbnails}
- Errors: ${audit.errors.length}
- Warnings: ${audit.warnings.length}

## Product Completion

| Product | Images | Types | Status |
| --- | ---: | --- | --- |
${rows}

## Errors

${audit.errors.length ? audit.errors.map((error) => `- ${error}`).join("\n") : "- None"}

## Warnings

${audit.warnings.length ? audit.warnings.map((warning) => `- ${warning}`).join("\n") : "- None"}
`;
}

export function getAuditExitCode(audit: ProductMediaAudit) {
  return audit.errors.length > 0 ? 1 : 0;
}

function run() {
  const audit = auditProductMedia();
  const completeProducts = audit.products.filter((product) => product.status === "complete").length;
  const basicProducts = audit.products.filter((product) => product.status === "basic").length;
  const outputDirectory = path.join(process.cwd(), "tmp", "product-media-audit");
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(path.join(outputDirectory, "inventory.json"), `${JSON.stringify(audit, null, 2)}\n`);
  writeFileSync(path.join(outputDirectory, "inventory.md"), renderMarkdown(audit));

  console.log(`Products: ${audit.summary.products}`);
  console.log(`Manifest entries: ${audit.summary.manifestEntries}`);
  console.log(`Full images: ${audit.summary.fullImages}`);
  console.log(`Thumbnails: ${audit.summary.thumbnails}`);
  console.log(`WebP assets: ${audit.summary.totalWebpAssets}`);
  console.log(`Multi-image products: ${audit.summary.multiImageProducts}`);
  console.log(`Single-image products: ${audit.summary.singleImageProducts}`);
  console.log(`Complete products: ${completeProducts}`);
  console.log(`Basic products: ${basicProducts}`);
  console.log(`Duplicate full-image hashes: ${audit.summary.duplicateFullHashes}`);
  console.log(
    `Orphan files: ${audit.summary.orphanFullImages + audit.summary.orphanThumbnails} ` +
      `(full: ${audit.summary.orphanFullImages}, thumbnails: ${audit.summary.orphanThumbnails})`,
  );
  console.log(
    `Pending/rejected published media: ${audit.summary.pendingReviews + audit.summary.rejectedReviews} ` +
      `(pending: ${audit.summary.pendingReviews}, rejected: ${audit.summary.rejectedReviews})`,
  );
  console.log(`Errors: ${audit.errors.length}`);
  console.log(`Warnings: ${audit.warnings.length}`);
  console.log(`Report: ${path.relative(process.cwd(), outputDirectory)}`);
  process.exitCode = getAuditExitCode(audit);
}

const isDirectRun = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;
if (isDirectRun) run();
