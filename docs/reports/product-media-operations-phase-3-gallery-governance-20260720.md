# Product Media Operations Phase 3: Gallery Governance

Date: 2026-07-20
Status: Implementation and local acceptance complete

## Objective

Establish a repeatable product-media inventory, upload-review workflow, and gallery governance baseline without changing the current Gallery UI, CSS, hero choices, display order, product slugs, product names, CMS data, or Product JSON-LD policy.

## Baseline

- Products: 36
- Multi-image products: 35
- Single-image products: 1
- Single-image slug: `rotary-knob-smart-control-display`
- Full WebP images: 132
- Thumbnail WebP images: 132
- Total WebP assets: 264
- Static pages: 156
- Resources: 15
- Sitemap URLs: 76
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- Production implementation baseline: `8dd42d6e724862f88ddbb7ca288fd973280b651d`
- Phase 2 report baseline: `95b723a310f68d59f085491d4c211359ad29ed6e`

## Existing Data Flow

The audited production flow remains:

1. `src/config/product-galleries.ts` maps a product slug to one featured image and its ordered gallery images.
2. `src/config/product-display-images.ts` keeps product listing images aligned with each gallery hero.
3. Every full image has an explicit thumbnail path, width, height, alt text, and gallery role.
4. The product page reads the mapping and passes it to the existing Gallery component.
5. The Gallery component renders the featured image first and preserves the configured array order.

No competing hand-maintained gallery mapping was added.

## Derived Manifest

`src/lib/product-media-manifest.ts` derives a flat operational manifest directly from `productGalleries`. It exposes:

- `productSlug`
- `src`
- `thumbnailSrc`
- Governed media type
- `alt`
- Zero-based display `order`
- Configured width and height
- Optional bytes field for enriched audit output
- Source classification
- Review status

The featured image is always type `hero` at order 0. Existing gallery `back` entries normalize to the governance term `rear` without changing the UI label or production mapping.

The mapping type now permits optional `mediaType`, `source`, and `reviewStatus` metadata for future reviewed uploads. Existing entries default to `legacy` and `confirmed`, so current page output is unchanged. The old UI-facing image type remains intact and no Gallery component change was required.

## Governed Media Types

- `hero`
- `front`
- `side`
- `rear`
- `detail`
- `interface`
- `mounting`
- `dimensions`
- `application`
- `packaging`
- `label`
- `accessory`

## Inventory Audit Command

The new command is:

```text
npm run media:audit
```

It validates:

- Product, manifest, full-image, thumbnail, and disk-asset counts
- Missing, empty, corrupt, or dimension-mismatched WebP files
- Full images at or above 1 MiB
- Thumbnails above 480 px
- EXIF metadata
- Duplicate paths and duplicate full-image SHA-256 hashes
- Full/thumbnail basename pairing
- Product-directory ownership
- Contiguous display order and exactly one hero per product
- Supported media roles
- Pending or rejected media accidentally placed in the published mapping
- Orphan full images and thumbnails on disk
- Unexpected new single-image products
- Listing-image and gallery-hero alignment

Audit errors produce a non-zero command exit code. The known Rotary Knob reshoot is reported as one warning rather than hidden or converted into a false success.

## Inventory Results

- Products: 36
- Manifest entries: 132
- Full images: 132
- Thumbnails: 132
- WebP assets on disk: 264
- Full-image bytes: 8,677,272
- Thumbnail bytes: 696,438
- Total bytes: 9,373,710
- Multi-image products: 35
- Single-image products: 1
- Complete galleries, at least three verified images: 31
- Basic galleries, two verified images: 4
- Duplicate full-image hashes: 0
- Pending reviews in published mapping: 0
- Rejected reviews in published mapping: 0
- Orphan full images: 0
- Orphan thumbnails: 0
- Errors: 0
- Warnings: 1, the documented Rotary Knob reshoot requirement

The generated operational outputs are written to `tmp/product-media-audit/inventory.json` and `tmp/product-media-audit/inventory.md`. Both are ignored by Git and are not part of this report commit.

## Upload Workflow

The runbook at `docs/runbooks/product-media-upload-gallery-governance.md` establishes:

1. Raw upload batches remain outside Git and outside `public/`.
2. Every candidate is assigned `confirmed`, `pending`, or `rejected` status.
3. Product ownership is verified from model, enclosure, controls, ports, mounting, labels, and existing confirmed views.
4. Uncertain or conflicting candidates are never automatically bound.
5. Only confirmed images are processed into matching full/thumbnail WebP pairs.
6. Files use the product slug directory and governed role-based names.
7. The existing `product-galleries.ts` mapping is updated in the intended order.
8. Hero changes require an explicit update to `product-display-images.ts` and separate review.
9. Media audit, lint, tests, build, responsive QA, and production QA gate deployment.

## Completion Policy

- `single-image`: one verified hero; a reshoot plan is required.
- `basic`: hero plus one verified supporting view.
- `complete`: hero plus at least two verified supporting views.

These levels are operational signals, not permission to use an uncertain or wrong-model photo. Authenticity remains the primary gate.

## Rotary Knob Follow-up

The only single-image product remains `rotary-knob-smart-control-display`. No same-model candidate was introduced. The runbook requests verified front alternate, side, rear/interface, mounting, dimensions, label, packaging, and application photography. Raw photos must exclude PII and remain outside Git until reviewed and processed.

## Files Changed

- `package.json`
- `src/config/product-galleries.ts`
- `src/lib/product-media-manifest.ts`
- `scripts/audit-product-media.ts`
- `tests/product-media-manifest.test.ts`
- `docs/runbooks/product-media-upload-gallery-governance.md`
- `docs/reports/product-media-operations-phase-3-gallery-governance-20260720.md`

No image asset, hero selection, gallery order, product page component, Gallery UI, CSS, dependency, CMS record, infrastructure configuration, or public URL was changed.

## Validation

- `npm run media:audit`: passed, 0 errors and 1 documented warning
- `npm run lint`: passed
- `npm run test:data`: 60/60 passed
- Duplicate mapping rejection test: passed
- Public CMS-dependent tests: passed using the production REST endpoint
- `npm run build`: passed, exit code 0
- Compile and type check: passed
- Static generation: 156/156
- Export: passed
- `export:clean`: passed
- Products: 36
- Resources: 15
- Sitemap URLs: 76
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- Empty `href="#"`: 0
- Localhost / loopback leakage: 0
- SiteGround leakage: 0
- Pages.dev leakage: 0
- CMS AWS test-domain leakage: 0
- AWS frontend test-domain leakage: 0
- Production noindex: 0
- `git diff --check`: passed

## Deployment

No deployment was performed in this phase. The changes create internal operations tooling, type contracts, tests, and documentation; they do not modify current image assets, gallery rendering, hero selection, ordering, sitemap membership, or production data.

## Risks and Observations

- The Rotary Knob product still needs verified same-model photography.
- Source and review metadata default existing assets to `legacy` and `confirmed`; new uploads should explicitly record their source after review.
- The audit deliberately fails on untracked files in `public/media/products/`, forcing future uploads through the mapping and review process.
- The audit report is generated locally under ignored `tmp/`; it must not be used as a substitute for visual model verification.
- Image counts and byte totals will legitimately change after approved media additions, while integrity rules should remain stable.

## Final Status

Product Media Operations Phase 3 is locally accepted. The repository now has one derived manifest, a failing-on-error inventory audit, governed media roles and review states, a repeatable upload workflow, gallery-completion reporting, and an explicit path for completing the remaining single-image product without weakening authenticity controls.
