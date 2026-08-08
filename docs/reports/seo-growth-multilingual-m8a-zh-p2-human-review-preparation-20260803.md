# DualCoreLink Multilingual Phase M8A

## Chinese P2 Human Review Preparation

Date: 2026-08-03

Final result: **BLOCKED — publication manifest scope does not contain 26 Chinese P2 pages**

## Scope Gate Result

The task required all of the following filters to produce exactly 26 pages:

- `locale = zh`
- `priority = P2`
- `nativeReviewStatus = pending`
- `productionReleaseReady = false`
- not included in the 43 approved P0/P1 pages

The runtime publication manifest produces:

- Chinese master records: 69.
- Production-ready Chinese records: 43.
- Pending Chinese records: 26.
- Pending records with `priority = P2`: **19**, not 26.
- Pending records with `priority = P0`: **7**.

The task explicitly required an immediate BLOCKED result when the P2 count was
not 26 and prohibited changing priorities. No priority, review status, release
status, content, payload, or production configuration was changed.

## Actual Chinese P2 Scope (19)

### Product (17)

1. `/zh/products/hotel-ceiling-background-speaker/`
2. `/zh/products/brushed-aluminum-voice-telephone-information-panel/`
3. `/zh/products/borui-red-matte-triple-socket-panel/`
4. `/zh/products/smart-series-dual-vertical-socket-panel/`
5. `/zh/products/smart-footlight-night-light-panel/`
6. `/zh/products/smart-three-key-music-control-panel/`
7. `/zh/products/smart-single-key-switch-panel/`
8. `/zh/products/smart-voice-telephone-information-socket/`
9. `/zh/products/brushed-aluminum-thermostat-control-panel/`
10. `/zh/products/brushed-aluminum-sos-alarm-panel/`
11. `/zh/products/vintage-gold-four-key-smart-switch-panel/`
12. `/zh/products/vintage-gold-key-card-energy-saver-panel/`
13. `/zh/products/borui-red-matte-room-status-four-key-switch-panel/`
14. `/zh/products/borui-red-matte-usb-five-hole-socket/`
15. `/zh/products/brushed-aluminum-86-base-doorbell-panel/`
16. `/zh/products/smart-usb-five-hole-socket/`
17. `/zh/products/infrared-repeater/`

### Resource (2)

1. `/zh/resources/hotel-doorplate-room-display-buying-guide/`
2. `/zh/resources/smart-panel-material-finish-selection-guide/`

## Other Pending Chinese Records (7, Priority P0)

These records explain the difference between 19 actual P2 records and 26
total pending Chinese records. They cannot be silently reclassified as P2.

### Solution (1)

1. `/zh/solutions/hotel-guest-room-control-solution/`

### Resource (3)

1. `/zh/resources/what-is-hotel-rcu-room-control-system/`
2. `/zh/resources/hotel-rcu-buying-guide/`
3. `/zh/resources/smart-hotel-room-control-system-guide/`

### Region (3)

1. `/zh/regions/middle-east/`
2. `/zh/regions/saudi-arabia/`
3. `/zh/regions/uae/`

## CMS Payload Boundary

- Strict `priority=P2` Product/Solution CMS candidates: 17 Products, 0
  Solutions, total **17**.
- All 26 pending Chinese records contain 18 CMS-backed candidates only when the
  pending P0 Solution is included: 17 Products + 1 Solution.
- The task's expected CMS count of 18 therefore corresponds to all remaining
  pending Chinese pages, not to the strict manifest P2 subset.
- No CMS payload was generated, authorized, imported, or written.

## Work Performed and Deliberately Skipped

Completed:

- Archived the M7D production report to the independent docs branch.
- Created the isolated P2 review worktree from current `origin/main`.
- Installed the existing dependency lockfile with `npm ci`; no dependency file
  changed. The existing seven high-severity advisories remain out of scope.
- Evaluated the runtime publication manifest and production-release evidence.
- Confirmed all 26 pending Chinese paths currently return exact one-hop HTTP
  301 responses to their English source pages.
- Confirmed the production database and frontend baseline remained unchanged.

Skipped because the mandatory scope gate failed:

- No Chinese content migration or automatic revision.
- No 26-page review workbook or decisions file.
- No CMS payload review package.
- No build, static-export, or 104-case browser QA claiming a false P2 scope.
- No approval, commit, review-branch push, deployment, CMS write, or GSC action.

## Production Zero-Change Confirmation

- Production SHA/release: `33fa2935146d46aa428b87a45423de82b8e20edc` /
  `/srv/dualcorelink/frontend/releases/33fa2935146d-20260803-000211`.
- Sitemap: 119 URLs.
- CMS REST: HTTP 200.
- Users: 3.
- Posts: 250.
- Postmeta: 2938.
- Chinese CMS: 19 Products + 5 Solutions = 24 publish / 0 draft.
- Chinese public pages: 43.
- All 26 pending Chinese paths: one-hop HTTP 301.
- CMS/database writes: 0.
- Frontend, Nginx, Cloudflare, MariaDB, `main`, and GSC changes: 0.

## Required Decision Before Resuming

Choose and explicitly authorize one of these scopes:

1. Strict P2 batch: 19 pages (17 Product + 2 Resource), with 17 CMS payloads.
2. Remaining-Chinese batch: all 26 pending pages, explicitly including the 7
   pending P0 records, with 18 CMS payloads.

The repository priorities should not be changed merely to make the count equal
26. Until a scope is selected, M8A remains BLOCKED.
