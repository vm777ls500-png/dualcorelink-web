# DualCoreLink SEO Growth — Multilingual Phase M5E-5

## Production Chinese P0 Draft Apply and Verification

Date: 2026-07-29

Status: **BLOCKED — draft apply completed, formal verify failed closed**

## 1. Authorization and Scope

Allan authorized one draft-only apply and one immediate read-only verify on
2026-07-29 for exactly seven Chinese P0 CMS records:

`48`, `47`, `6`, `222`, `142`, `140`, `138`.

The authorization did not include publish, rollback, a second apply, a second
verify, manual database repair, frontend deployment, English-source edits, any
of the other 402 localized pages, a Git commit or push, or a GSC request.

## 2. Revalidated Production Gate

Before the write, the production gate was rechecked:

- importer plugin `1.0.0` was active;
- the private run root was `www-data:www-data` mode `0750`;
- the M5E-4 database backup existed, passed gzip integrity, and retained
  SHA-256
  `aaedce641ae4477f7cfa29b286ffd44839b5d7929fe3f70eb7aa153665e02c6b`;
- the approved ZIP and manifest hashes remained
  `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0`
  and
  `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e`;
- the private payload retained canonical SHA-256
  `592038dec549e494252bc1d3c5db6a98868386670588100d6630701ddb6b45ff`
  and importer payload SHA-256
  `7c453b4ad305771643a99a85ade456f44973bb226c43f032b1115ec81b37dee7`;
- all seven English sources were `publish` / `en`;
- no Chinese target record, translation metadata, extra target-slug occupant,
  or prior run directory existed.

The final preflight passed with seven records and zero writes.

## 3. Run Identity and Evidence

Run ID:

`m5e5-zh-p0-20260729T145320Z`

Run directory:

`/var/lib/dualcorelink/cms-import-runs/m5e5-zh-p0-20260729T145320Z`

The run ID was unique, used once, and stored privately before apply. The
preserved run directory contains `preflight.json`, `request.json`,
`pre-image.json`, `operations.json`, and `checksums.json`.

No `verify.json` exists because formal verification failed before a passed
verification artifact could be written.

Independent before/after evidence is retained under:

`/var/backups/dualcorelink-cms/m5e5-zh-p0-20260729T145320Z`

That root contains the pre-write baseline, seven English source and ACF
exports, post-write snapshots, exact comparisons, health checks, run-file
inventory, and SHA-256 evidence.

## 4. Draft Apply Result

The authorized apply command ran exactly once as `www-data`, used
`--status=draft`, used matching run and confirmation IDs, and did not use
`--allow-update`.

Apply result: **completed**, seven operations, all action `created`.

| Source ID | Localized ID | Type | Slug | Result |
|---:|---:|---|---|---|
| 48 | 240 | Product | `hotel-smart-room-rcu-host-1` | created as draft |
| 47 | 241 | Product | `rcu-controller-cabinet` | created as draft |
| 6 | 242 | Product | `86-type-ai-smart-control-display` | created as draft |
| 222 | 243 | Product | `smart-four-key-scene-control-panel` | created as draft |
| 142 | 244 | Solution | `oem-odm-custom-panel-solution` | created as draft |
| 140 | 245 | Solution | `rcu-room-control-solution` | created as draft |
| 138 | 246 | Solution | `smart-hotel-automation-solution` | created as draft |

No eighth record was created. Chinese CMS state after apply was seven drafts
and zero published records.

## 5. Formal Verify Failure

The authorized read-only verify command ran exactly once immediately after
apply. It returned nonzero:

`Verify failed: Localized field drift: 240`

The verifier stopped on the first localized record, so it did not produce a
formal 7/7 pass. In accordance with the stop rule, no retry, publish, rollback,
manual database change, second apply, or manual status change followed.

Read-only diagnostics found the same two comparison keys on all seven records:

- `meta._dualcorelink_translation_schema_version`
- `meta._dualcorelink_translation_source_id`

