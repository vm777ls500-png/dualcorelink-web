# SEO Growth — Multilingual Integration Baseline Reconstruction

Date: 2026-07-29
Status: reconstructed and validated locally; not committed, pushed, deployed,
or written to the production CMS

## Objective and protected baseline

The six-language M1–M4C candidate implementation was reconstructed in an
isolated worktree based on the current production branch:

- Integration worktree:
  `C:\Users\empir\Documents\dualcorelink-multilingual-integration`
- Branch: `feature/multilingual-six-language-integration-20260729`
- Base and current HEAD:
  `9130c58190a8ded92c06127f48fff682b831ded5`
- Base commit: `fix: clean inquiry and product filter urls`

The original dirty worktree and the GSC release worktree were read only. No
reset, checkout, clean, stash, autostash pull, deletion, rollback, commit,
push, deployment, CMS write, GSC validation, or indexing request was used.

## Migration scope

Ninety-one implementation and handoff files were migrated or semantically
merged before this integration report was added. The final integration diff
contains 92 file paths including this report.

### M1 foundation

- Publication manifest, publication control, CMS contract, audit and release
  libraries under `src/lib/multilingual-*`
- `src/content/locales/types.ts`, locale registry, and initial locale indexes
- `scripts/audit-multilingual-publication.ts`
- `tests/multilingual-foundation.test.ts`
- `docs/runbooks/multilingual-content-publishing.md`
- M1 report

### M2A and M2B

- Arabic and Chinese page sources and initial CMS payload files
- Shared UI and glossary sources
- Localized publication renderer and route adapters
- Arabic/Chinese P0 review packs and CMS readiness material
- Review-pack and release-check tooling
- M2A and M2B reports

### M3A

- `src/content/locales/m3a-catalog.ts`
- `src/content/locales/m3a-file-pages.ts`
- `src/content/locales/cms-import/m3a-generated.ts`
- Arabic/Chinese full-coverage route, sitemap, hreflang, export and review-pack
  integration
- M3A report

### M4A

- German, Spanish, Vietnamese and Persian locale indexes
- `src/content/locales/m4a-locale-data.ts`
- `src/content/locales/m4a-file-pages.ts`
- `src/content/locales/cms-import/m4a-generated.ts`
- Six-language sitemap, hreflang, Nginx, static-cleanup and deployment-gate
  candidates
- Four 69-page full review packs
- M4A report

### M4B and M4C

- Chinese and five-language review workbooks and decision files
- `src/content/locales/native-review-decisions.ts`
- `src/lib/native-review-evidence.ts`
- `scripts/apply-native-review.ts`
- Chinese and five-language workbook generators
- M4B/M4C language corrections, tests and reports

### GSC production documentation

- `docs/reports/seo-operations-gsc-query-url-cleanup-production-release-20260729.md`

The production report was copied from the GSC release worktree without
modifying that worktree.

## Overlap merge results

| File or surface | Merge result |
|---|---|
| `package.json` | Added only the required multilingual scripts and `npm test` alias. `seo:gsc` and `googleapis` were not imported. |
| `package-lock.json` | Kept exactly from `origin/main`; no unconfirmed lockfile change. |
| Products listing | Preserved clean button-based category/series filtering, History API behavior and clean Contact links; added localized listing lookup/rendering. |
| Contact attribution files | Kept directly from the deployed GSC Cleanup baseline without a multilingual diff. |
| Sitemap | Added only 414 locally eligible multilingual candidates to the 76 English URLs. |
| SEO tests | Preserved query URL assertions while updating the local candidate sitemap expectation to 490. |
| Static export | Preserved the deployed GSC query audit and added the multilingual 414-page export audit. |
| Nginx/deployment | Preserved the activated root helper flow; added file-gated multilingual candidates and the mandatory release-check before build. |
| `latest-status.md` | Keeps the deployed GSC production SHA and English-only production result while recording the blocked local multilingual candidate state. |

No latest-main file was blindly replaced where the GSC cleanup changed its
semantics. The five deployed query-cleanup production files and their focused
tests remain present in the base; the combined test suite verifies them.

## Coverage and publication state

| Locale | Manifest | File-backed pages | CMS payloads | Pending | Approved | Production ready |
|---|---:|---:|---:|---:|---:|---:|
| Arabic (`ar`) | 69 | 27 | 42 | 69 | 0 | 0 |
| Chinese (`zh`) | 69 | 27 | 42 | 69 | 0 | 0 |
| German (`de`) | 69 | 27 | 42 | 69 | 0 | 0 |
| Spanish (`es`) | 69 | 27 | 42 | 69 | 0 | 0 |
| Vietnamese (`vi`) | 69 | 27 | 42 | 69 | 0 | 0 |
| Persian (`fa`) | 69 | 27 | 42 | 69 | 0 | 0 |
| **Total** | **414** | **162** | **252** | **414** | **0** | **0** |

All records have complete local translation, metadata and content evidence and
are `publishReady=true` local candidates. Every record remains:

- `nativeReviewStatus=pending`
- `nativeReviewer=null`
- `nativeReviewDate=null`
- `productionReleaseReady=false`

