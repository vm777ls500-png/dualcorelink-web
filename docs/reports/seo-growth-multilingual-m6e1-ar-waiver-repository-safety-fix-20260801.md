# Multilingual Phase M6E-1 — Arabic Owner-Waiver Repository Safety Fix

Date: 2026-08-01
Final conclusion: **READY_FOR_HASH_APPROVAL**

## 1. Objective and safety boundary

M6E stopped before its final preflight and before any write because CMS Import
CLI `1.1.0` rendered five Arabic owner-waiver meta fields that the WordPress
repository did not permit. The old create path could insert a post and write
ACF and translation metadata before failing at the first waiver field.

M6E-1 fixes that mismatch locally and produces a new deterministic candidate.
This phase did not access a production server, update the production plugin,
run production preflight/apply/verify/publish/rollback, write CMS or database
data, deploy the frontend, push `main`, or submit a GSC request.

The established production baseline remains evidence from M6E: zero Arabic
Product/Solution records, seven published Chinese CMS records, zero Chinese
drafts, and sitemap 88. No production state was re-read or changed in M6E-1.

## 2. Shared write-capability design

`DualCoreLink_Import_Config` now owns the write capabilities used by the
renderer, preflight, and real WordPress repository:

- Arabic P0: exactly eight translation meta keys and five owner-waiver keys;
- Chinese P0: exactly the original eight translation meta keys;
- English sources and other locales/batches: no owner-waiver capability;
- ACF keys remain explicitly separated by product and solution content type;
- core fields, metadata, source identity, locale, batch, and payload hash are
  checked as one complete write plan.

The owner-waiver evidence remains exact: schema version `1`, status
`approved`, waiver by `Allan`, date `2026-07-31`, and the approved waiver
reason. Native review remains pending and is not represented as approved.

## 3. Pre-write safety gate

Preflight maps all six Arabic records and calls repository dry validation for
every write plan before creating a run directory or invoking any WordPress
write API. The real repository repeats the same validation immediately before
`wp_insert_post()` or an update operation.

Validation rejects:

- any unknown fourteenth metadata field;
- any missing required waiver field;
- waiver schema/status/reviewer/date/reason drift;
- owner-waiver fields on Chinese, English, or unsupported locales;
- invalid core or ACF shapes and values;
- source identity, locale, batch, or payload hash drift.

The repository does not silently discard unknown fields. If runtime writing
later raises an exception, processing stops and returns nonzero without
publishing or concealing the partial operation.

## 4. Files in the implementation commit

- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/dualcorelink-multilingual-import-cli.php`
- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/class-config.php`
- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/class-import-service.php`
- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/class-renderer.php`
- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/class-wordpress-repository.php`
- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/interface-repository.php`
- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/schema/payload.schema.json`
- `scripts/cms-import/deterministic-package.ts`
- `tests/cms-import-php/run.php`
- `tests/cms-import-safety.test.ts`

Implementation commit:
`8d9a4c65c9cf518d0bffe9dddb36cbedf29f5724`.

## 5. Plugin version and deterministic artifacts

Plugin version is `1.1.1`. Translation schema and owner-waiver schema remain
version `1`; the existing Chinese records require no migration.

| Artifact | SHA-256 |
|---|---|
| Plugin ZIP | `a42fc429c46ccb4848fbfb7cbec40938061086dedbb4a2f0d09016e0e05114e2` |
| Plugin manifest | `b080969df2ca6ab14d43b459d9d47de4aad61515d0177f26b8dc46f3c56de65a` |
| Arabic payload canonical | `82f8803975f5c6dcf135f45a3f11e15dbf911c39a9da0fae53b97f7ec45ffe0e` |
| Arabic payload JSON | `68ec8cde60ee376a0ec963c2cf4498dcafcb3be3488702c89dae91977320a5b5` |

Three plugin builds produced the same ZIP and manifest hashes. Three Arabic
payload generations produced the same canonical and JSON hashes. The ZIP has
exactly nine runtime files and no fixture, credential, log, or database file.

The existing approved-package record still targets `1.1.0`. It was not
modified, and `npm run cms-import:verify-approved-package` failed as designed
with `approved ZIP hash mismatch`.

## 6. Automated validation

| Check | Result |
|---|---|
| `npm ci` | Passed; existing seven high dependency findings recorded, not changed |
| `npm run cms-import:test` | Passed: Node 67/67, PHP 74/74 |
| `npm run cms-import:fixture-preflight` | Passed: Chinese 7 writes=0; Arabic 6 writes=0 |
| `npm run multilingual:audit` | Passed: manifest 414, 69 per locale |
| Arabic P0 gate with `--allow-owner-waiver` | Passed: pages 15/15, CMS payloads 6/6 |
| Arabic P0 gate without waiver | Controlled failure, exit 1 |
| Full-site release gate | Controlled failure, exit 1; 402 pending |
| `npm test` | Passed: 219/219 using local cached read-only fixture; no external request |
| `npm run lint` | Passed, 0 errors |
| `npm run media:audit` | Passed, 0 errors; one existing warning |
| `npm run build` | Passed: 163/163 generated |
| `npm run multilingual:static-export-audit` | Passed: 12 localized pages, sitemap 88 |
| `git diff --check` | Passed |

The temporary local HTTP fixture read only the repository's existing Next.js
fetch cache, was stopped after validation, and was deleted before staging.
No production endpoint was contacted.

## 7. Regression conclusions

- Arabic repository capability accepts all 13 exact metadata fields.
- Chinese remains restricted to eight translation metadata fields.
- Unsupported fields fail before `wp_insert_post()`; the test counter remains
  zero and no run/record is created.
- Dry repository validation has no write side effect.
- The Arabic fixture produces exactly six drafts, each with 8 translation and
  5 waiver meta fields; it does not produce a seventh record.
- Chinese numeric-meta normalization, idempotency, source-hash protection, and
  payload-hash protection remain intact.
- Ordinary web requests and ordinary builds do not register or invoke the CLI
  write path.
- Local release output remains Chinese-only: 12 localized pages, Arabic 0,
  sitemap 88.

## 8. Approval boundary

The implementation and candidate are ready for Allan to review and approve by
hash. `READY_FOR_HASH_APPROVAL` does not authorize installing plugin `1.1.1`,
running production preflight, applying Arabic drafts, verifying, publishing,
rolling back, or deploying the frontend. A separate explicit authorization is
required after the new hashes are approved.
