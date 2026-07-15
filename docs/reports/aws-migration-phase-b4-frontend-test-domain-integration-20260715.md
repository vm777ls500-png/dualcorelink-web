# AWS Migration Phase B4 - Frontend Test-Domain Integration

Date: 2026-07-15

## Objective

Prepare isolated AWS test domains for the migrated WordPress CMS and the Next.js static frontend, issue trusted HTTPS certificates, rebuild the frontend against the AWS CMS, publish it through an atomic release symlink, and complete production-like QA without changing official production traffic.

## Scope And Safety Boundaries

- AWS instance: `dualcorelink-production`, Singapore, static IPv4 `52.74.68.63`.
- AWS frontend test domain: `https://aws.dualcorelink.com`.
- AWS CMS test domain: `https://cms-aws.dualcorelink.com`.
- The official `dualcorelink.com`, `www.dualcorelink.com`, and `cms.dualcorelink.com` records and traffic were not changed.
- Cloudflare Pages Production and SiteGround content were not changed.
- MariaDB port 3306 was not opened publicly.
- No credentials, private keys, certificate account email, database passwords, or WordPress secrets are recorded in this report.

## Pre-B4 Recovery Point

- Lightsail snapshot: `dualcorelink-pre-b4-test-domain-20260715`.
- Snapshot state was manually confirmed as `Available` before test-domain work continued.
- Previous frontend release retained: `/srv/dualcorelink/frontend/releases/b4-placeholder`.
- WordPress B3 release and database backup remained available.

## DNS

Only two Cloudflare DNS records were added:

| Type | Name | Value | Proxy | TTL |
| --- | --- | --- | --- | --- |
| A | `aws` | `52.74.68.63` | DNS only | Auto |
| A | `cms-aws` | `52.74.68.63` | DNS only | Auto |

Public DNS resolution confirmed that both test domains resolve to `52.74.68.63`. No AAAA records were added, and no existing production, mail, or verification records were changed.

## HTTPS And Certbot

- Installed Ubuntu packages: `certbot` and `python3-certbot-nginx`.
- Certbot version: `2.9.0`.
- Separate ECDSA certificates were issued for the two test domains.
- Certificate expiry: 2026-10-13.
- HTTP redirects to HTTPS with status 301 on both test domains.
- Standard TLS verification succeeds; no insecure TLS bypass was used.
- `certbot.timer` is enabled and active.
- `certbot renew --dry-run` succeeded for both certificates.

## Nginx Configuration

### CMS

- Site: `/etc/nginx/sites-available/cms-aws.dualcorelink.com`.
- Root: `/srv/dualcorelink/wordpress/current`.
- PHP service: `php8.3-fpm`.
- WordPress directory routing and PHP handling are enabled.
- Upload body limit: 256 MB.
- Access to `.env`, `wp-config.php`, SQL files, archives, and hidden files is denied.
- PHP execution inside uploads is denied.
- Directory listing is disabled.
- Access and error logs are isolated for the test host.

### Frontend

- Site: `/etc/nginx/sites-available/aws.dualcorelink.com`.
- Root: `/srv/dualcorelink/frontend/current`.
- Directory-style Next.js static-export routes are supported.
- HTML has short/no-cache behavior and hashed assets have long-cache behavior.
- Exported 404 handling and gzip are enabled.
- No Node.js application server or reverse proxy is used.
- Access and error logs are isolated for the test host.

Both hosts return `X-Robots-Tag: noindex, nofollow, noarchive`. `nginx -t` passed after each configuration and release change.

## WordPress HTTPS Conversion

- WordPress `home` and `siteurl` were changed from the isolated HTTP test URL to `https://cms-aws.dualcorelink.com`.
- WP-CLI serialized search-replace dry run: 5 replacements.
- Actual serialized search-replace: 5 replacements.
- Residual dry run: 0 replacements, excluding GUID values.
- `FORCE_SSL_ADMIN` is enabled.
- `DISALLOW_FILE_EDIT` is enabled.
- `WP_DEBUG`, `WP_DEBUG_DISPLAY`, and `WP_DEBUG_LOG` are disabled.
- ACF and `smart-home-b2b-content-architecture` are active.

### Resolved Configuration Incident

An initial WP-CLI config insertion used an unsuitable custom anchor and malformed two adjacent configuration lines. A controlled repair restored those lines. A subsequent ownership mismatch on `wp-config.php` briefly caused CMS HTTP 500 responses and Nginx permission errors. Ownership was restored to `deploy:www-data` with mode `0640`; PHP syntax validation passed, REST returned HTTP 200, and no matching FastCGI/permission errors occurred after 18:47:49 Singapore time. No production domain or SiteGround system was involved.

