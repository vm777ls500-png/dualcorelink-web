# SEO Operations Phase 4E - Googlebot Server Log Verification

Date: 2026-07-20 (Asia/Shanghai)

## Scope

Phase 4E performed a bounded, privacy-safe, read-only review of production Nginx logs to verify claimed Google crawler traffic. The analysis covered the 30 Phase 4C discovered-but-not-indexed URLs, legacy locale requests, sitemap and robots requests, status distributions, relevant Nginx errors, and production service health. Public URL checks were then repeated independently.

No content, URL, canonical, redirect, robots rule, sitemap, schema, server file, service, configuration, AWS resource, DNS record, Cloudflare setting, CMS record, or production traffic path was modified.

## Authorization

The user granted Phase 4E-specific authorization to use the existing local SSH credential for read-only access to the DualCoreLink AWS production server. The credential was used only to connect as the existing `ubuntu` user and run bounded read commands. Its contents were never read, copied, printed, stored in the repository, or included in this report.

## Read-only Guarantee

- No server file was created, changed, moved, copied, or deleted.
- No `chmod`, `chown`, package operation, service reload, service restart, or configuration test was run.
- No raw access or error log was copied locally or committed.
- Analysis code was streamed to Python over SSH stdin and held results in memory.
- A temporary ignored local diagnostic script was removed immediately after use.
- The output retained only normalized paths, aggregate counts, timestamps, crawler categories, and non-reversible source labels during analysis.
- No full visitor address, Cookie, Authorization value, query string, referer query, token, form value, or PII is present in this report.

## Server Timezone

- Host: `dualcorelink-production`
- SSH identity confirmed: `ubuntu`
- Server timezone: Asia/Singapore, UTC+08:00
- System clock: synchronized
- Baseline server time: 2026-07-20 22:19 +08:00
- Uptime at baseline: 5 days, 7 hours

## Monitoring Windows

### Window A - requested last seven days

- Requested start: 2026-07-13 22:26 +08:00
- Available parsed access-log start: 2026-07-15 14:46:30 +08:00
- Available parsed access-log end: 2026-07-20 22:22:15 +08:00
- Parsed request sample: 25,190
- Limitation: the server and retained log files do not provide a full seven-day history. Conclusions apply to the available approximately 5.3-day window only.

### Window B - since Phase 4C deployment

- Requested start: 2026-07-20 20:18:00 +08:00
- First parsed request in the window: 2026-07-20 20:27:38 +08:00
- Last parsed request in the window: 2026-07-20 22:22:15 +08:00
- Parsed request sample: 3,187

All parsing and status commands completed successfully. There were 116 access lines that did not match the expected combined-log shape; none contained a Candidate Googlebot marker. No candidate line was silently discarded. Error-log parsing reported zero parse failures.

## Log Sources

The read-only analysis included current and rotated, including compressed, files for:

- Default Nginx access and error logs
- `dualcorelink-production` frontend access and error logs

The initial default-log-only pass was discarded after log metadata showed a dedicated production vhost log. Final figures include both relevant sources and exclude CMS and test-domain logs.

## Privacy Redaction

Source addresses were retained only in process memory for DNS verification. Any temporary distinction used a truncated SHA-256 label. The final report contains only source counts and trusted DNS suffix classification. Paths were normalized and query strings were removed before aggregation.

## Candidate Googlebot Method

A request was marked Candidate only when its User-Agent contained one of:

- `Googlebot`
- `Google-InspectionTool`
- `GoogleOther`

Subtype aggregation covered Googlebot Desktop, Googlebot Smartphone, Google Inspection Tool, and GoogleOther. A User-Agent match alone was not treated as verified.

## Verified Googlebot Method

Each Candidate source was checked using both directions of Google's recommended DNS process:

1. Reverse DNS lookup.
2. The returned hostname had to end in the trusted `googlebot.com` or `google.com` domain.
3. Forward DNS lookup of that hostname.
4. The forward result had to include the original source address.

All eight Candidate sources passed both directions. No complete address or crawler hostname was retained in the report.

## Candidate Request Summary

### Available Window A

- Candidate requests: 1,054
- Candidate sources: 8
- Unique normalized Candidate paths: 236
- First Candidate request: 2026-07-16 04:40:50 +08:00
- Last Candidate request: 2026-07-20 21:25:14 +08:00
- Googlebot Desktop: 77
- Googlebot Smartphone: 179
- Google Inspection Tool: 30
- GoogleOther: 768

### Window B

