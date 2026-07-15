# AWS Migration Phase B2 - WordPress Migration Preparation

Date: 2026-07-15

## Objective

Prepare a verified migration package and an empty AWS target for moving the DualCoreLink public WordPress CMS from SiteGround to AWS Lightsail. This phase does not import production data, restore uploads, change DNS, or move production traffic.

## Source Identity

The source was verified through the authenticated SiteGround Site Tools dashboard and SSH before any backup work:

- Site: `cms.dualcorelink.com`
- SiteGround SSH host: `sgp58.siteground.asia`
- SiteGround SSH port: `18765`
- WordPress root: `$HOME/www/cms.dualcorelink.com/public_html`
- Site URL: `https://cms.dualcorelink.com`
- Home URL: `https://cms.dualcorelink.com`

No password, private key, cookie, salt, API key, or connection string is included in this report.

## SiteGround Environment Inventory

| Item | Result |
| --- | --- |
| WordPress | 7.0.1 |
| PHP | 8.2.32 |
| Database server | MySQL 8.4.6-6 |
| Active theme | Twenty Twenty-Five 1.5 |
| Table prefix | `wp_` |
| Database charset | `utf8` |
| Database collation | Default |
| Database size | 3,833,856 bytes |
| Uploads source size | 1,097,078,227 bytes |
| Uploads source files | 1,022 |
| `wp-content` size | 1,159,725,700 bytes |
| `upload_max_filesize` | 256M |
| `post_max_size` | 256M |
| `memory_limit` | 768M |
| `max_execution_time` | 0 |

SiteGround Dashboard reported approximately 4 GB of total site disk usage at the time of inventory.

### Plugins

Active plugins:

- Advanced Custom Fields 6.8.5
- Smart Home B2B Content Architecture 1.0.0

Installed but inactive SiteGround or starter plugins:

- SG AI Studio 1.2.6
- Security Optimizer 1.6.5
- WordPress Starter 3.4.5
- Speed Optimizer 7.8.0

Must-use plugins: none reported by WP-CLI.

### Content Baseline

- Published products: 36
- Published solutions: 6
- Media attachments: 132
- Published pages: 1
- Draft pages: 1
- Published posts: 1
- Latest non-revision post modification in UTC: `2026-06-21 13:37:26`
- Latest uploads content modification: `2026-06-21 21:05:48 +08`

No FAQ, Resource, Download, or Region posts were present in the WordPress database. The frontend Resource content remains repository-driven and was not represented as WordPress content in this source database.

## B2 Migration Backup

The source artifacts were created from the same maintenance window in a private SiteGround directory and downloaded to the Git-ignored local backup directory.

Remote source directory:

```text
$HOME/private-migration/aws-wordpress-migration-b2-20260715/
```

Local directory:

```text
backups/aws-wordpress-migration-b2-20260715/
```

Files:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `wordpress-database-20260715.sql` | 1,073,615 | `b88296c3b1158c3d50fda5b3fea10a9a7e7d04ee59b3c36e16e58f271596f440` |
| `wordpress-uploads-20260715.tar.gz` | 1,079,279,021 | `69fad7060d1b01ea2657fa9e05ae476e1dcafa9f3bffc2b42bc5d512d2f033c3` |
| `wordpress-plugins-20260715.txt` | 259 | `7d77cffa9d1af2bc1ca27fb52c1990ccdd09ea64c1cab4e01a248bdb675512af` |
| `wordpress-themes-20260715.txt` | 131 | `7450c6e51c3f561eca2b4a3b12d7cbeaf630efa469f7b6fb81c6a00f8c72f6a1` |
| `wordpress-environment-20260715.txt` | 285 | `52204daf29752d33e485f2641b2552c3bcc3ae80b76b47a576689d9b0142b67a` |
| `manifest.md` | 271 | `9ee1369acc7a71b2d770048fea56dfc782c88dac58f2296a55231047dfeac5c7` |
| `SHA256SUMS` | 570 | Verification index; not self-hashed |

The SQL dump used a transaction-consistent export with quick row streaming and table locks disabled. It is non-empty and contains 12 `wp_` WordPress table definitions.

The uploads archive starts at `uploads/`, preserves the normal year/month layout, contains 1,027 total tar entries, and passed a complete archive-read test. Source file count is 1,022; the remaining entries are directories.

