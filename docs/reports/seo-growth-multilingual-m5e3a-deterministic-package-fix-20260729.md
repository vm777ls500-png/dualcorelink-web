# DualCoreLink SEO Growth — Multilingual Phase M5E-3A

## Deterministic Plugin Package Integrity Fix

Date: 2026-07-29
Worktree: `C:\Users\empir\Documents\dualcorelink-cms-import-safety`
Branch: `feature/multilingual-cms-import-safety-20260729`
HEAD: `c5ac34509e27609bd143fbf179d54c028763d4ad`

## Final Decision

**READY_FOR_HASH_APPROVAL**

The plugin package is now deterministic across three fresh staging trees and
the candidate-package verification path is fully separated from human
approval. The new candidate hashes are not approved automatically.

M5E-3 must not resume until Allan explicitly approves both the candidate ZIP
SHA-256 and candidate manifest SHA-256 in a separately reviewed approval
record.

No production server, production CMS, production database, plugin
installation, CMS command, commit, push or deployment was accessed or
performed.

## Original Failure Root Cause

The previous packager:

1. created a new staging directory;
2. copied the plugin into that directory;
3. delegated ZIP creation to `tar -a`;
4. accepted the staging directory timestamps and filesystem modes written by
   that tool;
5. wrote a `.sha256` file during packaging;
6. verified the package only against that same newly overwritten checksum.

The previous archive therefore changed when staging metadata changed. Its
verifier proved only same-run self-consistency and did not prove that the
archive matched an externally approved digest.

## Retired Hash

The historical value:

```text
0791410c1e54bb3f392d884cbf375072a3aad43d51a85f349bdbd390d9e40bdc
```

is now classified as:

- **retired**;
- **non-reproducible**;
- **prohibited for production installation**.

The historical M5E-2/M5E-3 reports remain intact as audit evidence.

## Deterministic ZIP Rules

The new repository-owned TypeScript encoder creates the ZIP directly. It does
not depend on `tar`, `Compress-Archive`, staging metadata or the host ZIP
defaults.

| Property | Fixed rule |
|---|---|
| Runtime whitelist | Exactly 9 approved files |
| Entry paths | UTF-8, `/` separators, byte-sorted |
| Absolute paths | Rejected |
| `.` / `..` / empty segments | Rejected |
| Symbolic links | Rejected |
| Directory entries | Omitted |
| Entry timestamp | DOS `1980-01-01 00:00:00` |
| Create system | Unix (`3`) |
| File mode | `0644` (`0100644` including regular-file type bits) |
| Compression | STORE, method `0`, level `0` |
| General-purpose flag | UTF-8 only (`0x0800`) |
| Data descriptor | Not used |
| Local/central extra fields | Empty |
| Entry comments | Empty |
| Archive comment | Empty |
| CRC-32 / sizes | Written directly into local and central headers |
| User, host, absolute staging path | Not recorded |

STORE was selected deliberately. It removes compressor-library and
compressor-version variance while remaining a valid WordPress-installable ZIP
method. The runtime package is small enough that compression is not required.

## Text Normalization

Normalization occurs only in the packaging input stream; the plugin source
files are not rewritten.

1. Decode as strict UTF-8.
2. Remove a leading UTF-8 BOM if present.
3. Convert CRLF and lone CR to LF.
4. Normalize trailing line breaks to exactly one LF.
5. Hash and package the normalized bytes.

PHP line-ending normalization and JSON whitespace normalization do not alter
runtime semantics. Tests prove that CRLF/LF/BOM variants produce identical
package bytes and that changing a substantive source byte changes both the
file hash and ZIP hash.

## Independent Candidate Manifest

Generated candidate:

```text
dist/dualcorelink-multilingual-import-cli.manifest.json
```

The manifest is outside the plugin ZIP and contains:

- package schema version;
- plugin version;
- translation schema version;
- package filename;
- the exact nine normalized relative paths;
- each normalized byte size;
- each normalized file SHA-256;
- fixed file mode;
- manifest SHA-256.

