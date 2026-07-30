# DualCoreLink Current Status

Last updated: 2026-07-30

## Current Phase

**SEO Growth Multilingual Phase M5G — Chinese P0 Frontend Production Release**

Status: production release completed and verified under Allan's 2026-07-30
authorization.

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
- Release commit: `8506bd1c797bd043a94c7ed2058dbcac1850ff6b`
- Nginx correction: `f920785885d55297211647b5aa6d518513d6560b`
- Push: `main` updated by non-force push.
- Deployment: successful, Run `30533653918`.
- Production release:
  `/srv/dualcorelink/frontend/releases/f920785885d5-20260730-181248`

## Production QA

- Approved Chinese pages: 12/12 HTTP 200.
- Pending localized paths: 402/402 exact 301 to English.
- Sitemap: 88 total, 76 English and 12 Chinese.
- Reciprocal en/zh hreflang: 12 pairs; `x-default` points to English.
- Other localized public pages: 0.
- Product Schema: 36/36; Article Schema: 15/15.
- Query-bearing internal links, sitemap, canonical, and hreflang URLs: 0.
- English Contact and inquiry infrastructure remain active.
- Chinese CMS records remain 7 published and 0 drafts; no CMS write occurred.

## Risks

- The first M5G Nginx location served the approved paths as 404 due to index
  processing entering the legacy locale regex. Commit `f920785` corrected the
  path resolution, added a regression assertion, and was deployed
  successfully.
- The remaining 402 candidates must stay blocked until their own native
  reviews and explicit release approvals are complete.

## Next Action

Continue monitoring the 12-page Chinese P0 release. Do not start another
locale batch without separate native-review and production authorization.
