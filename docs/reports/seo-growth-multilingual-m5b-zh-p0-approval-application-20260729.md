# SEO Growth Multilingual M5B — Chinese P0 Approval Application

Date: 2026-07-29
Reviewer: Allan
Review date: 2026-07-29
Branch: `feature/multilingual-six-language-integration-20260729`

## 1. Approved human-review batch

The following 12 Chinese P0 URLs received explicit human approval:

1. `https://dualcorelink.com/zh/about/`
2. `https://dualcorelink.com/zh/contact/`
3. `https://dualcorelink.com/zh/faqs/`
4. `https://dualcorelink.com/zh/products/`
5. `https://dualcorelink.com/zh/solutions/`
6. `https://dualcorelink.com/zh/solutions/oem-odm-custom-panel-solution/`
7. `https://dualcorelink.com/zh/solutions/rcu-room-control-solution/`
8. `https://dualcorelink.com/zh/solutions/smart-hotel-automation-solution/`
9. `https://dualcorelink.com/zh/products/hotel-smart-room-rcu-host-1/`
10. `https://dualcorelink.com/zh/products/rcu-controller-cabinet/`
11. `https://dualcorelink.com/zh/products/86-type-ai-smart-control-display/`
12. `https://dualcorelink.com/zh/products/smart-four-key-scene-control-panel/`

Every approved decision records:

- Decision: `approved`
- Reviewer: `Allan`
- Review date: `2026-07-29`
- Notes: `Human Chinese review approved`

No Chinese P1/P2 URL and no Arabic, German, Spanish, Vietnamese, or Persian URL was approved.

## 2. Applied native-review state

`npm run multilingual:apply-native-review -- --locale=zh` merged the 12-row P0 decision file over the fail-closed 69-row Chinese decision workbook.

| State | Count |
|---|---:|
| Approved | 12 |
| Pending | 402 |
| Changes required | 0 |
| Production release ready | 12 |
| Chinese pending | 57 |
| Other-language pending | 345 |

The generated evidence contains only the 12 explicitly approved URLs. Pending rows remain omitted and therefore continue to use the default pending state.

## 3. Partial release controls

The release model now distinguishes all 414 technically complete translation candidates from the production-release-ready subset.

- Candidate content retained for audit: 414
- Static export production candidates: 12
- Sitemap localized candidates: 12
- Hreflang localized candidates: 12
- Non-approved localized candidates excluded from production artifacts: 402

The production candidate sitemap contains:

- English baseline: 76 URLs
- Approved Chinese P0 additions: 12 URLs
- Candidate total: 88 URLs

Hreflang is emitted only for the 12 approved English/Chinese page pairs. Each pair contains English, Chinese, and English `x-default` references. The other 402 localized candidates do not enter production hreflang.

The Nginx production exception is restricted to the same 12 Chinese P0 paths. Other known non-English paths remain under the verified English-target redirect policy.

## 4. Chinese P0 CMS import package

The dedicated, non-production import package is:

`src/content/locales/cms-import/zh-p0-reviewed.ts`

It contains seven CMS-backed records:

| Type | Source English ID | Slug |
|---|---:|---|
| Product | 48 | `hotel-smart-room-rcu-host-1` |
| Product | 47 | `rcu-controller-cabinet` |
| Product | 6 | `86-type-ai-smart-control-display` |
| Product | 222 | `smart-four-key-scene-control-panel` |
| Solution | 142 | `oem-odm-custom-panel-solution` |
| Solution | 140 | `rcu-room-control-solution` |
| Solution | 138 | `smart-hotel-automation-solution` |

All seven records:

- use `locale = zh`
- retain the verified English source ID and slug
- record `nativeReviewStatus = approved`
- record reviewer `Allan`
- record review date `2026-07-29`
- keep `localizedContentId = null`
- remain deterministic validated-import payloads
- do not overwrite English records

No CMS import or production CMS write was executed.

## 5. Release-check behavior

### Chinese P0 batch

Command:

`npm run multilingual:release-check -- --locale=zh --batch=p0`

Result:

- PASS
- candidates: 12
- production ready: 12
- CMS payloads: 7
- structurally ready: 7
- native approved: 7
- technical validation: passed

### Full six-language scope

Command:

`npm run multilingual:release-check`

Result:

- EXPECTED CONTROLLED FAILURE
- candidates: 414
- production ready: 12
- pending rows blocked: 402
- CMS native review: 7/252 approved
- full production readiness: 12/414

The full check continues to prevent an all-language release. The deployment workflow is scoped to the explicitly approved `zh:p0` batch and retains build and artifact count gates for 12 Chinese pages only.

## 6. Static artifact verification

The final local production candidate contains:

| Locale | Exported pages |
|---|---:|
| zh | 12 |
| ar | 0 |
| de | 0 |
| es | 0 |
| vi | 0 |
| fa | 0 |

Static export audit results:

- localized pages: 12
- sitemap URLs: 88
- localized sitemap URLs: 12
- canonical and hreflang references: no pending localized URL
- unpublished localized output directories: absent

## 7. Validation

| Check | Result |
|---|---|
| `npm run multilingual:audit` | PASS — manifest 414; approved 12; pending 402; production ready 12; export/sitemap/hreflang eligible 12 |
| Batch release check | PASS — 12/12 pages and 7/7 CMS records |
| Full release check | EXPECTED FAILURE — 402 pending pages remain blocked |
| `npm test` | PASS — 145/145 |
| `npm run lint` | PASS with zero errors; generated `.wrangler` files produced three warnings |
| `npm run media:audit` | PASS — 0 errors; 1 existing warning |
| `npm run build` | PASS — Next generated 163 routes before cleanup; final localized output 12; sitemap 88 |
| `npm run multilingual:static-export-audit` | PASS — 12 localized pages; sitemap 88 |
| `git diff --check` | PASS |

The build and data validation used the public read-only CMS endpoint:

`WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json`

## 8. Files and safety boundaries

The implementation updates the controlled decisions evidence, release batch definition, release-check logic, publication/export/sitemap/hreflang filters, Chinese P0 CMS package, static export cleanup, Nginx exact exception, deployment artifact baselines, automated tests, and reports.

It did not:

- approve any of the other 402 localized pages
- write the production CMS
- merge to `main`
- commit or push
- deploy
- submit GSC requests

## 9. Release status

Chinese P0 is technically qualified as an isolated production candidate, but this phase performed no production action. The current production site remains unchanged until a separate commit, push, CMS import, and deployment phase is explicitly approved.
