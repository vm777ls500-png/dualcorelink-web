# DualCoreLink SEO Growth — Multilingual Phase M5E-4

## Controlled Plugin Installation and Production Read-Only Preflight

Date: 2026-07-29

Status: **PASS — installation and read-only preflight completed; no CMS content write**

## 1. Scope and Safety Boundary

This phase installed and activated the approved WP-CLI-only import safety
plugin and ran its `preflight` command against exactly seven approved Chinese
P0 Product/Solution payload records.

The following commands and actions were not run:

- `apply`
- `verify`
- `publish`
- `rollback`
- WordPress post, postmeta, ACF, taxonomy, user, option, or database-content
  modification outside the expected plugin activation entry
- production CMS import
- frontend deployment
- Git commit or push
- `main` modification
- GSC request

The 12 approved Chinese static-page candidates and the other 402 pending
localized candidates were not deployed or exposed by this operation.

## 2. Approved Package Evidence

| Evidence | Verified value |
|---|---|
| Feature branch | `feature/multilingual-cms-import-safety-20260729` |
| Feature HEAD | `7640225bfad3dfbb5a47c0c403813645bd681dbf` |
| Bound implementation commit | `027dfcc4c113c6b2c1463177fef541881a7c04f4` |
| Approved by | Allan |
| Approval date | 2026-07-29 |
| ZIP SHA-256 | `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0` |
| Manifest logical SHA-256 | `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e` |
| Package files | 9 |
| Payload records | 7 |
| Source IDs | `48`, `47`, `6`, `222`, `142`, `140`, `138` |

Local verification passed before production access:

- `npm run cms-import:reproducibility`
- `npm run cms-import:package`
- `npm run cms-import:verify-package`
- `npm run cms-import:verify-approved-package`
- deterministic fixture generation
- `npm run cms-import:fixture-preflight`

The payload fixture preflight returned seven records and zero writes. Its
canonical fixture SHA-256 was
`592038dec549e494252bc1d3c5db6a98868386670588100d6630701ddb6b45ff`.
The generated JSON file SHA-256 was
`86c7fbbbb05972dff566a40c5684e29d77ec29ee89da455781057c0f90e752d2`.

Because the browser terminal rejects a single oversized clipboard transfer,
the production host fetched the already-pushed feature branch at the exact
verified HEAD and regenerated the deterministic package in a private
temporary directory. Server-side packaging and verification reproduced the
approved ZIP hash exactly. The temporary source/build directory was removed
after installation.

## 3. Production Baseline

| Check | Result |
|---|---|
| Host | `dualcorelink-production` |
| WordPress current target | `/srv/dualcorelink/wordpress/releases/20260715-b3` |
| WordPress version | 7.0.1 |
| Nginx | active |
| MariaDB | active |
| PHP-FPM | active |
| CMS REST root | HTTP 200 |
| Public site root | HTTP 200 |
| Existing active plugins before install | 2 |
| Candidate plugin before install | absent |
| Candidate run directory before phase | absent |
| Database size | 3,817,472 bytes |
| Frontend release | `/srv/dualcorelink/frontend/releases/9130c58190a8-20260729-043302` |
| Public non-English pages | 0 |

## 4. Verified Backups

Backup root:

`/var/backups/dualcorelink-cms/m5e4-20260729T140028Z`

The directory is `root:root` mode `0700`; contained files are `root:root` mode
`0600`. The backup contains:

- compressed WordPress database export
- active-plugin and complete plugin-state snapshots
- current WordPress release target
- `smart-home-b2b-content-architecture` plugin archive
- WordPress post export for all seven English sources
- ACF export for all seven English sources
- `SHA256SUMS`

The database gzip integrity check and the complete backup SHA-256 verification
both passed. The backup size reported by the host was 264 KiB.

Backup artifact hashes:

| Artifact | SHA-256 |
|---|---|
| `database.sql.gz` | `aaedce641ae4477f7cfa29b286ffd44839b5d7929fe3f70eb7aa153665e02c6b` |
| `smart-home-b2b-content-architecture.tar.gz` | `e59c55c8b80648ea48560963228abc1eb6f35e08dcae6375c50cb1fb1880b4dc` |

## 5. Private Staging and Run Directories

| Path | Owner/group | Mode | Purpose |
|---|---|---:|---|
| `/var/lib/dualcorelink/cms-import-staging/m5e4-20260729T140028Z` | `root:www-data` | `0750` | approved package, payload, and preflight evidence |
| `/var/lib/dualcorelink/cms-import-runs` | `www-data:www-data` | `0750` | future atomic run/lock evidence |

Staged file controls:

- ZIP: `root:root`, `0600`
- manifest: `root:root`, `0600`
- payload: `www-data:www-data`, `0600`
- preflight snapshots and output: `root:root`, `0600`

The payload remained readable by `www-data`; the package and manifest did not
need to be readable by the web runtime.

A disposable `0600` file and lock were used to prove that `www-data` can
create a file, atomically rename it, and acquire `flock` within the run root.
Both test artifacts were removed. The run root contained zero entries after
the check and after preflight.

## 6. Plugin Installation

Installed path:

`/srv/dualcorelink/wordpress/current/wp-content/plugins/dualcorelink-multilingual-import-cli`

Installation result:

- package unpacked successfully
- plugin activated successfully
- activation was finalized by an explicit deactivate/activate cycle under
  `www-data`
- plugin version: `1.0.0`
- installed files: 9
- PHP syntax check: passed for every plugin PHP file
- installed ownership aligned with the existing plugin tree:
  `deploy:www-data`
- active-plugin count after activation: 3
- importer REST write routes: 0

