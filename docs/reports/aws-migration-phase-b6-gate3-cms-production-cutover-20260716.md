# AWS Migration Phase B6 Gate 3 - Production CMS Cutover

Date: 2026-07-16
Operator: Codex and the site owner, acting under the approved staged cutover authorization
Gate status: Passed

## Scope and safety boundary

Gate 3 moved only the official WordPress CMS hostname, `cms.dualcorelink.com`, from SiteGround to the AWS Lightsail production server at `52.74.68.63`. It enabled the reviewed production CMS Nginx virtual host, changed the AWS WordPress canonical URL, validated the public CMS and media, converted Certbot renewal from manual DNS-01 to webroot HTTP-01, removed the obsolete one-time ACME TXT record, and completed a 30-minute production observation window.

This gate did not modify `dualcorelink.com`, `www.dualcorelink.com`, the production frontend, Cloudflare Pages, email DNS records, MariaDB network exposure, SiteGround WordPress content, historical backups, staging, or the 15 legacy `ybj_` tables. The CMS content freeze that began in Gate 2 remains active.

## Preconditions and rollback points

- CMS freeze start: `2026-07-15T21:56:41+08:00`.
- Lightsail snapshot: `dualcorelink-pre-production-cutover-20260715`, status Available before the gate.
- Gate 2 final synchronized baseline: Products 36, Solutions 6, Media 132, Product categories 10.
- AWS WordPress release: `/srv/dualcorelink/wordpress/releases/20260715-b3` via `/srv/dualcorelink/wordpress/current`.
- AWS database: `dualcorelink_wp`, active prefix `wp_`.
- URL-switch rollback database: `/srv/dualcorelink/backups/b6/gate3-before-url-switch/aws-before-cms-url-switch.sql`.
- URL-switch rollback database size: 1,072,506 bytes.
- URL-switch rollback database SHA-256: `ff70069d223a53766bb40df669401fea1a54f6a6ce5a7a05d54d55bf7e8d1ac8`.
- Manual renewal-config backup: `/srv/dualcorelink/backups/b6/gate3-before-url-switch/cms.dualcorelink.com.renewal.manual.conf`.
- Manual renewal-config backup SHA-256: `dfe4424b0863088150961960af2d0cb21a160c331dc71cf3eb2a0b802cb57a57`.
- SiteGround and all A1/B2/B5/B6 backups were retained.

## Original DNS state

`cms.dualcorelink.com` remained a delegated child zone during the gate:

- `ns1.siteground.net`
- `ns2.siteground.net`

Before cutover, the child-zone apex resolved through the SiteGround CDN with a 30-second A-record TTL. The observed CDN address pool across the two authoritative servers included:

- `34.120.190.48`
- `34.149.120.3`
- `34.160.17.71`
- `34.160.81.203`
- `35.190.31.54`
- `35.227.194.51`
- `35.244.153.44`

No AAAA or CNAME existed for the child-zone apex. The existing SiteGround child-zone MX, SPF, DKIM, DMARC, mail host, staging, and service records were outside the authorized change scope and were not modified.

## Production Nginx and ACME webroot

AWS production configuration:

- Nginx site: `/etc/nginx/sites-available/cms.dualcorelink.com`.
- Enabled site: `/etc/nginx/sites-enabled/cms.dualcorelink.com`.
- WordPress root: `/srv/dualcorelink/wordpress/current`.
- PHP-FPM: PHP 8.3 Unix socket.
- ACME webroot: `/var/www/letsencrypt`.
- ACME challenge directory: `/var/www/letsencrypt/.well-known/acme-challenge`.
- ACME directories: `root:root`, mode `0755`.
- Nginx site file: `root:root`, mode `0644`.
- HTTP serves only the ACME path directly and redirects other requests to HTTPS.
- The configuration blocks downloads of `wp-config.php`, environment files, SQL/backups, hidden files, and PHP execution from uploads.
- No production noindex directive was added.
- The existing `cms-aws.dualcorelink.com` virtual host remained separate.

`nginx -t` passed before enablement, after reload, after DNS cutover, and during final verification.

Before DNS cutover, `curl --resolve` confirmed:

- ACME challenge path: HTTP 200 with the expected non-sensitive test body and no redirect.
- Other HTTP paths: HTTP 301 to HTTPS.
- HTTPS certificate validation: passed without `-k`.
- WordPress homepage: HTTP 200.
- REST root: HTTP 200 and valid JSON.
- Products / Solutions / Media / Categories: 36 / 6 / 132 / 10.
- `wp-admin`: HTTP 302 to the expected official CMS login URL after the WordPress URL change.
- No SiteGround, `sgcaptcha`, `cms-aws`, localhost, or 127.0.0.1 marker outside WordPress GUIDs.

Temporary ACME precheck files were deleted after validation.

## WordPress production URL change

A WP-CLI serialized-safe dry run replaced:

`https://cms-aws.dualcorelink.com`

with:

`https://cms.dualcorelink.com`

The dry run identified five replacements. The production operation made the same five replacements: two options, two post-content values, and one user URL. GUID columns were skipped. A second dry run found zero remaining non-GUID replacements.

Final WordPress state:

- `home`: `https://cms.dualcorelink.com`.
- `siteurl`: `https://cms.dualcorelink.com`.
- Active prefix: `wp_`.
- Products / Solutions / Media / Categories: 36 / 6 / 132 / 10.
- Product REST objects retained the `acf` field.

## DNS cutover

The site owner changed only the SiteGround child-zone apex A record for `cms.dualcorelink.com` to:

`52.74.68.63`

Final DNS results:

