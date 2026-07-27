# SEO Authority Phase 1C — Safe Entity Fact Corrections

Date: 2026-07-27

## 1. Stage objective

Implement only three already-confirmed entity fact corrections: root-page brand capitalization, About MOQ wording, and About lead-time wording. Add direct regression coverage and update the Phase 1A/1B audit records. No broader SEO, GEO, schema, crawl-policy, page-content, or deployment work was authorized.

## 2. Initial branch and HEAD

- Branch: `main`
- HEAD: `69a8fa857f1f740f4516a9687320047f84839e6a`
- Upstream state: `main...origin/main`
- Initial uncommitted state: only the two pre-existing untracked Phase 1A/1B documents under `docs/seo/`
- Initial production-code state: clean

## 3. Pre-change conflicts

1. `src/app/page.tsx` used `DualcoreLink` in the metadata title, metadata description, and visible redirect eyebrow. The approved semantic spelling is `DualCoreLink`.
2. `src/app/[locale]/about/page.tsx` said only that MOQ depended on model and customization. This omitted the confirmed rule that regular products have no fixed MOQ and the confirmed new-mold/existing-mold fee distinctions.
3. The same About component stated a general lead time of about 7–30 days. The confirmed baseline is a typical 7–15 days with timing dependent on product, order quantity, customization scope, and project requirements.

All About purchasing statements are direct JSX in the About page component. They are not sourced from CMS data, a shared content object, configuration, or a test fixture. The MOQ and lead-time lines could therefore be corrected without changing the adjacent sample and warranty statements or other pages.

## 4. Changed files

- `src/app/page.tsx`
- `src/app/[locale]/about/page.tsx`
- `tests/seo-authority-phase-1c.test.ts`
- `docs/seo/dualcorelink-brand-citation-profile.md`
- `docs/seo/seo-authority-phase-1b-implementation-plan.md`
- `docs/reports/seo-authority-phase-1c-safe-entity-corrections-20260727.md`

No dependency, configuration, schema, crawl-policy, URL, or Phase 3A target-page source was changed.

## 5. Brand capitalization correction

The three root-page occurrences were corrected:

- metadata title
- metadata description
- visible redirect eyebrow

Final spelling: `DualCoreLink`.

The existing `/en/` canonical, `noindex, follow` robots directive, zero-delay meta refresh, and JavaScript redirect remain unchanged. The static root output contains `DualCoreLink`, contains no `DualcoreLink`, and retains the redirect controls.

## 6. MOQ correction

Final About copy:

> Regular products do not have a fixed minimum order quantity. Customized products may involve tooling or customization fees when a new mold is required. A color-only change using an existing mold does not require a customization fee.

This preserves the confirmed distinctions and does not claim that every product has no MOQ, every custom order incurs a fee, or all customization is free.

## 7. Lead-time correction

Final About copy:

> Typical lead time is 7–15 days. Actual timing depends on the product, order quantity, customization scope, and project requirements.

The former 7–30-day statement was removed. The new wording is conditional and is not a delivery guarantee.

## 8. Explicitly unchanged items

The following were intentionally unchanged:

- About sample availability and buyer-paid sample/shipping statements
- About general one-year warranty statement and its product/order qualification
- Organization and ContactPoint JSON-LD
- telephone and WhatsApp schema semantics
- registered/public address, legal entity, and supply-chain relationship
- formal logo, Article author, external accounts, `sameAs`, `PostalAddress`, and `manufacturer`
- ContactPage, CollectionPage, or any other new schema
- canonical, hreflang, robots, sitemap generation logic, URLs/slugs, and dependencies
- `llms.txt` remains absent

Samples, warranty, registered-address status, legal-entity verification and relationship, formal logo, Article author, and external accounts remain **OWNER CONFIRMATION REQUIRED**.

## 9. Phase 3A page protection

The following eight Phase 3A URLs remain present in the static export:

- `https://dualcorelink.com/en/resources/hotel-rcu-buying-guide/`
- `https://dualcorelink.com/en/resources/smart-hotel-room-control-system-guide/`
- `https://dualcorelink.com/en/resources/hotel-guest-room-control-interfaces-guide/`
- `https://dualcorelink.com/en/regions/saudi-arabia/`
- `https://dualcorelink.com/en/regions/uae/`
- `https://dualcorelink.com/en/products/hotel-smart-room-rcu-host-1/`
- `https://dualcorelink.com/en/products/86-type-ai-smart-control-display/`
- `https://dualcorelink.com/en/products/smart-four-key-scene-control-panel/`

