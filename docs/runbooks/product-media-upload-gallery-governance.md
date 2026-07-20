# Product Media Upload and Gallery Governance

## Purpose

This runbook defines how new DualCoreLink product photos move from an untrusted upload batch to a reviewed gallery mapping. The existing `src/config/product-galleries.ts` file remains the only editable gallery data source. `src/lib/product-media-manifest.ts` derives the inventory view from it and must not become a second hand-maintained mapping.

## Roles and Status

Every candidate photo must be classified before processing:

- `confirmed`: the product slug and visible model details are verified; it may enter the gallery.
- `pending`: ownership or image role is uncertain; keep it outside `public/` and do not map it.
- `rejected`: wrong model, duplicate, damaged, private, or otherwise unsuitable; do not map it.

Only confirmed images may be copied into `public/media/products/`.

## Intake Directory

Keep original upload batches outside the Git repository or in a Git-ignored backup location. Do not place raw phone photos directly in `public/`. Each intake batch should have a private review sheet containing:

- Original filename
- Proposed product slug
- Proposed image type
- Review status
- Reviewer and review date
- Short evidence/notes

The review sheet must not contain customer names, phone numbers, order numbers, private local paths, credentials, or other PII.

## Product Identification

Match a candidate to an existing product slug using visible evidence:

1. Product family and model label
2. Enclosure proportions and finish
3. Screen/control layout or button count
4. Port and terminal arrangement
5. Socket-hole standard
6. Rear housing and mounting method
7. Existing hero and confirmed gallery views

If any important attribute conflicts, leave the image pending or reject it. Do not use a similar-looking product to complete a gallery.

## Image Types

Use one governed role per image:

- `hero`: primary product-body image used on listing and detail pages
- `front`: straight or near-straight front view
- `side`: side or three-quarter product view
- `rear`: rear housing, terminals, or back plate
- `detail`: close-up of material, controls, or construction
- `interface`: ports, terminals, or screen/control interface
- `mounting`: verified mounting components or installation orientation
- `dimensions`: verified dimension drawing or measurement view
- `application`: genuine application context where the model remains identifiable
- `packaging`: packaging and included contents
- `label`: model or compliance label close-up
- `accessory`: included accessory belonging to the same product

Do not infer protocol support, certification, performance, or application claims from an image.

## File Naming

Use lowercase ASCII names:

```text
public/media/products/<product-slug>/hero.webp
public/media/products/<product-slug>/<type>-01.webp
public/media/products/<product-slug>/<type>-02.webp
public/media/products/<product-slug>/thumb/hero.webp
public/media/products/<product-slug>/thumb/<type>-01.webp
```

Do not overwrite an existing confirmed asset unless the replacement has been reviewed and the change is intentional. A full image and thumbnail must share the same basename.

## Processing Standard

- Keep raw originals outside Git.
- Preserve the real product appearance, color, ports, labels, buttons, and screen UI.
- Crop without cutting off the product.
- Remove EXIF/GPS metadata.
- Export full and thumbnail files as readable WebP.
- Keep full images below 1 MiB under the current policy.
- Keep thumbnail width and height at or below 480 px.
- Record the actual full-image width and height in the gallery mapping.
- Never use AI generation or an internet image as product evidence.

## Mapping Workflow

1. Confirm the product slug and image role.
2. Process the full and thumbnail WebP pair.
3. Place the files only under that product's directory.
4. Update `src/config/product-galleries.ts` with the new image after the intended position.
5. Update `src/config/product-display-images.ts` only when an explicitly approved hero changes.
6. Add accurate, non-keyword-stuffed alt text that distinguishes the view.
7. Run `npm run media:audit`.
8. Run `npm run lint`, `npm run test:data`, and `npm run build`.
9. Review the generated files in `tmp/product-media-audit/`.
10. Perform responsive and thumbnail-switch QA before deployment.

## Inventory Audit

`npm run media:audit` validates and reports:

- Product, full-image, thumbnail, and total WebP counts
- Missing, empty, corrupt, or dimension-mismatched files
- Full images above the current size limit
- Thumbnails above 480 px
- EXIF presence
- Duplicate paths and duplicate full-image hashes
- Full/thumbnail mapping coverage
- Product-directory ownership
- Non-contiguous display order or missing hero
- Unsupported image roles
- Pending/rejected entries
- Orphan full images and thumbnails on disk
- Single-image and multi-image product counts

The command writes ignored operational artifacts to:

```text
tmp/product-media-audit/inventory.json
tmp/product-media-audit/inventory.md
```

Any audit error returns a non-zero exit code. The known Rotary Knob reshoot remains a warning, not a hidden failure.

## Gallery Completion Levels

- `single-image`: one verified hero only; requires a documented reshoot plan.
- `basic`: hero plus one verified alternate view.
- `complete`: hero plus at least two verified supporting views.

Image count alone does not override authenticity. A single verified image is preferable to a complete-looking gallery containing the wrong model.

## Rotary Knob Reshoot

The only current single-image product is `rotary-knob-smart-control-display`. Request these same-model photos:

- Front alternate angle
- Side profile
- Rear and connector/interface close-up
- Mounting and dimensions
- Product label
- Packaging contents
- Real application view

Use a light neutral background, even lighting, low glare, centered uncropped framing, and original uncompressed files. Exclude people, faces, customer data, order documents, and QR codes.

## Review and Deployment Gate

Before committing media changes, require:

- Confirmed ownership for every new image
- Full/thumbnail pair present
- `npm run media:audit` exit code 0
- Lint, data tests, and build pass
- No unexpected product or sitemap count change
- No duplicate, broken, private, pending, or rejected asset in `public/`
- Hero and ordering changes explicitly documented
- Production image and gallery interaction QA after deployment