- Candidate requests: 2
- Candidate sources: 2
- Unique normalized Candidate paths: 1
- Both requests targeted `/robots.txt`.

## Verified Request Summary

Every Candidate source passed reverse and forward DNS validation:

- Verified requests in available Window A: 1,054
- Verified sources in available Window A: 8
- Candidate-unverified sources: 0
- DNS lookup failures: 0
- Verified requests in Window B: 2
- Verified sources in Window B: 2

Candidate and Verified totals are therefore equal for the available logs. This equality is evidence from the completed DNS checks, not an assumption based on User-Agent.

## Phase 4C 30 URL Coverage

### Available Window A

- Verified-crawled: 3/30
- Candidate-only: 0/30
- Not observed: 27/30
- Error response: 0/30

The three verified-crawled URLs were Products:

- `borui-red-matte-room-status-four-key-switch-panel`: 2 verified requests, both HTTP 200
- `brushed-aluminum-86-base-doorbell-panel`: 2 verified requests, both HTTP 200
- `hotel-smart-room-rcu-host-1`: 2 verified requests, both HTTP 200

The first two were observed on 2026-07-16. The RCU Host 1 URL was last observed through Google Inspection Tool on 2026-07-20 16:47:39 +08:00.

### Window B

- Verified-crawled: 0/30
- Candidate-only: 0/30
- Not observed: 30/30
- Error response: 0/30

Window B is short and does not support a negative indexing conclusion. It establishes only that these URLs were not present in the available verified crawler requests after the Phase 4C deployment at the time of this review.

## Product Coverage

- Available Window A: 3/26 Phase 4C Products verified-crawled, all with HTTP 200
- Window B: 0/26 observed
- Product target errors: 0

## Solution Coverage

- Available Window A: 0/3 Phase 4C Solutions observed
- Window B: 0/3 observed
- Solution target errors: 0

## Case Study Coverage

- Available Window A: 0/1 Phase 4C Case Study observed
- Window B: 0/1 observed
- Case Study target errors: 0

## Legacy URL Crawl Observations

In available Window A, verified crawler traffic included:

- Legacy requests: 95
- Unique legacy paths: 75
- HTTP 200: 60
- HTTP 404: 35
- HTTP 301: 0
- HTTP 302: 0
- HTTP 429: 0
- HTTP 5xx: 0
- Last verified legacy request: 2026-07-20 14:57:47 +08:00

The final Phase 4B production redirect configuration was activated later, around 19:27 +08:00. Therefore the historical legacy HTTP 200 and 404 observations predate the final redirect rules and are not evidence of a current redirect regression.

Window B contained zero Candidate or Verified legacy requests. Consequently, server logs do not yet show a post-cutover Googlebot 301 sample or a sequential English-target follow-up. The independent public cross-check confirms current known legacy behavior but is reported separately below.

## Sitemap Crawl

### Available Window A

- Candidate requests: 2
- Verified requests: 2
- HTTP 200: 2
- Last verified request: 2026-07-20 04:21:41 +08:00
- Recorded response bytes across the two requests: 22,732
- Sitemap 404 / 429 / 5xx: 0 / 0 / 0

### Window B

- Candidate requests: 0
- Verified requests: 0

## Robots Crawl

### Available Window A

- Candidate requests: 71
- Verified requests: 71
- HTTP 200: 65
- HTTP 301: 6, representing HTTP-to-HTTPS requests
- HTTP 404 / 429 / 5xx: 0 / 0 / 0
- Last verified request: 2026-07-20 21:25:14 +08:00

### Window B

- Verified requests: 2
- HTTP 200: 1
- HTTP 301: 1
- Last verified request: 2026-07-20 21:25:14 +08:00

The public HTTPS robots response remained HTTP 200 and allowed the English production site.

## Status Code Distribution

Because all Candidate sources were verified, Candidate and Verified distributions are identical.

### Available Window A

| Class | Count |
| --- | ---: |
| 2xx | 995 |
| 3xx | 11 |
| 4xx | 48 |
| 404 | 48 |
| 429 | 0 |
| 5xx | 0 |

Exact observed statuses were HTTP 200 (995), HTTP 301 (11), and HTTP 404 (48). None of the 48 HTTP 404 responses belonged to the Phase 4C 30-URL target set.

### Window B

| Class | Count |
| --- | ---: |
| 2xx | 1 |
| 3xx | 1 |
| 4xx | 0 |
| 429 | 0 |
| 5xx | 0 |

## 5xx / 429 / Timeout

All relevant commands completed successfully.

