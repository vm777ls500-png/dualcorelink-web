# DualCoreLink Multilingual Phase M8A

## Remaining 26 Chinese Pages Human Review Preparation

Date: 2026-08-03
Result: **PASS — Chinese Remaining 26 Human Review Package Ready**

## Scope Resolution

The publication manifest contains 26 remaining Chinese pages, but they are not
all `priority=P2`. The authorized resumed scope preserves the manifest values:

- Strict P2: 19 pages.
- Historical pending P0: 7 pages.
- Total review scope: 26 pages.
- No priority was changed.
- The earlier blocked-scope evidence remains preserved in
  `seo-growth-multilingual-m8a-zh-p2-human-review-preparation-20260803.md`.

## Complete URL Inventory

### Strict P2 — Products (17)

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

### Strict P2 — Resources (2)

1. `/zh/resources/hotel-doorplate-room-display-buying-guide/`
2. `/zh/resources/smart-panel-material-finish-selection-guide/`

### Historical Pending P0 — Solution (1)

1. `/zh/solutions/hotel-guest-room-control-solution/`

### Historical Pending P0 — Resources (3)

1. `/zh/resources/what-is-hotel-rcu-room-control-system/`
2. `/zh/resources/hotel-rcu-buying-guide/`
3. `/zh/resources/smart-hotel-room-control-system-guide/`

### Historical Pending P0 — Regions (3)

1. `/zh/regions/middle-east/`
2. `/zh/regions/saudi-arabia/`
3. `/zh/regions/uae/`

## Page-Type and Content-Source Counts

| Page type | Pages | Content source |
|---|---:|---|
| Product | 17 | CMS import candidate |
| Solution | 1 | CMS import candidate |
| Resource | 5 | Local structured file |
| Region | 3 | Local structured file |
| **Total** | **26** | **18 CMS + 8 file pages** |

The 18 CMS-backed records retain their verified English source IDs, original
slugs and post types. They remain review candidates only; no production import
package was authorized or applied.

## Chinese Quality Review and Automatic Revisions

All 26 pages were reviewed and received deterministic, fact-preserving language
cleanup. The generated workbook records every Before/After change.

| Category | Pages affected | Recorded revisions | Main corrections |
|---|---:|---:|---|
| Product | 17 | 70 | Removed repetitive title-led sentences, normalized FAQ/CTA wording, image alt text and technical-term spacing |
| Solution | 1 | 2 | Natural FAQ and CTA phrasing |
| Resource | 5 | 25 | More formal engineering language, acronym spacing, FAQ and alt-text cleanup |
| Region | 3 | 18 | Procurement phrasing, acronym spacing, CTA and alt-text cleanup |
| **Total** | **26** | **115** | All revisions are documented |

Automated recommendation after correction: 26 `approve`, 0
`changes_required`. This is only a recommendation. The decision sheet remains
26 `pending`, with reviewer, review date and notes blank.

## Fact Consistency

- Product models, source IDs, slugs, post types and specifications were not
  changed.
- The Chinese content remains aligned with the English source facts.
- No price, stock, rating, certification, customer, case study, performance or
  energy-saving claim was invented.
- Procurement wording retains the established conditions: no fixed MOQ for
  standard products; new tooling may incur customization/tooling cost; color
  changes using an existing mold do not incur a customization fee; normal lead
  time is 7–15 days; OEM/ODM is supported.
- RCU, GRMS, KNX, HVAC, RS485, OEM and ODM usage remains consistent.

## SEO and GEO Review

All 26 candidates have localized title, meta description, unique H1, complete
introductory copy, structured H2/H3 sections, CTA, breadcrumb, image alt text,
FAQ or procurement material and localized schema fields. Content is substantive,
independently readable Chinese and contains no placeholder or large English
body leakage. No keyword stuffing or unsupported commercial schema fields were
introduced.

## Review-Only Preview Boundary

A dedicated local-only preview mode was added for this human-review batch:

- It requires both `MULTILINGUAL_REVIEW_PREVIEW=zh-remaining-26` and an explicit
  `local-only` acknowledgement.
- It is disabled when `CI=true` or `GITHUB_ACTIONS=true`.
- It validates the exact 26-page scope (19 P2 + 7 historical P0).
- It does not change manifest review or release state.
- The preview build may generate the 26 pages locally, but the normal build
  excludes them from public output, sitemap and hreflang.

Normal production-candidate output after the final build remains:

- English: 76 URLs.
- Chinese approved P0/P1: 43 URLs.
- Sitemap: 119 URLs.
- Review-only Chinese pages in normal output: 0.
- Internal query href, sitemap query URL, canonical query URL and hreflang query
  URL: 0.

## Browser QA

The 26 local review candidates were checked at 390, 768, 1280 and 1440 pixels:
104 page/viewport combinations passed.

- `lang=zh`, localized title/meta and one H1: passed.
- Canonical, en/zh hreflang and x-default in local candidate rendering: passed.
- JSON-LD parseability: passed.
- Header, CTA and internal links: passed.
- Links to pending Chinese pages: 0.
- Internal query links: 0.
- Broken images: 0.
- Horizontal overflow: 0.
- Console errors: 0.

The final normal build was run after preview QA, restoring the public candidate
boundary to the approved 43 Chinese pages.

## Production Read-Only Boundary Check

- Production sitemap: 119 URLs (76 English + 43 Chinese), query URLs 0.
- All 26 review pages: exact one-hop HTTP 301 to the corresponding English URL.
- All 26 redirect targets: HTTP 200; loops 0.
- None of the 26 review URLs appears in the production sitemap.
- CMS REST: HTTP 200; Chinese Product records 19 and Solution records 5, for 24
  published Chinese CMS records.
- Database baseline remains Users 3, Posts 250 and Postmeta 2938. This phase
  used GET/HEAD only and executed no CMS or database write operation.
- No new Chinese production page, CMS draft, deployment, main push or GSC
  request occurred.

## Validation Results

| Validation | Result |
|---|---|
| `npm ci` | Passed; lockfile unchanged |
| `npm run multilingual:zh-remaining-review-pack` | Passed: 26 pages, 18 CMS GET checks, 115 revisions |
| `npm run multilingual:audit` | Passed: 414/414; ready 43; pending 371 |
| `release-check zh/p0` | Passed: 12/12 pages, 7/7 CMS |
| `release-check zh/p1` | Passed: 31/31 pages, 17/17 CMS |
| Full release check | Controlled failure, correctly blocking 371 pending pages |
| `npm test` | Passed: 178/178 |
| `npm run lint` | Passed: 0 errors, 0 warnings after removing ignored local QA artifacts |
| `npm run media:audit` | Passed: 0 errors; 1 existing media baseline warning |
| Local review preview build | Passed: 26 review pages; sitemap remained 119 |
| `npm run build` (normal mode) | Passed: 192 static pages |
| `npm run multilingual:static-export-audit` | Passed: 43 released, 0 review-only; sitemap 119 |
| `git diff --check` | Passed |

## Human Review State

- Pending: 26.
- Approved: 0.
- Changes required: 0.
- `productionReleaseReady`: 0 for this batch.
- Reviewer and review date: intentionally blank.

Human reviewers must use:

- `docs/reviews/multilingual/zh-remaining-26-final-human-review-20260803.md`
- `docs/reviews/multilingual/zh-remaining-26-final-decisions-20260803.md`

No approval, commit, push, merge, deployment, CMS write or GSC action is part of
M8A.
