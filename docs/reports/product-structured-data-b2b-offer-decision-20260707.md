# Product Structured Data B2B Offer Decision Report

## 1. Stage Summary

- Stage name: Product Structured Data Phase 1 / Phase 2A
- Scope: Diagnose the Google Search Console Product snippets warning and evaluate B2B Offer feasibility
- Status: Decision archived
- Website: https://dualcorelink.com
- Product pages: 36
- Product JSON-LD: 36/36
- Sitemap URLs: 60
- FAQPage JSON-LD: 30/30
- Region landing pages: 5
- Public header language switcher: English only
- Unpublished locale paths: 301 redirect to English equivalents
- Public hreflang: English / x-default only

## 2. GSC Issue

Google Search Console Product snippets report shows the following enhancement warning:

> Either `offers`, `review`, or `aggregateRating` should be specified.

Affected sample URLs exported from GSC:

1. `/en/products/embedded-human-presence-sensor/`
2. `/en/products/borui-red-matte-triple-socket-panel/`
3. `/en/products/smart-four-key-scene-control-panel/`
4. `/en/products/86-type-ai-smart-control-display/`

The warning was first detected on 2026-06-20 and last updated on 2026-07-05 according to the GSC report provided for this stage.

## 3. Diagnosis Result

The issue is not limited to the 4 sampled URLs exported by GSC.

Current Product JSON-LD status across all 36 product detail pages:

- Product JSON-LD: 36/36
- `name`: 36/36
- `description`: 36/36
- `image`: 36/36
- `brand`: 36/36
- `category`: 36/36
- `url`: 36/36
- `sku`: 0/36
- `mpn`: 0/36
- `model`: 0/36 in current product data, although the builder supports it when data exists
- `offers`: 0/36
- `review`: 0/36
- `aggregateRating`: 0/36

The 4 URLs shown by GSC are current report samples, not isolated implementation errors.

## 4. Current Implementation

Product JSON-LD is generated through the shared Product schema builder and product detail page template.

Relevant implementation files:

- `src/lib/schema/builders.ts`
- `src/app/[locale]/products/[slug]/page.tsx`
- `src/components/seo/json-ld.tsx`
- `tests/seo-schema.test.ts`

The current builder intentionally outputs conservative Product entity fields and does not add `offers`, `review`, `aggregateRating`, `price`, or `availability` by default.

## 5. Business Context

DualCoreLink is a B2B inquiry-driven website rather than a fixed-price retail ecommerce storefront.

Current business model:

- B2B OEM/ODM
- Smart hotel project inquiries
- Distributor, contractor, and system integrator inquiries
- Email / WhatsApp quotation workflow
- MOQ depends on product and order requirements
- Lead time depends on product type, customization requirements, and order quantity
- Customization may affect pricing
- Public fixed prices are not currently displayed
- Public stock or inventory status is not currently displayed

Product pages already include visible quotation paths and commercial inquiry support:

- Get a Quote
- WhatsApp quote CTA
- Contact / inquiry CTA
- MOQ
- Lead time
- OEM/ODM
- Inquiry preparation guidance

## 6. Google Product Snippet Context

Google Product snippets require Product structured data to include at least one of the following enhancement groups:

- `offers`
- `review`
- `aggregateRating`

For offer-based Product rich result eligibility, Google expects real pricing information, such as `price` or `priceSpecification.price`. AggregateOffer also requires real price range data such as `lowPrice`.

Because DualCoreLink currently does not publish fixed prices or stock status on product pages, adding Offer data without real visible pricing would create structured data risk.

## 7. Decision

Current decision:

Do not add Product `offers`, `review`, or `aggregateRating` at this stage.

Reason:

- Adding `offers` without real public price may create misleading structured data.
- Offer and AggregateOffer require real price or price range data for Google Product rich result validation.
- Fake `review` or `aggregateRating` is not allowed.
- The Product snippets warning is a rich result eligibility issue, not a blocking indexing issue.
- Current Product JSON-LD is conservative and safe for B2B inquiry pages.

