# AWS Migration Phase B6 Gate 2 - CMS Freeze and Final Synchronization

Date: 2026-07-15
Operator: Codex, acting under the site owner's explicit cutover authorization
Gate status: Passed

## Scope and safety boundary

Gate 2 froze the SiteGround CMS content source, captured a final consistent database and uploads backup, verified the artifacts at SiteGround, locally, and on AWS, synchronized the AWS test CMS, and ran isolated CMS and frontend validation.

This gate did not modify official DNS, issue or replace official certificates, enable official Nginx virtual hosts, deploy a frontend release, change the production frontend symlink, or switch production traffic. The AWS WordPress `home` and `siteurl` remain `https://cms-aws.dualcorelink.com`.

## CMS freeze

- Freeze start (Asia/Shanghai / Asia/Singapore): `2026-07-15T21:56:41+08:00`.
- Freeze start (UTC): `2026-07-15T13:56:41Z`.
- Source: SiteGround `https://cms.dualcorelink.com`.
- Products: 36.
- Solutions: 6.
- Media attachments: 132.
- Product categories: 10.
- Active `wp_` tables: 12.
- Latest published product modification remained `2026-06-21 13:37:26 GMT` before and after the final backup.
- A post-backup read-only source check confirmed the same 36/6/132/10 counts. No freeze-window business content change was detected.

During the freeze, no product, solution, resource, FAQ, page, media, slug, taxonomy, ACF, plugin, theme, WordPress core, PHP, cache, CDN, or SiteGround security setting was changed.

## B6 final backup

Backup window:

- Started: `2026-07-15T14:00:47Z`.
- Completed: `2026-07-15T14:01:27Z`.

Locations:

- Local ignored backup: `backups/aws-wordpress-migration-b6-cutover-20260715-215641/`.
- SiteGround private backup: `/home/u3028-rfjko5nvtaxc/private-migration/aws-wordpress-migration-b6-cutover-20260715-215641/`.
- AWS verified copy: `/srv/dualcorelink/backups/b6/`.

Artifacts:

| Artifact | Size (bytes) | SHA-256 |
| --- | ---: | --- |
| `wordpress-database-b6-final.sql` | 1,041,011 | `48ff1fa562dcd32e25075e4b93aa0099f78c1b58bd1cbbfc230eef4a17bc3dce` |
| `wordpress-uploads-b6-final.tar.gz` | 1,079,279,021 | `69fad7060d1b01ea2657fa9e05ae476e1dcafa9f3bffc2b42bc5d512d2f033c3` |
| `wordpress-plugins-b6-final.txt` | 259 | `7d77cffa9d1af2bc1ca27fb52c1990ccdd09ea64c1cab4e01a248bdb675512af` |
| `wordpress-themes-b6-final.txt` | 131 | `7450c6e51c3f561eca2b4a3b12d7cbeaf630efa469f7b6fb81c6a00f8c72f6a1` |
| `wordpress-environment-b6-final.txt` | 682 | `73574bb2d2ceb7c6467c01f5a8343d7976b657cc5d90893ca6027f50bb2c68c4` |
| `manifest.md` | 719 | `1926c9f6be4491cf502be2231e8d3a745065fbd10fc512e98943a768e3c5bda1` |

Validation results:

- SiteGround `sha256sum -c`: 6/6 passed.
- Local SHA-256 values matched SiteGround.
- AWS `sha256sum -c`: 6/6 passed.
- The uploads archive was readable and contained 1,027 tar entries: 1,022 files and 5 directories.
- Uncompressed uploads size: 1,097,078,227 bytes.
- The SQL was non-empty and contained the active `wp_` tables.
- Previous A1, B2, and B5 backups were retained.
- The `backups/` directory remains Git-ignored; no backup artifact is tracked.

## B5 to B6 comparison

| Check | B5 | B6 | Result |
| --- | --- | --- | --- |
| SQL size | 1,041,011 bytes | 1,041,011 bytes | Same size |
| SQL SHA-256 | `43fcd6864f93b044289f06d704b5350065370b899c70f4bb8d813d193b23d075` | `48ff1fa562dcd32e25075e4b93aa0099f78c1b58bd1cbbfc230eef4a17bc3dce` | Expected runtime-only difference |
| Uploads size | 1,079,279,021 bytes | 1,079,279,021 bytes | Identical |
| Uploads SHA-256 | `69fad7060d1b01ea2657fa9e05ae476e1dcafa9f3bffc2b42bc5d512d2f033c3` | Same | Identical |
| Uploads files | 1,022 | 1,022 | Identical |
| Products / Solutions / Media / Categories | 36 / 6 / 132 / 10 | 36 / 6 / 132 / 10 | Identical |
| Active tables | 12 | 12 | Identical |