The plugin exposes its guarded mutation commands only through WP-CLI. No
import REST write route or frontend/admin import interface was registered.

The WP-CLI help output registered one unique namespace with:

- `preflight`
- `apply`
- `verify`
- `publish`
- `rollback`

Only `preflight` was executed.

## 7. Production Read-Only Preflight

Command class:

`wp dualcorelink multilingual-import preflight`

Execution identity: `www-data`

Locale: `zh`

Batch: `p0`

Result:

| Field | Value |
|---|---|
| Status | `passed` |
| Records | 7 |
| Writes reported by importer | 0 |
| Import payload hash | `7c453b4ad305771643a99a85ade456f44973bb226c43f032b1115ec81b37dee7` |
| English source hashes checked | 7 |

The preflight validated the exact source IDs, post types, slugs, locale,
batch, reviewer, review date, release evidence, required translated fields,
source publication state, language, duplicate IDs, duplicate slugs, and
localized-slug conflicts.

| Source ID | Type | Approved slug | Source status/language | Extra slug occupant | Result |
|---:|---|---|---|---:|---|
| 48 | Product | `hotel-smart-room-rcu-host-1` | publish / en | 0 | passed |
| 47 | Product | `rcu-controller-cabinet` | publish / en | 0 | passed |
| 6 | Product | `86-type-ai-smart-control-display` | publish / en | 0 | passed |
| 222 | Product | `smart-four-key-scene-control-panel` | publish / en | 0 | passed |
| 142 | Solution | `oem-odm-custom-panel-solution` | publish / en | 0 | passed |
| 140 | Solution | `rcu-room-control-solution` | publish / en | 0 | passed |
| 138 | Solution | `smart-hotel-automation-solution` | publish / en | 0 | passed |

All eight translation metadata keys had a production count of zero:

- `_dualcorelink_translation_schema_version`
- `_dualcorelink_translation_locale`
- `_dualcorelink_translation_source_id`
- `_dualcorelink_translation_group`
- `_dualcorelink_translation_batch`
- `_dualcorelink_translation_payload_hash`
- `_dualcorelink_translation_reviewer`
- `_dualcorelink_translation_review_date`

## 8. Independent Zero-Write Proof

A deterministic content snapshot was captured immediately after plugin
activation and before preflight, then again immediately after preflight. It
included:

- total WordPress posts
- total WordPress postmeta rows
- full post and postmeta hash for each of the seven English sources
- current Chinese P0 translation IDs
- active-plugin list

Before and after snapshot files were byte-identical:

`SNAPSHOT_COMPARE=IDENTICAL`

Verified snapshot values:

| Evidence | Result |
|---|---:|
| Posts | 194 before / 194 after |
| Postmeta rows | 2422 before / 2422 after |
| English source hashes | 7 unchanged |
| Chinese P0 CMS records | 0 before / 0 after |
| Active plugins | 3 before / 3 after preflight |
| Import run-root entries | 0 |

The only intentional CMS state change in this phase was plugin activation
before the independent preflight baseline. The preflight itself made no
content or run-state write.

The seven current post exports and seven current ACF exports were also
compared directly with their pre-install backup files after installation and
preflight: 7/7 post exports and 7/7 ACF exports were byte-identical. After
finalizing activation under `www-data`, posts remained 194, postmeta remained
2422, and Chinese target records remained zero.

## 9. Post-Installation Health and SEO Boundary

| Check | Result |
|---|---|
| Nginx | active |
| MariaDB | active |
| CMS REST | HTTP 200 |
| Public site | HTTP 200 |
| Production sitemap locations | 76 |
| New public multilingual pages | 0 |
| `/zh/about/` | HTTP 301 to `/en/about/` |
| Product, Solution, Resource, Contact samples | 4/4 HTTP 200 |
| Contact tracking query hrefs | 0 |
| Products filter query hrefs | 0 |
| Production CMS Chinese P0 records | 0 |
| Import REST routes | 0 |
| PHP fatal errors during the phase | 0 |
| Root filesystem | 58% used, 33 GiB free |

No frontend files, sitemap, hreflang, canonical, robots, schema, English
content, native-review state, or release configuration were changed.

## 10. Rollback Readiness

If plugin removal is separately authorized, the verified rollback inputs are:

1. deactivate and remove only
   `dualcorelink-multilingual-import-cli`;
2. confirm the active-plugin list returns to its pre-install snapshot;
3. restore the database export only if the plugin activation state cannot be
   cleanly reversed;
4. restore the saved content-architecture plugin archive only if an unrelated
   filesystem discrepancy is discovered;
5. re-run WordPress, REST, Nginx, MariaDB, source-hash, and sitemap checks.

No rollback is required at the end of M5E-4 because installation, activation,
and read-only preflight all passed.

## 11. Git and Production Outcome

- No commit.
- No push.
- No merge to `main`.
- No frontend deployment.
- No production CMS record import.
- No `apply`, `verify`, `publish`, or `rollback`.
- Production remains English-only with 76 sitemap URLs.
- The local report and `latest-status.md` remain uncommitted for review.

## 12. Recommendation

M5E-4 is complete. The plugin may remain installed and active as the approved
WP-CLI-only safety tool.

Final decision:

**PASS — 允许进入 M5E-5 Draft Apply 授权阶段**

This permits preparation and approval review only; it does not authorize the
draft `apply` command.

Do not proceed to draft apply, verification, publish, frontend multilingual
release, or CMS write without a new explicit approval. A future write phase
must reuse the verified backup, exact payload, run ID confirmation, lock,
pre-image, draft-only apply, and independent post-write verification gates.
