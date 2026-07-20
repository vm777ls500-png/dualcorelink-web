# SEO Operations Phase 4A - Google Search Console Index Coverage Audit

Date: 2026-07-20 (Asia/Shanghai)

## Scope

Phase 4A audited the Google Search Console index coverage snapshot, inspected representative URLs, compared every reported URL with the current production response, verified the 76-URL sitemap, and corrected one crawl-discovery weakness in the exported Products listing.

No public URL, slug, WordPress record, DNS record, AWS configuration, Cloudflare setting, GA4 setting, Product schema policy, price, offer, availability, review, or rating was changed.

## GSC Snapshot

The Pages report was last updated on 2026-07-10:

- Indexed: 41.
- Not indexed: 70.
- Alternate page with proper canonical: 6.
- Excluded by `noindex`: 2.
- Page with redirect: 5.
- Duplicate, Google chose different canonical: 27.
- Discovered, currently not indexed: 30.
- Crawled, currently not indexed: 0.

The 70 excluded URLs are explained by the five reported groups above. The snapshot contains historical and legacy-locale URLs, so GSC classifications were compared with current production behavior rather than treated as current server behavior without verification.

## Issue Inventory

### Alternate Page With Proper Canonical - 6

- `https://dualcorelink.com/en/products/?category=rcu-room-control-host`
- `https://dualcorelink.com/en/products/?series=borui-series`
- `https://dualcorelink.com/fa/products/?category=rcu-room-control-host`
- `https://dualcorelink.com/en/products/?series=smart-series`
- `https://dualcorelink.com/de/products/?series=smart-series`
- `https://dualcorelink.com/de/products/?category=curtain-control-panels`

The English query variants are expected filtered-list duplicates and correctly canonicalize to the Products listing. The non-English variants are legacy-locale URLs and belong to the broader locale-retirement follow-up described below.

### Excluded by Noindex - 2

- `http://dualcorelink.com/`
- `https://dualcorelink.com/`

The HTTP URL redirects to HTTPS. The root URL is intentionally outside the published English sitemap and points users to the English site. The current sitemap contains neither URL. This exclusion is expected.

### Page With Redirect - 5

- `https://dualcorelink.com/es/downloads/`
- `https://dualcorelink.com/de/products/?category=rcu-room-control-host`
- `https://dualcorelink.com/de/`
- `https://dualcorelink.com/ar/solutions/`
- `https://dualcorelink.com/ar/faqs/`

These are legacy non-English URLs. GSC records them as historical redirects, but the current production audit returned HTTP 200 for all five because static legacy-locale exports still exist. They are not in the sitemap and have no current sitemap-page inbound links. A coordinated redirect or retirement policy is required; this audit did not change live locale routing.

### Duplicate, Google Chose Different Canonical - 27

- `https://dualcorelink.com/es/contact/`
- `https://dualcorelink.com/de/application-scenarios/`
- `https://dualcorelink.com/ar/contact/`
- `https://dualcorelink.com/ar/about/`
- `https://dualcorelink.com/es/product-series/`
- `https://dualcorelink.com/de/about/`
- `https://dualcorelink.com/zh/`
- `https://dualcorelink.com/ar/case-studies/`
- `https://dualcorelink.com/es/about/`
- `https://dualcorelink.com/de/case-studies/`
- `https://dualcorelink.com/es/products/`
- `https://dualcorelink.com/es/faqs/`
- `https://dualcorelink.com/fa/products/`
- `https://dualcorelink.com/de/faqs/`
- `https://dualcorelink.com/ar/products/`
- `https://dualcorelink.com/zh/regions/`
- `https://dualcorelink.com/es/case-studies/`
- `https://dualcorelink.com/ar/application-scenarios/`
- `https://dualcorelink.com/ar/`
- `https://dualcorelink.com/vi/`
- `https://dualcorelink.com/vi/product-series/`
- `https://dualcorelink.com/zh/application-scenarios/`
- `https://dualcorelink.com/zh/product-series/`
- `https://dualcorelink.com/fa/application-scenarios/`
- `https://dualcorelink.com/de/product-series/`
- `https://dualcorelink.com/fa/contact/`
- `https://dualcorelink.com/de/regions/`

