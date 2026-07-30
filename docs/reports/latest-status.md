# DualCoreLink Current Status

Last updated: 2026-07-30

## Current Phase

**Conversion Reliability Phase 6C - Final Acceptance and Operations Handover**

Status: PASS. Server-side inquiry submission is production active. SES
production access is `GRANTED`, the controlled production QA passed, and the
operational handover is complete. The Contact form uses the same-origin
server-side path while retaining mailto and WhatsApp fallbacks.

This status file is the canonical short handoff entry point. Detailed evidence
remains in the phase reports under `docs/reports/`.

## Phase 6C Production Handover

- Phase 6C Final Acceptance: PASS
- Server-Side Inquiry Submission: Production Active
- SES Production Access: GRANTED
- Production QA: PASS
- Operational Handover: Complete
- CloudFormation stack: `UPDATE_COMPLETE`
- Lambda state: `Active`
- Lambda `DRY_RUN`: `false`
- API route: `POST /api/inquiry`
- public `GET /api/inquiry`: HTTP 404
- DynamoDB TTL: enabled
- CloudWatch retention: 14 days
- Nginx configuration test: passed
- failed services: 0
- GitHub Actions run: `30516771066`
- exact deployed SHA: `1d3cbb296321e089665b866a6e1dce82efb7c59e`
- production release:
  `/srv/dualcorelink/frontend/releases/1d3cbb296321-20260730-133155`
- pre-handover docs baseline:
  `4f3d4c301413cc4c8476cd83e3774b5a2ba77187`
- final handover docs commit: the commit containing this status update

Known nonblocking items:

- Production did not replay an identical idempotency key because Gate 5
  authorized only one production send; automated duplicate-path coverage and
  DynamoDB conditional writes remain in place.
- Custom MAIL FROM is not configured; SES default MAIL FROM is used.
- The Rotary Knob product still requires a genuine same-model reshoot.
- Existing dependency audit findings remain tracked separately.
- The repository has no generic `npm test` alias; the defined data and inquiry
  infrastructure suites pass when run explicitly.

Current operational reference:
`docs/runbooks/server-side-inquiry-operations.md`.

Final acceptance report:
`docs/reports/conversion-reliability-phase-6c-final-acceptance-20260730.md`.

## Completed

- GSC query URL cleanup was reconstructed in an isolated worktree from
  `origin/main`, without copying the original worktree's multilingual, GSC/API,
  dependency, CMS payload, native-review, or historical-report changes.
- Contact attribution now uses a strict whitelist, field-length limits,
  session isolation, a two-hour expiry, and safe legacy URL cleanup while
  preserving the existing GA4 and form attribution fields.
- Products category and series cards no longer emit query links. Filter state,
  scrolling, back/forward navigation, and valid legacy queries remain
  functional with a clean address.
- Release-candidate validation passed: 121/121 data tests, lint, media audit,
  156/156 build, 76-URL sitemap, standalone query export audit, browser QA, and
  diff check.
- Detailed implementation report:
  `docs/reports/seo-operations-gsc-query-url-cleanup-20260729.md`.
- SEO Growth Phase 3A was implemented, deployed, and production-verified.
  Implementation commit: `6cf8b46cbc3f88f07cb1b1e6d24af92ced9e6516`.
- SEO Authority Phase 1C safe entity corrections were completed.
  Implementation commit: `57d313fcb331f7cb9f81a375a8346cfdb86eaeef`.
- SEO Authority Phase 1D-B ContactPoint correction was completed and deployed.
  Implementation commit: `8511d7b3a7438c459755fc060f932913cb915279`.
- SEO Growth Phase 3B-1 through Phase 3B-2D analysis artifacts were prepared
  locally. The current worktree copies are not committed.
- Real GSC page-filtered query exports were analyzed for six priority pages.
- Four pages passed the Phase 3B-3 proposal gate:
  - `/en/solutions/`
  - `/en/products/`
  - `/en/products/rcu-controller-cabinet/`
  - `/en/resources/what-is-hotel-rcu-room-control-system/`
- The Phase 3B-3 implementation plan was prepared and approved. Minimal
  implementation is complete on:
  - `/en/solutions/`
  - `/en/products/`
  - `/en/products/rcu-controller-cabinet/`
  - `/en/resources/what-is-hotel-rcu-room-control-system/`
