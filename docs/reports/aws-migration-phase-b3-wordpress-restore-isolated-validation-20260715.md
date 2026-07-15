# AWS Migration Phase B3 - WordPress Restore and Isolated Validation

Date: 2026-07-15

## Objective

Restore the verified Phase B2 WordPress database and media package to the AWS Lightsail instance, validate the restored CMS through an isolated test host, and prove that the existing frontend can build against the AWS data source without changing production DNS, Cloudflare production, or the SiteGround source CMS.

## Scope and Isolation

- Instance: `dualcorelink-production`
- Region: Singapore
- Static IPv4: `52.74.68.63`
- Test WordPress URL: `http://cms-aws.dualcorelink.com`
- Test access method: explicit `Host` header, `curl --resolve`, and a temporary localhost-only build proxy
- DNS created or changed: no
- Cloudflare changed or deployed: no
- SiteGround WordPress content changed: no
- SiteGround stopped or removed: no
- Production traffic switched: no

The test hostname has no public DNS record. Nginx responds to that exact Host while the existing default Nginx site remains enabled.

## Restore Snapshot

The user confirmed that the required Lightsail snapshot was created before restoration:

- Snapshot: `dualcorelink-pre-wordpress-restore-20260715`
- Snapshot timing: before any B3 upload, database import, or WordPress configuration
- Restore action performed: no

Snapshot existence was user-confirmed. It was not independently queried through AWS CLI because no AWS CLI profile was configured locally.

## Restore Packages

The Phase B2 artifacts were uploaded to the private AWS directory:

`/srv/dualcorelink/backups/b3/`

Directory owner is `deploy`; inherited mode is `2750`. Uploaded restore files use mode `0600`.

### Database and uploads

| Artifact | Size in B2 package | SHA-256 | AWS verification |
| --- | ---: | --- | --- |
| `wordpress-database-20260715.sql` | 1,073,615 bytes | `b88296c3b1158c3d50fda5b3fea10a9a7e7d04ee59b3c36e16e58f271596f440` | Passed |
| `wordpress-uploads-20260715.tar.gz` | 1,079,279,021 bytes | `69fad7060d1b01ea2657fa9e05ae476e1dcafa9f3bffc2b42bc5d512d2f033c3` | Passed |

The uploads archive was tested with `tar -tzf` before extraction.

### Plugins and theme

The B2 package contained the uploads archive but not complete plugin and theme directories. Exact active components were copied read-only from the SiteGround source into a non-public migration directory, packaged, hashed, downloaded locally, and uploaded to AWS.

| Component | Version | Source | AWS package SHA-256 |
| --- | --- | --- | --- |
| Advanced Custom Fields | 6.8.5 | SiteGround active plugin directory | `2877ef8d7d7e2c2b89df93217e6ed379ed107a6f5f5890777c7c4fb94ab808ac` |
| Smart Home B2B Content Architecture | 1.0.0 | SiteGround custom plugin directory | `b942d1d2c8671ee62e18d4cb3cf2a2b7a4430dcb7706acda74376689fc35331c` |
| Twenty Twenty-Five | 1.5 | SiteGround active theme directory | `a316b4a252398cd7fa01a0798908a5726c57e4c78854ed7d562e525059750e23` |

Local package verification passed 3/3. AWS package verification and archive readability passed. A final recursive file comparison between the source packages and deployed component directories also passed.

## WordPress Core and WP-CLI

- WordPress Core: `7.0.1`
- Core source: official `https://wordpress.org/wordpress-7.0.1.tar.gz`
- Core package SHA-256: `dc10592da9b580c7525632850e0cced371b13081853ac29afe93b5d5bb00db98`
- WP-CLI: `2.12.0`
- WP-CLI source: official WP-CLI build repository over HTTPS
- WP-CLI package SHA-256: `ce34ddd838f7351d6759068d09793f26755463b4a4610a5a5c0a97b68220d85c`
- `wp core verify-checksums`: passed
- `wp plugin verify-checksums advanced-custom-fields`: passed

Release layout:

- Release: `/srv/dualcorelink/wordpress/releases/20260715-b3`
- Current symlink: `/srv/dualcorelink/wordpress/current`
- Current target: `/srv/dualcorelink/wordpress/releases/20260715-b3`

## File Restore

Restored:

- `wp-content/uploads`
- Advanced Custom Fields 6.8.5
- Smart Home B2B Content Architecture 1.0.0
- Twenty Twenty-Five 1.5

Results:

- Restored uploads files: 1,021
- Nested `uploads/uploads`: absent
- SiteGround uploads `.htaccess` in the Nginx Web root: absent
- SiteGround `.htaccess` quarantined under the private B3 backup directory: present
- Release ownership: `deploy:www-data`
- Directories: `0755`
- Files: `0644`
- `www-data`: read access
- `deploy`: maintenance ownership

The Apache/SiteGround `.htaccess` file was not used as Nginx configuration.

## Database Import

Target database preparation checks:

- Database host: localhost-only
- Table count before first import: 0
- Original SQL checksum: matched B2 manifest
- Original SQL retained unchanged: yes

### Compatibility observation

The original SiteGround export contains:

- 12 active `wp_` tables
- 15 legacy `ybj_` tables
- 27 tables in total
- One MySQL 8-only collation declaration: `utf8mb4_0900_ai_ci`

The first import stopped at that unsupported collation after creating 18 tables. No source or production database was affected.

The isolated AWS target database was then reset and re-imported from a separate compatibility copy. The original SQL remained unchanged. The compatibility copy changed only the single table-level collation declaration:

`utf8mb4_0900_ai_ci` to `utf8mb4_unicode_ci`

- Compatibility replacements: 1
- Remaining incompatible declarations: 0
- Compatibility SQL SHA-256: `c778eb6d364ab28e5185d8df1e69bd9f00e7affe6181ddc842c96c41e481b3ec`
- Final table count: 27
- Active WordPress prefix: `wp_`
- Database charset: `utf8mb4`
- Database collation: `utf8mb4_unicode_ci`

Verified key tables:

- `wp_options`
- `wp_posts`
- `wp_postmeta`
- `wp_terms`
- `wp_term_taxonomy`
- `wp_term_relationships`
- `wp_users`
- `wp_usermeta`

## wp-config.php

An AWS-specific `wp-config.php` was generated server-side from the existing B2 secrets file without printing or downloading secret values.

- Database host: `localhost`
- Table prefix: `wp_`
- File owner/group: `deploy:www-data`
- File mode: `0640`
- `DISALLOW_FILE_EDIT`: enabled
- `WP_DEBUG`: false
- `WP_DEBUG_DISPLAY`: false
- `WP_DEBUG_LOG`: false
- Salts: newly generated on the server and not recorded
- Configuration syntax: passed

No database password, salts, private key, or complete configuration file is included in this report or Git.

## Serialized-Safe URL Replacement

WP-CLI `search-replace` was used with object recursion, precise mode, and the `guid` column excluded.

Source URL:

`https://cms.dualcorelink.com`

Isolated target URL:

`http://cms-aws.dualcorelink.com`

Results:

- Dry-run replacements: 5
- Applied replacements: 5
- Residual dry-run replacements: 0
- `home`: test hostname
- `siteurl`: test hostname

Additional dry-run probes excluding `guid` returned zero matches for:

- Old live CMS URL
- Staging hostname
- `127.0.0.1`
- `localhost`
- SiteGround hostname

## Isolated Nginx Configuration

An isolated HTTP server block was added for `cms-aws.dualcorelink.com`.

- Root: `/srv/dualcorelink/wordpress/current`
- PHP: Unix socket `/run/php/php8.3-fpm.sock`
- WordPress routing: `try_files` fallback to `index.php`
- `wp-config.php`: explicitly denied
- Dotfiles: denied
- Existing default site: retained and still enabled
- Production certificate requested: no
- `nginx -t`: passed
- Nginx reload: passed

Local server checks:

- Test root: HTTP 200
- REST root: HTTP 200
- Default Nginx root: HTTP 200

External checks using `curl --resolve`:

| URL | HTTP | Content type |
| --- | ---: | --- |
| Test root | 200 | `text/html; charset=UTF-8` |
| Test REST root | 200 | `application/json; charset=UTF-8` |
| Products sample | 200 | `application/json; charset=UTF-8` |
| `wp-admin` | 302 | Login redirect |

No DNS record was added for the test hostname.

## WordPress Content Validation

