# SEO Growth Multilingual M5E-3B — Approved Package Installation Preflight

Date: 2026-07-29

Branch: `feature/multilingual-cms-import-safety-20260729`

HEAD: `c5ac34509e27609bd143fbf179d54c028763d4ad`

Audit mode: production read-only

## Final Decision

**PASS**

This decision permits only the next separately approved phase:

**M5E-4 — controlled plugin installation and production read-only preflight.**

It does not authorize upload, installation, activation, directory creation,
database backup, production preflight, draft apply, verify, publish, rollback,
CMS writes, commit, push, merge, or deployment in M5E-3B. None of those
actions occurred.

## 1. Approved Package Record

Allan approved the following fixed candidate on 2026-07-29:

| Item | Approved value | Verification |
|---|---|---|
| Package schema | `1` | Passed |
| Package file | `dualcorelink-multilingual-import-cli.zip` | Passed |
| ZIP SHA-256 | `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0` | Passed, 3/3 deterministic builds |
| Manifest SHA-256 | `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e` | Passed, 3/3 deterministic builds |
| Approved by | `Allan` | Exact match |
| Approved date | `2026-07-29` | Exact match |
| Source commit | `null` | Accepted because this phase remains uncommitted |

The fixed approval record is
`config/multilingual-cms-import-package-approval.json`. Its own SHA-256 was
`ee58baec9370e0a252682544fd34a611c7da7b646aef7ef4f64a4b983f70a1ed`
before and after reproducibility, package, candidate verification, and approved
package verification. No packaging command changed it.

The approved ZIP contains exactly nine allowlisted runtime files. Verification
found zero forbidden files, no path traversal, no extra ZIP fields, no ZIP
comment, fixed timestamps and modes, and no manifest embedded in the runtime
archive.

## 2. Production Runtime and Filesystem

The audit used the signed-in Lightsail terminal for
`dualcorelink-production`. Only read-only commands were executed.

| Check | Production result |
|---|---|
| Kernel | `6.17.0-1010-aws` |
| WordPress | `7.0.1` |
| PHP CLI | `8.3.6` |
| PHP-FPM | `8.3.6` |
| WP-CLI | `2.12.0` |
| Current symlink | `/srv/dualcorelink/wordpress/current` |
| Real release | `/srv/dualcorelink/wordpress/releases/20260715-b3` |
| Current symlink ownership/mode | `deploy:www-data`, `0777`, symlink |
| `wp-content` ownership/mode | `deploy:www-data`, `0755` |
| `plugins` ownership/mode | `deploy:www-data`, `0755` |
| `mu-plugins` | Absent |
| `flock` | `/usr/bin/flock` |
| PHP modules | DOM, hash, JSON, libxml, mbstring present |
| Disk | 77 GB total, 45 GB available, 58% used |
| Inodes | 4% used |
| `www-data` WP-CLI read | Passed |
| ACF/runtime functions | `update_field`, `get_fields`, `wp_insert_post`, and `wp_update_post` available |

Active plugins:

- Advanced Custom Fields `6.8.5`
- Akismet `5.7`
- Smart Home B2B Content Architecture `1.0.0`

Inactive plugin:

- Hello Dolly `1.7.2`

The content architecture plugin is loaded as a normal active plugin from:

`/srv/dualcorelink/wordpress/current/wp-content/plugins/smart-home-b2b-content-architecture`

## 3. Recommended Loading Architecture

### Selected: A — normal plugin installation and activation

This is the lowest-risk complete option because:

- the candidate registers all write commands only inside the
  `defined('WP_CLI') && WP_CLI` guard;
- normal web requests cannot register or invoke the import command;
- the plugin adds no REST write route and no administration write page;
- normal web/REST loading is required for the read-only relationship filters
  to expose imported `language`, `translation_group`, and `translations` meta;
- deactivation does not delete or alter imported posts or metadata;
- deactivation would remove only the candidate plugin's REST relationship
  enrichment, so it must not be deactivated while localized CMS records are
  expected to feed the frontend.

