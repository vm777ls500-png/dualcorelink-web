# Downloads / Catalog Acceptance Report

Date: 2026-06-23

## Project Overview

DUALCORE LINK is a B2B smart hotel and smart home automation website for overseas project buyers, system integrators, distributors, and OEM/ODM partners.

Production website: <https://dualcorelink.com>

Current verified baseline after this stage:

- Products: 36
- Media: 132
- Categories: 10
- Product JSON-LD: 36/36 product detail pages
- Sitemap URLs: 55
- Sitemap URL status: 55/55 HTTP 200
- `/en/downloads/`: included in sitemap
- Git status at final verification: `main` synchronized with `origin/main`

## Stage Scope

This stage created a real public catalog download path and then updated sitemap visibility for the Downloads page.

In scope:

- Clarify the document request strategy on `/en/downloads/`.
- Publish real multilingual product catalog PDFs.
- Keep detailed documents such as datasheets, certificates, wiring references, and OEM/ODM files gated by project confirmation where needed.
- Add `/en/downloads/` to sitemap after real public catalog content was available.
- Verify SEO, JSON-LD, canonical, PDF URL safety, and full-site regression.

Out of scope:

- No fake certificates.
- No fake datasheets.
- No fake manuals.
- No fake download links.
- No product data changes.
- No Product JSON-LD changes.
- No route structure changes.
- No PDF file URLs added to sitemap.

## Baseline Before This Stage

Before the Downloads / Catalog stage:

- `/en/downloads/` existed and returned HTTP 200.
- The page had a document request entry but no public catalog files.
- Sitemap contained 54 URLs.
- `/en/downloads/` was not included in sitemap.
- Products remained 36.
- Product JSON-LD coverage was 36/36.
- The site had no public fake certificates, fake datasheets, fake manuals, or fake PDF download links.

## Commit Summary

### Downloads Request Document Strategy

- Commit: `b7fc9f0`
- Message: `content: clarify downloads request document strategy`

Result:

- `/en/downloads/` displays `Available by request`.
- The page lists:
  - Product datasheets and catalogs
  - Installation and wiring references
  - Certificate or test report copies when verified
  - OEM/ODM customization documents
- `Request Project Documents` links to `/en/contact/#get-a-quote`.
- No fake certificates, fake datasheets, fake manuals, or fake download links were added.
- Sitemap remained 54 URLs at this step.

### Multilingual Catalog PDF Publication

- Commit: `22e4557`
- Message: `content: add multilingual product catalog downloads`

Result:

- `/en/downloads/` displays `Multilingual Product Catalogs`.
- Six real multilingual catalog PDF files were added under `/downloads/catalog/`.
- PDF catalog files are real files copied from the provided local multilingual catalog folder.
- 6/6 PDF URLs returned HTTP 200 online.
- PDF `Content-Type` was `application/pdf`.
- `Request Project Documents` remained available.
- No fake certificates, fake datasheets, fake manuals, or fake download links were added.

### Downloads Sitemap Inclusion

- Commit: `34d98c052884b7ecc709555c1f0bc118104588ee`
- Message: `seo: include downloads page in sitemap`
- Cloudflare Production deployment: <https://e5ebcbb4.dualcorelink-web.pages.dev>
- Production source: `34d98c0`

Result:

- `/en/downloads/` was added to sitemap.
- Sitemap URL count changed from 54 to 55.
- Sitemap includes `/en/downloads/` but does not include PDF files.
- PDF URL count in sitemap: 0
- Query URL count in sitemap: 0
- `pages.dev`, `localhost`, and local `C:\` leakage in sitemap: 0
- 55/55 sitemap URLs returned HTTP 200.

## Downloads Request Document Strategy

The Downloads page now separates public catalog downloads from project documents that may require confirmation.

Public downloads:

- Multilingual product catalog PDFs

Available by request:

- Product datasheets and catalogs
- Installation and wiring references
- Certificate or test report copies when verified
- OEM/ODM customization documents

This keeps sensitive or verification-dependent documents controlled while providing a clear public resource path for B2B buyers.

## Multilingual Catalog PDF Publication

Six public catalog PDFs were published.

Download base path:

```text
/downloads/catalog/
```

The Downloads page shows each catalog with:

- Language
- File type: PDF Catalog
- File size
- Download PDF CTA

## PDF File Inventory

| Language | Public filename | Online size |
| --- | --- | ---: |
| English | `dualcorelink-smart-hotel-automation-catalog-en.pdf` | 3,328,571 bytes |
| Persian | `dualcorelink-smart-hotel-automation-catalog-fa.pdf` | 3,377,147 bytes |
| Vietnamese | `dualcorelink-smart-hotel-automation-catalog-vi.pdf` | 3,330,985 bytes |
| Spanish | `dualcorelink-smart-hotel-automation-catalog-es.pdf` | 3,330,549 bytes |
| German | `dualcorelink-smart-hotel-automation-catalog-de.pdf` | 3,330,741 bytes |
| Arabic | `dualcorelink-smart-hotel-automation-catalog-ar.pdf` | 3,381,239 bytes |

Verification:

- 6/6 PDF URLs returned HTTP 200.
- 6/6 PDF responses used `application/pdf`.
- PDF URLs are stable lowercase public paths.
- PDF URLs contain no spaces, Chinese characters, local paths, query strings, `pages.dev`, or `localhost`.

## Downloads Page Verification

Verified URL:

- <https://dualcorelink.com/en/downloads/>

Results:

- HTTP 200
- `Multilingual Product Catalogs` visible
- Six catalog languages visible: English, Persian, Vietnamese, Spanish, German, Arabic
- `Download PDF` CTAs visible
- `Request Project Documents` still present
- `Request Project Documents` still points to `/en/contact/#get-a-quote`
- No empty buttons or `#` links were found
- No fake certificates, fake datasheets, fake manuals, or fake download links were added