All 27 are legacy non-English paths. Current production returns HTTP 200 and a self-referencing canonical, while the English-only sitemap excludes them and current sitemap pages do not link to them. Google clustering these historical duplicates is reasonable, but the current mixed signals should be resolved in a separate, coordinated locale-retirement change. No canonical was changed in Phase 4A.

### Discovered, Currently Not Indexed - 30

- `https://dualcorelink.com/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
- `https://dualcorelink.com/en/products/ai-large-smart-display/`
- `https://dualcorelink.com/en/products/ai-music-control-panel/`
- `https://dualcorelink.com/en/products/borui-red-matte-room-status-four-key-switch-panel/`
- `https://dualcorelink.com/en/products/borui-red-matte-usb-five-hole-socket/`
- `https://dualcorelink.com/en/products/brushed-aluminum-86-base-doorbell-panel/`
- `https://dualcorelink.com/en/products/brushed-aluminum-sos-alarm-panel/`
- `https://dualcorelink.com/en/products/brushed-aluminum-voice-telephone-information-panel/`
- `https://dualcorelink.com/en/products/hotel-delivery-robot-charging-dock/`
- `https://dualcorelink.com/en/products/hotel-delivery-robot/`
- `https://dualcorelink.com/en/products/hotel-guest-room-doorbell/`
- `https://dualcorelink.com/en/products/hotel-room-door-magnetic-sensor/`
- `https://dualcorelink.com/en/products/hotel-smart-delivery-cabinet/`
- `https://dualcorelink.com/en/products/hotel-smart-room-rcu-host-1/`
- `https://dualcorelink.com/en/products/hotel-smart-room-rcu-host-2/`
- `https://dualcorelink.com/en/products/infrared-repeater/`
- `https://dualcorelink.com/en/products/rotary-knob-smart-control-display/`
- `https://dualcorelink.com/en/products/smart-footlight-night-light-panel/`
- `https://dualcorelink.com/en/products/smart-four-key-curtain-control-panel/`
- `https://dualcorelink.com/en/products/smart-key-card-energy-saver-panel/`
- `https://dualcorelink.com/en/products/smart-series-dual-vertical-socket-panel/`
- `https://dualcorelink.com/en/products/smart-single-key-switch-panel/`
- `https://dualcorelink.com/en/products/smart-three-key-music-control-panel/`
- `https://dualcorelink.com/en/products/smart-usb-five-hole-socket/`
- `https://dualcorelink.com/en/products/smart-voice-telephone-information-socket/`
- `https://dualcorelink.com/en/products/thermostat-hvac-control-panel/`
- `https://dualcorelink.com/en/products/vintage-gold-key-card-energy-saver-panel/`
- `https://dualcorelink.com/en/solutions/hotel-delivery-robot-solution/`
- `https://dualcorelink.com/en/solutions/rcu-room-control-solution/`
- `https://dualcorelink.com/en/solutions/smart-hotel-automation-solution/`

This group contains 26 Products, 3 Solutions, and 1 Case Study. Every URL currently returns HTTP 200, is indexable, has a self-canonical, appears once in the sitemap, and has a unique title, description, and H1. No Resource or Region URL is in this group.

## URL Inspection

Representative inspections were performed without changing GSC settings:

- Hotel Smart Room RCU Host 1: not indexed; discovered, currently not indexed; sitemap and Solution referrer recognized; no crawl date or selected canonical because Google has not crawled it.
- Hotel Guest Room Control Interfaces Guide: indexed; HTTPS and Breadcrumb enhancement valid.
- RCU Room Control Solution: not indexed; discovered, currently not indexed; sitemap recognized; no crawl date.
- UAE Region: indexed; HTTPS and Breadcrumb enhancement valid.

One indexing request was attempted for Hotel Smart Room RCU Host 1. GSC could not submit it because the reCAPTCHA service was unavailable. The request was not repeated. Successful manual requests: 0.

## Sitemap and Current Production QA

The production sitemap and all listed pages were checked on 2026-07-20:

- Sitemap: HTTP 200.
- URLs: 76 total, 76 unique.
- Sitemap URLs returning HTTP 200: 76/76.
- Self-canonical sitemap pages: 76/76.
- Indexable sitemap pages: 76/76.
- Pages with exactly one H1: 76/76.
- Redirecting sitemap URLs: 0.
- Duplicate titles: 0.
- Duplicate meta descriptions: 0.
- Products: 36.
- Product JSON-LD: 36/36.
- Resources: 15.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- Empty `href="#"`: 0.
- Mixed content references: 0.
- Production `noindex`: 0.
- Localhost, SiteGround, `pages.dev`, `cms-aws`, and AWS test-host leakage: 0.