The manifest SHA-256 is calculated over canonical JSON for the manifest base
without the `manifestSha256` field, avoiding self-reference. The manifest
contains no timestamp, local absolute path, username, hostname, Git dirty
state or credentials.

## Candidate File Manifest

| Relative path | Bytes | SHA-256 | Mode |
|---|---:|---|---|
| `dualcorelink-multilingual-import-cli.php` | 3189 | `1f90a1d01e9ba5e25f6f3ff8652d87208da2804e479987aa8b9ecc17a931e6b3` | `0644` |
| `includes/class-cli-command.php` | 4508 | `e6b65c0dee9a8ea8d0bd7cc9f2d0bf5c16470ff570414b4f55dcf5aa534d5c5b` | `0644` |
| `includes/class-config.php` | 5092 | `19893bb4761469b6d19fecac49a550cbaf0e88a0c5e492ddbeb82e68687df15b` | `0644` |
| `includes/class-import-service.php` | 26640 | `05d5da75e5bd0431f59fb0d81084bcc297c0cbbff8b5d8a898ffb66245617476` | `0644` |
| `includes/class-renderer.php` | 7028 | `cd47b79a402e171153f79a225b5079f5593478a2dc818d904949ec61890963ad` | `0644` |
| `includes/class-run-store.php` | 5075 | `78c4ab46736c9bbd64a76aab9b89b85855ae24fd8c06f911dc7e4221c4142136` | `0644` |
| `includes/class-wordpress-repository.php` | 11899 | `7c5f6e11cf78653b16477befbe755c8b5093419aeb7a018f9f09f7b446580cd0` | `0644` |
| `includes/interface-repository.php` | 751 | `bb8b6b55ec8a7832b1c6643606479ee7397395aa4f0ffa32a51cee88e5964851` | `0644` |
| `schema/payload.schema.json` | 2588 | `cb0d249735449ca625508a6842f09c339b75ccd7e5d774d00e3c7c5588dd3612` | `0644` |

No fixture, test data, credential, key, environment file, log, SQL, SQLite,
database file or manifest is inside the ZIP.

## Approval Record Mechanism

Default approval-record path:

```text
config/multilingual-cms-import-package-approval.json
```

Required fields:

- `packageSchemaVersion`
- `packageFilename`
- `zipSha256`
- `manifestSha256`
- `approvedBy`
- `approvedDate`
- `sourceCommit`

The production approval record is intentionally absent at the end of M5E-3A.
Neither package generation nor candidate verification creates, updates or
overwrites it.

The commands have separate responsibilities:

| Command | Responsibility |
|---|---|
| `cms-import:package` | Generate deterministic candidate ZIP and manifest only |
| `cms-import:verify-package` | Verify whitelist, paths, metadata, content hashes and manifest; never approve |
| `cms-import:verify-approved-package` | Compare candidate ZIP and manifest hashes with the independent approval record |
| `cms-import:reproducibility` | Build three temporary candidates and require complete byte/metadata agreement |

An isolated test-only approval record proves the approved path can pass.
Missing approval, wrong ZIP hash and wrong manifest hash each fail nonzero.

## Three-Build Reproducibility

All three builds used different fresh staging directory names. Their input
file timestamps and modes were deliberately varied.

| Build | ZIP SHA-256 | Manifest SHA-256 |
|---:|---|---|
| 1 | `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0` | `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e` |
| 2 | `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0` | `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e` |
| 3 | `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0` | `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e` |

Result: identical ZIP bytes, manifest hash, entry order, timestamps, modes,
compression method and entry content hashes. Temporary staging directories
and temporary ZIPs were removed; the formal candidate ZIP was retained.

## New Candidate Hashes

Candidate ZIP SHA-256:

```text
3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0
```

Candidate manifest SHA-256:

```text
dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e
```

These are candidates awaiting Allan's explicit approval. They are not yet
authorized for production installation.

## Expected Approval-Gate Failure

Command:

```text
npm run cms-import:verify-approved-package
```

Result:

```text
approval missing
exit code 1
```