- Verified Googlebot HTTP 5xx: 0 in both windows
- Verified Googlebot HTTP 429: 0 in both windows
- Nginx error entries matching upstream timeout: 0
- Nginx error entries matching connection reset: 0
- Nginx error entries matching rate limiting: 0
- Candidate-source-correlated Nginx error entries: 0
- Kernel OOM indicators: 0
- Kernel disk-full indicators: 0

## Nginx Error Log Review

The available Window A contained 33 parsed Nginx error-log entries: 32 at error severity and one notice. None was associated with a Candidate source, and none matched the requested high-risk categories for upstream timeout, failed connect, SSL/TLS failure, premature close, rate limit, permission denial, missing file, rewrite cycle, connection reset, disk full, or OOM.

Window B contained zero Nginx error-log entries. This is based on a successful read and parse of both default and production frontend error logs, not an empty or failed command.

## Service Status

The following read-only commands succeeded:

- Nginx: active and enabled
- MariaDB: active
- PHP 8.3 FPM: active
- Fail2ban: active
- Failed services: 0

The host uses PHP 8.3 FPM; no fallback guess to PHP 8.2 or a generic service name was used.

## Disk Status

- Root filesystem: 77 GB total, 34 GB used, 43 GB available, 44% used
- Root inode use: 3%
- Boot filesystem: 20% used
- Kernel journal OOM indicators in the bounded window: 0
- Kernel journal disk-full indicators in the bounded window: 0

## Public URL Cross-check

The public checks were repeated after log analysis and remained separate from crawler evidence:

- Phase 4C targets: 30/30 HTTP 200
- Phase 4C Products: 26/26 HTTP 200
- Phase 4C Solutions: 3/3 HTTP 200
- Phase 4C Case Study: 1/1 HTTP 200
- Apex known legacy URLs: 72/72 one-hop HTTP 301
- `www` known legacy URLs: 72/72 one-hop HTTP 301
- Unknown legacy fixtures: 12/12 intentional HTTP 404
- Redirect chains: 0
- Redirect loops: 0
- Final English targets: 144/144 HTTP 200
- Sitemap: HTTP 200, 76/76 URLs HTTP 200
- Robots: HTTP 200 and allows English production pages
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- Product WebP assets: 264/264 HTTP 200
- Public page 4xx / 5xx outside intentional unknown-legacy fixtures: 0 / 0
- Environment leakage, production `noindex`, mixed content, and broken referenced images: 0

## Technical Issues

No current technical condition requiring a production change was found. In particular:

- No Phase 4C target returned an error to a verified crawler.
- No verified crawler received 429 or 5xx.
- Sitemap and robots requests were successful.
- The final public legacy redirect rules remain correct.
- No post-Phase 4C Nginx error entry was present.

The historical legacy 200 responses occurred before the final Phase 4B Nginx activation and should be retained as crawl-history evidence, not treated as a present regression.

## Pending Items

1. Re-run the bounded log aggregation on 2026-08-03 after a longer post-cutover crawl window.
2. Compare GSC indexed and excluded totals with this verified crawl evidence.
3. Check whether Googlebot revisits the remaining 27 Phase 4C targets.
4. Check whether post-retirement legacy requests begin returning logged 301 responses and whether corresponding English targets are subsequently fetched.
5. Do not submit bulk indexing requests or change redirects solely because the current post-Phase4C window is short.

## Risks

- The available log history begins on 2026-07-15 and is shorter than the requested seven days.
- The Window B observation period is approximately two hours and is too short for indexing conclusions.
- The access parser skipped 116 non-combined-format lines; zero of those lines contained a Candidate marker.
- Verified crawl evidence does not imply that Google has indexed a URL.
- Historical pre-retirement legacy responses remain visible until logs rotate and GSC recrawls the new behavior.

## Next Review Date

2026-08-03.

## Git Record

- Baseline commit: `fe9578ddec4ab855b02f466b6eb342f779894cde`
- Report commit: recorded after the documentation commit

## Final Status

Phase 4E read-only Googlebot verification is complete for the available log windows. All eight Candidate sources were verified by bidirectional DNS, 1,054 verified requests were aggregated without retaining identifiable source data, three of the 30 Phase 4C targets have verified HTTP 200 crawl evidence in the available historical window, and no target error, verified 5xx, 429, timeout, reset, or post-Phase4C Nginx error was found. Public crawlability and redirect behavior also remain healthy. The principal next step is scheduled observation through 2026-08-03, not an immediate production change.
