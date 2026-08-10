# Multilingual AR-2 P0 Detail Human Review Preparation

Date: 2026-08-11

## Scope

AR-2 is a review-preparation batch derived from the multilingual publication manifest at AR-1 commit `fa3690d8d5883ac357d154f7ced2041b299f0d8a`. It contains every Arabic P0 detail page and excludes the seven AR-1 foundation pages.

This phase prepared the AR-2 scope and then recorded Allan's human approval of the exact 14 pages on 2026-08-11. Approval does not publish any page, write CMS/database data, modify production infrastructure, merge main, deploy, or submit indexing requests.

## Exact Inventory

### Products (4)

- `https://dualcorelink.com/ar/products/smart-four-key-scene-control-panel/`
- `https://dualcorelink.com/ar/products/hotel-smart-room-rcu-host-1/`
- `https://dualcorelink.com/ar/products/rcu-controller-cabinet/`
- `https://dualcorelink.com/ar/products/86-type-ai-smart-control-display/`

### Solutions (4)

- `https://dualcorelink.com/ar/solutions/oem-odm-custom-panel-solution/`
- `https://dualcorelink.com/ar/solutions/rcu-room-control-solution/`
- `https://dualcorelink.com/ar/solutions/smart-hotel-automation-solution/`
- `https://dualcorelink.com/ar/solutions/hotel-guest-room-control-solution/`

### Resources (3)

- `https://dualcorelink.com/ar/resources/what-is-hotel-rcu-room-control-system/`
- `https://dualcorelink.com/ar/resources/hotel-rcu-buying-guide/`
- `https://dualcorelink.com/ar/resources/smart-hotel-room-control-system-guide/`

### Regions (3)

- `https://dualcorelink.com/ar/regions/middle-east/`
- `https://dualcorelink.com/ar/regions/saudi-arabia/`
- `https://dualcorelink.com/ar/regions/uae/`

Inventory gate: 14 total, with Product 4, Solution 4, Resource 3, and Region 3.

## Approval Boundary

- Arabic candidates: 69
- AR-1 approved: 7
- AR-2 approved: 14
- Other Arabic pending: 48
- Arabic approved total: 21
- Arabic pending total: 48
- Arabic production-release-ready: 0
- Arabic public pages: 0
- Arabic sitemap URLs: 0

## Review Method

Each Arabic candidate was compared with the current English fact source and specialized renderer. The audit covered metadata, H1, four semantic content sections, specifications where applicable, FAQ, media composition, relationship modules, CTA, canonical, hreflang, structured data, and RTL/bidi behavior.

No English fact, product parameter, compatibility boundary, certification, customer, project, market-share, regulatory, price, inventory, or performance claim was added or changed.

## Automatic Revisions

Seven pages received eight narrowly scoped revisions.

| URL | Field | Before | After | Reason |
|---|---|---|---|---|
| `/ar/products/smart-four-key-scene-control-panel/` | First FAQ question | Awkward doubled Arabic article construction | `ما الاستخدام الأساسي للوحة الذكية ذات المفاتيح الأربعة للتحكم في المشاهد؟` | Natural modern standard Arabic without changing product meaning. |
| `/ar/resources/what-is-hotel-rcu-room-control-system/` | Audience FAQ question | Title nested inside the question with duplicate punctuation | `لمن يناسب هذا الدليل عن نظام RCU للتحكم في غرف الفنادق؟` | Remove machine-style wording and duplicate question mark. |
| `/ar/resources/what-is-hotel-rcu-room-control-system/` | Downloads relationship | English `Download Center` link to `/en/downloads/` | Arabic technical-guides label linking to `/ar/resources/` | Eliminate English fallback to a page with no Arabic candidate. |
| `/ar/resources/hotel-rcu-buying-guide/` | Downloads relationship | English `Download Center` link to `/en/downloads/` | Arabic technical-guides label linking to `/ar/resources/` | Keep review-preview relationships Arabic and query-free. |
| `/ar/resources/smart-hotel-room-control-system-guide/` | Downloads relationship | English `Download Center` link to `/en/downloads/` | Arabic technical-guides label linking to `/ar/resources/` | Keep review-preview relationships Arabic and query-free. |
| `/ar/regions/middle-east/` | Document CTA | Arabic label linked to `/en/downloads/` | Arabic technical-guides label linked to `/ar/resources/` | Remove the unsupported English relationship fallback. |
| `/ar/regions/saudi-arabia/` | Document CTA | Arabic label linked to `/en/downloads/` | Arabic technical-guides label linked to `/ar/resources/` | Remove the unsupported English relationship fallback. |
| `/ar/regions/uae/` | Document CTA | Arabic label linked to `/en/downloads/` | Arabic technical-guides label linked to `/ar/resources/` | Remove the unsupported English relationship fallback. |

