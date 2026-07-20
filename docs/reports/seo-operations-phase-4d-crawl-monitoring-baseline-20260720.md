# SEO Operations Phase 4D - Crawl Monitoring Baseline

Date: 2026-07-20 (Asia/Shanghai)

## Scope

Phase 4D establishes a privacy-safe crawl-monitoring baseline for the 30 Phase 4C discovered-but-not-indexed English URLs, the retired legacy locale surface from Phase 4B, the English sitemap, and the public production routes. This checkpoint is intentionally read-only. It did not change content, URLs, slugs, canonical tags, redirects, robots rules, sitemap generation, schema, Nginx, AWS, DNS, Cloudflare, WordPress, or production traffic.

The current GSC baseline remains:

- Indexed: 41
- Discovered, currently not indexed: 30
- Crawled, currently not indexed: 0
- Legacy canonical-difference: 27
- Sitemap URLs: 76
- GSC review date: 2026-08-03

## Authorization Status

No Phase 4D-specific authorization to use the local AWS SSH credential was provided. Accordingly:

- No SSH connection was attempted.
- No Nginx access or error log was read.
- No PHP-FPM, MariaDB, disk, or systemd status was read from the server.
- Server log analysis remains pending.
- Candidate and verified Googlebot counts are not reported as zero; they are unavailable without the authorized log window.
- No claim is made that Googlebot has crawled any monitored URL.

The public HTTP checks in this report do not require server access and do not identify crawler traffic.

## Monitoring Window

- Public synthetic verification: 2026-07-20, completed at 22:10 +08:00.
- Intended server-log window: from the Phase 4C deployment through 2026-07-20, with a maximum seven-day lookback.
- Actual server-log window: pending dedicated read-only SSH authorization.
- Next GSC comparison: 2026-08-03.

## Googlebot Identification Method

When server-log access is authorized, crawler records will be classified in two stages:

1. **Candidate Googlebot:** User-Agent contains `Googlebot`, `Google-InspectionTool`, or `GoogleOther`.
2. **Verified Googlebot:** the source address passes Google's reverse-DNS and forward-DNS consistency procedure and resolves to an official Google crawler domain.

A User-Agent match alone will never be counted as verified. The report will retain only aggregate counts, URL categories, status distributions, and last-request timestamps. Full visitor addresses, cookies, query values, and raw log lines will not be archived.

## Candidate vs Verified Traffic

| Metric | Candidate | Verified |
| --- | ---: | ---: |
| Request count | Pending log authorization | Pending log authorization |
| Unique monitored URLs | Pending log authorization | Pending log authorization |
| Last request time | Pending log authorization | Pending log authorization |
| Status distribution | Pending log authorization | Pending log authorization |

No crawler request has been inferred from sitemap availability, public HTTP success, or GSC's delayed classification data.

## Phase 4C URL Crawl Status

The monitored inventory remains 30 URLs: 26 Products, 3 Solutions, and 1 Case Study.

Public technical readiness was reconfirmed:

- HTTP 200: 30/30
- Self-canonical: 30/30
- Indexable: 30/30
- Sitemap inclusion: 30/30
- Expected schema: 30/30
- Static listing entry: 30/30
- Priority A targets with at least two independent internal sources: 30/30
- Redirects: 0
- Production 5xx in this successful public target run: 0
- Focused code changes indicated: 0

Actual crawl categories remain pending:

| Crawl category | Count |
| --- | ---: |
| Crawled by verified Googlebot | Pending log authorization |
| Candidate-only crawl | Pending log authorization |
| No observed crawl | Pending log authorization |
| Crawl error | Pending log authorization |

Without authorized server logs, the absence of evidence cannot be classified as "no observed crawl."

## Legacy URL Crawl Status

The public redirect regression covered the complete known 72-route inventory, which includes the 27 GSC canonical-difference URLs:

- Apex known legacy redirects: 72/72 returned one-hop HTTP 301 to the verified English target.
- `www` known legacy redirects: 72/72 returned one-hop HTTP 301 directly to the final English apex target.
- Final English responses: 144/144 HTTP 200.
- Final canonical matches: 144/144.
- Redirect chains: 0.
- Redirect loops: 0.
- Unknown legacy fixtures: 12/12 returned intentional HTTP 404 without a redirect.
- Legacy URLs returning HTTP 200: 0.
- Legacy URLs in sitemap, internal links, canonical tags, or schema: 0.

Whether Googlebot still requests the 27 historical URLs, and whether it subsequently requests their English targets, remains pending authorized log analysis.

## Sitemap and Robots

