# AWS Operations Phase C2 - Monitoring and Cost Guardrails

Date: 2026-07-16
Operator: Codex and the site owner
Status: Complete

## Objective

Phase C2 adds low-cost production health monitoring and cost guardrails without changing the application architecture or adding Prometheus, Grafana, ELK, CloudWatch Agent, paid log ingestion, SNS, Lambda, or automated instance shutdown.

No website content, WordPress data, database schema, DNS, Cloudflare setting, Nginx route, firewall rule, release-retention policy, backup object, or dependency was changed.

## C1 archive

- Commit: `cf62e75f605f1274802f53616ae0f26ddb486ef2`.
- Message: `chore: add aws offsite backup baseline`.
- Push to `origin/main`: successful.
- The established production workflow ran successfully for this source SHA.
- The resulting atomic frontend release is `/srv/dualcorelink/frontend/releases/cf62e75f605f-20260716-181738`.
- The commit contains no frontend content change; the public frontend and CMS remained HTTP 200 after activation.

## AWS Budget

Planned guardrail:

- Name: `dualcorelink-monthly-cost-alert`.
- Monthly amount: USD 50.
- Notifications: 80% and 100% actual-cost email alerts.
- No SNS, Lambda, automated action, or resource shutdown.

Creation result:

- Budget created successfully.
- Budget state: healthy.
- Monthly amount: USD 50.
- Alert 1: actual cost greater than 80% (USD 40).
- Alert 2: actual cost greater than 100% (USD 50).
- Both alerts use the separately authorized billing-alert email subscriber.
- Subscriber address: intentionally omitted from Git and this report.
- Amazon SNS: not configured.
- AWS Chatbot: not configured.
- Budget actions: 0.
- Lambda, automated instance stop, IAM action, and other automated remediation: not configured.

## Lightsail and host baseline

- Instance: `dualcorelink-production`, Singapore.
- Nginx, MariaDB, PHP 8.3 FPM, Fail2ban, Certbot timer, and repository runner: active.
- Failed services: 0.
- Root filesystem during implementation: 24% used; approximately 59 GiB available.
- Memory during the first health run: 3,003 MiB available.
- Swap during the first health run: 65 MiB used of 2,047 MiB.
- MariaDB listener: `127.0.0.1:3306` only.
- Public TCP 3306 check: closed.
- No monitoring agent was installed.

Lightsail's built-in CPU, network, and disk metric surfaces remain the infrastructure-level dashboard. No CloudWatch Agent or custom paid metric pipeline was added.

## Health check implementation

Repository files:

- `deploy/scripts/health-check.sh`
- `deploy/systemd/dualcorelink-health-check.service`
- `deploy/systemd/dualcorelink-health-check.timer`

Server files:

- `/usr/local/sbin/dualcorelink-health-check`: root-owned, mode 0750.
- `/etc/systemd/system/dualcorelink-health-check.service`: root-owned, mode 0644.
- `/etc/systemd/system/dualcorelink-health-check.timer`: root-owned, mode 0644.

The script checks:

- Nginx, MariaDB, PHP 8.3 FPM, Fail2ban, and Certbot timer state.
- Repository-level GitHub runner enabled/active state.
- Root disk usage, available memory, and swap.
- MariaDB loopback binding and public TCP 3306 reachability.
- Frontend `current` symlink validity.
- Official frontend and CMS certificate lifetime.
- Latest S3 daily restore-point age.
- Presence of database, uploads, and Nginx objects plus SHA-256 metadata.

Output contains only timestamped `OK`, `WARN`, and `FAIL` lines. It does not print credentials, passwords, tokens, salts, private keys, or backup contents. A `FAIL` returns a non-zero exit status for systemd visibility. Warnings remain visible in the journal but do not trigger deletion or remediation.

## Thresholds

