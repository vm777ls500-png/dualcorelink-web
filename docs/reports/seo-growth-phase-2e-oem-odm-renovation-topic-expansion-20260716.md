# SEO Growth Phase 2E - OEM/ODM and Renovation Topic Expansion Acceptance

Date: 2026-07-16
Final status: Passed on AWS production

## Objective

Phase 2E expanded the English B2B Resource topic cluster around OEM/ODM panel development, hotel renovation, panel material and finish selection, and KNX-versus-RCU planning. The implementation was completed before the AWS production migration and received final production acceptance after the official frontend cutover.

Implementation commit:

`f83b8c3055f3946fb873b1b92bf4709d33dd7620`

Implementation message:

`content: expand oem and renovation resources`

## New Resource pages

All four final URLs returned HTTP 200:

- `https://dualcorelink.com/en/resources/oem-odm-hotel-control-panel-development-process/`
- `https://dualcorelink.com/en/resources/hotel-renovation-smart-room-upgrade-guide/`
- `https://dualcorelink.com/en/resources/smart-panel-material-finish-selection-guide/`
- `https://dualcorelink.com/en/resources/knx-vs-rcu-hotel-room-control/`

Each page retained:

- a unique H1 and buyer-focused English content;
- structured H2/H3 sections;
- a mid-page CTA;
- Recommended Products;
- Relevant Solutions;
- Continue Reading links;
- a final Project Inquiry CTA;
- product, solution, Resource, inquiry, contact, and WhatsApp links;
- a valid canonical URL;
- SEO title and meta description;
- Open Graph and Twitter metadata;
- Article JSON-LD;
- BreadcrumbList JSON-LD.

## Production deployment

- Production platform: AWS Lightsail, instance `dualcorelink-production`, Singapore.
- Static IPv4: `52.74.68.63`.
- Accepted build source: `8d28e578acd5faa18c14f195a6d20a8cdd217c16`.
- Production release: `/srv/dualcorelink/frontend/releases/8d28e578acd5-production-20260716-031217`.
- Current symlink: `/srv/dualcorelink/frontend/current` points to the accepted production release.
- Build CMS source: `https://cms.dualcorelink.com/wp-json`.
- Cloudflare Pages remains retained as a rollback layer but is not serving the official apex or `www` traffic.

The later Gate 4 report push was documentation-only and did not trigger another deployment because the AWS workflow excludes `docs/**`. No Resource content or active release changed after the accepted production build.

## Build and data baseline

The accepted production build completed:

- `npm ci`: passed.
- `npm run lint`: passed.
- `npm run test:data`: passed, 36/36.
- `npm run build`: passed.
- Static pages: 155/155.
- Products: 36.
- Resources: 14.
- Sitemap URLs: 75.
- Article JSON-LD: 14/14.
- BreadcrumbList JSON-LD: 14/14 Resource details.
- Product JSON-LD: 36/36.
- Localhost/test-host leakage: 0.

## Production SEO and content QA

Final AWS production checks confirmed:

- Four Phase 2E URLs: 4/4 HTTP 200.
- SEO title: 4/4.
- Meta description: 4/4.
- Canonical: 4/4.
- Open Graph metadata: 4/4.
- Twitter metadata: 4/4.
- Article JSON-LD: 4/4.
- BreadcrumbList JSON-LD: 4/4.
- Unique H1 present: 4/4.
- Resources in production: 14.
- Sitemap: 75 URLs, 75/75 HTTP 200.
- Product pages: 36.
- Empty `href="#"`: 0.
- Pages containing localhost, 127.0.0.1, SiteGround, `pages.dev`, `cms-aws`, or `aws.dualcorelink.com` leakage: 0.

Final whole-site checks after AWS cutover found:

- 135/135 unique internal targets HTTP 200.
- 89/89 unique rendered image URLs HTTP 200.
- 6/6 Catalog PDFs HTTP 200 with `application/pdf`.
- WhatsApp and `/en/contact/#get-a-quote` conversion paths present.

The dedicated Gate 4 Phase 2E checks found 42 unique internal targets and nine unique rendered images across the four new pages; all returned HTTP 200 and no broken image was found.

## Responsive QA

Production responsive QA covered each of the four new pages at:

- 375 px
- 390 px
- 430 px
- 768 px
- 1280 px

Result: 20/20 passed.

Checks included horizontal overflow, image rendering, title clipping, content boundaries, header, CTA modules, Recommended Products, Relevant Solutions, footer, button sizing, and content overlap.

Observed results:

- Document-level horizontal overflow: 0.
- Broken images: 0.
- Heading overflow: 0.
- Empty hash links: 0.
- H1 count: one per page.
- Header, main content, footer, and buyer CTA: present.
- Browser console errors: 0.

The accepted mobile header uses an internal horizontally scrollable navigation row. It does not create document-level overflow and remains a non-blocking future UX observation.

## Regression safety

The production cutover preserved:

- Products 36 and Product JSON-LD 36/36.
- Resources 14 and Article/Breadcrumb coverage 14/14.
- Sitemap 75.
- Existing Resource pages and conversion modules.
- Product, Solution, Region, FAQ, Downloads, Contact, WhatsApp, and inquiry links.
- English-only canonical and public URL behavior.
- No fake price, review, rating, certification, customer, local office, or local stock claim was introduced.

## Retained rollback layers

- Cloudflare Pages was not deleted.
- SiteGround was not cancelled or deleted.
- AWS snapshots, B6 backups, test domains, and historical releases remain available.
- No WordPress content, dependency, DNS verification record, or Phase 2E implementation file was changed during this report-only archive step.

## Final decision

SEO Growth Phase 2E passed final AWS production acceptance. The four new Resource pages are live, the 14-Resource and 75-URL sitemap baselines are intact, schema and metadata coverage passed, responsive QA passed 20/20, and no production leakage or broken-resource regression was found.
