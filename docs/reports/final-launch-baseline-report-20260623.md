# Final Launch Baseline Report

Date: 2026-06-23

## Executive Summary

This report records the accepted launch baseline for the DUALCORE LINK website after the completed SEO, UX, performance, downloads, catalog, and regional inquiry stages.

The current production version can be used as the formal SEO / UX / Performance / Downloads / Regional Inquiry launch baseline for future development.

Core baseline:

- Website: <https://dualcorelink.com>
- Products: 36
- Media: 132
- Categories: 10
- Sitemap URLs: 55
- Product JSON-LD: 36/36 product detail pages
- Sitemap URL status: 55/55 HTTP 200
- Product detail pages: 36/36 HTTP 200
- Catalog PDFs: 6 online multilingual catalog files
- Canonical domain: `https://dualcorelink.com`
- Git status at reporting: clean `main...origin/main`

Future work should preserve this baseline and avoid breaking Products 36, Sitemap 55, Product JSON-LD 36/36, catalog PDF availability, image optimization, and canonical safety.

## Project Overview

DUALCORE LINK is a B2B smart hotel and smart home automation website for overseas project buyers, system integrators, distributors, and OEM/ODM partners.

The site focuses on:

- Smart hotel panels and switches
- AI smart displays
- RCU room control hosts
- Sensors
- Smart sockets and power modules
- HVAC and thermostat control
- Curtain control panels
- Room status and hotel service panels
- Hotel audio and communication devices
- Hotel delivery robot systems
- OEM/ODM automation project support

The production target is Cloudflare Pages using a static frontend generated from the project.

## Current Production Baseline

Verified production baseline:

- Production website: <https://dualcorelink.com>
- Products: 36
- Media: 132
- Categories: 10
- Sitemap URLs: 55
- Product JSON-LD: 36/36
- 55/55 sitemap URLs HTTP 200
- 36/36 product detail pages HTTP 200
- 36/36 product display images use `/media/product-display/`
- 8/8 homepage Representative products images use `/media/home-thumbnails/`
- 6 Catalog PDFs online
- No `pages.dev`, `localhost`, or local `C:\` leaks found in production checks
- Git clean `main...origin/main` at time of reporting

## Hosting and Deployment Baseline

Hosting baseline:

- Platform: Cloudflare Pages
- Project: `dualcorelink-web`
- Primary production domain: <https://dualcorelink.com>
- Static export output: `out`

Deployment notes:

- Production deployments were completed through Cloudflare Pages.
- The local deployment workflow can use the existing `.wrangler-config` login state when `CLOUDFLARE_API_TOKEN` is not available in the shell.
- No Cloudflare API token or sensitive credential is recorded in this report.

## Git Baseline

Git baseline at the time of reporting:

- Branch: `main`
- Remote branch: `origin/main`
- Status: synchronized
- Working tree: clean

Recent acceptance report commits:

- `a26d088` - `docs: add seo ux performance acceptance report`
- `bf08c40` - `docs: add b2b conversion trust acceptance report`
- `de969a6` - `docs: add downloads catalog acceptance report`
- `7d7cf62` - `docs: add regional market inquiry acceptance report`

## Product / Media / Category Baseline

Current data baseline:

- Products: 36
- Media: 132
- Categories: 10

No product data, media inventory, or category inventory was changed during the documentation-only acceptance reporting stages.

## Sitemap Baseline

Current sitemap baseline:

- Sitemap URL: <https://dualcorelink.com/sitemap.xml>
- URL count: 55
- HTTP status: 200
- URL status: 55/55 HTTP 200
- `/en/downloads/` is included in sitemap.
- PDF file URLs are not included in sitemap.
- Query URLs are not included in sitemap.
- No `pages.dev`, `localhost`, or local `C:\` URL was found in sitemap checks.

The sitemap increased from 54 to 55 URLs when `/en/downloads/` was added after real public catalog files were published.

## GSC Baseline

Google Search Console baseline:

- Sitemap has been submitted and updated.
- GSC discovered page count was previously confirmed at 54 before `/en/downloads/` sitemap inclusion.
- GSC update for the Downloads sitemap stage has been completed.
- Key URL inspection and indexing requests have been completed.

Ongoing monitoring is still recommended because search indexing and rich result appearance are external processes controlled by Google.

## SEO Baseline

SEO baseline:

- Robots: passed previous production checks.
- Sitemap: 55 URLs after Downloads inclusion.
- Canonical: all checked sitemap pages point to `https://dualcorelink.com`.
- Product JSON-LD: 36/36 product detail pages.
- Meta title and description checks passed after optimization.
- Open Graph / Twitter checks passed for representative pages.
- No known blocking SEO issue remains at this baseline.

