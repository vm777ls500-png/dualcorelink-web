# Product Gallery Phase 2: Single-Image Completion and Visual Consistency Review

Date: 2026-07-20
Status: Accepted

## Scope

This phase audited the remaining single-image product, the available product media inventory, and the visual consistency of all 35 multi-image product galleries. It made only evidence-based hero and ordering corrections. Product slugs, names, categories, SEO metadata, Product JSON-LD policy, CMS data, AWS infrastructure, DNS, Cloudflare, Nginx, GA4, Gallery UI, and Gallery CSS were not changed.

## Current Gallery Baseline

- Products: 36
- Multi-image products: 35
- Single-image products: 1
- Full WebP images: 132
- Thumbnail WebP images: 132
- Total gallery WebP assets: 264
- Gallery asset size: 5,373,710 bytes
- Static pages: 156
- Resources: 15
- Sitemap URLs: 76
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15

## Single-image Product

- Product: Rotary Knob Smart Control Display
- Slug: `rotary-knob-smart-control-display`
- Current hero: `/media/products/rotary-knob-smart-control-display/hero.webp`
- Gallery result: retained as a one-image product

The local product asset trees, WordPress REST media metadata, historical product image directories, optimized WebP outputs, gallery audit artifacts, product-list thumbnails, and available display-product media were checked. The only files tied to this product are derivatives of the same source photograph. No distinct same-model front, side, rear, interface, mounting, dimension, packaging, or application image was found.

## Candidate Image Review

- Confirmed candidate: 0
- Uncertain candidate: 0
- Duplicate candidate suitable as a new view: 0
- Wrong-model candidate accepted: 0
- Final classification: no candidate

Images belonging to other smart displays were rejected because their enclosure proportions, screen layout, controls, knob placement, rear hardware, or visible UI did not establish that they were the same model. Using one verified image is safer than filling the gallery with a different product.

## Mapping Decision

The single-image product remains single-image. No new full image or thumbnail was created. No image was sourced from the network or generated. The final gallery split remains 35 multi-image products and 1 single-image product.

Two evidence-based hero corrections were made:

1. `embedded-human-presence-sensor`: changed from the rear/terminal mounting view to the clear front product view at `detail-01.webp`.
2. `hotel-delivery-robot`: changed from a control-screen close-up to the complete front device view at `application-01.webp`.

Their gallery order was updated so alternate, side, rear, interface, and detail views follow the product-first hero. All other hero selections and orders were retained.

## Multi-image Product Audit

All 35 multi-image products were reviewed using contact sheets and source assets. The review covered hero suitability, front-to-detail order, duplicate angles, packaging/application placement, color consistency, crop and resolution consistency, full/thumbnail pairing, alt text, and image-type labels.

| Group | Products reviewed | Result |
| --- | ---: | --- |
| RCU / control hosts | 4 | All product bodies and interfaces remained identifiable; existing four hero choices retained. |
| AI smart displays | 3 | Front displays and genuine UI remained ahead of rear/interface views; no wrong-model substitutions. |
| Smart panels, sockets, HVAC and controls | 17 | Front/material views remained primary; rear, mounting and detail views followed; no socket or series mixing found. |
| Sensors and accessory devices | 4 | Human-presence sensor hero/order corrected; other sensor and accessory galleries retained. |
| Doorplate / room entrance devices | 2 | Doorbell and room-status imagery remained model-consistent and correctly ordered. |
| Robot devices | 3 | Delivery robot hero/order corrected; dock and delivery cabinet remained distinct products. |
| Speaker / other device | 2 | Existing product-first presentation retained; no unsupported image reassignment. |

The 35 audited multi-image slugs were:

`86-type-ai-smart-control-display`, `ai-large-smart-display`, `ai-music-control-panel`, `borui-red-matte-room-status-four-key-switch-panel`, `borui-red-matte-triple-socket-panel`, `borui-red-matte-usb-five-hole-socket`, `brushed-aluminum-86-base-doorbell-panel`, `brushed-aluminum-sos-alarm-panel`, `brushed-aluminum-thermostat-control-panel`, `brushed-aluminum-voice-telephone-information-panel`, `embedded-human-presence-sensor`, `hotel-ceiling-background-speaker`, `hotel-delivery-robot`, `hotel-delivery-robot-charging-dock`, `hotel-guest-room-doorbell`, `hotel-room-door-magnetic-sensor`, `hotel-smart-delivery-cabinet`, `hotel-smart-room-rcu-host-1`, `hotel-smart-room-rcu-host-2`, `hotel-smart-room-rcu-host-3`, `infrared-repeater`, `rcu-controller-cabinet`, `smart-curtain-motor`, `smart-footlight-night-light-panel`, `smart-four-key-curtain-control-panel`, `smart-four-key-scene-control-panel`, `smart-key-card-energy-saver-panel`, `smart-series-dual-vertical-socket-panel`, `smart-single-key-switch-panel`, `smart-three-key-music-control-panel`, `smart-usb-five-hole-socket`, `smart-voice-telephone-information-socket`, `thermostat-hvac-control-panel`, `vintage-gold-four-key-smart-switch-panel`, and `vintage-gold-key-card-energy-saver-panel`.

## Hero Image Review

- Hero images changed: 2
- Hero images retained: 34
- List/detail featured-image mapping consistency: passed
- Product JSON-LD image regression: none

The speaker and other galleries were not changed simply because an alternate image could appear more decorative. A hero was changed only where the existing selection obscured the complete product.

## Ordering Review