### Rejected alternatives

| Option | Decision | Reason |
|---|---|---|
| B. MU-plugin loader | Reject | Adds a second loading mechanism, is harder to deactivate safely, and provides no benefit over a guarded normal plugin. |
| C. `wp --require=<bootstrap.php>` | Reject | Registers CLI code for that process only and leaves the public REST translation-read chain incomplete. |
| D. Add a CLI module to the existing content plugin | Reject | Expands the blast radius of the production content architecture plugin and couples import lifecycle code to unrelated production behavior. |

## 4. REST Translation Read Chain

The existing content architecture plugin registers read-only REST fields with
`get_callback` functions for:

- `language`
- `translations`
- `translation_group`
- `hreflang`
- `direction`

No `update_callback` was found for these fields.

The candidate plugin adds only three read filters:

- `smart_home_b2b_rest_language`
- `smart_home_b2b_rest_translation_group`
- `smart_home_b2b_rest_translations`

It adds no REST route and no public write endpoint. A live public read check
confirmed:

- Product 48: `language=en`,
  `translation_group=shb2b-product-48`, empty current translations,
  English hreflang, `direction=ltr`;
- Solution 142: `language=en`,
  `translation_group=shb2b-solution-142`, empty current translations,
  English hreflang, `direction=ltr`.

**Conclusion: the REST translation read chain is complete.**

## 5. Production Meta and Slug Collision Audit

The following production meta keys all have a count of zero:

- `_dualcorelink_translation_schema_version`
- `_dualcorelink_translation_locale`
- `_dualcorelink_translation_source_id`
- `_dualcorelink_translation_group`
- `_dualcorelink_translation_batch`
- `_dualcorelink_translation_payload_hash`
- `_dualcorelink_translation_reviewer`
- `_dualcorelink_translation_review_date`

No existing Chinese Product or Solution translation record was found.

The seven target slugs are occupied only by their expected published English
source records:

| ID | Type | Status | Slug |
|---:|---|---|---|
| 48 | product | publish | `hotel-smart-room-rcu-host-1` |
| 47 | product | publish | `rcu-controller-cabinet` |
| 6 | product | publish | `86-type-ai-smart-control-display` |
| 222 | product | publish | `smart-four-key-scene-control-panel` |
| 142 | solution | publish | `oem-odm-custom-panel-solution` |
| 140 | solution | publish | `rcu-room-control-solution` |
| 138 | solution | publish | `smart-hotel-automation-solution` |

There is no additional publish, draft, pending, private, future, trash,
revision, or other-post-type occupant for these slugs. The importer permits
the same slug across languages only through its narrowly scoped
`pre_wp_unique_post_slug` callback and independently identifies localized
records by source ID, locale, post type, and slug.

All seven source records remain `publish` and resolve to `en`. Their default
translation groups are `shb2b-{post_type}-{source_id}`. Current source
translations are empty. A read-only canonical SHA-256 calculation completed
for all seven sources without changing them. M5E-3 had stopped before server
access, so there is no earlier approved production source-hash baseline
against which to claim historical drift. The authoritative baseline must
therefore be written by the M5E-4 preflight run, and the importer must abort if
any value changes before apply or verify.

## 6. Production ACF Compatibility

Every allowlisted field resolves by name to a registered production ACF field
key. This also verifies that `update_field()` can resolve the field selector
used by the importer for a newly created localized post.

| Content type | Field | Production key | Type |
|---|---|---|---|
| Product | `product_short_description` | `field_shb2b_product_short_description` | textarea |
| Product | `product_technical_specs` | `field_shb2b_product_technical_specs` | textarea |
| Product | `product_faqs_text` | `field_shb2b_product_faqs_text` | textarea |
| Product | `product_seo_title` | `field_shb2b_product_seo_title` | text |
| Product | `product_meta_description` | `field_shb2b_product_meta_description` | textarea |
| Product | `product_breadcrumb_label` | `field_shb2b_product_breadcrumb_label` | text |
| Product | `product_image_alt_text` | `field_shb2b_product_image_alt_text` | textarea |
| Solution | `solution_summary` | `field_shb2b_solution_summary` | textarea |
| Solution | `solution_seo_title` | `field_shb2b_solution_seo_title` | text |
| Solution | `solution_meta_description` | `field_shb2b_solution_meta_description` | textarea |
| Solution | `solution_breadcrumb_label` | `field_shb2b_solution_breadcrumb_label` | text |

