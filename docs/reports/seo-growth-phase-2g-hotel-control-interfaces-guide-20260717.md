# SEO Growth Phase 2G - Hotel Guest Room Control Interfaces Guide

Date: 2026-07-17

## Scope

Phase 2G adds one English B2B resource about selecting and coordinating hotel guest room control interfaces. The work preserves all existing product, solution, resource, and language slugs and does not modify WordPress content, DNS, Cloudflare, Nginx, or the production database.

## New Resource URL

- https://dualcorelink.com/en/resources/hotel-guest-room-control-interfaces-guide/
- Production status: HTTP 200 over trusted HTTPS
- Public resource total after release: 15

## Search Intent

The guide targets informational, commercial-investigation, B2B procurement, and hotel-project planning intent. It helps hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers compare wall panels, touchscreens, bedside controls, thermostats, and optional mobile control without assuming unsupported integration capabilities.

## Content Structure

- One unique H1
- 22 rendered H2 headings, including shared conversion and related-content modules
- 30 rendered H3 headings
- Buyer-focused introduction, interface selection criteria, room-position planning, wiring and system boundaries, OEM/ODM preparation, maintenance considerations, and project inquiry guidance
- No public price, stock, Offer, availability, review, aggregate rating, or unverified protocol claim

## Comparison Module

The resource detail template now supports an optional responsive comparison-card model. The new guide compares five interface types using four consistent decision fields: best use, main advantage, main consideration, and typical system role. The module stayed within the viewport at 375, 390, 430, 768, and 1280 pixels.

## Product Links

The guide links to verified public product targets for an RCU host, an AI smart control display, a smart scene-control panel, and an HVAC thermostat. Product targets and their production responses were included in the 35/35 internal-target validation.

## Solution Links

The guide links to the hotel guest room control and smart hotel automation solutions. All linked solution slugs exist and returned HTTP 200.

## Resource Links

Continue Reading links target:

- Hotel Smart Switch Panel Guide
- Smart Hotel Room Control System Guide
- Hotel Guest Room Automation Guide

The current guide is excluded from its own recommendations and the new sitemap URL occurs exactly once.

## Existing Article Backlinks

Production HTML confirms backlinks from the three resources listed above. Hotel RCU Buying Guide and Smart Panel Material and Finish Selection Guide were also checked as regression samples. All five old resource pages returned HTTP 200 and retained Recommended Products, Relevant Solutions, and Continue Reading modules.

## Conversion Integration

The page includes the existing mid-article CTA, Recommended Products, Relevant Solutions, Continue Reading, and final Project Inquiry CTA. Contact links preserve resource attribution for `hotel-guest-room-control-interfaces-guide`, and the WhatsApp path reuses the established inquiry implementation.

## GA4 Attribution

Phase 2G reuses the consent-aware inquiry event path. Automated tests confirm the approved event payload remains limited to source type, source slug, CTA location, category, and page path. No duplicate analytics implementation was added.

## Privacy Controls

The attribution test confirms that name, email, phone, company, message, filename, source title, and WhatsApp number are not included in analytics payloads. Production HTML scanning found no PII, environment origin, or test-domain leakage.

## Metadata

- Title: `Hotel Guest Room Control Interfaces Guide | DualCoreLink`
- Canonical: `https://dualcorelink.com/en/resources/hotel-guest-room-control-interfaces-guide/`
- Meta description, Open Graph, and Twitter metadata present
- No production `noindex`
- No non-production canonical or media origin

## Schema

- Article JSON-LD: 15/15 resource pages
- Resource BreadcrumbList: 15/15 resource pages
- Product JSON-LD: 36/36 product pages
- New Article headline matches the resource title
- `mainEntityOfPage` points to the production canonical URL

## Static Export Baseline Recovery

The first Actions run for implementation commit `e7541e1e4e6605513751efda74fa6a61f33e65c4` failed in the Build static export step after Next.js had generated and exported all 156 pages. The cleanup command itself exited successfully; the real failing command was the workflow's stale `155/155` log gate. The release script also retained stale defaults for 14 resources, 75 sitemap URLs, 14 Articles, and 14 BreadcrumbLists.

