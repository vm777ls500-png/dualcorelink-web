# SEO Operations Phase 4C - Discovered but Not Indexed Recovery

Date: 2026-07-20 (Asia/Shanghai)

## Scope

Phase 4C audited the 30 English URLs reported by Google Search Console as "Discovered - currently not indexed," measured their production crawl signals, and added three narrowly relevant static Product links to the Solutions listing. The phase did not change any URL, slug, canonical, metadata, schema policy, WordPress record, AWS configuration, DNS record, Cloudflare setting, GA4 setting, price, offer, review, or rating.

Temporary inventories were generated at `tmp/gsc-discovered-not-indexed-audit.json` and `tmp/gsc-discovered-not-indexed-audit.md`. Both remain ignored and were not committed.

## GSC Baseline

The Phase 4A GSC snapshot, last updated on 2026-07-10, reported:

- Indexed: 41.
- Not indexed: 70.
- Discovered, currently not indexed: 30.
- Crawled, currently not indexed: 0.

The discovered group contains 26 Products, 3 Solutions, and 1 Case Study. GSC classifications are delayed observations, so this phase verifies current production behavior without claiming that Google has recrawled or indexed the URLs.

## 30 URL Inventory

### Products - 26

- `ai-large-smart-display`
- `ai-music-control-panel`
- `borui-red-matte-room-status-four-key-switch-panel`
- `borui-red-matte-usb-five-hole-socket`
- `brushed-aluminum-86-base-doorbell-panel`
- `brushed-aluminum-sos-alarm-panel`
- `brushed-aluminum-voice-telephone-information-panel`
- `hotel-delivery-robot-charging-dock`
- `hotel-delivery-robot`
- `hotel-guest-room-doorbell`
- `hotel-room-door-magnetic-sensor`
- `hotel-smart-delivery-cabinet`
- `hotel-smart-room-rcu-host-1`
- `hotel-smart-room-rcu-host-2`
- `infrared-repeater`
- `rotary-knob-smart-control-display`
- `smart-footlight-night-light-panel`
- `smart-four-key-curtain-control-panel`
- `smart-key-card-energy-saver-panel`
- `smart-series-dual-vertical-socket-panel`
- `smart-single-key-switch-panel`
- `smart-three-key-music-control-panel`
- `smart-usb-five-hole-socket`
- `smart-voice-telephone-information-socket`
- `thermostat-hvac-control-panel`
- `vintage-gold-key-card-energy-saver-panel`

### Solutions - 3

- `hotel-delivery-robot-solution`
- `rcu-room-control-solution`
- `smart-hotel-automation-solution`

### Case Study - 1

- `overseas-oem-odm-smart-panel-customization-project`

## Product Audit

All 26 Product targets returned HTTP 200 without a redirect, were indexable, had a self-canonical, appeared in the sitemap, exposed Product and BreadcrumbList schema, and were linked from the static Products listing. Gallery and featured-image markup was present for all 26.

The production-wide Product regression also passed: 36/36 Product pages returned HTTP 200, 36/36 exposed Product JSON-LD, and all 264 governed WebP assets returned HTTP 200 with the expected WebP MIME type and matching local hash.

## Solution Audit

All three Solution targets returned HTTP 200 without a redirect, were indexable, had a self-canonical, appeared in the sitemap, exposed Service and BreadcrumbList schema, and were linked from the static Solutions listing. Each retained relevant Product relationships and the existing Contact conversion path.

## Case Study Audit

The OEM/ODM Case Study returned HTTP 200 without a redirect, was indexable, had a self-canonical, appeared in the sitemap, exposed CreativeWork and BreadcrumbList schema, and was linked from the static Case Studies listing. It retained related Product, Solution, and Contact links.

## Static Listing Links

Production HTML was fetched without executing client JavaScript. The returned markup contained:

- Products listing: 36/36 Product links.
- Solutions listing: 6/6 Solution links.
- Case Studies listing: 3/3 Case Study links.
- Resources listing: 15/15 Resource links.
- Regions listing: 5/5 Region links.

All 30 GSC targets have at least one static listing entry. No target depends on client-side JavaScript for its primary discovery path.

## Three Contextual Link Fixes

Three Priority A Products initially had only the Products-listing source. The Solutions listing now contains a relevant, server-rendered Product link in the matching Solution section:

| Product | Solution context | Anchor text |
| --- | --- | --- |
| `hotel-delivery-robot-charging-dock` | Hotel Delivery Robot Solution | Hotel Delivery Robot Charging Dock |
| `smart-three-key-music-control-panel` | AI Smart Display Solution | Smart Three-Key Music Control Panel |
| `vintage-gold-key-card-energy-saver-panel` | OEM/ODM Custom Panel Solution | Vintage Gold Key Card Energy Saver Panel |

Each link uses the final English Product URL, is present in returned production HTML, reaches HTTP 200 without a redirect, is not a self-link, and introduces no duplicate recommendation entry.

## Priority A Coverage

Before implementation, 27/30 audited Priority A targets had at least two independent internal referring pages. After deployment, the production graph reports 30/30 with at least two sources. The three corrected Products now have both the Products listing and the relevant Solution section as independent static entry points.

Lower-priority Products were not mechanically inserted into unrelated pages. Existing listing coverage was retained and no footer link farm was created.

## Metadata Duplication

Across the 30 targets:

- Duplicate titles: 0.
- Duplicate meta descriptions: 0.
- Duplicate H1 values: 0.
- Duplicate introductory fingerprints: 0.
- Pages with multiple H1 elements: 0.

No metadata rewrite was justified or performed.

## Thin Content Review

No obvious thin target was found. Extracted visible-content lengths were:

