# AWS Migration Phase B5 - Production Cutover Preparation

Date: 2026-07-15
Repository: `vm777ls500-png/dualcorelink-web`
Implementation commit: `1e1a354b98bd4e9543687a5962ddd8d4a0bc9155`

## 1. Objective and scope

Phase B5 prepared the AWS Lightsail test stack for a controlled production cutover without changing production DNS, production traffic, Cloudflare Pages Production, the SiteGround WordPress content, or the canonical CMS URL. Work included a final SiteGround backup, backup comparison, cutover/freeze planning, production Nginx templates, a least-privilege repository runner, an atomic static release workflow, and release/rollback testing against `aws.dualcorelink.com` only.

## 2. Lightsail snapshot

- Instance: `dualcorelink-production`
- Region: Singapore
- Static IPv4: `52.74.68.63`
- Manual snapshot: `dualcorelink-pre-production-cutover-20260715`
- Created: 2026-07-15 20:20 (UTC+8)
- State observed in Lightsail: available
- Existing and automatic snapshots were retained; none were deleted.

## 3. Final SiteGround backup

Local ignored backup directory:

`backups/aws-wordpress-migration-b5-final-20260715/`

Backup window: 2026-07-15 12:30:43Z to 12:31:24Z.

| Artifact | Size (bytes) | SHA256 |
| --- | ---: | --- |
| `wordpress-database-final-20260715.sql` | 1,041,011 | `43fcd6864f93b044289f06d704b5350065370b899c70f4bb8d813d193b23d075` |
| `wordpress-uploads-final-20260715.tar.gz` | 1,079,279,021 | `69fad7060d1b01ea2657fa9e05ae476e1dcafa9f3bffc2b42bc5d512d2f033c3` |
| `wordpress-plugins-final-20260715.txt` | 259 | `7d77cffa9d1af2bc1ca27fb52c1990ccdd09ea64c1cab4e01a248bdb675512af` |
| `wordpress-themes-final-20260715.txt` | 131 | `7450c6e51c3f561eca2b4a3b12d7cbeaf630efa469f7b6fb81c6a00f8c72f6a1` |
| `wordpress-environment-final-20260715.txt` | 433 | `664695a0367f98fc404514ece41472753b3a1840b605940706c1f8a5cae7714e` |
| `SHA256SUMS` | 522 | recorded locally |
| `manifest.md` | 495 | `d99044f48f853cbbe105180a87fc277552f4cc3dd75a673f15fa3e1140bf47d8` |

Validation:

- SQL, uploads archive, plugin list, theme list, environment list, and manifest are non-empty.
- Local and remote SHA256 values matched.
- Upload archive is readable and rooted at `uploads/`.
- Upload archive contains 1,022 files, 5 directories, and 1,027 total archive entries.
- Final content inventory: Products 36, Solutions 6, Media 132, Categories 10.
- Backup artifacts remain ignored and were not staged or committed.

The remote B5 uploads artifact had the same size and SHA256 as the already verified B2 archive. To avoid a second unnecessary 1.08 GB transfer, the verified B2 archive was copied into the B5 local backup directory and re-hashed against the remote B5 checksum.

## 4. Temporary SiteGround SSH authorization

- Temporary key name: `dualcorelink-b5-temporary-backup`
- The temporary private key can no longer authenticate to SiteGround (`publickey` authentication fails).
- The established local key file `siteground_dualcorelink` still authenticates and reaches the expected CMS home URL.
- A refreshed SiteGround SSH Keys Manager view still displayed the temporary key name as a manager entry during final verification. This is an open cleanup observation even though authentication is revoked; B6 must confirm the manager entry is absent before cutover.
- No private key, full public key, password, token, or cookie was written to this report or Git.

## 5. B2 versus B5 comparison

| Check | B2 | B5 | Result |
| --- | ---: | ---: | --- |
| SQL size | 1,073,615 bytes | 1,041,011 bytes | B5 is 32,604 bytes smaller |
| Upload archive size | 1,079,279,021 bytes | 1,079,279,021 bytes | identical |
| Upload SHA256 | `69fad706...2f033c3` | `69fad706...2f033c3` | identical |
| Upload files | 1,022 | 1,022 | identical |
| Products | 36 | 36 | unchanged |
| Solutions | 6 | 6 | unchanged |
| Media | 132 | 132 | unchanged |
| Categories | 10 | 10 | unchanged |
| Plugin inventory | same hash | same hash | unchanged |
| Theme inventory | same hash | same hash | unchanged |