## Product JSON-LD Baseline

Product JSON-LD baseline:

- Coverage: 36/36 product detail pages
- Required Product schema fields are present:
  - `@type: Product`
  - `name`
  - `description`
  - `image`
  - `brand`
  - `category`
  - `url`
- Product JSON-LD image URLs remain the original high-resolution product images.
- Product JSON-LD image URLs were not changed to `/media/product-display/`.
- No fake `price`, `availability`, `aggregateRating`, or `review` fields are emitted.

Key completed stage:

- Commit: `38c9b3175f0c6586a23f3ba4dd17b5ff3db64348`
- Result: Product JSON-LD improved from 0/36 to 36/36.

## Meta Title / Description Baseline

Meta baseline after optimization:

- Sitemap URLs checked: 54 at the time of the metadata optimization stage
- Title missing: 0
- Description missing: 0
- Title duplicates: 0
- Description duplicates: 0
- Title over-short / over-long: 0
- Description over-short / over-long: 0
- Canonical abnormality: 0

Key completed stage:

- Commit: `db85f7d`
- Message: `seo: refine meta titles and descriptions`

## Canonical / Robots Baseline

Canonical and robots baseline:

- Canonicals point to `https://dualcorelink.com`.
- No `pages.dev` canonical was found in production checks.
- No `localhost` canonical was found in production checks.
- No local `C:\` path leak was found in production checks.
- Robots checks previously passed.
- Important public pages are not blocked by robots rules.

## Open Graph / Twitter Baseline

Open Graph and Twitter baseline:

- Representative pages checked:
  - Homepage
  - Product listing page
  - Contact page
  - Product detail pages
  - Solution pages
- OG/Twitter required basics passed in representative checks.
- Missing items: 0
- Wrong domain issues: 0
- Unavailable image issues: 0
- `og:url` points to `https://dualcorelink.com`.
- `og:image` and `twitter:image` returned HTTP 200 in representative checks.
- `twitter:card` is `summary_large_image`.
- Product page sharing images use relevant product images.

No code modification was required in this stage.

## UX and Conversion Baseline

Current UX and conversion baseline:

- Homepage hero CTA issue was fixed.
- Homepage has visible CTA paths:
  - View Products
  - Get a Quote
  - Contact Sales
- Product filters provide accurate category and series navigation.
- Filter result pages scroll to the product results area.
- Contact and inquiry copy includes stronger B2B trust language.
- Product detail pages include a quotation preparation prompt.
- Downloads page provides both public catalog downloads and a project document request entry.
- Regions page provides regional inquiry support for Middle East and Southeast Asia markets.

## Product Navigation Baseline

Product navigation baseline:

- Product listing page: `/en/products/`
- Category filters use `/en/products/?category=<category-slug>`.
- Series filters use `/en/products/?series=<series-slug>`.
- Filtered pages support result-focused navigation through `#product-results`.
- Direct parameter visits with category or series scroll to the product results area.
- `View all products` returns to the full product list.

Key completed stages:

- Commit: `6172b0aad9ea4e5d932b7cbbe0aeec848c3d0fb5`
- Message: `fix: add accurate product category and series filters`
- Commit: `3359f9d4ce164106e6407ddaa4de91eb824a9cdf`
- Message: `ux: scroll product filters to results`

