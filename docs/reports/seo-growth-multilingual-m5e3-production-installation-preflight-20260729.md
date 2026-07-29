# DualCoreLink SEO Growth — Multilingual Phase M5E-3

## Production CMS Import Tool Installation Preflight Audit

Date: 2026-07-29
Worktree: `C:\Users\empir\Documents\dualcorelink-cms-import-safety`
Branch: `feature/multilingual-cms-import-safety-20260729`
HEAD: `c5ac34509e27609bd143fbf179d54c028763d4ad`

## Final Decision

**BLOCKED**

The first mandatory artifact-integrity gate failed. The plugin ZIP rebuilt
from the current M5E-2 source does not reproduce the approved SHA-256.
Per the M5E-3 stop rule, no production server commands, plugin upload,
installation, activation, directory creation, database backup, production
preflight, apply, verify, publish, rollback, commit, push or deployment were
performed.

M5E-4 is not authorized.

## Package Integrity Gate

Expected SHA-256:

```text
0791410c1e54bb3f392d884cbf375072a3aad43d51a85f349bdbd390d9e40bdc
```

Rebuilt SHA-256:

```text
4764d9d05d83586538085d97ba51029380a8e664bfbb59feb51ca22c388dfb28
```

Result: **failed**.

`npm run cms-import:verify-package` reported success only against the checksum
file generated in the same packaging invocation. It did not compare the
archive with the separately approved M5E-3 expected digest.

The rebuilt archive still contains the approved nine runtime/schema files and
the verifier found no forbidden credential or data filename. These checks do
not override the failed pinned-hash gate.

## Difference Attribution

The packaging script creates a new `dist/package-stage` directory, recursively
copies the plugin into it, then invokes:

```text
tar -a -c -f <archive> -C <staging> <plugin-name>
```

The ZIP central directory records newly created directory timestamps and
filesystem modes. The rebuilt archive showed directory timestamps from the
current packaging run, while the source file timestamps were older. Therefore
the archive is not reproducible byte-for-byte even when the nine runtime file
contents have not intentionally changed.

In addition, the verifier reads the expected digest from the `.sha256` file
which the packaging command has just overwritten. This proves only internal
self-consistency and cannot enforce the externally approved digest.

The runtime file hashes observed in this stopped audit are preserved below for
the next corrective phase:

| Runtime file | SHA-256 |
|---|---|
| `dualcorelink-multilingual-import-cli.php` | `1f90a1d01e9ba5e25f6f3ff8652d87208da2804e479987aa8b9ecc17a931e6b3` |
| `includes/class-cli-command.php` | `e6b65c0dee9a8ea8d0bd7cc9f2d0bf5c16470ff570414b4f55dcf5aa534d5c5b` |
| `includes/class-config.php` | `19893bb4761469b6d19fecac49a550cbaf0e88a0c5e492ddbeb82e68687df15b` |
| `includes/class-import-service.php` | `05d5da75e5bd0431f59fb0d81084bcc297c0cbbff8b5d8a898ffb66245617476` |
| `includes/class-renderer.php` | `cd47b79a402e171153f79a225b5079f5593478a2dc818d904949ec61890963ad` |
| `includes/class-run-store.php` | `78c4ab46736c9bbd64a76aab9b89b85855ae24fd8c06f911dc7e4221c4142136` |
| `includes/class-wordpress-repository.php` | `7c5f6e11cf78653b16477befbe755c8b5093419aeb7a018f9f09f7b446580cd0` |
| `includes/interface-repository.php` | `bb8b6b55ec8a7832b1c6643606479ee7397395aa4f0ffa32a51cee88e5964851` |
| `schema/payload.schema.json` | `cb0d249735449ca625508a6842f09c339b75ccd7e5d774d00e3c7c5588dd3612` |

## Server Compatibility

Not re-audited in M5E-3 because the mandatory local package gate failed
before the production read-only phase. Earlier M5E read-only evidence is not
promoted to an installation authorization for a package whose pinned hash
cannot be reproduced.

Exact plugin installation path, owner/group/mode, PHP CLI/FPM compatibility,
WP-CLI registration, disk/inode capacity and Core/ACF runtime availability
remain unapproved for installation.

## Loading Architecture

