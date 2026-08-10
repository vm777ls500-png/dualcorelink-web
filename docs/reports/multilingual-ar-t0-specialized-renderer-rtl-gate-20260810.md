# AR-T0 Arabic Specialized Renderer and RTL Technical Gate

Prepared: 2026-08-10
Final validation: 2026-08-11 (Asia/Shanghai)

## Scope

AR-T0 prepares all 69 Arabic candidates for native-language review using the same specialized page composition as the English source pages. It does not approve Arabic content, publish Arabic URLs, write CMS data, or change production infrastructure.

The work covers 11 route families: Products listing and detail, Solutions listing and detail, Resources listing and detail, Regions listing and detail, About, Contact, and FAQs.

## Baseline Audit

Before this gate, all 69 Arabic candidates could take the generic `LocalizedPublicationPageView` path instead of their specialized renderer. The resulting review-preview gaps were:

- Specialized renderer early-return risk: 69/69 pages across 11/11 route families.
- Product gallery gap: 96 images relative to the shared 132-image English inventory.
- Non-product shared-media gap: 77 media references.
- Non-product relationship-module gap: 71 pages.
- Product buying/conversion-module gap: 32 products.
- Listing-entry gap: 62 entries (36 Products, 6 Solutions, 15 Resources, 5 Regions).
- Arabic FAQ candidate coverage: 8/30.
- Contact: generic content lacked the complete specialized form, attribution, analytics bindings, QR, and fallbacks.
- RTL audit: four hardcoded LTR declarations and two physical-left utility risks in review-sensitive composition.

## Specialized Composition

`supportsSpecializedLocalizedComposition(locale)` is the shared capability check. English keeps its existing specialized rendering, Chinese remains on its released localized composition, and Arabic uses specialized composition only when the explicit review environment is active.

The publication gate remains separate. Normal production eligibility continues to require native review, release readiness, and the release manifest. The production workflow does not set `MULTILINGUAL_REVIEW_LOCALE`, and Nginx has no Arabic publication route.

The explicit local command is `npm run multilingual:review-preview`, which invokes the review build with `MULTILINGUAL_REVIEW_LOCALE=ar`.

## Arabic Inventory

- Review-preview pages: 69/69.
- Route families: 11/11.
- Priority distribution: P0 18, P1 32, P2 19.
- CMS-backed candidates: 42; file-backed candidates: 27.
- Native approvals: 0.
- `productionReleaseReady=true`: 0.
- Production Arabic pages: 0.

## Products

- Product listing entries: 36/36 with Arabic review URLs.
- Product detail composition: 36/36.
- Shared gallery inventory: 132/132.
- Hero parity: 36/36.
- Gallery ordering and full/thumbnail mapping: 36/36.
- Specifications, buying guidance, conversion sections, related Solutions, related Resources, CTA, and Product schema inputs are retained.
- No media files were copied or generated.

## Solutions, Resources, and Regions

- Solutions: 6/6 with shared media, semantic sections, recommended products, FAQ, CTA, breadcrumb, and schema inputs.
- Resources: 15/15 with full article structure, recommended products, relevant solutions, continue-reading links, mid/final inquiry CTAs, Article schema, and breadcrumbs.
- Regions: 5/5 with market, purchasing, relationship, FAQ where applicable, CTA, breadcrumb, and schema structure.
- Shared non-product media parity: 77/77; missing 0.
- Relationship-module parity: missing 0.
- One browser-discovered Chinese relationship heading on the Arabic Region detail renderer was replaced by the shared English/Chinese/Arabic label helper and covered by a regression assertion.

## Listings and Internal Links

- Products: 36/36.
- Solutions: 6/6.
- Resources: 15/15.
- Regions: 5/5.
- Total listing entries: 62/62.
- Review links target `/ar/...`; internal broken targets: 0; query URLs: 0.
- Arabic review navigation is available only in the explicit review build. Production does not expose an Arabic language destination.

## FAQs and Contact

The Arabic FAQ candidate now contains 30/30 entries and preserves the purchasing boundaries for MOQ, mold/customization fees, existing-mold color changes, 7-15 day lead-time wording, OEM/ODM, RCU, and technical-document requests. FAQPage contains 30 entries.

