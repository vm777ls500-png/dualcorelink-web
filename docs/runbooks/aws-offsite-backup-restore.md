# DualCoreLink AWS offsite backup restore runbook

## Safety boundary

This runbook restores an Amazon S3 offsite backup into an isolated directory first. Do not import a database, replace uploads, enable an Nginx configuration, or change the frontend `current` symlink until the isolated validation passes and a fresh Lightsail snapshot plus local rollback backup exist.

Never print or copy AWS credentials, WordPress database credentials, salts, SSH keys, certificate private keys, or GitHub runner tokens into logs, tickets, Git, or reports.

## Backup layout

Daily restore points use:

`s3://dualcorelink-production-backups-sg-f3a03bde/production/daily/<UTC timestamp>/`

Monthly copies, when the timer runs on the first UTC day of a month, use:

`s3://dualcorelink-production-backups-sg-f3a03bde/production/monthly/<YYYY-MM>/`

Each restore point contains:

- `wordpress-database.sql`
- `wordpress-uploads.tar.gz`
- `nginx-config.tar.gz`
- `wordpress-state.txt`
- `wordpress-plugins.json`
- `wordpress-themes.json`
- `deployment-state.txt`
- `environment.txt`
- `manifest.md`
- `SHA256SUMS`

The backup intentionally excludes AWS credentials, raw `wp-config.php`, WordPress salts, database passwords, SSH keys, certificate private keys, and GitHub runner credentials.

## Select and download a restore point

Run as root on a recovery host with the dedicated read permission and enough free disk space:

```bash
export AWS_SHARED_CREDENTIALS_FILE=/etc/dualcorelink-backup/credentials
export AWS_CONFIG_FILE=/etc/dualcorelink-backup/config

bucket=dualcorelink-production-backups-sg-f3a03bde
restore_point=production/daily/YYYYMMDDTHHMMSSZ
restore_dir=/srv/dualcorelink/backups/restore-test/YYYYMMDDTHHMMSSZ

install -d -o root -g root -m 0700 "$restore_dir"
aws s3 cp "s3://${bucket}/${restore_point}/" "$restore_dir/" \
  --recursive --only-show-errors --no-progress
```

## Validate before any restore

```bash
cd "$restore_dir"
sha256sum -c SHA256SUMS
test -s wordpress-database.sql
grep -q 'CREATE TABLE.*wp_' wordpress-database.sql
tar -tzf wordpress-uploads.tar.gz >/dev/null
tar -tzf nginx-config.tar.gz >/dev/null
```

Compare the recorded values in `wordpress-state.txt` and `deployment-state.txt` with the intended recovery target. Stop if the expected production URL, table prefix, content counts, or release state do not match.

## Database recovery

1. Create a fresh Lightsail snapshot.
2. Export the current database to a separate rollback file.
3. Stop content editing and record the freeze time.
4. Import into a new temporary database first when possible.
5. Confirm the active prefix is `wp_` and do not delete legacy `ybj_` tables.
6. Use WP-CLI for serialized-safe URL replacement if the recovery hostname differs.
7. Verify Products 36, Solutions 6, Media 132, Product categories 10, ACF fields, and custom CPT REST routes before switching the active database.

The exact database import command depends on the recovery database name and credentials and must not be stored in this repository.

## Uploads recovery

Extract into an isolated directory first:

```bash
mkdir -p /srv/dualcorelink/backups/restore-test/uploads-check
tar -xzf wordpress-uploads.tar.gz \
  -C /srv/dualcorelink/backups/restore-test/uploads-check
find /srv/dualcorelink/backups/restore-test/uploads-check -type f -name '*.php' -print
```

The PHP-file check must return no files. Use `rsync --dry-run` before copying into the active WordPress `wp-content/uploads/`. Do not use `--delete` without a separately reviewed deletion manifest.

## Nginx recovery

1. Extract `nginx-config.tar.gz` outside `/etc/nginx`.
2. Diff it against the active configuration.
3. Do not restore certificate private keys from this backup; Certbot maintains them separately.
4. Copy only reviewed configuration files.
5. Run `nginx -t` before reload.
6. Validate HTTP, HTTPS, REST, wp-admin, uploads PHP denial, and protected-file denials.

## Frontend and runner recovery

Use `deployment-state.txt` to identify the accepted release, previous releases, runner service, and activation wrapper checksum. The static frontend itself should be rebuilt from the exact Git commit through `.github/workflows/aws-production-deploy.yml`; do not treat the state manifest as a replacement for Git.

The backup does not contain GitHub runner credentials. Re-register a replacement runner with a new repository-level token if the instance is rebuilt.

## Post-restore acceptance

- Frontend and CMS HTTPS return expected statuses.
- CMS REST returns JSON.
- Products / Solutions / Media / Product categories: 36 / 6 / 132 / 10.
- Sitemap: 75 URLs, all HTTP 200.
- Resources: 14.
- Article / BreadcrumbList / Product JSON-LD: 14/14, 14/14, 36/36.
- Nginx, MariaDB, PHP-FPM, Fail2ban, Certbot timer, and runner are healthy.
- MariaDB listens only on `127.0.0.1:3306`.
- Public TCP 3306 remains closed.
- No localhost, SiteGround, test-host, or `pages.dev` leakage exists.

Keep the isolated restore directory until acceptance completes, then remove only that explicitly named directory.
