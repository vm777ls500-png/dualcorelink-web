# SEO Growth Multilingual Foundation M1

Date: 2026-07-28
Status: implemented locally; not committed, pushed, or deployed

## Objective

Create a single multilingual fact and publication-control foundation for the
69-page English master list across Arabic, Chinese, German, Spanish,
Vietnamese, and Persian. The phase must not publish translations or change
English content, URLs, sitemap output, hreflang output, or legacy redirects.

## Data baseline

| Item | Count |
|---|---:|
| English source pages | 69 |
| Target locales | 6 |
| Publication manifest records | 414 |
| Arabic records | 69 |
| Chinese records | 69 |
| German records | 69 |
| Spanish records | 69 |
| Vietnamese records | 69 |
| Persian records | 69 |
| Publish-ready records | 0 |
| Static-export-eligible records | 0 |
| Sitemap-eligible records | 0 |
| Hreflang-eligible records | 0 |

Every record starts with `translationStatus=missing`,
`seoMetadataStatus=missing`, `contentReviewStatus=missing`, and
`publishReady=false`.

## Implementation

### Publication manifest

`src/lib/multilingual-publication-manifest.ts` defines:

- the six target locales;
- the 69-page English source master;
- 414 generated page-level records;
- page types, priority, source URL, localized URL, review states, and notes;
- the exact four-condition approval gate.

### Independent locale content

`src/content/locales/` contains typed registries for `ar`, `zh`, `de`, `es`,
`vi`, and `fa`. Resources, Regions, listings, and static pages can be added
without copying English body content. All registries are intentionally empty:
they are control sources, not empty pages, and produce no routes.

### CMS translation contract

`src/lib/multilingual-cms.ts` defines and validates the Product and Solution
translation contract:

- translated title and description;
- translated specifications;
- translated SEO title and meta description;
- translated structured content;
- English source ID and slug;
- localized CMS ID;
- locale, translation status, and review status.

The CMS registry contains no fabricated translation data.

### Publication control

`src/lib/multilingual-publication-control.ts` requires both the manifest gate
and complete matching evidence. File-backed pages require complete metadata,
content, approval, and a localized hash different from the English source.
Products and Solutions require a complete CMS translation association.

Static export, sitemap, and hreflang eligibility are derived from the same
function. Their current eligible counts are zero.

### Automated audit

`npm run multilingual:audit` checks:

- 69 English sources × 6 locales;
- 69 records per locale;
- duplicate locale/slug and localized URL;
- English source URL validity;
- localized URL validity;
- approval-gate consistency;
- complete publish-ready content evidence;
- English/localized content-hash duplication;
- CMS translation completeness and relationships;
- static export, sitemap, and hreflang eligibility;
- locale visibility without eligible pages;
- preservation of the existing English legacy redirect policy.

Audit errors set a nonzero process exit code.

## Tests

`tests/multilingual-foundation.test.ts` covers:

- all six configured locales;
- the 414-record baseline;
- missing and draft publication blocking;
- complete approved file-content eligibility;
- English-content duplicate blocking;
- CMS translation association requirements;
- unique localized URLs;
- RTL limited to Arabic and Persian;
- continued English redirect behavior for unpublished locale paths.

## Protected behavior

No English page body or URL was changed. No translated page, empty route, or
placeholder body was created. Existing locale visibility, static-export
cleanup, sitemap generation, hreflang filtering, Nginx redirects, canonical
logic, robots, Schema, and production deployment remain unchanged.

The current build therefore continues to remove all retired locale artifacts
and publish English only.

## Files

Created:

- `src/lib/multilingual-publication-manifest.ts`
- `src/lib/multilingual-publication-control.ts`
- `src/lib/multilingual-cms.ts`
- `src/lib/multilingual-audit.ts`
- `src/content/locales/types.ts`
- `src/content/locales/index.ts`
- `src/content/locales/ar/index.ts`
- `src/content/locales/zh/index.ts`
- `src/content/locales/de/index.ts`
- `src/content/locales/es/index.ts`
- `src/content/locales/vi/index.ts`
- `src/content/locales/fa/index.ts`
- `scripts/audit-multilingual-publication.ts`
- `tests/multilingual-foundation.test.ts`
- `docs/runbooks/multilingual-content-publishing.md`
- `docs/reports/seo-growth-multilingual-foundation-m1-20260728.md`

Updated:

- `package.json`
- `docs/reports/latest-status.md`

The pre-existing changes in `package.json`, `package-lock.json`, GSC/API files,
and earlier reports were preserved. M1 adds only the `test` and
`multilingual:audit` script entries to `package.json`; it does not alter the
pre-existing GSC dependency or script.

## Validation

| Check | Result |
|---|---|
| `npm run multilingual:audit` | Passed; 414 records, 69 per locale, 0 eligible public records |
| M1 focused tests | Passed, 8/8 |
| first unconfigured `npm test` attempt | 124/129; five existing CMS-backed tests could not reach `127.0.0.1:8080` |
| `npm test` with approved public CMS root | Passed, 129/129 |
| `npm run lint` | Passed with 0 errors and 2 pre-existing GSC warnings |
| `npm run build` with approved public CMS root | Passed; 156/156 static pages |
| post-clean locale artifact check | Passed; 0 `ar`, `zh`, `de`, `es`, `vi`, or `fa` output directories |
| sitemap regression | Passed; 76 URLs |
| `git diff --check` | Passed |

## Risks and controls

- The manifest is generated from a checked-in English master. Future English
  page additions require an explicit manifest update and audit.
- A hybrid CMS/file model can drift. Stable source IDs, source hashes, and
  review status are mandatory controls.
- Whole-locale activation remains unsafe. Page-level eligibility and a
  coherent reviewed launch batch are required before changing visibility,
  sitemap, hreflang, or redirects.
- The installed Next.js package does not contain the repository-instructed
  `node_modules/next/dist/docs/` directory. The compatible Next.js 15 App
  Router internationalization and static-export guides were reviewed from the
  official Next.js documentation before implementation.

## Release decision

M1 is ready for human review after final validation. It does not authorize
translation creation, locale activation, commit, push, deployment, sitemap or
hreflang changes, redirect removal, or indexing requests.
