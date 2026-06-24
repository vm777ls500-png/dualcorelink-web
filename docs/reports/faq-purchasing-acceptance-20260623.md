# FAQ Purchasing Enhancement Acceptance Report

Date: 2026-06-23

## Project Overview

DUALCORE LINK is a B2B smart hotel and smart home automation website for overseas project buyers, hotel engineering teams, system integrators, distributors, contractors, and OEM/ODM partners.

Production website: <https://dualcorelink.com>

Current verified production baseline after this stage:

- Products: 36
- Media: 132
- Categories: 10
- Sitemap URLs: 55
- Product JSON-LD: 36/36 product detail pages
- Sitemap URL status: 55/55 HTTP 200
- Canonical status: 55/55 sitemap pages point to `https://dualcorelink.com`
- Catalog PDFs: 6/6 online and served as `application/pdf`
- Git status at final verification: `main` synchronized with `origin/main`

## Stage Scope

This stage aligned the FAQ purchasing content with confirmed B2B business policies and strengthened FAQ coverage for procurement, quotation, OEM/ODM, project documents, regional project inquiries, and hotel RCU requirements.

In scope:

- Align selected FAQ titles with confirmed purchasing questions.
- Align MOQ wording with confirmed regular and customized product policy.
- Align lead time wording with confirmed 7-15 day guidance and cautionary dependency language.
- Clarify OEM/ODM, customization, RCU, document request, regional project, quotation, and partner inquiry support.
- Preserve existing FAQ page CTA paths.
- Preserve existing FAQPage JSON-LD behavior.
- Verify sitemap, Product JSON-LD, canonical, PDF, and image optimization regression safety.

Out of scope:

- No new FAQ detail pages.
- No sitemap change.
- No Product JSON-LD change.
- No product data change.
- No PDF change.
- No image change.
- No route structure change.
- No fabricated prices, inventory, certification numbers, customer cases, local offices, local stock, or distributor network.

## Baseline Before This Stage

Before the FAQ purchasing alignment stage:

- `/en/faqs/` existed and returned HTTP 200.
- FAQ total count was 30.
- FAQPage JSON-LD existed and covered 30/30 visible FAQ items.
- Products remained 36.
- Sitemap URLs remained 55.
- Product JSON-LD coverage remained 36/36.
- Six multilingual catalog PDFs were online.
- Homepage product thumbnails used `/media/home-thumbnails/`.
- Product detail display images used `/media/product-display/`.
- Git `main` was synchronized with `origin/main`, and the working tree was clean.

## Commit Information

Two related commits completed this stage:

### FAQ Purchasing Expansion

- Commit: `739de22`
- Message: `content: expand b2b purchasing faqs`

Result:

- FAQ total count became 30.
- B2B purchasing, quotation, document request, regional project, and system integration FAQ coverage was expanded.
- FAQ page CTA paths were strengthened.

### FAQ Business Terms Alignment

- Commit: `676344d`
- Message: `content: align purchasing faq business terms`

Result:

- FAQ titles and answers were aligned with confirmed business wording.
- MOQ policy was clarified.
- Lead time wording was aligned to 7-15 days with dependency context.
- FAQPage JSON-LD remained 30/30 and valid.

## Production Deployment

- Cloudflare Pages project: `dualcorelink-web`
- Production deployment URL: <https://16ef4922.dualcorelink-web.pages.dev>
- Production Source: `676344d`
- Primary production domain: <https://dualcorelink.com>
- Deployment method: Cloudflare Pages deployment from the static export in `out`.
- Note: the deployment workflow can use the existing `.wrangler-config` login state when `CLOUDFLARE_API_TOKEN` is not available in the local shell. No token value is documented here.

## FAQ Content Update Summary

The FAQ page now provides clearer B2B purchasing answers for buyers who need to understand MOQ, lead time, quotation inputs, OEM/ODM support, customization scope, hotel RCU support, document availability, regional suitability, and cooperation channels.

