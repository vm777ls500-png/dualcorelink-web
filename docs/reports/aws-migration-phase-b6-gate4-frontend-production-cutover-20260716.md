# AWS Migration Phase B6 Gate 4 - Frontend Production Cutover

Date: 2026-07-16
Operator: Codex and the site owner, acting under the approved staged cutover authorization
Gate status: Passed

## Scope and safety boundary

Gate 4 moved the official static frontend hostnames, `dualcorelink.com` and `www.dualcorelink.com`, from Cloudflare Pages to the AWS Lightsail production server at `52.74.68.63`. It rebuilt the accepted source against the official AWS CMS, created and atomically activated a production release, enabled the reviewed production Nginx virtual host, issued the official frontend certificate, changed only the apex and `www` DNS records, and ran production SEO, schema, link, image, responsive, security, and rollback checks.

This gate did not delete or stop Cloudflare Pages, SiteGround, the AWS test sites, backups, snapshots, historical releases, or staging. It did not modify `cms.dualcorelink.com`, email DNS records, WordPress content, MariaDB data, the CMS URL, dependencies, or the accepted Phase 2E content. The CMS freeze remains active.

## Preconditions and rollback points

- Source SHA: `8d28e578acd5faa18c14f195a6d20a8cdd217c16`.
- Git before cutover: `main...origin/main`, clean worktree.
- Lightsail instance: `dualcorelink-production`, Singapore, static IPv4 `52.74.68.63`.
- Gate 4 snapshot: `dualcorelink-pre-frontend-cutover-20260716`.
- Snapshot status: completed and listed as a normal manual snapshot before production changes.
- Previous frontend release: `/srv/dualcorelink/frontend/releases/98ec80644b7a-20260715-214019`.
- Previous and current releases were retained throughout the gate.
- Cloudflare Pages remained available as the DNS rollback target.
- Gate 2 and Gate 3 CMS/database rollback artifacts remained unchanged.

## Build source correction

The AWS runner build environment still referenced the test CMS before the gate. Its secrets file was backed up to:

`/srv/dualcorelink/frontend/shared/build.env.before-b6-gate4-20260716`

The active non-Git build setting was changed to the official public CMS REST root:

`https://cms.dualcorelink.com/wp-json`

An initial command typo briefly produced a trailing `n` in the value. It was detected immediately by exact-string validation, corrected before any build or release activation, and never entered Git or production output.

Final build-output leakage checks found zero references to `cms-aws`, `aws.dualcorelink.com`, SiteGround, localhost, `127.0.0.1`, or `pages.dev`. Output references used the official HTTPS CMS origin.

## Production build

The exact source SHA was fetched into the detached AWS build worktree:

`/srv/dualcorelink/shared/frontend-build-8d28e578acd5`

Results:

- `npm ci`: passed.
- `npm run lint`: passed.
- `npm run test:data`: passed, 36/36.
- `npm run build`: passed.
- Static export: 155/155 pages.
- Products: 36.
- Resources: 14.
- Sitemap URLs: 75.
- Article JSON-LD: 14/14.
- BreadcrumbList JSON-LD: 14/14.
- Product JSON-LD: 36/36.
- Localhost/test-host leakage: 0.

`npm ci` reported seven audit findings (one low, two moderate, and four high). No `npm audit fix` command was run and no dependency was changed during cutover.

## Production release and activation

Created release:

`/srv/dualcorelink/frontend/releases/8d28e578acd5-production-20260716-031217`

Validated artifact hashes:

- `index.html`: `96200045bf204d58ae0b97f93f4195fa5ebc380192c87a90955ec482d67a0c45`.
- `sitemap.xml`: `4d9028bd0cec7cd50dae2627592a41112e383eaab03c7640a2d4672cd829e04e`.
- `robots.txt`: `20d225d8bfe2d3fb7d52daf5623d7d5756ee8e8eaa6fc5895a8456782e2b98f7`.

Required files and directories were present: `index.html`, 404 output, `sitemap.xml`, `robots.txt`, products, resources, and Next.js assets.

The root-owned activation wrapper atomically changed `/srv/dualcorelink/frontend/current` from the previous release to the new release only after local and host-header health checks passed. `nginx -t` and the post-switch health checks passed. No automatic rollback was triggered.

Final current symlink:

`/srv/dualcorelink/frontend/releases/8d28e578acd5-production-20260716-031217`

Five releases remained available after activation.

## Production Nginx

The reviewed repository template `deploy/nginx/dualcorelink.com.conf.template` was installed as:

`/etc/nginx/sites-available/dualcorelink.com`

and enabled through `/etc/nginx/sites-enabled/dualcorelink.com`.

Configuration behavior:

- Static root: `/srv/dualcorelink/frontend/current`.
- `www` permanently redirects to the apex HTTPS hostname.
- HTTP serves only the ACME webroot directly and redirects other requests to HTTPS.
- Static export fallback, 404 handling, asset cache headers, and compression are enabled.
- The production host has no `X-Robots-Tag: noindex` response.
- `aws.dualcorelink.com` remains separate and retains its noindex header.
- The CMS virtual hosts were not changed.
- Production access log: `/var/log/nginx/dualcorelink-production-access.log`.
- Production error log: `/var/log/nginx/dualcorelink-production-error.log`.

`nginx -t` passed before enablement, after reload, after release activation, and during final verification.

## Frontend certificate and renewal

The official ECDSA certificate covers only:

- `dualcorelink.com`
- `www.dualcorelink.com`

Certificate state:

- Cert name: `dualcorelink.com`.
- Valid until: `2026-10-13 18:42:57 UTC`.
- Full chain: `/etc/letsencrypt/live/dualcorelink.com/fullchain.pem`.
- Private key: `/etc/letsencrypt/live/dualcorelink.com/privkey.pem`.
- No wildcard or CMS hostname was included.

The certificate was initially issued with a one-time manual DNS-01 challenge. After DNS cutover and public HTTP challenge validation, the renewal configuration was backed up and converted to:

- `authenticator = webroot`
- `pref_challs = http-01`
- `webroot_path = /var/www/dualcorelink`

The first `certbot reconfigure` attempt failed safely because the retained manual configuration still preferred DNS-01. No active certificate or renewal file was damaged. A single evidence-based retry with the HTTP preferred challenge succeeded. `certbot renew --cert-name dualcorelink.com --dry-run` passed, `certbot.timer` is enabled and active, and `nginx -t` remained valid.

The two one-time `_acme-challenge` TXT records remain as non-functional cleanup items because this gate did not include an explicit DNS deletion authorization. They are not used by the final webroot renewal configuration and contain no reusable credential.

## DNS old and new state

Original Cloudflare records:

- Apex: CNAME to `dualcorelink-web.pages.dev`, proxied, TTL Auto.
- `www`: CNAME to `dualcorelink-web.pages.dev`, proxied, TTL Auto.

Final records:

- Apex: CNAME to `aws.dualcorelink.com`, DNS only, TTL Auto; Cloudflare apex flattening returns `52.74.68.63`.
- `www`: CNAME to `dualcorelink.com`, DNS only, TTL Auto; public resolution returns `52.74.68.63`.
- No apex or `www` AAAA record was added.

Cloudflare authoritative DNS and Google public DNS returned the AWS IPv4 address. A short local resolver/cache interval continued to return the old Cloudflare path during propagation; it cleared within the observed TTL and was non-blocking. Public responses then reported AWS Nginx, with apex HTTPS 200 and `www` HTTP 301 to the apex.

No MX, SPF, DKIM, DMARC, mail, CMS, or unrelated subdomain record was modified. The old record types, targets, proxy state, and TTL were retained in this report as the DNS rollback reference.

## DNS-independent prevalidation

Before public DNS changes, `curl --resolve` against `52.74.68.63` confirmed:

- HTTP ACME challenge path: 200 with the expected non-sensitive test content.
- Other HTTP paths: 301 to HTTPS.
- Apex and `www` certificates: trusted and hostname-matched without `-k`.
- Homepage, English homepage, Products, Resources, representative Resource, Solutions, sitemap, and robots: HTTP 200.
- `www`: 301 to the apex.
- Canonical, Article JSON-LD, and BreadcrumbList present on the representative Resource.
- Production noindex markers: 0.
- Test/CMS/localhost leakage: 0.

The temporary ACME precheck file was deleted after validation.

## Production HTTP, SEO, link, and image QA

The production sitemap was parsed and all 75 listed URLs were requested from the official hostname:

- HTTP 200: 75/75.
- Resource pages: 14.
- Product pages: 36.
- Article JSON-LD: 14/14.
- BreadcrumbList JSON-LD: 14/14.
- Product JSON-LD: 36/36.
- Empty `href="#"`: 0.
- Localhost, 127.0.0.1, SiteGround, test-host, and `pages.dev` leakage: 0.

All four Phase 2E production pages returned HTTP 200 and retained their title, body sections, mid-page CTA, Recommended Products, Relevant Solutions, Continue Reading, Project Inquiry CTA, product/solution/resource/contact/WhatsApp links, canonical, metadata, Article JSON-LD, and BreadcrumbList JSON-LD.

Phase 2E link and image checks:

- Unique internal targets: 42, all HTTP 200.
- Rendered image URLs: 9 unique URLs across the four pages, all HTTP 200 with image content types.
- Broken images: 0.

## Responsive production QA

The responsive check covered 12 production pages at 375, 390, 430, 768, and 1280 pixels:

- Core pages: homepage, Products, Product detail, Solutions, Regions, Resources, FAQ, and Contact.
- Phase 2E: four new Resource pages.
- Total cases: 60/60.
- Phase 2E cases: 20/20.

Across all cases:

- Document-level horizontal overflow: 0.
- Broken images: 0.
- Heading overflow: 0.
- Empty hash links: 0.
- H1 count: exactly one per page.
- Header, main content, footer, and buyer CTA: present.
- Contact form: present on Contact.
- Browser console errors: 0 on all 12 pages.

Representative 1280px and 375px screenshots confirmed readable Resource content, CTA layout, cards, and vertical spacing. The mobile header retains the existing horizontally scrollable navigation row and shows a partial next item at the viewport edge. It does not create document-level overflow and matches the accepted build artifact, but it remains a non-blocking design observation for a future dedicated navigation refinement.

## Security and service checks

- MariaDB listens only on `127.0.0.1:3306`.
- Public 3306 was not opened.
- UFW is active and allows only OpenSSH and Nginx Full for IPv4/IPv6.
- `.env`: HTTP 403.
- `wp-config.php`: HTTP 404.
- representative SQL path: HTTP 404.
- backups path: HTTP 404.
- PHP under CMS uploads: HTTP 403.
- Nginx, PHP 8.3 FPM, MariaDB, and Fail2ban: active.
- Failed systemd services: 0.
- Production Nginx error log: 0 lines at the security checkpoint.
- Production HTTP 5xx in the access log: 0 at the security checkpoint.

## Rollback validation

Rollback paths were retained without changing production traffic:

1. Cloudflare DNS can be restored to the recorded proxied `dualcorelink-web.pages.dev` CNAME targets.
2. The root-owned activation wrapper can atomically restore the previous AWS release after `nginx -t` and health checks.

The previous release `/srv/dualcorelink/frontend/releases/98ec80644b7a-20260715-214019` was served through an isolated loopback-only temporary HTTP server and returned HTTP 200 for `/en/`. The test server was terminated after the check. The production `current` symlink was not changed during this rollback validation and continued to point to the new release.

## Thirty-minute production observation

The observation ran at 0, 5, 10, 15, 20, 25, and 30 minutes, from `2026-07-16T04:52:04+08:00` through `2026-07-16T05:22:06+08:00`. It checked the English homepage, representative Product, representative Phase 2E Resource, sitemap, CMS REST root, Nginx/PHP/MariaDB, memory, swap, disk, failed services, the production access log, and the production error log.

All seven checkpoints reported:

- English homepage: HTTP 200.
- Representative Product: HTTP 200.
- Representative Phase 2E Resource: HTTP 200.
- Sitemap: HTTP 200.
- CMS REST root: HTTP 200.
- Nginx: active.
- PHP 8.3 FPM: active.
- MariaDB: active.

Resource use remained stable:

- Used memory: approximately 823-840 MiB.
- Available memory: approximately 2.9 GiB.
- Swap: 2 GiB total, approximately 50 MiB used.
- Root disk: 77 GiB total, approximately 60 GiB available, 23% used.

Final operational checks:

- Production access-log HTTP 5xx: 0.
- PHP-FPM warnings during the observation window: 0.
- Failed systemd services: 0.
- Current symlink: the new production release.
- Rollback required: no.

The observation loop initially referenced an obsolete error-log filename. The active Nginx configuration was inspected independently and the correct production log was checked at the start and end. Its only final line was the expected `access forbidden by rule` entry created by the deliberate `/.env` security probe. Operational Nginx errors were 0.

## Retained systems and deferred work

- Cloudflare Pages remains available and was not deleted, stopped, or overwritten.
- SiteGround remains available and was not cancelled, stopped, or modified.
- The AWS test frontend and CMS hostnames remain available.
- Historical snapshots, releases, CMS backups, database backups, and runner state remain intact.
- CMS freeze remains active pending explicit release authorization.
- The two obsolete manual DNS-01 TXT records may be removed only under a separate narrow DNS cleanup authorization after confirming webroot renewal remains active.
- Monitor uptime, forms, images, logs, and certificate state over the next 24 hours.
- Retain SiteGround and Cloudflare Pages for 7-14 days as rollback layers.

## Gate decision

Gate 4 passed. The official apex and `www` hostnames resolve to AWS, the official certificate and webroot renewal path are valid, the accepted production release is active, all 75 sitemap URLs and the accepted schema baselines passed, responsive production QA passed 60/60, security and rollback checks passed, and the full 30-minute observation completed without an operational error or rollback.

The CMS freeze remains active. Cloudflare Pages and SiteGround remain retained as rollback layers pending a separately authorized stabilization and freeze-release decision.