## Parity Results

| Family | Scope | Result | Evidence |
|---|---:|---|---|
| Product | 4/4 | PASS | Shared English source composition; 15/15 media items; hero, order, full/thumbnail mapping, four specifications, FAQ, purchasing, conversion, related content, CTA, Product, and BreadcrumbList retained. |
| Solution | 4/4 | PASS | Full specialized 13-module composition, shared media behavior, Arabic related products, FAQ, CTA, Service, and BreadcrumbList retained. |
| Resource | 3/3 | PASS | Full four-section article, mid CTA, recommended products, relevant solutions, continue reading, bottom inquiry, Article, and BreadcrumbList retained. |
| Region | 3/3 | PASS | Market positioning, procurement guidance, recommendations, FAQ, CTA, CreativeWork, CollectionPage, and BreadcrumbList retained without unsupported local claims. |

## Relationship Results

- Broken relationships: 0.
- English fallback hrefs in review content: 0.
- Pending-locale hrefs: 0.
- Internal query URLs: 0.
- Arabic Contact CTAs: present on 14/14 pages.
- Resource and Region document-support links now use the existing Arabic Resources destination instead of an unavailable Arabic Downloads route.

## RTL And Bidi

- Localized route shell: `lang=ar`, `dir=rtl` on 18/18 browser combinations.
- Main-content computed direction: RTL on 18/18.
- Existing AR-T0 bidi helper retained; no second bidi system was introduced.
- RCU, KNX, HVAC, RS485, OEM/ODM, I/O, USB, model, number, and voltage tokens remain isolated and readable.
- Replacement-character leakage: 0.
- Horizontal overflow: 0/18.

The outer Next.js root shell remains the existing site-wide English shell, while the locale layout applies the authoritative Arabic language and direction attributes to the complete page surface. This is the inherited AR-T0 architecture and was not changed in AR-2.

## SEO And Schema

- Candidate self-canonical: 14/14.
- Candidate `ar`, `en`, `zh`, and `x-default` alternates: 14/14 correct in review preview.
- Product schema: 4/4.
- Solution Service schema: 4/4.
- Resource Article schema: 3/3.
- Region CreativeWork/CollectionPage schema: 3/3.
- BreadcrumbList: 14/14.
- Invalid JSON-LD graphs: 0.
- Production sitemap: 145 URLs, HTTP 200.
- Production Arabic sitemap URLs: 0.

## Browser QA

The requested matrix passed: 14 mobile pages at 390 px plus one Product, Solution, Resource, and Region representative at 1280 px, for 18/18 combinations.

- HTTP 200: 18/18.
- Arabic localized shell and RTL main content: 18/18.
- Broken images: 0.
- Console errors: 0.
- Hydration errors: 0.
- Internal network/relationship failures: 0.
- Horizontal overflow: 0.
- Product gallery active-thumbnail switching: 5/5 tested product combinations.
- Header mobile menu: opened, navigated to `/ar/about/`, and closed successfully.
- English relationship fallback: 0.
- Pending-locale relationship link: 0.
- Internal query URL: 0.

During hot recompilation, the first Product visits exposed transient development console warnings. A clean post-compilation recheck returned no warnings or errors; no hydration or production-facing defect was observed.

## Validation

- AR-2 targeted tests: 9/9 passed.
- The existing six-record Arabic P0 owner-waiver guard was updated to require the new Allan approval evidence instead of the superseded pending state. Source IDs, payload mapping, owner-waiver evidence, and CMS publication state were not changed.
- ESLint: passed.
- `git diff --check`: passed before final packaging.
- Review-preview production build: passed; compile and type check passed, static generation completed 280/280, export completed 2/2, export cleanup checked 30 sentinel directories, and multilingual export audit passed 138 renderable localized pages with sitemap 145.

## Review Decisions

- Suggested approve: 14.
- Suggested changes_required: 0.
- Actual AR-2 approved: 14.
- Actual AR-2 pending: 0.
- AR-1 approved: 7, unchanged.
- Other Arabic pending: 48.
- Arabic approved total: 21.
- Arabic pending total: 48.
- Arabic production-release-ready: 0.
- Arabic public pages: 0.
- Arabic production sitemap URLs: 0.

Review packet: `docs/reviews/multilingual/ar-2-p0-details-final-human-review-20260811.md`.

Decision sheet: `docs/reviews/multilingual/ar-2-p0-details-final-decisions-20260811.md`.

## Final Status

PASS - Allan approved the exact 14-page AR-2 P0 detail scope on 2026-08-11. The approval remains fail-closed for production: no page is production-release-ready, no Arabic page is public or included in the sitemap, and no merge, deployment, CMS write, database write, or production publication was performed.
