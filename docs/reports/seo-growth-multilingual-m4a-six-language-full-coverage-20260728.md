# SEO Growth Multilingual M4A — Six-Language Full Coverage

Date: 2026-07-28
Status: local candidate implementation complete; production release blocked

## Objective and protected baseline

Phase M4A completed German, Spanish, Vietnamese, and Persian candidates for
the 69-page English content master. Existing Arabic and Chinese candidates
remain intact. No English body, English URL, production CMS record, GSC
property, commit, push, or production deployment was changed.

The work began on `main` at
`6a6514f77040d8aad54478c11adbf5a1af02054b` with a pre-existing dirty
worktree. No reset, checkout, clean, stash, or rollback operation was used.

## Final coverage

| Locale | Before M4A | Added in M4A | Local candidates | Native review | Production ready |
|---|---:|---:|---:|---:|---:|
| Arabic (`ar`) | 69 | 0 | 69/69 | 0/69 | 0 |
| Chinese (`zh`) | 69 | 0 | 69/69 | 0/69 | 0 |
| German (`de`) | 0 | 69 | 69/69 | 0/69 | 0 |
| Spanish (`es`) | 0 | 69 | 69/69 | 0/69 | 0 |
| Vietnamese (`vi`) | 0 | 69 | 69/69 | 0/69 | 0 |
| Persian (`fa`) | 0 | 69 | 69/69 | 0/69 | 0 |
| **Total** | **138** | **276** | **414/414** | **0/414** | **0** |

All 414 manifest records have approved translation, metadata, content review,
and local `publishReady` candidate status. Every record deliberately keeps:

- `nativeReviewStatus = pending`;
- `nativeReviewer = null`;
- `nativeReviewDate = null`;
- `productionReleaseReady = false`.

No human reviewer or review date was invented.

## Content implementation

### Repository-owned content

Each locale contains 27 complete file-backed pages:

- Product listing: 1
- Solution listing: 1
- Resource listing and details: 16
- Region listing and details: 6
- About, Contact, and FAQ: 3

German, Spanish, Vietnamese, and Persian content includes localized title,
metadata, H1, sections, CTA, breadcrumbs, image alt, FAQ, procurement context,
and internal links. Persian uses RTL and is independently written rather than
copying Arabic. Controlled product and integration terms retain `OEM`, `ODM`,
`RCU`, `KNX`, `HVAC`, `RS485`, and `GRMS` where applicable.

### CMS import payload

Each locale contains 42 deterministic Product/Solution payloads:

| Locale | Products | Solutions | Total |
|---|---:|---:|---:|
| ar | 36 | 6 | 42 |
| zh | 36 | 6 | 42 |
| de | 36 | 6 | 42 |
| es | 36 | 6 | 42 |
| vi | 36 | 6 | 42 |
| fa | 36 | 6 | 42 |
| **Total** | **216** | **36** | **252** |

Every payload retains the verified English content ID, English slug, locale,
content type, metadata, specifications, structured content, translation
relation, and `localizedContentId = null`. No CMS connection or write was
performed.

## SEO, GEO, routing, and structured data

- Local sitemap candidate: 490 URLs (76 English + 414 localized).
- Hreflang: all 69 English source pages expose six localized candidates; all
  414 localized pages expose reciprocal English and applicable localized
  alternates with English `x-default`.
- Local canonical: self-referencing for every localized candidate.
- Language direction: Arabic and Persian RTL; Chinese, German, Spanish, and
  Vietnamese LTR.
- Structured output: Product, Service, Article, FAQPage, AboutPage,
  ContactPage, or CollectionPage as appropriate, plus BreadcrumbList.
- Internal links point only to eligible pages in the same locale.
- Manifest-scoped local candidates retaining an English 301: 0/414.
- Unsupported non-manifest paths and bare locale roots retain the defensive
  legacy redirect/fail-closed behavior.

This is a local candidate state. The current production environment remains
English-only with zero publicly released non-English pages because there was
no commit, push, deployment, Nginx activation, or CMS import.

