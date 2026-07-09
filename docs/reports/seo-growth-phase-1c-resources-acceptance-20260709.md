# SEO Growth Phase 1C-2 Resources Acceptance Report

Date: 2026-07-09

## Stage Status

Completed / Committed / Pushed / Cloudflare Production Deployed / Production QA Passed

## Scope

This report archives the SEO Growth Phase 1C-2 Resources minimum architecture and first RCU Guide launch.

Implemented scope:

- Added `/en/resources/`.
- Added `/en/resources/what-is-hotel-rcu-room-control-system/`.
- Added static resources config.
- Added Article JSON-LD for the RCU Guide.
- Added BreadcrumbList for the RCU Guide.
- Updated sitemap from 60 URLs to 62 URLs.
- Added regression coverage for resources sitemap inclusion, FAQ question count, Article schema, and breadcrumb safety.

No product data, FAQ data, Region page content, Contact details, Catalog PDFs, redirects, hreflang strategy, or images were changed.

## Git and Deployment

- Commit hash: `4ebbb00591e63f953a245a793ec95960e8227e39`
- Commit message: `content: add RCU guide resource page`
- Production deployment URL: `https://7c53fea1.dualcorelink-web.pages.dev`
- Official website: `https://dualcorelink.com`
- Branch: `main`
- Final git status before this report: `main...origin/main`
- Working tree before this report: clean

Cloudflare deployment verification:

- Production deployment completed successfully.
- Deployment source was `main`.
- Deployment source commit was `4ebbb00`, matching `4ebbb00591e63f953a245a793ec95960e8227e39`.
- `https://dualcorelink.com/` returned HTTP 200.

## Added Files

- `src/config/resources.ts`
- `src/app/[locale]/resources/page.tsx`
- `src/app/[locale]/resources/[slug]/page.tsx`

## Modified Files

- `src/app/sitemap.ts`
- `tests/seo-schema.test.ts`

## Resources Listing Page Verification

URL: `https://dualcorelink.com/en/resources/`

Results:

- HTTP 200.
- H1 `Resources` rendered correctly.
- Page links to the RCU Guide.
- Canonical points to `https://dualcorelink.com/en/resources/`.
- hreflang remains English / x-default only.
- No non-English hreflang output was found.

## RCU Guide Verification

URL: `https://dualcorelink.com/en/resources/what-is-hotel-rcu-room-control-system/`

Results:

- HTTP 200.
- H1: `What Is a Hotel RCU Room Control System?`
- SEO title was present and correct.
- Meta description was present and correct.
- Canonical points to `https://dualcorelink.com/en/resources/what-is-hotel-rcu-room-control-system/`.
- hreflang remains English / x-default only.
- Article JSON-LD exists.
- BreadcrumbList exists.

Verified H2 sections:

- `What an RCU Does in a Hotel Guest Room`
- `Typical Devices Connected to a Hotel RCU`
- `Wiring and Protocol Questions to Confirm Early`
- `RCU Product Selection for Contractors and Integrators`
- `How RCU Planning Affects Quotation`
- `Common Mistakes in Early RCU Planning`
- `When to Request Datasheets or Wiring Diagrams`

## Internal Link Verification

The RCU Guide includes the required internal links:

- `/en/solutions/rcu-room-control-solution/`
- `/en/solutions/hotel-guest-room-control-solution/`
- `/en/products/rcu-controller-cabinet/`
- `/en/products/hotel-smart-room-rcu-host-1/`
- `/en/products/hotel-smart-room-rcu-host-2/`
- `/en/products/hotel-smart-room-rcu-host-3/`
- `/en/regions/middle-east/`
- `/en/regions/saudi-arabia/`
- `/en/downloads/`
- `/en/contact/#get-a-quote`

## Sitemap Verification

URL: `https://dualcorelink.com/sitemap.xml`

Results:

- HTTP 200.
- Sitemap URL count: 62.
- `/en/resources/` is included.
- `/en/resources/what-is-hotel-rcu-room-control-system/` is included.
- Non-English sitemap URLs: 0.
- PDF sitemap URLs: 0.

## SEO Schema Regression

Production schema verification:

- Product JSON-LD: 36/36 product detail pages.
- FAQPage JSON-LD: present.
- FAQPage Question count: 30/30.
- RCU Guide Article JSON-LD: present.
- RCU Guide BreadcrumbList: present.
- No fake price, fake review, fake rating, `offers`, `price`, `review`, or `aggregateRating` was found in the RCU Guide.

## Baseline Regression Checks

Production baseline checks:

- 5 Region pages returned HTTP 200.
- Contact page returned HTTP 200.
- Contact Office / WeChat / Phone / QR details remained present.
- Header language switcher still shows English only.
- hreflang remains English / x-default only.
- `/zh/` redirects to `/en/` with 301.
- `/de/products/` redirects to `/en/products/` with 301.
- Catalog PDFs: 6/6 returned HTTP 200.
- Catalog PDF content type: `application/pdf`.
- `pages.dev` leak on checked official-domain pages: 0.
- `localhost`, `127.0.0.1`, and `C:\` leak on checked official-domain pages: 0.
- Empty `href="#"` links on checked pages: 0.

## Forbidden Claims Check

The RCU Guide and checked production pages did not introduce:

- fake price
- fake review
- fake rating
- local office
- local stock
- local distributor network
- certified for Saudi
- certified for UAE
- certified for Vietnam
- fake certification claims
- customer names
- hotel brand names
- project numbers
- guaranteed delivery

## Final Acceptance Conclusion

SEO Growth Phase 1C-2 Resources minimum architecture and the first RCU Guide are accepted on production.

Recommended next steps:

- Submit the new Resources URLs in Google Search Console.
- Resubmit or inspect `https://dualcorelink.com/sitemap.xml`.
- Monitor GSC impressions, queries, indexed pages, and first ranking movement for the RCU Guide.