Verified URL:

- <https://dualcorelink.com/en/faqs/>

Final online verification:

- HTTP status: 200
- Canonical: `https://dualcorelink.com/en/faqs/`
- FAQ count: 30
- FAQPage JSON-LD: 30/30
- JSON-LD validity: valid and parseable
- FAQPage JSON-LD scope: visible FAQ content only

## FAQ Business Terms Alignment

The following exact B2B purchasing FAQ titles were verified online:

- What is your MOQ for regular and customized products?
- What is the typical lead time?
- Do you support OEM/ODM?
- Can you customize panel color, logo and button layout?
- Do you support hotel project RCU requirements?
- Can you provide datasheets, certificates or wiring diagrams?
- Are your products suitable for Middle East and Southeast Asia projects?
- How can I get a quotation?
- Can I send project drawings, BOM or product lists?
- Do you work with distributors, contractors and system integrators?

The answers are written in a concise B2B style and avoid unsupported claims.

## MOQ Policy

Confirmed MOQ wording:

- Regular products have no fixed MOQ.
- Custom products may require a customization or tooling fee when new molds are needed.
- If an existing mold is used and only the color is changed, no customization fee is required.

Online verification confirmed the FAQ page contains this MOQ policy.

## Lead Time Policy

Confirmed lead time wording:

- Typical lead time is 7-15 days.
- Lead time depends on product type, customization requirements, and order quantity.

Online verification confirmed the FAQ page contains both the 7-15 day lead time and dependency wording.

## OEM/ODM and Customization Support

Confirmed support wording:

- OEM/ODM requests are supported for smart panels, hotel room control products, and related automation devices.
- Panel color, logo, and button layout can be customized based on the product series, mold availability, and project requirements.
- Buyers are asked to share drawings, reference photos, or customization details for evaluation.

No factory scale, certification, or unsupported manufacturing capability claim was added.

## Hotel RCU Support

Confirmed hotel RCU support wording:

- Hotel project RCU requirements are supported.
- The page mentions RCU hosts, smart panels, sensors, thermostats, curtain control, and service panels.

This is presented as project support and product matching guidance, not as a guaranteed fixed package for every market.

## Datasheet / Certificate / Wiring Diagram Support

Confirmed document wording:

- Product datasheets, certificate copies, and wiring diagrams can be provided.
- Some documents may require product, market, or project confirmation before sharing.

No certificate numbers, test report numbers, fake certificates, or fake datasheets were added.

## Middle East / Southeast Asia Support

Confirmed regional wording:

- Smart hotel and smart home automation products are suitable for Middle East and Southeast Asia project inquiries.
- Buyers are asked to share country, voltage/frequency, protocol preference, quantity, and required documents.

No local office, local inventory, local certification, local customer case, or distributor network claim was added.

## Quotation Process

Confirmed quotation wording:

- Customers can request a quotation by email or WhatsApp.
- For faster quotation, buyers should include product list, country, estimated quantity, voltage, protocol or wiring needs, customization requirements, and target delivery time.

This supports B2B purchasing conversion without claiming fixed price, fixed stock, or guaranteed lead time for all orders.

## FAQPage JSON-LD Verification

Online FAQPage JSON-LD verification:

- FAQPage JSON-LD exists.
- FAQPage JSON-LD covers 30/30 visible FAQ items.
- JSON is valid and parseable.
- FAQPage JSON-LD only includes visible FAQ content.
- MOQ JSON-LD content matches visible FAQ content.
- Lead time JSON-LD content matches visible FAQ content.
- FAQPage JSON-LD does not contain fabricated price, inventory, certification number, customer case, local office, local stock, or distributor network claims.

Product JSON-LD safety:

- Product JSON-LD remains 36/36.
- Product JSON-LD was not modified by this FAQ stage.

## CTA Verification

