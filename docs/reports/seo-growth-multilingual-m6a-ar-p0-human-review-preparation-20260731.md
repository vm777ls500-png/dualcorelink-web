# DualCoreLink SEO Growth — Multilingual Phase M6A

## Arabic P0 Human Review Preparation

- Authorizer: Allan
- Authorization date: 2026-07-31
- Conclusion: **PASS — Arabic P0 Human Review Package Ready**
- Review branch: `review/ar-p0-human-review-20260731`
- Review worktree: `C:\Users\empir\Documents\dualcorelink-ar-p0-review-prep`
- Baseline branch: `feature/multilingual-six-language-integration-20260729`
- Baseline SHA: `c5ac34509e27609bd143fbf179d54c028763d4ad`
- Remote baseline verification: the remote feature branch resolved to the same full SHA before the worktree was created.

This phase prepared review evidence only. It did not approve Arabic content, write the production CMS, expose an Arabic route, push a branch, deploy a release, or submit a GSC request.

## 1. Scope and publication state

The historical M2A Arabic P0 scope is 15 pages: nine file-backed pages and six CMS-backed Product/Solution candidates. The scope was reconstructed from the publication manifest, architecture plan, M2A/M4A/M4C reports, existing Arabic review material, decisions, and CMS payload. No P1/P2 page was added.

Every row below remains:

- `translationStatus = approved`
- `seoMetadataStatus = approved`
- `contentReviewStatus = approved`
- `publishReady = true`
- `nativeReviewStatus = pending`
- `nativeReviewer = null`
- `nativeReviewDate = null`
- `productionReleaseReady = false`

| # | Page type | English source | Arabic candidate | Content source |
|---:|---|---|---|---|
| 1 | Static | `/en/about/` | `/ar/about/` | `src/content/locales/ar/pages.ts` |
| 2 | Static | `/en/contact/` | `/ar/contact/` | `src/content/locales/ar/pages.ts` |
| 3 | Static | `/en/faqs/` | `/ar/faqs/` | `src/content/locales/ar/pages.ts` |
| 4 | Product collection | `/en/products/` | `/ar/products/` | `src/content/locales/ar/pages.ts` |
| 5 | Solution collection | `/en/solutions/` | `/ar/solutions/` | `src/content/locales/ar/pages.ts` |
| 6 | Region collection | `/en/regions/` | `/ar/regions/` | `src/content/locales/ar/pages.ts` |
| 7 | Solution | `/en/solutions/rcu-room-control-solution/` | `/ar/solutions/rcu-room-control-solution/` | CMS payload, English source ID `140` |
| 8 | Solution | `/en/solutions/smart-hotel-automation-solution/` | `/ar/solutions/smart-hotel-automation-solution/` | CMS payload, English source ID `138` |
| 9 | Solution | `/en/solutions/hotel-guest-room-control-solution/` | `/ar/solutions/hotel-guest-room-control-solution/` | CMS payload, English source ID `137` |
| 10 | Region | `/en/regions/middle-east/` | `/ar/regions/middle-east/` | `src/content/locales/ar/pages.ts` |
| 11 | Region | `/en/regions/saudi-arabia/` | `/ar/regions/saudi-arabia/` | `src/content/locales/ar/pages.ts` |
| 12 | Region | `/en/regions/uae/` | `/ar/regions/uae/` | `src/content/locales/ar/pages.ts` |
| 13 | Product | `/en/products/hotel-smart-room-rcu-host-1/` | `/ar/products/hotel-smart-room-rcu-host-1/` | CMS payload, English source ID `48` |
| 14 | Product | `/en/products/rcu-controller-cabinet/` | `/ar/products/rcu-controller-cabinet/` | CMS payload, English source ID `47` |
| 15 | Product | `/en/products/86-type-ai-smart-control-display/` | `/ar/products/86-type-ai-smart-control-display/` | CMS payload, English source ID `6` |

## 2. Review material

The complete human-review workbook is:

`docs/reviews/multilingual/ar-p0-final-human-review-20260731.md`

