# AWS Migration Phase B7 - Post-Cutover Stabilization and Decommission Closure

Date: 2026-07-16
Operator: Codex and the site owner
Status: Passed with one deferred backup-automation recommendation

## Objective

Phase B7 verified that the official DualCoreLink frontend and WordPress CMS remain healthy after SiteGround hosting cancellation, removed the final CMS DNS delegation dependency, retained the AWS rollback assets, validated the GitHub-to-AWS deployment controls, and placed Cloudflare Pages into a retained but non-deploying state.

The site owner confirmed that SiteGround GrowBig hosting was cancelled and a USD 59.88 refund was confirmed. SiteGround is no longer a production or rollback dependency.

No credential, private key, database password, WordPress salt, runner token, or cloud account identifier is included in this report.

## Git baseline

- Branch state before the report: `main...origin/main`.
- Worktree before the report: clean.
- HEAD: `d402d55803ade7b30854ee7f2ac94f027e8bf237`.
- Recent B6 production cutover and acceptance reports are present in Git history.
- A direct GitHub HTTPS verification attempt was reset by the local network, and the local GitHub CLI was not authenticated. The Cloudflare Pages deployment view independently showed source `d402d55`, confirming that this source exists in the connected GitHub repository.

## Production architecture after SiteGround cancellation

- Frontend origin: AWS Lightsail Nginx at `52.74.68.63`.
- Official frontend: `https://dualcorelink.com`.
- `https://www.dualcorelink.com` redirects to the HTTPS apex.
- CMS origin: AWS Lightsail WordPress at `52.74.68.63`.
- Official CMS: `https://cms.dualcorelink.com`.
- DNS authority: Cloudflare nameservers `lauryn.ns.cloudflare.com` and `remy.ns.cloudflare.com`.
- Apex, `www`, and `cms` resolve to `52.74.68.63` with a 300-second public answer TTL.
- `cms.dualcorelink.com` has no SiteGround NS delegation and no AAAA answer.
- Public TCP 3306 is unreachable.

No production response, sitemap page, internal link, image URL, or rendered page contained SiteGround, `pages.dev`, `cms-aws`, `aws.dualcorelink.com`, localhost, or `127.0.0.1` leakage.

## Public production QA

- Apex English homepage: HTTP 200 from AWS Nginx.
- `www`: HTTP 301 to `https://dualcorelink.com/`.
- CMS REST root: HTTP 200 JSON from AWS Nginx.
- Sitemap: 75 URLs.
- Sitemap URLs returning HTTP 200: 75/75.
- Products: 36.
- Solutions: 6.
- Media: 132.
- Product categories: 10.
- FAQ baseline: 30.
- Resources: 14.
- Article JSON-LD: 14/14 Resource details.
- BreadcrumbList JSON-LD: 14/14 Resource details.
- Product JSON-LD: 36/36 Product details.
- Unique internal targets: 135/135 healthy.
- Unique rendered images: 89/89 healthy.
- Empty `href="#"`: 0.
- Environment leakage pages: 0.
- Production noindex header on checked core pages: absent.

The CMS certificate remains trusted for `cms.dualcorelink.com` through `2026-10-13 15:09:35 UTC`. HTTP redirects to HTTPS, and `/wp-admin/` continues to redirect to the official WordPress login path.

## AWS server state

- Instance: `dualcorelink-production` in Singapore.
- OS: Ubuntu 24.04 LTS.
- Resources: 2 vCPU, 4 GB RAM class, 80 GB SSD class.
- Root filesystem: 77 GB usable, 23% used, approximately 60 GB available.
- Memory: approximately 908 MiB used and 2.9 GiB available at the checkpoint.
- Swap: 2 GB active, approximately 50 MiB used.
- Nginx: enabled and active.
- MariaDB: enabled and active.
- PHP 8.3 FPM: enabled and active.
- Fail2ban: enabled and active; SSH jail present.
- Certbot timer: enabled and active.
- Failed systemd services: 0.
- MariaDB listener: `127.0.0.1:3306` only.
- UFW: active, default deny incoming; only OpenSSH and Nginx Full are allowed.
- `nginx -t`: passed.
- Frontend and CMS access-log HTTP 5xx: 0.
- PHP fatal or segmentation events during the checked 24-hour window: 0.

The CMS error log contains blocked internet scanner probes for hidden, backup, and PHP diagnostic paths. These were rejected by the existing Nginx rules and did not produce HTTP 5xx responses.

## Temporary rollback server cleanup

A stale loopback-only process was found at `127.0.0.1:8765`:

`python3 -m http.server 8765 --bind 127.0.0.1`

Its working directory was the retained previous release `/srv/dualcorelink/frontend/releases/98ec80644b7a-20260715-214019`, confirming that it was the Gate 4 rollback inspection server. The exact process and working directory were validated before it was stopped.

Post-cleanup checks:

- Listener on port 8765: absent.
- Previous release directory: retained.
- Production `current` symlink: unchanged.
- Official frontend and CMS health: unchanged.

## Releases and rollback controls

