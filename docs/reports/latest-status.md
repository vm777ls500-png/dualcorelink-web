# DualCoreLink Current Status

Last updated: 2026-08-02

## Current Phase

**UX Hotfix — Chinese RSC Prefetch 404 Audit and Fix**

Status: BLOCKED — the isolated feature candidate serves approved Chinese RSC
payloads and all validation passed, but GitHub HTTPS 443 prevented the feature
branch push after bounded retries. No deployment was performed.

## Completed

- Created isolated worktree `dualcorelink-rsc-prefetch-hotfix` from production
  baseline `7ee2517e85d537b90fed058dc127af0cf6ea420b`.
- Confirmed 12/12 approved Chinese RSC files exist in the production release
  but are denied by the Nginx locale publication boundary.
- Added a precise allowlist for the same 12 Chinese `index.txt` payloads before
  legacy locale redirects.
- Extended static export audit and tests to require approved payloads and
  reject all pending localized payloads.
- Completed 48 page/viewport browser checks with zero failures.

## Modified Files

- `deploy/nginx/dualcorelink.com.conf.template`
- `scripts/audit-multilingual-export.ts`
- `tests/multilingual-foundation.test.ts`
- `tests/static-export.test.ts`
- `docs/reports/ux-chinese-rsc-prefetch-404-hotfix-20260802.md`
- `docs/reports/latest-status.md`

## Validation

- Tests: PASS, 153/153 with the public read-only CMS.
- Lint: PASS, 0 errors.
- Media audit: PASS, 0 errors.
- Multilingual audit: PASS, 414/414.
- Build: PASS, 163/163.
- Static export audit: PASS, 12 Chinese pages and sitemap 88.
- Browser QA: PASS, 48/48; `_rsc` 404, any 404, overflow, broken images,
  console errors, and interaction failures all 0.
- Query URL scans: all 0.

## Git Status

- Branch: `hotfix/chinese-rsc-prefetch-404-20260802`
- Base: `7ee2517e85d537b90fed058dc127af0cf6ea420b`
- Implementation commit: `5b67e41`.
- Feature push: blocked by GitHub HTTPS connection reset/timeout after the
  initial attempt and three bounded non-forced retries.
- Main: not modified or pushed.

## Production Boundary

- Deployment: not performed; live Chinese `.txt` requests remain 404 until a
  separately authorized release.
- CMS/database writes: none.
- GSC requests: none.
- Sitemap production baseline: unchanged at 88 (76 English + 12 Chinese).
- Pending localized candidates: 402, still blocked.

## Risks

- `npm ci` reports seven existing high-severity dependency advisories; no
  dependency changed in this hotfix.
- The candidate changes the Nginx template, so production correction requires
  a separate reviewed deployment and post-deploy 12/12 verification.

## Next Action

Retry the existing feature-branch push when GitHub HTTPS connectivity returns.
After remote preservation, wait for explicit production release authorization.
Do not deploy or push main in this phase.
