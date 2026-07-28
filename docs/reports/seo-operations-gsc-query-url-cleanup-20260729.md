# SEO Operations — GSC Query URL Cleanup

Date: 2026-07-29

Release branch: `release/gsc-query-url-cleanup-20260729`

Base: `origin/main` at `6a6514f77040d8aad54478c11adbf5a1af02054b`

## Scope

This isolated patch stops internal generation of avoidable query URLs without
publishing any unreviewed multilingual work.

- Contact form CTAs use `/<locale>/contact/#get-a-quote`.
- GA4 and form inquiry attribution remain available through validated,
  session-scoped state.
- Legacy Contact parameters are safely read, stored, and removed from the
  address bar with `history.replaceState`.
- Products category and series controls use buttons plus browser history state
  instead of crawlable query links.
- Legacy Products filter queries retain the selected filter and are cleaned to
  `#product-results`.

No page copy, metadata, schema, canonical, robots, sitemap, hreflang, redirect,
dependency, CMS, or native-review state is changed.

## GSC evidence classification

The current coverage aggregate contains 23 alternate-canonical URLs. The
available repository evidence identifies 3 Contact attribution examples, 1
English Products filter example, and 1 retired-locale Products filter example.
The other 18 URLs require a fresh URL-level GSC export and are not inferred.

## Files

Production:

- `src/lib/inquiry/attribution.ts`
- `src/components/contact/tracked-inquiry-link.tsx`
- `src/components/contact/get-quote-form.tsx`
- `src/components/content/product-filtered-list.tsx`
- `src/app/[locale]/products/page.tsx`

Audit and tests:

- `scripts/audit-query-url-export.ts`
- `tests/inquiry-attribution.test.ts`
- `tests/seo-schema.test.ts`
- `tests/seo-query-url-cleanup.test.ts`

Documentation:

- `docs/reports/seo-operations-gsc-query-url-cleanup-20260729.md`
- `docs/reports/latest-status.md`

## Attribution safety

Only `sourcePage`, `contentType`, `contentSlug`, `sourceTitle`, and
`ctaPosition` can be stored. Source routes, content types, slugs, CTA values,
and field lengths are validated. The record expires after two hours and uses
`sessionStorage`, so a new browsing session does not inherit the old source.
Customer form fields, credentials, tokens, and other personal data are not
written to the URL or storage.

The existing GA4 event continues to emit:

- `event=inquiry_cta_click`
- `source_type`
- `source_slug`
- `cta_location`
- `category`
- `page_path`

The existing submission and email-draft paths continue to receive the full
validated attribution object.

## English-only release gate

The clean release worktree was created directly from the latest
`origin/main`. It does not contain the uncommitted multilingual manifest,
localized content, CMS payloads, native-review files, or localized publication
adapters from the original dirty worktree.

- Static build: 156/156 pages.
- Sitemap: 76 English-only URLs.
- `/ar/`, `/zh/`, `/de/`, `/es/`, `/vi/`, and `/fa/` output directories:
  absent after `export:clean`.
- Package manifest and lockfile: unchanged.
- New dependencies: none.

## Validation

| Check | Result |
|---|---|
| `npm ci` | Passed; lockfile unchanged |
| `npm test` | Baseline has no `test` script; no package change was imported |
| `npm run test:data` | Passed; 121/121 |
| `npm run lint` | Passed; no errors |
| `npm run media:audit` | Passed; 0 errors, 1 existing warning |
| `npm run build` | Passed; 156/156 |
| `npx tsx scripts/audit-query-url-export.ts` | Passed; 79 HTML pages scanned |
| `git diff --check` | Passed |

Static-output query counts:

| Surface | Count |
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

Browser QA passed for homepage, Product, Solution, Resource, Header, Footer,
category filter, series filter, back/forward state, legacy Contact parameters,
legacy Products filters, same-session refresh, new-session isolation, and
375px responsive overflow. Tracked Product, Solution, Resource, Header, and
Footer CTAs displayed their expected source type and CTA position in the
Contact form. Products and Contact had zero horizontal overflow.

## Residual GSC behavior

This patch prevents new internal generation. Historical parameter URLs can
remain in GSC until Google recrawls the site and refreshes the coverage report.
No indexing request or new GSC validation is part of this release.
