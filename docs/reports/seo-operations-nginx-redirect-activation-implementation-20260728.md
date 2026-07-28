# SEO Operations — Nginx Redirect Activation Implementation

Date: 2026-07-28

Status: implemented and locally validated for an independent infrastructure
commit; not pushed or deployed

Baseline commit: `30b258105ddf96d47bc680fd8fb2ba76b4e29929`

## 1. Objective

Connect the versioned production site template
`deploy/nginx/dualcorelink.com.conf.template` to the AWS static deployment
workflow without changing page content, SEO metadata, Schema, canonical,
robots, sitemap, or Phase 3B-3 files.

The implementation addresses the audited gap in which the static release was
activated and Nginx was reloaded, but the repository site configuration was
never installed under `/etc/nginx`.

## 2. Modified Files

| File | Purpose |
|---|---|
| `.github/workflows/aws-production-deploy.yml` | Activate the versioned site template after static release activation and verify the two production redirects |
| `deploy/scripts/activate-nginx-site-root.sh` | Fixed-scope, root-only site configuration activation and rollback helper |
| `tests/nginx-activation.test.ts` | Workflow, privilege-boundary, atomic activation, rollback, and redirect verification tests |
| `docs/reports/seo-operations-nginx-redirect-activation-implementation-20260728.md` | Implementation and validation record |
| `docs/reports/latest-status.md` | Current phase, validation, risks, and next-action handoff |

The preceding audit report remains:

`docs/reports/seo-operations-nginx-redirect-deployment-audit-20260728.md`

## 3. Activation Flow

The production workflow now performs these operations after the static release
has been activated:

1. Locate the repository helper and fixed installed helper:
   - repository:
     `deploy/scripts/activate-nginx-site-root.sh`
   - installed:
     `/usr/local/sbin/dualcorelink-activate-nginx-site`
2. Run `bash -n` on the repository helper.
3. Compare SHA-256 hashes of the repository and installed helpers.
4. Fail closed if the installed helper is missing, non-executable, or stale.
5. Invoke only the installed helper through `sudo -n`, passing the checkout
   root and full Actions source SHA.
6. Verify both public source URLs return an exact `301` with the approved
   `Location`.
7. Follow at most one redirect and require the exact target URL to return
   `200`.

The static deployment script and atomic static release activation are
unchanged.

## 4. Helper Security Boundary

The new helper:

- requires root;
- accepts only the repository root and a full 40-character source SHA;
- requires repository `HEAD` to equal the requested SHA;
- rejects a site template that differs from the committed SHA;
- derives the candidate from the fixed repository path rather than accepting a
  destination argument;
- writes only `/etc/nginx/sites-available/dualcorelink.com`;
- requires `/etc/nginx/sites-enabled/dualcorelink.com` to resolve to that exact
  file;
- requires the current static release to be a direct child of
  `/srv/dualcorelink/frontend/releases`;
- verifies both redirect target artifacts exist before changing Nginx;
- does not read or output credentials.

The workflow does not call `sudo cp`, `sudo mv`, `sudo nginx`, or
`sudo systemctl`. It requests only the fixed helper capability.

## 5. Atomic Installation and Rollback

When the candidate and live hashes differ, the helper:

1. Creates a timestamped backup beside the live site file.
2. Installs the candidate as root-owned mode `0644` into a temporary file in
   the destination directory.
3. Atomically renames the temporary file over the live site file.
4. Runs `nginx -t`.
5. Reloads Nginx only after syntax validation passes.
6. Verifies both redirects directly against local HTTPS using
   `dualcorelink.com:443:127.0.0.1`.
7. Verifies the active file hash matches the committed candidate.

If syntax validation, reload, local redirect verification, or active-hash
verification fails, the helper atomically restores the saved file, validates
the restored configuration, and reloads Nginx again.

If the repository and live template hashes already match, the helper exits
without replacing or reloading the configuration.

## 6. Redirect Contract

| Source | Required first response | Required target |
|---|---:|---|
| `https://dualcorelink.com/solutions/oem-odm-custom-panel-solution/` | `301` | `https://dualcorelink.com/en/solutions/oem-odm-custom-panel-solution/` |
| `https://dualcorelink.com/resources/hotel-rcu-wiring-system-architecture-guide/` | `301` | `https://dualcorelink.com/en/resources/hotel-rcu-wiring-system-architecture-guide/` |

Each target must return `200` after exactly one redirect. The workflow does not
accept a redirect chain or a different host/path.

## 7. Validation

| Check | Result |
|---|---|
| Workflow YAML parse | Passed using the installed `js-yaml` parser |
| Focused TypeScript infrastructure suite | Passed, 11/11 |
| Workflow step ordering | Passed: static release, Nginx activation, redirect verification, test-domain check |
| Restricted sudo contract | Passed: no direct privileged copy, move, Nginx, or systemctl command |
| Helper Bash syntax | Passed with `bash -n` in a disposable Linux container |
| Successful activation simulation | Passed; committed candidate replaced the fixed live site file |
| Matching-hash simulation | Passed; helper reported no change and did not reload |
| Failure rollback simulation | Passed; simulated first `nginx -t` failure restored and reloaded the previous configuration |
| Exact redirect contract | Passed in static workflow/template tests for both source/target pairs |
| `git diff --check` | Passed |

No production redirect result is claimed by this report because deployment was
explicitly prohibited.

## 8. Host Bootstrap Requirement

Before the modified workflow can run successfully, an operator must perform a
one-time reviewed host bootstrap:

1. Install the reviewed helper as:
   `/usr/local/sbin/dualcorelink-activate-nginx-site`
2. Set owner/group to `root:root` and mode to `0755`.
3. Allow the production runner to invoke only that fixed executable through
   non-interactive sudo.
4. Confirm its SHA-256 equals the helper in the exact commit being deployed.

This bootstrap is intentionally not attempted by the repository workflow. It
prevents a mutable workflow checkout from granting itself broader root
permissions or replacing its own privileged wrapper.

## 9. Risks

| Risk | Control / retained status |
|---|---|
| Installed helper is missing or stale | Workflow fails before touching Nginx |
| Candidate has invalid Nginx syntax | `nginx -t` failure triggers automatic restoration |
| Reload fails | Previous site file is restored and reload is retried |
| Wrong site is modified | Source and destination are fixed; active symlink must match |
| Redirect target artifact is absent | Activation fails before replacing the live file |
| External/CDN behavior differs from local Nginx | Workflow performs a second public exact-redirect check |
| Root capability becomes too broad | No general sudo commands are introduced; only the fixed helper is invoked |
| Static deployment regresses | Existing static deployment scripts are unchanged |

The main retained operational risk is the one-time host bootstrap. The next
release must not begin until the installed helper hash and narrowly scoped sudo
rule have been reviewed.

## 10. Protected Scope

No changes were made to:

- page content or SEO content;
- Title or meta description;
- Product, Article, Organization, ContactPoint, or Breadcrumb Schema;
- canonical or hreflang;
- robots;
- sitemap or sitemap generation;
- Phase 3B-3 implementation files;
- static release scripts;
- credentials or dependencies.

## 11. Release Decision

The repository implementation is ready for an isolated infrastructure commit
and human review. It is not yet ready to execute on the runner until the fixed
helper is installed and allowlisted on the host.

No push or deployment was performed.
