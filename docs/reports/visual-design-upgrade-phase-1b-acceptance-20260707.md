# Visual Design Upgrade Phase 1B Acceptance Report

## 1. Stage Summary

- Stage name: Visual Design Upgrade Phase 1B
- Scope: Minimum CSS and component appearance upgrade
- Commit: f77b915
- Commit message: style: enhance visual design system
- Deployment: Cloudflare Pages Production
- Production deployment URL: https://5d3c2193.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Status: Accepted

## 2. Change Summary

This stage upgraded the website visual system while preserving content, links, SEO, structured data, sitemap, redirects, hreflang, and media assets.

Visual improvements:

- Global visual utility classes
- Homepage preview card styling
- Product and solution list card styling
- MediaFrame image frame styling
- Contact CTA band styling
- Button and card hover states
- Subtle technology-style surface, border, shadow, and media frame effects

No product data, FAQ data, Region page content, Contact details, sitemap logic, Product JSON-LD, FAQPage JSON-LD, hreflang, redirects, Catalog PDFs, or image files were changed as part of this stage.

## 3. Files Changed

Implementation commit: f77b915

Changed files:

- src/app/globals.css
- src/components/home/preview-grid.tsx
- src/components/content/content-list.tsx
- src/components/content/media-frame.tsx
- src/components/content/contact-cta.tsx

## 4. Visual Utilities Added / Enhanced

- brand-button
- brand-button-outline
- surface-card
- surface-card-hover
- media-shell
- section-tech
- section-soft
- eyebrow-chip
- tech-grid
- glow-orb

The `glow-orb` utility was added as part of the visual utility set, but Phase 1B did not add new image assets, canvas effects, heavy JavaScript animation, or large visual media.

## 5. Online Visual Verification

Verified on the official domain:

- Homepage loads the new CSS bundle.
- Homepage includes the new visual classes: `surface-card`, `media-shell`, and `brand-button-outline`.
- Homepage solution cover images remain valid.
- Homepage thumbnail images remain valid.
- Product detail MediaFrame styling is active.
- Product detail images remain `object-contain` and are not forced into distorted cover behavior.
- Contact CTA uses the upgraded `section-tech` styling.
- `.cta-button-light` remains a white-background button with brand blue-green text.
- No `MEDIA PREVIEW UNAVAILABLE` fallback was detected on the checked pages.
- No obvious text overlap or broken image paths were detected during HTML, CSS, and resource verification.

Checked pages:

- https://dualcorelink.com/en/
- https://dualcorelink.com/en/products/
- https://dualcorelink.com/en/solutions/
- https://dualcorelink.com/en/products/86-type-ai-smart-control-display/
- https://dualcorelink.com/en/contact/

## 6. Page Regression Verification

HTTP 200:

- /en/
- /en/products/
- /en/solutions/
- /en/products/86-type-ai-smart-control-display/
- /en/contact/
- 5/5 launched Region pages

Region pages verified:

- /en/regions/middle-east/
- /en/regions/saudi-arabia/
- /en/regions/uae/
- /en/regions/southeast-asia/
- /en/regions/vietnam/

Contact details remain valid:

- Office details remain visible.
- WeChat details remain visible.
- Phone details remain visible.
- QR image remains visible.
- QR image URL returns HTTP 200 with `image/png`.

## 7. SEO and Data Baseline

Unchanged after deployment:

- Sitemap URL: https://dualcorelink.com/sitemap.xml
- Sitemap HTTP status: 200
- Sitemap URLs: 60
- Sitemap URL HTTP status: 60/60 HTTP 200
- Sitemap non-English URLs: 0
- Sitemap PDF URLs: 0
- Product JSON-LD: 36/36
- FAQPage JSON-LD: present
- FAQ Question count: 30
- Header language switcher: English only
- Hreflang: English / x-default only
- Non-English hreflang: 0
- Non-English redirects remain active.
- Catalog PDFs: 6/6 HTTP 200 application/pdf

Redirect examples verified:

- /zh/ -> /en/: 301
- /de/products/ -> /en/products/: 301

## 8. Safety Checks

- pages.dev leak: 0
- localhost leak: 0
- C:\ leak: 0
- empty # links: 0

The verification was based on the official production domain, sitemap HTML scans, CSS checks, selected page checks, redirect checks, and static resource checks.

## 9. Final Acceptance

Visual Design Upgrade Phase 1B is accepted and deployed.

Accepted version:

- Commit: f77b915
- Production deployment: https://5d3c2193.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Status: Accepted

The stage can be used as the current visual baseline for the next design refinement pass.

## 10. Recommended Next Phase

Recommended next phase: Visual Design Upgrade Phase 1C, focused on homepage visual strengthening.

Suggested focus:

- Homepage hero refinement
- Section background rhythm
- Product category visual hierarchy
- Solution section stronger presentation
- Region market block visual enhancement
- FAQ preview styling
- Final CTA enhancement

Do not start Phase 1C until this Phase 1B report is committed and pushed.
