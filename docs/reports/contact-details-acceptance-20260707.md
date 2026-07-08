# Contact Details Acceptance Report

## 1. Stage Summary

- Stage name: Contact Details Update
- Scope: Add office address, WeChat contact, phone number, and WeChat QR code
- Commit: aaeb1e1
- Commit message: content: add office and WeChat contact details
- Deployment: Cloudflare Pages Production
- Production deployment URL: https://6cce635e.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Status: Accepted

## 2. Change Summary

This stage added public contact information to the website.

Contact page additions:

- Office Address
- WeChat ID
- Phone
- WeChat QR code

Footer additions:

- Office: Cangzhou, Hebei, China
- WeChat: a13703333750
- Phone: +86 13703333750

## 3. Files Changed

Implementation commit: aaeb1e1

Changed files:

- `src/app/[locale]/contact/page.tsx`
- `src/components/layout/footer.tsx`

Added file:

- `public/media/contact/wechat-allan-qr.png`

## 4. Contact Page Verification

Verified URL:

- https://dualcorelink.com/en/contact/

Result:

- HTTP 200
- Office Address displayed correctly
- WeChat ID `a13703333750` displayed correctly
- Phone `+86 13703333750` displayed correctly
- `tel:+8613703333750` exists
- WeChat QR code displayed correctly
- QR URL HTTP 200
- QR Content-Type: image/png
- QR alt: WeChat QR code for DualCoreLink contact
- Existing inquiry form retained
- Existing Get a Quote CTA retained
- Existing WhatsApp CTA retained

Public contact details verified:

- Office Address: Unit 1-2202, Building 19, Yuhe Xincheng East District, Yuhe Road, Yunhe District, Cangzhou City, Hebei Province, China
- WeChat: a13703333750
- Phone: +86 13703333750
- tel: tel:+8613703333750
- QR URL: https://dualcorelink.com/media/contact/wechat-allan-qr.png

## 5. Footer Verification

Verified on homepage:

- Office: Cangzhou, Hebei, China
- WeChat: a13703333750
- Phone: +86 13703333750
- Footer does not display large QR image
- Empty # links: 0

## 6. Baseline Protection

Unchanged:

- Sitemap URLs: 60
- Sitemap non-English URLs: 0
- Sitemap PDF URLs: 0
- Product JSON-LD: 36/36
- FAQPage JSON-LD: 30/30
- FAQ visible count: 30
- Region landing pages: 5/5 HTTP 200
- Header language switcher: English only
- Hreflang: English / x-default only
- Non-English redirects remain active
- Catalog PDFs: 6/6 HTTP 200 application/pdf

## 7. Safety Checks

- pages.dev leak: 0
- localhost leak: 0
- C:\ leak: 0
- empty # links: 0

## 8. Final Acceptance

Contact Details Update is accepted and deployed.

Accepted version:

- Commit: aaeb1e1
- Production deployment: https://6cce635e.dualcorelink-web.pages.dev
- Official website: https://dualcorelink.com
- Contact page: updated
- Footer: updated
- QR image: available

This report only archives the accepted Contact Details Update. No code, sitemap, product data, FAQ, Region pages, Catalog PDFs, images, redirects, hreflang, or Cloudflare deployment changes are included in this documentation commit.
