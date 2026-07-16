# AWS Migration Phase B6 - Production Cutover Acceptance

Date: 2026-07-16
Operator: Codex and the site owner under the approved staged cutover authorization
Final status: Passed

## Objective

Phase B6 moved the official DualCoreLink WordPress CMS and static frontend from the retained SiteGround and Cloudflare Pages paths to the AWS Lightsail production instance in Singapore. The work used gated synchronization, separate CMS and frontend cutovers, trusted HTTPS, atomic frontend releases, production QA, rollback checkpoints, and a final closure review.

No credential, private key, database password, runner token, ACME challenge value, or other secret is recorded in this report.

## Final production state

- AWS instance: `dualcorelink-production`, Singapore, static IPv4 `52.74.68.63`.
- Official frontend: `https://dualcorelink.com`.
- Official frontend redirect: `https://www.dualcorelink.com` to the apex.
- Official CMS: `https://cms.dualcorelink.com`.
- AWS is the only active production origin for the official frontend and CMS hostnames.
- AWS WordPress is the only authorized source for future production CMS edits.
- SiteGround and Cloudflare Pages remain retained, unchanged, as temporary rollback layers.

## Gate summary

### Gate 2 - Freeze and final synchronization

- CMS freeze started at `2026-07-15T21:56:41+08:00`.
- Final SiteGround SQL and uploads were captured in one freeze window.
- Local ignored backup: `backups/aws-wordpress-migration-b6-cutover-20260715-215641/`.
- AWS verified copy: `/srv/dualcorelink/backups/b6/`.
- SQL: 1,041,011 bytes, SHA-256 `48ff1fa562dcd32e25075e4b93aa0099f78c1b58bd1cbbfc230eef4a17bc3dce`.
- Uploads archive: 1,079,279,021 bytes, 1,022 files, SHA-256 `69fad7060d1b01ea2657fa9e05ae476e1dcafa9f3bffc2b42bc5d512d2f033c3`.
- Products / Solutions / Media / Product categories: 36 / 6 / 132 / 10.
- The only B5-to-B6 SQL difference was expected `wp_options` runtime state; business content and uploads were unchanged.
- AWS pre-sync rollback artifacts remain in `/srv/dualcorelink/backups/b6/aws-before-final-sync/`.
- The 15 legacy `ybj_` tables were retained and not modified.

### Gate 3 - Production CMS cutover

- AWS WordPress `home` and `siteurl` were changed with serialized-safe WP-CLI replacement to `https://cms.dualcorelink.com`.
- The production CMS Nginx virtual host uses `/srv/dualcorelink/wordpress/current`, PHP 8.3 FPM, and the dedicated ACME webroot `/var/www/letsencrypt`.
- The SiteGround-authoritative child-zone apex A record was changed to `52.74.68.63`; delegation to `ns1.siteground.net` and `ns2.siteground.net` was retained.
- Products / Solutions / Media / Product categories remained 36 / 6 / 132 / 10.
- The CMS certificate covers only `cms.dualcorelink.com`, is trusted, and is valid through `2026-10-13 15:09:35 UTC`.
- CMS renewal was converted from one-time manual DNS-01 to webroot HTTP-01 with `/var/www/letsencrypt`.
- CMS renewal dry-run passed and `certbot.timer` was enabled and active at the accepted Gate 3 checkpoint.
- A 30-minute CMS observation completed without rollback, sustained 5xx, or PHP fatal errors.

### Gate 4 - Production frontend cutover

- Accepted build source: `8d28e578acd5faa18c14f195a6d20a8cdd217c16`.
- Build data source: `https://cms.dualcorelink.com/wp-json`.
- Production release: `/srv/dualcorelink/frontend/releases/8d28e578acd5-production-20260716-031217`.
- `/srv/dualcorelink/frontend/current` was atomically switched to that release after validation.
- Previous releases and five total releases remained available after activation.
- The frontend certificate covers `dualcorelink.com` and `www.dualcorelink.com`, is trusted, and is valid through `2026-10-13 18:42:57 UTC`.
- Frontend renewal was converted to webroot HTTP-01 with `/var/www/dualcorelink`; renewal dry-run passed.
- Cloudflare DNS changed only the apex and `www` web records to the AWS path. No MX, SPF, DKIM, DMARC, CMS, or unrelated record was changed.
- A 30-minute frontend observation completed 7/7 checkpoints without rollback.