- Solutions now states its commercial system-selection role and links once to
  RCU technical fundamentals.
- Products now states its category-discovery role and links once to Solutions
  for system-level planning.
- The RCU Controller Cabinet now has a slug-scoped 65-word product answer,
  four project decision points, and one new RCU Resource path.
- The RCU Resource now distinguishes information, product, and system
  decisions within one existing section and its existing related-link
  descriptions.
- Title, meta description, Schema, canonical, hreflang, robots, sitemap,
  Organization, ContactPoint, and inquiry-attribution implementation remain
  unchanged.
- Static output retained 156 pages, 76 sitemap URLs, 36 Product Schema pages,
  and 15 Article Schema pages.
- The formal planning gate was reviewed and recorded in
  `docs/reports/seo-growth-phase-3b-3-implementation-approval.md`.
- The plan contains only the four admitted pages, preserves their distinct
  keyword ownership, and excludes Title, meta, Schema, crawl, entity, and
  inquiry-attribution changes.
- The existing candidate production diff was reviewed hunk by hunk and
  recorded in
  `docs/reports/seo-growth-phase-3b-3-patch-review-20260727.md`.
- All four candidate production files match the approved plan. No out-of-scope
  production hunk or required rollback was found.
- Package, GSC/API, earlier analysis, and Project Automation changes were
  classified as preserved prior-task work and must remain outside any future
  Phase 3B-3-only staging list.
- Shared `[locale]` listing sources generate legacy-locale intermediates, but
  the existing `export:clean` step removes all non-English locale directories;
  the final production artifact remains English-only.
- Final staging contained exactly the nine authorized Phase 3B-3 files.
- Final validation passed: lint with zero errors, 116/116 data tests, media
  audit with zero errors, a 156/156 static build, and cached diff checks.
- The Phase 3B-3 commit was created locally with message
  `seo: optimize priority pages from gsc insights`.
- The Phase 3B-3 commit was pushed to `origin/main`.
- GitHub Actions run `30326225219` completed successfully using source SHA
  `5400736006d6054e6b924cac82ff13d6642b532d`.
- The atomic production release completed at
  `/srv/dualcorelink/frontend/releases/5400736006d6-20260728-113509`.
- The deployment health check passed at `https://aws.dualcorelink.com/en/`,
  and the production site was verified at `https://dualcorelink.com/`.
- All four Phase 3B-3 pages returned HTTP 200 and passed Title, meta
  description, canonical, single-H1, expected Schema, BreadcrumbList, new
  content, new internal-link, and inquiry-attribution checks.
- Production retained 36/36 Product Schema pages, 15/15 Article Schema pages,
  76 sitemap URLs, one Organization entity, and the approved ContactPoint
  telephone `+8613703333750` with contact type `sales`.
- Production `robots.txt` remained available without localhost leakage,
  `llms.txt` remained absent, and all eight Phase 3A observation pages passed
  HTTP, canonical, H1, Schema, breadcrumb, and inquiry-attribution regression
  checks.
- The confirmed GSC 404 sources and their exact English targets were audited:
  - `/solutions/oem-odm-custom-panel-solution/`
    → `/en/solutions/oem-odm-custom-panel-solution/`
  - `/resources/hotel-rcu-wiring-system-architecture-guide/`
    → `/en/resources/hotel-rcu-wiring-system-architecture-guide/`
- Exact, destination-file-guarded Nginx 301 rules were added for both sources
  in the HTTP, HTTPS `www`, and HTTPS apex server contexts.
- Focused redirect tests passed 7/7. Full validation passed with 0 lint errors,
  117/117 data tests after using the existing public CMS endpoint, media audit
  with 0 errors, and a 156/156 build.
- Sitemap, robots, canonical, Schema, English page content, `export:clean`,
  and Phase 3B-3 files remain unchanged.
- The implementation report originally recorded a local-only state. The
  subsequent static release deployed successfully, but live HTTP 301 behavior
  remains unverified because Nginx activation did not occur.
- GSC 404 implementation commit:
  `30b258105ddf96d47bc680fd8fb2ba76b4e29929`.
