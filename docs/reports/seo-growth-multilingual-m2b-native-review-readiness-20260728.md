# DualCoreLink SEO Growth — Multilingual Phase M2B

## Arabic + Chinese Native Review and Production Readiness

Date: 2026-07-28
Status: native-review preparation and production gate implemented locally.
Deployment status: **blocked by design; no deployment performed**.

## 1. Objective and boundaries

M2B prepares the 27 M2A Arabic and Chinese P0 pages for real native-language
review, strengthens automated language/SEO/GEO consistency checks, and creates
an enforceable production release gate.

This phase does not claim native-language approval. It does not write to the
production CMS, expose a new production page, submit an indexing request,
commit, push, or deploy.

## 2. Native-review publication model

Every multilingual manifest record now contains:

- `nativeReviewStatus`: `pending`, `changes_required`, or `approved`
- `nativeReviewer`
- `nativeReviewDate`
- `nativeReviewNotes`
- `productionReleaseReady`

The 27 M2A candidates remain:

```text
nativeReviewStatus = pending
nativeReviewer = null
nativeReviewDate = null
productionReleaseReady = false
```

Production readiness requires the existing translation, SEO metadata, content
review, and local publication gates plus a real approved native review, a
non-empty reviewer, a valid ISO review date, successful technical validation,
and `productionReleaseReady=true`.

## 3. Arabic P0 review status

Review pack:
`docs/reviews/multilingual/ar-p0-native-review-20260728.md`

| Localized URL | Native status | Production ready |
|---|---|---:|
| `https://dualcorelink.com/ar/about/` | Pending | No |
| `https://dualcorelink.com/ar/contact/` | Pending | No |
| `https://dualcorelink.com/ar/faqs/` | Pending | No |
| `https://dualcorelink.com/ar/products/` | Pending | No |
| `https://dualcorelink.com/ar/solutions/` | Pending | No |
| `https://dualcorelink.com/ar/regions/` | Pending | No |
| `https://dualcorelink.com/ar/solutions/rcu-room-control-solution/` | Pending | No |
| `https://dualcorelink.com/ar/solutions/smart-hotel-automation-solution/` | Pending | No |
| `https://dualcorelink.com/ar/solutions/hotel-guest-room-control-solution/` | Pending | No |
| `https://dualcorelink.com/ar/regions/middle-east/` | Pending | No |
| `https://dualcorelink.com/ar/regions/saudi-arabia/` | Pending | No |
| `https://dualcorelink.com/ar/regions/uae/` | Pending | No |
| `https://dualcorelink.com/ar/products/hotel-smart-room-rcu-host-1/` | Pending | No |
| `https://dualcorelink.com/ar/products/rcu-controller-cabinet/` | Pending | No |
| `https://dualcorelink.com/ar/products/86-type-ai-smart-control-display/` | Pending | No |

Arabic totals: 15 pending, 0 approved, 0 production-ready.

## 4. Chinese P0 review status

Review pack:
`docs/reviews/multilingual/zh-p0-native-review-20260728.md`

| Localized URL | Native status | Production ready |
|---|---|---:|
| `https://dualcorelink.com/zh/about/` | Pending | No |
| `https://dualcorelink.com/zh/contact/` | Pending | No |
| `https://dualcorelink.com/zh/faqs/` | Pending | No |
| `https://dualcorelink.com/zh/products/` | Pending | No |
| `https://dualcorelink.com/zh/solutions/` | Pending | No |
| `https://dualcorelink.com/zh/solutions/oem-odm-custom-panel-solution/` | Pending | No |
| `https://dualcorelink.com/zh/solutions/rcu-room-control-solution/` | Pending | No |
| `https://dualcorelink.com/zh/solutions/smart-hotel-automation-solution/` | Pending | No |
| `https://dualcorelink.com/zh/products/hotel-smart-room-rcu-host-1/` | Pending | No |
| `https://dualcorelink.com/zh/products/rcu-controller-cabinet/` | Pending | No |
| `https://dualcorelink.com/zh/products/86-type-ai-smart-control-display/` | Pending | No |
| `https://dualcorelink.com/zh/products/smart-four-key-scene-control-panel/` | Pending | No |

Chinese totals: 12 pending, 0 approved, 0 production-ready.

## 5. Page review material

Each of the 27 page sections records:

- English source and localized URL;
- page type and verified English title;
- translated title, SEO title, meta description, and H1;
- H2/H3 headings, CTA, image alt, and breadcrumb;
- FAQ and procurement/specification evidence;
- translatable schema fields and controlled technical terminology;
- native-review decision, requested changes, reviewer, and review date.

Reviewer and date fields are deliberately blank. The generator:
`scripts/generate-multilingual-review-packs.ts` verifies the exact 15/12 page
scope before writing the review material.