## Sitemap Update From 54 to 55 URLs

The sitemap was updated only after real public catalog content existed on the Downloads page.

Result:

- Before: 54 URLs
- After: 55 URLs
- Added page: `https://dualcorelink.com/en/downloads/`
- PDF URLs in sitemap: 0
- Query URLs in sitemap: 0
- `pages.dev`, `localhost`, or local `C:\` leakage: 0

The sitemap includes `/en/downloads/` but does not include PDF files.

## GSC Update Status

Google Search Console update status:

- GSC update completed after the sitemap change.
- The expected sitemap baseline is now 55 URLs.

Recommended monitoring:

- Confirm that GSC reflects the updated 55 URL sitemap count after recrawl.
- Watch `/en/downloads/` indexing status and any crawl or rich result reports relevant to the page.

## SEO Safety Checks

Verified results:

- Sitemap HTTP 200
- Sitemap URL count: 55
- Sitemap URLs returning HTTP 200: 55/55
- `/en/downloads/` included in sitemap
- PDF files not included in sitemap
- No query URLs included in sitemap
- No `pages.dev`, `localhost`, or local `C:\` leakage

## Canonical / Robots / Sitemap Status

Downloads page canonical:

```text
https://dualcorelink.com/en/downloads/
```

Status:

- `/en/downloads/` HTTP 200
- Canonical points to the production domain
- robots allows crawling
- sitemap includes the Downloads page
- sitemap does not include PDF files

## PDF URL Safety

All published PDF URLs use production-safe public paths:

```text
/downloads/catalog/dualcorelink-smart-hotel-automation-catalog-en.pdf
/downloads/catalog/dualcorelink-smart-hotel-automation-catalog-fa.pdf
/downloads/catalog/dualcorelink-smart-hotel-automation-catalog-vi.pdf
/downloads/catalog/dualcorelink-smart-hotel-automation-catalog-es.pdf
/downloads/catalog/dualcorelink-smart-hotel-automation-catalog-de.pdf
/downloads/catalog/dualcorelink-smart-hotel-automation-catalog-ar.pdf
```

Safety checks:

- No spaces
- No Chinese characters
- No local `C:\` paths
- No `pages.dev` URLs
- No `localhost` URLs
- No query strings
- No PDF URLs added to sitemap

## Product JSON-LD Safety

Product JSON-LD was not changed in this stage.

Verified result:

- Product JSON-LD: 36/36 product detail pages
- Products: 36
- No price, availability, aggregateRating, or review fields were added as part of this stage.

## Image Optimization Regression Safety

Image optimization remained stable after this stage.

Verified results:

- Homepage representative product images still use `/media/home-thumbnails/`.
- Product detail display images still use `/media/product-display/`: 36/36
- Product detail display images returned HTTP 200: 36/36
- No regression to original MB-scale product display images was detected in the checked display image paths.

## Full Regression Results

Final online regression after Cloudflare Production deployment:

- `/en/`: HTTP 200
- `/en/products/`: HTTP 200
- `/en/contact/`: HTTP 200
- `/en/downloads/`: HTTP 200
- Product detail pages: 36/36 HTTP 200
- Product JSON-LD: 36/36
- Sitemap URLs: 55
- Sitemap URLs HTTP 200: 55/55
- Canonical URLs: 55/55 point to `https://dualcorelink.com`
- `pages.dev` / `localhost` leakage: 0
- PDF URLs HTTP 200: 6/6
- PDF `Content-Type`: 6/6 `application/pdf`

## Known Non-Blocking Items

- PDF files are currently public catalog files only; detailed datasheets, certificates, wiring references, and OEM/ODM project documents may still require confirmation.
- PDF URLs are not included in sitemap; only the Downloads page is included.
- Future datasheet or certificate publication should only use verified files.
- Certificate scans should remain private unless verified and approved for public release.

## Future Recommendations

- Monitor GSC sitemap discovered URL count after update to 55.
- Add real datasheets and certificates when finalized.
- Consider adding PDF-specific tracking or lead capture later if needed.
- Consider localized download pages only when multilingual site structure is ready.
- Keep certificate scans private unless verified.
- Continue checking that public download links do not expose drafts, internal filenames, local paths, or unverified documents.

## Final Acceptance Conclusion

The Downloads / Catalog stage is accepted.

DUALCORE LINK now has a public Downloads page with real multilingual catalog PDFs, a clear request path for controlled project documents, and sitemap inclusion for `/en/downloads/`. The stage preserved Product JSON-LD, product count, canonical safety, image optimization, and the production sitemap quality baseline.

This stage can be sealed.
