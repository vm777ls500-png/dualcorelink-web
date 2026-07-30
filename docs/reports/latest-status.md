# DualCoreLink Current Status

Last updated: 2026-07-30

## Current Phase

**SEO Growth Multilingual Phase M5G — Chinese P0 Frontend Production Release**

Status: release candidate reconstruction is in progress under Allan's
2026-07-30 authorization.

## Authorized Scope

- Publish exactly 12 native-reviewed Chinese P0 frontend pages.
- Preserve the active server-side inquiry flow, GSC Query URL Cleanup, GA4
  attribution, Nginx redirects, and English production baseline.
- Keep the remaining 402 localized candidates out of static output, sitemap,
  hreflang, and Nginx serving exceptions.
- Keep `ar`, `de`, `es`, `vi`, and `fa` redirected to English.
- Keep the seven published Chinese CMS records unchanged.

## Release Baseline

- Latest `origin/main` at reconstruction:
  `488e2e8843f7152c89f64233de058b0853e76035`
- Current production frontend source before M5G:
  `1d3cbb296321e089665b866a6e1dce82efb7c59e`
- Current production release:
  `/srv/dualcorelink/frontend/releases/1d3cbb296321-20260730-133155`
- Multilingual feature source:
  `c5ac34509e27609bd143fbf179d54c028763d4ad`
- GSC Query URL Cleanup merge base:
  `9130c58190a8ded92c06127f48fff682b831ded5`

## Required Production Result

- Sitemap: 88 URLs
- English URLs: 76
- Chinese URLs: 12
- Reciprocal en/zh hreflang: 12 pairs
- Public pages in `ar`, `de`, `es`, `vi`, and `fa`: 0
- Pending localized paths: continue to 301 to English
- Chinese CMS Product/Solution records: 7 published, 0 drafts
- Internal tracking/filter query URLs: 0

## Validation

- Multilingual audit: PASS, 414 manifest records.
- Chinese P0 batch release check: PASS, 12/12 pages and 7/7 CMS payloads.
- Full release check: expected non-zero result, 402 pending pages blocked.
- Tests: PASS, 147/147.
- Lint: PASS.
- Media audit: PASS, 0 errors.
- Build: PASS, 163/163.
- Static export audit: PASS, 12 Chinese pages and sitemap 88.
- Candidate browser QA: PASS, 60 page/viewport checks with zero overflow.

## Git Status

- Branch: `release/zh-p0-frontend-production-20260730`
- Commit: pending
- Push: pending
- Deployment: pending

## Risks

- Workflow, Nginx, Contact, and static-export behavior must retain both the
  current inquiry implementation and the scoped Chinese release controls.
- The deployment must fail closed if the scoped multilingual release check,
  static output counts, or Nginx activation validation fails.
- Rollback must restore the captured pre-M5G frontend release and Nginx
  configuration without changing CMS records.

## Next Action

Complete the isolated candidate merge, run all gates, and deploy only after
the exact 12-page boundary is reproduced.
