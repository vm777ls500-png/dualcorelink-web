# SEO Operations — GSC 404 Fix Implementation

Date: 2026-07-28

## Objective

Implement two exact, target-verified Nginx 301 rules for confirmed locale-less
GSC 404 URLs. The implementation was validated locally and approved for an
isolated four-file commit. It has not been pushed, activated, or deployed.

## Implemented Redirects

| Source | Destination |
|---|---|
| `/solutions/oem-odm-custom-panel-solution/` | `https://dualcorelink.com/en/solutions/oem-odm-custom-panel-solution/` |
| `/resources/hotel-rcu-wiring-system-architecture-guide/` | `https://dualcorelink.com/en/resources/hotel-rcu-wiring-system-architecture-guide/` |

Each destination was verified on production as HTTP 200 before
implementation. The nonexistent
`/en/resources/rcu-wiring-architecture/` candidate was not used.

## Implementation

`deploy/nginx/dualcorelink.com.conf.template` now contains an exact-match
location for each source in all three production server contexts:

1. HTTP apex and `www`
2. HTTPS `www`
3. HTTPS apex

Each rule:

- matches only the approved trailing-slash source;
- checks that the destination `index.html` exists in the active English
  static release;
- returns HTTP 301 directly to the final HTTPS apex `/en/` URL;
- returns 404 if the verified destination artifact is missing.

The exact targets do not match the source locations, so the rules do not form
a loop. No broad `/solutions/` or `/resources/` redirect was added.

## Modified Files

- `deploy/nginx/dualcorelink.com.conf.template`
- `tests/static-export.test.ts`
- `docs/reports/seo-operations-gsc-404-fix-implementation-20260728.md`
- `docs/reports/latest-status.md`

Pre-existing package, GSC/API, historical report, and Project Automation
worktree changes were preserved and were not modified by this implementation.

## Redirect Tests

The focused static-export test now verifies:

- both exact source paths;
- both exact full English destinations;
- destination-file existence guards;
- HTTP 301 declarations;
- coverage in all three server contexts;
- rejection of the broader `/en/solutions/` destination;
- rejection of the nonexistent shortened Resource destination.

Focused result:

- `npx tsx --test tests/static-export.test.ts`: 7/7 passed.

The current Windows environment does not provide an Nginx executable.
Configuration-level redirect tests passed, but `nginx -t` and live HTTP 301
responses remain mandatory activation-stage checks.

## Target and Static Output Verification

- Production OEM/ODM Solution target: HTTP 200.
- Production RCU wiring Resource target: HTTP 200.
- Static Solution target artifact: present.
- Static Resource target artifact: present.
- Static pages generated: 156/156.
- Static sitemap URLs: 76.
- `export:clean`: passed; eight sentinel/retired-locale directories checked.

Because deployment is forbidden in this phase, the two public source URLs
correctly remain HTTP 404 until a later approved Nginx activation.

## Protected-Surface Verification

No diff exists in:

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- canonical or hreflang helpers
- Schema components
- page content
- Phase 3B-3 production files

The implementation does not change:

- sitemap contents or count;
- canonical output;
- robots policy;
- Schema;
- English page routes;
- `export:clean`;
- Phase 3B-3 content or inquiry attribution.

## Validation Results

| Check | Result |
|---|---|
| Focused redirect/static-export tests | Passed, 7/7 |
| Lint | Passed; 0 errors, 2 pre-existing GSC warnings |
| First `test:data` attempt | 112/117; five tests could not reach the default local WordPress endpoint at `127.0.0.1:8080` |
| `test:data` with existing public CMS endpoint | Passed, 117/117 |
| Media audit | Passed; 0 errors, 1 existing warning |
| Build | Passed; 156/156 static pages |
| `export:clean` | Passed |
| Sitemap | 76 URLs |
| Target output files | 2/2 present |
| `git diff --check` | Passed before report closure |
| Nginx syntax test | Pending activation environment; Nginx is unavailable locally |
| Live source HTTP 301 | Pending deployment; not claimed in this phase |

The CMS endpoint override was set only for the validation process and was not
written to a file.

## Deployment Constraint

The existing static deployment workflow deploys `out/` and reloads the
already installed Nginx configuration. It does not automatically install the
repository Nginx template into `/etc/nginx/sites-available/`.

Before deployment, a separately approved task must define and verify the
controlled Nginx template activation step on the AWS self-hosted runner,
including:

- active-config backup;
- exact source SHA;
- template installation;
- `nginx -t`;
- reload;
- one-hop production verification;
- rollback on any failure.

Committing and pushing the template without activating the installed Nginx
configuration would not fix the public 404 responses.

## Risks

- The redirects are not active until the reviewed Nginx template is installed
  and reloaded on production.
- Missing a server context during activation could leave HTTP or `www`
  behavior inconsistent; tests require all three contexts.
- GSC may retain historical 404 rows after deployment until recrawl.
- A broad or manually edited rule outside Git would bypass the approved scope
  and must not be used.

## Status

Implementation and local validation are complete. This report is included in
the approved local commit scope. No push or deployment was performed. The next
step is review of the local commit and explicit approval of a controlled Nginx
activation workflow.
