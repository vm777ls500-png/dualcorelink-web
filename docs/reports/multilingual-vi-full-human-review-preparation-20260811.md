# Multilingual Vietnamese Full Human Review Preparation

Date: 2026-08-11  
Base production SHA: `38568189d19ba43472fb6fbdff824b416407e2e9`  
Branch: `review/vi-full-human-review-20260811`

## Scope

Prepared the complete 69-page Vietnamese candidate set and recorded Allan's full-batch approval dated 2026-08-11. No CMS write, database write, merge, deployment, or production exposure was performed during the approval seal.

## Inventory

- Products: 36
- Solutions: 6
- Resources: 15
- Regions: 5
- Static pages: 3
- Listings: 4
- Total: 69
- CMS-backed candidates: 42
- File-backed candidates: 27

All 69 manifest entries are `nativeReviewStatus=approved` with reviewer Allan and review date 2026-08-11. Pending is 0 and `productionReleaseReady=true` remains 0.

## Technical Root Cause

The shared preview and specialized composition gates were still limited to Arabic, while several localized UI and composition helpers treated any non-English candidate as Chinese or fell back to English. Vietnamese candidates could therefore reach the generic localized view or render incomplete/incorrect shared labels. The review build also exposed the locale only to server code, creating Header/Footer hydration differences in the client bundle.

## Implemented Preparation Fixes

- Added Vietnamese to the build-only review-preview locale allowlist.
- Synchronized the review locale into server and client build environments.
- Enabled all 11 Vietnamese specialized route families.
- Added Vietnamese product listing, detail, gallery, purchasing, conversion, relationship, static-page, FAQ, Contact, navigation, and accessibility copy.
- Preserved shared product media/specification structures and existing localized candidate facts.
- Redirected candidate-only technical-guide links from unavailable Vietnamese Downloads to Vietnamese Resources.
- Kept Vietnamese LTR; no Arabic bidi or RTL rules were copied.

## Composition Parity

- Products: 36/36; gallery 132/132; hero/order/full-thumbnail parity 36/36.
- Solutions: 6/6 with media, related products, FAQ, CTA, and Service schema.
- Resources: 15/15 with full article, mid CTA, recommended products, relevant solutions, continue reading, bottom CTA, and Article schema.
- Regions: 5/5 with procurement content, recommendations, FAQ, CTA, relationships, and schema.
- Listings: 36/6/15/5.
- FAQ: 30/30.
- Contact: full form, attribution, analytics binding, and mailto/WhatsApp fallbacks; no inquiry sent.

## SEO and Link Audit

The review export contains 69 Vietnamese HTML pages and 69 matching RSC/index.txt files.

- Self-canonical errors: 0
- `lang=vi` errors: 0
- LTR errors: 0
- Hreflang errors across en/zh/ar/vi/x-default: 0
- JSON-LD parse errors: 0
- BreadcrumbList: 69
- Product: 36
- Service: 6
- Article: 15
- FAQPage: 1
- ContactPage: 1
- Unique Vietnamese internal targets checked: 70
- Broken targets: 0
- English content fallback links: 0
- Query URLs: 0
- Han-script candidate content matches: 0
- Arabic-script candidate content matches: 0

Production remains unchanged: sitemap 214, Vietnamese sitemap URLs 0, Vietnamese public pages 0. German, Spanish, and Persian remain pending.

## Validation

- Targeted Vietnamese tests: 6/6 passed.
- Lint: passed.
- Review build: passed.
- Raw static generation: 342/342.
- Multilingual export audit: 207 renderable localized pages.
- Production sitemap baseline: 214.
- `git diff --check`: passed.

## Browser QA

Fourteen allowed combinations were checked at 390 px and 1280 px across listings, Products, Solution, Resources, Region, About, Contact, and FAQs.

- `lang=vi`: 14/14
- LTR: 14/14
- English content fallback: 0
- Loaded broken images: 0
- Horizontal overflow: 0
- Console errors: 0
- Hydration errors: 0
- Product listing: 36 links
- FAQ: 30 items
- Contact: 22 named controls; no submission
- Gallery thumbnail switching: passed
- FAQ accordion: passed
- Mobile navigation closes after navigation: passed
- EN to VI and VI to EN switching: passed

## Human Review Status

Allan approved the exact 69-page Vietnamese inventory on 2026-08-11. The next action is the separately gated 42-record CMS publication; frontend release readiness must remain disabled until CMS verification and publication succeed.

## Safety Boundaries

- Vietnamese approved: 69
- `productionReleaseReady=true`: 0
- Vietnamese public: 0
- Vietnamese sitemap URLs: 0
- CMS writes: 0
- Database writes: 0
- Commits: 0
- Pushes: 0
- Deployments: 0