- The commit was pushed to `origin/main`.
- GitHub Actions run `30333541308` completed successfully from the exact GSC
  404 source SHA.
- Static release:
  `/srv/dualcorelink/frontend/releases/30b258105ddf-20260728-140530`.
- Deployment URL: `https://aws.dualcorelink.com/en/`.
- Static production regression passed: sitemap 76, Product Schema 36/36,
  Article Schema 15/15, Phase 3B-3 pages 4/4, robots unchanged, and
  ContactPoint unchanged.
- Redirect activation did not occur. Both locale-less sources still return
  HTTP 404 while both exact `/en/` targets return HTTP 200.
- The production deployment is incomplete for the stated GSC 404 objective
  even though the static Actions job concluded successfully.
- The Nginx redirect deployment audit confirmed that the static release
  activator reloads the already-installed Nginx configuration but does not
  install the repository template.
- A fixed-scope root activation helper now validates the exact checkout SHA,
  committed template, active site symlink, and static target artifacts before
  changing `/etc/nginx/sites-available/dualcorelink.com`.
- The helper creates a backup, performs an atomic replacement, runs
  `nginx -t`, reloads Nginx, verifies both redirects over local HTTPS, and
  restores the previous file on validation, reload, local redirect, or
  active-hash failure.
- The AWS workflow now rejects a stale installed helper by SHA-256, invokes
  only the fixed helper through non-interactive sudo, and performs external
  exact-301 and one-hop-200 verification.
- Focused infrastructure tests passed 11/11. A disposable Linux container
  also passed helper syntax, activation, identical-config no-op, and
  `nginx -t` failure rollback tests.
- Smart Hotel Guide, AI Display, Saudi Arabia, and UAE remain unchanged under
  observation.
- Project Automation Phase 1 added a common status file, completion template,
  Codex closure rules, and GitHub-to-ChatGPT handoff instructions.

## Modified Files

Files updated by SEO Growth Phase 3B-3 Implementation:

- `docs/reports/latest-status.md`
- `docs/reports/seo-growth-phase-3b-3-implementation-report-20260727.md`
- `src/app/[locale]/products/page.tsx`
- `src/app/[locale]/solutions/page.tsx`
- `src/config/product-conversion.ts`
- `src/config/resources.ts`
- `tests/seo-growth-phase-3b-3.test.ts`

Files updated by the subsequent planning approval review:

- `docs/reports/latest-status.md`
- `docs/reports/seo-growth-phase-3b-3-implementation-approval.md`

No production file was modified by the planning approval review.

Files updated by the read-only patch review:

- `docs/reports/latest-status.md`
- `docs/reports/seo-growth-phase-3b-3-patch-review-20260727.md`

No production code, test, package, or configuration file was modified by the
patch review.

The final commit task updated only this status document in addition to the
already approved implementation, test, and report files.

The push and production-verification task updated only this status document
locally. It did not modify production code or the deployed commit.

Files updated by SEO Operations GSC 404 Fix Implementation:

- `deploy/nginx/dualcorelink.com.conf.template`
- `tests/static-export.test.ts`
- `docs/reports/seo-operations-gsc-404-fix-implementation-20260728.md`
- `docs/reports/latest-status.md`

No page, sitemap, robots, canonical, Schema, `export:clean`, or Phase 3B-3
production file was modified by the GSC 404 implementation.

Files updated by SEO Operations Nginx Redirect Activation Implementation:

- `.github/workflows/aws-production-deploy.yml`
- `deploy/scripts/activate-nginx-site-root.sh`
- `tests/nginx-activation.test.ts`
- `docs/reports/seo-operations-nginx-redirect-activation-implementation-20260728.md`
- `docs/reports/latest-status.md`

The preceding read-only audit also created:

- `docs/reports/seo-operations-nginx-redirect-deployment-audit-20260728.md`

No page, SEO content, Schema, canonical, robots, sitemap, Phase 3B-3, or
dependency file was modified by the activation implementation.

Pre-existing uncommitted worktree changes were preserved and were not created
by this phase:

- `package.json`
- `package-lock.json`
- untracked Phase 3B and GSC documents under `docs/reports/` and
  `docs/seo/gsc/`