## CMS REST QA

| Endpoint | Status | Total |
| --- | --- | ---: |
| REST root | 200 JSON | n/a |
| Products | 200 JSON | 36 |
| Solutions | 200 JSON | 6 |
| Regions | 200 JSON | 0 |
| Media | 200 JSON | 132 |
| Pages | 200 JSON | 1 |
| Posts | 200 JSON | 1 |
| Product categories | 200 JSON | 10 |
| FAQs | 200 JSON | 0 |
| Resources | 200 JSON | 0 |
| Downloads | 200 JSON | 0 |

The empty CPT endpoints remain valid REST routes. Frontend FAQ and Resource content is statically configured in the repository.

- REST root response was approximately 457 KB and about 2.0 seconds during the external sample.
- Representative endpoint requests completed in approximately 0.43-0.45 seconds externally.
- A server-local REST sample completed in approximately 0.09 seconds.
- Product ACF field sample: 10/10 present.
- Media URL sample: 10/10 HTTP 200.
- Product featured-media sample: 10/10 HTTP 200.
- Resolvable ACF image sample: 9/9 HTTP 200.
- Excluding GUID values, no localhost, `127.0.0.1`, old HTTP CMS URL, SiteGround, or staging host references were found.
- `/wp-admin/` redirects correctly to the HTTPS login flow.

## Frontend Build Environment

- Node.js: `v22.23.1`.
- npm: `10.9.8`.
- Repository path: `/srv/dualcorelink/frontend/repository`.
- Source branch: `main`.
- Source commit: `4ed5cb32bbc65ee25e0bb230fbdb1c9efaff5067`.
- Build environment file: `/srv/dualcorelink/frontend/shared/build.env`, owner `root:deploy`, mode `0640`.
- The build used the public AWS CMS REST root over HTTPS.
- The build environment did not reference SiteGround, localhost, `127.0.0.1:8080`, or a Cloudflare CMS fallback.

## Build Results

| Check | Result | Duration |
| --- | --- | ---: |
| `npm ci` | Passed | about 22.28 s |
| `npm run lint` | Passed | about 6.32 s |
| `npm run test:data` | Passed, 36/36 | about 7.42 s |
| `npm run build` | Passed | about 57.07 s |

- Static pages: 155.
- Products: 36.
- Resources: 14.
- Sitemap URLs: 75.
- Article JSON-LD: 14/14.
- Resource BreadcrumbList JSON-LD: 14/14.
- Product JSON-LD: 36/36.
- CMS request errors: 0.
- CMS retries observed during build: 0.
- URL-shaped localhost/loopback references: 0.
- SiteGround/staging references: 0.
- Empty `href="#"`: 0.
- Six catalog PDFs were present.

`npm ci` reported seven audit findings (1 low, 2 moderate, 4 high). No audit-fix command was run because dependency remediation was outside B4.

One literal `localhost` token exists inside standard Next.js/core-js URL parser code. It is not a URL, request target, page value, or generated content leak.

## Release

- Release path: `/srv/dualcorelink/frontend/releases/4ed5cb32bbc6-20260715-185332`.
- Current symlink: `/srv/dualcorelink/frontend/current` -> the release above.
- Previous placeholder release was retained.
- Exported `index.html`, `404.html`, sitemap, product and resource paths, assets, and `_redirects` were verified before switching.
- Nginx configuration passed and was reloaded after the atomic symlink switch.

## Test-Domain QA

The following classes of pages returned HTTP 200 over HTTPS:

- Root and `/en/`.
- Product listing and representative product detail.
- Solution listing and representative solution detail.
- Region listing and all five region pages.
- Resource listing and all 14 resource pages.
- FAQ, contact, and downloads.
- Sitemap and robots.txt.

The repository does not define `/en/inquiry/`, so that path returns 404 by design. The implemented inquiry workflow is `/en/contact/#get-a-quote`; Resource inquiry, contact, and WhatsApp links resolve through the existing workflow. No new route was invented in B4.

### Phase 2E Pages

The four Phase 2E pages returned HTTP 200 and passed checks for one H1, H2/H3 content, title, description, canonical, Open Graph, Twitter metadata, Article JSON-LD, BreadcrumbList JSON-LD, Recommended Products, Relevant Solutions, Continue Reading, inquiry CTA, contact, WhatsApp, product links, solution links, resource links, and images.

### Sitemap, Links, And Assets