| Content | Result |
| --- | ---: |
| Published products | 36 |
| Published solutions | 6 |
| Media attachments | 132 |
| Product categories | 10 |
| Published pages | 1 |
| Published posts | 1 |
| WordPress FAQ CPT | 0 |
| WordPress Resource CPT | 0 |
| WordPress Region CPT | 0 |
| WordPress Download CPT | 0 |

The FAQ count of 30 and Resource count of 14 are frontend repository content, not WordPress CPT rows. They were verified by data tests and the isolated frontend build.

Active runtime components:

- Advanced Custom Fields 6.8.5: active
- Smart Home B2B Content Architecture 1.0.0: active
- Twenty Twenty-Five 1.5: active
- Product JSON contains `acf`: yes
- Product responses contain `_embedded` data when requested: yes

## REST API QA

All tested endpoints returned HTTP 200, JSON content, and parseable bodies.

| Endpoint | Total | TTFB | Total time | Response size |
| --- | ---: | ---: | ---: | ---: |
| REST root | n/a | 0.043 s | 0.050 s | 457,048 bytes |
| Products with `_embed` | 36 | 0.855 s | 0.857 s | 715,035 bytes |
| Solutions with `_embed` | 6 | 0.259 s | 0.260 s | 261,667 bytes |
| Regions | 0 | 0.033 s | 0.034 s | 2 bytes |
| Media, first 100 | 132 | 0.304 s | 0.305 s | 544,834 bytes |
| Pages | 1 | 0.052 s | 0.052 s | 4,950 bytes |
| Posts | 1 | 0.037 s | 0.037 s | 2,006 bytes |
| Product categories | 10 | 0.044 s | 0.044 s | 9,134 bytes |
| FAQs | 0 | 0.034 s | 0.034 s | 2 bytes |
| Resources | 0 | 0.034 s | 0.034 s | 2 bytes |
| Downloads | 0 | 0.034 s | 0.034 s | 2 bytes |

Not observed:

- `sgcaptcha`
- HTTP 202 HTML response
- Unexpected HTML from REST
- Runtime `AbortError`
- REST JSON parse error

## Image Validation

- Media `source_url` sample: 10/10 HTTP 200
- Product image URL sample: 10/10 HTTP 200
- Product featured media sample: 10/10 HTTP 200
- ACF image fields are media IDs
- Resolved ACF media ID sample: 10/10 HTTP 200
- Available ACF image IDs in the ten-product sample: 27
- Broken sampled image URLs: 0

## PHP and Leakage Checks

- Homepage PHP warning/fatal markers: 0
- Nginx test-site warning/error lines: 0
- PHP-FPM warning/error lines during QA: 0
- Old live CMS URLs in generated homepage: 0
- Staging URLs: 0
- Localhost/loopback URLs: 0
- SiteGround hostname leakage: 0
- HTTP 500 responses: 0

The isolated CMS is intentionally HTTP-only and generates HTTP test-host media URLs. It was not deployed to an HTTPS frontend, so no mixed-content production regression was introduced. Production migration must use the final HTTPS CMS URL and rerun the URL replacement and frontend build.

## Isolated Frontend Build

The frontend was not deployed. A temporary proxy bound only to `127.0.0.1:18080` forwarded GET/HEAD requests to AWS while preserving `Host: cms-aws.dualcorelink.com`. The proxy was stopped after testing; no listener remained.

Commands and results:

- `npm.cmd run lint`: passed
- Initial `npm.cmd run test:data` without the test environment: 32/36, with four expected failures caused by fallback to inactive local `127.0.0.1:8080`
- `npm.cmd run test:data` with the AWS test source: 36/36 passed
- `npm.cmd run build` with the AWS test source: passed
- Collecting page data: passed
- Static generation: 155/155
- Export cleanup: passed

Static export QA:

| Check | Result |
| --- | ---: |
| Resources | 14 |
| Products | 36 |
| Sitemap URLs | 75 |
| Resource Article JSON-LD | 14/14 |
| Resource BreadcrumbList | 14/14 |
| Product JSON-LD | 36/36 |
| Product BreadcrumbList | 36/36 |
| Static FAQ source | 30 questions |
| Empty `href="#"` | 0 |
| Localhost/loopback leaks | 0 |
| Staging leaks | 0 |
| SiteGround host leaks | 0 |
| Old live CMS URL leaks | 0 |
| Rendered `AbortError` | 0 |
| Rendered `sgcaptcha` | 0 |