Remote `sha256sum -c SHA256SUMS` verification passed 6/6. Local SQL verification passed. Local full-package verification is recorded in the final verification section below.

The backup directory is excluded by the repository's existing `/backups/` ignore rule. No backup artifact, secret, or configuration file is staged for Git.

## Phase A1 Comparison

Previous Phase A1 backup:

- SQL: `wordpress-database-20260709.sql`, 851,137 bytes
- SQL SHA-256: `a4d0b5668d7da214256073dac024058b0d1471deb00e8d87fe0b4e52373e4722`
- Uploads: `wordpress-uploads-20260709.zip`, 1,080,525,812 bytes
- Uploads SHA-256: `0ffdbef11b310d25c564edbcd08df18ea01c1cb93a33b2bb6c7a43f7f1696ea1`
- Uploads files: 1,021
- Uploads uncompressed bytes: 1,097,077,978

Observed changes:

- The B2 SQL is 222,478 bytes larger than A1.
- Both SQL files contain 12 WordPress table definitions.
- Business content remains Products 36, Solutions 6, and Media 132.
- The B2 uploads source has one additional file and 249 additional uncompressed bytes.
- The additional uploads file is SiteGround's `.htaccess`, not new media content.
- The latest actual media file and its modification time are unchanged from A1.
- The B2 tar.gz is 1,246,791 bytes smaller than the A1 zip because the archive formats and compression differ.
- No obvious business-content or media loss was found.
- Repository-managed Phase 2 Resource pages are not expected in this WordPress SQL and are preserved by Git rather than this CMS backup.

The Phase A1 backup was retained unchanged.

## AWS Target Preparation

Target:

- Instance: `dualcorelink-production`
- Region: Singapore
- Static IPv4: `52.74.68.63`
- OS: Ubuntu 24.04.4 LTS

Verified directories:

```text
/srv/dualcorelink/wordpress
/srv/dualcorelink/shared
/srv/dualcorelink/backups
/var/www/cms.dualcorelink.com
```

All four directories are owned by `deploy:www-data`. The `deploy` user can write to them and `www-data` can read and traverse them. Modes remain setgid `2775`, except the more restrictive backup directory at `2750`. No mode `777` is used.

No WordPress core, uploads, SQL dump, or production content was placed in these directories during B2.

## Empty AWS Database

Created on the AWS local MariaDB service:

- Database: `dualcorelink_wp`
- Database default charset: `utf8mb4`
- Database default collation: `utf8mb4_unicode_ci`
- User: `dualcorelink_wp_user`
- User host: `localhost` only
- Grants: privileges on `dualcorelink_wp.*` only
- Current tables: 0

A strong random password was generated on the AWS server and saved only in:

```text
/srv/dualcorelink/shared/migration-secrets.env
```

The file is owned by `root:deploy`, mode `0640`. Its content was not printed, downloaded, added to Git, or included in this report. A login test through the application user succeeded and confirmed zero tables.

MariaDB remains bound only to `127.0.0.1:3306`. UFW has no TCP 3306 allow rule. Public 3306 was not opened.

## Nginx Preparation Decision

No new server block was created in B2. The current default HTTP 200 site was preserved, and `nginx -t` passed.

The B3 design is to add a dedicated `cms.dualcorelink.com` server block only after WordPress files and PHP routing are ready. It will be tested with a hosts-file override or approved test hostname before DNS changes. No production certificate or DNS change is appropriate during B2.

## Capacity Assessment

- AWS available bytes before migration: 77,142,515,712
- B2 SQL bytes: 1,073,615
- Compressed uploads bytes: 1,079,279,021
- Expected uncompressed uploads bytes: 1,097,078,227
- Two-times uploads-plus-database safety requirement: 2,196,303,684 bytes
- Conservative temporary footprint for archive, extraction, and SQL: 2,177,430,863 bytes
- Estimated space after that temporary footprint: 74,965,084,849 bytes

AWS has more than 35 times the required two-times safety margin. No separate temporary volume is needed for this migration package.

## B3 Migration Runbook

