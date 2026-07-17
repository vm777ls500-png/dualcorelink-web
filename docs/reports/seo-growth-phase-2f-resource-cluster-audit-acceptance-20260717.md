# SEO Growth Phase 2F - Resource Cluster Audit Acceptance

Date: 2026-07-17 (Asia/Shanghai)

## Scope

Phase 2F audited the complete 14-guide English Resource cluster, reviewed available GSC and GA4 evidence, corrected the single conversion and topic-link outlier, deployed the change through the AWS production workflow, and defined a measured content roadmap.

No Resource, Product, Solution, or Region slug changed. No public page was added or removed. Title, meta description, H1, sitemap policy, schema policy, WordPress data, AWS infrastructure, DNS, Cloudflare, Nginx, and GA4 configuration were unchanged.

## Resource Inventory

The 14 published Resources were confirmed in four intent groups:

- RCU and system: 6 guides covering definition, buying, wiring, cost, system planning, and KNX comparison.
- Automation and renovation: 3 guides covering room workflows, occupancy sensors, and retrofit planning.
- Smart panels and OEM/ODM: 4 guides covering panel buying, customization, development, and material/finish selection.
- Door and room status: 1 guide covering doorplates, room displays, DND/MUR, and doorbell functions.

All 14 titles, meta descriptions, H1 values, and primary keywords are unique. SEO titles measure 33-58 characters and meta descriptions measure 144-155 characters.

## Search Intent Map

- `what-is-hotel-rcu-room-control-system`: RCU definition and early planning.
- `hotel-rcu-buying-guide`: commercial selection and quote inputs.
- `hotel-rcu-wiring-system-architecture-guide`: technical architecture and wiring.
- `hotel-room-control-system-cost-factors`: budget and quotation comparison.
- `knx-vs-rcu-hotel-room-control`: architecture comparison.
- `smart-hotel-room-control-system-guide`: full system components and specification.
- `hotel-guest-room-automation-guide`: operational workflows and automation use cases.
- `hotel-occupancy-sensor-selection-guide`: sensing technology and placement.
- `hotel-renovation-smart-room-upgrade-guide`: existing-hotel retrofit planning.
- `hotel-smart-switch-panel-guide`: panel function and product selection.
- `oem-odm-smart-panel-customization-guide`: customization scope and quotation preparation.
- `oem-odm-hotel-control-panel-development-process`: prototype-to-production lifecycle.
- `smart-panel-material-finish-selection-guide`: materials, finishes, and sample approval.
- `hotel-doorplate-room-display-buying-guide`: doorplate and room-status buying.

No merge or deletion is supported by the current evidence. The main overlap risk is between the Smart Hotel Room Control System and Guest Room Automation guides. Future updates must preserve system-specification intent for the first and operational-workflow intent for the second.

## Keyword Map

Current GSC demand supports these clusters:

- Room control interfaces: guestroom remote control, digital room control, room control tablet, bedside control panel.
- Hotel automation: hotel room automation, guest room automation, smart room control.
- RCU: hotel room control unit, hotel RCU, RCU controller.
- Smart panels: hotel room control panel and bedside control panel.
- OEM/ODM: OEM control panel support, industrial panel ODM, and control panel ODM supplier.
- Commercial supplier intent: hotel room control system supplier, manufacturer, and factory.

The early RCU pilot remains the definition page. Control-panel and interface demand should be routed to the Smart Panel cluster rather than absorbed into the pilot through a broad retitle.

## GSC Findings

The 3-month selector currently exposes data from 2026-06-18 through 2026-07-15:

- Clicks: 0.
- Impressions: 601.
- CTR: 0%.
- Average position: 63.
- Query rows: 77.

The early RCU pilot is the only Resource in the current 30-page performance table:

- Impressions: 31.
- Clicks: 0.
- Average position: 21.9.

This supports keeping and strengthening the pilot. The other 13 Resources are too new for absence from the performance table to establish an indexing problem. Current country impressions favor globally applicable English content, led by the United States and United Kingdom, with UAE, India, Thailand, Indonesia, and the Philippines also present.

## GA4 Findings

Consent-aware GA4 collection and Resource attribution are operational. Realtime event delivery is verified, and event-scoped `source_type`, `source_slug`, `cta_location`, and `category` dimensions are registered. Historical organic Resource engagement and inquiry data are not yet mature enough to rank the 14 guides. Phase 2F therefore uses GSC as the demand signal and GA4 as the next 30-day conversion measurement layer.