- Products: 3,932 to 6,131 characters.
- Solutions: 4,759 to 5,760 characters.
- Case Study: 3,110 characters.
- Targets below 3,000 characters: 0.

The review did not use keyword stuffing or broad content rewrites.

## Sitemap, Canonical, Robots, and Schema

- Sitemap: HTTP 200, 76 URLs, 76 unique, and 76/76 returning HTTP 200.
- Target sitemap inclusion: 30/30.
- Target self-canonical: 30/30.
- Target redirects: 0.
- Target legacy-locale URLs: 0.
- Target `noindex`: 0.
- `robots.txt`: HTTP 200 and allows the published English pages.
- Target expected schema: 30/30.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.

## Local Validation

- `npm.cmd run media:audit`: passed with 36 Products, 132 full images, 132 thumbnails, 264 WebP assets, 0 errors, and the known Rotary Knob single-image warning only.
- `npm.cmd run lint`: passed.
- `npm.cmd run test:data`: 63/63 passed.
- `npm.cmd run build`: passed with exit code 0.
- Static generation: 156/156.
- Export and `export:clean`: passed.
- Products: 36.
- Resources: 15.
- Sitemap: 76.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- `git diff --check`: passed; only non-blocking local line-ending notices were emitted.

## Actions Run and Deployment

- Workflow: AWS static production deploy.
- Run: `29741568288` (`#23`).
- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29741568288`.
- Result: success on the first run; duration 2m 7s.
- Runner: self-hosted `dualcorelink-production`, version `2.335.1`.
- Checkout: `actions/checkout@v5`.
- Exact source SHA: `f1d1f8802db1a87be5dda511c132b4f6760db1ef`.
- Public CMS build source: `https://cms.dualcorelink.com/wp-json`.
- Dependency install, lint, 63/63 data tests, 156/156 static build, export cleanup, and deployment: passed.
- Nginx configuration test: passed.
- Previous release: `/srv/dualcorelink/frontend/releases/e31e863f5dd8-20260720-190257`.
- New release: `/srv/dualcorelink/frontend/releases/f1d1f8802db1-20260720-201800`.
- Current release: `/srv/dualcorelink/frontend/current` resolved to the new release according to the deployment output.
- Atomic activation: passed.
- Local HTTPS health check: passed on attempt 1.
- External HTTPS health check: passed on attempt 1.
- Rollback: not required.

The workflow did not include a separate journal or failed-service inspection. No Nginx or PHP warning was reported by the deployment job, but this is not recorded as proof of zero server warnings.

## Production QA

- Required top-level pages: Home, Products, Resources, Solutions, Regions, Case Studies, and Contact returned HTTP 200.
- Product details: 36/36 HTTP 200.
- Resources: 15/15 HTTP 200.
- Solutions: 6/6 HTTP 200.
- Case Studies: 3/3 HTTP 200.
- Regions: 5/5 HTTP 200.
- Sitemap pages: 76/76 HTTP 200.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- WebP assets: 264/264 HTTP 200.
- Referenced production images checked: 196; broken images: 0.
- Unexpected HTTP 4xx/5xx: 0.
- Empty `href="#"`: 0.
- Mixed content: 0.
- Environment leakage: 0.
- Production `noindex`: 0.
- Legacy URLs in sitemap, internal links, canonicals, schema, or hreflang: 0.
- User-entered PII or private-path leakage in static production output: 0 detected.

## GSC URL Inspection and Indexing Requests

Phase 4C URL Inspection remains pending. Browser control and the reCAPTCHA service were not reliable, so the inspection attempt was stopped instead of repeated. Phase 4A evidence remains the latest available representative inspection evidence.

- Phase 4C successful URL inspections: 0.
- Phase 4C indexing requests submitted: 0.
- No claim is made that Googlebot has recrawled the targets.
- No claim is made that any target is now indexed.

## Server Log Status

Server-log inspection remains pending because this phase did not have dedicated authorization to use the local SSH credential. No Googlebot request, crawl date, WAF decision, or server-side request count is inferred from public HTTP checks. Public production QA did confirm 30/30 target responses and 76/76 sitemap responses without an observed 5xx.

## Risks and Observations

- Google controls crawl scheduling and indexing; improved internal discovery cannot guarantee inclusion.
- GSC coverage data may continue to display the historical 30-URL classification until recrawl and report refresh.
- URL Inspection and server-side Googlebot evidence remain pending and must not be treated as completed.
- Some Priority B Products intentionally retain listing-only coverage to avoid irrelevant mechanical linking.
- The dependency install reports seven known audit findings. No `npm audit fix` or forced dependency change was run.
- The existing Rotary Knob single-image reshoot warning remains unrelated to indexing.

## Next Review Date

Recheck GSC Page indexing, representative URL Inspection results, last crawl dates, referring pages, and Google-selected canonicals on 2026-08-03. If the report has not refreshed, continue monitoring through a full 30-day crawl window without bulk Request Indexing submissions.

## Git Record

- Implementation: `f1d1f8802db1a87be5dda511c132b4f6760db1ef` - `seo: improve crawl prioritization for unindexed pages`.
- Report message: `docs: add discovered-not-indexed recovery audit`.

## Final Status

Phase 4C technical implementation and production verification are complete. All 30 targets are healthy, indexable, self-canonical, present in the sitemap, and covered by the expected schema. Static listing coverage is complete, the three evidence-backed Priority A gaps were repaired, and Priority A dual-source coverage is now 30/30. The AWS deployment and production regressions passed without rollback. GSC recrawl/indexing confirmation and server-log evidence remain scheduled monitoring items rather than acceptance blockers.