This is the required fail-closed result. No approval record was generated.

## Safety Test Coverage

The new package suite contains 26 TypeScript tests covering:

1. three identical clean builds;
2. staging-path independence;
3. mtime independence;
4. input-mode independence;
5. input-order independence;
6. Windows/POSIX separator normalization;
7. CRLF/LF/BOM normalization;
8. ZIP hash change on source-byte change;
9. file hash change on source-byte change;
10. unexpected tenth file rejection;
11. missing approved file rejection;
12. path traversal rejection;
13. symbolic-link rejection;
14. extra-field rejection;
15. archive-comment rejection;
16. timestamp rejection;
17. mode rejection;
18. package approval-record preservation;
19. candidate verifier cannot self-approve;
20. wrong approved ZIP hash rejection;
21. wrong approved manifest hash rejection;
22. missing approval rejection;
23. isolated correct approval-fixture acceptance;
24. independently tampered manifest rejection;
25. exact nine-file ZIP metadata verification;
26. ordinary build has no package/CMS side effect.

The focused command also retained 12 existing TypeScript importer tests and
33 PHP importer tests: **71/71 focused tests passed**.

## Project Regression

The first `npm test` attempt used the required local default CMS endpoint and
reported five connection failures because no service was listening on
`127.0.0.1:8080`. It did not contact production.

For the valid rerun, a temporary GET-only loopback server replayed 141
previously cached Next fetch responses already present in this worktree. It
made zero external requests, performed no CMS/database write and was stopped
immediately after validation.

| Validation | Result |
|---|---|
| `npm ci` | Passed; 7 existing high dependency findings recorded, not changed |
| `npm run cms-import:test` | Passed, 71/71 |
| `npm run cms-import:reproducibility` | Passed, 3/3 identical |
| `npm run cms-import:package` | Passed, 9 files |
| `npm run cms-import:verify-package` | Passed; candidate only, approved=false |
| `npm run cms-import:verify-approved-package` | Failed as designed: `approval missing` |
| `npm run multilingual:audit` | Passed; 414 manifest records, 12 ready, 402 pending |
| Chinese P0 batch release check | Passed; 12/12 pages, 7/7 CMS records |
| `npm test` | Passed, 183/183 on local cache replay |
| `npm run lint` | Passed, 0 errors and 0 warnings |
| `npm run media:audit` | Passed, 0 errors; 1 existing warning |
| `npm run build` | Passed, 163 generated routes before cleanup |
| Static export cleanup/audit | Passed; 12 Chinese pages; sitemap 88 |
| `git diff --check` | Passed |

No package command, test or build invoked a CMS import command.

## Modified Files

M5E-3A implementation:

- `scripts/cms-import/deterministic-package.ts`
- `scripts/cms-import/package-plugin.ts`
- `scripts/cms-import/verify-package.ts`
- `scripts/cms-import/verify-approved-package.ts`
- `scripts/cms-import/reproducibility.ts`
- `scripts/cms-import/run-tests.ts`
- `tests/cms-import-package.test.ts`
- `package.json`

M5E-3A documentation:

- `docs/reports/seo-growth-multilingual-m5e3a-deterministic-package-fix-20260729.md`
- `docs/reports/latest-status.md`

Generated candidates under ignored `dist/`:

- `dist/dualcorelink-multilingual-import-cli.zip`
- `dist/dualcorelink-multilingual-import-cli.manifest.json`

No dependency was added and `package-lock.json` was not changed.

## Next Gate

Allan may review and explicitly approve:

- ZIP SHA-256:
  `3c9cd4d31de9b8f5a3633b22883780c87dd3302abc48b35e2574194a187e05f0`
- manifest SHA-256:
  `dfe7bccc96271a853e18f66c2f137a01acea71816c977a52cef2556cdfc3aa7e`

Until that approval is recorded and independently verified:

- do not resume M5E-3;
- do not enter M5E-4;
- do not upload/install/activate the plugin;
- do not run production preflight/apply/verify/publish/rollback;
- do not restart M5D;
- do not commit, push or deploy.
