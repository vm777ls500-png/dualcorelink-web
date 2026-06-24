# Regional Market Inquiry Acceptance Report

Date: 2026-06-23

## Project Overview

DUALCORE LINK is a B2B smart hotel and smart home automation website for overseas project buyers, system integrators, distributors, and OEM/ODM partners.

Production website: <https://dualcorelink.com>

Current verified baseline after this stage:

- Products: 36
- Media: 132
- Categories: 10
- Sitemap URLs: 55
- Product JSON-LD: 36/36 product detail pages
- Sitemap URL status: 55/55 HTTP 200
- Canonical status: 55/55 sitemap pages point to `https://dualcorelink.com`
- Git status at final verification: `main` synchronized with `origin/main`

## Stage Scope

This stage strengthened regional market inquiry messaging for Middle East and Southeast Asia project buyers without creating unsupported local claims.

In scope:

- Add regional inquiry support content to `/en/regions/`.
- Show the main target markets for current inquiry routing.
- Clarify which project parameters buyers should provide for regional inquiries.
- Add region-aware inquiry guidance to the Contact page.
- Add early selection guidance for Middle East and Southeast Asia buyers on the Downloads page.
- Verify CTA paths, SEO safety, JSON-LD safety, canonical safety, sitemap stability, image optimization stability, and PDF availability.

Out of scope:

- No region detail pages were added.
- No route structure was changed.
- No sitemap URL was added in this stage.
- No product data was changed.
- No Product JSON-LD was changed.
- No catalog PDF files were changed.
- No local certification, office, inventory, customer case, distributor, or compliance claim was added.

## Baseline Before This Stage

Before the Region / Market inquiry stage:

- `/en/regions/` existed and returned HTTP 200.
- Products remained 36.
- Media remained 132.
- Categories remained 10.
- Sitemap contained 55 URLs.
- Product JSON-LD coverage was 36/36.
- `/en/downloads/` was already included in sitemap.
- Six multilingual catalog PDFs were already live and returned `application/pdf`.
- Homepage product images used `/media/home-thumbnails/`.
- Product detail display images used `/media/product-display/`.
- Git `main` was synchronized with `origin/main`, and the working tree was clean.

## Commit Information

- Commit: `938152355a85ee8aeb943676a4aff504346aa4b0`
- Short commit: `9381523`
- Message: `content: strengthen regional market inquiry messaging`

Changed files:

- `src/app/[locale]/regions/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/downloads/page.tsx`

## Production Deployment

- Cloudflare Pages project: `dualcorelink-web`
- Production deployment URL: <https://72901e2f.dualcorelink-web.pages.dev>
- Production Source: `9381523`
- Primary production domain: <https://dualcorelink.com>
- Deployment method: Cloudflare Pages deployment from the static export in `out`.
- Note: the deployment workflow can use the existing `.wrangler-config` login state when `CLOUDFLARE_API_TOKEN` is not available in the local shell. No token value is documented here.

## Region / Market Content Update Summary

The stage added a clearer regional inquiry support path for buyers preparing hotel, apartment, distributor, or OEM/ODM automation projects in the Middle East and Southeast Asia.

The update focuses on practical project intake information:

- Target region or country
- Hotel room or project type
- Voltage and frequency requirements
- Preferred protocol or wiring approach
- Estimated quantity
- Required documents

This keeps the page useful for B2B conversion while avoiding unsupported local market claims.

## Target Markets Covered

The Regions page now displays the following target markets:

- Middle East
- Saudi Arabia
- United Arab Emirates
- Southeast Asia
- Vietnam
- Indonesia
- Thailand
- Malaysia

These are presented as market coverage and inquiry support targets, not as claims of local offices, local inventory, certified local distribution, or completed local customer projects.

## Regional Inquiry Parameters

The Regions page now asks buyers to include:

- Country
- Hotel room type
- Voltage and frequency requirements
- Protocol preference
- Quantity
- Required documents

These parameters are appropriate for B2B smart hotel, smart home automation, and OEM/ODM project scoping.

## Regions Page Verification

Verified URL:

- <https://dualcorelink.com/en/regions/>

Verification results:

- HTTP status: 200
- Canonical: `https://dualcorelink.com/en/regions/`
- `Regional Project Inquiry Support` is present.
- All target market labels are present.
- Regional inquiry parameters are present.
- `Discuss Regional Project` CTA is present.
- `View Catalogs` CTA is present.
- No `pages.dev`, `localhost`, or local `C:\` path leak was found.

## Contact Page Verification

Verified URL:

- <https://dualcorelink.com/en/contact/>

Verification results:

- HTTP status: 200
- Middle East / Southeast Asia regional inquiry guidance is present.
- Original form fields remain available.
- The previous 24-hour response expectation copy remains in the deployed contact page client bundle as a submit-state message.
- WhatsApp, Email, Sales, and Support contact entries remain available.
- No empty button or `#` placeholder link was found.
- Canonical is correct.