FAQ page CTA verification:

- `Send Inquiry` links to `/en/contact/#get-a-quote`.
- `View Catalogs` links to `/en/downloads/`.
- `View Products` links to `/en/products/`.
- WhatsApp quotation entry remains available.
- No empty button was found.
- No `#` placeholder link was found.

## Risk Controls

The FAQ purchasing content intentionally avoids unsupported or fabricated claims:

- No prices were fabricated.
- No inventory was claimed.
- No certification numbers were fabricated.
- No customer cases were fabricated.
- No local offices or local stock were claimed.
- No distributor network was fabricated.
- FAQPage JSON-LD only includes visible FAQ content.

## Full Regression Results

Final online regression results after deployment:

- `/en/faqs/`: HTTP 200
- FAQ count: 30
- Sitemap URLs: 55
- Sitemap URL status: 55/55 HTTP 200
- Products: 36
- Product JSON-LD: 36/36
- Catalog PDFs: 6/6 HTTP 200 and `application/pdf`
- Homepage thumbnails: still use `/media/home-thumbnails/`
- Product detail display images: still use `/media/product-display/` on 36/36 product pages
- Canonical status: 55/55 sitemap pages point to `https://dualcorelink.com`
- No `pages.dev`, `localhost`, or local `C:\` leak was found in production checks.
- Git status after verification: `main` synchronized with `origin/main`

## SEO / JSON-LD / Canonical Safety

SEO safety results:

- Sitemap URL count remained 55.
- `/en/faqs/` canonical remains `https://dualcorelink.com/en/faqs/`.
- FAQPage JSON-LD remains valid.
- Product JSON-LD remains 36/36.
- No Product JSON-LD fields were changed.
- Canonicals remain production-domain URLs.
- No `pages.dev` or `localhost` canonical was found.

## Sitemap Status

Sitemap status:

- Sitemap URL: <https://dualcorelink.com/sitemap.xml>
- URL count: 55
- URL status: 55/55 HTTP 200
- `/en/faqs/` remains included in sitemap.
- No FAQ detail pages were added.
- No query URLs were added.
- No PDF URLs were added.

## PDF and Image Optimization Regression Safety

PDF and image regression checks:

- Six multilingual catalog PDFs remain online.
- Six catalog PDFs return `application/pdf`.
- Homepage Representative products images still use `/media/home-thumbnails/`.
- Product detail display images still use `/media/product-display/`: 36/36.
- Product JSON-LD, Open Graph, and Twitter image behavior was not changed by this stage.

## Known Non-Blocking Items

- FAQ content is currently English-first and reused for other locale routes until full multilingual frontend content is implemented.
- Warranty/sample policy can be refined later if more precise business rules are confirmed.
- More market-specific FAQ can be added later after region landing pages are developed.
- GSC FAQ/rich result appearance should continue to be monitored.

## Future Recommendations

- Localize FAQ content when multilingual frontend pages are ready.
- Add market-specific FAQ for Middle East and Southeast Asia.
- Add more document-request FAQ when verified datasheets or certificates are available.
- Monitor GSC rich result and page indexing feedback.
- Keep FAQ answers aligned with confirmed business policies only.

## Final Acceptance Conclusion

The FAQ Purchasing Enhancement stage is accepted as complete.

The production FAQ page now provides a clearer B2B purchasing baseline for MOQ, lead time, OEM/ODM, customization, hotel RCU, document requests, regional project inquiries, quotation process, and distributor / contractor / system integrator inquiries.

The stage preserved the site launch baseline:

- Products: 36
- Sitemap URLs: 55
- Product JSON-LD: 36/36
- FAQPage JSON-LD: 30/30
- Catalog PDFs: 6 online
- Homepage image optimization
- Product detail display image optimization
- Canonical safety

This stage can be sealed as the FAQ purchasing content baseline for future SEO, AI search readability, and B2B inquiry conversion work.
