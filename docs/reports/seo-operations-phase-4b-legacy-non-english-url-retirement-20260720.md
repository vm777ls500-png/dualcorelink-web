# SEO Operations Phase 4B - Legacy Non-English URL Redirect and Retirement

Date: 2026-07-20 (Asia/Shanghai)

## Scope

Phase 4B retired the legacy `zh`, `de`, `es`, `ar`, `vi`, and `fa` static locale surfaces while preserving the current English production site. Known legacy URLs now redirect in one hop to verified English equivalents. Unknown legacy paths return a hard 404 instead of being redirected to a generic page.

The change did not alter English slugs, content, WordPress data, DNS, Cloudflare, GA4, Product schema policy, prices, offers, availability, reviews, ratings, or infrastructure credentials.

## Original GSC Findings

The Phase 4A Google Search Console snapshot was last updated on 2026-07-10 and reported:

- 27 legacy non-English URLs under "Duplicate, Google chose different canonical".
- 5 legacy non-English URLs under "Page with redirect".
- 6 URLs under "Alternate page with proper canonical".
- 2 URLs excluded by `noindex`.

At the Phase 4A audit time, all 32 legacy URLs in the first two groups still returned HTTP 200 even though they were absent from the English sitemap. Phase 4B resolves that mixed signal by retiring the corresponding legacy static pages and applying explicit redirect-or-404 behavior.

## Legacy Locales and Inventory

- Retired locale prefixes: `zh`, `de`, `es`, `ar`, `vi`, and `fa`.
- Verified known legacy URLs: 72.
- Unknown-path fixtures: one per locale, 6 total.
- Production QA covered both apex and `www`, for 144 known source URLs and 12 unknown-path requests.

The 72-entry inventory was generated from published route knowledge and checked against existing English static targets. No guessed Product, Resource, Solution, Region, or other destination was introduced.

## Redirect Architecture

The Nginx template uses an allowlisted map from a normalized legacy path to an English target path. A known legacy path receives HTTP 301 only when its mapped English target exists in the active static release. Query strings are dropped. An unknown legacy path receives HTTP 404.

The `www` server applies the same verified legacy map before the general host canonicalization rule. This sends a known `www` legacy URL directly to the final English apex URL, avoiding the previous two-hop route through the apex legacy URL.

## Safe Target Existence Check

The deploy script builds the target-existence map from the completed static export. The Nginx rule does not redirect solely because a locale prefix is recognized. It requires a known mapped route backed by a real English output target. This preserves the safety policy:

- Known legacy URL plus existing English target: one-hop HTTP 301.
- Unknown or missing English target: HTTP 404.
- No homepage fallback, directory listing, soft 404, or fabricated route.

## CI Data Fetch Failure

The initial implementation run failed before build and deployment:

- Actions run: `29733211692`.
- Exact source: `019eb65e83d6c38f84414b27463add5a2e3d84cf`.
- Result: 57/62 data tests passed; 5 failed.
- Build, release creation, Nginx activation, and production traffic were not reached.

The five failing tests were:

1. `resources are included in the sitemap without non-English or PDF URLs`
2. `Phase 2D resources have complete topic-cluster content and links`
3. `Phase 2E resources cover procurement topics with valid SEO and links`
4. `Phase 2G control interfaces guide is complete, linked, and attribution-safe`
5. `all published product detail pages can emit safe Product schema`

All five surfaced `WORDPRESS_INVALID_JSON` from the same cached Products collection request. The redirect-specific tests passed. The failure was not caused by path separators, case sensitivity, CRLF/LF handling, Nginx whitespace, or an `out/` dependency.

## UND_ERR_SOCKET Root Cause

The public CMS Products request used `per_page=100`. In the AWS runner environment, the response connection could end around the large payload boundary and surface an Undici socket/invalid-JSON failure. The rejected Products promise was cached, so later tests that reused sitemap or Product data failed immediately with the same underlying exception.

The application correctly failed closed; no empty-data fallback, skipped assertion, `continue-on-error`, or fake successful build was added.

## Pagination and Retry Fix

