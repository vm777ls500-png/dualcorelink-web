# DualCoreLink SEO, UX, and Performance Acceptance Report

Date: 2026-06-23  
Website: https://dualcorelink.com  
Project: DualCoreLink B2B smart hotel and smart home automation website

## 1. Project Overview

DualCoreLink is a static frontend website backed by Headless WordPress content data and deployed to Cloudflare Pages. The site is positioned for B2B buyers in smart hotel, smart home automation, OEM/ODM, and overseas project supply markets, with priority attention to the Middle East and Southeast Asia.

This report archives the completed SEO, UX, inquiry, social sharing, and performance optimization cycle. It can be used as the current SEO / UX / Performance baseline for future development and regression checks.

## 2. Current Online Status

- Production website: https://dualcorelink.com
- Cloudflare Pages project: `dualcorelink-web`
- Current production source: `d199c2e`
- Latest verified deployment URL: https://42e7f145.dualcorelink-web.pages.dev
- Git branch: `main`
- Git sync status at acceptance: `main...origin/main`
- Working tree at acceptance: clean

Note: `npm.cmd run pages:deploy` may fail in a non-interactive environment when `CLOUDFLARE_API_TOKEN` is not set. The current deployment workflow can use the existing `.wrangler-config` login state to deploy the static `out` directory to Cloudflare Pages. No token value is stored in this report.

## 3. Data Baseline

- Products: 36
- Media: 132
- Categories: 10
- Sitemap URLs: 54
- Product JSON-LD coverage: 36/36
- Static build output: 130/130 pages

## 4. Completed Optimization Phases

### 4.1 Product JSON-LD SEO Repair

- Commit: `38c9b3175f0c6586a23f3ba4dd17b5ff3db64348`
- Message: `seo: add product json ld structured data`
- Goal: restore Product structured data on all product detail pages.
- Result: Product JSON-LD improved from 0/36 to 36/36.
- Verified fields: `name`, `description`, `image`, `brand`, `category`, `url`.
- Excluded unverified commercial/social proof fields: `price`, `availability`, `aggregateRating`, `review`.
- Online verification: passed.

### 4.2 Homepage Hero UI Repair

- Commit: `bb050f7e3663ee8f39e889a8255922668dbd92d9`
- Message: `ui: improve homepage hero visual design`
- Goal: fix the blank white CTA block and improve the hero visual atmosphere.
- Result:
  - Blank CTA issue resolved.
  - Third CTA displays `Contact Sales`.
  - Hero background gained a darker technology-focused visual style.
  - Desktop and mobile layouts passed verification.

### 4.3 Product Category and Series Filter Repair

- Commit: `6172b0aad9ea4e5d932b7cbbe0aeec848c3d0fb5`
- Message: `fix: add accurate product category and series filters`
- Goal: make Browse by Category and Browse by Series cards navigate to accurate filtered product results.
- Result:
  - Category links use `/en/products/?category=<slug>`.
  - Series links use `/en/products/?series=<slug>`.
  - 10/10 category filters passed.
  - 4/4 series filters passed.
  - `View all products` works.
  - Mobile layout showed no horizontal overflow.

### 4.4 Inquiry Trust Copy

- Commit: `f355bfb`
- Message: `ux: clarify inquiry response expectation`
- Goal: improve B2B trust in the inquiry flow.
- Result: Contact form mailto status copy now includes:

```text
Your email client should open with the inquiry details. We will reply within 24 hours on business days.
```

- Online verification: passed.

### 4.5 Product Filter Result Auto-Scroll

- Commit: `3359f9d4ce164106e6407ddaa4de91eb824a9cdf`
- Message: `ux: scroll product filters to results`
- Goal: ensure users see filtered product results after selecting a category or series.
- Result:
  - `category` / `series` parameter pages auto-scroll to `product-results`.
  - Normal `/en/products/` does not auto-scroll.
  - Mobile 375px verification showed no horizontal overflow.

### 4.6 Homepage Image Alt Text

