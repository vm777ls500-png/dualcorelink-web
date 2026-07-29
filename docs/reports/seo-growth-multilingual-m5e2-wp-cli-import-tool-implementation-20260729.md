# SEO Growth Multilingual M5E-2 WP-CLI Import Tool Implementation

Date: 2026-07-29
Branch: `feature/multilingual-cms-import-safety-20260729`
Baseline: `c5ac34509e27609bd143fbf179d54c028763d4ad`

## Outcome

Implemented an isolated, server-local WP-CLI plugin for the exact seven-record
Allan-approved Chinese P0 Product/Solution CMS batch. The tool supports
read-only preflight, draft apply, verify, separately gated publish and
idempotent rollback. No production CMS write, server installation, deployment,
commit, push or merge occurred.

The tool is ready for an M5E-3 read-only installation audit. It is not yet
approved for production installation or execution, and M5D must not be
restarted directly.

## Plugin and commands

Repository directory:

```text
infra/wordpress/plugins/dualcorelink-multilingual-import-cli/
```

The repository uses `infra/wordpress/plugins` because `/wordpress` is the
existing ignored local WordPress installation/cache location.

Runtime package contains nine files: plugin bootstrap, config/exception,
renderer, repository interface, WordPress Core/ACF repository, run store,
import service, WP-CLI adapter and payload schema.

```text
wp dualcorelink multilingual-import preflight
wp dualcorelink multilingual-import apply
wp dualcorelink multilingual-import verify
wp dualcorelink multilingual-import publish
wp dualcorelink multilingual-import rollback
```

Write-capable commands register only when `defined('WP_CLI') && WP_CLI`.
The plugin adds no REST write route and no admin write screen. Its web/REST
behavior is limited to read-only filters deriving existing translation data.

## Translation relationship contract

Schema version: `1`

```text
_dualcorelink_translation_schema_version
_dualcorelink_translation_locale
_dualcorelink_translation_source_id
_dualcorelink_translation_group
_dualcorelink_translation_batch
_dualcorelink_translation_payload_hash
_dualcorelink_translation_reviewer
_dualcorelink_translation_review_date
```

Identity is `post_type + source_id + locale + localized_slug`.
`translation_group` is `shb2b-{post_type}-{source_id}`. Only the Chinese
record receives these fields. English source posts are never updated;
reciprocal relations are derived by querying localized records.

## Field mapping

The complete mapping and non-mapping decisions are recorded in
`docs/reports/multilingual-cms-field-mapping-zh-p0-20260729.md`.

Core mapping:

- translated title → `post_title`;
- localized slug → `post_name`;
- translated description → `post_excerpt`;
- deterministic structured HTML → `post_content`;
- apply status → `draft`, followed only by separately gated publish.

Product ACF writes are restricted to summary, deterministic specifications,
FAQ text, SEO title, meta description, breadcrumb and optional image alt.
Solution ACF writes are restricted to summary, SEO title, meta description
and breadcrumb. Generic Solution specifications are rendered into
`post_content`; they are not guessed into `solution_architecture`.

Fields without a unique payload source are not written. Unknown payload keys
fail preflight, preventing silent loss.

## Payload hash and deterministic renderer

Fixture:

```text
tests/fixtures/cms-import/zh-p0-reviewed.json
```

Records: `7`
Source IDs: `48,47,6,222,142,140,138`

Canonical payload SHA-256:

```text
592038dec549e494252bc1d3c5db6a98868386670588100d6630701ddb6b45ff
```

The renderer escapes text and localized href attributes and emits eyebrow,
H1, introduction, specifications, sections, bullets, FAQ, related links and
CTA in a fixed order. First-record PHP snapshot SHA-256:

```text
f9072982458413ce85a5a292f4e3da9ac4fa143a6781becd7694144ec67f5654
```

## Preflight

Preflight checks:

- exactly seven records and the exact source-ID whitelist;
- locale `zh`, batch `p0`, reviewer Allan and review date 2026-07-29;
- approved translation/content/native statuses and production readiness;
- correct post type and approved slug;
- seven published English sources with language `en`;
- no duplicate ID, duplicate slug, unrelated collision or eighth record;
- complete mapped content and metadata;
- no unknown or unmapped payload fields;
- no attempt to import into an English source CMS ID;
- canonical payload hash and English source hashes.

