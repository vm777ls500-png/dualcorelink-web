# DualCoreLink Current Status

Last updated: 2026-08-02

## Current Phase

**Multilingual Phase M7C — Chinese P1 CMS Import CLI Safety Upgrade**

Status: **PASS — ready for a separately authorized Chinese P1 draft-apply
phase**.

The CMS Import CLI is now version `1.2.0` and active in production. Its exact
Chinese P1 policy accepts only 17 approved records: 15 Products and 2
Solutions, reviewer Allan, review date 2026-08-02, and
`productionReleaseReady=true`. Chinese P0 remains 7 records, Arabic P0 remains
6 records under the explicit owner-waiver flag, and every other locale/batch
combination fails closed.

The production baseline found the installed plugin at `1.1.0`, not `1.1.1`.
The new candidate was built from the approved 1.1.1 source baseline, passed
73/73 Node safety tests and 78/78 production-PHP safety tests, and was backed
up and installed atomically. The rollback archive is retained under
`/var/backups/dualcorelink-cms-import/m7c-zh-p1-cli-20260802T121442Z`.

Exactly one Chinese P1 production preflight ran. It passed 17/17 with
`writes: 0`. Users 3, Posts 216, Postmeta 2576, Chinese 7 publish / 0 draft,
and Arabic 0 were unchanged. No `apply`, `verify`, `publish`, or `rollback`
ran; no frontend, Nginx, Cloudflare, MariaDB, `main`, deployment, or GSC
operation occurred.

Detailed evidence:
`docs/reports/seo-growth-multilingual-m7c-zh-p1-cms-import-cli-safety-upgrade-20260802.md`.

## Previous Phase M7B

**Multilingual Phase M7B — Apply Chinese P1 Human Approval**

Status: **PASS — Chinese P1 approval state and isolated release batch are ready on the review branch**

## Completed

- Applied Allan's 2026-08-02 approval to the exact 31 Chinese P1 URLs.
- Preserved the 12 previously approved Chinese P0 decisions.
- Added a strict P1 decision validator and batch-scoped review-state importer.
- Created and validated the 17-record reviewed Chinese P1 CMS payload.
- Extended exact sitemap, hreflang, RSC, redirect, deployment, and release-gate
  candidates from 12 to 43 approved Chinese pages.
- Completed automated, browser, static-export, and production-boundary checks.

## Modified Files

- `.github/workflows/aws-production-deploy.yml`
- `deploy/nginx/dualcorelink.com.conf.template`
- `deploy/scripts/deploy-static.sh`
- `docs/reviews/multilingual/zh-p1-final-decisions-20260802.md`
- `scripts/apply-native-review.ts`
- `src/content/locales/cms-import/index.ts`
- `src/content/locales/cms-import/zh-p1-reviewed.ts`
- `src/content/locales/native-review-decisions.ts`
- `src/lib/multilingual-audit.ts`
- `src/lib/multilingual-release-batches.ts`
- `src/lib/multilingual-review-batches.ts`
- `tests/header-navigation.test.ts`
- `tests/multilingual-foundation.test.ts`
- `tests/multilingual-zh-p1-approval.test.ts`
- `tests/seo-schema.test.ts`
- `tests/static-export.test.ts`
- `docs/reports/seo-growth-multilingual-m7b-zh-p1-approval-application-20260802.md`
- `docs/reports/latest-status.md`

## Validation

- Multilingual audit: PASS, 414/414; ready 43; pending 371.
- Chinese P0 gate: PASS, 12/12 pages and 7/7 CMS payloads.
- Chinese P1 gate: PASS, 31/31 pages and 17/17 CMS payloads.
- Full release check: expected controlled failure, blocking 371 pending pages.
- Tests: PASS, 176/176.
- Lint: PASS, 0 errors.
- Media audit: PASS, 0 errors and one existing warning.
- Build: PASS, 192/192 before cleanup.
- Static export audit: PASS; sitemap candidate 119 (76 English + 43 Chinese).
- Browser QA: PASS, 124/124 page/viewport checks plus desktop/mobile navigation.
- Query URL scans: all 0.
- Production GET/HEAD boundary: Chinese P1 31/31 one-hop 301; live sitemap 88
  with 12 Chinese; public Chinese CMS remains 7 publish.
- `git diff --check`: PASS.

## Git Status

- Worktree: `C:\Users\empir\Documents\dualcorelink-zh-p1-review-prep`
- Branch: `review/zh-p1-human-review-20260802`
- M7A commit: `0a795d47fb9f55e2723cc9a5d8d396c769fdbcab`.
- M7B implementation/docs commits: pending creation.
- Push: pending; GitHub HTTPS connectivity will be retried.
- Main: not modified or pushed.

## Production Boundary

- Chinese approved / productionReleaseReady candidate: 43.
- Pending localized manifest records: 371.
- Candidate sitemap: 119; live production sitemap: unchanged at 88.
- Candidate en/zh hreflang pairs: 43; live production remains 12 pairs.
- Public Chinese CMS: unchanged at 7 publish / 0 reported draft.
- Deployment, CMS/database writes, GSC requests: none.

## Risks

- The 17-record P1 CMS payload has not been imported to production.
- The 31 P1 pages are not yet deployed and remain live one-hop redirects.
- Seven existing high-severity dependency advisories remain outside this phase.

## Next Action

Preserve M7B on the review branch. CMS import, `main` integration, and
production deployment each require a separate explicit authorization.