- `https://dualcorelink.com/sitemap.xml`: HTTP 200.
- Sitemap URLs: 76.
- Sitemap pages returning HTTP 200: 76/76.
- Duplicate sitemap URLs: 0.
- Legacy URLs: 0.
- Redirect or `noindex` URLs: 0.
- `https://dualcorelink.com/robots.txt`: HTTP 200.
- English production pages are allowed.
- The file declares `https://dualcorelink.com/sitemap.xml`.
- WordPress administration and REST paths are disallowed without blocking the static English site.

## Status Code Summary

These values describe successful public synthetic verification only, not Googlebot traffic:

| Public check group | 2xx | 3xx | 4xx | 5xx |
| --- | ---: | ---: | ---: | ---: |
| Phase 4C targets | 30 | 0 | 0 | 0 |
| Known legacy source URLs, apex and www | 0 | 144 | 0 | 0 |
| Known legacy final English targets | 144 | 0 | 0 | 0 |
| Unknown legacy safety fixtures | 0 | 0 | 12 intentional | 0 |
| Sitemap URLs | 76 | 0 | 0 | 0 |

The completed public runs observed no timeout, HTTP 429, redirect chain, redirect loop, or unexpected 4xx/5xx. Server-side timeout, reset, rate-limit, TLS, upstream, and service-failure conclusions remain pending because no server logs or service status were inspected.

## Server Stability

Pending dedicated read-only SSH authorization. No statement is made about:

- Nginx upstream errors
- PHP-FPM warnings
- MariaDB service state
- TLS errors or connection resets
- Server-side timeouts
- Rate limiting or HTTP 429 in access logs
- Failed services
- Disk capacity during the monitoring window

## Public URL Regression

- Phase 4C targets: 30/30 HTTP 200
- Products among the targets: 26/26 HTTP 200
- Solutions among the targets: 3/3 HTTP 200
- Case Study among the targets: 1/1 HTTP 200
- All Product pages: 36/36 HTTP 200
- All Solution pages: 6/6 HTTP 200; listing links 6/6
- All Case Study pages: 3/3 HTTP 200; listing links 3/3
- Resources listing links: 15/15
- Regions listing links: 5/5
- Apex legacy redirects: 72/72 one-hop HTTP 301
- `www` legacy redirects: 72/72 one-hop HTTP 301
- Sitemap: 76/76 HTTP 200
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- Product WebP assets: 264/264 HTTP 200
- Referenced images checked: 196; broken images: 0
- Environment leakage: 0
- Production `noindex`: 0
- Mixed-content pages: 0

No technical regression or code-level correction was identified.

## GSC Review Template

Complete this table on 2026-08-03 using current GSC data. Unknown values are deliberately blank.

| Metric | Baseline | 2026-08-03 result | Change / notes |
| --- | ---: | ---: | --- |
| Indexed total | 41 |  |  |
| Not indexed total | 70 |  |  |
| Discovered, currently not indexed | 30 |  |  |
| Crawled, currently not indexed | 0 |  |  |
| Duplicate, Google chose different canonical | 27 |  |  |
| Page with redirect | 5 |  |  |

Use the following row structure for each inspected URL. Do not prefill unavailable data.

| URL | Last crawl | Referring page | Sitemap detected | Google-selected canonical | URL Inspection result | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Phase 4C or legacy sample |  |  |  |  |  |  |

The review should compare the 30 Phase 4C URLs and representative URLs from the 27 canonical-difference group. Indexing requests remain out of scope unless separately approved.

## Pending Items

1. Obtain dedicated authorization for a bounded, read-only AWS log review.
2. Aggregate candidate crawler traffic and verify candidates with reverse and forward DNS checks.
3. Classify the 30 Phase 4C URLs by observed verified crawl status.
4. Measure requests to the 27 legacy canonical-difference URLs and subsequent English-target requests.
5. Complete the GSC comparison on 2026-08-03 without treating delayed classifications as live server behavior.

## Risks

- GSC classifications are delayed and do not prove current crawl activity.
- Public HTTP success establishes technical crawlability but cannot prove Googlebot arrival.
- Until authorized logs are reviewed, crawler status distribution, last crawl timestamps, source verification, and server-side stability metrics remain unknown rather than zero.
- Unknown legacy fixtures intentionally return 404; they must not be counted as production regressions.

## Next Review Date

2026-08-03, or earlier if dedicated read-only SSH log authorization is granted.

## Final Status

The Phase 4D public crawl-readiness baseline is complete. All monitored public routes, sitemap signals, robots rules, canonical behavior, schema, and legacy redirects remain healthy, and no technical correction is indicated. Server-log-based Googlebot monitoring is pending authorization, so Phase 4D is archived as a complete public baseline with the crawler-evidence portion explicitly pending rather than inferred.