Commit `eed252ccdd0d8d1051b5ed4e6d4eeb738e2f1dfb` changed the collection client to use bounded pagination with `per_page=10` and retained bounded transient-network retry behavior. Tests cover pagination, deduplication, retry, error propagation, and rejected-cache eviction.

The fix did not weaken response validation. HTTP errors, malformed JSON, and exhausted network attempts still return nonzero failures.

## WWW Single-Hop Fix

After the data-layer deployment, the first production redirect audit found the apex behavior correct but `www` legacy requests still took two hops:

`www legacy -> apex legacy -> apex English`

Commit `e31e863f5dd871ca97a5a8559969930eab384d42` moved verified legacy handling ahead of general `www` canonicalization and added regression coverage. The final production audit confirmed direct one-hop redirects for all 72 `www` legacy URLs.

## Validation

### Local and CI

- Media audit: exit code 0.
- Products: 36.
- Full images: 132.
- Thumbnails: 132.
- WebP assets: 264.
- Media errors: 0.
- Known media warning: 1, the existing single-image `rotary-knob-smart-control-display` reshoot item.
- Lint: passed.
- Data tests: 62/62 passed after the fix.
- Build: passed.
- Static pages: 156/156.
- Products: 36.
- Resources: 15.
- Sitemap: 76.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.

### Actions Runs

| Run | Source | Result | Purpose |
| --- | --- | --- | --- |
| `29733211692` | `019eb65e83d6c38f84414b27463add5a2e3d84cf` | Failed at tests | Initial locale-retirement implementation; no deployment |
| `29734405248` | `eed252ccdd0d8d1051b5ed4e6d4eeb738e2f1dfb` | Success | CI-safe public CMS pagination/retry fix |
| `29737033085` | `e31e863f5dd871ca97a5a8559969930eab384d42` | Success | Final `www` single-hop fix |

Final run details:

- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29737033085`.
- Runner: self-hosted `dualcorelink-production`, version `2.335.1`.
- Checkout: `actions/checkout@v5`.
- Exact source checkout: confirmed.
- Install, lint, 62/62 tests, build, Nginx configuration test, atomic release activation, local health check, and external health check: passed.
- Previous release: `/srv/dualcorelink/frontend/releases/eed252ccdd0d-20260720-181658`.
- New release: `/srv/dualcorelink/frontend/releases/e31e863f5dd8-20260720-190257`.
- Current symlink: `/srv/dualcorelink/frontend/current` resolves to the new release.
- Local HTTPS health check: passed on attempt 1.
- External HTTPS health check: passed on attempt 1.
- Rollback: not required.

## Nginx Activation

The workflow validates the repository Nginx template but does not install that template on the host. The final template was therefore activated separately on the AWS production host with an explicit backup and rollback guard.

- Previous live template SHA-256: `b718241146245d4647c7b4014307fe9e2030cbf323aa7dc6833423eefba50ff2`.
- Final template SHA-256: `86e9ea225d640361e63e32e0cc7b084df9e1f38ad21c5d64b5c0acf72fc9d651`.
- Backup: `/etc/nginx/sites-available/dualcorelink.com.phase4b-www-backup-20260720-192707`.
- `nginx -t`: passed before reload.
- Nginx reload: completed.
- Active template hash: matched the final repository template.
- Nginx, PHP 8.3 FPM, and MariaDB: active.
- Failed systemd services: 0.

The first journal warning-count command used an invalid `grep` option ordering, so its blank counters are not treated as evidence of zero warnings. No production 5xx, service failure, or health-check failure was observed. This command-level observation does not affect the redirect or availability acceptance results.

## Production Redirect QA

### Apex Legacy URLs

- Initial response HTTP 301: 72/72.
- `Location` matched the verified English target: 72/72.
- Redirect hops: exactly 1 for 72/72.
- Final response HTTP 200: 72/72.
- Final canonical matched the final English URL: 72/72.
- Legacy HTTP 200: 0.
- Legacy HTTP 302: 0.

### WWW Legacy URLs

- Direct HTTP 301 to final English apex target: 72/72.
- Redirect hops: exactly 1 for 72/72.
- Final response HTTP 200: 72/72.
- Final canonical matched the English apex URL: 72/72.
- Two-hop chains: 0.

Combined known-URL result:

- Single-hop redirects: 144/144.
- Final HTTP 200 targets: 144/144.
- Canonical matches: 144/144.
- Redirect chains: 0.
- Redirect loops: 0.

### Unknown Legacy 404

The six unknown fixtures were tested on both apex and `www`:

- HTTP 404: 12/12 requests.
- Redirect to homepage or unrelated English content: 0.
- Soft 404: 0.
- Directory listing: 0.
- Redirect loop: 0.

### Query Cleanup

Six query variants were checked on both apex and `www`: `utm_source`, `utm_campaign`, `fbclid`, `gclid`, a category parameter, and an arbitrary parameter.

- Clean single-hop redirect: 12/12.
- Final canonical without tracking/query parameters: 12/12.
- Query-contaminated English destination: 0.
- Additional redirect chain: 0.

## SEO Signal Review

- Sitemap legacy URLs: 0.
- Internal legacy links: 0.
- Legacy canonical URLs: 0.
- Legacy URLs in schema: 0.
- Non-English hreflang entries: 0.
- Legacy static directories: 0.
- Legacy HTML responses with HTTP 200: 0.

All 144 final English pages had a self-referencing canonical matching the verified redirect destination.

## English Baseline Regression

- Required top-level pages checked: 7/7 HTTP 200, including home, Products, Resources, Solutions, Regions, Case Studies, and Contact.
- Product details: 36/36 HTTP 200.
- Resources: 15/15 HTTP 200.
- Sitemap: HTTP 200, 76 URLs, 76/76 HTTP 200.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- WebP assets: 264/264 HTTP 200.
- Referenced images sampled by the full audit: 196; broken images: 0.
- Unexpected page HTTP 4xx/5xx: 0, excluding the intentional unknown-legacy 404 fixtures.
- Environment leakage: 0.
- Mixed content: 0.
- Production `noindex`: 0.
- Prohibited private-path or user-entered PII leakage in static output: 0 detected.

## GSC Validation Decision

- 27 canonical-difference legacy URLs: the technical fix is deployed. GSC validation is eligible but remains pending recrawl; no repeated browser or reCAPTCHA attempt was made during final archive.
- 5 historical redirect URLs: production now intentionally returns HTTP 301 to verified English targets. This is expected redirect behavior, not an error to remove. Monitor the report rather than changing the route back to HTTP 200.
- 6 alternate-canonical URLs: expected filtered-list canonical behavior remains; no repair was initiated.
- 2 `noindex` URLs: expected root/redirect behavior remains; no repair was initiated.
- Remove URLs tool: not used.

GSC classification data is delayed, so the old rows may remain visible until Google recrawls the legacy URLs.

## Git Record

- `019eb65e83d6c38f84414b27463add5a2e3d84cf` - `seo: retire legacy non-english urls`
- `eed252ccdd0d8d1051b5ed4e6d4eeb738e2f1dfb` - `fix: make legacy redirect validation ci-safe`
- `e31e863f5dd871ca97a5a8559969930eab384d42` - `fix: keep legacy www redirects single-hop`

## Remaining Risks

- Google recrawl and coverage reclassification are asynchronous and cannot be guaranteed by the technical deployment.
- The production workflow validates but does not install Nginx template changes; this phase required a separately controlled activation. A future operations task should make Nginx template deployment explicit and auditable without broadening runner privileges.
- The dependency install continues to report 7 known audit findings (1 low, 2 moderate, 4 high). No audit fix was run in this phase.
- The single-image Rotary Knob media warning remains unrelated to redirects.
- Exact Nginx/PHP journal warning counts were not archived because the diagnostic counter command was malformed; service state, public requests, and 5xx checks were healthy.

## Next Review Date

Recheck GSC Page indexing and the legacy locale groups on 2026-08-03, then continue monitoring through a full 30-day recrawl window if classifications have not yet converged.

## Final Status

Phase 4B is technically complete. Known legacy URLs across apex and `www` redirect in one hop to verified English pages, unknown legacy paths fail safely with HTTP 404, query parameters are removed, English SEO baselines remain intact, the final AWS release is healthy, and no rollback was required. GSC validation remains a non-blocking post-deployment monitoring item.
