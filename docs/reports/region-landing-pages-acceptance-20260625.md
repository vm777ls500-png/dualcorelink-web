# Region Landing Pages Acceptance Report

Date: 2026-06-25

## 1. Stage Summary

- Stage name: Region Landing Pages Phase 1 / Phase 2 First Batch
- Scope: First batch of English Region Landing Pages
- Implementation commit: `648d76e`
- Commit message: `content: add priority region landing pages`
- Deployment: Cloudflare Pages Production
- Production deployment URL: `https://93d1ee2d.dualcorelink-web.pages.dev`
- Official domain: `https://dualcorelink.com`
- Cloudflare environment: Production
- Branch: `main`
- Source: `648d76e`
- Git status after deployment verification: `main...origin/main`
- Worktree status after deployment verification: clean
- Status: Accepted

## 2. Pages Added

The first batch added and deployed 5 English Region Landing Pages:

1. `/en/regions/middle-east/`
2. `/en/regions/saudi-arabia/`
3. `/en/regions/uae/`
4. `/en/regions/southeast-asia/`
5. `/en/regions/vietnam/`

The following planned pages were not developed and were not added to the sitemap:

1. `/en/regions/indonesia/`
2. `/en/regions/thailand/`
3. `/en/regions/malaysia/`

## 3. Files Changed in Implementation Commit

Implementation commit: `648d76e content: add priority region landing pages`

Files included:

- `src/app/[locale]/regions/[slug]/page.tsx`
- `src/app/[locale]/regions/page.tsx`
- `src/app/sitemap.ts`
- `src/config/region-landing-pages.ts`

## 4. Sitemap Result

- Previous sitemap count: 55 URLs
- Current sitemap count: 60 URLs
- Added Region URLs: 5
- Sitemap URL mapping during local validation: 60/60
- PDF URLs in sitemap: 0
- Sitemap URL: `https://dualcorelink.com/sitemap.xml`
- Sitemap HTTP status after deployment: 200

The sitemap includes the 5 deployed Region pages and excludes the 3 undeveloped pages:

- `/en/regions/indonesia/`: excluded
- `/en/regions/thailand/`: excluded
- `/en/regions/malaysia/`: excluded

## 5. Online Verification

Official domain:

- `https://dualcorelink.com`: HTTP 200

The 5 Region pages all returned HTTP 200:

- `https://dualcorelink.com/en/regions/middle-east/`: 200
- `https://dualcorelink.com/en/regions/saudi-arabia/`: 200
- `https://dualcorelink.com/en/regions/uae/`: 200
- `https://dualcorelink.com/en/regions/southeast-asia/`: 200
- `https://dualcorelink.com/en/regions/vietnam/`: 200

Baseline pages all returned HTTP 200:

- `/en/`
- `/en/products/`
- `/en/solutions/`
- `/en/faqs/`
- `/en/downloads/`
- `/en/contact/`

## 6. SEO Verification

- 5/5 Region pages have normal titles.
- 5/5 Region pages have normal H1 text.
- 5/5 Region page canonicals point to `https://dualcorelink.com` official URLs.
- pages.dev leak: 0
- localhost leak: 0
- `C:\` leak: 0
- Empty `#` links: 0

Verified title / H1 / canonical examples:

| Page | Title / H1 status | Canonical |
| --- | --- | --- |
| Middle East | Normal | `https://dualcorelink.com/en/regions/middle-east/` |
| Saudi Arabia | Normal | `https://dualcorelink.com/en/regions/saudi-arabia/` |
| UAE | Normal | `https://dualcorelink.com/en/regions/uae/` |
| Southeast Asia | Normal | `https://dualcorelink.com/en/regions/southeast-asia/` |
| Vietnam | Normal | `https://dualcorelink.com/en/regions/vietnam/` |

## 7. Content Safety Verification

Forbidden claims were not found on the 5 Region pages:

- local office
- local warehouse
- local stock
- local distributor network
- local installation team
- local after-sales center
- customer names
- hotel brand names
- project numbers
- certificate numbers
- guaranteed compliance
- government approval
- certified for Saudi Arabia
- certified for UAE
- certified for Vietnam

## 8. CTA Verification

- 5/5 Catalog CTA links point to `/en/downloads/`.
- 5/5 Contact CTA links point to `/en/contact/#get-a-quote`.
- 5/5 WhatsApp CTA links exist.

## 9. Baseline Protection

The following baseline values remained unchanged:

- Products: 36
- Media: 132
- Categories: 10
- Product JSON-LD: 36/36
- FAQ visible count: 30
- FAQPage JSON-LD: 30/30
- Catalog PDFs: 6
- Catalog PDF Content-Type: all `application/pdf`

Six Catalog PDFs remained online and returned HTTP 200:

| Language | File size |
| --- | ---: |
| English | 3,328,571 bytes |
| Persian | 3,377,147 bytes |
| Vietnamese | 3,330,985 bytes |
| Spanish | 3,330,549 bytes |
| German | 3,330,741 bytes |
| Arabic | 3,381,239 bytes |

## 10. Business Copy Baseline

The Region pages use safe B2B wording only:

- supports regional inquiries
- product selection support
- catalog and document request support
- OEM/ODM customization available
- voltage, protocol and document requirements should be confirmed by project
- regular products have no fixed MOQ
- custom products may require customization or tooling fees when new molds are needed
- color-only changes using existing molds do not require customization fees
- typical lead time is 7-15 days
- quotation available by email or WhatsApp

The Southeast Asia page was specifically aligned to include the confirmed business terms:

- `Custom products may require customization or tooling fees when new molds are needed.`
- `Color-only changes using existing molds do not require customization fees.`

## 11. Deployment Notes

The standard `npm.cmd run pages:deploy` command rebuilt successfully but could not complete deployment because `CLOUDFLARE_API_TOKEN` was not set in the non-interactive environment.

Deployment was completed using the project's existing `.wrangler-config` login state. No token or sensitive credential was recorded in this report.

## 12. Final Acceptance

Region Landing Pages first batch is accepted and deployed.

Accepted version:

- Commit: `648d76e`
- Production deployment: `https://93d1ee2d.dualcorelink-web.pages.dev`
- Official website: `https://dualcorelink.com`
- Sitemap URLs: 60
- Region landing pages: 5
- Online verification: passed
- Baseline regression: passed
- Content safety verification: passed

## 13. Recommended Next Phase

Recommended next steps:

- Submit or refresh the updated sitemap in Google Search Console if needed.
- Monitor indexing for the 5 Region pages.
- Monitor impressions and queries for Middle East, Saudi Arabia, UAE, Southeast Asia and Vietnam region intent.
- Plan a later phase for Indonesia, Thailand and Malaysia after content readiness and business positioning are reviewed.
- Do not add the remaining 3 pages until their content, target buyer positioning and safe claims have been reviewed.