- Sitemap: HTTP 200, 75 URLs.
- Test-host rendering of sitemap URLs: 75/75 HTTP 200.
- `X-Robots-Tag` on sitemap-rendered pages: 75/75.
- Canonicals: 75/75, intentionally pointing to the official production origin under the existing SEO architecture.
- Internal links checked: 135, failures 0.
- Images checked: 89, failures 0.
- PDFs checked: 6, failures 0.
- Empty `href="#"`: 0.
- Mixed-content references: 0.
- SiteGround, staging, pages.dev, localhost URL, loopback URL, and old HTTP CMS leaks: 0.

## Responsive QA

Headless Google Chrome `150.0.7871.114` tested five widths: 375, 390, 430, 768, and 1280 pixels.

- Phase 2E: 4 pages x 5 widths = 20/20 combinations accepted.
- Regression sample: 11 existing page types x 5 widths = 55/55 combinations accepted.
- Total responsive combinations: 75.
- Horizontal overflow: 0.
- Unique and visible H1: passed.
- Header, main content, footer, CTA, recommended modules, and contact form checks: passed.
- Empty hash links: 0.
- Console errors: 0.

The first diagnostic output treated offscreen lazy-loaded images and intentionally offset decorative elements as failures even though the document did not overflow. Independent HTTP checks confirmed 89/89 image URLs, and mobile/desktop screenshots confirmed correct rendering. These were classified as diagnostic false positives, not page regressions.

## Security Verification

- Public MariaDB 3306 exposure: none; MariaDB listens on `127.0.0.1:3306` only.
- UFW: active; incoming denied by default; only OpenSSH and Nginx Full are allowed.
- CMS `.env`, `wp-config.php`, SQL, archive, and uploads-PHP probes: HTTP 403.
- Frontend `.env`: HTTP 403.
- Frontend SQL probe and directory-index probe: HTTP 404.
- `wp-admin` uses HTTPS.
- Debug display is disabled.
- Nginx application errors after the resolved permission incident: 0.
- Failed system services: 0.

## Server Final State

- Nginx, MariaDB, PHP 8.3 FPM, and fail2ban: enabled and active.
- Failed services: 0.
- Memory: 3.7 GiB total, about 3.0 GiB available at final check.
- Swap: 2.0 GiB active.
- Root disk: 77 GB total, 68 GB available, 13% used.
- Listening public service ports: 22, 80, and 443.
- MariaDB: local-only `127.0.0.1:3306`.

## Rollback Verification

The frontend release switch was tested end to end:

1. Recorded current release `4ed5cb32bbc6-20260715-185332`.
2. Switched `current` to `b4-placeholder`.
3. Confirmed HTTP 301 and HTTPS 200, with the served body matching the placeholder release.
4. Switched `current` back to the B4 release.
5. Confirmed Nginx configuration and HTTPS `/en/` HTTP 200.

The selected B4 release is active after the test. Previous releases were not deleted.

## Representative Commands

```text
Resolve-DnsName aws.dualcorelink.com
Resolve-DnsName cms-aws.dualcorelink.com
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d <test-domain>
wp search-replace <old-test-url> <https-test-url> --all-tables-with-prefix --precise --recurse-objects --skip-columns=guid
npm ci
npm run lint
npm run test:data
npm run build
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

Sensitive values and credential-bearing commands are intentionally omitted.

## Not Performed

- No official production DNS switch.
- No Cloudflare Pages Production change or removal.
- No SiteGround shutdown, deletion, or content modification.
- No official WordPress content modification.
- No database table deletion, including legacy tables.
- No public MariaDB access or phpMyAdmin installation.
- No GitHub Runner installation or automated production deployment.
- No Phase 2E production acceptance report.
- No dependency audit fix.

## Risks And Observations

1. The test host is publicly reachable but protected from indexing by response headers. Keep the noindex header until the test domains are retired.
2. `/en/inquiry/` is not an implemented route; the current quote workflow is the contact anchor. A separate route should only be considered as a planned product change.
3. Public CMS REST root responses are materially larger and slower than server-local requests. Cache and endpoint-shaping work may be useful before automated external builds depend on this host at scale.
4. The seven npm audit findings require a separately scoped dependency review.
5. Keep the pre-B4 snapshot, B3 backups, placeholder release, and prior releases until the production cutover and rollback window are complete.
6. The transient WordPress configuration and permission issue was fully corrected and did not affect official production, but future config automation should avoid custom-anchor insertion and should preserve `deploy:www-data` ownership with mode `0640`.

## Result

Phase B4 passed for the isolated AWS test domains. The AWS CMS and static frontend are available through trusted HTTPS, frontend content was rebuilt from the AWS REST API, SEO/data baselines match the expected 155 pages and 75 sitemap URLs, responsive and security QA passed, and atomic rollback was demonstrated. Official production traffic remains unchanged.