Fix commit `c1a5693c5eaff3717b596d4dcc8514f464385ee2` updated the workflow and release gates to 156 pages, 15 resources, 76 sitemap URLs, 15 Articles, and 15 BreadcrumbLists. It also made the cleanup script testable, added explicit non-sensitive success/failure diagnostics, and kept filesystem errors nonzero. Sentinel path protection and forbidden-environment scanning remain enabled.

## Validation

- ESLint: passed
- Data tests: 51/51 passed
- Static export cleanup focused tests: 3/3 passed
- Full build: exit code 0 in 26.09 seconds
- Static generation: 156/156
- Export: 2/2
- `export:clean`: exit code 0; two sentinel directories checked
- Resources: 15
- Products: 36
- Sitemap: 76 URLs
- New sitemap URL occurrences: 1
- Internal targets: 35/35 HTTP 200
- `git diff --check`: passed before the fix commit

The cleanup tests cover successful sentinel removal, locale-boundary safety, a real filesystem failure returning nonzero, and alignment between workflow/release gates and the Phase 2G counts.

## Responsive QA

The production guide passed at 375, 390, 430, 768, and 1280 pixels:

- Horizontal overflow: 0
- H1 clipping: 0
- Comparison module overflow: 0
- Broken images: 0
- Empty `href="#"`: 0
- Header, footer, Recommended Products, Relevant Solutions, and Continue Reading present
- Page console errors: 0

Five existing resources also passed local layout regression before implementation commit. Their production HTTP and module-presence regression passed after deployment.

## Deployment

- Workflow: AWS static production deploy
- Successful Actions run: https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29566745256
- Source SHA: `c1a5693c5eaff3717b596d4dcc8514f464385ee2`
- Exact checkout, dependency install, lint, data validation, build, atomic deployment, and test-domain indexing checks: passed
- Local and external health checks: HTTP 200
- Rollback: not triggered

## Release

- Previous release: `/srv/dualcorelink/frontend/releases/e4b54b1e5ef8-20260717-151948`
- New release: `/srv/dualcorelink/frontend/releases/c1a5693c5eaf-20260717-163351`
- Current symlink resolves to the new release
- Nginx: active
- PHP 8.3 FPM: active
- Failed services: 0

## Production QA

- New guide: HTTP 200
- Five existing resource samples: HTTP 200
- Sitemap: HTTP 200 with 76 URLs
- Internal targets: 35/35 HTTP 200
- HTTP 5xx observed during QA: 0
- New Nginx errors after deployment: 0; only the expected reload notice was recorded
- New PHP warnings/errors after deployment: 0
- `localhost` or `127.0.0.1` URL leakage: 0
- SiteGround, `pages.dev`, `cms-aws`, and AWS test-domain leakage: 0
- Mixed-content links: 0
- Production English `noindex`: 0
- Empty `href="#"`: 0

The minified framework polyfill contains the generic word `localhost`, but no `http://localhost`, `https://localhost`, loopback URL, canonical, metadata, link, or content leakage exists. The production release gate's URL-specific environment scan passed.

## Observations

- The failure attribution initially pointed at the last visible npm subcommand, but the reproducible cleanup exit code was 0. GitHub step evidence and the workflow source identified the stale page-count grep as the actual nonzero command.
- The new tests prevent the workflow and deploy-script content baselines from drifting silently.
- The in-app QA harness emitted its own connectivity warnings while resizing; these were outside the website page. The page console remained empty and production resources loaded normally.

## Git Record

- Implementation: `e7541e1e4e6605513751efda74fa6a61f33e65c4` - `content: add hotel control interfaces guide`
- Export baseline recovery: `c1a5693c5eaff3717b596d4dcc8514f464385ee2` - `fix: update static export cleanup baseline`
- Acceptance report commit: recorded after this report is committed

## Final Status

Phase 2G implementation, export baseline recovery, AWS deployment, production QA, and acceptance verification passed. No CMS content, DNS, Cloudflare, Nginx routing, production database, dependency, or Measurement ID change was made in this phase.
