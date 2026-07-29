# DualCoreLink SEO Growth — Multilingual Phase M5E-5A

## Numeric Translation Meta Verification Fix

Date: 2026-07-30

Status: **READY_FOR_HASH_APPROVAL**

## 1. Scope and Production Boundary

This phase changed only the local WP-CLI verifier, deterministic package
version metadata, and automated tests. It did not access the production
server or production WordPress instance. It did not run production
`preflight`, `apply`, `verify`, `publish`, or `rollback`.

The seven existing Chinese drafts from run
`m5e5-zh-p0-20260729T145320Z`, CMS IDs `240`–`246`, were not accessed or
modified. The seven English source records were not accessed or modified.
No frontend deployment, `main` push, CMS write, GSC request, native-review
change, or M5D worktree operation occurred.

## 2. Original Verification Failure

The M5E-5 production verify failed closed because WordPress returns postmeta
scalars as strings while the approved payload represents these two declared
integer fields as integers:

- `_dualcorelink_translation_schema_version`
- `_dualcorelink_translation_source_id`

The stored values were semantically correct, but the prior canonical
comparison treated `"1"` and `1`, and a string source ID and its integer
payload value, as different types. No other field was identified as drift in
the preserved M5E-5 read-only diagnosis.

## 3. Deterministic Normalization Rule

Normalization is restricted to the two integer translation-meta keys above.
It is not a general loose comparison.

- The payload value must already be a PHP integer.
- A WordPress value may be a non-negative PHP integer or a canonical decimal
  string.
- Accepted decimal strings are exactly `0` or a positive integer without
  leading zeros.
- Empty strings, leading zeros, signs, decimals, exponent notation,
  surrounding whitespace, booleans, `null`, arrays, and objects fail closed.
- Conversion must round-trip to the identical canonical decimal string,
  preventing overflow or alternate representations.
- Translation schema version must equal integer `1`.
- Translation source ID must be positive and present in the fixed approved
  source whitelist.
- A normalization failure raises a clear verifier error and produces a
  nonzero result.

All other core fields, ACF fields, and translation metadata retain the
existing strict canonical type-and-value comparison. PHP loose equality
(`==`) is not used.

## 4. Version and Implementation

- Plugin version: `1.0.1`
- Translation schema version: `1` (unchanged)
- Implementation commit:
  `3ba48384387deb495a42516a303ecbec24bec175`

Implementation files:

- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/dualcorelink-multilingual-import-cli.php`
- `infra/wordpress/plugins/dualcorelink-multilingual-import-cli/includes/class-import-service.php`
- `scripts/cms-import/deterministic-package.ts`
- `tests/cms-import-php/run.php`

## 5. Focused Verification Tests

The CMS import safety suites passed **93/93** checks:

- TypeScript package/import tests: **39/39**
- PHP importer/verifier tests: **54/54**

The added PHP coverage verifies:

1. WordPress `"1"` equals payload integer `1`.
2. WordPress `"48"` equals payload integer `48`.
3. `"01"` is rejected.
4. `"+1"` is rejected.
5. `"-1"` is rejected.
6. `"1.0"` is rejected.
7. `"1e2"` is rejected.
8. `" 1 "` is rejected.
9. An empty string is rejected.
10. `null`, booleans, arrays, and objects are rejected.
11. A schema version other than `1` is rejected.
12. A source ID outside the approved whitelist is rejected.
13. Type drift in another string meta field remains a failure.
14. ACF array structure drift remains a failure.
15. All seven fixture records verify when WordPress-style numeric meta strings
    are returned.
16. English source-hash drift remains a failure.
17. Payload-hash drift remains a failure.
18. Verification normalization produces no repository/database write.

Preflight also rejects a string payload source ID rather than silently
coercing it.

## 6. Full Local Regression

All commands were local. Tests requiring content data used the public,
read-only endpoint `https://cms.dualcorelink.com/wp-json`.

| Validation | Result |
|---|---|
| `npm ci` | passed; 352 packages installed |
| `npm run cms-import:test` | passed, 93/93 |
| `npm run cms-import:fixture-preflight` | passed, 7 records, 0 writes |
| `npm run multilingual:audit` | passed, manifest 414 |
| Chinese P0 batch release check | passed, pages 12/12 and CMS payload 7/7 |
| Full multilingual release check | expected nonzero; 402 pending pages blocked |
| `npm test` | passed, 184/184 with public read-only CMS |
| `npm run lint` | passed, 0 errors |
| `npm run media:audit` | passed, 0 errors and 1 existing warning |
| `npm run build` | passed, 163/163 static-generation routes |
| Build multilingual export audit | passed, 12 localized pages and sitemap 88 |
| `npm run multilingual:static-export-audit` | passed |
| `git diff --check` | passed |

An initial `npm test` invocation inherited the local default
`127.0.0.1:8080` WordPress endpoint and reported five connection failures.
The unchanged suite passed 184/184 after explicitly setting the required
public read-only endpoint. This was an environment correction, not a code
change.

The local audit retained approved `12`, pending `402`, and
`productionReleaseReady` `12`. No CMS write command was invoked.

## 7. New Deterministic Candidate Package

Three clean package builds were byte-identical:

- ZIP SHA-256:
  `c419df6e422a72cfdee40b932520fab717ccde01b80529aeeeaabf6e58024f44`
- Manifest SHA-256:
  `0fe777ecd1bf401f5f443e47a1ed52e13e61d9b901095e1300a988ac7df7e0c9`
- Runtime files: exactly `9`
- Plugin version: `1.0.1`
- Forbidden fixture, credential, log, and database files: `0`

The packaging command did not update the approval record.

## 8. Existing Approval Evidence

The existing Allan-approved version `1.0.0` package remains immutable
historical evidence:

- Approved ZIP:
  `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0`
- Approved manifest:
  `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e`

`npm run cms-import:verify-approved-package` rejected the new candidate with
nonzero status and `approved ZIP hash mismatch`, as required. The approval
record was not changed.

## 9. Decision and Next Gate

Final decision: **READY_FOR_HASH_APPROVAL**.

Allan must separately approve both new candidate hashes before any production
plugin update or production verification recovery can be considered. This
status does not authorize installing the package, accessing production,
running production `verify`, performing any CMS write, resuming M5D, or
deploying the frontend.
