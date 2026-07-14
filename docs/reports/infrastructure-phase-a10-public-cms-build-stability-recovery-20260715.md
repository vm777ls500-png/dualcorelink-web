# Infrastructure Phase A10: Public CMS Build Stability Recovery

Date: 2026-07-15

## Objective

Stabilize Cloudflare Pages Git builds that fetch the public WordPress REST API during `Collecting page data`, without changing CMS content, page content, DNS, Cloudflare variables, `WORDPRESS_REST_ROOT`, dependencies, or the generated content baseline.

## Prior Cloudflare Failures

- Implementation source: `f83b8c3055f3946fb873b1b92bf4709d33dd7620`
- First failed deployment: `https://a8fad53e.dualcorelink-web.pages.dev`
- First failure route: `/[locale]/products/[slug]`
- Same-source retry: `https://c0bde598.dualcorelink-web.pages.dev`
- Retry failure route: `/[locale]/regions/[slug]`
- Both deployments compiled successfully and then failed during `Collecting page data` with `AbortError`.
- Both builds used `https://cms.dualcorelink.com/wp-json`; no localhost fallback occurred.

## Initial Request Model

A traced local production build against the public CMS succeeded and established this baseline:

- Client fetch attempts: 480
- Unique request URLs after removing the cache-bust value: 151
- Duplicate request instances: 329
- Node processes issuing CMS requests: 9
- Peak active requests observed across the combined trace: 87
- Highest per-process active count: 58
- Maximum request duration: 1,149 ms
- Retry attempts: 0
- Request failures: 0
- Approximate end-to-end build observation: 22 seconds
- Static pages: 155

The largest repeated groups were:

- Solutions collection and relationship queries: 42 requests
- Products collection and relationship queries: 18 requests
- Regions collection: 3 requests
- Many individual media endpoints were requested two or six times.

## Root Cause Assessment

The failure was caused by build-time request amplification rather than a missing CMS endpoint or localhost fallback:

1. The WordPress client attached an `AbortController.signal` to every fetch. Next.js 15.5 documents that a signal opts the request out of automatic fetch memoization.
2. A process-specific timestamp was always appended as `_cache_bust`, so otherwise identical requests from different static-generation workers had different URLs.
3. Metadata generation and page rendering could independently resolve the same product or solution detail, including media and relationship data.
4. Related content used per-record `include` queries even when the complete product, solution, or FAQ collection was already required elsewhere in the build.
5. Static page generation allowed enough worker and page concurrency to create a measured peak of 87 active CMS requests.

This explains why Cloudflare failures occurred on different routes: the failing route was the point at which the shared CMS request burst exceeded the 10-second client timeout, not a route-specific data defect.

## Implemented Recovery

### Request reuse

- Added exact promise reuse for identical WordPress JSON requests within each build worker.
- Added media promise reuse, including cached valid 404-to-null results.
- Added locale-level list promise reuse and slug-level detail promise reuse for product and solution repositories.
- Added locale-level list promise reuse for regions.
- Changed related-content resolution to filter the already reusable full collection instead of issuing many per-record `include` queries.

### Cache identity

- Removed the automatic process timestamp cache buster.
- A cache-bust value is now added only when explicitly supplied, or when a stable build identifier is available through `CF_PAGES_COMMIT_SHA` or `GITHUB_SHA`.
- Fetch requests opt into `force-cache`, allowing identical requests to use the current Next.js server-side data cache while preserving a fresh cache identity for each Cloudflare commit.

### Timeout and retry

- Timeout remains bounded at the existing 10,000 ms; it was not increased.
- Maximum attempts: 2 total attempts.
- Retry delay: 250 ms.
- Retry applies only to `AbortError` and fetch-style network `TypeError` failures.
- HTTP errors, invalid JSON, and validation errors are not retried or hidden.
- A final network failure throws `WordPressDataError` with endpoint, attempt, and elapsed-time context.
- No empty collection is returned to disguise a failed request.

### Concurrency

The official Next.js 15.5 static-generation controls were set to:

- `staticGenerationMaxConcurrency: 2`
- `staticGenerationMinPagesPerWorker: 80`

This limits CMS pressure without serializing all static generation.

### Response fields

No `_fields` or response-shape optimization was introduced. This avoids risking product body, ACF, taxonomy, media, metadata, or schema completeness. Request reuse and concurrency control were sufficient locally.

## Local Verification

### Commands

- `npm.cmd run lint`: passed
- `npm.cmd run test:data` with the public CMS: 36/36 passed
- Public CMS production build 1: passed
- Public CMS production build 2: passed
- `git diff --check`: passed; line-ending notices only

New tests cover:

- Reuse of identical collection and media requests.
- One retry after a transient network error.
- No retry for HTTP errors or invalid JSON.
- Explicit failure after two unsuccessful network attempts.
- Cached media 404 behavior.

### Build comparison

| Metric | Before | Fixed build 1 | Fixed build 2 |
| --- | ---: | ---: | ---: |
| Client fetch attempts | 480 | 180 | 179 |
| Unique request URLs | 151 | 138 | 138 |
| Duplicate request instances | 329 | 42 | 41 |
| Processes issuing requests | 9 | 5 | 5 |
| Peak active requests | 87 | 8 | 8 |
| Highest per-process active count | 58 | 8 | 8 |
| Maximum request duration | 1,149 ms | 703 ms | 536 ms |
| Retry attempts | 0 | 0 | 0 |
| AbortError / request failures | 0 | 0 | 0 |
| Approximate build observation | 22 s | 20 s | 15 s |
| Static pages | 155 | 155 | 155 |

The fixed builds reduced client fetch attempts by approximately 62.5% and the observed peak active request count by approximately 90.8%.

## Preserved Baseline

- Products: 36
- Resources: 14
- Sitemap URLs: 75
- Article JSON-LD: 14/14
- BreadcrumbList: 14/14
- Product JSON-LD: 36/36
- Static pages: 155
- Static output localhost or `127.0.0.1` leakage: 0

## Cloudflare and Production Status

Cloudflare verification is pending the Phase A10 implementation commit and push. This report does not claim that the Cloudflare build or production QA has passed yet.

Pending checks:

- One automatic Git build from the Phase A10 source.
- `Collecting page data` completion with no terminal `AbortError`.
- Deployment source and URL confirmation.
- Production baseline and Phase 2E URL validation.
- Production responsive and regression QA.

## Configuration Scope

- CMS data/content modified: no
- DNS modified: no
- Cloudflare configuration or environment variables modified: no
- `WORDPRESS_REST_ROOT` modified: no
- `wrangler.toml` modified: no
- Dependencies modified: no
- Page or Resource content modified: no

## Risks and Rollback

- The Next.js static-generation concurrency options are experimental in 15.5, although they are documented by the installed version.
- The public CMS remains an external build dependency. Two bounded attempts reduce transient risk but deliberately do not hide a sustained outage.
- `force-cache` uses a commit-based cache-bust value in Cloudflare builds. CMS-only edits still require a new build event to publish updated static output.
- Rollback is a normal Git revert of the Phase A10 implementation commit. No CMS, DNS, or Cloudflare state rollback is required.