Compatibility is **11/11 (100%)**.

The importer does not write image, relationship, repeater, flexible-content,
or array values to these ACF fields. Product specifications and FAQs are
deterministically flattened into text fields. Structured content is rendered
as escaped WordPress `post_content`. Solution specifications are intentionally
rendered into `post_content`; they are not guessed into
`solution_architecture` or another unapproved ACF field. Unknown payload and
mapped fields fail closed, so no silent field drop is accepted.

## 7. Run Logs and Lock Directory Plan

Current read-only state:

- `/var/lib/dualcorelink` does not exist;
- `/var/lib/dualcorelink/cms-import-runs` does not exist;
- the target is outside the web root;
- `/var/lib` and WordPress are on the same ext4 root filesystem;
- `flock` is available;
- disk and inode capacity are sufficient.

M5E-4 may create the directories only after separate approval. Recommended
state:

- root: `/var/lib/dualcorelink/cms-import-runs`
- owner/group: `www-data:www-data`
- root and run-directory mode: `0750`
- run JSON mode: `0600` (enforced by the code)
- lock: `.import.lock`, owned by `www-data`, mode `0600`
- all importer commands: executed as `www-data`
- atomicity: temporary file and final JSON remain in the same run directory,
  followed by an atomic `rename()`

Future M5E-4 creation and verification commands (documented, not executed):

```sh
sudo install -d -o www-data -g www-data -m 0750 \
  /var/lib/dualcorelink/cms-import-runs
sudo -u www-data test -r /var/lib/dualcorelink/cms-import-runs
sudo -u www-data test -w /var/lib/dualcorelink/cms-import-runs
sudo -u www-data test -x /var/lib/dualcorelink/cms-import-runs
findmnt -no TARGET,SOURCE,FSTYPE,OPTIONS \
  -T /var/lib/dualcorelink/cms-import-runs
```

The existing code allowlists only:

- `request.json`
- `preflight.json`
- `pre-image.json`
- `operations.json`
- `verify.json`
- `publish.json`
- `rollback.json`
- `checksums.json`

Recommended retention is 180 days after final publish/rollback verification.
Deletion must be a separately reviewed root maintenance operation and must not
remove a run whose rollback evidence is still required. Because the importer
enforces `0600`, an operations reader should use a root-owned read-only helper
that validates the run ID and allowlisted filename before reading as
`www-data`; do not broaden run-file modes.

## 8. Least-Privilege Execution Plan

The current Lightsail `ubuntu` administrator has the platform-default
`NOPASSWD: ALL`. This is a pre-existing host-administration capability, not an
importer permission added by this phase.

The importer-specific control remains least-privilege:

- package installation, activation, backup, and directory creation: a
  separately approved host administrator only;
- installed plugin directories: `deploy:www-data`, mode `0755`;
- installed plugin files: `deploy:www-data`, mode `0644`;
- `www-data` must not have filesystem write permission to installed plugin
  code;
- preflight, apply, verify, publish, and rollback: always execute the exact
  guarded WP-CLI command as `www-data`;
- ordinary web requests: cannot register or invoke the CLI command;
- no unrestricted WP-CLI sudoers rule is permitted;
- no runner, web server, or WordPress user receives host sudo rights;
- if these commands are delegated beyond the current host administrator, use
  root-owned fixed-command helpers with strict argument validation and exact
  sudoers entries; never grant `wp *` or shell wildcards.

The staged sequence remains separately gated:

