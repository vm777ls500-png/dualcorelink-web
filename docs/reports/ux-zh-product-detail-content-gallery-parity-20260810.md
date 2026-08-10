# Chinese Product Detail Content and Gallery Parity Hotfix

Date: 2026-08-10

## Scope

This hotfix addresses the production discrepancy between the 36 English and Chinese product detail pages. It aligns the product detail structure, media set, ordering, specifications, buying guidance, related products, FAQ, commercial options, CTA, breadcrumb, and Product schema while retaining approved Chinese copy.

No CMS, database, media asset, slug, sitemap, canonical, hreflang, Nginx, or production infrastructure change was made.

## Production Reproduction

- Production baseline commit: `4c9a9d7760027004abc6f78ba627872614efd61a`
- Product pairs checked: 36/36
- Chinese pages using the incomplete generic publication renderer: 36/36
- Chinese pages with fewer gallery images: 35/36
- English product media entries: 132
- Chinese product media shown before the fix: 36
- Missing gallery images before the fix: 96
- Product-body H2 count: English 317, Chinese 288
- Positive numerical H2 deficit before the fix: 31

The H2 deficit is a supporting metric rather than the semantic gate. Some English source fields are optional, while the reviewed Chinese payload always contains specifications and FAQ. The final gate requires every English module that exists for a product to have its Chinese counterpart; additional reviewed Chinese structure is allowed.

## Root Cause

The product detail route called `getLocalizedPublicationPage()` and returned `LocalizedPublicationPageView` immediately for every released Chinese product. That generic renderer used one `productDisplayImages` hero and the localized publication payload, but bypassed:

- the English product repository detail model;
- `productGalleries` and the full/thumbnail media manifest;
- `ProductGallery` ordering and interaction;
- product conversion profiles and buying guidance;
- shared commerce, relationship, and specification structure;
- the full product detail Product schema path.

The defect is therefore a frontend composition issue: categories C and D from the investigation, with the generic payload also providing fewer detail-specific fields than the English model. The Chinese CMS records were published and valid; no CMS repair was required.

## Architecture Fix

The route now composes each released Chinese product from:

- immutable English product structure, media references, commerce fields, and relationships;
- the existing reviewed Chinese publication title, description, sections, specifications, FAQ, metadata, and CTA context;
- the same product gallery manifest, full images, thumbnails, source order, and hero image used by English;
- Chinese image alt text and localized product-detail labels.

This is a shared composition rule, not 36 page-specific hardcoding. Arabic and pending locales retain their existing publication behavior.

## Files Changed

- `src/app/[locale]/products/[slug]/page.tsx`
- `src/components/contact/whatsapp-button.tsx`
- `src/components/content/contact-cta.tsx`
- `src/components/content/product-gallery.tsx`
- `src/components/content/product-project-buying-guide.tsx`
- `src/lib/localized-product-detail.ts`
- `tests/zh-product-detail-parity.test.ts`
- `docs/reports/ux-zh-product-detail-content-gallery-parity-20260810.md`

## 36-Page Comparison Matrix

`ZH sections before` was 8 for every product because all pages used the same generic renderer. `Missing H2` is the positive numerical deficit before the fix. Final PASS means equal media count, no missing English semantic module, Product schema present, and no query-bearing product URL.