- `scripts/seo/`
- `tests/gsc-api.test.ts`
- Project Automation Phase 1 documents under `docs/reports/`

No unapproved page, shared page template, dependency, SEO infrastructure file,
or deployment file was modified by this phase.

## Validation

| Check | Result |
|---|---|
| lint | Passed; 0 errors and 2 pre-existing GSC unused-variable warnings |
| focused tests | Passed, 5/5 |
| tests | `npm run test:data` passed, 116/116 |
| media audit | Passed; 0 errors and 1 existing warning |
| build | Passed; 156/156 static pages generated |
| deployment | Passed; GitHub Actions run `30326225219`, source SHA `5400736006d6054e6b924cac82ff13d6642b532d` |
| responsive QA | 4 pages × 4 widths = 16 checks; 0 horizontal-overflow failures |
| static HTML QA | Four pages passed Title, meta, canonical, H1, Schema, content, link, noindex, localhost, and inquiry-attribution checks |
| sitewide SEO QA | Product Schema 36, Article Schema 15, sitemap 76, `llms.txt` absent |
| `git diff --check` | Passed before report closure; included in final Git check |
| planning approval QA | Four-page scope, roles, queries, modification areas, links, metadata boundaries, Schema boundaries, and risks reviewed |
| patch diff QA | Four candidate production files reviewed; no out-of-scope production hunk and no required rollback |
| protected-surface QA | Title, meta, Schema, URL, canonical, robots, sitemap, Phase 3A, ContactPoint, Organization, and inquiry attribution unchanged |
| final staged scope | Exactly 9 approved files; GSC/API, historical analysis, and Project Automation files excluded |
| final cached diff | `git diff --cached --check` passed |
| production target-page QA | 4/4 HTTP 200; Title, meta, canonical, H1, Schema, BreadcrumbList, new content, internal links, and inquiry attribution passed |
| production sitewide QA | Product Schema 36/36; Article Schema 15/15; sitemap 76; Organization count 1; ContactPoint unchanged |
| production crawl controls | `robots.txt` HTTP 200 and unchanged by the commit; no localhost leakage; `llms.txt` HTTP 404 |
| Phase 3A production regression | 8/8 observation pages passed HTTP, canonical, H1, expected Schema, breadcrumb, and inquiry-attribution checks |
| GSC 404 redirect focused tests | Passed, 7/7; exact rules cover all three Nginx server contexts |
| GSC 404 implementation lint | Passed; 0 errors and 2 pre-existing GSC warnings |
| GSC 404 implementation tests | Passed, 117/117 with the existing public CMS endpoint; initial local-endpoint run was 112/117 because `127.0.0.1:8080` was unavailable |
| GSC 404 implementation media audit | Passed; 0 errors and 1 existing warning |
| GSC 404 implementation build | Passed; 156/156 static pages, 76 sitemap URLs, both target artifacts present |
| Protected SEO surfaces | No sitemap, robots, canonical, Schema, page-content, `export:clean`, or Phase 3B-3 diff |
| Nginx activation | Not performed; local Windows environment has no Nginx executable |
| GSC 404 Actions run | `30333541308` passed using source SHA `30b258105ddf96d47bc680fd8fb2ba76b4e29929` |
| GSC 404 static release | Passed; `/srv/dualcorelink/frontend/releases/30b258105ddf-20260728-140530` |
| GSC 404 source 1 | Failed production acceptance: HTTP 404, expected 301 |
| GSC 404 source 2 | Failed production acceptance: HTTP 404, expected 301 |
| GSC 404 targets | Passed: both exact `/en/` targets return HTTP 200 |
| Post-release regression | Passed: sitemap 76; Product Schema 36/36; Article Schema 15/15; Phase 3B-3 4/4; robots and ContactPoint unchanged |
| workflow YAML syntax | Passed with the installed `js-yaml` parser |
| activation workflow contract | Passed: helper hash gate, restricted sudo invocation, step ordering, and exact redirect checks |
| Nginx helper syntax | Passed with `bash -n` in a disposable Linux container |
| Nginx helper functional test | Passed: activation, hash-match no-op, and automatic rollback after simulated `nginx -t` failure |
| redirect infrastructure tests | Passed; focused `static-export` and Nginx activation suite 11/11 |
| production activation | Not run; no push or deployment in this commit-preparation task |
| query cleanup tests | Passed; 121/121 using the public read-only CMS |
| query cleanup lint | Passed; no errors |
| query cleanup media audit | Passed; 0 errors and 1 existing warning |
| query cleanup build | Passed; 156/156 static generation and 76 sitemap URLs |
| query cleanup static scan | 0 internal query hrefs and 0 sitemap/canonical/hreflang query URLs |
| query cleanup browser QA | Passed for tracked CTAs, filters, history, legacy URLs, session behavior, and 375px overflow |
| multilingual production gate | Passed; no `ar`, `zh`, `de`, `es`, `vi`, or `fa` output directories |