No diff exists in `src/config/resources.ts`, `src/config/region-landing-pages.ts`, or `src/config/product-conversion.ts`. The existing four Phase 3A regression tests passed, and all eight static `index.html` files exist.

## 10. ContactPoint unchanged proof

`src/lib/schema/entities.ts` has no diff. Static JSON-LD contains 74 ContactPoint occurrences with one unique value:

```json
{
  "@type": "ContactPoint",
  "telephone": "+85270390436",
  "email": "sales@dualcorelink.com",
  "contactType": "sales"
}
```

This is unchanged evidence, not an endorsement of the known telephone/WhatsApp semantic mismatch. That issue remains deferred because Phase 1C explicitly prohibited the shared schema change.

## 11. Test results

- Focused command: `tsx --test tests/seo-authority-phase-1c.test.ts tests/seo-phase-3a.test.ts`
- Result: 8 passed, 0 failed
  - Phase 1C tests: 4 passed
  - existing Phase 3A tests: 4 passed
- Full data suite: 99 passed, 0 failed

The Phase 1C tests verify semantic requirements instead of relying on one fragile full-paragraph match. They cover root capitalization and redirect controls, About MOQ and lead-time terms, unchanged sample/warranty copy, unchanged ContactPoint, unchanged hreflang/schema boundaries, and absence of `llms.txt`.

## 12. Build result

- `npm.cmd run lint`: passed
- `npm.cmd run test:data`: passed, 99/99
- `npm.cmd run media:audit`: passed with 0 errors and 1 pre-existing allowed warning
- Allowed warning: `rotary-knob-smart-control-display: verified reshoot required`
- `npm.cmd run build`: passed
- Static generation: 156/156 pages
- Export-clean sentinel check: 8/8

PowerShell blocked the `npm.ps1` shim under the local execution policy, so the same package scripts were run through `npm.cmd`. This was an invocation-environment issue, not a project validation failure.

## 13. Sitemap result

- Sitemap URL count: 76
- Non-English public URLs: 0
- `localhost` URLs: 0
- Sitemap generation logic: unchanged

## 14. Static output verification

Root output:

- title: `DualCoreLink | Smart Hotel & Smart Home Automation`
- canonical: `https://dualcorelink.com/en/`
- robots: `noindex, follow`
- meta refresh to `/en/`: present
- JavaScript redirect to `/en/`: present
- `DualcoreLink`: absent

About output:

- file exists and is readable
- title: `About DUALCORE LINK B2B Automation | DUALCORE LINK`
- meta description: present and unchanged
- canonical: exactly one `https://dualcorelink.com/en/about/`
- H1 count: 1
- corrected MOQ copy: present
- corrected 7–15-day copy and all four timing conditions: present
- former 7–30-day copy: absent
- sample and warranty copy: unchanged
- CTA/contact links: present
- schema graph: present and unchanged

Site-wide output:

- HTML files checked: 80
- `localhost` leakage: 0
- `llms.txt`: absent from `public/` and `out/`
- all eight protected Phase 3A static pages: present

## 15. Retained risks

- About sample and warranty wording still differs in strictness from conditional FAQ/Product wording — **OWNER CONFIRMATION REQUIRED**
- ContactPoint still places the confirmed WhatsApp number in `telephone`; this is known but explicitly deferred
- registered-address status and legal-entity/supply-chain relationships remain unverified
- no approved formal logo or external profile URLs are available
- Article author policy remains unconfirmed
- global semantic brand normalization remains outside scope because shared output would affect protected Phase 3A pages

No out-of-scope production issue was introduced by Phase 1C.

## 16. Commit recommendation

Recommendation: retain the narrowly scoped changes and proceed to a separate human-reviewed commit/deployment phase. Do not commit or deploy from Phase 1C itself.

This recommendation is based on local source, tests, build, and static-output checks only. It does not claim ranking, impressions, clicks, GEO citation gains, or Google recrawling.

## 17. Phase 1D recommendation

Keep Phase 1D separate from this patch. Prioritize owner-confirmed decisions for samples, warranty, legal identity/address, logo, Article author, and official external accounts. If ContactPoint is reconsidered, authorize and test the shared JSON-LD impact explicitly before changing it. Optional page-type schema should be evaluated only after factual ownership and scope decisions, not added merely to increase node count.
