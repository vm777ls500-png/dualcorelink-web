# Multilingual CMS Import Runbook

This runbook governs the exact seven-record Chinese P0 CMS batch, the exact
17-record Chinese P1 CMS batch, and the exact six-record Arabic P0 owner-waiver
batch. It does not authorize a production
import. Installation, preflight, draft apply, publish and rollback each
require a separately approved operations phase.

## Safety boundaries

- Use the server-local WP-CLI command. Do not add or use a public REST write
  endpoint.
- Never run direct SQL.
- Never store a password, Application Password, SSH key, token, cookie or
  database credential in Git, payloads or run logs.
- Never skip preflight, draft verification, database backup or run-ID
  confirmation.
- Chinese P0 accepts only reviewer `Allan`, review date `2026-07-29` and
  source IDs `48,47,6,222,142,140,138`. Owner waiver is forbidden.
- Chinese P1 accepts only reviewer `Allan`, review date `2026-08-02`, exactly
  15 Products and two Solutions, and source IDs
  `219,190,189,188,51,50,46,45,43,13,12,11,10,9,8,141,139`. P0, P2,
  other locales, owner waiver, or any identity drift fail closed.
- Arabic P0 accepts only source IDs `48,47,6,140,138,137` and requires the
  explicit `--allow-owner-waiver` flag plus Allan's exact waiver evidence
  dated `2026-07-31`.
- Apply accepts only `--status=draft`. Publish is a separate command.
- The English source records and all other locales are read-only.

## Server prerequisites

- WordPress and WP-CLI must resolve from
  `/srv/dualcorelink/wordpress/current`.
- Run WP-CLI as the WordPress service identity:

  ```bash
  sudo -n -u www-data wp --path=/srv/dualcorelink/wordpress/current
  ```

- Advanced Custom Fields must expose `get_fields()`, `get_field()` and
  `update_field()`.
- The content-architecture plugin must continue to expose the Product and
  Solution post types and its read-only multilingual REST filters.
- The deployment user must not receive broad root or database privileges.

## Plugin installation

The audited package is produced locally:

```bash
npm run cms-import:package
npm run cms-import:verify-package
```

Before installation, compare the ZIP SHA-256 with its adjacent `.sha256`
file. Installation must occur in a separate, approved M5E-3 phase. Extract
only to:

```text
wp-content/plugins/dualcorelink-multilingual-import-cli/
```

Activate the plugin using the controlled `www-data` WP-CLI identity. Confirm
that no public REST write route or admin write screen is added. The five
import commands register only when `WP_CLI` is true; web requests receive
only the read-only translation relationship filters.

## Runtime directory and permissions

Create only during the approved installation phase:

```text
/var/lib/dualcorelink/cms-import-runs/
```

Recommended ownership and permissions:

```text
owner: www-data
group: controlled operations group
directory mode: 0750
JSON log mode: 0600
```

Each validated run uses:

```text
<run-id>/
  request.json
  preflight.json
  pre-image.json
  operations.json
  verify.json
  publish.json
  rollback.json
  checksums.json
```

JSON files are written atomically. The global `.import.lock` uses `flock`.
Run IDs allow only 3–64 ASCII letters, digits, dot, underscore and hyphen,
must start with a letter or digit, and cannot traverse directories.

## Payload preparation

Use only the generated seven-record JSON corresponding to:

```text
src/content/locales/cms-import/zh-p0-reviewed.ts
```

Verify locally:

```bash
npm run cms-import:fixture-preflight
```

Copy the approved JSON to a non-public server path. The payload must contain
no credentials or customer data.

Generate the deterministic Arabic P0 candidate with:

```bash
npm run cms-import:payload -- --locale=ar --batch=p0
```

Generate the deterministic Chinese P1 candidate with:

```bash
npm run cms-import:payload -- --locale=zh --batch=p1
```

The output must be `dist/cms-import/zh-p1-reviewed.json` with exactly 17
records. Preflight must use `--locale=zh --batch=p1`; do not pass
`--allow-owner-waiver`.

Arabic preflight, apply, and publish must include
`--allow-owner-waiver`. Verify reuses the immutable run evidence; rollback
does not accept or require that flag. The six records must remain
`nativeReviewStatus=pending` with no native reviewer or native-review date.

WARNING: Arabic P0 was released under owner review waiver and was not approved
by an independent native Arabic reviewer.

## Database backup

Before any future `apply` or `publish`:

1. Take a timestamped WordPress database backup through the existing approved
   backup mechanism.
2. Verify that the backup is readable and record its checksum outside the web
   root.
3. Record the backup reference in the operations ticket, not in the payload.
4. Do not proceed if backup verification fails.

## Read-only preflight

```bash
sudo -n -u www-data wp --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import preflight \
  --file=/secure/path/zh-p0-reviewed.json \
  --locale=zh \
  --batch=p0 \
  --format=json
```

Preflight does not create a run directory, post or post meta. Any failure
returns a non-zero exit code.

## Draft apply

Only after preflight and database backup approval:

```bash
RUN_ID=zh-p0-20260729-001
sudo -n -u www-data wp --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import apply \
  --file=/secure/path/zh-p0-reviewed.json \
  --locale=zh \
  --batch=p0 \
  --status=draft \
  --run-id="$RUN_ID" \
  --confirm-run-id="$RUN_ID" \
  --format=json
```

Existing localized content is not updated by default. A separately reviewed
field diff and explicit `--allow-update` are required for an update.

## Draft verification

```bash
sudo -n -u www-data wp --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import verify \
  --run-id="$RUN_ID" \
  --format=json
```

Verification re-reads all seven CMS records, core fields, mapped ACF fields,
translation metadata, payload hash and English source hashes. Drift or an
eighth record fails closed.

## Publish

Publish requires a previously written successful `verify.json` and performs
another live verification:

```bash
sudo -n -u www-data wp --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import publish \
  --run-id="$RUN_ID" \
  --confirm-run-id="$RUN_ID" \
  --format=json
```

It changes only the seven localized IDs recorded by that run.

## Rollback

```bash
sudo -n -u www-data wp --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import rollback \
  --run-id="$RUN_ID" \
  --confirm-run-id="$RUN_ID" \
  --format=json
```

- Newly created records return to `draft`; they are never permanently deleted.
- Updated records restore core fields, mapped ACF fields, status and
  translation metadata from `pre-image.json`.
- A repeated rollback returns the existing rollback result unchanged.
- English source records and other locales remain untouched.

## Exit codes

| Code | Meaning |
|---:|---|
| 0 | Success |
| 10 | Argument or run-ID error |
| 20 | Preflight failure |
| 30 | Content or identity conflict |
| 40 | Lock acquisition failure |
| 50 | Apply failure |
| 60 | Verify failure |
| 70 | Publish failure |
| 80 | Rollback failure |
| 90 | Security gate failure |

## Failure recovery

1. Stop after any non-zero result. Do not retry with altered payloads.
2. Preserve the run directory and database backup.
3. Inspect only the redacted JSON logs and the field-level diff.
4. If apply or publish partially completed, run the approved rollback command
   with the same run ID.
5. Re-run verification and compare English source hashes.
6. Escalate missing pre-images, checksum drift, lock failure or an eighth
   record; never repair those conditions with SQL.

## Lock cleanup

Do not delete an active lock. Confirm that no import process is running, then
inspect the owner of `.import.lock`. Because `flock` is process-scoped, a
stale file without a held lock is harmless. Remove it only during an approved
maintenance action.

## Plugin removal

Deactivate and remove the plugin only after confirming no import process is
running and preserving required run logs. Plugin removal must not delete CMS
records, translation metadata or run evidence automatically.
