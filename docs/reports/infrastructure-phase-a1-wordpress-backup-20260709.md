# Infrastructure Phase A1 WordPress Backup

Date: 2026-07-10

## Objective

Create a local backup of the current WordPress CMS data source before planning a public Headless WordPress REST build source.

This phase only produced local backup artifacts and this report. It did not migrate WordPress, change frontend code, modify DNS, update Cloudflare settings, or change WordPress content.

## WordPress and Docker Status

Local WordPress:

- `http://127.0.0.1:8080`
- Status: HTTP 200

Local WordPress REST root:

- `http://127.0.0.1:8080/wp-json`
- Status: HTTP 200

Products REST check:

- `http://127.0.0.1:8080/wp-json/wp/v2/products`
- Status: HTTP 200
- `X-WP-Total`: 36

Docker services:

| Service | Container | State | Port |
| --- | --- | --- | --- |
| `wordpress` | `newproject-wordpress-1` | running | `8080 -> 80` |
| `db` | `newproject-db-1` | running | internal MySQL ports |
| `phpmyadmin` | `newproject-phpmyadmin-1` | running | `8081 -> 80` |

Storage:

- Database named volume: `newproject_wordpress_db`
- WordPress `wp-content` bind mount: `wordpress/wp-content`

Sensitive database environment values exist in Docker configuration but were not printed in this report.

## Backup Directory

Backup directory:

- `backups/wordpress-public-cms-phase-a1-20260709/`

Git ignore status:

- `/backups/` is already ignored by `.gitignore`
- Large backup files are not intended to be committed

## Database Backup

Database backup file:

- `backups/wordpress-public-cms-phase-a1-20260709/wordpress-database-20260709.sql`

Export method:

- Docker / `mysqldump`
- Used container environment variables for database connection
- Did not print database password
- Used `--single-transaction --routines --triggers --no-tablespaces`

Validation:

- Exists: yes
- Non-empty: yes
- Size: `851137` bytes
- SHA256: `A4D0B5668D7DA214256073DAC024058B0D1471DEB00E8D87FE0B4E52373E4722`

Note:

- The first dump attempt without `--no-tablespaces` hit a MySQL PROCESS privilege limitation. The backup was rerun successfully with `--no-tablespaces`.

## Uploads Backup

Uploads source:

- `wordpress/wp-content/uploads`

Uploads backup file:

- `backups/wordpress-public-cms-phase-a1-20260709/wordpress-uploads-20260709.zip`

Validation:

- Exists: yes
- Non-empty: yes
- Size: `1080525812` bytes
- SHA256: `0FFDBEF11B310D25C564EDBCD08DF18EA01C1CB93A33B2BB6C7A43F7F1696EA1`

## Plugin and Theme Directory Lists

Plugin list file:

- `backups/wordpress-public-cms-phase-a1-20260709/plugins-directory-list.txt`
- Size: `121` bytes
- SHA256: `3A14664CC219C701EE3530C58438F51E094032650DB4BF1EEE37BF4F8F143E5A`

Plugins:

- `advanced-custom-fields` - 611 files
- `akismet` - 47 files
- `smart-home-b2b-content-architecture` - 6 files

Theme list file:

- `backups/wordpress-public-cms-phase-a1-20260709/themes-directory-list.txt`
- Size: `105` bytes
- SHA256: `0BF09B2B63B7B26A3A1434B4A18A1A784BB7C20B2F204074CD9C9264CD1B2879`

Themes:

- `twentytwentyfive` - 235 files
- `twentytwentyfour` - 107 files
- `twentytwentythree` - 51 files

The plugin and theme directories were not copied in full during this phase. The directory lists were captured to support migration planning.

## Manifest

Backup manifest:

- `backups/wordpress-public-cms-phase-a1-20260709/backup-manifest-20260709.txt`

The manifest records file names, sizes, SHA256 hashes, and non-empty checks for the SQL backup, uploads zip, plugin list, and theme list.

## Risks Found

- The uploads archive is large, about 1.08 GB, so it should remain outside Git.
- A public CMS migration must preserve ACF fields, custom post types, custom taxonomies, media IDs, and permalink / REST behavior.
- `mysqldump` required `--no-tablespaces` because the database user does not have PROCESS privilege.
- Plugin files were not fully copied in this phase. A future migration should either reinstall required plugins or copy verified plugin versions.
- The custom plugin `smart-home-b2b-content-architecture` appears important for CPT / REST structure and should be included in migration planning.

## Next Step Recommendations

1. Store the SQL and uploads backup in a safe non-Git location.
2. Create an additional off-machine backup before migration.
3. Prepare the target public WordPress environment.
4. Install or migrate required plugins, especially ACF and the custom content architecture plugin.
5. Restore the database and uploads to a staging/public CMS.
6. Verify:
   - `https://cms.dualcorelink.com/wp-json`
   - `https://cms.dualcorelink.com/wp-json/wp/v2/products`
   - ACF fields in product REST output
   - media URLs and migrated uploads
7. Configure Cloudflare Pages Production `WORDPRESS_REST_ROOT` only after the public CMS REST API is confirmed.

## Modification Confirmation

- Modified frontend code: no
- Modified WordPress content: no
- Modified database data: no
- Modified Docker Compose configuration: no
- Modified Cloudflare configuration: no
- Modified DNS: no
- Added dependencies: no
- Ran `npm audit fix`: no
- Commit created: no
- Push performed: no

## Git Status

Before creating this report, git status was:

- `main...origin/main`

After this report is created, the expected working tree change is this uncommitted docs report only. Backup artifacts are under ignored `/backups/`.
