# DualCoreLink Current Status

Last updated: 2026-08-02

## Current Phase

**Multilingual Phase M7D — Chinese P1 Production Release**

Status: **PASS — Chinese P1 Production Release Complete**

## Completed

- Imported and verified exactly 17 approved Chinese P1 CMS records: 15
  Products and 2 Solutions.
- Published the 17 records as CMS IDs 262–278; Chinese CMS is now 24 publish /
  0 draft.
- Fast-forwarded `main` to production SHA
  `33fa2935146d46aa428b87a45423de82b8e20edc` without force push.
- Completed GitHub Actions run `30755603217` successfully.
- Activated the exact 43-page Chinese HTML/RSC Nginx allowlist.
- Published 31 Chinese P1 frontend pages, increasing public Chinese pages from
  12 to 43 and sitemap URLs from 88 to 119.
- Verified 43/43 Chinese RSC payloads, 43 reciprocal en/zh hreflang pairs, all
  119 sitemap URLs, and all 371 pending localized redirects.
- Preserved Inquiry/GA4 attribution and retained zero query URLs in internal
  href, sitemap, canonical, and hreflang output.

## Validation

- Multilingual audit: PASS, 414/414; ready 43; pending 371.
- Chinese P0 gate: PASS, 12/12 pages and 7/7 CMS records.
- Chinese P1 gate: PASS, 31/31 pages and 17/17 CMS records.
- Full release check: expected controlled failure blocking 371 pending pages.
- Tests: PASS, 176/176.
- Lint: PASS, 0 errors.
- Media audit: PASS, 0 errors and one existing warning.
- Build: PASS, 192/192 before cleanup.
- Static export audit: PASS, 43 localized pages and sitemap 119.
- Candidate browser QA: PASS, 124/124 page/viewport checks.
- Production HTML/RSC/canonical/hreflang/schema verification: PASS, 43/43.
- Production sitemap: PASS, 119/119 HTTP 200.
- Pending localized redirects: PASS, 371/371 exact one-hop 301.
- Query URL scans: all 0.
- Nginx configuration and service: PASS / active.

## Production

- Source SHA: `33fa2935146d46aa428b87a45423de82b8e20edc`.
- Actions Run ID: `30755603217`.
- Release directory:
  `/srv/dualcorelink/frontend/releases/33fa2935146d-20260803-000211`.
- Sitemap: 119 URLs (76 English + 43 Chinese).
- Chinese CMS: 24 publish / 0 draft.
- CMS Users / Posts / Postmeta: 3 / 250 / 2938.
- Posts include 17 approved P1 records and 17 normal publish-history revisions.
- Arabic CMS: 0.
- Rollback: not required.

## Git Status

- Release worktree:
  `C:\Users\empir\Documents\dualcorelink-zh-p1-production-release`.
- Branch: `release/zh-p1-production-20260802`.
- HEAD and `origin/main`:
  `33fa2935146d46aa428b87a45423de82b8e20edc`.
- The final M7D report and this status update remain intentionally uncommitted
  and were not pushed to `main`.

## Risks

- Chinese P2 (26 pages) and the other five locales (345 pages) remain pending
  and must not be published without separate approval.
- Seven existing high-severity dependency advisories remain outside M7D.
- WordPress created 17 standard revisions during publish; they are retained as
  normal history and have no independent public routes or translation metadata.

## Next Action

Observe Chinese P1 indexing and production stability. Do not approve or publish
Chinese P2 or another locale without a new explicit authorization.

Detailed evidence:
`docs/reports/seo-growth-multilingual-m7d-zh-p1-production-release-20260802.md`.