The isolated export contains 684 references to the intentional HTTP AWS test hostname for CMS media. The export was not deployed. These references must become the final HTTPS CMS hostname in the production migration build.

## Security Verification

- Nginx: active
- MariaDB: active
- PHP 8.3 FPM: active
- fail2ban: active
- Failed systemd units: 0
- MariaDB listener: `127.0.0.1:3306` only
- Public port 3306: not open
- UFW: active
- Allowed inbound services: OpenSSH and Nginx Full only
- Disk remaining: approximately 70 GB
- WordPress release size: approximately 1.2 GB
- B3 private backup size: approximately 1.1 GB

## Source and Production Safety Check

After B3 validation:

- SiteGround REST root: HTTP 200
- SiteGround products endpoint: HTTP 200
- Cloudflare frontend `/en/`: HTTP 200
- Cloudflare production sitemap: HTTP 200
- Cloudflare production sitemap currently observed: 71 URLs
- B3 isolated build sitemap: 75 URLs

The existing production sitemap count of 71 was not changed by B3. The four-URL difference is a pre-existing production deployment observation and must be resolved in the later production migration/deployment phase, not by deploying the HTTP test build.

## Rollback Readiness

Rollback paths were verified but not executed.

### Full instance rollback

1. Stop any migration activity.
2. Confirm the snapshot target and creation time.
3. Restore or create a replacement instance from `dualcorelink-pre-wordpress-restore-20260715`.
4. Reattach the static IP only under a separately approved traffic-change phase.
5. Verify SSH, UFW, Nginx, MariaDB, PHP-FPM, fail2ban, and default HTTP page.

### Database-only reset

1. Confirm the database name is exactly the isolated AWS WordPress database.
2. Drop and recreate only that database through the local MariaDB socket.
3. Keep the localhost-only application user and grants.
4. Re-import the verified MariaDB compatibility SQL.
5. Re-run key table, prefix, charset, count, and URL checks.

### WordPress file rollback

1. Preserve the B3 release for diagnosis.
2. Point `/srv/dualcorelink/wordpress/current` to a known-good release or remove the isolated test link after approval.
3. Keep the B2 SQL/uploads and component packages intact.
4. Verify file ownership, permissions, and Core checksums.

### Nginx rollback

1. Disable only `/etc/nginx/sites-enabled/cms-aws.dualcorelink.com`.
2. Run `nginx -t`.
3. Reload Nginx.
4. Confirm the existing default placeholder remains HTTP 200.

No rollback was required.

## Not Performed

- No production DNS modification
- No Cloudflare setting or deployment modification
- No SiteGround WordPress content modification
- No SiteGround shutdown or deletion
- No production domain activation on AWS
- No TLS certificate request for the test hostname
- No MariaDB public listener
- No public port 3306 rule
- No phpMyAdmin installation
- No WordPress content edit or publish action
- No production frontend deployment
- No Phase 2E acceptance report
- No original backup deletion
- No secret or private key committed to Git

## Risks and Observations

1. The snapshot was confirmed by the user rather than independently queried through an AWS API.
2. The source SQL includes 15 legacy `ybj_` tables in addition to the active 12 `wp_` tables. They are imported for completeness but are inactive because WordPress uses the `wp_` prefix.
3. One MySQL 8 collation required a documented MariaDB-compatible replacement in a separate SQL copy.
4. The isolated hostname is HTTP-only and has no DNS. It is suitable for restore/build validation but not production.
5. The isolated static export contains the intentional HTTP test media hostname and must never be deployed as production output.
6. Cloudflare production currently exposes 71 sitemap URLs while the validated repository build produces 75. This remains a later deployment concern.
7. The first data test run used the inactive localhost fallback because the test environment variable had not yet been supplied. The controlled rerun against AWS passed 36/36.

## Result

Phase B3 restore and isolated validation passed. WordPress 7.0.1, the verified database, uploads, ACF, the custom content plugin, and the active theme are restored on AWS. CMS and REST counts match the expected WordPress source data, image and ACF samples are accessible, and the frontend completes a 155-page build with 75 sitemap URLs and full schema coverage. Production DNS, Cloudflare production, and the SiteGround CMS remain unchanged.
