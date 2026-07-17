# SEO Growth Phase 2H - Priority Existing Content Refresh

Date: 2026-07-17
Status: Accepted

## Scope

Phase 2H refreshed five existing English B2B resource guides without changing their slugs, titles, metadata, H1 headings, core search intent, or public URL count:

- `/en/resources/smart-hotel-room-control-system-guide/`
- `/en/resources/hotel-guest-room-automation-guide/`
- `/en/resources/hotel-smart-switch-panel-guide/`
- `/en/resources/oem-odm-smart-panel-customization-guide/`
- `/en/resources/hotel-rcu-buying-guide/`

No Resource, Product, or Solution page was added, removed, merged, or renamed.

## Files Changed

Implementation:

- `src/config/resources.ts`
- `tests/seo-schema.test.ts`

Acceptance archive:

- `docs/reports/seo-growth-phase-2h-priority-existing-content-refresh-20260717.md`

## Search Intent Refinement

- The room control system guide now owns system architecture, room-function matrices, and commissioning boundaries.
- The guest room automation guide now owns arrival, occupancy, sleep, service, housekeeping, and fallback workflows.
- The smart switch panel guide now owns location schedules, physical sample approval, and comparable quotation preparation.
- The OEM/ODM guide now separates branding, mechanical, electrical, firmware, sample, tooling, and packaging workstreams.
- The RCU buying guide now owns I/O schedules, responsibility boundaries, and supplier-response comparison.

The opening sections were strengthened to distinguish overlapping topics instead of repeating the same broad room-control explanation.

## Procurement Content

Each refreshed guide now contains nine article sections. New decision-support material covers:

- room schedules, function matrices, and approval sets;
- I/O, load, circuit, and responsibility planning;
- sample-room and controlled sample approval;
- quotation inclusions, exclusions, and comparable supplier responses;
- verified integration boundaries and fallback behavior;
- tooling, packaging, artwork, and revision assumptions for OEM/ODM work.

The copy does not claim universal PMS, BMS, KNX, BACnet, Modbus, or app compatibility. Project-specific voltage, wiring, protocol, integration, and installation requirements remain subject to verification.

## Internal Links

Contextual links were added between the refreshed guides and existing supporting resources, including:

- Hotel RCU Wiring and System Architecture Guide
- What Is a Hotel RCU Room Control System?
- Hotel Room Control System Cost Factors
- Hotel Guest Room Control Interfaces Guide
- Hotel Occupancy Sensor Selection Guide
- Hotel Doorplate and Room Display Buying Guide
- Hotel Renovation Smart Room Upgrade Guide
- OEM/ODM Hotel Control Panel Development Process
- Smart Panel Material and Finish Selection Guide

All targets resolve to existing English Resource slugs. No self-recommendation, empty link, test-domain link, or unplanned public URL was introduced.

## Conversion And Attribution

The existing Phase 2C conversion structure remains present on all five pages:

- mid-article project CTA;
- Recommended Products;
- Relevant Solutions;
- Continue Reading;
- bottom Project Inquiry CTA;
- WhatsApp contact path.

Phase 3A attribution continues to use `content_type=resource`, the exact Resource slug, CTA location, and `#get-a-quote`. Event tests confirm the allowed PII-safe payload keys only; the Resource title and buyer-entered data are not included in the analytics payload.

## SEO And Schema

- Resource slugs changed: 0
- SEO titles changed: 0
- Meta descriptions changed: 0
- H1 headings changed: 0
- Sitemap policy changed: no
- Product JSON-LD policy changed: no
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- Product JSON-LD: 36/36
- Resources: 15
- Sitemap URLs: 76
- Static pages: 156

The five refreshed guides use `lastReviewed: 2026-07-17` and updated reading-time estimates based on the expanded content.

## Validation

Local validation used the public production CMS REST root.

- `npm.cmd run lint`: passed
- `npm.cmd run test:data`: passed, 52/52
- `npm.cmd run build`: passed, exit code 0
- Static generation: 156/156
- `export:clean`: passed; two sentinel directories checked
- `git diff --check`: passed; CRLF conversion notices only
- Responsive static-export QA: 25/25 across 375, 390, 430, 768, and 1280 px
- Horizontal overflow: 0
- Broken images: 0
- Console errors: 0
- Empty `href="#"`: 0
- Localhost/test/staging leakage: 0
- Mixed-content URLs: 0
- Production `noindex`: 0

Responsive coverage included all five refreshed Resource pages at all five widths. H1 wrapping, Header, Footer, CTA visibility, Recommended Products, Relevant Solutions, and Continue Reading were checked.

## Deployment

- Implementation commit: `4e342a3e1edb93ee3f11c1b24c094da6de6f3e2e`
- Commit message: `content: refresh priority resource guides`
- GitHub Actions run: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29568910615`
- Run attempt: 1
- Result: success
- Runner: `dualcorelink-production`
- Tests in Actions: 52/52
- Static generation in Actions: 156/156
- Previous release: `/srv/dualcorelink/frontend/releases/c1a5693c5eaf-20260717-163351`
- Current release: `/srv/dualcorelink/frontend/releases/4e342a3e1edb-20260717-171035`
- Local HTTPS health check: passed on attempt 1
- External HTTPS health check: passed on attempt 1
- Rollback: not triggered

## Production QA

All five refreshed URLs returned HTTP 200 with one H1, correct self-canonical, Article JSON-LD, BreadcrumbList JSON-LD, Product/Solution/Resource conversion modules, Contact attribution, and no production `noindex`.

A read-only crawl of all 76 sitemap URLs produced:

- HTTP 200: 76/76
- Redirects: 0
- HTTP 4xx: 0
- HTTP 5xx: 0
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- Product JSON-LD: 36/36
- Empty `href="#"`: 0
- Localhost, SiteGround, Pages, `cms-aws`, or AWS test-domain leakage: 0
- Production `noindex`: 0

## Unchanged Systems

Phase 2H did not modify WordPress data, AWS configuration, DNS, Cloudflare, Nginx, GA4 configuration or Measurement ID, dependencies, Product or Solution data, language routing, sitemap generation logic, or Schema policy.

## Final Status

Phase 2H is accepted. The five priority existing guides now provide clearer search-intent ownership, stronger procurement decision support, and better contextual navigation while preserving the established conversion, attribution, SEO, schema, deployment, and safety baselines.