It covers 15/15 URLs and includes the English and Arabic titles, SEO metadata, H1, complete opening paragraph, primary sections and body content, CTA, image alt, breadcrumb, FAQ/procurement material, Product/Solution facts, translatable schema evidence, terminology, RTL notes, source differences, automatic revisions, suggested decision, and blank human decision fields.

The decision sheet is:

`docs/reviews/multilingual/ar-p0-final-decisions-20260731.md`

It contains exactly 15 rows. All decisions are `pending`; reviewer, review date, and notes are blank.

## 3. Language and terminology review

Checks covered Modern Standard Arabic, Middle East B2B hotel-engineering tone, punctuation, mixed-direction acronyms and model identifiers, and consistent use of `RCU`, `GRMS`, `KNX`, `HVAC`, `RS485`, `OEM`, and `ODM`.

No Persian copy, placeholder text, mojibake, long English body passage, or untranslated core UI field was found. Technical acronyms and model identifiers remain unchanged.

### Automatic revisions

Seven P0 pages received deterministic corrections. There were 22 field-level substitutions in three issue categories:

| Category | Pages | Change |
|---|---:|---|
| Unambiguous Arabic grammar | 1 | Corrected `تنظيم مداخل التحكم ومخارجه` to `تنظيم مدخلات النظام ومخرجاته` on the RCU Host product introduction. |
| Repeated/unnatural engineering wording | 1 | Corrected `مع تخطيط التخطيط الداخلي` to `مع تخطيط الترتيب الداخلي` on the RCU Controller Cabinet description. |
| Accurate 86-Type terminology | 5 | Replaced the dimensional-sounding `مقاس 86` wording with the source-faithful `من نوع 86` wording on the Products collection, Saudi Arabia region page, AI display product, and related-link labels on two Solution pages. |

The affected files are:

- `src/content/locales/ar/pages.ts`
- `src/content/locales/cms-import/ar.ts`
- `src/content/locales/m3a-catalog.ts`

The full before/after evidence is recorded under each affected URL in the human-review workbook.

### RCU Host terminology recommendation

`Hotel Smart Room RCU Host 1` is the formal English source product name. The existing Arabic `مضيف RCU` is understandable but may read as a literal translation rather than the most natural Middle East hotel-controls term.

The automated review did not rename the product. A qualified Arabic hotel-engineering reviewer should choose one of these outcomes:

1. Explicitly retain `مضيف RCU` as the approved product-name rendering; or
2. Retain the formal English model name and use an explanatory Arabic term such as `وحدة تحكم الغرفة RCU` or `وحدة RCU رئيسية للتحكم` in descriptive copy.

The workbook therefore recommends `changes_required` for this one page pending the human terminology decision. The other 14 pages receive an automated recommendation of `approve`, but all 15 actual decisions remain `pending`.

## 4. Factual consistency

The six CMS-backed candidates were compared with live public English source records using GET-only REST requests:

- Products: IDs `48`, `47`, and `6`
- Solutions: IDs `140`, `138`, and `137`

All six sources returned HTTP 200 with the expected English slug, language, and source record type. The Arabic payload records use `locale = ar`, the correct source ID and slug, complete metadata and structured content, and no localized CMS ID.

No invented price, stock, rating, certification, customer, case study, performance promise, or energy-saving percentage was found. Product model names and stated specifications were not changed. Procurement statements remain within the confirmed boundaries:

- no fixed MOQ for regular products;
- new tooling may create customization/tooling fees;
- color-only changes using existing tooling do not incur a customization fee;
- normal lead time is 7–15 days;
- OEM/ODM is supported.

No production CMS import was generated, authorized, or executed.

## 5. SEO/GEO and technical candidate review

The temporary local review candidate rendered all 15 Arabic P0 pages without changing manifest native-review or production-readiness fields.

Automated checks found:

- 15/15 localized Arabic titles and descriptions;
- 15/15 unique H1 values;
- `lang="ar"` and `dir="rtl"` on every candidate;
- self-referencing Arabic canonical in the review candidate;
- candidate `en`/`ar`/`x-default` hreflang consistency;
- parseable JSON-LD and localized schema fields;
- clear first-paragraph subject and procurement context;
- no keyword stuffing;
- no query URL in canonical, hreflang, sitemap, CTA, or content links;
- no content link to an ungenerated Arabic P0 route.