- `ns1.siteground.net`: `52.74.68.63`.
- `ns2.siteground.net`: `52.74.68.63`.
- Cloudflare public recursive DNS: `52.74.68.63`.
- Google public recursive DNS: `52.74.68.63`.
- No AAAA record was added.
- Delegation remained with the SiteGround child-zone nameservers.
- The authoritative A-record TTL became 86,400 seconds; Google reported 21,600 seconds during verification.

The higher final TTL is an operational observation: a future emergency DNS rollback may propagate more slowly than the original 30-second SiteGround CDN response.

No apex, `www`, MX, SPF, DKIM, DMARC, mail, staging, or unrelated DNS record was changed by this gate.

## Certificate and automatic renewal

The official certificate was initially issued only for `cms.dualcorelink.com` using manual DNS-01. It remains an ECDSA certificate with:

- Subject/SAN: `cms.dualcorelink.com` only.
- Valid from: `2026-07-15 15:09:36 UTC`.
- Valid until: `2026-10-13 15:09:35 UTC`.
- Full chain: `/etc/letsencrypt/live/cms.dualcorelink.com/fullchain.pem`.
- Private key: `/etc/letsencrypt/live/cms.dualcorelink.com/privkey.pem`.

After public DNS and HTTP challenge routing were confirmed, Certbot renewal was converted to:

- `authenticator = webroot`
- `pref_challs = http-01`
- `webroot_path = /var/www/letsencrypt`

The first reconfigure attempt retained the old DNS preference and failed safely with no renewal-file change. The retained backup and active file had identical SHA-256 values at that checkpoint. The corrected reconfigure completed successfully, and the Certbot log records that all simulated renewals succeeded during the subsequent dry run.

Final renewal state:

- `certbot.timer`: enabled and active.
- `nginx -t`: passed.
- Official certificate: valid and unchanged in domain scope.
- No wildcard, apex, or `www` certificate was requested.
- No private key, ACME account credential, DNS credential, or token was exposed or committed.

After webroot renewal and dry-run success were confirmed, the obsolete `_acme-challenge.cms.dualcorelink.com` TXT created for the one-time manual DNS-01 issuance was removed. The SiteGround DNS editor, both SiteGround authoritative nameservers, Cloudflare public recursive DNS, and Google public recursive DNS returned no remaining TXT answer. No other DNS record was deleted.

## Public CMS verification

Final public results:

- `https://cms.dualcorelink.com/`: HTTP 200, trusted certificate, AWS IP `52.74.68.63`.
- `https://cms.dualcorelink.com/wp-json/`: HTTP 200, WordPress REST JSON.
- `https://cms.dualcorelink.com/wp-admin/`: HTTP 302 to the official CMS login URL.
- Products: HTTP 200, `X-WP-Total: 36`.
- Solutions: HTTP 200, `X-WP-Total: 6`.
- Media: HTTP 200, `X-WP-Total: 132`.
- Product categories: HTTP 200, `X-WP-Total: 10`.
- Product JSON includes ACF.
- Sample media URL: HTTP 200, `image/png`, trusted certificate.
- SiteGround and `sgcaptcha` markers: 0.
- `cms-aws` markers: 0.
- Localhost/127.0.0.1 markers excluding WordPress GUID fields: 0.
- The expected historical 127.0.0.1 value remains only in skipped GUID fields.
- Temporary ACME test path after cleanup: HTTP 404, as expected.

## Thirty-minute production observation

Checks ran at 0, 5, 10, 15, 20, 25, and 30 minutes after public CMS cutover.

Every checkpoint reported:

- REST root: HTTP 200.
- `wp-admin`: HTTP 302 to the official login page.
- Representative media: HTTP 200.
- Nginx: active.
- PHP 8.3 FPM: active.
- MariaDB: active.

Final operational state:

- Production CMS Nginx error log: 0 lines.
- PHP-FPM log count: unchanged at 17 historical lines during the observation window.
- HTTP 5xx in the most recent 1,000 CMS access-log entries: 0.
- Failed systemd services: 0.
- MariaDB: local listener only at `127.0.0.1:3306`.
- Available memory: approximately 2.9 GiB.
- Swap: 2 GiB, approximately 49 MiB used.
- Root disk: 77 GiB total, approximately 61 GiB available, 21% used.
- No rollback was required.

## Rollback plan retained

If a CMS-only rollback becomes necessary:

1. Restore the SiteGround child-zone apex behavior using the recorded pre-cutover DNS/CDN state.
2. Reverse the serialized-safe WordPress URL change from the official CMS URL to `https://cms-aws.dualcorelink.com`, or import the retained pre-switch AWS database dump.
3. Keep the AWS WordPress release and all B6 backup artifacts unchanged for investigation.
4. Revalidate SiteGround REST, AWS test CMS, and 36/6/132/10 counts before changing any frontend traffic.

The final 86,400-second authoritative A-record TTL must be considered when estimating DNS rollback propagation.

## Not executed

- No change to `dualcorelink.com` or `www.dualcorelink.com`.
- No production frontend cutover.
- No Cloudflare Pages deletion or overwrite.
- No SiteGround cancellation, deletion, content edit, plugin update, or database import.
- No CMS freeze release.
- No MariaDB 3306 exposure.
- No email DNS modification.
- No staging deletion.
- No backup, snapshot, historical release, or legacy table deletion.
- No secret or backup artifact was added to Git.

## Gate decision

Gate 3 passed. The official CMS hostname resolves to AWS, the production Nginx and WordPress configuration are active, public CMS data and media meet the accepted baseline, automatic webroot renewal has passed its dry run, the obsolete manual DNS challenge record is removed, and the 30-minute observation completed without errors.

The CMS freeze remains active. Gate 4 may begin only under a separate explicit authorization for the production frontend rebuild and apex/`www` cutover.