- Commit: `43f0bc039eb9fb0e1e88e17feefff2895499c693`
- Message: `seo: improve homepage image alt text`
- Goal: fix missing or empty alt text in the homepage Representative products section.
- Result:
  - Homepage Representative products images: 8/8 non-empty alt text.
  - `missingOrEmptyAlt`: 0.
  - Online verification: passed.

### 4.7 Meta Title and Description Optimization

- Commit: `db85f7d`
- Message: `seo: refine meta titles and descriptions`
- Goal: improve title and description quality for key pages without creating duplicates or overly generic metadata.
- Result:
  - Sitemap URLs checked: 54/54 HTTP 200.
  - Missing title: 0.
  - Missing description: 0.
  - Duplicate title: 0.
  - Duplicate description: 0.
  - Title too short / too long: 0.
  - Description too short / too long: 0.
  - Canonical issues: 0.
  - All canonical URLs point to `https://dualcorelink.com`.
  - No `pages.dev` or `localhost` canonical leakage.
  - Online verification: passed.

### 4.8 Open Graph and Twitter Review

- Code change: none.
- Scope: 10 representative pages.
- Result:
  - OG/Twitter core fields passed.
  - Missing items: 0.
  - Wrong domains: 0.
  - Inaccessible images: 0.
  - `og:url` points to `https://dualcorelink.com`.
  - `og:image` and `twitter:image` return HTTP 200.
  - `twitter:card` is `summary_large_image`.
  - Product sharing images use corresponding product images.
  - No code change was required.

### 4.9 Homepage Representative Product Image Performance

- Commit: `53cb452`
- Message: `perf: optimize homepage product image loading`
- Goal: reduce homepage product image transfer size while keeping product recognition and alt text intact.
- Result:
  - Added `/media/home-thumbnails/`.
  - Homepage Representative products: 8/8 use `/media/home-thumbnails/`.
  - Original 1-8 MB homepage product image references: 0.
  - Largest homepage product image reduced from 8.56 MB to about 135 KB.
  - Homepage image alt text remains 8/8 non-empty.
  - Visual verification: product subjects remain recognizable.
  - Online verification: passed.

### 4.10 Product Detail Display Image Performance

- Commit: `d199c2e6df2ad9549f5039a712cf4fcd26bc00c4`
- Message: `perf: optimize product detail display images`
- Goal: reduce product detail page LCP / bandwidth risk by using display-size images for page rendering while keeping original high-resolution images for SEO and sharing metadata.
- Deployment:
  - Cloudflare Production Source: `d199c2e`
  - Deployment URL: https://42e7f145.dualcorelink-web.pages.dev
- Result:
  - 36/36 product detail pages return HTTP 200.
  - 36/36 product detail display images use `/media/product-display/`.
  - 36/36 display images return HTTP 200.
  - Product detail display images no longer load MB-level original main images.
  - Display images total size: 3,519,968 bytes, about 3.36 MiB.
  - Average display image size: about 97.8 KB.
  - Largest display image: `/media/product-display/vintage-gold-four-key-smart-switch-panel.jpg`.
  - Largest display image size: 388,678 bytes, about 379.6 KB.
  - Display images over 400 KB: 0.
  - Display images over 500 KB: 0.
  - Display images over 1 MB: 0.
  - `alt`: 36/36.
  - `width`: 36/36.
  - `height`: 36/36.
  - `aspect-[4/3]`: 36/36.
  - Product JSON-LD image was not changed to `/media/product-display/`.
  - `og:image` was not changed to `/media/product-display/`.
  - `twitter:image` was not changed to `/media/product-display/`.
  - Canonical: 36/36 normal.
  - Homepage regression check: passed.

## 5. Google Search Console Status

- Sitemap submission: completed successfully.
- Pages discovered by GSC: 54.
- Key URL inspection and indexing requests: completed.
- `robots.txt`: passed.
- `sitemap.xml`: passed.
- Canonical checks: passed.

## 6. SEO Status

- Product JSON-LD: 36/36.
- Product schema fields include `name`, `description`, `image`, `brand`, `category`, and `url`.
- Product schema does not output unverified `price`, `availability`, `aggregateRating`, or `review`.
- Sitemap URLs: 54.
- Sitemap URL status: verified as HTTP 200 during the meta review cycle.
- Canonical URLs point to `https://dualcorelink.com`.
- No `pages.dev` or `localhost` canonical leakage was found.
- Meta title and description quality checks passed with no missing, duplicate, too-short, or too-long items.