## Inquiry and Contact Baseline

Inquiry and Contact baseline:

- Contact page is available at `/en/contact/`.
- Product detail pages expose inquiry CTA paths.
- WhatsApp and contact entries remain available.
- Product detail pages include the quotation preparation guidance:
  - Project country
  - Estimated quantity
  - Voltage
  - Protocol or wiring needs
  - Panel finish
  - Logo or packaging requests
  - Target delivery time
- Contact submit-state copy includes a business-day response expectation:
  - `We will reply within 24 hours on business days.`

Key completed stages:

- Commit: `f355bfb`
- Message: `ux: clarify inquiry response expectation`
- Commit: `696872de5ce016c969b16916fd16d588f8bba5d7`
- Message: `conversion: strengthen b2b inquiry trust content`

## Downloads / Catalog Baseline

Downloads baseline:

- Downloads page: `/en/downloads/`
- Sitemap inclusion: yes
- Public catalog section: available
- Project document request section: available
- `Request Project Documents` links to `/en/contact/#get-a-quote`.
- No fake certificates, fake datasheets, fake manuals, or fake download links were added.

Catalog PDF baseline:

- English catalog: `dualcorelink-smart-hotel-automation-catalog-en.pdf`
- Persian catalog: `dualcorelink-smart-hotel-automation-catalog-fa.pdf`
- Vietnamese catalog: `dualcorelink-smart-hotel-automation-catalog-vi.pdf`
- Spanish catalog: `dualcorelink-smart-hotel-automation-catalog-es.pdf`
- German catalog: `dualcorelink-smart-hotel-automation-catalog-de.pdf`
- Arabic catalog: `dualcorelink-smart-hotel-automation-catalog-ar.pdf`

PDF status:

- 6/6 PDF URLs HTTP 200
- Content-Type: `application/pdf`
- PDF URLs are public asset URLs under `/downloads/catalog/`
- PDF URLs are not included in sitemap

Key completed commits:

- `b7fc9f0` - `content: clarify downloads request document strategy`
- `22e4557` - `content: add multilingual product catalog downloads`
- `34d98c052884b7ecc709555c1f0bc118104588ee` - `seo: include downloads page in sitemap`

## Regional Market Inquiry Baseline

Regional inquiry baseline:

- Regions page: `/en/regions/`
- Page status: HTTP 200
- Canonical: `https://dualcorelink.com/en/regions/`
- `Regional Project Inquiry Support` is live.

Target markets shown:

- Middle East
- Saudi Arabia
- United Arab Emirates
- Southeast Asia
- Vietnam
- Indonesia
- Thailand
- Malaysia

Regional inquiry parameters shown:

- Country
- Hotel room type
- Voltage and frequency requirements
- Protocol preference
- Quantity
- Required documents

Risk controls:

- No unverified local offices were claimed.
- No local inventory was claimed.
- No unverified local certifications were claimed.
- No customer names or local case studies were fabricated.
- No distributor or partner network was fabricated.
- No regional legal or compliance claims were fabricated.

Key completed commit:

- Commit: `938152355a85ee8aeb943676a4aff504346aa4b0`
- Message: `content: strengthen regional market inquiry messaging`

## Performance Baseline

Performance baseline was established through HTML, resource, static export, and online HTTP checks.

Important note:

- Lighthouse numeric scores were not produced for this baseline.
- No Lighthouse Performance, Accessibility, Best Practices, SEO, LCP, CLS, INP, or TBT numeric score is claimed in this report.

Observed performance work focused on:

- Reducing homepage Representative products image payload.
- Reducing product detail display image payload.
- Preserving stable product image layout containers.
- Avoiding regression in JSON-LD, OG, Twitter, canonical, and sitemap behavior.

## Homepage Image Optimization Baseline

Homepage Representative products image baseline:

- 8/8 homepage Representative products images use `/media/home-thumbnails/`.
- Missing or empty alt text: 0
- Original 1-8 MB product image references from the homepage Representative products section: 0
- Maximum homepage product image decreased from 8.56 MB to about 135 KB.
- Visual recognition remained acceptable in production verification.

Key completed commits:

- `43f0bc039eb9fb0e1e88e17feefff2895499c693`
- Message: `seo: improve homepage image alt text`
- `53cb452`
- Message: `perf: optimize homepage product image loading`

## Product Detail Image Optimization Baseline

Product detail display image baseline:

- 36/36 product detail pages use `/media/product-display/` for display images.
- 36/36 display images return HTTP 200.
- 36/36 display images have non-empty alt text.
- 36/36 display images have width coverage.
- 36/36 display images have height coverage.
- Stable `aspect-[4/3]` image containers remain in use.
- Product detail pages no longer load MB-level original images as display images.

Payload results:

- Original main image total: about 108.7 MiB
- Display images total: about 3.36 MiB
- Maximum original image: about 11.76 MiB
- Maximum display image: about 379.6 KB
- Display images over 1 MB: 0

SEO and sharing image safety:

- Product JSON-LD image was not changed to `/media/product-display/`.
- `og:image` was not changed to `/media/product-display/`.
- `twitter:image` was not changed to `/media/product-display/`.

Key completed commit:

- `d199c2e6df2ad9549f5039a712cf4fcd26bc00c4`
- Message: `perf: optimize product detail display images`

## PDF and Asset Baseline

PDF and asset baseline:

- Six multilingual catalog PDFs are online.
- Six catalog PDFs return HTTP 200.
- Six catalog PDFs return `application/pdf`.
- PDF URLs do not contain Chinese characters, spaces, local Windows paths, `pages.dev`, or `localhost`.
- PDF URLs are not included in sitemap.
- Homepage thumbnails are in `/media/home-thumbnails/`.
- Product display images are in `/media/product-display/`.
- Product JSON-LD and social sharing images were not replaced by display-size images.

## Completed Stage Reports

Completed acceptance report documents:

- `docs/reports/seo-ux-performance-acceptance-20260623.md`
  - Commit: `a26d088`
  - Message: `docs: add seo ux performance acceptance report`
- `docs/reports/b2b-conversion-trust-acceptance-20260623.md`
  - Commit: `bf08c40`
  - Message: `docs: add b2b conversion trust acceptance report`
- `docs/reports/downloads-catalog-acceptance-20260623.md`
  - Commit: `de969a6`
  - Message: `docs: add downloads catalog acceptance report`
- `docs/reports/regional-market-inquiry-acceptance-20260623.md`
  - Commit: `7d7cf62`
  - Message: `docs: add regional market inquiry acceptance report`

## Key Commits Summary

### Product JSON-LD

- Commit: `38c9b3175f0c6586a23f3ba4dd17b5ff3db64348`
- Result: Product JSON-LD improved from 0/36 to 36/36.
- Safety: no fake `price`, `availability`, `aggregateRating`, or `review`.

### Homepage Hero UI

- Commit: `bb050f7e3663ee8f39e889a8255922668dbd92d9`
- Result: white empty CTA button fixed.
- Result: `Contact Sales` CTA added.
- Result: technology-style hero background enhanced.

### Product Category / Series Filters

- Commit: `6172b0aad9ea4e5d932b7cbbe0aeec848c3d0fb5`
- Result: category and series query filters added.
- Result: `View all products` path available.

### Inquiry Trust and Filter Scroll UX

- Commit: `f355bfb`
- Message: `ux: clarify inquiry response expectation`
- Commit: `3359f9d4ce164106e6407ddaa4de91eb824a9cdf`
- Message: `ux: scroll product filters to results`

### Homepage Image Alt

- Commit: `43f0bc039eb9fb0e1e88e17feefff2895499c693`
- Result: homepage image missing alt count improved from 8 to 0.

### Meta Title / Description

