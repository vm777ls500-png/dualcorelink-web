# German Full Human Review Packet

Prepared: 2026-08-12
Branch: `review/de-es-fa-full-human-review-20260812`
Status: **approved by Allan on 2026-08-12; production release readiness remains disabled**

## Scope

| Type | Count | Delivery |
|---|---:|---|
| Products | 36 | CMS-backed candidate |
| Solutions | 6 | CMS-backed candidate |
| Resources | 15 | File-backed candidate |
| Regions | 5 | File-backed candidate |
| Static pages | 3 | File-backed candidate |
| Listings | 4 | File-backed candidate |
| **Total** | **69** | **CMS 42 / file 27** |

## Technical Review

- Specialized route families: 11/11.
- Product gallery parity: 36/36 products and 132/132 shared images, with hero, order, and full/thumbnail pairing retained.
- Solution, Resource, and Region semantic and relationship modules use the shared localized architecture.
- Listings: Products 36, Solutions 6, Resources 15, Regions 5.
- About uses specialized composition; Contact retains the complete inquiry form and fallbacks; FAQ contains 30/30 entries.
- Internal candidate targets use `/de/`; broken, English fallback, wrong-locale, and query targets: 0 in the targeted audit.
- Direction: `ltr`; Persian reuses the established RTL and bidi architecture.
- Candidate hreflang: en, zh, ar, vi, de, es, fa, x-default.
- Production boundary after approval seal: approved 69, release-ready 0, public 0, sitemap 0.

## Human Review Checklist

For every row in [de-full-decisions-20260812.md](./de-full-decisions-20260812.md):

- Compare title, metadata, headings, body, CTA, alt/caption, relationships, schema labels, and internal paths with the English fact source.
- Verify natural business German and exact product specifications.
- Preserve: no fixed MOQ for regular products; new molds may require tooling/customization fees; color-only changes with an existing mold do not incur a customization fee; typical lead time is 7-15 days; OEM/ODM and datasheet/certificate/wiring-diagram support remain scoped as stated.
- Reject invented certifications, protocols, customers, projects, performance claims, prices, or inventory.
- For Persian, inspect technical tokens and mixed-direction strings using the existing bidi helper.
- Record a real reviewer and ISO date only when changing a row from pending.

## Automated Revision Log

| Locale | Scope | Field | Before | After | Reason |
|---|---|---|---|---|---|
| de | 69 candidates | Composition | Generic publication fallback on specialized routes | Shared specialized Product, Solution, Resource, Region, About, Contact, FAQ, and listing composition | Preserve semantic, media, and relationship parity |
| de | Shared UI | Labels and paths | English fallback labels or paths | Candidate-locale labels and `/de/` review paths | Remove preview-only fallback defects |
| de | Candidate facts | Factual payload | Existing candidate facts | Unchanged | Technical preparation does not rewrite facts |

Automatic revisions are shared technical composition corrections. Human approved: 69/69 by Allan on 2026-08-12; pending: 0/69. Production release readiness remains 0/69 until the CMS transaction succeeds.
