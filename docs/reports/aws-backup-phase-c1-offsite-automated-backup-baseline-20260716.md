# AWS Backup Phase C1 - Offsite Automated Backup Baseline

Date: 2026-07-16
Operator: Codex and the site owner
Status: Operational; lifecycle expiration template prepared but not yet applied

## Objective

Phase C1 established a private Amazon S3 backup destination independent of the Lightsail system disk, a least-privilege upload identity, a root-controlled daily backup service, remote checksum validation, and a non-destructive restore test. The backup covers the WordPress database, uploads, Nginx configuration, sanitized WordPress state, plugin and theme inventories, runner and deployment state, frontend release state, and environment metadata.

No AWS secret access key, database password, WordPress salt, SSH key, certificate private key, GitHub token, or full AWS account ID is recorded in this report or Git.

## Pre-change baseline

- Git: `main...origin/main`, clean.
- HEAD: `169c32a2d0614d3b08abf8574bd7ece576536117`.
- Ubuntu: 24.04 LTS.
- Nginx, MariaDB, PHP 8.3 FPM, Fail2ban, Certbot timer, and repository runner: enabled and active.
- Failed services: 0.
- MariaDB: `127.0.0.1:3306` only.
- Products / Solutions / Media / Product categories: 36 / 6 / 132 / 10.
- Current frontend release: `/srv/dualcorelink/frontend/releases/8d28e578acd5-production-20260716-031217`.
- Retained frontend release directories: 5.
- Root filesystem: 77 GB usable, 23% used, about 60 GB available.
- No AWS CLI, S3 credentials, custom WordPress backup timer, or custom backup cron existed.

Local ignored migration backups remain present:

- B2: 12 files, 1,404,822,909 bytes.
- B5: 7 files, 1,080,321,872 bytes.
- B6: 22 files, 1,080,504,018 bytes.
- `/backups/` remains ignored by Git.

## Lightsail snapshot baseline

- Automatic snapshots: enabled.
- Daily automatic snapshot time: 03:00 GMT+8.
- Automatic retention shown by Lightsail: latest seven snapshots.
- `dualcorelink-pre-production-cutover-20260715`: retained.
- `dualcorelink-pre-frontend-cutover-20260716`: retained.
- Earlier migration snapshots remain retained.

No snapshot was deleted or modified.

## S3 bucket

- Bucket: `dualcorelink-production-backups-sg-f3a03bde`.
- Region: `ap-southeast-1` (Singapore).
- Type: general purpose.
- Object ownership: Bucket owner enforced; ACLs disabled.
- Block Public Access: all settings enabled.
- Versioning: enabled.
- Default encryption: SSE-S3.
- Static website hosting: not enabled.
- Public ACL or public bucket policy: not created.
- Cross-region replication: not enabled.
- CloudFront: not created.
- Glacier or Deep Archive transitions: not enabled.

The bucket name uses a random short suffix and does not contain the AWS account ID.

## IAM boundary

- Dedicated IAM user: `dualcorelink-backup-uploader`.
- Console access: disabled.
- Inline policy: `DualCoreLinkBackupBucketAccess`.
- Policy validation: 0 security findings, 0 errors, 0 warnings, 0 suggestions.
- Bucket-level permissions: location and list operations for this bucket only.
- Object-level permissions: put, read, read-version, abort multipart upload, and list multipart parts for this bucket only.
- No `DeleteObject`, `DeleteBucket`, ACL, bucket-policy, public-access, IAM, or other-bucket permission was granted.
- Access-key description: Lightsail production offsite backup uploader.

The credential is stored only on the Lightsail instance:

- `/etc/dualcorelink-backup/credentials`: root:root, mode 0600.
- `/etc/dualcorelink-backup/config`: root:root, mode 0600.
- `/etc/dualcorelink-backup`: root:root, mode 0700.

No credential value was printed, committed, or included in the report.

## Installed backup implementation

Repository artifacts:

- `deploy/scripts/backup-production-to-s3.sh`
- `deploy/systemd/dualcorelink-offsite-backup.service`
- `deploy/systemd/dualcorelink-offsite-backup.timer`
- `deploy/aws/s3-backup-lifecycle.json`
- `docs/runbooks/aws-offsite-backup-restore.md`

Server installation:

- `/usr/local/sbin/dualcorelink-offsite-backup`: root:root, mode 0750.
- `/etc/systemd/system/dualcorelink-offsite-backup.service`: root:root, mode 0644.
- `/etc/systemd/system/dualcorelink-offsite-backup.timer`: root:root, mode 0644.
- `/srv/dualcorelink/backups/offsite-staging`: root-only staging area.
- AWS CLI v2: installed from the official AWS download at `/usr/local/bin/aws`; validated version 2.35.24.

Server-side `bash -n` and `systemd-analyze verify` passed before execution.

## Backup contents and protections

Each restore point contains ten objects:

- Consistent MariaDB export with active `wp_` tables.
- WordPress uploads archive; `.htaccess` and PHP files are excluded.
- Nginx configuration archive without certificate private keys.
- Sanitized WordPress state, including public URLs, content counts, versions, selected security constants, and a `wp-config.php` checksum but not its contents.
- Plugin and theme JSON inventories.
- Frontend current symlink, retained release list, runner state, service state, and activation-wrapper checksum.
- Environment versions and resource state.
- Manifest and SHA-256 checksum file.

