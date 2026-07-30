# SEO Growth Multilingual Phase M5G

## Chinese P0 Frontend Production Release

Authorization: Allan, 2026-07-30

## Release Scope

- Reconstruct the release candidate from the execution-time `origin/main`.
- Publish exactly 12 approved Chinese P0 frontend pages.
- Preserve the current inquiry form, GA4 attribution, GSC query URL cleanup,
  Nginx behavior, and English production pages.
- Keep the remaining 402 localized candidates outside production output.
- Do not write to WordPress, run CMS apply/publish/rollback, submit GSC
  requests, or use a force push.

## Source Baselines

- Execution-time `origin/main`:
  `488e2e8843f7152c89f64233de058b0853e76035`
- Multilingual feature source:
  `c5ac34509e27609bd143fbf179d54c028763d4ad`
- Pre-M5G production frontend source:
  `1d3cbb296321e089665b866a6e1dce82efb7c59e`
- Pre-M5G production release:
  `/srv/dualcorelink/frontend/releases/1d3cbb296321-20260730-133155`

## Approved Chinese P0 URLs

1. `/zh/about/`
2. `/zh/contact/`
3. `/zh/faqs/`
4. `/zh/products/`
5. `/zh/solutions/`
6. `/zh/solutions/oem-odm-custom-panel-solution/`
7. `/zh/solutions/rcu-room-control-solution/`
8. `/zh/solutions/smart-hotel-automation-solution/`
9. `/zh/products/hotel-smart-room-rcu-host-1/`
10. `/zh/products/rcu-controller-cabinet/`
11. `/zh/products/86-type-ai-smart-control-display/`
12. `/zh/products/smart-four-key-scene-control-panel/`

## Semantic Merge

- The deployment workflow retains the server-side inquiry environment,
  inquiry infrastructure test, Nginx activation, and production inquiry
  route verification.
- The workflow adds the Chinese P0 batch release check and requires a
  163-page static build.
- Nginx activation remains before the atomic static release, preserving the
  active inquiry-route deployment invariant.
- The Nginx template exposes only the 12 approved Chinese P0 paths.
- The Contact page retains the English server-side inquiry form and clean
  attribution flow while rendering the approved Chinese publication page.
- Static export tests retain current production assertions and add the
  scoped Chinese release boundary.
- Header and footer navigation fall back to English for unpublished localized
  targets, preventing links to the remaining pending paths.

## Pre-Release Validation

| Check | Result |
|---|---|
| `npm ci` | PASS |
| `npm run multilingual:audit` | PASS: 414 manifest records, 12 release-ready |
| Chinese P0 batch release check | PASS: 12/12 pages, 7/7 CMS payloads |
| Full release check | EXPECTED FAIL: 402 pending pages blocked |
| `npm test` | PASS: 147/147 |
| `npm run lint` | PASS |
| `npm run media:audit` | PASS: 0 errors, 1 existing warning |
| `npm run build` | PASS: 163/163 |
| Static export cleanup | PASS |
| Multilingual static export audit | PASS: 12 localized pages |
| `git diff --check` | PASS |

Static candidate results:

- Sitemap: 88 URLs (76 English + 12 Chinese).
- Chinese output pages: 12.
- Arabic, German, Spanish, Vietnamese, and Persian output pages: 0.
- Reciprocal Chinese hreflang entries: 12.
- `x-default` entries for the approved pairs: 12.
- Tracking, category, series, canonical, sitemap, and hreflang query URLs: 0.
- Internal links to pending localized pages: 0.

Browser candidate QA:

- 12 pages at 375, 390, 430, 768, and 1280 pixels: 60 checks.
- Horizontal overflow failures: 0.
- Broken images: 0.
- Pending localized links: 0.
- Query-string internal links: 0.
- English Product CTA opened the clean Contact URL and retained the inquiry
  form.
- Product category and series interactions did not generate query URLs.
- A legacy Contact attribution URL was safely cleaned without a redirect
  loop.

## CMS Boundary

The production CMS was queried read-only. It contained seven published
Chinese Product/Solution records and zero drafts. No CMS write was performed.

## Release Record

- Release commit: pending
- Push to `main`: pending
- GitHub Actions run: pending
- Production source SHA: pending
- Production release directory: pending
- Deployment result: pending

## Production Verification

Pending deployment.

## Rollback

If the production workflow fails after switching the frontend release, use
the existing atomic release rollback to restore the pre-M5G frontend release.
Do not change the CMS as part of frontend rollback.