The stored values are correct, but WordPress postmeta reads them as strings
while the approved mapped payload represents them as integers. The verifier's
canonical comparison preserves scalar types, so `"1"` versus `1` and a string
source ID versus an integer source ID are reported as drift. No content, slug,
status, locale, reviewer, review date, ACF, or payload-value discrepancy was
identified by the diagnostic.

This diagnosis does not override the command result. Formal verification is
failed and the phase remains blocked.

## 6. Independent Post-Apply Safety Audit

| Check | Before | After | Result |
|---|---:|---:|---|
| WordPress posts | 194 | 201 | expected `+7` |
| WordPress postmeta rows | 2422 | 2558 | expected `+136` |
| Chinese drafts | 0 | 7 | expected |
| Chinese published records | 0 | 0 | passed |
| Other localized CMS records | 0 | 0 | passed |
| Existing active plugins | 3 | 3 | unchanged |

The `+136` postmeta rows are attributable to the seven records' ACF storage
and the eight translation metadata keys. Each translation key has exactly
seven rows, and the distinct post IDs are exactly `240` through `246`:

- `_dualcorelink_translation_schema_version`: 7
- `_dualcorelink_translation_locale`: 7
- `_dualcorelink_translation_source_id`: 7
- `_dualcorelink_translation_group`: 7
- `_dualcorelink_translation_batch`: 7
- `_dualcorelink_translation_payload_hash`: 7
- `_dualcorelink_translation_reviewer`: 7
- `_dualcorelink_translation_review_date`: 7

The four Product records each expose seven mapped ACF fields. The three
Solution records each expose four mapped ACF fields. All seven records retain
the approved slug, type, locale `zh`, reviewer `Allan`, review date
`2026-07-29`, nonempty core content, and draft status.

## 7. English and Existing-Record Integrity

All seven English sources were exported again and compared with the pre-write
baseline using normalized full-post JSON and normalized full ACF JSON:

- post export: 7/7 identical;
- ACF export: 7/7 identical;
- `post_modified` / `post_modified_gmt`: 7/7 unchanged.

The source IDs were `48`, `47`, `6`, `222`, `142`, `140`, and `138`.

The original 42 Product/Solution records had zero records modified at or after
the draft-apply timestamp. The importer operation log contains only the seven
authorized creates. No English title, content, slug, status, source ACF, or
source modification timestamp changed.

## 8. Production Health and Public SEO Boundary

| Check | Result |
|---|---|
| Nginx | active |
| PHP-FPM | active |
| MariaDB | active |
| CMS REST root | HTTP 200 |
| Public homepage | HTTP 200 |
| Public Products page | HTTP 200 |
| Production sitemap URLs | 76 |
| Sitemap query URLs | 0 |
| Canonical query URLs in samples | 0 |
| Hreflang query URLs in samples | 0 |
| Public non-English pages from approved batch | 0 |
| `/zh/about/` | HTTP 301 to `/en/about/` |
| Twelve approved Chinese frontend URLs | 12/12 still HTTP 301 to English |
| Contact tracking query hrefs | 0 |
| Product filter query hrefs | 0 |
| Public importer REST routes | 0 |
| PHP-FPM fatal errors since apply | 0 |
| Root filesystem | 58% used |

The frontend production release, Nginx, sitemap generation, canonical,
hreflang, schema, robots, English content, and native-review state were not
modified. Production remains English-only.

## 9. Unauthorized-Change Assessment

No unauthorized content, publication, frontend, configuration, Git, GSC, or
deployment change was found. The only CMS mutations were the seven authorized
draft records, their mapped ACF/postmeta, their eight translation metadata
values, and the private run evidence.

Two failed local read-only diagnostic scripts produced CLI errors while
building the independent audit; they made no CMS content change and did not
produce PHP-FPM fatal events. Their temporary files were removed.

## 10. Decision and Next Gate

Final decision: **BLOCKED**.

M5E-6 Draft Content Review is not allowed to begin because the formal verify
command did not return exit code 0. The seven drafts and all run evidence must
remain untouched until Allan separately approves a verifier normalization fix
and a controlled verification recovery procedure.

Publish remains unauthorized and was not executed. Rollback was not executed.
No frontend deployment, Git commit, push, merge, production CMS publish, or
GSC request occurred.