1. Take a fresh AWS snapshot and confirm the SiteGround source remains unchanged.
2. Upload the SQL dump and uploads archive to `/srv/dualcorelink/backups/` or another approved private temporary directory.
3. Verify SHA-256 before extracting or importing anything.
4. Install the matching WordPress core under `/srv/dualcorelink/wordpress` or a versioned release directory.
5. Restore the active theme, Advanced Custom Fields, and the Smart Home B2B Content Architecture plugin.
6. Restore the uploads archive so it produces `wp-content/uploads/...` without nested `uploads/uploads` paths.
7. Confirm the AWS target database is still empty, then import the SQL once.
8. Configure `wp-config.php` from the server-only migration secret file; do not expose credentials in commands or logs.
9. Run serialization-safe WP-CLI search-replace from `https://cms.dualcorelink.com` only if a temporary test hostname is used. Never use plain-text SQL replacement for serialized values.
10. Confirm `siteurl`, `home`, table prefix, charset, collation, CPT registration, ACF, and plugin activation.
11. Configure the dedicated Nginx/PHP-FPM server block and validate with `nginx -t`.
12. Test through a local hosts override or approved test hostname without changing public DNS.
13. Verify REST root, products 36, solutions 6, media 132, ACF output, source media URLs, wp-admin, and uploads HTTP responses.
14. Build the frontend against the AWS test REST endpoint and verify Products, Resources, Solutions, sitemap, schema, and responsive QA.
15. Take a final pre-cutover AWS snapshot and a fresh SiteGround rollback backup.
16. Perform the separately approved DNS cutover, monitor production, and retain SiteGround during the rollback window.

## Rollback Plan

Before DNS cutover, rollback is simply to remove the hosts override or test hostname and leave production on SiteGround.

After an approved cutover, rollback consists of:

1. Restore the previous Cloudflare DNS values for `cms.dualcorelink.com`.
2. Keep the SiteGround site, database, SSL, and uploads unchanged and available.
3. If AWS state must be discarded, restore the clean AWS snapshot or the final pre-cutover snapshot.
4. Do not reuse a partially imported target database; restore the snapshot or recreate the empty target in a separately approved action.
5. Revalidate SiteGround REST, media, and the frontend build source after DNS rollback.

The existing SiteGround backup, Phase A1 local backup, new B2 migration package, Lightsail automatic snapshots, and clean manual snapshot remain available. No backup was deleted.

## Final Verification

- Source identity confirmed: passed
- Remote SQL non-empty and WordPress tables present: passed
- Remote uploads archive complete-read test: passed
- Remote SHA-256 verification: 6/6 passed
- Local SQL SHA-256 verification: passed
- Local uploads SHA-256 verification: passed; the local archive hash matches the remote manifest
- Local package verification: 6/6 manifest entries passed
- Local uploads archive verification: readable, 1,027 archive entries, with `uploads/` as the top-level directory
- AWS application-user database login: passed
- AWS target table count: 0
- MariaDB local-only listener: passed
- UFW TCP 3306 exposure: none
- AWS Nginx configuration test: passed
- AWS failed systemd units: 0

## Not Performed

- No DNS, Cloudflare, SiteGround routing, or production traffic change
- No WordPress content edit
- No AWS SQL import
- No AWS uploads restoration
- No WordPress core deployment
- No Nginx virtual host activation
- No TLS certificate request
- No phpMyAdmin installation
- No TCP 3306 exposure
- No deletion of SiteGround data, database, backups, staging, or service
- No Git history rewrite
- No backup, private key, password, salt, token, or secret committed

## Risks and Observations

1. SiteGround runs PHP 8.2 while AWS currently has PHP 8.3. B3 must test the custom plugin and ACF under PHP 8.3 before cutover.
2. The source database reports `utf8` with default collation while the empty AWS database defaults to `utf8mb4_unicode_ci`. Imported table definitions will retain their source definitions unless an explicit, separately tested conversion is planned.
3. SiteGround-specific optimization and security plugins are installed but inactive. They should not be blindly activated on AWS.
4. The B2 SQL is larger than A1 even though business content counts are unchanged. This is consistent with SiteGround environment and option/user state changes, but B3 must still validate all expected tables and settings after import.
5. The WordPress source contains no Resource CPT posts; SEO Resources remain repository-managed.
6. TCP 443 remains a separately documented Lightsail network-firewall prerequisite for the eventual HTTPS cutover.

## Result

Phase B2 preparation is complete. The source remains live and unchanged, the migration package is excluded from Git, the AWS target is empty and local-only, and the B3 migration and rollback paths are documented without importing or serving production data.
