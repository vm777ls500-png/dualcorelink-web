# DualCoreLink Multilingual Phase M7D

## Chinese P1 Production Release

Date: 2026-08-02
Authorizer: Allan
Final result: **PASS — Chinese P1 Production Release Complete**

## Approved Sources

- Chinese P1 review branch: `review/zh-p1-human-review-20260802`
- Approved review SHA: `9c27bb64b13a872bad3b7d727011ef50295ae343`
- CMS safety branch: `feature/zh-p1-cms-import-safety-20260802`
- Approved safety SHA: `234554758d2142441864e8a8d0c10d8dc2da540c`
- Release commit / production source SHA: `33fa2935146d46aa428b87a45423de82b8e20edc`
- CMS Import CLI: `1.2.0`
- Approved plugin ZIP SHA-256: `f4ae3aaa08ea7cd1086a64ae5770c0f7c797ca4f72baae57ee46af0e2f6de67e`
- Approved canonical manifest SHA-256: `2ed593e76a6f18b5a6138a176d9a67d852b1a8a82859c752a84ac6e93db0d0ad`
- Approved canonical Chinese P1 payload SHA-256: `d8d87652cc9aeb4fbc1cb9220cfad44df5ac19fab346655536007210d1d75ce7`

No force push was used. `main` was fast-forwarded from
`a19d144c31cf65ea4528e37d6bd25254cc51d32d` to the exact release SHA.

## Pre-Release Validation

- Multilingual audit: PASS, 414/414 manifest records; 43 release-ready and
  371 pending.
- Chinese P0 release gate: PASS, 12/12 pages and 7/7 CMS records.
- Chinese P1 release gate: PASS, 31/31 pages and 17/17 CMS records.
- Full-site release gate: expected controlled failure, blocking 371 pending
  localized records.
- Test suite: PASS, 176/176.
- Lint: PASS, 0 errors.
- Media audit: PASS, 0 errors and one pre-existing warning.
- Production build: PASS, 192/192 routes before cleanup.
- Static export audit: PASS, 43 localized pages and sitemap candidate 119.
- Candidate browser QA: PASS, 31 P1 pages at 390, 768, 1280, and 1440 px
  (124/124 page/viewport checks).
- Query URL scans: internal, contact attribution, product filter, sitemap,
  canonical, and hreflang query URL counts were all 0.

## Production Backup and Transaction

- CMS transaction ID: `m7d-zh-p1-20260802T154741Z`
- Backup directory:
  `/var/backups/dualcorelink-cms-import/m7d-zh-p1-20260802T154741Z`
- Backup SHA256SUMS file SHA-256:
  `3be829073b2628318a2b07dc30c61b5247adef0b8090b4b0e2630437161a01d4`
- Backup verification: all 7 recorded files passed SHA-256 verification.
- Preflight: PASS, 17/17 approved records, `writes: 0`.
- Draft apply: PASS, exactly 17 records.
- Draft verify: PASS, exactly 17/17 records before publish.
- Publish: PASS, exactly 17 records.
- Rollback: not required.

The post-publish CLI `verify` command compares against its draft-status
snapshot and therefore reports the expected lifecycle status drift after
publish. The authoritative content verification was the successful 17/17
draft verify immediately before publish. No Core, ACF, SEO, source-relation,
reviewer, review-date, or payload mismatch was reported before publish.

## CMS Record Results

| CMS ID | Type | Slug | English Source ID | Final Status |
|---:|---|---|---:|---|
| 262 | Product | `hotel-smart-room-rcu-host-3` | 219 | publish |
| 263 | Product | `hotel-delivery-robot-charging-dock` | 190 | publish |
| 264 | Product | `hotel-smart-room-rcu-host-2` | 189 | publish |
| 265 | Product | `smart-curtain-motor` | 188 | publish |
| 266 | Product | `smart-four-key-curtain-control-panel` | 51 | publish |
| 267 | Product | `smart-key-card-energy-saver-panel` | 50 | publish |
| 268 | Product | `hotel-guest-room-doorbell` | 46 | publish |
| 269 | Product | `hotel-room-door-magnetic-sensor` | 45 | publish |
| 270 | Product | `embedded-human-presence-sensor` | 43 | publish |
| 271 | Product | `hotel-smart-delivery-cabinet` | 13 | publish |
| 272 | Product | `hotel-delivery-robot` | 12 | publish |
| 273 | Product | `ai-music-control-panel` | 11 | publish |
| 274 | Product | `thermostat-hvac-control-panel` | 10 | publish |
| 275 | Product | `rotary-knob-smart-control-display` | 9 | publish |
| 276 | Product | `ai-large-smart-display` | 8 | publish |
| 277 | Solution | `hotel-delivery-robot-solution` | 141 | publish |
| 278 | Solution | `ai-smart-display-solution` | 139 | publish |