## Native review materials

The following review packs contain all 69 URLs for their locale:

- `docs/reviews/multilingual/ar-p0-native-review-20260728.md`
- `docs/reviews/multilingual/zh-p0-native-review-20260728.md`
- `docs/reviews/multilingual/de-full-native-review-20260728.md`
- `docs/reviews/multilingual/es-full-native-review-20260728.md`
- `docs/reviews/multilingual/vi-full-native-review-20260728.md`
- `docs/reviews/multilingual/fa-full-native-review-20260728.md`

`docs/reviews/multilingual/cms-import-readiness-20260728.md` lists all 252 CMS
payloads. Review fields remain pending and blank where human evidence is
required.

## Release gate

`npm run multilingual:release-check` returned the required nonzero exit:

- candidates: 414;
- production-ready: 0;
- CMS payloads: 252;
- structurally ready CMS payloads: 252;
- native-approved CMS payloads: 0;
- technical validation: passed;
- pending URLs reported: 414.

The AWS workflow runs this gate before build. Therefore the candidate changes
cannot enter production until real native reviewers approve the pages and the
release records are deliberately updated in a separately reviewed phase.

## Validation results

| Validation | Result |
|---|---|
| `npm run multilingual:audit` | Passed: 414 manifest records; 69 per locale; 414 static/sitemap/hreflang eligible; 414 pending; 0 production-ready |
| `npm run multilingual:release-check` | Expected controlled failure; listed all 414 pending URLs |
| `npm test` | 139/139 passed using the existing public read-only CMS endpoint; the first default run failed only because `127.0.0.1:8080` was unavailable |
| `npm run lint` | Passed with 0 errors and 2 pre-existing unused-variable warnings in GSC configuration |
| `npm run media:audit` | Passed with 0 errors and 1 existing media-completeness warning |
| `npm run build` | Passed; 528/528 static pages generated |
| `npm run multilingual:static-export-audit` / export audit | Passed: 414 localized pages; sitemap 490 |
| `git diff --check` | Passed; line-ending notices only |

## M4A file scope

New implementation files:

- `src/content/locales/m4a-locale-data.ts`
- `src/content/locales/m4a-file-pages.ts`
- `src/content/locales/cms-import/m4a-generated.ts`
- four new full-coverage native review packs
- this report

M4A updates:

- `src/content/locales/de/index.ts`
- `src/content/locales/es/index.ts`
- `src/content/locales/vi/index.ts`
- `src/content/locales/fa/index.ts`
- `src/content/locales/cms-import/index.ts`
- `src/content/locales/ui.ts`
- `src/content/locales/glossary.ts`
- `src/lib/multilingual-publication-manifest.ts`
- `src/lib/multilingual-audit.ts`
- `src/lib/multilingual-release.ts`
- `src/lib/localized-publication.ts`
- `src/components/content/localized-publication-page.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `scripts/clean-static-export.ts`
- `scripts/audit-multilingual-export.ts`
- `scripts/generate-multilingual-review-packs.ts`
- `package.json` (adds the requested
  `multilingual:static-export-audit` command)
- `deploy/nginx/dualcorelink.com.conf.template`
- `deploy/scripts/deploy-static.sh`
- `.github/workflows/aws-production-deploy.yml`
- `tests/multilingual-foundation.test.ts`
- `tests/seo-schema.test.ts`
- `tests/static-export.test.ts`
- Arabic/Chinese review packs and CMS readiness document regenerated against
  the six-language candidate set
- `docs/reports/latest-status.md`

Pre-existing unrelated GSC/API, dependency, historical report, Phase 3B, and
other dirty-worktree files were preserved and were not reverted or staged.

## Production decision

Production release is **not allowed**. Required next action is real
native-language review for all 414 pages, followed by documented corrections
and a separately approved release-readiness phase. No production CMS import,
commit, push, deployment, or GSC indexing request occurred.