The SQL comparison found 27 table sections in both dumps. Only `wp_options` changed: cron/update transients, the options auto-increment value, and dump completion metadata. The diff contained three inserted and three removed lines. No business content table changed, and no unexpected deletion or count decrease occurred. The 15 legacy `ybj_` tables remain present and were not deleted.

## AWS upload and rollback checkpoint

- AWS backup directory permissions: `deploy:www-data`, mode `0750`.
- B6 artifact permissions: `deploy:deploy`, mode `0640`.
- The existing AWS B3 uploads archive had the exact B6 SHA-256 and was copied server-side into the B6 directory, avoiding an unnecessary 1.08 GB network transfer.
- All B6 artifacts were then verified from the AWS copy.

Pre-sync rollback path:

`/srv/dualcorelink/backups/b6/aws-before-final-sync/`

Rollback artifacts:

- Database dump: 1,038,810 bytes, SHA-256 `93654b1e19290a22bd56ad342482928e7b1293f0e505199a8cce6d3b71da7fa0`.
- Uploads manifest: 88,820 bytes, 1,021 files, SHA-256 `0bfa61522e3e193b3dc2de75f19ec32e2573b38467ca638f9a5b91b638ecee86`.
- State record SHA-256: `244d3631e443dd7d4e8acc46408ec72ebdceda0374a10b0343c56a2792199a30`.
- Recorded WordPress release: `/srv/dualcorelink/wordpress/releases/20260715-b3`.
- Recorded test URL, active prefix, content counts, and plugin states matched the accepted B3 baseline.

## Database synchronization

- The original B6 SQL remained unchanged.
- One occurrence of the MySQL 8-only collation `utf8mb4_0900_ai_ci` was replaced with `utf8mb4_unicode_ci` in a separate MariaDB compatibility copy only.
- Compatibility-copy SHA-256: `831ee95a34c1e0b3375444bacbb48632944661173bfcef6a29bdf432d39e2bd8`.
- Import completed successfully; automatic rollback to the pre-sync dump was armed for import or validation failure and was not needed.
- Serialized-safe WP-CLI replacement changed five active-table values from the official CMS URL to `https://cms-aws.dualcorelink.com`: two `wp_options`, two `wp_posts`, and one `wp_users` value. GUID columns were skipped.
- A second dry run found zero remaining non-GUID replacements in the active tables.
- Active prefix: `wp_`.
- Active tables: 12.
- Total tables: 27, including the retained 15 legacy `ybj_` tables.
- `wp db check`: 27/27 tables OK.
- Products / Solutions / Media / Categories: 36 / 6 / 132 / 10.
- ACF and `smart-home-b2b-content-architecture` remained active.

## Uploads synchronization

- The B6 archive was extracted to a non-public B6 staging directory.
- Tar paths were checked before extraction; no absolute path, parent traversal, or nested `uploads/uploads` structure was present.
- Rsync ran without `--delete` and excluded `.htaccess`.
- Initial dry-run entries were 1,021 file and 5 directory group-metadata differences only; there were no content create, modify, or delete differences.
- Source and destination relative-path SHA-256 manifests each contained 1,021 web files and had a zero-line diff.
- The one SiteGround `.htaccess` file remained excluded.
- PHP/PHTML files in AWS uploads: 0.
- Final AWS uploads: 1,021 files, 1,097,077,978 bytes.
- Final owner/group: `deploy:www-data`.
- Directory mode: `0755`; file mode: `0644`; `www-data` read test passed.
- Nginx includes a dedicated `wp-content/uploads/*.php` deny rule.

## AWS CMS validation

- `https://cms-aws.dualcorelink.com/wp-json/`: HTTP 200 and valid WordPress REST JSON.
- Products endpoint: HTTP 200, `X-WP-Total: 36`, array length 36.
- Solutions endpoint: HTTP 200, `X-WP-Total: 6`, array length 6.
- Media endpoint: HTTP 200, `X-WP-Total: 132`.
- Product objects containing `acf`: 36/36.
- Ten media `source_url` samples: 10/10 HTTP 200.
- Ten product featured-media samples: 10/10 HTTP 200.
- Non-GUID SiteGround CMS URL markers in sampled product JSON: 0.
- Non-GUID localhost/127.0.0.1 markers in sampled product JSON: 0.
- SiteGround anti-bot/`sgcaptcha` markers in REST responses and CMS logs: 0.
- `/wp-admin/`: HTTP 302 to the expected test-domain WordPress login URL.
- WordPress `home` and `siteurl`: `https://cms-aws.dualcorelink.com`.

