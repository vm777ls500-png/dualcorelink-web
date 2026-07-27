# SEO Authority Phase 1B — Safe Implementation Plan

> Internal planning document. Phase 1B makes no production-code change and does not authorize a commit, push, deployment, external profile action, or directory submission.

## 1. Audit scope

This plan reconciles entity facts and identifies the smallest safe follow-up implementation. Evidence was limited to:

- current repository source in `src/`, `public/`, `tests/`, configuration, metadata, and schema files;
- current static output in `out/`;
- archived project acceptance reports;
- the purchasing baseline explicitly confirmed in the Phase 1B instruction;
- the existing Phase 1A internal citation profile.

The eight Phase 3A observation pages remain protected. No file that directly defines their content may be edited in Phase 1B:

- `/en/resources/hotel-rcu-buying-guide/`
- `/en/resources/smart-hotel-room-control-system-guide/`
- `/en/resources/hotel-guest-room-control-interfaces-guide/`
- `/en/regions/saudi-arabia/`
- `/en/regions/uae/`
- `/en/products/hotel-smart-room-rcu-host-1/`
- `/en/products/86-type-ai-smart-control-display/`
- `/en/products/smart-four-key-scene-control-panel/`

The previous Phase 1A attachment ended at “公司描述必须基”. No requirement beyond that truncation is inferred.

## 2. Current entity baseline

| Field | Current repository/public value | Status |
|---|---|---|
| Canonical brand capitalization | `DualCoreLink` | Confirmed by Phase 1B |
| Current visual/all-cap treatment | `DUALCORE LINK` | Existing styling; not a separate entity |
| Incorrect variant | `DualcoreLink` | Present only in root redirect source/output |
| Legal entity used by site | `DUALCORE LINK LIMITED` | Publicly rendered; legal-document confirmation still pending |
| Website | `https://dualcorelink.com` | Confirmed repository production origin |
| Organization ID | `https://dualcorelink.com/#organization` | Stable across schema output |
| Brand ID | `https://dualcorelink.com/#brand` | Stable across schema output |
| Sales email | `sales@dualcorelink.com` | Public and in ContactPoint |
| WhatsApp | `+852 7039 0436` | Publicly and semantically confirmed as WhatsApp |
| Telephone | `+86 13703333750` | Publicly confirmed as Phone with a `tel:` link |
| Office | Cangzhou full address on Contact; shortened city/province/country in Footer | Public and accepted; registered-address status unconfirmed |
| WeChat | `a13703333750` | Public and accepted |
| Logo | No approved image logo | Blocked |
| Social profiles / `sameAs` | None confirmed | Correctly absent |
| Article publisher | Organization on 15/15 Resources | Healthy |
| Article author | Absent on 15/15 Resources | No approved authorship policy |
| Product brand | Brand on 36/36 Products | Healthy |
| Product manufacturer | Absent on 36/36 Products | Correctly withheld without verified mapping |

## 3. Confirmed purchasing baseline

The following wording has high-trust support from the Phase 1B instruction, `docs/reports/faq-purchasing-acceptance-20260623.md`, `docs/reports/region-landing-pages-acceptance-20260625.md`, current content, and tests:

1. Regular products have no fixed MOQ.
2. Custom products may require a customization or tooling fee when new molds are needed.
3. An existing mold plus a color-only change does not require a customization fee.
4. Typical lead time is 7–15 days.
5. Lead time depends on product type, customization, quantity, and project requirements.
6. OEM/ODM is supported.
7. Panel color, logo, and button-layout customization are supported subject to product-series, mold, and project requirements.
8. Datasheets, certificate copies, and wiring diagrams may be provided where applicable and may require product, market, or project confirmation.

These facts do not support universal promises for every product, order, document, customization, or market.

## 4. Confirmed conflicts