## Internal-Link Finding and Fix

The exported Products listing contained no product-detail anchors before hydration. `ProductFilteredList` uses `useSearchParams`; in a prerendered route, Next.js client-renders the component tree up to its nearest Suspense boundary. The existing Suspense fallback was only a loading message, so crawlers that rely on static HTML could not discover the 36 Product URLs from the Products listing.

The low-risk fix reuses the existing product list data in a static `ContentList` fallback while retaining the interactive client-side filters. After a clean production build, `out/en/products/index.html` contains 36 unique Product detail links.

Eight URLs in the GSC discovered group had no inbound link in the pre-fix exported sitemap-page graph:

- `borui-red-matte-usb-five-hole-socket`
- `brushed-aluminum-sos-alarm-panel`
- `brushed-aluminum-voice-telephone-information-panel`
- `hotel-delivery-robot-charging-dock`
- `smart-footlight-night-light-panel`
- `smart-three-key-music-control-panel`
- `smart-voice-telephone-information-socket`
- `vintage-gold-key-card-energy-saver-panel`

The static fallback now provides a direct Products-listing link to every published Product, including these eight. No product title, slug, category, image, or Product schema changed.

## Product Snippet Eligibility

The Product snippets report, last updated 2026-07-19, lists four pages as missing `offers`, `review`, or `aggregateRating`:

- `https://dualcorelink.com/en/products/embedded-human-presence-sensor/`
- `https://dualcorelink.com/en/products/rcu-controller-cabinet/`
- `https://dualcorelink.com/en/products/86-type-ai-smart-control-display/`
- `https://dualcorelink.com/en/products/brushed-aluminum-86-base-doorbell-panel/`

All four return HTTP 200, are in the sitemap, and expose the existing valid B2B Product JSON-LD. The warning limits merchant-style rich-result eligibility; it is not an indexing failure. DualCoreLink does not publish verified price, availability, review, or rating data, so no fabricated `Offer`, `Review`, or `AggregateRating` markup was added.

## Validation

- `npm.cmd run media:audit`: passed; 36 Products, 132 full images, 132 thumbnails, 264 WebP assets, 0 errors, and the known single-image warning only.
- Public-CMS `npm.cmd run lint`: passed.
- Public-CMS `npm.cmd run test:data`: 61/61 passed.
- Public-CMS `npm.cmd run build`: passed with exit code 0.
- Static pages: 156.
- Products: 36.
- Resources: 15.
- Sitemap: 76.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- Exported Products-listing links: 36 unique.
- `git diff --check`: passed; only non-blocking local line-ending notices were emitted.

## Recommended Follow-up

1. Recheck Page indexing and the eight formerly unlinked Products on 2026-08-03, allowing approximately 14 days for recrawl.
2. Recheck the full discovered group after 30 days of crawl data; do not request all 30 URLs manually.
3. Define a separate legacy-locale retirement plan covering `ar`, `de`, `es`, `fa`, `vi`, and `zh`, including redirect-versus-410 decisions, export cleanup, canonical behavior, and Nginx routing. Deploy it as one coordinated change.
4. Keep the current Product schema policy until verified public commercial or review data exists.
5. Use GSC validation only after the deployed internal-link fix has been recrawled; do not treat historical redirect rows as current redirects without another production check.

## Risks and Observations

- GSC coverage data is delayed and contains historical route behavior.
- Manual indexing was blocked once by reCAPTCHA connectivity; no repeated request was made.
- Legacy non-English pages remain publicly reachable even though they are absent from the English-only sitemap. This is the primary unresolved technical SEO issue.
- The crawlability fix improves discovery signals but cannot guarantee indexing; Google retains final indexing and canonical selection decisions.

## Final Status

Phase 4A identified one actionable crawl-discovery defect and applied a focused fix with regression coverage. The current 76-URL English sitemap is technically healthy. Expected exclusions were documented, Product rich-result warnings were handled without fabricated business data, and legacy-locale canonical behavior was isolated as a separate follow-up. Production deployment and post-deployment recrawl monitoring remain the final operational checks after the implementation commit is pushed.