## Internal Links

Before the fix, the early RCU pilot was reachable from the Resource listing but had no conversion map, no Continue Reading targets, and no inbound edge in the structured Resource graph.

After the fix:

- Conversion maps: 14/14.
- Continue Reading targets: 3 per Resource.
- Structured Resource inbound links: at least 1 per Resource.
- The pilot links to the RCU Buying, RCU Wiring, and Smart Hotel Room Control System guides.
- The Smart Hotel Room Control System guide links back to the pilot.
- Required Phase 2E KNX and other bidirectional relationships remain valid.

Every Resource retains Product, Solution, Region, Downloads, Contact, and WhatsApp paths. A reusable detail-page FAQ relationship model remains a future enhancement, not a Phase 2F patch.

## Implemented Fixes

- Added neutral descriptions to the pilot's four existing Product links.
- Added the established mid-article project CTA.
- Added Recommended Products and Relevant Solutions sections.
- Added three Continue Reading targets.
- Added the final Project Inquiry section.
- Added one topic-cluster inbound relationship to the pilot.
- Changed the conversion test from a historical count of 13 to all published Resources.

No price, stock, offer, availability, rating, review, certification, protocol guarantee, or invented project claim was added.

## Content Roadmap

Priority updates:

1. Smart Hotel Room Control System Guide.
2. Hotel Guest Room Automation Guide.
3. Hotel Smart Switch Panel Guide.
4. OEM/ODM Smart Panel Customization Guide.
5. Hotel RCU Buying Guide.

Recommended first new guide after those updates:

`Hotel Guest Room Control Interfaces: Wall Panels, Touchscreens, Bedside Controls, and Mobile Control`

A supplier-evaluation guide is conditional on another 28-30 days of commercial query evidence. Curtain, low-voltage, and new Region Resources remain deferred.

## Local QA

- `npm.cmd run lint`: passed.
- Public-CMS `npm.cmd run test:data`: 47/47 passed.
- Public-CMS `npm.cmd run build`: passed.
- Static pages: 155.
- Resources: 14.
- Sitemap URLs: 75.
- Product JSON-LD: 36/36.
- Article JSON-LD: 14/14.
- Resource BreadcrumbList: 14/14.
- Empty `href="#"`: 0.
- Exported HTML/XML/TXT environment leakage: 0.
- `git diff --check`: passed with non-blocking CRLF notices.

## Deployment

- Workflow: AWS static production deploy.
- Actions run: `29562648091`.
- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29562648091`.
- Attempt: 1.
- Result: success.
- Runner: `dualcorelink-production`.
- Exact source SHA: `e4b54b1e5ef8ab67f0f5219d343a50dc43cd00bf`.
- Checkout, environment validation, dependency installation, lint, data validation, static build, atomic release deployment, and test-domain indexing protection: passed.
- New release: `/srv/dualcorelink/frontend/releases/e4b54b1e5ef8-20260717-151948`.
- Previous retained release: `/srv/dualcorelink/frontend/releases/9ebcb17ae05d-20260717-005050`.
- Current symlink: `/srv/dualcorelink/frontend/current` resolves to the new release.
- Nginx: active.
- Rollback: not required.

## Production QA

- `/en/resources/`: HTTP 200.
- `/en/resources/what-is-hotel-rcu-room-control-system/`: HTTP 200.
- `/sitemap.xml`: HTTP 200.
- Mid CTA: present.
- Recommended Products: present.
- Relevant Solutions: present.
- Continue Reading: present.
- Final Project Inquiry: present.
- Three configured Resource targets: present.
- Article JSON-LD marker: present.
- BreadcrumbList marker: present.
- Production `noindex`: absent.
- Sitemap URLs: 75.
- Resource detail URLs: 14.
- External production health check: HTTP 200.

## Git Record

Implementation commit:

- `e4b54b1e5ef8ab67f0f5219d343a50dc43cd00bf` - `seo: refine resource cluster targeting`

The implementation commit was pushed to `origin/main` before this acceptance report was created.

## Final Status

Phase 2F inventory, intent audit, keyword mapping, GSC and GA4 review, internal-link correction, conversion upgrade, local QA, AWS deployment, and production verification passed. All 14 Resources remain published with unchanged slugs and SEO metadata. Phase 2F is ready for final report commit and archive.