## Downloads Page Verification

Verified URL:

- <https://dualcorelink.com/en/downloads/>

Verification results:

- HTTP status: 200
- Multilingual catalog section remains available.
- Six PDF catalog links remain present.
- Middle East / Southeast Asia early selection guidance is present.
- `Request Project Documents` remains available.
- Canonical is correct.
- No `pages.dev`, `localhost`, or local `C:\` path leak was found.

## CTA Verification

Regions page CTA verification:

- `Discuss Regional Project` links to `/en/contact/#get-a-quote`.
- `View Catalogs` links to `/en/downloads/`.

Downloads page CTA verification:

- `Request Project Documents` links to `/en/contact/#get-a-quote`.

No empty CTA, broken placeholder CTA, or `#`-only link was found during verification.

## Risk Controls

The stage intentionally avoided unsupported regional claims:

- No unverified local offices were claimed.
- No local inventory was claimed.
- No unverified local certifications were claimed.
- No customer names or local case studies were fabricated.
- No distributor or partner network was fabricated.
- No regional legal or compliance claims were fabricated.

The content uses inquiry support language and practical project scoping guidance instead of market-specific proof claims that are not yet verified.

## Full Regression Results

Verified full-site status after deployment:

- `/en/`: HTTP 200
- `/en/products/`: HTTP 200
- `/en/contact/`: HTTP 200
- `/en/downloads/`: HTTP 200
- Product detail pages: 36/36 HTTP 200
- Sitemap URLs: 55
- Sitemap URL status: 55/55 HTTP 200
- Products: 36
- Product JSON-LD: 36/36
- Catalog PDFs: 6/6 HTTP 200 and `application/pdf`
- No `pages.dev`, `localhost`, or local `C:\` leak was found in the checked pages.

## SEO / JSON-LD / Canonical Safety

SEO safety results:

- Product JSON-LD remains 36/36.
- No product data was changed.
- No Product JSON-LD fields were changed.
- Existing Product JSON-LD image behavior was not changed.
- Canonical status remains 55/55 for sitemap pages.
- Canonicals point to `https://dualcorelink.com`.
- No `pages.dev` or `localhost` canonical was found.

## Sitemap Status

Sitemap status after this stage:

- Sitemap URL: <https://dualcorelink.com/sitemap.xml>
- URL count: 55
- Status: 55/55 URLs return HTTP 200
- `/en/downloads/` remains included from the previous Downloads sitemap stage.
- `/en/regions/` was not added to sitemap during this stage.
- No PDF URLs were added to sitemap.
- No query URLs were added to sitemap.

## Image and PDF Optimization Regression Safety

Image and PDF regression checks:

- Homepage representative product images still use `/media/home-thumbnails/`.
- Product detail display images still use `/media/product-display/`: 36/36.
- Product detail display images return HTTP 200: 36/36.
- Six multilingual catalog PDFs remain available.
- Six catalog PDF responses use `application/pdf`.
- No image optimization or PDF publication regression was detected.

## Known Non-Blocking Items

- Region detail pages are not yet published.
- `/en/regions/` is currently an inquiry support and market coverage page, not a full SEO landing page cluster.
- Market-specific FAQs, product bundles, and localized landing pages can be developed later with verified content.
- `/en/regions/` sitemap inclusion can be evaluated later when content depth is stronger.

## Future Recommendations

- Create verified Middle East and Southeast Asia landing pages later.
- Add Saudi Arabia, UAE, Vietnam, Indonesia, Thailand, and Malaysia pages only after content requirements are clear.
- Add market-specific FAQ and inquiry fields if the sales workflow needs more structured intake.
- Link catalog language versions to target markets when multilingual site structure is ready.
- Continue avoiding unverified certification, distributor, office, inventory, and customer claims.
- Continue monitoring GSC indexing, product rich result status, and inquiry behavior after regional copy changes.

## Final Acceptance Conclusion

The Region / Market inquiry enhancement stage is accepted as a safe B2B conversion and trust content improvement.

The deployed site now provides clearer regional inquiry guidance for Middle East and Southeast Asia buyers while preserving SEO, JSON-LD, sitemap, canonical, PDF, and image optimization baselines.

This stage can be sealed as a completed regional market inquiry baseline. Future region-specific landing pages should be created only when verified local content, market requirements, and supporting proof assets are available.