## 8. Explicitly Forbidden Approaches

Do not add:

- fake review
- fake aggregateRating
- fake price
- fake stock
- `price: 0`
- placeholder price
- page-invisible price in JSON-LD
- `InStock` unless inventory is publicly confirmed
- Offer only to satisfy GSC without real visible price

Structured data must remain consistent with visible page content.

## 9. Optional Approaches Considered

### Option A: Keep Current Product JSON-LD

Do not add `offers`, `review`, or `aggregateRating`.

Benefits:

- Safest option for B2B inquiry products.
- Avoids fake price, stock, rating, or review data.
- Preserves existing Product entity markup.
- Does not introduce new Google structured data errors.

Trade-off:

- GSC Product snippets warning may remain.
- Product rich result eligibility remains limited.

### Option B: Add Offer After Publishing Real Starting Prices

This would require:

- Real starting price per eligible product
- Currency, likely USD if confirmed
- Seller name
- Offer URL
- Visible price copy on product pages
- Clear exclusion rules for OEM/ODM custom products if fixed pricing is not appropriate

Risk:

- B2B project pricing can vary by quantity, voltage, protocol, finish, customization, packaging, and delivery requirements.
- Published starting prices may need ongoing maintenance.

### Option C: Add AggregateOffer After Publishing Real Price Ranges

This would require:

- Real `lowPrice`
- Optional but useful `highPrice`
- Currency
- Visible price range copy on product pages
- Clear explanation that final quotation depends on project requirements

Risk:

- Price ranges may be inaccurate for customized hotel project requirements.
- Incorrect ranges could mislead buyers and create structured data validation issues.

## 10. Future Requirements Before Offer Development

Before considering Product Structured Data Phase 2B, the business must confirm:

- Whether public pricing is allowed
- Whether every product has a real starting price
- Whether USD is the correct currency
- Whether price ranges can be published
- Whether prices will be visible on product pages
- Whether availability can be publicly stated
- Seller name
- Whether `priceValidUntil` is required
- Whether pricing is per product, series, or category
- Whether OEM/ODM custom products should be excluded from offers
- Whether different voltage, protocol, finish, logo, packaging, quantity, or delivery requirements materially change pricing

## 11. Recommended Current Action

Keep current Product JSON-LD unchanged.

Treat the GSC Product snippets warning as a non-blocking enhancement issue.

Continue focusing on:

- indexing coverage
- product content quality
- internal links
- inquiry conversion
- FAQ quality
- downloads and documentation
- region page performance

## 12. Future Phase

Future phase only if pricing strategy is confirmed:

Product Structured Data Phase 2B: Safe B2B Offer implementation with visible page content and matching JSON-LD.

Potential files:

- `src/lib/schema/builders.ts`
- `tests/seo-schema.test.ts`
- product data configuration
- product detail page visible pricing copy

Any future implementation should preserve the current rule that no fake `offers`, `review`, `aggregateRating`, `price`, or `availability` may be added.

## 13. Risk Classification

| Option | Risk | Notes |
| --- | --- | --- |
| Keep current Product JSON-LD | Low | Non-blocking GSC Product snippet warning may remain. |
| Add real Offer data | Medium | Requires real public price, visible page content, and ongoing maintenance. |
| Add real AggregateOffer data | Medium | Requires real price range and clear buyer-facing explanation. |
| Add fake Offer data | High | May create misleading structured data and new GSC errors. |
| Add fake review or aggregateRating | Critical | Not allowed and should not be implemented. |

## 14. Final Decision

Product Structured Data currently remains unchanged.

No `offers`, `review`, `aggregateRating`, `price`, or `availability` should be added until real public pricing or price range strategy is confirmed.

This decision should be treated as the baseline for Product Structured Data until a future verified pricing strategy is approved.