Final Chinese CMS totals are 19 Products plus 5 Solutions: **24 publish / 0
draft**. The existing seven Chinese P0 records remain published. Arabic CMS
records remain 0.

WordPress created 17 normal publish-history revisions, IDs 279–295, mapped
one-to-one to localized records 262–278. Each revision is `revision/inherit`,
has no independent public route, and has 0 translation metadata rows. These
revisions account for the expected Posts increase after publish and are not
additional localized pages.

## Database Boundary

| Metric | Before | After draft apply | Final |
|---|---:|---:|---:|
| Users | 3 | 3 | 3 |
| Posts | 216 | 233 | 250 |
| Postmeta | 2576 | 2938 | 2938 |
| Chinese publish | 7 | 7 | 24 |
| Chinese draft | 0 | 17 | 0 |

The final maximum Post ID is 295. The only final Posts growth is the 17
approved Chinese P1 records and their 17 normal WordPress revisions. No user,
role, plugin, theme, English content, Chinese P0 content, Arabic content, or
unapproved locale record was written.

## Deployment

- GitHub Actions workflow: `AWS static production deploy`
- Actions Run ID: `30755603217`
- Run result: SUCCESS
- Production source SHA: `33fa2935146d46aa428b87a45423de82b8e20edc`
- Production release directory:
  `/srv/dualcorelink/frontend/releases/33fa2935146d-20260803-000211`
- Nginx activation: PASS.
- `nginx -t`: PASS.
- Nginx service: active.
- Inquiry upstream host retained:
  `3sbx4hpmmh.execute-api.ap-southeast-1.amazonaws.com`.
- Wrong Inquiry upstream host occurrences: 0.
- Deployment rollback: not required.

## Production Frontend Verification

- Sitemap: HTTP 200, **119 URLs**.
- English sitemap URLs: 76.
- Chinese sitemap URLs: 43.
- Sitemap query URLs: 0.
- Sitemap 119/119 URLs: HTTP 200.
- Chinese P1 pages: 31/31 HTTP 200.
- All approved Chinese pages: 43/43 HTML HTTP 200.
- Chinese RSC payloads: 43/43 `index.txt` HTTP 200.
- Chinese RSC requests with `_rsc` query: 43/43 HTTP 200.
- Corresponding English HTML and RSC: 43/43 HTTP 200.
- Self canonicals, `lang=zh`, unique H1, parseable JSON-LD, en/zh/x-default
  hreflang, and reciprocal English hreflang: PASS for 43/43.
- Pending localized records: 371/371 exact one-hop HTTP 301 to their English
  source; Chinese P2 26 and ar/de/es/vi/fa 345 remain private.
- Pending redirect failures, 302 responses, redirect loops, or home-page
  fallbacks: 0.
- P1 images checked: 15 unique production image URLs, failures 0.
- Internal query hrefs, contact tracking query hrefs, product filter query
  hrefs, canonical query URLs, and hreflang query URLs: all 0.

### Published Chinese P1 URLs (31)

Products (15):

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

Solutions (2):

1. `/zh/solutions/hotel-delivery-robot-solution/`
2. `/zh/solutions/ai-smart-display-solution/`

Resources (11):

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

Regions (3):

1. `/zh/regions/`
2. `/zh/regions/southeast-asia/`
3. `/zh/regions/vietnam/`

## Browser and Header QA

- Local production-candidate QA passed all 31 P1 pages across four required
  viewports (124/124 checks), including horizontal overflow, header navigation,
  mobile drawer, localized metadata, schema, images, CTA links, and hydration
  indicators.
- Formal production browser QA confirmed a Products mega-menu link navigates
  to the selected Chinese product and immediately closes Products and Language
  dropdown state.
- Mobile production rendering at 390 px showed the compact navigation control,
  localized content, and no horizontal-content regression. The exhaustive
  mobile drawer/accordion navigation-close behavior was already covered by the
  124-check candidate suite and deployment ran the same verified SHA.
- Header Escape/focus, menu-close-after-navigation, and Chinese RSC regressions:
  PASS.
- Browser-control telemetry itself was intermittently slow, but it did not
  produce an application console, hydration, HTTP, or `_rsc` failure.

## Security and Scope Confirmation

- No `/batch/v1`, direct SQL content write, force push, GSC request, broad
  `/zh/` Nginx exposure, user/permission change, plugin/theme change, English
  edit, Chinese P0 edit, or other-language approval occurred.
- The exact HTML and RSC allowlist contains only the 43 approved Chinese URLs.
- CMS REST and the public site returned HTTP 200 after release.
- Nginx, PHP-FPM, and MariaDB are active.
- M5D frozen worktree remained untouched with its 100 staged files and original
  `MERGE_HEAD`.

## Final Conclusion

**PASS — Chinese P1 Production Release Complete**

Chinese P1 is live and stable. Chinese P2 and all other languages remain
blocked by their existing review and publication boundaries.
