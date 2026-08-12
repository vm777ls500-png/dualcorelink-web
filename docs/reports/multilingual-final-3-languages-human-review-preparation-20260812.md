# Multilingual Final Three Languages Human Review Preparation

Date: 2026-08-12
Branch: `review/de-es-fa-full-human-review-20260812`
Production baseline: `58ceac927abe7f1f144e6d2fdfd03f0c84112e82`
Status: all 207 candidates approved by Allan on 2026-08-12; production release readiness remains disabled pending CMS publication

## Scope

German, Spanish, and Persian were reviewed as one 207-page candidate set. Each locale contains 36 Products, 6 Solutions, 15 Resources, 5 Regions, 3 static pages, and 4 listings: 69 pages, with 42 CMS-backed and 27 file-backed candidates.

## Architecture Audit

The shared specialized route architecture now accepts a review-locale set instead of a single locale. Candidate navigation, publication lookup, media composition, relationships, static About/Contact/FAQ composition, listing filters, and metadata are resolved through shared locale-aware helpers. Production eligibility remains controlled exclusively by the existing publication manifest.

All 11 specialized route families are technically available for each review locale. German and Spanish remain LTR. Persian reuses the existing RTL direction, logical CSS, and bidi token architecture; no second RTL system was introduced.

## Parity Results

- Products: 36/36 per locale; 132 full images and 132 thumbnails per locale; hero, order, and full/thumbnail mappings shared with English.
- Solutions: 6/6 per locale with semantic sections, relationships, FAQ, CTA, and Service schema surfaces.
- Resources: 15/15 per locale with full sections, mid CTA, products, solutions, continue-reading, bottom CTA, and Article schema surfaces.
- Regions: 5/5 per locale with market/procurement sections, recommendations, relationships, FAQ, CTA, and schema surfaces.
- Listings: 36/6/15/5 per locale.
- FAQ: 30/30 per locale.
- Contact: specialized complete composition and inquiry form; attribution, analytics, mailto, and WhatsApp fallbacks retained. No inquiry was submitted.
- Relationship audit target: broken 0, English fallback 0, wrong-locale 0, query URLs 0.

## SEO Candidate

Candidate canonical and metadata are generated for all 69 pages per locale. Candidate hreflang covers en, zh, ar, vi, de, es, fa, and x-default. JSON-LD uses the existing Product, Service, Article, FAQPage, ContactPage, and BreadcrumbList builders.

These candidate surfaces do not alter production publication. German, Spanish, and Persian remain absent from the production sitemap and public release manifest. Production sitemap remains 283.

## Automated Revisions

| Locale | Revision classes | Candidate pages covered | Factual payload changes |
|---|---:|---:|---:|
| DE | 4 | 69 | 0 |
| ES | 4 | 69 | 0 |
| FA | 5 | 69 | 0 |

Revision classes cover specialized composition, local navigation/relationships, native shared UI, and static Contact/FAQ/About composition; Persian also includes RTL/bidi presentation review. No approval decision was automated. Allan explicitly approved the exact 207-row scope on 2026-08-12.

## Review Evidence

- [German packet](../reviews/multilingual/de-full-human-review-20260812.md)
- [German decisions](../reviews/multilingual/de-full-decisions-20260812.md)
- [Spanish packet](../reviews/multilingual/es-full-human-review-20260812.md)
- [Spanish decisions](../reviews/multilingual/es-full-decisions-20260812.md)
- [Persian packet](../reviews/multilingual/fa-full-human-review-20260812.md)
- [Persian decisions](../reviews/multilingual/fa-full-decisions-20260812.md)

## Production Boundary

- Actual approved DE/ES/FA: 69/69/69.
- Production release ready DE/ES/FA: 0/0/0.
- Public and sitemap URLs for these locales: 0.
- CMS writes: 0. Database writes: 0. Deployment: 0.
- EN, ZH, AR, and VI production publication is unchanged.

## Final Status

The one-time human review is sealed for all 207 candidates. This approval record is not yet a CMS import or production release; release readiness remains fail-closed until all three controlled CMS transactions pass.