| Slug | EN images | ZH before | Missing images | EN sections | ZH sections before | Missing H2 | ZH after images | ZH after sections | Final |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 86-type-ai-smart-control-display | 5 | 1 | 4 | 10 | 8 | 2 | 5 | 11 | PASS |
| ai-large-smart-display | 3 | 1 | 2 | 9 | 8 | 1 | 3 | 11 | PASS |
| ai-music-control-panel | 5 | 1 | 4 | 9 | 8 | 1 | 5 | 11 | PASS |
| borui-red-matte-room-status-four-key-switch-panel | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |
| borui-red-matte-triple-socket-panel | 2 | 1 | 1 | 8 | 8 | 0 | 2 | 11 | PASS |
| borui-red-matte-usb-five-hole-socket | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |
| brushed-aluminum-86-base-doorbell-panel | 5 | 1 | 4 | 11 | 8 | 3 | 5 | 11 | PASS |
| brushed-aluminum-sos-alarm-panel | 4 | 1 | 3 | 8 | 8 | 0 | 4 | 11 | PASS |
| brushed-aluminum-thermostat-control-panel | 4 | 1 | 3 | 8 | 8 | 0 | 4 | 11 | PASS |
| brushed-aluminum-voice-telephone-information-panel | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |
| embedded-human-presence-sensor | 5 | 1 | 4 | 10 | 8 | 2 | 5 | 11 | PASS |
| hotel-ceiling-background-speaker | 3 | 1 | 2 | 7 | 8 | 0 | 3 | 10 | PASS |
| hotel-delivery-robot | 5 | 1 | 4 | 9 | 8 | 1 | 5 | 10 | PASS |
| hotel-delivery-robot-charging-dock | 5 | 1 | 4 | 7 | 8 | 0 | 5 | 10 | PASS |
| hotel-guest-room-doorbell | 4 | 1 | 3 | 10 | 8 | 2 | 4 | 11 | PASS |
| hotel-room-door-magnetic-sensor | 5 | 1 | 4 | 10 | 8 | 2 | 5 | 11 | PASS |
| hotel-smart-delivery-cabinet | 5 | 1 | 4 | 9 | 8 | 1 | 5 | 10 | PASS |
| hotel-smart-room-rcu-host-1 | 3 | 1 | 2 | 10 | 8 | 2 | 3 | 11 | PASS |
| hotel-smart-room-rcu-host-2 | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |
| hotel-smart-room-rcu-host-3 | 4 | 1 | 3 | 8 | 8 | 0 | 4 | 11 | PASS |
| infrared-repeater | 5 | 1 | 4 | 10 | 8 | 2 | 5 | 11 | PASS |
| rcu-controller-cabinet | 5 | 1 | 4 | 10 | 8 | 2 | 5 | 11 | PASS |
| rotary-knob-smart-control-display | 1 | 1 | 0 | 10 | 8 | 2 | 1 | 11 | PASS |
| smart-curtain-motor | 5 | 1 | 4 | 8 | 8 | 0 | 5 | 11 | PASS |
| smart-footlight-night-light-panel | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |
| smart-four-key-curtain-control-panel | 3 | 1 | 2 | 10 | 8 | 2 | 3 | 11 | PASS |
| smart-four-key-scene-control-panel | 2 | 1 | 1 | 8 | 8 | 0 | 2 | 11 | PASS |
| smart-key-card-energy-saver-panel | 4 | 1 | 3 | 10 | 8 | 2 | 4 | 11 | PASS |
| smart-series-dual-vertical-socket-panel | 2 | 1 | 1 | 8 | 8 | 0 | 2 | 11 | PASS |
| smart-single-key-switch-panel | 2 | 1 | 1 | 8 | 8 | 0 | 2 | 11 | PASS |
| smart-three-key-music-control-panel | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |
| smart-usb-five-hole-socket | 3 | 1 | 2 | 10 | 8 | 2 | 3 | 11 | PASS |
| smart-voice-telephone-information-socket | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |
| thermostat-hvac-control-panel | 5 | 1 | 4 | 10 | 8 | 2 | 5 | 11 | PASS |
| vintage-gold-four-key-smart-switch-panel | 4 | 1 | 3 | 8 | 8 | 0 | 4 | 11 | PASS |
| vintage-gold-key-card-energy-saver-panel | 3 | 1 | 2 | 8 | 8 | 0 | 3 | 11 | PASS |

## Final Parity

- Product pairs: 36/36 PASS
- English gallery media: 132
- Chinese gallery media: 132
- Missing Chinese gallery media: 0
- Gallery hero/source/order/full/thumb mismatches: 0
- Missing English semantic modules in Chinese: 0
- Chinese hero alt present: 36/36
- Chinese Product schema: 36/36
- Query-bearing Chinese product links: 0
- Chinese public pages: 69
- Sitemap URLs: 145

The shared module set covers product overview, core functions, product features, application scenarios, buying guidance when present in English, installation, customizable options, specifications, related products when present, FAQ, commercial options, quote CTA, breadcrumb, gallery, and Product schema.

## Targeted Validation

- Targeted parity tests: 5/5 PASS
- ESLint: PASS
- Product media audit: PASS; errors 0, existing warning 1
- Production build: PASS
- Static generation: 218/218
- Multilingual export audit: 69 localized pages PASS
- Sitemap: 145
- `git diff --check`: PASS
- CMS/database writes: 0

## Browser QA

Paired English/Chinese checks covered RCU, AI Display, Smart Panel, Sensor, Socket, and Delivery Robot at 390 and 1280 pixels, for 12 responsive pairs.

- Gallery count parity: 12/12
- Gallery thumbnail switching: 12/12
- Required Chinese sections: 12/12
- Chinese titles and procurement labels: PASS where the corresponding English conversion profile exists
- Delivery Robot: no conversion profile in English or Chinese; parity is correct
- CTA: 12/12
- Broken images: 0
- Horizontal overflow: 0
- Console errors: 0
- Hydration errors: 0
- Query-bearing product links: 0

## Risk and Observation

- Chinese copy remains the approved publication payload and intentionally does not claim unverified model specifications.
- Shared technical and commerce values remain sourced from the English product model; visible labels are localized, while model names and standard technical abbreviations remain unchanged.
- The existing single-image warning for `rotary-knob-smart-control-display` remains unrelated and unchanged.
- No production deployment is part of this hotfix candidate stage.

## Final Status

PASS. The hotfix candidate restores 36/36 Chinese product detail content and gallery parity without CMS writes or media duplication. It is ready for branch review only; `main` and production remain unchanged.
