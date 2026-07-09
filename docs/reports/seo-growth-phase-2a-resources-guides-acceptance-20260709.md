# SEO Growth Phase 2A Resources Guides Acceptance Report

## Stage Goal

SEO Growth Phase 2A expands the English B2B Resources / Guides library without changing the global site architecture. The work focuses on content growth, internal links, SEO metadata, Article schema reuse, sitemap inclusion, and responsive QA for overseas hotel project buyers, contractors, system integrators, distributors, and OEM/ODM buyers.

## New Pages

- `/en/resources/hotel-rcu-buying-guide/`
- `/en/resources/smart-hotel-room-control-system-guide/`
- `/en/resources/hotel-smart-switch-panel-guide/`
- `/en/resources/oem-odm-smart-panel-customization-guide/`
- `/en/resources/hotel-guest-room-automation-guide/`

Existing Resource retained:

- `/en/resources/what-is-hotel-rcu-room-control-system/`

## Modified Files

- `src/config/resources.ts`
- `src/app/[locale]/resources/page.tsx`
- `src/app/[locale]/resources/[slug]/page.tsx`
- `tests/seo-schema.test.ts`
- `docs/reports/seo-growth-phase-2a-resources-guides-acceptance-20260709.md`

## Implementation Summary

- Added 5 English B2B guide entries to the existing static resources config.
- Added supported resource metadata fields: `h1`, `topic`, and `readingTime`.
- Reused the existing Resources list page and detail route.
- Reused the existing Article JSON-LD and BreadcrumbList JSON-LD mechanism.
- Fixed the Resource detail H1 to render from resource data instead of the first RCU guide title.
- Kept Resources sitemap generation config-driven through `resources.map(...)`.
- Did not add a new project or install dependencies.

## SEO, Schema, And Sitemap QA

- SEO title and meta description are populated from each resource config entry.
- Canonical URLs resolve to `https://dualcorelink.com/en/resources/<slug>/`.
- Hreflang remains English and `x-default` only.
- Article JSON-LD exists on every Resource detail page.
- BreadcrumbList JSON-LD exists on every Resource detail page.
- CollectionPage JSON-LD remains on `/en/resources/`.
- Sitemap URL count changed from 62 to 67.
- Sitemap includes `/en/resources/` and all 6 Resource detail URLs.
- Sitemap contains no non-English Resource URLs.
- Sitemap contains no PDF URLs.

## Responsive QA

Headless browser checks covered:

- `/en/resources/`
- `/en/resources/what-is-hotel-rcu-room-control-system/`
- `/en/resources/hotel-rcu-buying-guide/`
- `/en/resources/smart-hotel-room-control-system-guide/`
- `/en/resources/hotel-smart-switch-panel-guide/`
- `/en/resources/oem-odm-smart-panel-customization-guide/`
- `/en/resources/hotel-guest-room-automation-guide/`

Breakpoints checked:

- 375 px
- 390 px
- 430 px
- 768 px
- 1280 px

Results:

- 35 responsive page checks passed.
- H1 rendered correctly on each page.
- Header exists at every checked breakpoint.
- Primary quote CTA exists.
- WhatsApp CTA exists on Resource detail pages.
- Downloads CTA exists on Resource detail pages.
- No horizontal overflow detected.

## Internal Link QA

Local static output returned HTTP 200 for sampled Resource, Solution, Product, Region, Downloads, and Contact links, including:

- `/en/resources/`
- `/en/resources/hotel-rcu-buying-guide/`
- `/en/resources/smart-hotel-room-control-system-guide/`
- `/en/resources/hotel-smart-switch-panel-guide/`
- `/en/resources/oem-odm-smart-panel-customization-guide/`
- `/en/resources/hotel-guest-room-automation-guide/`
- `/en/solutions/rcu-room-control-solution/`
- `/en/solutions/hotel-guest-room-control-solution/`
- `/en/solutions/oem-odm-custom-panel-solution/`
- `/en/products/rcu-controller-cabinet/`
- `/en/products/hotel-smart-room-rcu-host-1/`
- `/en/products/86-type-ai-smart-control-display/`
- `/en/products/smart-single-key-switch-panel/`
- `/en/products/vintage-gold-four-key-smart-switch-panel/`
- `/en/regions/middle-east/`
- `/en/regions/southeast-asia/`
- `/en/downloads/`
- `/en/contact/`

## Safety QA

- No fake price found.
- No fake review found.
- No fake rating found.
- No local office claim found.
- No local stock claim found.
- No certified for Saudi / UAE / Vietnam claim found.
- No `pages.dev`, `localhost`, `127.0.0.1`, or `C:\` leakage found in checked output.
- No empty `href="#"` links found in checked output.

## Commands And Results

- `npm.cmd run lint`: passed.
- `npm.cmd run test:data`: passed, 27/27.
- `npm.cmd run build`: passed, 147 static pages generated.
- `git diff --check`: passed, CRLF warnings only.
- Static sitemap check: passed, 67 URLs.
- Headless responsive QA: passed, 35 checks.
- Local static internal link sample: passed, all sampled URLs returned HTTP 200.

## Issues Found

- The first test run failed because the sitemap assertion still expected 62 URLs. The assertion was updated to follow `61 + resources.length` and to verify every Resource slug.
- The Resource detail H1 was hardcoded to the first RCU guide. It was updated to render `resource.h1`.

## Code Fixes

- Yes. One scoped Resource template fix was made so every Resource detail page renders its own H1.
- No global architecture, product data, FAQ data, Region content, Contact information, Catalog PDF, redirect, or hreflang changes were made.

## Final Status

- Commit ID: recorded in the final completion response after this report is committed.
- Push status: recorded in the final completion response after push.
- Final git status: recorded in the final completion response after push.
