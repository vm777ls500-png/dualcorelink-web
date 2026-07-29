# DualCoreLink SEO Growth — Multilingual Phase M2A

## Arabic + Chinese P0 Content Implementation

Date: 2026-07-28
Status: implemented and verified locally; not committed, pushed, deployed, or
written to the production CMS.

## 1. Scope and source controls

This phase implements exactly the Arabic and Chinese P0 lists approved in:

- `docs/reports/seo-operations-multilingual-content-architecture-plan-20260728.md`
- `docs/reports/seo-growth-multilingual-foundation-m1-20260728.md`
- `docs/runbooks/multilingual-content-publishing.md`

The English source pages, English slugs, English canonical URLs, GSC workflows,
and unrelated worktree changes were not modified. No P1 or P2 page was enabled.

Delivery totals:

| Locale | File-backed pages | CMS import records | Total P0 | Complete |
|---|---:|---:|---:|---:|
| Arabic (`ar`) | 9 | 6 | 15 | 15 |
| Chinese (`zh`) | 5 | 7 | 12 | 12 |
| Total | 14 | 13 | 27 | 27 |

## 2. Arabic P0 delivery status

All Arabic content uses Modern Standard Arabic, target-language metadata and
UI copy, `lang="ar"`, and `dir="rtl"`.

| URL | Source | Status |
|---|---|---|
| `https://dualcorelink.com/ar/about/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/contact/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/faqs/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/products/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/solutions/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/regions/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/solutions/rcu-room-control-solution/` | CMS import payload; English source ID `140` | Approved and export-ready |
| `https://dualcorelink.com/ar/solutions/smart-hotel-automation-solution/` | CMS import payload; English source ID `138` | Approved and export-ready |
| `https://dualcorelink.com/ar/solutions/hotel-guest-room-control-solution/` | CMS import payload; English source ID `137` | Approved and export-ready |
| `https://dualcorelink.com/ar/regions/middle-east/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/regions/saudi-arabia/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/regions/uae/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/ar/products/hotel-smart-room-rcu-host-1/` | CMS import payload; English source ID `48` | Approved and export-ready |
| `https://dualcorelink.com/ar/products/rcu-controller-cabinet/` | CMS import payload; English source ID `47` | Approved and export-ready |
| `https://dualcorelink.com/ar/products/86-type-ai-smart-control-display/` | CMS import payload; English source ID `6` | Approved and export-ready |

## 3. Chinese P0 delivery status

All Chinese content uses natural Simplified Chinese B2B hotel-engineering
language, target-language metadata and UI copy, and `lang="zh"`.

| URL | Source | Status |
|---|---|---|
| `https://dualcorelink.com/zh/about/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/zh/contact/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/zh/faqs/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/zh/products/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/zh/solutions/` | Local file | Approved and export-ready |
| `https://dualcorelink.com/zh/solutions/oem-odm-custom-panel-solution/` | CMS import payload; English source ID `142` | Approved and export-ready |
| `https://dualcorelink.com/zh/solutions/rcu-room-control-solution/` | CMS import payload; English source ID `140` | Approved and export-ready |
| `https://dualcorelink.com/zh/solutions/smart-hotel-automation-solution/` | CMS import payload; English source ID `138` | Approved and export-ready |
| `https://dualcorelink.com/zh/products/hotel-smart-room-rcu-host-1/` | CMS import payload; English source ID `48` | Approved and export-ready |
| `https://dualcorelink.com/zh/products/rcu-controller-cabinet/` | CMS import payload; English source ID `47` | Approved and export-ready |
| `https://dualcorelink.com/zh/products/86-type-ai-smart-control-display/` | CMS import payload; English source ID `6` | Approved and export-ready |
| `https://dualcorelink.com/zh/products/smart-four-key-scene-control-panel/` | CMS import payload; English source ID `222` | Approved and export-ready |

## 4. Content implementation

File-backed localized content:

- `src/content/locales/ar/pages.ts`
- `src/content/locales/zh/pages.ts`
- `src/content/locales/ar/index.ts`
- `src/content/locales/zh/index.ts`
- `src/content/locales/types.ts`
- `src/content/locales/ui.ts`

The pages include localized SEO titles, meta descriptions, H1, structured
H2/H3 content, breadcrumbs, FAQs, procurement guidance, related links, CTA
copy, and image alternative text. No placeholder content or copied English
body was used.

The shared glossary is in `src/content/locales/glossary.ts`. It governs Arabic
and Chinese terminology for Hotel Room Control Unit, GRMS, room control
systems, panels, thermostats, occupancy sensors, doorplates, renovation,
OEM/ODM, wiring architecture, energy management, integrators, owners, and
contractors.