The SQL comparison showed four inserted/removed lines and only the `wp_options` insert changed. No product, solution, media, category, post, postmeta, term, or relationship content delta was identified. No SiteGround-only uploads, plugin, or theme delta was found.

## 6. CMS freeze plan for B6

Freeze starts at B6 cutover window T-60 minutes. The site owner/content owner announces and owns the editorial freeze; the migration operator owns final backup, synchronization, verification, and rollback.

During the freeze, do not:

- create, edit, delete, publish, unpublish, or reorder Products, Solutions, Media, FAQs, Resources, Downloads, Regions, taxonomies, slugs, or menus;
- install, remove, activate, deactivate, or update plugins/themes/WordPress/PHP;
- change permalinks, ACF groups, REST exposure, users, caches, CDN settings, or SiteGround configuration;
- upload media or run bulk tools/imports.

Final synchronization sequence:

1. Confirm the freeze with the content owner and record the UTC and Singapore timestamps.
2. Recheck SiteGround REST counts and the editor activity window.
3. Export final SQL and uploads delta, hash both, and retain the B5 baseline.
4. Import/synchronize only into the prepared AWS CMS, perform serialized URL replacement, and confirm no SiteGround/test URL residue outside permitted GUID fields.
5. Validate Products 36, Solutions 6, Media 132, ACF, images, REST routes, wp-admin, and the static frontend build.
6. Obtain the explicit B6 DNS/cutover authorization before any production record change.
7. Run production health, SEO, schema, form/contact, responsive, log, and TLS checks before unfreezing.

Failure/unfreeze flow:

1. Stop the cutover and do not delete SiteGround or AWS staging assets.
2. Restore the previous DNS targets if they were changed and wait for authoritative/public resolution.
3. Restore the previous frontend `current` symlink if required.
4. Confirm Cloudflare Pages and SiteGround production health, then notify the content owner that editing may resume on SiteGround.
5. Preserve failure logs and hashes; do not retry without a reviewed cause and a new approval window.

## 7. Production Nginx templates

- `deploy/nginx/cms.dualcorelink.com.conf.template`
- `deploy/nginx/dualcorelink.com.conf.template`

The templates are prepared but not enabled. They contain no secrets. They reference the planned production certificate paths, protect WordPress configuration/backup files and executable uploads, use PHP 8.3 FPM for CMS, and serve the frontend from `/srv/dualcorelink/frontend/current`. Existing test-site noindex configuration was not removed or altered.

## 8. HTTPS and DNS-01 plan

Cloudflare DNS-01 is preferred for B6. A future token must be limited to the `dualcorelink.com` zone with only `Zone:DNS:Edit` and `Zone:Zone:Read`, stored outside Git in a root-owned mode `0600` credentials file. No token was created, viewed, or stored in B5.

Important delegation constraint: `cms.dualcorelink.com` is currently delegated to SiteGround nameservers. A parent-zone Cloudflare DNS token cannot create an authoritative `_acme-challenge.cms.dualcorelink.com` TXT record while that delegation remains. B6 must either create the TXT challenge in the SiteGround-authoritative child zone or end the child delegation under an approved DNS change before issuing the CMS certificate through Cloudflare DNS-01.

B6 certificate sequence:

1. Confirm the authoritative zone for each requested name.
2. Create the least-privilege credential file outside the repository.
3. Install the official Certbot Cloudflare DNS plugin if not already present.
4. Issue certificates for `dualcorelink.com` plus `www.dualcorelink.com`, and separately for `cms.dualcorelink.com` using its authoritative DNS path.
5. Run `nginx -t` before enabling any production template.
6. Verify trusted TLS and the complete certificate chain before DNS cutover.
7. Verify the Certbot renewal timer and run a renewal dry run.
8. Remove temporary DNS challenge records and retain only the protected credential file needed for renewal.