## 7. UX Status

- Homepage hero CTA issue fixed.
- Homepage CTA set includes `View Products`, `Get a Quote`, and `Contact Sales`.
- Product category and series cards navigate to accurate filtered product results.
- Filtered product pages auto-scroll to the result area.
- Contact / inquiry copy now sets a clear B2B reply expectation.
- Mobile checks for major updated flows showed no horizontal overflow.

## 8. Performance Status

Performance checks in this cycle were based on HTML inspection, resource size checks, static export verification, and online HTTP checks. No Lighthouse scores were generated, so this report does not claim Lighthouse Performance, LCP, CLS, INP, TBT, Accessibility, Best Practices, or SEO scores.

### Homepage Image Optimization

- Before: largest homepage Representative products image was about 8.56 MB.
- After: largest homepage product thumbnail is about 135 KB.
- Homepage Representative products now use `/media/home-thumbnails/`.
- Homepage image alt text remains 8/8 non-empty.

### Product Detail Image Optimization

- Before:
  - Original product detail main images total size: about 108.7 MiB.
  - Images over 500 KB: 33/36.
  - Images over 1 MB: 30/36.
  - Largest original image: about 11.76 MiB.
- After:
  - Display images total size: about 3.36 MiB.
  - Average display image size: about 97.8 KB.
  - Largest display image: about 379.6 KB.
  - Images over 400 KB: 0.
  - Images over 500 KB: 0.
  - Images over 1 MB: 0.

The original high-resolution product images remain available for SEO, OG, Twitter, Product JSON-LD, and future high-resolution use.

## 9. Open Graph and Twitter Status

- Representative OG/Twitter checks passed.
- Required OG/Twitter fields were present on checked pages.
- `og:url` points to the production domain.
- `og:image` and `twitter:image` return HTTP 200.
- Product pages use corresponding product images for sharing.
- The product detail display image optimization did not change OG or Twitter image URLs to `/media/product-display/`.

## 10. Cloudflare Deployment Status

- Deployment target: Cloudflare Pages.
- Project name: `dualcorelink-web`.
- Latest verified production source: `d199c2e`.
- Latest verified deployment URL: https://42e7f145.dualcorelink-web.pages.dev.
- Static output directory: `out`.
- Build verification: passed.

## 11. Current Git Status

At the end of the implementation and online verification cycle:

```text
main...origin/main
working tree clean
```

This documentation task creates this acceptance report and should be committed separately after review.

## 12. Known Non-Blocking Items

- No Lighthouse run was performed in this cycle. Performance conclusions are based on static export, HTML, resource, and online HTTP checks.
- `next/image` fixed-dimension output did not preserve the `sizes` attribute in the inspected live product image tag, but width, height, fixed aspect-ratio containers, eager loading, high fetch priority, and async decoding are present.
- Cloudflare deployment in this environment may require `.wrangler-config` login-state fallback when `CLOUDFLARE_API_TOKEN` is not set.

## 13. Recommended Next Steps

- Keep this report as the SEO / UX / Performance baseline for future changes.
- For future performance work, run Lighthouse or PageSpeed Insights externally when a browser-based lab measurement is needed.
- Continue to avoid adding unverified structured data fields such as price, availability, aggregate rating, or reviews.
- Before future SEO or routing changes, re-run sitemap, canonical, Product JSON-LD, OG/Twitter, and key product-page checks.
- Consider a future image pipeline plan if product media grows beyond the current 36-product catalog.

## 14. Final Conclusion

The current production version of DualCoreLink is accepted as a stable SEO / UX / Performance baseline. The site has complete Product JSON-LD coverage, clean sitemap and canonical behavior, improved inquiry and product navigation UX, validated social sharing metadata, and substantially reduced image transfer risk on both homepage and product detail pages.

No blocking SEO, UX, or performance issues were found at the end of this cycle.