## 5. CMS translation import package

Products and Solutions are represented by 13 deterministic,
validation-enforced import records:

- `src/content/locales/cms-import/ar.ts`: 6 records
- `src/content/locales/cms-import/zh.ts`: 7 records
- `src/content/locales/cms-import/types.ts`
- `src/content/locales/cms-import/index.ts`

Each record contains the verified English source content ID and slug, translated
title, description, specifications, SEO title, meta description, complete
structured content, translation/review state, and an immutable import key.
`localizedContentId` remains `null`, correctly recording that no translated CMS
record has been created. The package did not connect to or write to the
production CMS.

## 6. Manifest and publication gates

The manifest remains complete at 414 records: 69 English sources across six
target locales. Exactly 27 M2A records now satisfy all four gates:

- `translationStatus = approved`
- `seoMetadataStatus = approved`
- `contentReviewStatus = approved`
- `publishReady = true`

The remaining 387 records stay `missing`, are not exported, do not enter the
sitemap or hreflang graph, and continue to use the existing English-target 301
policy.

The audit also verifies that an approved CMS record has a real English source
ID, complete structured content, metadata, and an import-only delivery mode.
Changing a status without that evidence fails the audit.

## 7. Sitemap, hreflang, canonical, and redirects

- English sitemap baseline: 76 URLs.
- Approved M2A additions: 27 URLs.
- Local build sitemap total: 103 URLs.
- Each localized page has a self-referencing canonical.
- Each localized page emits `en`, its available approved `ar`/`zh` alternate,
  and `x-default`.
- Seventeen distinct English source pages emit reciprocal alternates to the
  corresponding 27 localized pages.
- No hreflang references an unpublished locale, 301, 404, or shell page.
- Nginx has exact allowlist exceptions for the 27 approved paths.
- All other non-English paths retain the generic English-target 301.
- The six-language legacy redirect was not removed.

## 8. Rendering and schema

`src/components/content/localized-publication-page.tsx` renders the structured
content without reusing English body copy. Localized page routes use the
manifest gate before rendering or generating metadata.

The output preserves the applicable schema type:

- Product for product detail pages
- Service for solution detail pages
- FAQPage where localized FAQs are present
- BreadcrumbList on every localized page
- CollectionPage, AboutPage, or ContactPage where applicable

Translatable JSON-LD fields use the page language. No Offer, price, rating,
review, availability, certification, performance, or other unverified claim
was added.

## 9. Export and deployment controls

Static export cleanup now:

- keeps only the exact 27 approved Arabic/Chinese paths;
- removes unapproved Arabic and Chinese route shells;
- removes all generated `de`, `es`, `vi`, and `fa` route shells;
- sets final document language and Arabic RTL direction;
- leaves English pages unchanged.

The future production workflow and static deployment gate expect 172 generated
routes, 103 sitemap URLs, 15 Arabic output pages, and 12 Chinese output pages.
No deployment was run in this phase.

## 10. Validation results

| Check | Result |
|---|---|
| `npm run multilingual:audit` | Passed; manifest 414, 69 per locale, eligible 27, blocked 387 |
| `npm test` | Passed, 132/132, using the existing public read-only CMS REST root |
| `npm run lint` | Passed; 0 errors, 2 pre-existing GSC unused-variable warnings |
| `npm run media:audit` | Passed; 0 errors, 1 existing warning |
| `npm run build` | Passed; 172/172 generated |
| Export cleanup | Passed; only approved localized paths retained |
| Multilingual export audit | Passed; 27 localized pages and sitemap 103 |
| Static HTML QA | Passed for all 27 pages: metadata, canonical, hreflang, H1, schema, content, links |
| Responsive QA | 27 pages × 4 widths = 108 checks; 0 horizontal-overflow failures |
| `git diff --check` | Passed |

Responsive coverage used 375, 390, 768, and 1280 pixel widths. It checked the
localized content wrapper, unique H1, header, CTA, product imagery, Arabic RTL,
and horizontal overflow.

## 11. Unfinished and protected items

- The other 387 locale/page combinations remain unpublished and redirected.
- No Arabic or Chinese Resource detail page is included in M2A.
- No production CMS record was created.
- No production deployment, commit, push, or GSC indexing request occurred.
- Native-language editorial approval should still be part of the human release
  review before any commit or production deployment.
- Existing unrelated GSC/API, historical report, dependency, and project
  automation worktree changes were preserved.

## 12. Release recommendation

The implementation is technically ready for human review as a self-contained
M2A candidate. It should not be deployed until reviewers approve the Arabic and
Chinese copy, the 13 CMS import payload records, and the exact 27-path
publication and redirect scope.
