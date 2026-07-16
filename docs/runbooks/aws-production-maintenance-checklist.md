# DualCoreLink AWS production maintenance checklist

This checklist covers the Lightsail production host, the WordPress CMS, the static frontend release, the private S3 backup bucket, certificates, and the repository-level GitHub runner. It does not authorize content changes, DNS changes, database schema changes, dependency upgrades, backup deletion, release deletion, or firewall changes.

Never paste AWS credentials, database credentials, WordPress salts, SSH private keys, certificate private keys, or GitHub runner tokens into logs, reports, tickets, or Git.

## Daily

- Confirm the automated health timer is enabled and active:

  ```bash
  systemctl is-enabled dualcorelink-health-check.timer
  systemctl is-active dualcorelink-health-check.timer
  systemctl list-timers dualcorelink-health-check.timer --no-pager
  ```

- Review the latest health result and investigate every `WARN` or `FAIL`:

  ```bash
  sudo systemctl show dualcorelink-health-check.service \
    -p Result -p ExecMainStatus -p ExecMainStartTimestamp -p ExecMainExitTimestamp
  sudo journalctl -u dualcorelink-health-check.service -n 100 --no-pager
  ```

- Confirm the S3 backup timer and latest run:

  ```bash
  systemctl is-enabled dualcorelink-offsite-backup.timer
  systemctl is-active dualcorelink-offsite-backup.timer
  sudo systemctl show dualcorelink-offsite-backup.service \
    -p Result -p ExecMainStatus -p ExecMainStartTimestamp -p ExecMainExitTimestamp
  ```

- Confirm public frontend and CMS availability:

  ```bash
  curl --fail --silent --show-error https://dualcorelink.com/en/ >/dev/null
  curl --fail --silent --show-error https://cms.dualcorelink.com/wp-json/ >/dev/null
  ```

## Weekly

- Review disk, memory, swap, and failed services:

  ```bash
  df -h /
  free -h
  swapon --show
  sudo systemctl --failed
  ```

- Treat root disk usage at 80% as `WARN` and 90% as `FAIL`. Do not automatically delete releases, backups, or logs.
- Confirm MariaDB still listens only on `127.0.0.1:3306` and no UFW rule permits public 3306:

  ```bash
  sudo ss -ltnp
  sudo ufw status verbose
  ```

- Review Nginx, PHP-FPM, MariaDB, Fail2ban, Certbot, runner, health-check, and backup journals for repeated errors. Do not export secrets from logs.
- Confirm Nginx logrotate configuration remains valid and inspect journal size:

  ```bash
  sudo logrotate --debug /etc/logrotate.d/nginx
  journalctl --disk-usage
  ```

- Review available Ubuntu security updates without upgrading major versions or application dependencies during an unplanned window:

  ```bash
  apt list --upgradable 2>/dev/null
  ```

## Monthly

- Review the AWS Budget actual and forecast values against the USD 50 monthly budget and investigate 80% or 100% notifications.
- Review S3 backup object count, total storage, versioning, encryption, checksum metadata, and lifecycle status. Do not make the bucket public.
- Run one isolated, non-destructive S3 restore-readiness test using `docs/runbooks/aws-offsite-backup-restore.md`. Never restore over production as a routine test.
- Confirm Lightsail automatic snapshots remain enabled and required manual cutover snapshots still exist.
- Review certificate expiry and confirm more than 30 days remain:

  ```bash
  sudo certbot certificates
  systemctl is-enabled certbot.timer
  systemctl is-active certbot.timer
  ```

- Confirm the repository-level runner remains online, enabled, active, and limited to the expected repository and labels.
- Review the current and previous frontend releases and the `current` symlink. Retain at least the latest three releases; do not delete releases without a reviewed rollback point.
- Review the dedicated S3 uploader access key age and rotate it through a controlled credential-rotation procedure when required. Never use a root access key.
- Review AWS invoices and service usage for unexpected S3 request/storage growth, snapshots, Lightsail plan changes, or new services.

## Incident triggers

Stop routine work and investigate when any of these occur:

- A health check exits with `FAIL`.
- The latest S3 restore point is more than 60 hours old.
- The database, uploads, or Nginx backup object is missing checksum metadata.
- Root disk usage reaches 90%.
- Available memory falls below 256 MiB for a sustained period.
- MariaDB listens on a non-loopback address or public TCP 3306 becomes reachable.
- A production certificate has fewer than 30 days remaining.
- The frontend `current` symlink leaves `/srv/dualcorelink/frontend/releases/`.
- The runner is offline, disabled, or unexpectedly busy for an extended period.
- Public frontend or CMS health checks fail repeatedly.

Do not hide failed checks, return empty CMS data, disable security controls, or automatically delete production data to clear an alert.