Candidate canonical, hreflang, and sitemap evidence was used only for local review. The temporary review routing was removed before final validation.

## 6. RTL and browser QA

Browser QA covered 15 pages at five viewports: `375`, `390`, `430`, `768`, and `1280` pixels, for 75 page/viewport combinations.

| Check | Result |
|---|---|
| RTL layout and bidirectional acronyms/models | 75/75 pass |
| Horizontal overflow | 0 failures |
| Header, footer, mobile navigation, CTA, breadcrumbs | 75/75 pass |
| Images and content sections | 75/75 pass |
| Title, metadata, H1, canonical, hreflang, schema | 75/75 pass |
| Console errors | 0 |
| Network failures | 0 |
| Internal content query URLs | 0 |
| Broken generated-page links | 0 |

The global locale selector continues to expose the existing non-production language navigation model, whose pending routes are handled by one-hop Nginx redirects. This is existing release-boundary behavior, not an Arabic content-link defect.

## 7. Publication boundary and safety gate

Final normal build behavior:

- Multilingual manifest: 414/414 records
- Arabic candidates in manifest: 69/69
- Native-review pending: 402
- Production-ready globally: 12 Chinese pages
- Production-ready Arabic: 0
- Normal static export localized pages: 12 Chinese only
- Normal candidate sitemap: 88
- Arabic P0 static files after normal cleanup: 0/15

Production GET/HEAD checks:

- All 15 Arabic P0 URLs return an exact one-hop HTTP 301 to their matching English URL.
- Production sitemap contains 88 URLs: 76 English, 12 Chinese, 0 Arabic, and 0 query URLs.
- Production Arabic public-page count remains 0.

Security boundary:

- No WordPress administrator browser session was used.
- No `wp-admin`, Customizer, Menus, Plugin Install, or `/wp-json/batch/v1` endpoint was accessed.
- All production/CMS network traffic in this phase used GET or HEAD.
- No POST, PUT, PATCH, or DELETE request was issued.
- No CMS, database, plugin, Nginx, or production configuration write occurred.
- The M5L-3 independently verified baseline was Users `3`, Posts `216`, and Postmeta `2576`. This phase used no write-capable channel; therefore it introduced no task-attributable database change. A new privileged counter query was intentionally not performed because this phase prohibited administrator-session use.
- The seven published Chinese CMS records were not modified.

## 8. Validation results

| Validation | Result |
|---|---|
| `npm ci` | PASS; 352 packages installed. Existing audit output reports 7 high-severity dependency findings; no dependency was changed in this phase. |
| `npm run multilingual:audit` | PASS; manifest 414, 69 per locale, pending 402, production-ready 12. |
| Full `npm run multilingual:release-check` | Expected controlled failure; it continues to block 402 pending pages and incomplete CMS native review. |
| `npm test` | PASS; 145/145. |
| `npm run lint` | PASS; 0 errors. |
| `npm run media:audit` | PASS; 0 errors, 1 existing warning. |
| Local Arabic review build | PASS; 172/172 generated, 15 Arabic P0 pages reviewed, temporary sitemap 103 (76 English + 12 Chinese + 15 Arabic review candidates). |
| Normal `npm run build` | PASS; 163/163 generated, static cleanup retained only 12 approved Chinese localized pages. |
| `npm run multilingual:static-export-audit` | PASS; 12 localized production candidates, sitemap 88. |
| `git diff --check` | PASS. |

## 9. Review counts and next action

- Arabic P0 pages: 15
- Arabic P0 CMS payloads: 6
- Automatically revised pages: 7
- Suggested `approve`: 14
- Suggested `changes_required`: 1 (`RCU Host` terminology)
- Actual `pending`: 15
- Actual `approved`: 0
- Actual `changes_required`: 0
- Arabic `productionReleaseReady`: 0
- Invented facts found: 0

Next, a real Arabic native-language reviewer should read the full workbook, resolve the `RCU Host` terminology explicitly, and enter decisions only in the 15-row decisions file. Approval must include a real reviewer identity and valid review date. No apply-native-review command, CMS import, branch push, merge, deployment, or GSC action is authorized by this report.
