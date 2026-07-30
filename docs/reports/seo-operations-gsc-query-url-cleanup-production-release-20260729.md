# SEO Operations — GSC Query URL Cleanup Production Release

Date: 2026-07-29

## Release

- Commit: `9130c58190a8ded92c06127f48fff682b831ded5`
- Commit message: `fix: clean inquiry and product filter urls`
- Push: successful, non-force update of `origin/main`
- GitHub Actions run: `30396659728`
- Job: `90401164627` (`Build and deploy AWS static export`)
- Workflow result: successful
- Production source SHA: `9130c58190a8ded92c06127f48fff682b831ded5`
- Release directory:
  `/srv/dualcorelink/frontend/releases/9130c58190a8-20260729-043302`
- Public CMS used by the build:
  `https://cms.dualcorelink.com/wp-json`

The workflow checked out the exact release SHA, ran the existing validation
steps, built 156/156 static pages, activated the unchanged Nginx configuration,
and passed its production health checks.

## Released files

Production:

- `src/app/[locale]/products/page.tsx`
- `src/components/contact/get-quote-form.tsx`
- `src/components/contact/tracked-inquiry-link.tsx`
- `src/components/content/product-filtered-list.tsx`
- `src/lib/inquiry/attribution.ts`

Audit and tests:

- `scripts/audit-query-url-export.ts`
- `tests/inquiry-attribution.test.ts`
- `tests/seo-query-url-cleanup.test.ts`
- `tests/seo-schema.test.ts`

Documentation included in the release commit:

- `docs/reports/seo-operations-gsc-query-url-cleanup-20260729.md`
- `docs/reports/latest-status.md`

No localized content, multilingual publication state, native-review material,
CMS multilingual payload, dependency file, GSC API file, sitemap generator,
canonical generator, hreflang generator, robots file, or English page copy was
included.

## Static and production URL verification

The release-candidate audit and a separate production crawl both reported:

| Surface | Candidate | Production |
|---|---:|---:|
| `source_page` query href | 0 | 0 |
| `content_type` query href | 0 | 0 |
| `content_slug` query href | 0 | 0 |
| `cta_position` query href | 0 | 0 |
| `category` query href | 0 | 0 |
| `series` query href | 0 | 0 |
| Any internal query href | 0 | 0 |
| Sitemap query URL | 0 | 0 |
| Canonical query URL | 0 | 0 |
| Hreflang query URL | 0 | 0 |

Production sitemap verification:

- Sitemap URLs: 76
- URLs checked: 76
- HTTP failures: 0
- Non-English public page count: 0
- `/ar/`, `/zh/`, `/de/`, `/es/`, `/vi/`, and `/fa/` continue to return
  HTTP 301 to the English site.

The following production pages returned HTTP 200, one H1, and the expected
self-referencing canonical:

- `https://dualcorelink.com/en/contact/`
- `https://dualcorelink.com/en/products/`
- `https://dualcorelink.com/en/products/hotel-smart-room-rcu-host-1/`
- `https://dualcorelink.com/en/solutions/rcu-room-control-solution/`
- `https://dualcorelink.com/en/resources/what-is-hotel-rcu-room-control-system/`

## Browser QA

Production browser checks confirmed:

- Product `Request Project Review` opened the clean
  `/en/contact/#get-a-quote` URL and displayed
  `Source: product / product buying guide`.
- Solution `Discuss This Project` opened the clean Contact URL and displayed
  `Source: solution / solution hero`.
- Resource `Discuss Your Project` opened the clean Contact URL and displayed
  `Source: resource / resource mid article`.
- Refreshing Contact retained the validated Product attribution in the same
  session.
- A legacy Contact query was accepted through the attribution whitelist,
  displayed `Source: product / product hero`, and was removed from the address
  bar without a redirect loop.
- A category filter produced only `#product-results`; browser back removed the
  filter state and forward restored it.
- A legacy `?series=borui-series` URL retained the Borui filter and was cleaned
  to `#product-results`.
- Candidate QA additionally covered homepage, Header, Footer, series filters,
  new-session isolation, and 375px Products/Contact layouts with zero
  horizontal overflow.

The production form displayed the correct validated attribution for Product,
Solution, Resource, and legacy-query flows. Automated tests verified that the
same validated fields reach the form submission/email-draft paths and that the
existing `inquiry_cta_click` data-layer event retains `source_type`,
`source_slug`, `cta_location`, `category`, and `page_path`. No customer or
sensitive data is stored in the URL or session state.

## Validation

| Check | Result |
|---|---|
| `npm ci` | Passed; package and lockfile unchanged |
| `npm test` | Not available on the clean baseline; no unrelated script was added |
| `npm run test:data` | Passed, 121/121 |
| `npm run lint` | Passed; no errors |
| `npm run media:audit` | Passed; 0 errors, 1 existing warning |
| `npm run build` | Passed; 156/156 |
| Query export audit | Passed; 79 HTML pages, all query counts zero |
| `git diff --check` | Passed |
| GitHub Actions | Passed; run `30396659728` |
| Production sitemap crawl | Passed; 76/76 HTTP 200 |

`npm ci` and the deployment reported seven existing high-severity dependency
audit findings. Dependency remediation was outside this release and no
dependency file changed.

## Worktree protection

The original worktree began with:

- HEAD: `6a6514f77040d8aad54478c11adbf5a1af02054b`
- `git status --short` entries: 83
- Status snapshot SHA-256:
  `f216fa3d6f132244cad3f0dfa815ab2113b285ce87b5328711f4729298b3f3b6`

It was not reset, checked out, cleaned, stashed, committed, deleted, copied
over, or otherwise edited by this release. Its local HEAD and status snapshot
remained unchanged through the pre-push checks. The shared `origin/main`
tracking ref advanced only because the isolated release worktree successfully
pushed the approved commit.

The isolated release worktree was created from the then-current
`origin/main`, committed and pushed the exact cleanup scope, and was clean
immediately after the release commit. This production report and the final
status handoff are intentionally left as local documentation changes so that a
second commit and deployment are not introduced into the verified release.

## GSC handling

No GSC validation was started, restarted, removed, or submitted. No indexing
request was sent. Historical parameter URLs can remain in Search Console until
Google recrawls the clean links and refreshes the coverage report.