No reviewer, review date, approval, localized production CMS ID, or production
readiness was fabricated.

## Sitemap, hreflang, canonical and redirects

- English source URLs represented by the manifest: 69
- English sitemap URLs: 76
- Localized sitemap candidates: 414
- Local candidate sitemap total: 490
- Localized hreflang-eligible pages: 414
- English source pages with six localized alternates: 69
- Localized pages with reciprocal English/localized alternates and English
  `x-default`: 414
- Local manifest candidates still using the English 301: 0
- Unsupported or non-manifest locale paths remain fail-closed.
- Arabic and Persian are RTL; Chinese, German, Spanish and Vietnamese are LTR.

This is only a local candidate state. Production remains English-only with
76 sitemap URLs and zero public non-English pages because no multilingual
commit, push, CMS import, Nginx activation, or deployment occurred.

## GSC Query URL Cleanup preservation

The combined 528-route build retained the deployed behavior:

- Contact CTA hrefs are clean.
- Product category and series controls emit no query href.
- `inquiry_cta_click` retains the approved attribution fields.
- Validated form attribution uses session storage with a two-hour expiry.
- Legacy Contact parameters are whitelisted, stored and removed from the
  address bar.
- Legacy Products filters retain their state and are cleaned to
  `#product-results`.
- Browser back and forward restore filter state.

Static output scan:

| Query surface | Count |
|---|---:|
| `source_page` href | 0 |
| `content_type` href | 0 |
| `content_slug` href | 0 |
| `cta_position` href | 0 |
| `category` href | 0 |
| `series` href | 0 |
| Any internal query href | 0 |
| Sitemap query URL | 0 |
| Canonical query URL | 0 |
| Hreflang query URL | 0 |

The query audit scanned 493 exported HTML pages and reported no errors.

Browser QA confirmed Product, Solution and Resource attribution, clean Contact
URLs, legacy Contact cleanup, legacy Products cleanup, category filtering and
back/forward state. A 390px viewport override rendered at a 375px content
viewport. Arabic, Chinese, German, Spanish, Vietnamese and Persian About pages
each had one H1 and the correct `lang`/direction. Arabic measured zero overflow,
and visual inspection of all six pages showed no horizontal scrolling.

## Validation

| Check | Result |
|---|---|
| `npm ci` | Passed; 352 packages, lockfile unchanged |
| `npm run multilingual:audit` | Passed; 414/414, 69 per locale, 414 local candidates, 414 pending, 0 production-ready |
| `npm run multilingual:release-check` | Expected controlled failure; listed 414 pending URLs, CMS native approval 0/252, production readiness 0/414 |
| `npm test` with public read-only CMS | Passed, 144/144 |
| `npm run lint` | Passed; 0 errors |
| `npm run media:audit` | Passed; 0 errors, 1 existing warning |
| `npm run build` with public read-only CMS | Passed; 528/528 |
| `npm run multilingual:static-export-audit` | Passed; 414 localized pages, sitemap 490 |
| GSC query export audit | Passed; all ten query counts 0 |
| Browser QA | Passed for combined GSC flows and six locale layouts |
| `git diff --check` | Passed at closure |

`npm ci` reported seven existing high-severity dependency audit findings. No
dependency or lockfile change was introduced by this reconstruction.

## Excluded dirty files

The original worktree contained 147 physical modified/untracked file paths.
Ninety were migrated or merged. Eight additional paths were intentionally not
copied because the deployed GSC Cleanup versions already exist in
`origin/main`, including `package-lock.json`, Contact/filter attribution
implementation, query tests and the implementation report.

Forty-nine unrelated dirty paths were excluded:

- Project Automation documents
- Phase 3B analysis/planning documents
- older GSC coverage and 404 audit documents
- GSC API source, test, templates and six Excel exports
- `googleapis`/`seo:gsc` work
- pre-M1 multilingual planning reports not listed as M1–M4C deliverables
- other historical reports

No `out/`, `node_modules/`, environment file, private key, credential,
temporary QA file, or unconfirmed package-lock modification was migrated.

## Worktree state

| Worktree | HEAD | Status |
|---|---|---|
| Original `New project` | `6a6514f77040d8aad54478c11adbf5a1af02054b` | Original 83 status entries preserved; behind updated `origin/main` by one commit |
| GSC release | `9130c58190a8ded92c06127f48fff682b831ded5` | Original two local documentation changes preserved |
| Multilingual integration | `9130c58190a8ded92c06127f48fff682b831ded5` | Dirty only with the classified 92-file integration candidate |

The original worktree status snapshot remains
`f216fa3d6f132244cad3f0dfa815ab2113b285ce87b5328711f4729298b3f3b6`.
The GSC release worktree status snapshot remains
`322ccc5d35910b120133b9664af33928101a166772ae95a871b16155635754fe`.

## Release decision

Multilingual deployment is prohibited. The release check correctly returns
nonzero, all 414 pages remain pending, and `productionReleaseReady` is zero.
This phase created no commit, push, deployment, production CMS write, native
approval, GSC validation or indexing request.
