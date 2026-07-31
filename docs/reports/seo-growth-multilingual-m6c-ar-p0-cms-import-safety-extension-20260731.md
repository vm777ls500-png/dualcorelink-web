# Multilingual Phase M6C — Arabic P0 Owner-Waiver CMS Import Safety Extension

Date: 2026-07-31
Conclusion: **READY_FOR_HASH_APPROVAL**

## Scope and isolation

- Worktree:
  `C:\Users\empir\Documents\dualcorelink-ar-cms-import-safety`
- Branch: `feature/ar-p0-cms-import-safety-20260731`
- CMS safety parent:
  `1d39ac4fff4f6b0d80f19ed0ae587217f0327975`
- Arabic review parent:
  `f4c5b0dd1cab5c4c9ac3b7018b5546fe8b5f09ee`
- Semantic merge implementation:
  `fb3fb2b4b480416351e469de8cca670a96d05966`

No source worktree was reset, checked out, cleaned, stashed, or reformatted.
The frozen M5D worktree remained at 100 staged files with its original
`MERGE_HEAD`.

## Exact Arabic CMS batch

| Type | Source ID | Slug |
|---|---:|---|
| Product | 48 | `hotel-smart-room-rcu-host-1` |
| Product | 47 | `rcu-controller-cabinet` |
| Product | 6 | `86-type-ai-smart-control-display` |
| Solution | 140 | `rcu-room-control-solution` |
| Solution | 138 | `smart-hotel-automation-solution` |
| Solution | 137 | `hotel-guest-room-control-solution` |

The payload contains exactly six Arabic P0 records. It rejects missing,
additional, duplicate, unknown, wrong-locale, wrong-batch, P1/P2, or
identity-mismatched records.

## Review and waiver evidence

All six CMS records preserve:

- `nativeReviewStatus = pending`
- `nativeReviewer = null`
- `nativeReviewDate = null`
- `productionReleaseReady = true` only under the explicit owner-waiver gate

The separately modelled owner evidence is:

- status: `approved`
- by: `Allan`
- date: `2026-07-31`
- reason:
  `Business owner explicitly waived Arabic native-language review and accepted localization risk.`
- exact Arabic P0 scope: 15 URLs
- scope SHA-256:
  `92eae81730ac445455385ff5f3811394dbb866d6f333dc6a290f5df60e4dc193`

WARNING: Arabic P0 was released under owner review waiver and was not approved
by an independent native Arabic reviewer.

The selected RCU Host expression is `وحدة RCU رئيسية للتحكم`; its first use
is `وحدة RCU رئيسية للتحكم (RCU Host)`.

## CMS meta contract

The existing eight translation meta fields retain their meanings. Arabic P0
adds exactly these five evidence fields:

- `_dualcorelink_owner_review_waiver_schema_version = 1`
- `_dualcorelink_owner_review_waiver_status = approved`
- `_dualcorelink_owner_review_waiver_by = Allan`
- `_dualcorelink_owner_review_waiver_date = 2026-07-31`
- `_dualcorelink_owner_review_waiver_reason` equals the exact approved reason

They are never emitted for Chinese or English records. Verification re-reads
all mapped core fields, ACF fields, eight translation fields, five waiver
fields, payload hash, and English source hashes.

## CLI and backward compatibility

Plugin candidate version: `1.1.0`
Translation relation schema version: `1`

- `preflight`, `apply`, and `publish` require
  `--allow-owner-waiver` for `ar:p0`.
- `verify` obtains the waiver state from immutable run evidence.
- `rollback` does not accept or require the waiver flag.
- Chinese `zh:p0` remains exactly seven native-approved records and rejects
  owner waiver.
- Existing Chinese numeric meta normalization and run-log compatibility
  remain covered by tests.
- The plugin still registers import commands only under `WP_CLI`.
- No public REST write endpoint or admin write surface was added.

## Deterministic Arabic payload

Command:

```text
npm run cms-import:payload -- --locale=ar --batch=p0
```

Three consecutive generations produced identical bytes:

- records: 6
- canonical SHA-256:
  `82f8803975f5c6dcf135f45a3f11e15dbf911c39a9da0fae53b97f7ec45ffe0e`
- JSON file SHA-256:
  `68ec8cde60ee376a0ec963c2cf4498dcafcb3be3488702c89dae91977320a5b5`
- JSON bytes: 35,791

The output contains no timestamp, absolute path, hostname, credential, log, or
database material.

## Deterministic plugin package

Three clean builds were identical:

- ZIP SHA-256:
  `d7bd1299f9fb2638cc9cd503e5c1e26fd67e8f514f7bfc8076b5bd228e5a5f93`
- manifest SHA-256:
  `c77d159a0d7ee604ff635cb6e1d5a3b242e23ef5b98c88b3fe4954c693422675`
- runtime files: exactly 9
- forbidden files: 0

The existing `1.0.1` approval record was not changed.
`cms-import:verify-approved-package` failed with `approved ZIP hash mismatch`,
which is the required result until Allan separately approves the `1.1.0`
hashes.

## Validation

| Check | Result |
|---|---|
| `npm ci` | Passed; existing audit baseline reports 7 high findings |
| `npm run cms-import:test` | Passed: TypeScript 65/65; PHP 64/64 |
| `npm run cms-import:fixture-preflight` | Passed: zh 7/7; ar 6/6; writes 0 |
| `npm run multilingual:audit` | Passed: manifest 414 |
| Arabic owner-waiver release check | Passed: pages 15/15; CMS 6/6 |
| Arabic release check without waiver | Controlled failure |
| Full-site release check | Controlled failure; 402 pending |
| `npm test` with public read-only CMS | Passed: 217/217 |
| `npm run lint` | Passed: 0 errors, 0 warnings |
| `npm run media:audit` | Passed: 0 errors; 1 existing warning |
| `npm run build` | Passed: 163/163 |
| Static export audit | Passed: 12 Chinese pages; sitemap 88 |
| Arabic production output | 0 |
| `git diff --check` | Passed |

## Production boundary

This phase did not access the production server and performed no production
CMS preflight, apply, verify, publish, rollback, plugin install/update, CMS
write, frontend deployment, `main` push, GSC request, or change to Chinese
production IDs `240–246`.

The candidate is ready only for Allan's separate hash approval. It is not
authorized for production installation or any CMS/frontend operation.