The script uses `set -euo pipefail`, root-only staging, `flock`, a restrictive umask, local archive-read checks, SHA-256, explicit SSE-S3 upload, remote checksum metadata comparison, and success-only staging cleanup. A failed run retains its timestamped staging evidence.

The backup does not contain AWS credentials, raw `wp-config.php`, database passwords, WordPress salts, SSH keys, certificate private keys, or runner credentials.

## Timer

- Timer: enabled and active.
- Schedule: daily at 01:30 Asia/Singapore.
- Randomized delay: up to 10 minutes.
- Persistent: yes; a missed run executes after the server returns.
- First scheduled run shown after activation: 2026-07-17 01:30:37 +08.
- Service is oneshot and uses lower CPU and I/O priority.
- Service hardening includes private temporary and device namespaces, strict system protection with only the staging path writable, no new privileges, and kernel/control-group protections.

## First production backup

- Restore point: `production/daily/20260716T094034Z/`.
- Service result: success.
- Exit status: 0.
- Duration: approximately 1 minute 35 seconds.
- S3 objects: 10.
- Total restore-point bytes: 1,080,361,585.
- Sampled uploads object encryption: `AES256` (SSE-S3).
- Sampled uploads object SHA-256 metadata: present and matched the uploaded artifact.
- Local SHA-256 validation: passed for all nine content artifacts listed in `SHA256SUMS`.
- Remote SHA-256 metadata validation: passed for every uploaded object.
- Uploads archive: readable.
- Nginx archive: readable.
- SQL: non-empty and contains active `wp_` table definitions.
- Success staging cleanup: passed.
- Frontend and CMS after backup: HTTP 200.
- Failed systemd services after backup: 0.

## Non-destructive restore test

The complete restore point was downloaded from S3 to a root-only isolated directory on the Lightsail server. No production file, database, symlink, Nginx configuration, WordPress content, or DNS record was changed.

Results:

- Downloaded objects: 10.
- Downloaded bytes: 1,080,361,585.
- `sha256sum -c SHA256SUMS`: passed for every artifact.
- SQL table definitions: 27.
- Upload archive entries: 1,026.
- Nginx archive entries: 17.
- Upload archive integrity: passed.
- Nginx archive integrity: passed.
- Isolated restore-test cleanup: completed.

The detailed recovery process is documented in `docs/runbooks/aws-offsite-backup-restore.md`.

## Repository and installation QA

- Sensitive-pattern scan across all new scripts, units, policy, runbook, and report: clean.
- Lifecycle policy JSON parse: passed.
- Repository backup script SHA-256: `c9c50837d72619f0cc423d5ac18f8ca45dd2ebc4696edd64eb46f2378a8b64a5`.
- Installed server script SHA-256: identical to the repository file.
- Server `bash -n`: passed.
- Server `systemd-analyze verify`: passed.
- `npm.cmd run lint`: passed.
- `npm.cmd run test:data` with `WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json`: 36/36 passed.

An initial restricted local test attempt could not open the production CMS network connection. The same test was rerun with approved network access and passed in full; this was an execution-environment restriction, not a product or CMS failure.

## Retention strategy

The intended non-archival policy is recorded in `deploy/aws/s3-backup-lifecycle.json`:

- Daily restore points: expire after 35 days.
- Monthly restore points: expire after 370 days.
- Noncurrent versions: expire after 7 days while retaining two newer noncurrent versions.
- Incomplete multipart uploads: abort after 7 days.
- No storage-class transition, Glacier, Deep Archive, or cross-region copy.

The lifecycle rule was not applied during this execution because the authenticated S3 console became unreliable while the deletion rule was being configured. No partial rule was saved or relied upon. This leaves the safer failure mode: backups continue accumulating and nothing is automatically deleted. Applying and verifying this prepared policy remains the sole C1 follow-up and should use an authenticated bucket-administrator session, not the uploader identity.

Until the rule is applied, monitor S3 storage growth and cost. The uploader identity intentionally lacks lifecycle and object-deletion permissions.

## Recovery and rollback

- Lightsail automatic and manual snapshots remain the full-instance rollback layer.
- B2, B5, and B6 local backups remain unchanged.
- S3 is the independent off-instance data layer.
- Existing releases and the atomic activation wrapper remain unchanged.
- Database and uploads restore must start in an isolated directory and pass SHA/SQL/tar checks.
- A fresh Lightsail snapshot and local pre-restore dump are required before any destructive recovery.
- Runner credentials, AWS credentials, database credentials, and certificate private keys must be recreated or recovered from their own secured systems; they are intentionally absent from the S3 payload.

## Unchanged production scope

- Website and WordPress content: unchanged.
- DNS and Cloudflare: unchanged.
- Nginx routing: unchanged.
- MariaDB listener and firewall: unchanged; public 3306 remains closed.
- B2/B5/B6 backups: retained.
- Lightsail snapshots: retained.
- Frontend releases: retained.
- Legacy `ybj_` tables: retained.
- WordPress, PHP, Node, and project dependencies: not upgraded.
- No audit-fix command was run.

## Decision

The C1 offsite automated backup baseline is operational and its first full backup and restore-readiness test passed. The system now has a private, versioned, encrypted S3 copy independent of the Lightsail system disk, with daily automation and checksum enforcement. C1 should be considered operational with one explicit administrative follow-up: apply and verify the prepared lifecycle expiration policy so storage retention becomes enforced rather than advisory.
