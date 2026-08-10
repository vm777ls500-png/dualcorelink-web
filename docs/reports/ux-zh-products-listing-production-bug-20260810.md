# Chinese Products Listing Production Bug

Date: 2026-08-10 (Asia/Shanghai)

## Scope

This hotfix investigates and repairs the empty Product catalog on
`/zh/products/`. It does not change translated Product content, Product detail
pages, WordPress data, database state, Nginx, sitemap, canonical, hreflang, or
another locale. The branch is based on production commit
`05f2892697a0f6a74e158f2162ed1c2c90405310`.

## Production Reproduction

| Check | Chinese | English |
| --- | ---: | ---: |
| HTTP status | 200 | 200 |
| Product listing cards | 0 | 36 |
| Product card titles | 0 | 36 |
| Product card images | 0 | 36 |
| Unique Product detail targets | 4 editorial links | 36 catalog links |
| `#product-results` | absent | present |
| Catalog category/series filters | absent | present |
| Hydration error markers | 0 | 0 |
| Horizontal overflow | 0 | 0 |

The four Chinese Product links came from the translated editorial page's
related-links section. They were not catalog cards. The Chinese page produced
no page console warnings or errors during the focused reproduction. All 11
referenced Next static assets returned HTTP 200. The English Chrome comparison
recorded two opaque `Error: Ba` entries with an injected/evaluated stack and no
site source URL; they were absent from the clean local export and are treated as
browser instrumentation noise, not a hotfix regression.

Classification: **C - Product data never reached the listing component**.
This was not hidden CSS, a default filter, hydration removal, or a network
failure.

## CMS Read-Only Audit

The public WordPress REST collection returned 72 published Product records:

- English: 36 published, 36 unique slugs.
- Chinese: 36 published, 36 unique slugs.
- Chinese Product IDs: 36 present.
- Chinese translation groups: present.
- Chinese short descriptions: 36 present.
- CMS writes: 0.

The Chinese imported records intentionally do not carry Product taxonomy or
media assignments. The English records retain all 10 category term IDs and
the source media relationships. The existing Product detail implementation
uses the approved localized publication payload for Chinese content.

Therefore the correct existing architecture for the listing is:

1. English Product inventory for structural data: slug, taxonomy, series, and
   media fallback.
2. Approved Chinese localized publication payload for card title and summary.
3. Chinese route generation for every Product detail href.

## Root Cause

`src/app/[locale]/products/page.tsx` looked up the localized Product-listing
publication and immediately returned `LocalizedPublicationPageView` whenever
one existed. Because Chinese has an approved `product-listing` publication,
the page returned before calling `productRepository.list(locale)` and before
rendering `ProductFilteredList`.

Chinese Product details were independently generated from localized Product
payloads, which explains why all 36 detail routes worked while their listing
was empty.

## Hotfix

- Chinese Product listing now reads the English Product inventory as its
  structural source.
- It overlays the approved Chinese Product publication title and summary for
  each released slug.
- Category slugs, series membership, and Product imagery remain sourced from
  the established English inventory and static image map.
- All Product card hrefs are generated under `/zh/products/`.
- The existing Chinese listing metadata and hero copy remain in use.
- The unpublished Chinese application-scenario links are not rendered.
- Filter reset now writes an explicit empty history state, removes the hash,
  and restores all 36 products while preserving browser back/forward behavior.
- Pending locales retain their previous publication behavior.

## Files Changed

- `src/app/[locale]/products/page.tsx`
- `src/components/content/product-filtered-list.tsx`
- `src/lib/product-listing.ts`
- `tests/zh-products-listing-hotfix.test.ts`
- `docs/reports/ux-zh-products-listing-production-bug-20260810.md`

No content payload, Product detail page, CMS, infrastructure, SEO routing, or
visual stylesheet was modified.

## Targeted Validation

- Focused hotfix tests: 7/7 passed.
- Targeted ESLint: passed.
- `git diff --check`: passed.
- Production-style build: passed.
- Static generation: 218/218.
- Multilingual export audit: 69 localized pages passed.
- Sitemap: 145.

The targeted tests cover:

- Chinese listing source count 36.
- Chinese Product detail href count 36.
- All Chinese hrefs under `/zh/products/`.
- English listing count 36 and unchanged data.
- Chinese titles and summaries do not fall back to English.
- Category filtering returns results.
- Series filtering returns results.
- Reset restores 36.
- Internal query href count 0.
- Pending locales retain their existing source behavior.

## Browser QA

Focused local-export checks covered `/zh/products/` and `/en/products/` at
390px and 1280px.

- Chinese initial cards: 36.
- Chinese titles with Chinese text: 36/36.
- Chinese unique Product targets: 36/36.
- English cards and unique Product targets: 36/36.
- Category filter representative result: 5.
- Series filter representative result: 10.
- Reset result: 36.
- Browser back restored the filtered result; forward restored the reset state.
- Representative Product navigation opened a `/zh/products/<slug>/` route.
- Product images: 36 loaded after the lazy-loading sweep; broken images 0.
- Console warnings/errors: 0 in the clean local export.
- Hydration errors: 0.
- Horizontal overflow: 0 at both viewports.
- Internal query URLs: 0.

## Other Chinese Product Entrances

- Chinese homepage: no dedicated Product-detail block exists in the current
  production HTML; the general Product listing navigation remains available.
- Chinese Solutions listing: four unique Chinese Product targets remain.
- Chinese Resources listing: four unique Chinese Product targets remain.
- Header Products menu: existing Chinese listing/category/series navigation and
  four featured Chinese Product targets remain unchanged.

The listing defect was isolated to the early return in the Product listing
page. It did not remove existing Product links from Solutions, Resources, or
the Header.

## Release State

The hotfix is prepared on
`hotfix/zh-products-listing-visible-20260810`. Production, `main`, WordPress,
and infrastructure were not changed. Deployment requires a separate review
and authorization step.
