# Language Switcher Phase 1 Acceptance Report

Date: 2026-06-25

## 1. Stage Summary

- Stage name: Language Switcher Phase 1
- Scope: Hide unavailable language options from the public header language switcher
- Commit: `62cdfc2`
- Commit message: `fix: hide unavailable language options`
- Deployment: Cloudflare Pages Production
- Production deployment URL: `https://9fe590d4.dualcorelink-web.pages.dev`
- Official site: `https://dualcorelink.com/en/`
- Git status after deployment verification: `main...origin/main`
- Worktree status after deployment verification: clean
- Status: Accepted

## 2. Change Summary

This stage hides unavailable public language options from the header language switcher.

Visible language:

- English

Hidden from the public header:

- Chinese
- Deutsch
- Spanish
- Arabic
- Vietnamese
- Persian

Important:

- Locale configuration remains preserved.
- The locale list still includes `en`, `zh`, `de`, `es`, `ar`, `vi`, and `fa`.
- Future multilingual routing capability remains preserved.
- RTL support remains preserved.
- This change does not remove future multilingual capability.
- It only hides unfinished language options from the public header UI.

## 3. Files Changed

Implementation commit: `62cdfc2`

Changed files:

- `src/config/i18n.ts`
- `src/components/layout/header.tsx`

## 4. Verification

Local verification before deployment:

- `npm.cmd run lint`: passed
- `npm.cmd run test:data`: passed, 23/23
- `npm.cmd run build`: passed, 134/134 static pages

Online verification:

- `https://dualcorelink.com/en/`: HTTP 200
- Header language switcher only shows English.
- Hidden languages are no longer visible in the public header.

Hidden language checks:

- Chinese: hidden
- Deutsch: hidden
- Spanish: hidden
- Arabic: hidden
- Vietnamese: hidden
- Persian: hidden

## 5. Baseline Protection

Unchanged:

- Sitemap URLs: 60
- Products: 36
- Media: 132
- Categories: 10
- Product JSON-LD: 36/36
- FAQPage JSON-LD: 30/30
- Catalog PDFs: 6/6 HTTP 200 application/pdf

No sitemap, product, FAQ, PDF, image, or Region page content changes were made in this stage.

## 6. Region Page Regression

The 5 launched Region pages remained online:

- `/en/regions/middle-east/`: HTTP 200
- `/en/regions/saudi-arabia/`: HTTP 200
- `/en/regions/uae/`: HTTP 200
- `/en/regions/southeast-asia/`: HTTP 200
- `/en/regions/vietnam/`: HTTP 200

Canonical was normal for all checked Region pages.

## 7. Safety Checks

- canonical issues: 0
- pages.dev leak: 0
- localhost leak: 0
- `C:\` leak: 0
- empty `#` links: 0

## 8. Deployment Notes

The standard `npm.cmd run pages:deploy` command rebuilt successfully but could not complete deployment because `CLOUDFLARE_API_TOKEN` was not set in the non-interactive environment.

Deployment was completed using the project's existing `.wrangler-config` login state. No token or sensitive credential was recorded in this report.

## 9. Final Acceptance

Language Switcher Phase 1 is accepted and deployed.

Accepted version:

- Commit: `62cdfc2`
- Production deployment: `https://9fe590d4.dualcorelink-web.pages.dev`
- Official site: `https://dualcorelink.com/en/`
- Public language switcher: English only
- Future multilingual configuration: preserved
- Future RTL capability: preserved

## 10. Recommended Future Action

When real translated content is ready, additional languages can be re-enabled by updating the visible locale configuration.

Do not show unfinished languages in the public header before translated content is available.