Server checks:

- Requests after the synchronization checkpoint: 282.
- HTTP 500 after synchronization: 0.
- PHP warning/notice/deprecation after synchronization: 0.
- PHP fatal/parse errors after synchronization: 0.
- Nginx upstream timeout/connection 5xx markers after synchronization: 0.
- Failed systemd services: 0.
- MariaDB listeners: one local listener at `127.0.0.1:3306`; non-local listeners: 0.
- Public TCP 3306 connection test: unreachable, as required.
- UFW: active; default deny incoming; only OpenSSH 22 and Nginx 80/443 allowed.
- Available memory: approximately 2.9 GiB; swap: 2 GiB; root disk available: approximately 61 GiB.

The current log files retain historical B3 setup errors from before this gate. These were separated from the synchronization window and are not evidence of a current failure.

## Isolated frontend build

Temporary build source:

`WORDPRESS_REST_ROOT=https://cms-aws.dualcorelink.com/wp-json`

No frontend release was deployed. `npm ci` was not required because the repository dependency tree was already present and all current QA commands completed successfully.

- `npm.cmd run lint`: passed.
- `npm.cmd run test:data`: passed, 36/36.
- `npm.cmd run build`: passed.
- Static generation: 155/155 pages.
- Products: 36.
- Resources: 14.
- Sitemap URLs: 75.
- Article JSON-LD: 14/14.
- BreadcrumbList JSON-LD: 14/14.
- Product JSON-LD: 36/36.
- Localhost/127.0.0.1 output references: 0.
- SiteGround/staging output references: 0.
- Cloudflare Pages output references: 0.
- HTTP CMS and mixed-content asset attributes: 0.
- Empty `href="#"`: 0.

The Linux `VALIDATE_ONLY` wrapper could not run locally because the available WSL distribution does not include Bash. The same release-gate counts and forbidden-reference checks were executed directly against `out/` in PowerShell and passed. No dependency was installed to work around this local tooling limitation.

## Rollback points

If the synchronized AWS CMS fails before Gate 3:

1. Import `/srv/dualcorelink/backups/b6/aws-before-final-sync/aws-before-final-sync.sql` from the existing AWS WordPress root.
2. Compare or restore uploads using the retained pre-sync manifest and the unchanged B3/B6 archive.
3. Keep `/srv/dualcorelink/wordpress/current` at `/srv/dualcorelink/wordpress/releases/20260715-b3`.
4. Revalidate the test CMS URL and accepted 36/6/132/10 baseline.

The Lightsail pre-cutover snapshot `dualcorelink-pre-production-cutover-20260715`, previous local/SiteGround backups, B3 WordPress release, frontend releases, and SiteGround source remain available.

## Not executed

- No official DNS record was changed.
- No official certificate was requested or installed.
- No official Nginx configuration was enabled or reloaded.
- No production traffic was switched.
- No new frontend release was deployed; `/srv/dualcorelink/frontend/current` remains `/srv/dualcorelink/frontend/releases/98ec80644b7a-20260715-214019`.
- No SiteGround content, PHP, cache, CDN, security, or hosting setting was modified.
- SiteGround was not stopped or deleted.
- No backup, secret, private key, password, token, or database credential was added to Git.
- No legacy `ybj_` table was deleted.

## Risks and observations

- The source SQL requires the documented one-value MariaDB collation compatibility transformation; the immutable original is retained.
- Historical CMS log errors from B3 setup remain in rotated/current logs, so future checks must continue to use a bounded time window.
- The CMS freeze must remain in force until Gate 3 completes or the operator explicitly aborts and unfreezes the source.
- Gate 3 must recheck SiteGround content timestamps and counts immediately before any official CMS URL, certificate, Nginx, or DNS change.

## Gate decision

Gate 2 passed. The AWS test CMS and isolated frontend build meet the accepted content, media, schema, and security baselines. The project may enter Gate 3 only under the existing staged cutover authorization, with the freeze maintained and all rollback points preserved.