Preflight creates no run directory. Apply validates before creating the lock
root and validates again under the lock, rejecting a changed hash.

## Apply, verify, publish and rollback

- Apply plans the full batch before writes and accepts only draft status.
- Existing identical records are `unchanged`.
- Changed records fail unless `--allow-update` is explicit.
- Updates record a complete pre-image and field-level diff.
- Verify re-reads all core, mapped ACF and translation metadata fields,
  payload hash, English source hashes and exact batch cardinality.
- Publish requires an existing successful verify log, repeats live
  verification, and changes only the seven recorded IDs.
- Created records roll back to draft; updated records restore their pre-image.
- Repeated rollback returns the existing result unchanged.
- All writes use WordPress Core APIs and ACF `update_field()`; no direct SQL.

## Logging and locking

Designed production root:

```text
/var/lib/dualcorelink/cms-import-runs/
```

Each run records request, preflight, pre-image, operations, verify, publish,
rollback and checksum JSON. Files use temporary-write plus atomic rename,
directory mode 0750 and file mode 0600. A global `flock` prevents concurrent
imports. Run IDs are restricted against directory traversal.

No password, key, token, cookie or authorization value appears in the
payload, fixture or test logs.

Exit codes: `0` success, `10` arguments, `20` preflight, `30` conflict,
`40` lock, `50` apply, `60` verify, `70` publish, `80` rollback and
`90` security gate.

## Package

Generated locally and excluded from Git:

```text
dist/dualcorelink-multilingual-import-cli.zip
```

Files: `9`

SHA-256:

```text
0791410c1e54bb3f392d884cbf375072a3aad43d51a85f349bdbd390d9e40bdc
```

Package verification compared the ZIP with the exact source whitelist and
found zero credential, fixture, log or database files.

## Validation

| Check | Result |
|---|---|
| `npm ci` | Passed; existing 7 high-severity audit findings recorded, not modified |
| `npm run cms-import:test` | Passed: 12 TypeScript + 33 PHP = 45/45 |
| PHP syntax | Passed for all 8 PHP files |
| Fixture preflight | Passed 7/7 with zero writes |
| Package and verification | Passed; 9 files and SHA-256 verified |
| Multilingual audit | Passed; manifest 414, ready 12, pending 402 |
| Chinese P0 release check | Passed; pages 12/12, CMS 7/7 |
| Full release check | Failed as designed; 402 pages remain blocked |
| `npm test` | Passed 157/157 |
| Lint | Passed with zero errors |
| Media audit | Passed with zero errors and one existing warning |
| Build | Passed; 163 generated routes before approved cleanup |
| Static export audit | Passed; 12 Chinese pages, sitemap 88 |
| `git diff --check` | Passed |

The focused suites cover whitelist, approval, identity, conflict, idempotency,
update, drift, publish gate, rollback, English-source integrity,
other-language isolation, lock, run ID, credential logging, renderer snapshot,
direct SQL and REST-route safety.

## File scope

Core tool delivery:

- 9 plugin runtime/schema files;
- 7 TypeScript fixture/test/package utilities;
- 3 isolated test/fixture artifacts.

Supporting changes comprise package scripts, the ignored `dist` rule, mapping
report, runbook, this report and latest status handoff.

No English page, approval state, workflow, Nginx file, production CMS record
or frozen M5D worktree file was modified.

## Production steps not executed

- Plugin was not installed or activated on production.
- The production run directory was not created.
- No production preflight, apply, verify, publish or rollback was run.
- No database backup, CMS write, commit, push, merge or deployment occurred.

## Readiness

M5E-3 read-only server installation audit: **eligible**, subject to separate
approval and verification of package hash, filesystem ownership, compatibility
and command registration.

Immediate M5D restart: **not eligible**. M5D remains blocked until M5E-3 and a
separately approved installation plus production read-only preflight complete.
Draft apply, publish and rollback require additional explicit approvals.