## Historical Git Status (2026-07-28)

| Field | Value |
|---|---|
| Branch | `release/gsc-query-url-cleanup-20260729` |
| HEAD | `6a6514f77040d8aad54478c11adbf5a1af02054b` |
| HEAD commit | `infra: activate nginx redirect deployment` |
| Remote committed state | `origin/main` = `6a6514f77040d8aad54478c11adbf5a1af02054b` |
| Current phase commit | Pending |
| Push status | Pending; no force push permitted |
| Deployment | Pending release-candidate commit |
| Production source SHA | Existing baseline remains `6a6514f77040d8aad54478c11adbf5a1af02054b` |
| Release directory | Pending |
| Worktree | Isolated and dirty only with the 11-file query cleanup scope |

## Risks

- Eighteen of the current 23 alternate-canonical rows cannot be classified
  without a current URL-level GSC export.
- Historical query URLs will not disappear immediately; Google must recrawl
  and refresh the coverage report.
- The clean `origin/main` baseline has `npm run test:data` but no `npm test`
  alias. No unrelated package change was added for this release.
- All six analyzed page exports recorded zero clicks in the evidence window;
  the implementation must not be represented as a ranking, impression, click,
  indexing, or conversion improvement.
- The RCU Controller Cabinet Title remains unchanged; any later Title review
  requires separate evidence and approval.
- Smart Hotel Guide, AI Display, Saudi Arabia, and UAE remain under
  observation and must not enter the first implementation batch.
- The worktree contains multiple earlier uncommitted Phase 3B/GSC artifacts.
  Any future staging scope requires careful human review.
- Model-specific RCU electrical, I/O, wiring, protocol, load, and compatibility
  facts remain project-confirmation items and were not asserted.
- Broad query overlap exists, but the approved role allocation leaves no
  unresolved keyword-ownership conflict for the minimal implementation.
- The listing source is shared across configured locales. Current production
  scope remains English-only because `export:clean` removes every legacy
  locale directory; this cleanup must remain part of all release builds.
- No credentials, tokens, private keys, or service-account files may be placed
  in handoff documents.
- `npm ci` reported seven high-severity dependency audit findings during the
  successful deployment. Dependency files were explicitly outside this
  Phase 3B-3 commit and were not changed.
- The current Actions static deployment does not automatically install the
  repository Nginx template. A controlled activation step with backup,
  `nginx -t`, reload, verification, and rollback must be approved before
  deployment.
- The new workflow deliberately fails closed until the matching helper is
  installed as root-owned executable
  `/usr/local/sbin/dualcorelink-activate-nginx-site` and its narrowly scoped
  sudo invocation is available to the runner. No broad sudo permission is
  requested or implemented in the repository.
- The public source URLs remain 404 until Nginx activation; local
  configuration tests do not constitute production redirect verification.

## Historical Next Action (2026-07-28)

Recommended next step:

**Commit, push, deploy, and production-verify the isolated query cleanup**

1. Reconfirm `origin/main` is unchanged from the release base.
2. Stage only the 11 files documented in the implementation report.
3. Commit with `fix: clean inquiry and product filter urls`.
4. Push without force, wait for the AWS production workflow, and verify the
   English-only production artifact.

Waiting for user confirmation:

- approval to push and bootstrap the fixed activation helper;
- instructions for the preserved GSC/API and historical analysis worktree.

Phase 3B-4 has not been started.