The Arabic Contact review candidate retains the specialized page and complete current form: office/WeChat/QR, WhatsApp, sales/general/support contact options, country/region, customer identity, product categories, project stage, target delivery, estimated quantity, attachment guidance, success/error copy, attribution, GA4 event bindings, mailto fallback, WhatsApp fallback, ContactPage, and BreadcrumbList. No inquiry was submitted during QA.

## RTL and Bidi

- Arabic review HTML uses `lang="ar"` and `dir="rtl"` on 69/69 pages.
- A shared bidi tokenizer/component isolates technical abbreviations, model identifiers, URLs, email addresses, telephone values, and number/unit tokens without forcing Arabic prose to LTR.
- Covered tokens include RCU, KNX, HVAC, RS485, OEM, ODM, I/O, USB, model codes, voltage/frequency values, phones, email, and URLs.
- Hardcoded LTR declarations removed from review-sensitive modules: 4.
- Physical-left utility risks replaced with logical-direction styles: 2.
- Static preview evidence: 313 `<bdi dir="ltr">` elements across 58 pages; pages without technical tokens do not require a bidi wrapper.
- Remaining hardcoded LTR and physical-left matches in Arabic-sensitive modules: 0.

## Schema and Export Evidence

Review-preview schema output:

- Product: 36.
- Service: 6.
- Article: 15.
- FAQPage: 1 graph containing 30 FAQ entries.
- AboutPage: 1.
- ContactPage: 1.
- BreadcrumbList: 69.

Review candidate canonicals target the matching `/ar/` URL. Production export remains unchanged: Arabic HTML 0, Arabic RSC 0, Arabic sitemap URLs 0, total sitemap URLs 145.

## Browser QA

The review-only static export was checked at 390 and 1280 pixels across 13 representative routes covering all 11 renderer families: Products listing, two Product details, Solutions listing/detail, Resources listing/two details, Regions listing/detail, About, Contact, and FAQs.

- Representative viewport checks: 26/26.
- RTL/lang/main/H1 checks: passed.
- Horizontal overflow: 0.
- Failed images: 0.
- Console errors: 0.
- Hydration errors: 0.
- Chinese body-copy leakage after excluding the intentional language-menu label: 0.
- Product gallery thumbnail switch: passed; active state and counter updated.
- FAQ: 30 items present; accordion toggle passed.
- Contact: complete form and fallbacks present; no submission performed.
- Mobile navigation: Arabic links rendered and the drawer closed after navigation.

## Automated Validation

- Targeted Arabic/Chinese specialized-composition tests: 22/22.
- Full data tests: 259/259.
- Lint: passed.
- Product media audit: 36 products, 132 full images, 132 thumbnails, 264 WebP assets, errors 0. The existing single-image reshoot warning is unrelated to AR-T0.
- Arabic review build: 280/280 generated pages; 69/69 Arabic review pages; export audit passed 138 renderable localized pages; sitemap 145.
- Default production build: 218/218 generated pages; 69 released localized pages; Arabic output 0; sitemap 145.
- Static export cleanup: passed.
- `git diff --check`: passed.

One earlier full test run encountered a transient public CMS media-request timeout. The affected Product Schema assertion passed on an immediate isolated run against the same official CMS data source, and the final complete suite passed 259/259.

## Review Workbook

The Arabic native-review workbook contains all 69 candidates and now includes per-page technical fields for specialized renderer, semantic sections, media, relationships, schema, RTL, bidi, mobile RTL, navigation, CTA, internal links, and notes.

Human review decision, reviewer, and review date remain blank for 69/69 entries. Automated technical evidence is not represented as native-language approval.

## Safety Boundary

- Arabic approved: 0.
- Arabic production release ready: 0.
- Arabic public: 0.
- Arabic CMS writes: 0.
- Database writes: 0.
- Production Nginx, Cloudflare, main branch, deployment, and GSC changes: 0.

## Final Status

**PASS - AR-T0 technical review candidate ready.** Arabic has complete specialized composition and RTL review support for 69/69 candidate pages. It remains pending human review and is not production eligible or publicly released.