- Products with order changes: 2
- Products retained without order changes: 34
- Packaging or application image incorrectly placed first: 0 after review
- Current-image self-duplication in mapping: 0

## Duplicate Review

- Duplicate `src` entries within a product: 0
- Duplicate full-image content hashes: 0
- Images removed as duplicates: 0
- Full/thumbnail mapping errors: 0

No image was deleted merely for having a similar viewing angle. Images were retained when they provided a real front, side, rear, interface, mounting, detail, or application distinction.

## Color Consistency

No product gallery showed evidence that required mixing colorways or changing product appearance. Series color, faceplate finish, socket layout, button count, and visible interface details remained consistent within each mapping. No color correction or synthetic product alteration was performed.

## Authenticity Review

No internet images or AI-generated images were used. No image was reassigned across products without model evidence. RCU, display, panel, sensor, doorplate, and robot families remained visually separate. Screen UI, ports, labels, controls, and hardware were not altered.

## Alt and Accessibility

- Featured and gallery alt text: non-empty and angle/purpose specific
- Duplicate alt text within each product: 0
- Unsupported protocol/function claims in alt text: 0
- Thumbnail controls: distinguishable accessible labels
- Active thumbnail: exposed through `aria-pressed`
- Keyboard/native button behavior: retained
- Thumbnail switch checks on 12 representative multi-image products: 12/12 passed

## User Reshoot List

The Rotary Knob Smart Control Display still needs verified same-model photography. Recommended shots:

- Straight front view and one alternate front angle
- Left/right side profile
- Rear panel and connector/interface close-up
- Mounting method and dimension reference
- Product label close-up
- Packaging contents
- Real application image, only if the same model is clearly visible

Photography should use a white or light neutral background, even lighting, low glare, a centered uncropped product, level camera position, and original uncompressed files. Labels and interfaces should have separate close-ups. Photos must exclude people, faces, private information, orders, and QR codes.

## Code Changes

- `src/config/product-display-images.ts`
- `src/config/product-galleries.ts`
- `tests/product-gallery.test.ts`

No image assets, UI components, CSS, page layouts, dependencies, CMS data, SEO metadata, or schema policy were changed.

## Tests

- `npm run lint`: passed
- `npm run test:data`: 56/56 passed using the public CMS REST root
- Product gallery tests now lock the one-image slug, the two corrected hero selections, and unique alt text per product
- `git diff --check`: passed
- Featured images: 36/36 present
- Full images: 132/132 readable WebP
- Thumbnails: 132/132 readable WebP
- Exact full-image content duplicates: 0
- Empty `href="#"`: 0
- Environment leakage: 0
- Production noindex: 0
- PII in exported content: 0

## Build

- `npm run build`: passed, exit code 0
- Compile: passed
- Type check: passed
- Page data collection: passed
- Static generation: 156/156
- Export: passed
- `export:clean`: passed
- Products: 36
- Resources: 15
- Sitemap: 76
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15

## Local Responsive QA

Thirteen representative products were checked at 375, 390, 430, 768, and 1280 pixels: the single-image product, four RCU products, two AI displays, three smart panels, one sensor, one doorplate, and one robot. All 65/65 combinations passed.

- Horizontal overflow: 0
- Broken images: 0
- Console errors: 0
- Network failures: 0
- Multi-image thumbnail switching: passed
- Single-image product thumbnail rail: correctly omitted

## Deployment

- Implementation commit: `8dd42d6e724862f88ddbb7ca288fd973280b651d`
- Commit message: `content: refine product gallery ordering`
- GitHub Actions run: `29716118859`
- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29716118859`
- Runner result: succeeded
- Exact source SHA: confirmed
- Previous release: `/srv/dualcorelink/frontend/releases/3473de1bf2bb-20260717-223207`
- New/current release: `/srv/dualcorelink/frontend/releases/8dd42d6e7248-20260720-120903`
- Atomic current symlink switch: confirmed
- Health checks: passed
- Rollback: not triggered
- Retained releases visible after deployment: 5

## Production QA

- Product pages: 36/36 HTTP 200
- Sitemap URLs: 76/76 HTTP 200
- HTTP 4xx: 0
- HTTP 5xx: 0
- Product JSON-LD: 36/36
- Full and thumbnail assets: 264/264 HTTP 200 with `image/webp`
- Production/local asset hash matches: 264/264
- Production Gallery CSS: loaded and contains the required main-image, thumbnail, active-state, responsive, overflow, object-fit, and aspect-ratio rules
- Representative responsive QA: 65/65 passed across 375, 390, 430, 768, and 1280 pixels
- Representative thumbnail switching: 12/12 passed
- Horizontal overflow: 0
- Broken images: 0
- Console errors: 0
- Network failures: 0
- Environment leakage: 0
- PII: 0

## Git Record

- Implementation commit: `8dd42d6e724862f88ddbb7ca288fd973280b651d`
- Implementation message: `content: refine product gallery ordering`
- Acceptance-report commit: created with message `docs: add product gallery phase 2 review`

## Risks and Observations

- The Rotary Knob Smart Control Display remains the only single-image product because no verified same-model alternate image exists.
- The remaining work is a photography/content acquisition task, not a code defect.
- Thumbnail images outside the viewport use native lazy loading; production QA evaluates the visible hero separately and verifies all 264 assets by direct HTTP request.
- No new image asset was needed for the two hero corrections because verified alternate views were already in the existing gallery inventory.

## Final Status

Product Gallery Phase 2 passed. The gallery inventory remains authentic, the two product-first hero/order corrections are deployed, the production release is healthy, and the single-image exception is documented with a concrete reshoot plan.