- Commit: `db85f7d`
- Result: title missing 0.
- Result: description missing 0.
- Result: duplicates 0.
- Result: over-short / over-long 0.

### Homepage Image Performance

- Commit: `53cb452`
- Result: homepage maximum product image decreased from 8.56 MB to about 135 KB.

### Product Detail Image Performance

- Commit: `d199c2e6df2ad9549f5039a712cf4fcd26bc00c4`
- Result: display images total about 3.36 MiB.
- Result: maximum display image about 379.6 KB.
- Result: display images over 1 MB: 0.
- Safety: Product JSON-LD, OG, and Twitter images were not changed to display images.

### B2B Conversion Trust

- Commit: `696872de5ce016c969b16916fd16d588f8bba5d7`
- Result: product quote preparation prompt added.
- Result: Downloads request document section added.

### Downloads Strategy and Multilingual Catalog

- Commit: `b7fc9f0`
- Message: `content: clarify downloads request document strategy`
- Commit: `22e4557`
- Message: `content: add multilingual product catalog downloads`
- Commit: `34d98c052884b7ecc709555c1f0bc118104588ee`
- Message: `seo: include downloads page in sitemap`
- Result: six real catalog PDFs published.
- Result: `/en/downloads/` added to sitemap.
- Result: sitemap increased from 54 to 55.
- Safety: PDF URLs were not added to sitemap.

### Regional Market Inquiry Messaging

- Commit: `938152355a85ee8aeb943676a4aff504346aa4b0`
- Result: target markets added for Middle East, Saudi Arabia, UAE, Southeast Asia, Vietnam, Indonesia, Thailand, and Malaysia.
- Safety: no unverified local offices, inventory, certifications, customers, distributors, or regional compliance claims were made.

## Current Known Non-Blocking Items

- Region detail pages are not yet published.
- Downloads PDF files are public catalogs only; detailed datasheets, certificates, wiring references, and OEM/ODM project documents still require confirmation.
- Lighthouse numeric scores were not produced; performance checks were based on resource, HTML, static export, and online HTTP checks.
- GSC indexing and Product rich result appearance should continue to be monitored.
- More real datasheets and certificates can be added later when verified.
- Localized language routes are not fully implemented yet, even though multilingual PDFs exist.
- `/en/regions/` sitemap inclusion can be evaluated later when content depth is stronger.

## Future Roadmap Recommendations

- Monitor GSC indexing, Page indexing, Product snippets, and Core Web Vitals.
- Prepare verified product datasheets and certificates.
- Develop real region landing pages for Middle East and Southeast Asia.
- Add Saudi Arabia, UAE, Vietnam, Indonesia, Thailand, and Malaysia pages only after content requirements are clear.
- Add market-specific FAQs.
- Add lead capture workflow for document downloads if needed.
- Link catalog language versions to target markets when the multilingual frontend strategy is ready.
- Expand multilingual frontend routes only after content, localization, and hreflang strategy are ready.
- Consider Lighthouse / PageSpeed audit later with browser tooling.
- Continue avoiding unverified certification, distributor, office, inventory, and customer claims.

## Final Acceptance Conclusion

The current production version is accepted as the formal DualCoreLink SEO / UX / Performance / Downloads / Regional Inquiry launch baseline.

Future development should use this baseline as the reference point and preserve:

- Products: 36
- Media: 132
- Categories: 10
- Sitemap URLs: 55
- Product JSON-LD: 36/36
- 55/55 sitemap URLs HTTP 200
- Six public multilingual catalog PDFs
- Homepage image optimization through `/media/home-thumbnails/`
- Product detail display image optimization through `/media/product-display/`
- Product JSON-LD, OG, and Twitter image behavior
- Canonical safety pointing to `https://dualcorelink.com`
- No `pages.dev`, `localhost`, or local `C:\` path leaks

This launch baseline is suitable for continued GSC monitoring, future verified content expansion, regional landing page planning, and later Lighthouse / Core Web Vitals audits.
