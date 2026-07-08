# Visual Design Upgrade Phase 1D Acceptance Report

## 1. Stage Summary

- Stage name: Visual Design Upgrade Phase 1D
- Scope: Homepage Hero / First Screen strengthening
- Commit: 8f92941
- Commit message: style: strengthen homepage hero dashboard
- Deployment: Cloudflare Pages Production
- Production deployment URL: https://9528f0b7.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Status: Accepted

## 2. Change Summary

This stage strengthened the homepage first screen by adding a smart hotel control dashboard visual panel while preserving core SEO text, CTA text, CTA links, content data, sitemap, structured data, redirects, hreflang, contact details, catalog PDFs, and media assets.

Hero improvements:

- Stronger first-screen dashboard composition
- Smart hotel control dashboard visual panel
- Product / RCU / OEM-ODM / market / documentation chips
- More technology-oriented first impression
- No image replacement
- No new dependency
- No content or link changes

## 3. Files Changed

Implementation commit: 8f92941

Changed file:

- `src/app/[locale]/page.tsx`

## 4. Hero Verification

Verified online:

- `/en/` HTTP 200
- H1 remains: `Smart hotel control systems built for global B2B projects.`
- CTA text and href unchanged:
  - `View Products` -> `/en/products/`
  - `Get a Quote` -> `/en/contact/#get-a-quote`
  - `Contact Sales` -> WhatsApp
- Smart hotel control dashboard is live
- Hero buttons remain readable
- No obvious H1 or subtitle overlay issue detected
- No `MEDIA PREVIEW UNAVAILABLE` fallback detected
- Static responsive check found no new mobile fixed-width or horizontal overflow risk

## 5. Dashboard Claim Verification

Safe dashboard claims verified:

- Products 36
- Hotel RCU support
- OEM/ODM ready
- Smart room control
- RCU planning
- Smart panels
- Sensors
- Middle East
- Southeast Asia
- Vietnam
- Datasheets
- Wiring diagrams
- Protocol to confirm
- Voltage / frequency to confirm

Forbidden claims not found:

- local office
- local stock
- local certification
- local distributor network
- guaranteed compliance
- customer names
- hotel brand names
- project numbers

## 6. Baseline Verification

Unchanged:

- Sitemap URL: https://dualcorelink.com/sitemap.xml
- Sitemap HTTP status: 200
- Sitemap URLs: 60
- Sitemap non-English URLs: 0
- Sitemap PDF URLs: 0
- Product JSON-LD: 36/36
- FAQPage JSON-LD: 30/30
- Region landing pages: 5/5 HTTP 200
- Contact details: Office / WeChat / Phone / QR normal
- Header language switcher: English only
- Hreflang: English / x-default only
- Non-English hreflang: 0
- Non-English redirects remain active:
  - `/zh/` -> `/en/`: 301
  - `/de/products/` -> `/en/products/`: 301
- Catalog PDFs: 6/6 HTTP 200, `application/pdf`

## 7. Safety Checks

- pages.dev leak: 0
- localhost leak: 0
- `C:\Users` leak: 0
- empty `#` links: 0

## 8. Final Acceptance

Visual Design Upgrade Phase 1D is accepted and deployed.

Accepted version:

- Commit: 8f92941
- Production deployment: https://9528f0b7.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Status: Accepted

## 9. Recommended Next Phase

Recommended next phase:

- Manual visual review and GSC observation.
- If additional visual enhancement is needed later, plan a separate image/material phase using real product images only.
- Do not introduce AI-generated or unverified product visuals without approval.