## 6. Automated language and content review

The multilingual audit checks:

- minimum target-language content volume and target-script presence;
- possible long English sentence leakage;
- empty and placeholder text;
- known untranslated UI labels;
- FAQ question-mark conventions for Arabic and Chinese;
- controlled uppercase spelling for RCU, OEM, ODM, KNX, HVAC, and RS485;
- unexpected bidirectional-control or Hebrew characters in Arabic content;
- price, rating, or inventory claim markers;
- complete localized navigation and UI messages;
- all required glossary entries for Arabic and Chinese;
- complete sections, FAQ, links, CTA, metadata, and content evidence.

Result: 27/27 passed the automated checks with **0 detected language/content
issues**. This means no machine-detectable violation was found; it is not a
native-language approval. All 27 pages still require human evaluation of
fluency, local convention, factual equivalence, and buyer-facing tone.

## 7. SEO/GEO technical review

The local build and export audit verified:

- localized title and description;
- one H1 per page;
- self-referencing canonical;
- correct `lang`;
- Arabic `dir="rtl"`;
- reciprocal `en`/`ar`/`zh` hreflang only where the localized equivalent
  exists;
- correct `x-default`;
- exactly 27 localized sitemap candidates;
- parseable page-appropriate schema and localized translatable fields;
- internal links restricted to approved localized pages;
- no hreflang to an unpublished page, 301, 404, or empty shell;
- complete lead paragraph, project/procurement entities, FAQ, and buying
  information;
- no detected keyword stuffing or unsupported commercial schema.

The final static build generated 172/172 routes. Export cleanup retained the 27
approved local candidates, and the local sitemap remained 103 URLs.

## 8. CMS import readiness

Checklist:
`docs/reviews/multilingual/cms-import-readiness-20260728.md`

| Locale | Payloads | Structurally ready | Native-approved | Production import |
|---|---:|---:|---:|---:|
| Arabic | 6 | 6 | 0 | 0 |
| Chinese | 7 | 7 | 0 | 0 |
| Total | 13 | 13 | 0 | 0 |

All source English content IDs, locales, slugs, metadata, specifications,
structured content, import keys, and manifest relations validate. Every
`localizedContentId` remains `null`, so the payload does not identify or
overwrite an English CMS record. No CMS API or production import was executed.

## 9. Production release check

Command:

```text
npm run multilingual:release-check
```

Actual result: exit code 1, as required.

```text
candidates=27
production-ready=0
CMS payloads=13
structurally-ready=13
native-approved=0
technical-validation=passed
```

The command listed all 27 pending URLs, then reported:

- CMS native review incomplete: 0/13 approved
- production release readiness incomplete: 0/27 ready

The AWS production workflow invokes this command before the static build.
Therefore the current branch state cannot pass the deployment workflow without
real, matching native-review evidence.

## 10. Validation results

| Check | Result |
|---|---|
| `npm run multilingual:review-pack` | Passed; Arabic 15, Chinese 12, CMS 13 |
| `npm run multilingual:audit` | Passed; 414 records, 27 local candidates, 27 pending, 0 production-ready |
| `npm run multilingual:release-check` | Controlled failure; correctly blocked all 27 pending pages |
| `npm test` | Passed, 137/137 with review-pack coverage |
| `npm run lint` | Passed; 0 errors, 2 pre-existing GSC warnings |
| `npm run media:audit` | Passed; 0 errors, 1 existing warning |
| `npm run build` | Passed after a generator type correction; 172/172 and export audit passed |
| `git diff --check` | Passed at closure |

The first build attempt identified only a TypeScript narrowing issue inside the
new review-pack generator. It was corrected without changing content or review
status, and the subsequent build passed.

## 11. Human review completion procedure

For each page:

1. Review every field in the locale review pack.
2. If changes are needed, set `nativeReviewStatus=changes_required`, describe
   exact changes in `nativeReviewNotes`, update the localized source, regenerate
   the pack, and rerun all validation.
3. After real approval, set `nativeReviewStatus=approved`, enter the real
   reviewer name and valid `YYYY-MM-DD` date, and retain meaningful notes.
4. For Product/Solution pages, enter identical review evidence in the matching
   CMS payload record.
5. Set `productionReleaseReady=true` only after all technical validation has
   passed for that exact content revision.
6. Run `npm run multilingual:audit` and
   `npm run multilingual:release-check`.
7. Do not commit, import CMS data, push, or deploy until a separate human
   pre-release review approves the complete 27-page scope.

## 12. Deployment decision

Deployment is **not allowed**.

Reasons:

- Arabic native review: 0/15 approved.
- Chinese native review: 0/12 approved.
- CMS native review: 0/13 approved.
- `productionReleaseReady`: 0/27.
- The production release check correctly returns nonzero.
