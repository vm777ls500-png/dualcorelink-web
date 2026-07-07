# Multilingual URL Cleanup Phase 2 Acceptance Report

## 1. Stage Summary

- Stage name: Multilingual URL Cleanup Phase 2
- Scope: Redirect unpublished locale paths and limit public hreflang to English / x-default
- Commit: `7f3ae55`
- Commit message: `fix: redirect unpublished locale paths`
- Deployment: Cloudflare Pages Production
- Production deployment URL: https://21f3a186.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Status: Accepted

## 2. Problem Background

Google Search Console showed duplicate canonical issues mainly caused by unpublished multilingual paths such as `/zh/`, `/de/`, `/es/`, `/ar/`, `/vi/`, and `/fa/`.

These paths were previously accessible as English fallback pages, used self-canonical URLs, allowed indexing, and were exposed through hreflang alternates.

## 3. Change Summary

This stage implemented:

- 301 redirects from unpublished locale paths to English equivalent paths.
- Public hreflang limited to English and x-default.
- Header language switcher remains English only.
- Locale configuration remains preserved.
- RTL support remains preserved.
- Future multilingual routing capability remains preserved.

## 4. Redirect Verification

Verified online:

- `/zh/` -> `/en/`: 301
- `/de/products/` -> `/en/products/`: 301
- `/ar/faqs/` -> `/en/faqs/`: 301
- `/vi/product-series/` -> `/en/product-series/`: 301
- `/fa/products/` -> `/en/products/`: 301
- `/es/contact/` -> `/en/contact/`: 301

## 5. Hreflang Verification

Checked English pages:

- `/en/`
- `/en/products/`
- `/en/faqs/`
- `/en/downloads/`
- `/en/regions/middle-east/`

Result:

- English hreflang: present
- x-default: present
- `zh / de / es / ar / vi / fa` hreflang: 0

## 6. Sitemap Verification

- Sitemap URL: https://dualcorelink.com/sitemap.xml
- HTTP status: 200
- Sitemap URLs: 60
- `/en/` URLs: 60/60
- Non-English URLs: 0
- PDF URLs: 0

## 7. Baseline Protection

Unchanged:

- Products: 36
- Media: 132
- Categories: 10
- Product JSON-LD: 36/36
- FAQPage JSON-LD: 30/30
- Region landing pages: 5/5 HTTP 200
- Catalog PDFs: 6/6 HTTP 200 application/pdf

## 8. Safety Checks

- pages.dev leak: 0
- localhost leak: 0
- `C:\` leak: 0
- empty `#` links: 0

## 9. Final Acceptance

Multilingual URL Cleanup Phase 2 is accepted and deployed.

Accepted version:

- Commit: `7f3ae55`
- Production deployment: https://21f3a186.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Public indexable locale: English
- Unpublished locale paths: 301 redirect to English equivalents
- Future multilingual configuration: preserved

## 10. Recommended GSC Follow-up

- In Google Search Console, inspect old unpublished locale URLs.
- Confirm they now redirect to English equivalents.
- Validate fix for duplicate canonical issue.
- Monitor Pages / Indexing report over the next few weeks.
- Do not expect duplicate canonical counts to disappear immediately.