1. M5E-4 install/activate and read-only preflight.
2. Separate approval for database backup and draft apply.
3. Separate verification approval.
4. Separate publish approval.
5. Rollback only against the exact run ID and recorded pre-image.

**Conclusion: the importer execution identity and command surface satisfy the
minimum-permission requirement without adding a broad authorization.**

## 9. Backup and Rollback Plan

Read-only production facts:

- database: `dualcorelink_wp`
- current database size: approximately 3.67 MB
- available dump tools: `mariadb-dump` and `mysqldump`
- checksum/compression tools: `sha256sum`, `gzip`, and `tar`
- outside-web-root backup path available: `/var/backups`
- `/var/backups` is `root:root`, mode `0755`
- approximately 45 GB is available
- only the current WordPress release
  `/srv/dualcorelink/wordpress/releases/20260715-b3` is present

M5E-4 must stop unless it can first create:

1. a root-owned, outside-web-root database dump;
2. a SHA-256 checksum and a successful decompression/parse check;
3. a copy/archive of any pre-existing candidate plugin path, if present;
4. an exact record of the current symlink target and plugin state.

Future backup and integrity commands (documented, not executed):

```sh
run_id="m5e4-YYYYMMDD-HHMMSS"
backup_root="/var/backups/dualcorelink-cms/${run_id}"
sudo install -d -o root -g root -m 0700 "${backup_root}"

database_tmp="/tmp/dualcorelink-wp-${run_id}.sql"
test ! -e "${database_tmp}"
sudo -u www-data wp --path=/srv/dualcorelink/wordpress/current \
  db export "${database_tmp}"
sudo chown root:root "${database_tmp}"
sudo chmod 0600 "${database_tmp}"
sudo gzip -9 "${database_tmp}"
sudo mv "${database_tmp}.gz" "${backup_root}/database.sql.gz"
sudo gzip -t "${backup_root}/database.sql.gz"
sudo sha256sum "${backup_root}/database.sql.gz" \
  | sudo tee "${backup_root}/database.sql.gz.sha256"
sudo sha256sum -c "${backup_root}/database.sql.gz.sha256"

readlink -f /srv/dualcorelink/wordpress/current \
  | sudo tee "${backup_root}/wordpress-current.txt"
sudo -u www-data wp --path=/srv/dualcorelink/wordpress/current \
  plugin list --format=json \
  | sudo tee "${backup_root}/plugins-before.json"
sudo find "${backup_root}" -maxdepth 1 -type f -exec chmod 0600 {} +
```

If the candidate plugin path unexpectedly exists, M5E-4 must stop before
installation and preserve it with a root-owned `tar` archive and SHA-256
instead of overwriting it.

The restore framework is:

- deactivate the candidate plugin;
- use the run-specific importer rollback while its verified pre-image exists;
- if a database-level restore is required, import only the verified dump after
  an explicit destructive-restore approval;
- remove only the candidate plugin directory after deactivation and hash/path
  verification;
- retain the existing content architecture plugin;
- verify REST, source hashes, post counts, statuses, and translation meta after
  restoration.

Database restore framework (not authorized or executed):

```sh
sudo sha256sum -c /var/backups/dualcorelink-cms/RUN/database.sql.gz.sha256
sudo gzip -t /var/backups/dualcorelink-cms/RUN/database.sql.gz
# Destructive restore requires a separate approval:
sudo sh -c 'gzip -dc /var/backups/dualcorelink-cms/RUN/database.sql.gz |
  sudo -u www-data wp --path=/srv/dualcorelink/wordpress/current db import -'
```

Because no previous WordPress release exists on the host, symlink rollback
alone is not currently sufficient. M5E-4 must preserve the current release or
plugin pre-image before installing anything.

**Conclusion: backup and rollback are executable, but their artifacts must be
created as mandatory M5E-4 gates before any apply action.**

## 10. Fail-Closed Review