No option among normal plugin activation, MU-plugin loading, `wp --require`,
or an existing-plugin CLI module was approved in this stopped audit.

The final loading choice must be made only after:

1. a deterministic package is rebuilt and pinned;
2. the production read-only environment audit is completed;
3. the normal REST translation/hreflang/direction read chain is proven against
   the exact package;
4. the selected architecture is shown not to add Web, REST or admin writes.

## REST Translation Read Path

Status: **not proven complete for the rebuilt artifact**.

No production plugin was installed or loaded, and no production REST request
was made. This is a blocking unknown, not a pass inherited from earlier
architecture observations.

## ACF Field Compatibility

Status: **not revalidated to the required 100% production threshold**.

The production ACF field names, types, return formats, structured
`post_content` rendering and payload-loss checks were not executed after the
hash gate failed. No payload was sent and no ACF field was changed.

## Translation Meta and Slug Conflicts

Status: **not checked in this stopped audit**.

No production database query was executed for the eight
`_dualcorelink_translation_*` keys, existing Chinese records, seven target
slugs, trash/draft/revision collisions, source hashes, source translation
groups or English `translations` state.

## Log and Lock Directory

Proposed path:

```text
/var/lib/dualcorelink/cms-import-runs/
```

No directory was created and its current parent ownership, mode, filesystem,
Nginx exposure, capacity and inode state were not re-audited. Exact creation
commands are intentionally withheld until the package-integrity blocker is
resolved and the server read-only phase is rerun.

## Least-Privilege Model

Status: **not approved**.

No production sudoers or filesystem permission inspection was executed. A
future design must use `www-data` for every real WordPress write, preserve
`--confirm-run-id`, avoid wildcard/unrestricted WP-CLI sudo access and use
exact root-owned command wrappers where privileged setup is unavoidable.

## Database Backup and Rollback

Status: **not approved for execution**.

Database name, size, available backup tooling, out-of-Web-root backup
directory, free space, checksum procedure, restore command, WordPress release
rollback and plugin-file rollback were not revalidated in this audit. No
backup or restore operation ran.

Installation, production preflight and rollback commands are not released
while the artifact identity is unresolved.

## Safety Failure Drills

| Failure mode | Audit result |
|---|---|
| Package hash mismatch | Triggered; stopped before server access |
| Duplicate plugin installation | Not run |
| CLI command not registered | Not run |
| ACF unavailable | Not run |
| Log directory unwritable | Not run |
| Lock occupied | Not run |
| Payload count not seven | Not run |
| Source record drift | Not run |
| Slug conflict | Not run |
| Translation meta conflict | Not run |
| Draft verification failure | Not run |
| Pre-publish drift | Not run |
| Missing rollback pre-image | Not run |

The observed hash mismatch correctly stopped the workflow, but the remaining
failure drills cannot be claimed as production-verified.

## Local Validation

| Command/check | Result |
|---|---|
| Five-worktree opening snapshot | Captured |
| Frozen M5D `MERGE_HEAD` | Preserved at `c5ac34509e27609bd143fbf179d54c028763d4ad` |
| Frozen M5D staged files | Preserved at 100 |
| `npm run cms-import:package` | Completed; produced unexpected SHA-256 |
| `npm run cms-import:verify-package` | Self-consistency passed; not the pinned digest |
| ZIP runtime file count | 9 |
| Remaining requested regression commands | Not run after mandatory stop |
| Production commands | None |

## Required Corrective Work

Before M5E-3 may be rerun:

1. make packaging deterministic by normalizing archive order, timestamps,
   modes, ownership and path separators;
2. separate artifact creation from pinned-digest verification;
3. make verification accept or read an immutable approved digest instead of a
   checksum file rewritten by the packaging command;
4. regenerate the package once, review the nine runtime bytes, record a new
   approved SHA-256, then rerun this audit from the beginning.

This corrective work is outside the authorized M5E-3 report-only scope and was
not implemented.

## Allowed and Forbidden Next Actions

Allowed next action: a separately authorized local packaging-reproducibility
fix and review.

Forbidden:

- M5E-4 plugin installation or production preflight;
- plugin upload, installation or activation;
- log/lock directory creation;
- database backup or CMS write;
- apply, verify, publish or rollback;
- M5D restart;
- commit, push or deployment.