## 9. DNS inventory and TTL recommendation

Read-only public inventory at B5:

- `dualcorelink.com`: proxied Cloudflare addresses, public TTL 300; Cloudflare record targets the Pages project.
- `www.dualcorelink.com`: proxied Cloudflare addresses, public TTL 300; Cloudflare record targets the Pages project.
- `cms.dualcorelink.com`: delegated to `ns1.siteground.net` and `ns2.siteground.net`, NS TTL 300; child-zone A responses use SiteGround/CDN addresses with TTL 30.
- `aws.dualcorelink.com`: A `52.74.68.63`, public TTL 300.
- `cms-aws.dualcorelink.com`: A `52.74.68.63`, public TTL observed at 145/300 depending on cache age.

No DNS record was changed. For B6, keep the cutover records at Auto/300 seconds or lower them to 300 seconds at least one full previous TTL before the window. Do not alter nameservers. Record the exact pre-cutover values and proxy mode before any authorized change.

## 10. GitHub repository runner

- Scope: repository-level only, `vm777ls500-png/dualcorelink-web`
- Runner version: `2.335.1`
- Official package source: GitHub Actions runner release
- Official package SHA256 verified: `4ef2f25285f0ae4477f1fe1e346db76d2f3ebf03824e2ddd1973a2819bf6c8cf`
- User: `github-runner`, UID 999
- Home: `/opt/actions-runner`
- Password: locked
- Primary group: `dualcorelink-deploy`
- Labels: `self-hosted`, `linux`, `x64`, `dualcorelink-production`
- GitHub state: Online/Idle
- Service: `actions.runner.vm777ls500-png-dualcorelink-web.dualcorelink-production.service`
- Service state: enabled and active
- No organization-level or enterprise-level runner was created.

The runner registration token was passed once through a loopback-only in-memory handoff, was not printed or written to disk, and was cleared after use.

## 11. Least-privilege deployment authorization

- Runner-owned work area: `/opt/actions-runner/_work`
- Writable release area: `/srv/dualcorelink/frontend/releases` through group `dualcorelink-deploy`
- Build environment: `/srv/dualcorelink/frontend/shared/build.env`, owner `deploy`, group `dualcorelink-deploy`, mode `0640`
- Build environment contains the approved test REST source `https://cms-aws.dualcorelink.com/wp-json`; no value is stored in Git.
- Root wrapper: `/usr/local/sbin/dualcorelink-activate-release`, owner `root:root`, mode `0755`
- Sudo authorization: only `NOPASSWD: /usr/local/sbin/dualcorelink-activate-release`
- `visudo -c`: passed for the global file and all sudoers fragments.

The wrapper accepts only `activate` or `rollback` and a canonical direct child of `/srv/dualcorelink/frontend/releases`. It requires `index.html` and `sitemap.xml`, atomically replaces the frontend `current` symlink, runs `nginx -t`, reloads Nginx, and restores the previous release if activation fails. `/tmp` and other outside paths are rejected. It provides no arbitrary shell, wildcard sudo, `sudo su`, WordPress/database ownership, or secrets access.

## 12. Workflow and deployment script

- Workflow: `.github/workflows/aws-production-deploy.yml`
- Deployment script: `deploy/scripts/deploy-static.sh`
- Root wrapper source: `deploy/scripts/activate-release-root.sh`

Workflow controls:

- triggers only on `workflow_dispatch` or a push to `main` (docs-only pushes ignored);
- repository contents permission is read-only;
- production deployment concurrency prevents overlapping runs;
- checks out the exact `${{ github.sha }}` without persisting credentials;
- runs `npm ci`, lint, data tests, and static build;
- requires 155 generated static pages;
- deploy gate requires Products 36, Resources 14, Sitemap 75, Article 14, BreadcrumbList 14, and Product JSON-LD 36;
- deploys only to the test hostname and verifies its noindex header.

Deployment script controls:

- `set -euo pipefail` and refuses root execution;
- validates source SHA, source directory, required artifacts, schema/page counts, and forbidden environment leakage;
- copies to a new commit-plus-timestamp release, then invokes the fixed root wrapper;
- runs local and external HTTPS health checks;
- restores the previous symlink if a post-switch health check fails;
- does not print `build.env` or secrets;
- retains all releases; the test confirmed at least the latest three remain available.