| Priority | Conflict | Confirmed result |
|---|---|---|
| High | Before Phase 1C, About said 7–30 days; accepted FAQ/Region baseline says typical 7–15 days with dependencies | About was the inconsistent source; **RESOLVED IN PHASE 1C** |
| High | Before Phase 1C, About said only that MOQ depends; accepted baseline says regular products have no fixed MOQ and defines custom-product exceptions | About was incomplete; **RESOLVED IN PHASE 1C** |
| High | About says samples are available and buyers pay sample/shipping; FAQ and Product pages are conditional/on request | No unified policy; owner decision required |
| High | About says general one-year warranty; FAQ and all Product pages are conditional/on request | No unified policy; owner decision required |
| High | Organization `telephone` is derived from the WhatsApp number | Semantic mismatch; +852 is only confirmed as WhatsApp |
| Medium | Before Phase 1C, root redirect used `DualcoreLink` | Incorrect capitalization; **RESOLVED IN PHASE 1C** |
| Medium | Semantic identity fields often use all-cap `DUALCORE LINK` | Visual styling is acceptable, but global semantic normalization would affect shared output |
| Medium | Downloads metadata lists datasheets, manuals, certificates, catalogs, and technical files as if all are available | Body correctly states only catalogs are public and other files are conditional |
| Medium | No approved standalone logo exists | Organization `logo` must remain absent |
| Low | Contact, Downloads, and Regions listing lack page-level JSON-LD | Optional coverage gap, not an error |
| Low | Article author is absent | Publisher relationship already exists; no factual author can be added yet |

## 5. Files potentially affected

No file in this table is authorized for editing in Phase 1B.

| Candidate file | Potential future change | Direct effect on Phase 3A pages | Status |
|---|---|---:|---|
| `src/app/page.tsx` | Correct `DualcoreLink` to `DualCoreLink` | No | Safe fact correction |
| `src/app/[locale]/about/page.tsx` | Align MOQ and lead time | No | Safe fact correction |
| `src/lib/schema/entities.ts` | Replace WhatsApp-derived `telephone` with accepted +86 phone | Yes, shared schema on protected pages | Fact-supported but needs explicit global-output scope |
| `src/config/brand.ts` | Add centralized Phone/Office/WeChat values or normalize semantic brand name | Yes through shared components/schema | Defer unless explicitly authorized |
| `src/components/layout/header.tsx` | Normalize semantic brand text | Yes, shared Header | Defer under current protected-page rule |
| `src/components/layout/footer.tsx` | Reuse centralized contact values; normalize brand text | Yes, shared Footer | Defer unless scope is expanded |
| `src/lib/seo/metadata.ts` | Normalize `siteName` | Yes, shared metadata | Defer unless scope is expanded |
| `src/app/[locale]/layout.tsx` | Normalize title template/fallback description | Yes, shared metadata | Defer unless scope is expanded |
| `src/config/static-faqs.ts` | Tighten document wording or later reconcile sample/warranty | No direct target-page content | Document wording safe; sample/warranty blocked |
| `src/app/[locale]/downloads/page.tsx` | Tighten metadata and optionally add CollectionPage schema | No | Optional |
| `src/app/[locale]/contact/page.tsx` | Optionally add ContactPage schema | No | Optional |
| `src/app/[locale]/regions/page.tsx` | Optionally add CollectionPage/ItemList schema | No direct target-page content | Optional |
| `src/lib/schema/builders.ts` | Add a minimal page-type builder only if existing builder cannot express it | Potential shared code only | Avoid unless necessary |
| `tests/seo-authority-phase-1c.test.ts` | Assert root/About corrections plus unchanged ContactPoint and crawl/schema boundaries | No production effect | Added in Phase 1C |
| `tests/seo-phase-3a.test.ts` | Re-run the existing protected-page invariants | No production effect | Re-run in Phase 1C |

## 6. Proposed minimal fixes

### Fix 1 — root capitalization

In `src/app/page.tsx`, replace the three semantic occurrences of `DualcoreLink` with `DualCoreLink`:

- metadata title;
- metadata description;
- visible redirect eyebrow.

Do not change the domain, routes, canonical, robots, or redirect behavior.

### Fix 2 — About MOQ

Replace the broad “MOQ depends” line with the confirmed policy:

> Regular products have no fixed MOQ. Custom products may require a customization or tooling fee when new molds are needed. A color-only change using an existing mold does not require a customization fee.

Keep the wording scoped; do not say all custom products have no MOQ or that all customization is free.

### Fix 3 — About lead time

Replace 7–30 days with:

> Typical lead time is 7–15 days, depending on product type, customization requirements, order quantity, and confirmed project requirements.

Do not present the range as guaranteed delivery or as the complete development-cycle duration.

### Fix 4 — ContactPoint telephone

The preferred factual correction is:

```text
telephone: +8613703333750
email: sales@dualcorelink.com
contactType: sales
```