## DNS and rollback inventory

Original frontend rollback targets:

- Apex: proxied CNAME to `dualcorelink-web.pages.dev`, TTL Auto.
- `www`: proxied CNAME to `dualcorelink-web.pages.dev`, TTL Auto.

Final frontend DNS:

- Apex: CNAME to `aws.dualcorelink.com`, DNS only, TTL Auto; flattened public answer `52.74.68.63`.
- `www`: CNAME to `dualcorelink.com`, DNS only, TTL Auto; public answer `52.74.68.63`.
- No apex or `www` AAAA record was added.

Final CMS DNS:

- Child zone remains delegated to SiteGround nameservers.
- Child-zone apex A record points to `52.74.68.63`.
- No CMS AAAA record was added.

The Lightsail snapshots, B6 backups, SiteGround data, Cloudflare Pages project, test domains, historical AWS releases, and recorded original DNS values remain available for rollback.

## Automatic deployment behavior

Gate 4 report commit `ac60876dd48a7d18d4467e404fe0713645a25c3c` was pushed successfully before final closure.

That documentation-only push did not trigger a new AWS deployment. This is expected because `.github/workflows/aws-production-deploy.yml` excludes `docs/**` pushes. The most recent recorded workflow remains successful run `29420036446`, source `98ec80644b7a472756605ec796c64f7acc19e2a9`. No new release, symlink switch, or rollback occurred from the Gate 4 report push.

The active production release therefore remains the Gate 4 release built from source `8d28e578acd5faa18c14f195a6d20a8cdd217c16`.

## ACME closure

The final renewal paths do not depend on DNS TXT challenges:

- `cms.dualcorelink.com`: webroot HTTP-01, `/var/www/letsencrypt`, accepted dry-run passed.
- `dualcorelink.com` and `www.dualcorelink.com`: webroot HTTP-01, `/var/www/dualcorelink`, accepted dry-run passed.
- `aws.dualcorelink.com` and `cms-aws.dualcorelink.com`: separate test certificates retained; their B4 Certbot renewal dry-runs passed and they do not depend on the two production frontend manual challenge records.

The two obsolete one-time frontend DNS-01 records were removed under the narrow Gate 5 authorization:

- `_acme-challenge.dualcorelink.com`
- `_acme-challenge.www.dualcorelink.com`

The earlier CMS manual challenge record was already absent. Both Cloudflare authoritative nameservers confirmed the frontend records absent, and both SiteGround child-zone nameservers confirmed the CMS record absent. No Google/Bing verification, SPF, DKIM, DMARC, mail, or third-party TXT record was changed.

## Final production QA

Current public checks completed after ACME cleanup:

- `https://dualcorelink.com/`: HTTP 200, AWS Nginx, trusted TLS, no production `X-Robots-Tag: noindex`.
- HTTP apex: 301 to HTTPS.
- `https://www.dualcorelink.com/`: 301 to the HTTPS apex.
- `https://cms.dualcorelink.com/`: HTTP 200, AWS Nginx, trusted TLS.
- CMS HTTP: 301 to HTTPS.
- `/wp-admin/`: 302 to the official CMS login page.
- CMS REST: HTTP 200 JSON.
- Products / Solutions / Media / Product categories: 36 / 6 / 132 / 10.
- FAQ baseline: 30 static FAQ entries retained from the accepted build.
- Resources: 14.
- Sitemap: 75 URLs, 75/75 HTTP 200.
- Product detail pages: 36.
- Article JSON-LD: 14/14 Resource details.
- BreadcrumbList JSON-LD: 14/14 Resource details; 71 sitemap pages contain a breadcrumb structure overall.
- Product JSON-LD: 36/36.
- Empty `href="#"`: 0.
- Pages containing localhost, 127.0.0.1, SiteGround, `pages.dev`, `cms-aws`, or `aws.dualcorelink.com` leakage: 0.
- Unique internal targets: 135/135 HTTP 200.
- Unique rendered image URLs: 89/89 HTTP 200.
- Catalog PDFs: 6/6 HTTP 200, `application/pdf`, non-empty.
- WhatsApp and `/en/contact/#get-a-quote` links remain present.
- The four Phase 2E pages returned HTTP 200 with title, H1, canonical, description, Open Graph, Twitter metadata, Article JSON-LD, and BreadcrumbList JSON-LD.
- Gate 4 responsive QA remains accepted at 60/60, including Phase 2E at 20/20; no page content or release changed after that run.
- Test frontend and CMS hostnames retain noindex headers.

Trusted certificate checks after cleanup:

- `dualcorelink.com` and `www.dualcorelink.com`: trusted, SANs correct, expiry `2026-10-13 18:42:57 UTC`.
- `cms.dualcorelink.com`: trusted, SAN correct, expiry `2026-10-13 15:09:35 UTC`.
- `aws.dualcorelink.com` and `cms-aws.dualcorelink.com`: trusted test certificates retained through `2026-10-13`.

## Security and operations

Current external security probes returned:

- `wp-config.php`: HTTP 403.
- `.env`: HTTP 403.
- representative SQL and backups paths: HTTP 403.
- PHP under uploads: HTTP 403.
- Public TCP 3306: unreachable.

The Lightsail console showed the instance Running. Nginx, PHP 8.3 FPM, MariaDB, Fail2ban, the repository-level runner, Certbot timer, local-only MariaDB listener, UFW rules, zero failed services, and stable memory/disk state were accepted in Gates 3 and 4. No server configuration or release changed between those accepted checkpoints and this closure; current public frontend, REST, media, WordPress login routing, and database-backed counts also passed.

## CMS freeze release

- Freeze start: `2026-07-15T21:56:41+08:00`.
- Freeze end: `2026-07-16T13:41:38+08:00`.
- Operator: Codex and the site owner.
- Result: released after Gate 4 report synchronization, ACME cleanup, public production QA, security probes, rollback retention, and final Git verification passed.

From this point onward:

- Production content may be edited only in AWS WordPress at `https://cms.dualcorelink.com/wp-admin/`.
- SiteGround WordPress must not be edited; it is a retained rollback copy only.
- New CMS content reaches the static frontend through the GitHub/AWS build workflow.

## Observation plan

For the next 24 hours, monitor frontend availability, CMS REST and wp-admin, forms/contact paths, Nginx/PHP logs, memory, disk, runner state, Certbot timer, and snapshot status.

For 7-14 days, retain SiteGround hosting and data, Cloudflare Pages, original DNS inventory, B6 backups, AWS snapshots, test domains, and historical releases. Do not cancel or delete either rollback platform until the observation period is complete and a separate approval is given.

## Risks and observations

- The CMS child-zone A record has a higher TTL than the original SiteGround CDN response, so a CMS-only DNS rollback may propagate more slowly.
- The mobile header retains its accepted internal horizontal navigation row; document-level overflow is zero.
- Seven npm audit findings were observed during Gate 4. No dependency or audit-fix command was used during cutover.
- Server-side service state in this closure is anchored to the accepted Gate 3/4 checks plus current public and Lightsail Running-state evidence; no post-Gate configuration change occurred.

## Final decision

AWS Migration Phase B6 passed and is closed. The official CMS and frontend run on AWS, automatic certificate renewal paths are independent of DNS TXT challenges, obsolete ACME TXT records are removed, accepted content and SEO baselines are intact, rollback systems remain available, and the CMS freeze is released.