| Failure | Expected behavior | Evidence |
|---|---|---|
| Package/manifest hash mismatch | Stop before server use | Deterministic package tests and approved-package verifier |
| Duplicate plugin installation | M5E-4 checks `wp plugin is-installed` and stops; no `--force` | Installation plan |
| CLI command not registered | Stop before preflight | WP-CLI guard and command-registration tests |
| ACF unavailable | Exit safety/preflight failure | Runtime checks and importer exceptions |
| Run root not writable | Stop; no CMS mutation | Run-store initialization/write exceptions |
| Lock conflict | Stop with lock exit code | PHP lock-competition test |
| Payload count not exactly seven | Stop | Fixture/preflight tests |
| English source drift | Stop before verify/publish | Source-hash capture and drift tests |
| Slug or import-meta conflict | Stop | Production SQL audit and conflict tests |
| Localized verify drift | Stop | Verify-drift test |
| Publish prerequisites absent | Stop | Explicit verify/run-ID/payload-hash gates |
| Rollback pre-image absent | Stop | Repository/service guard |

No failure path was found that silently falls through to a write.

## 11. Local Regression

All final commands were run in
`C:\Users\empir\Documents\dualcorelink-cms-import-safety`.
Tests and the build used the public read-only CMS endpoint where CMS data was
required.

| Check | Result |
|---|---|
| `npm ci` | Passed; 352 packages installed; seven existing high-severity audit findings recorded, not changed |
| `cms-import:test` | Passed: 39 TypeScript + 33 PHP = 72/72 |
| `cms-import:fixture-preflight` | Passed: 7 records, 0 writes |
| `cms-import:reproducibility` | Passed: 3/3 identical ZIP and manifest hashes |
| `cms-import:package` | Passed: 9 files; approval unchanged |
| `cms-import:verify-package` | Passed; zero forbidden files |
| `cms-import:verify-approved-package` | Passed |
| `multilingual:audit` | Passed: manifest 414, production-ready 12, pending 402 |
| scoped `zh:p0` release check | Passed: 12/12 pages, 7/7 CMS payloads |
| first `npm test` | 179/184; only default localhost CMS connection failures |
| final `npm test` with public read-only CMS | Passed: 184/184 |
| `npm run lint` | Passed: 0 errors |
| `npm run media:audit` | Passed: 0 errors, 1 existing warning |
| `npm run build` | Passed: 163 generated routes before cleanup |
| static export audit | Passed: 12 localized pages, sitemap 88 |
| `git diff --check` | Passed |

No production CMS or server write was performed by these validations.

## 12. Worktree Preservation

| Worktree | Final protected state |
|---|---|
| `C:\Users\empir\Documents\New project` | Preserved; main at `6a6514f`; 83 existing status entries |
| `C:\Users\empir\Documents\dualcorelink-cms-import-safety` | Only M5E-2/M5E-3A/M5E-3B uncommitted work plus this report |
| `C:\Users\empir\Documents\dualcorelink-gsc-cleanup-release` | Preserved; 2 existing status entries |
| `C:\Users\empir\Documents\dualcorelink-multilingual-integration` | Preserved clean at `c5ac345` |
| `C:\Users\empir\Documents\dualcorelink-zh-p0-production-release` | Preserved with 100 staged files and unchanged `MERGE_HEAD=c5ac34509e27609bd143fbf179d54c028763d4ad` |

No reset, checkout, clean, stash, merge, commit, push, deployment, CMS write,
plugin upload, plugin installation, directory creation, permission change,
backup, production preflight, apply, verify, publish, or rollback occurred.

## 13. M5E-4 Entry Conditions

M5E-4 is allowed only as a new, explicitly approved task and must:

1. re-verify the approved ZIP and manifest hashes immediately before upload;
2. stop if the candidate plugin already exists;
3. create and verify the database/plugin pre-install backup;
4. create the run root with the approved owner and mode;
5. install and activate only the approved nine-file ZIP;
6. confirm CLI registration and REST read behavior;
7. execute only the production read-only preflight as `www-data`;
8. stop after preflight and return evidence;
9. not execute draft apply, publish, or rollback.