- Current release: `/srv/dualcorelink/frontend/releases/8d28e578acd5-production-20260716-031217`.
- Previous accepted release: `/srv/dualcorelink/frontend/releases/98ec80644b7a-20260715-214019`.
- Total retained release directories: 5.
- Root-owned activation wrapper: `/usr/local/sbin/dualcorelink-activate-release`, mode 755.
- Invalid activation target `/tmp`: rejected.
- `current` symlink after rejection test: unchanged.
- No release was deleted and no rollback was required.

## GitHub Actions runner and deployment path

- Repository-level runner service: enabled and active.
- Runner version observed: 2.335.1.
- Runner state: connected to GitHub and listening for jobs.
- Last recorded deployment job: `Build and deploy AWS static export`, succeeded.
- Workflow: `.github/workflows/aws-production-deploy.yml`.
- Deployment script: `deploy/scripts/deploy-static.sh`.
- Deployment concurrency remains serialized.
- Exact source checkout, lint, data tests, build, artifact gates, atomic switch, health checks, rollback, and release retention controls remain present.
- Documentation-only pushes remain excluded from production deployment by `paths-ignore: docs/**`.

## Backup and snapshot retention

Local ignored backup sets remain present:

- `backups/aws-wordpress-migration-b2-20260715/`
- `backups/aws-wordpress-migration-b5-final-20260715/`
- `backups/aws-wordpress-migration-b6-cutover-20260715-215641/`

SHA-256 verification results:

- B2: 6/6 entries passed; 0 missing and 0 mismatched.
- B5: 5/5 entries passed; 0 missing and 0 mismatched.
- B6: 6/6 entries passed; 0 missing and 0 mismatched.

The AWS B6 `SHA256SUMS` set also passed on the server, and the 1.08 GB uploads archive was readable with `tar -tzf`. B6 database, uploads, plugin, theme, environment, manifest, and pre-sync rollback artifacts remain under `/srv/dualcorelink/backups/b6/`.

The Lightsail console continues to list these manual snapshots:

- `dualcorelink-pre-production-cutover-20260715`
- `dualcorelink-pre-frontend-cutover-20260716`
- Earlier B3/B4 migration snapshots also remain listed.

No snapshot or migration backup was deleted.

No custom recurring WordPress backup systemd timer or cron job is currently installed. The retained manual snapshots and verified B2/B5/B6 backups provide the accepted cutover rollback points, but a separately approved off-instance recurring backup policy remains recommended. That policy should define schedule, encryption, retention, restore testing, storage destination, and cost before implementation.

## Cloudflare Pages stabilization

- Project `dualcorelink-web` remains retained.
- Historical deployments and the last successful `pages.dev` deployment remain retained.
- The only domain shown on the Pages deployment surface is `dualcorelink-web.pages.dev`; official production domains are not attached.
- Git repository connection remains retained.
- Production automatic deployments: disabled during B7.
- Preview automatic branch deployments: disabled during B7.
- Project deletion, deployment deletion, environment-variable deletion, and Git disconnection were not performed.

This is the reversible first decommission step: Pages no longer performs duplicate builds, while its project and final artifacts remain available for a separately approved retention period. The Pages project should not be deleted without a later explicit authorization.

## Local QA against the AWS CMS

The command environment used the official public CMS REST root without writing it to a local file.

- `npm.cmd run lint`: passed.
- Initial `npm.cmd run test:data` without the shell variable: 32/36, with four expected failures caused by fallback to the unavailable local `127.0.0.1:8080` WordPress.
- `npm.cmd run test:data` with the official AWS CMS REST root: 36/36 passed.
- `npm.cmd run build` with the official AWS CMS REST root: passed.
- Static page generation: 155/155.
- Export: 2/2.
- Products: 36.
- Resources: 14.
- Sitemap: 75.

No dependency was installed or upgraded, and no audit-fix command was run.

## SiteGround decommission conclusion

The public DNS chain, official frontend, CMS REST, WordPress login, media, schema, and deployment path no longer depend on SiteGround. The `cms` child-zone delegation was removed in B7.1, and Cloudflare now answers the CMS A record directly. SiteGround hosting cancellation therefore does not remove an active production or rollback component.

No attempt was made to restore, re-enable, or reconnect SiteGround.

## Deferred recommendations

1. Approve and implement an encrypted off-instance daily WordPress database and uploads backup with documented retention and quarterly restore tests.
2. Decide whether to enable Lightsail automatic snapshots after reviewing recurring storage cost and desired retention.
3. Retain Cloudflare Pages for a defined observation period, then separately decide whether to disconnect Git or delete the project. Automatic deployments are already disabled.
4. Monitor storage, Certbot timer execution, runner state, CMS REST, HTTP 5xx, and backup age with alerts.
5. Keep the legacy `ybj_` tables untouched until a separate database cleanup plan and verified rollback window are approved.

## Final decision

AWS Migration Phase B7 passed. The production frontend and CMS are stable on AWS, DNS authority is fully Cloudflare-managed without SiteGround delegation, accepted SEO and content baselines remain intact, deployment and rollback controls are available, verified migration backups and snapshots are retained, the stale temporary rollback server is removed, and Cloudflare Pages automatic deployments are disabled without deleting the project.

The new production baseline for future SEO and feature work is AWS Lightsail plus the public AWS WordPress CMS and the repository-level GitHub Actions deployment workflow.