## 13. AWS test-domain deployment exercise

Target: `https://aws.dualcorelink.com/en/` only.

The test used the `github-runner` account, the repository deployment script, the installed root wrapper, and a locally validated export. Results:

- Failure precheck used an intentionally incorrect expected product count and exited `1`.
- Failed validation left `current` unchanged at `/srv/dualcorelink/frontend/releases/4ed5cb32bbc6-20260715-185332` and left the release count at 2.
- Successful release: `/srv/dualcorelink/frontend/releases/477dd3bbe04a-20260715-212538`.
- Successful source SHA: `477dd3bbe04a3144c45e8b035580b6bf3158fdc8`.
- Local HTTPS health check: passed first attempt.
- External HTTPS health check: passed first attempt.
- Test domain: HTTP 200.
- `X-Robots-Tag`: `noindex, nofollow, noarchive` retained.
- Rollback switched to `4ed5cb32bbc6-20260715-185332`, remained HTTP 200, then the latest release was restored.
- Unsafe `/tmp` activation request exited `1` and did not change `current`.
- Release count after the exercise: 3 (`b4-placeholder`, the previous B4 release, and the new B5 release).
- Nginx configuration validation passed throughout.

At the time this report commit was prepared, the workflow file had not yet been pushed to GitHub. The equivalent runner-user deployment exercise passed; the push-triggered GitHub Actions run is a mandatory post-push acceptance item and its run URL/result must be recorded in the final task response.

## 14. Local QA

- `npm.cmd run lint`: passed.
- `WORDPRESS_REST_ROOT=https://cms-aws.dualcorelink.com/wp-json npm.cmd run test:data`: 36/36 passed.
- `WORDPRESS_REST_ROOT=https://cms-aws.dualcorelink.com/wp-json npm.cmd run build`: passed.
- Static generation: 155/155.
- Products: 36.
- Resources: 14.
- Sitemap URLs: 75.
- Article JSON-LD: 14/14.
- BreadcrumbList: 14/14.
- Product JSON-LD: 36/36.
- Shell syntax checks for both deployment scripts: passed on Ubuntu.
- `git diff --check` / staged diff check: passed; only expected Windows line-ending notices were observed.

## 15. Changes and non-actions

Repository implementation files:

- `.github/workflows/aws-production-deploy.yml`
- `deploy/nginx/cms.dualcorelink.com.conf.template`
- `deploy/nginx/dualcorelink.com.conf.template`
- `deploy/scripts/deploy-static.sh`
- `deploy/scripts/activate-release-root.sh`

This report is the only documentation file added for B5.

Not performed:

- no production DNS or nameserver change;
- no production traffic switch;
- no Cloudflare Pages Production change or overwrite;
- no SiteGround WordPress content modification;
- no canonical `cms.dualcorelink.com` URL change;
- no database import, restore, or destructive operation;
- no firewall, SSH daemon, database listener, or port change on AWS;
- no SiteGround shutdown/deletion;
- no production Nginx template enablement;
- no production certificate issuance;
- no secret, private key, database password, or runner token committed.

## 16. Risks and B6 prerequisites

1. SiteGround manager still displayed the revoked temporary key record; remove/confirm absence before B6.
2. The GitHub workflow must complete a real push-triggered run successfully after the final B5 push.
3. B6 requires explicit human approval for CMS freeze start, final synchronization, DNS changes, certificate credential creation, Nginx production enablement, and traffic cutover.
4. The CMS DNS delegation requires a deliberate authoritative DNS-01 plan before certificate issuance.
5. Keep SiteGround, B5 backups, Lightsail snapshots, and the test environment intact until production stability is confirmed.
6. The deployment script deliberately retains releases; disk utilization needs an approved retention policy after the migration.

## 17. Phase status at report creation

B5 infrastructure preparation, runner setup, least-privilege deployment controls, local QA, and test-domain release/rollback exercises passed. Final closure depends on confirming removal of the visible temporary SiteGround key record and the first real GitHub Actions run after the single final push.