- Root disk: WARN at 80%, FAIL at 90%.
- Available memory: WARN below 512 MiB, FAIL below 256 MiB.
- Latest S3 backup: WARN at 36 hours, FAIL at 60 hours.
- Certificates: WARN when fewer than 30 days remain.
- Public TCP 3306 reachable: FAIL.
- Invalid frontend current symlink: FAIL.

No automatic cleanup is attached to any threshold. Releases, backups, and logs are not deleted by the health check.

## systemd timer

- Schedule: daily at 05:00 Asia/Singapore.
- Randomized delay: up to 10 minutes.
- Persistent: yes.
- Timer enabled: yes.
- Timer active: yes.
- First scheduled run after installation: 2026-07-17 05:01:40 +08.
- Initial manual service run: successful, exit status 0.
- Initial summary: 0 failures, 0 warnings.
- Output destination: systemd journal only; no email sender was installed.

## Certificate monitoring

- `dualcorelink.com` and `www.dualcorelink.com`: covered by the official frontend certificate, valid for approximately 89 more days during inspection.
- `cms.dualcorelink.com`: covered by the official CMS certificate, valid for approximately 89 more days during inspection.
- `certbot.timer`: enabled and active.
- No certificate was requested, reconfigured, or renewed during C2.

## GitHub runner monitoring

- Service: `actions.runner.vm777ls500-png-dualcorelink-web.dualcorelink-production.service`.
- Service state: enabled and active.
- Expected labels: `self-hosted`, `linux`, `x64`, `dualcorelink-production`.
- The C1 push workflow completed successfully for exact source SHA `cf62e75f605f1274802f53616ae0f26ddb486ef2`, providing an operational online check of the repository-level runner and label routing.
- No runner token or credential was read or recorded.

## Log retention

- Nginx logrotate: daily, 14 rotations, compression enabled, delayed compression, missing/empty logs handled safely.
- Journald storage during inspection: approximately 19.7 MiB.
- systemd journal retains bounded storage according to system defaults when no stricter local override is set.
- No historical log was deleted, rotated manually, or uploaded to a paid logging service.

## S3 backup verification

- Latest restore point during the initial health run: `production/daily/20260716T094034Z`.
- Restore-point age: under one hour at the time of the first C2 health run.
- Database object: present; SHA-256 metadata present.
- Uploads object: present; SHA-256 metadata present.
- Nginx configuration object: present; SHA-256 metadata present.
- The C1 backup service remained successful and its timer remained enabled and active.
- No full restore test was run in C2.
- No backup or object version was deleted.

## Cost controls and non-enabled services

- Monthly budget: USD 50 with email-only actual-cost alerts at 80% and 100%.
- S3 bucket remains private, versioned, and encrypted with SSE-S3.
- No cross-region replication, Glacier Deep Archive, public bucket access, CloudFront, SNS, Lambda, automated shutdown, CloudWatch Agent, Prometheus, Grafana, ELK, or paid log analytics was enabled.
- Existing Lightsail automatic snapshots and retained manual snapshots remain unchanged.

## QA and observations

- Server-side `bash -n`: passed.
- `systemd-analyze verify`: passed.
- Repository and installed health-check script SHA-256: identical (`969a4c3b0703d42cf8464d3e12207e50b1a5183b9a4fb6c71602d971505712ff`).
- Installed script ownership and mode: root:root 0750.
- Installed systemd unit ownership and mode: root:root 0644.
- Initial health check: passed with 0 WARN and 0 FAIL.
- Public frontend: HTTP 200.
- Public CMS REST root: HTTP 200 JSON.
- MariaDB remains private to loopback; public 3306 remains closed.
- UFW remains active with only OpenSSH and Nginx Full allowed; no 3306 rule exists.
- CPU snapshot during final verification: approximately 95% idle with load averages 0.00 / 0.19 / 0.23.
- Primary network interface: up, with no RX or TX errors reported during inspection.

All C2 server monitoring, backup verification, and cost-alert controls are operational.

## Maintenance

Daily, weekly, monthly, and incident-response checks are documented in `docs/runbooks/aws-production-maintenance-checklist.md`.
