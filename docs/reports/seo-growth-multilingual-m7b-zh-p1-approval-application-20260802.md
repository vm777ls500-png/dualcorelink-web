# DualCoreLink Multilingual Phase M7B

## Apply Chinese P1 Human Approval

Date: 2026-08-02

Reviewer: Allan

Decision: **PASS — Chinese P1 approval state and isolated release batch are ready on the review branch**

This phase applies Allan's explicit human approval to exactly 31 Chinese P1
pages. It prepares a review-branch release candidate only. It did not write to
WordPress, modify a database, push `main`, deploy, or submit a GSC request.
All production checks used public GET/HEAD requests only.

## Approved Scope

### Products (15)

1. `/zh/products/hotel-smart-room-rcu-host-3/`
2. `/zh/products/hotel-delivery-robot-charging-dock/`
3. `/zh/products/hotel-smart-room-rcu-host-2/`
4. `/zh/products/smart-curtain-motor/`
5. `/zh/products/smart-four-key-curtain-control-panel/`
6. `/zh/products/smart-key-card-energy-saver-panel/`
7. `/zh/products/hotel-guest-room-doorbell/`
8. `/zh/products/hotel-room-door-magnetic-sensor/`
9. `/zh/products/embedded-human-presence-sensor/`
10. `/zh/products/hotel-smart-delivery-cabinet/`
11. `/zh/products/hotel-delivery-robot/`
12. `/zh/products/ai-music-control-panel/`
13. `/zh/products/thermostat-hvac-control-panel/`
14. `/zh/products/rotary-knob-smart-control-display/`
15. `/zh/products/ai-large-smart-display/`

### Solutions (2)

1. `/zh/solutions/hotel-delivery-robot-solution/`
2. `/zh/solutions/ai-smart-display-solution/`

### Resources (11)

1. `/zh/resources/`
2. `/zh/resources/hotel-rcu-wiring-system-architecture-guide/`
3. `/zh/resources/hotel-smart-switch-panel-guide/`
4. `/zh/resources/oem-odm-smart-panel-customization-guide/`
5. `/zh/resources/hotel-guest-room-automation-guide/`
6. `/zh/resources/hotel-room-control-system-cost-factors/`
7. `/zh/resources/hotel-occupancy-sensor-selection-guide/`
8. `/zh/resources/oem-odm-hotel-control-panel-development-process/`
9. `/zh/resources/hotel-renovation-smart-room-upgrade-guide/`
10. `/zh/resources/knx-vs-rcu-hotel-room-control/`
11. `/zh/resources/hotel-guest-room-control-interfaces-guide/`

### Regions (3)

1. `/zh/regions/`
2. `/zh/regions/southeast-asia/`
3. `/zh/regions/vietnam/`

The decision file contains exactly these 31 URLs with `approved`, reviewer
`Allan`, review date `2026-08-02`, and note `Human Chinese review approved`.
No Chinese P2 URL or other locale is approved by this phase.

## Review State

- Previously approved Chinese P0: 12.
- Newly approved Chinese P1: 31.
- Total approved and `productionReleaseReady`: 43.
- Remaining manifest records pending: 371.
- Remaining Chinese records pending: 26 (19 P2 records and 7 records outside
  the approved P0/P1 batches); other five locales pending: 345.
- `changes_required`: 0.

The batch application preserves the original P0 reviewer/date evidence and
updates only the exact P1 decision rows. Unknown URLs, duplicates, wrong
priority, wrong reviewer/date, incomplete batches, and cross-locale use fail
validation.

## CMS Payload Candidate

The reviewed Chinese P1 CMS payload contains exactly **17** records:

- Product: 15.
- Solution: 2.
- Locale: `zh` for every record.
- Batch/priority: `p1` / `P1`.
- Reviewer/date: Allan / 2026-08-02.
- Native review: approved.
- Source English IDs, slugs, post types, structured fields, ACF fields, SEO
  fields, and deterministic translation groups are validated.

This payload is a candidate only. It was not imported and does not authorize
a production CMS write.

## Publication Boundary Candidate

- English sitemap URLs: 76.
- Approved Chinese sitemap URLs: 43 (12 P0 + 31 P1).
- Candidate sitemap total: **119**.
- Candidate en/zh hreflang coverage: **43 pairs**, with English x-default.
- Candidate Chinese HTML and RSC payloads: 43/43.
- Chinese paths not in the approved P0/P1 batches continue through the legacy
  English redirect boundary.
- Arabic, German, Spanish, Vietnamese, and Persian output files: 0.
- No pending localized page is exposed by the candidate Nginx exact allowlist.

The deployment workflow candidate runs both P0 and P1 release checks before a
future production deployment. This review-branch push does not trigger the
main-only production workflow.

## Release Gates

- Chinese P0 gate: PASS, 12/12 pages and 7/7 CMS payloads.
- Chinese P1 gate: PASS, 31/31 pages and 17/17 CMS payloads.
- Full-site release check: expected controlled failure, with 43 ready and 371
  pending. Partial batch approval does not approve the remaining records.

## Automated and Browser Validation

- `npm run multilingual:audit`: PASS, manifest 414/414, eligible 43,
  production-ready 43, pending 371.
- `npm test`: PASS, 176/176.
- `npm run lint`: PASS, 0 errors.
- `npm run media:audit`: PASS, 0 errors and one existing warning.
- `npm run build`: PASS, 192/192 before cleanup with public read-only CMS.
- `npm run multilingual:static-export-audit`: PASS, 43 localized pages and
  sitemap 119.
- Browser QA: PASS, 31 pages × 4 viewports = 124/124 checks at 390, 768, 1280,
  and 1440 px.
- Browser checks covered localized title/description/H1, `lang=zh`, self
  canonical, en/zh/x-default hreflang, parseable JSON-LD, images, approved-link
  boundaries, horizontal overflow, and hydration-error indicators.
- Desktop Products navigation and mobile drawer navigation close correctly
  after navigation; `aria-expanded` returns to false and no overflow occurs.
- Candidate internal tracking/filter query hrefs: 0.
- Candidate sitemap/canonical/hreflang query URLs: 0/0/0.
- `git diff --check`: PASS.

## Production Read-Only Boundary

Production remains unchanged during M7B:

- Production sitemap: 88 URLs, 12 Chinese.
- Chinese P1: 31/31 still return one-hop HTTP 301 and 0/31 appear in the live
  sitemap.
- Public Chinese CMS: 4 Product + 3 Solution records (7 publish total).
- New Chinese production pages: 0.
- No POST, PUT, PATCH, DELETE, administrator session, `wp-admin`, `/batch/v1`,
  CMS/database write, deployment, `main` push, or GSC request occurred.

## Next Action

Preserve the two M7B commits on
`review/zh-p1-human-review-20260802`. A separate explicit authorization is
required before any CMS import, merge to `main`, or production deployment.