The strict fallback is to omit `telephone` and retain the sales email. Do not keep the +852 WhatsApp number in a `telephone` field without evidence that it also accepts voice calls.

This centralized schema change would alter the JSON-LD on protected Phase 3A pages. It must not be implemented unless the Phase 1C authorization explicitly permits that shared factual correction.

### Optional Fix 5 — document wording

The Downloads metadata and FAQ may be tightened to:

> Public product catalogs and project-request technical documents for smart hotel and smart home B2B buyers.

The visible body should continue to say that datasheets, wiring references, and verified certificate/test-report copies may be provided where applicable after product/project confirmation.

## 7. Fixes safe without owner confirmation

The underlying facts are already confirmed:

- root `DualcoreLink` → `DualCoreLink`;
- About MOQ alignment;
- About 7–30 days → typical 7–15 days with dependencies;
- conditional document wording;
- +852 classified as WhatsApp and +86 classified as Phone;
- regression tests for the confirmed facts.

The narrow Phase 1C production-change authorization was subsequently granted for root capitalization, About MOQ, About lead time, and their direct regression tests. The ContactPoint change was explicitly prohibited and remains deferred because it would change shared JSON-LD on the eight protected pages.

## 8. Fixes blocked pending owner confirmation

- Sample availability, buyer-paid/free status, sample cost, shipping cost, and preparation policy — **OWNER CONFIRMATION REQUIRED**
- Universal or model-level warranty period — **OWNER CONFIRMATION REQUIRED**
- Whether the displayed office is also the registered address — **OWNER CONFIRMATION REQUIRED**
- Legal-document verification of `DUALCORE LINK LIMITED` — **OWNER CONFIRMATION REQUIRED**
- Relationship to `Cangzhou Yitai Trading Co., Ltd.` — **OWNER CONFIRMATION REQUIRED**
- Formal horizontal/square logo, transparent-background files, and usage approval — **OWNER CONFIRMATION REQUIRED**
- Official external profile URLs and `sameAs` — **OWNER CONFIRMATION REQUIRED**
- Resource Article author identity/policy — **OWNER CONFIRMATION REQUIRED**
- Founder, founding date, legal representative, company history, certifications, customer names, project claims, staff count, factory scale, and capacity — **OWNER CONFIRMATION REQUIRED**

## 9. Schema candidates identified in Phase 1B

All candidates in this section were deferred in Phase 1C. The Phase 1C authorization prohibited shared ContactPoint changes and new page-type schema.

### Recommended

1. Correct Organization ContactPoint `telephone` to the accepted +86 Phone if global shared-output scope is authorized.
2. Optionally add a minimal `ContactPage` node on Contact, referencing the existing Organization and WebSite IDs without repeating unconfirmed fields.
3. Optionally add `CollectionPage` to Downloads.
4. Optionally add `CollectionPage` to the Regions listing.
5. Add a Regions `ItemList` only if it is generated from actual published links, excluding planned non-link markets.

Page-level additions should use `createSchemaGraph()` so the existing Organization, Brand, and WebSite nodes remain deduplicated.

## 10. Schema changes not recommended

- Do not add Article `author` until editorial ownership is approved. An invented Person is prohibited; the Organization is the only plausible future choice if responsibility is confirmed.
- Do not add Organization `logo` without an approved logo asset and production URL.
- Do not add `sameAs` without exact official profile URLs and ownership confirmation.
- Do not add `PostalAddress` until the company approves the office address for entity/profile use.
- Do not add `areaServed` merely by copying marketing target regions.
- Do not add `founder`, `foundingDate`, customer, award, certification, or project properties.
- Do not add Product `manufacturer` without an exact verified product/manufacturer mapping.
- Do not add redundant generic WebPage nodes to pages that already have a suitable specific type.

## 11. Test plan

Phase 1C implemented the authorized production fixes and used the following test plan:

1. Add or update focused tests before the full suite:
   - About content contains `7–15 days` and does not contain `7–30 days`.
   - About content contains the confirmed regular/custom MOQ rules.
   - Root source/output contains `DualCoreLink` and not `DualcoreLink`.
   - Organization ContactPoint remains exactly unchanged at the pre-Phase 1C value because its correction was prohibited.
   - shared ContactPoint, robots, canonical, hreflang, sitemap logic, and optional page-type schema remain outside the diff.
   - the existing Phase 3A regression suite continues to pass.
2. Run:

```text
npm run lint
npm run test:data
npm run media:audit
npm run build
git diff --check
```

3. Inspect the rebuilt static output:
   - sitemap remains 76 URLs;
   - no localhost, test-domain, or filesystem-path leak;
   - no `llms.txt`;
   - robots, canonical, hreflang, and sitemap logic unchanged;
   - JSON-LD parses;
   - no duplicate Organization nodes.
4. Diff the eight Phase 3A pages. Without explicit shared-schema authorization, they must be byte/content-equivalent for authored page content and structured data.

No new dependency is needed.

## 12. Production verification plan

Only after a separate commit/deploy authorization:

1. Record the implementation commit and pre-deployment production release.
2. Verify:
   - `https://dualcorelink.com/` redirects to `/en/`, remains noindex, and displays canonical capitalization in its HTML;
   - `/en/about/` returns 200 and contains the confirmed MOQ and lead-time wording;
   - `/en/faqs/` retains the confirmed purchasing baseline;
   - if authorized, representative JSON-LD shows +86 as `telephone` and no +852 telephone;
   - the +852 WhatsApp CTAs still resolve through `wa.me`;
   - the visible +86 Phone and `tel:` link remain unchanged;
   - Contact, Downloads, and Regions schema appears only if explicitly included.
3. Recheck the eight protected Phase 3A URLs:
   - status 200;
   - canonical/H1/page content unchanged;
   - schema unchanged except for an explicitly authorized centralized ContactPoint correction.
4. Verify sitemap remains 76 URLs and no new crawl-policy or external-profile file appears.
5. Do not claim ranking, impressions, clicks, recrawl, or AI citation improvement.

## 13. Rollback considerations

- Keep fact reconciliation in one narrowly scoped implementation commit.
- Do not combine it with dependency upgrades, design changes, Phase 3A content edits, or external-profile work.
- The source rollback is a normal revert of that future implementation commit.
- The production rollback should reactivate the previously recorded static release using the established release process.
- No database or CMS migration is expected.
- If only ContactPoint schema fails validation, revert that field without reverting unrelated confirmed copy corrections.
- If the eight protected pages show any unexpected authored-content change, stop deployment verification and roll back before expanding scope.

## 14. Phase 1C authorized scope and disposition

Authorized and completed locally:

1. Correct root capitalization.
2. Align About MOQ.
3. Align About lead time.
4. Add focused regression tests.
5. Run the full existing validation suite and inspect static output.

Deferred because Phase 1C did not grant global shared-output permission:

6. Correct Organization ContactPoint `telephone` to the accepted +86 Phone.

Deferred as optional, lower-priority follow-up:

7. Add minimal ContactPage and CollectionPage coverage without new entity facts.
8. Tighten Downloads metadata/FAQ document wording if the implementation review confirms a material ambiguity.

Keep samples, warranty, logo, author, address schema, `sameAs`, legal/supply-chain relationships, and global semantic brand normalization deferred until their separate approvals are available.

## 15. Phase 1B decision

The subsequent Phase 1C authorization matched the isolated subset: root capitalization, About MOQ, About lead time, and focused regression tests. The ContactPoint correction was not authorized because of its deliberate shared-schema impact on the protected Phase 3A pages.

## 16. Phase 1C implementation outcome

Entered Phase 1C:

1. Corrected the three root-page `DualcoreLink` occurrences to `DualCoreLink`.
2. Replaced the About MOQ line with the confirmed regular-product and custom-product policy.
3. Replaced the About 7–30-day line with typical 7–15-day wording and explicit product, quantity, customization, and project conditions.
4. Added focused regression coverage for these corrections and the protected boundaries.

Deferred or unchanged:

- Organization/ContactPoint JSON-LD and telephone/WhatsApp semantics
- all eight Phase 3A page content/configuration sources
- samples and warranty — **OWNER CONFIRMATION REQUIRED**
- registered address and legal-entity/supply-chain relationships — **OWNER CONFIRMATION REQUIRED**
- formal logo — **OWNER CONFIRMATION REQUIRED**
- Article author — **OWNER CONFIRMATION REQUIRED**
- external accounts and `sameAs` — **OWNER CONFIRMATION REQUIRED**
- ContactPage, CollectionPage, and any other new schema
- canonical, hreflang, robots, sitemap logic, URLs/slugs, and dependencies

Phase 1C completed local validation only. No commit, push, deployment, or external profile action was performed.
