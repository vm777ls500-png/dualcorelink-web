# SEO Growth Phase 2B Resources Listing Page Enhancement

Date: 2026-07-09

## Objective

Enhance `/en/resources/` as a clearer B2B SEO content entry point and conversion entry point after Phase 2A added the first batch of Resource / Guide pages.

This phase did not address Cloudflare Git build, public WordPress REST API, or Headless CMS architecture.

## Modified Files

- `src/app/[locale]/resources/page.tsx`
- `src/config/resources.ts`
- `src/lib/schema/builders.ts`
- `docs/reports/seo-growth-phase-2b-resources-listing-enhancement-20260709.md`

## Page Enhancements

- Reworked the Resources hero with a buyer-focused introduction for hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers.
- Added a Featured Guides section for high-intent B2B topics:
  - Hotel RCU Buying Guide
  - Smart Hotel Room Control System Guide
  - OEM/ODM Smart Panel Customization Guide
- Added resource grouping:
  - Buying Guides
  - Hotel Automation Guides
  - OEM/ODM Guides
  - Technical Resources
- Enhanced resource cards with:
  - Resource type
  - Resource group
  - Reading time
  - Summary
  - Primary related solution link
  - Primary related product link
  - Audience tags
  - Read Guide CTA
  - Request a Quote CTA
- Added stronger internal links to:
  - Products
  - Solutions
  - FAQs
  - Downloads
  - Contact / quote inquiry

## SEO and Schema

- Kept the existing CollectionPage JSON-LD on `/en/resources/`.
- Kept BreadcrumbList JSON-LD on `/en/resources/`.
- Added ItemList JSON-LD for Resource listing entries using the existing JSON-LD rendering pattern.
- Did not change Resource detail Article JSON-LD.
- Did not change sitemap generation. Sitemap remains config-driven and continues to include `/en/resources/` plus all Resource detail URLs.

## QA Commands and Results

Commands:

- `npm.cmd run lint`
- `npm.cmd run test:data`
- `WORDPRESS_REST_ROOT=http://127.0.0.1:8080/wp-json npm.cmd run build`
- `git diff --check`

Results:

- Lint: passed
- Data tests: passed, 27/27
- Build: passed, 147 static pages generated
- Static export: passed, `out/` generated
- `git diff --check`: passed with CRLF warnings only

## Local Static Page QA

Checked local static export through a temporary local server serving `out/`.

Pages covered:

- `/en/resources/`
- `/en/resources/hotel-rcu-buying-guide/`
- `/en/resources/smart-hotel-room-control-system-guide/`
- `/en/resources/hotel-smart-switch-panel-guide/`
- `/en/resources/oem-odm-smart-panel-customization-guide/`
- `/en/resources/hotel-guest-room-automation-guide/`

Responsive breakpoints:

- 375
- 390
- 430
- 768
- 1280

Result:

- 30/30 headless Chrome checks passed
- No horizontal scrolling found
- Header visible
- Main content visible
- CTA links present
- No empty `href="#"` links found
- Resource listing page has CollectionPage, BreadcrumbList, and ItemList JSON-LD
- Resource detail pages retain Article and BreadcrumbList JSON-LD

## Safety Checks

No new unsafe claims were introduced:

- No fake price
- No fake review
- No fake rating
- No local office claim
- No local stock claim
- No local distributor network claim
- No guaranteed local certification claims

## Issues Found

No functional or SEO-blocking issues were found after the final QA pass.

One QA script assertion was adjusted during local verification because the first check used an overly strict text matching rule for listing page group labels. The page output itself was correct.

## Code Fixes

Code changes were limited to the planned Resources listing enhancement:

- Added config-driven listing groups and featured priorities.
- Added an ItemList schema builder.
- Updated the Resources listing page layout and internal link structure.

No product, solution, FAQ, region, contact, redirect, hreflang, Catalog PDF, or Cloudflare configuration code was modified.

## Build Result

Build passed with local WordPress REST available at:

- `http://127.0.0.1:8080/wp-json`

The local REST URL was used only as a temporary command environment value for build verification and was not written to source files or Cloudflare environment variables.

## Git Status

Final git status after commit and push should be:

- `main...origin/main`

## Commit and Push

Commit ID:

- Generated after this report is committed.

Push:

- To be completed after commit.
