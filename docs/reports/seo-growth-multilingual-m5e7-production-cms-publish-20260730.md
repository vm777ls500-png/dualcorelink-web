# DualCoreLink SEO Growth — Multilingual Phase M5E-7

## Production Chinese P0 CMS Publish

Date: 2026-07-30

Historical final status: **BLOCKED**.

## M5E-7A Acceptance Addendum

Accepted by: **Allan**

Acceptance date: **2026-07-30**

Allan accepts the seven WordPress revisions created by the authorized publish:

| Revision | Parent |
|---:|---:|
| 247 | 240 |
| 248 | 241 |
| 249 | 242 |
| 250 | 243 |
| 251 | 244 |
| 252 | 245 |
| 253 | 246 |

The original Posts change from `201` to `208` is therefore accepted as normal
WordPress publish history and is no longer treated as an unauthorized database
change. The only accepted new rows are those seven revisions.

M5E-7A then completed the remaining read-only closeout. The revision boundary,
content integrity, database boundary, service health, sitemap, redirect, and
query-URL checks passed. It initially treated the absent REST `zh` hreflang
entry as a blocker.

M5E-7B subsequently proved that this was the wrong pre-release acceptance
gate. The CMS REST hreflang field and frontend HTML hreflang are independent:
the current production frontend has no public Chinese page and correctly does
not advertise a URL that still returns 301. The reviewed 12-page release
candidate independently generates complete en/zh/x-default hreflang and
contains no pending or redirected locale. M5E-7B therefore supersedes the
M5E-7A hreflang blocker with **PASS** and permits M5F preparation, but does not
authorize deployment.

Full closeout evidence:
`docs/reports/seo-growth-multilingual-m5e7a-cms-publish-closeout-20260730.md`.

The single authorized publish command succeeded for CMS IDs `240`–`246`, but
WordPress also created seven revision rows. This changed the `wp_posts` count
from `201` to `208`, contrary to the explicitly authorized and expected
`201 → 201` database boundary. No retry, rollback, second publish, apply,
frontend deployment, or `main` push followed.

M5F frontend release preparation is not authorized.

## 1. Authorization and Scope

Allan authorized this operation on 2026-07-30.

Authorized CMS IDs:

`240`, `241`, `242`, `243`, `244`, `245`, `246`

Corresponding English source IDs:

`48`, `47`, `6`, `222`, `142`, `140`, `138`

Run ID:

`m5e5-zh-p0-20260729T145320Z`

The authorization permitted one publish command and read-only verification,
backup, database comparison, and health checks. It did not permit another
apply, an update, `--allow-update`, a rollback, a second publish, a frontend
deployment, a `main` push, publication of the remaining 402 localized pages,
or a GSC request.

## 2. Protected Worktrees

Before production access:

- CMS safety branch:
  `feature/multilingual-cms-import-safety-20260729`
- CMS safety HEAD:
  `432032c9b1b4bc6f9dc06c7fc716ff08d9e75cd8`
- remote feature HEAD:
  `432032c9b1b4bc6f9dc06c7fc716ff08d9e75cd8`
- `origin/main`:
  `9130c58190a8ded92c06127f48fff682b831ded5`
- existing local changes were limited to the M5E-6 report and
  `docs/reports/latest-status.md`.

The frozen M5D worktree retained exactly 100 staged files and `MERGE_HEAD`
`c5ac34509e27609bd143fbf179d54c028763d4ad`.

No reset, checkout, clean, stash, merge, or modification of the other four
worktrees occurred.

## 3. Pre-Publish Production Baseline

The production gate passed before backup and publish:

| Check | Result |
|---|---|
| Plugin | `dualcorelink-multilingual-import-cli` `1.0.1`, active |
| WP-CLI command | registered |
| Run evidence | six required JSON files present and parseable |
| Localized IDs | exactly `240`–`246` |
| Localized status | 7 draft, 0 publish |
| Locale | `zh`, 7/7 |
| Reviewer | `Allan`, 7/7 |
| Review date | `2026-07-29`, 7/7 |
| Payload hash | approved value, 7/7 |
| English sources | 7/7 `publish` / `en` |
| Posts | 201 |
| Postmeta | 2558 |
| Translation meta | all eight keys have exactly seven rows |
| Sitemap | 76 URLs |
| `/zh/about/` | 301 to `/en/about/` |
| Eighth localized record | absent |

The M5E-6 field values remained intact. A fresh canonical fingerprint was
also produced, but its serialization shape differed from the aggregate
fingerprint used in M5E-6. The hard content gate therefore used the importer's
strict live verifier plus complete Core/ACF/meta exports instead of treating
the serialization-shape difference as content drift.

## 4. M5E-7 Backup

Backup root:

`/var/backups/dualcorelink-cms/m5e7-publish-20260729T184544Z`

Database archive:

`database.sql.gz`

Database SHA-256:

`554be132202e57e8d115d31b74d6c01261d981f02504f955de0c91d6a57c1eb5`

Backup checksum-manifest SHA-256:

`d7da20b19fe3b8a97b9bbcb0b30de68c401a2d9a96810f4a50483849498c5a3e`

The root is `root:root` mode `0700`; contained files are mode `0600`.

The backup contains:

- a complete gzip-compressed MariaDB export;
- gzip integrity and SHA-256 evidence;
- complete Core, ACF, and postmeta exports for IDs `240`–`246`;
- complete Core, ACF, and postmeta exports for English source IDs
  `48`, `47`, `6`, `222`, `142`, `140`, and `138`;
- active plugin state;
- the complete importer plugin `1.0.1` directory;
- the private Run ID directory;
- pre-publish Posts/Postmeta/status/meta-count evidence;
- the production sitemap;
- the twelve Chinese frontend redirect responses.

An initial validation command attempted to read root-only files without
`sudo` and received permission-denied errors. It did not alter the backup.
The corrected strict validation used root read access and passed all gzip,
SHA-256, JSON, record-count, archive, sitemap, and redirect checks.

## 5. Pre-Publish Verify

Exactly one standalone pre-publish verify was executed:

```text
sudo -n -u www-data wp \
  --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import verify \
  --run-id=m5e5-zh-p0-20260729T145320Z \
  --format=json
```

Result:

- exit code: `0`;
- status: `passed`;
- records: `7`;
- localized IDs: `240`–`246`;
- payload hash:
  `7c453b4ad305771643a99a85ade456f44973bb226c43f032b1115ec81b37dee7`;
- timestamp: `2026-07-29T18:53:06+00:00`.

The verifier rechecked the English source hashes, mapped Core and ACF fields,
all eight translation-meta fields, reviewer, review date, locale, identity,
and the exact seven-record batch.

## 6. Authorized Publish Result

The publish command was invoked exactly once:

```text
sudo -n -u www-data wp \
  --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import publish \
  --run-id=m5e5-zh-p0-20260729T145320Z \
  --confirm-run-id=m5e5-zh-p0-20260729T145320Z \
  --format=json
```

Raw result:

- exit code: `0`;
- status: `published`;
- records: `7`;
- localized IDs: `240`, `241`, `242`, `243`, `244`, `245`, `246`;
- timestamp: `2026-07-29T18:55:29+00:00`.

| CMS ID | Source ID | Post type | Publish result |
|---:|---:|---|---|
| 240 | 48 | Product | published |
| 241 | 47 | Product | published |
| 242 | 6 | Product | published |
| 243 | 222 | Product | published |
| 244 | 142 | Solution | published |
| 245 | 140 | Solution | published |
| 246 | 138 | Solution | published |

No second publish was attempted.

## 7. Post-Publish Integrity Comparison

The publish changed the seven target statuses from draft to publish.

| Check | Before | After | Result |
|---|---:|---:|---|
| Chinese draft | 7 | 0 | expected |
| Chinese publish | 0 | 7 | expected |
| Localized IDs | 240–246 | 240–246 | unchanged |
| Eighth localized record | absent | absent | passed |
| Postmeta | 2558 | 2558 | unchanged |
| Posts | 201 | 208 | **blocked** |
| Translation-meta rows per key | 7 | 7 | unchanged |

After excluding only the expressly allowed target status and WordPress date
fields, the complete Chinese Core/ACF/meta export hash was identical:

`4b0b83778dfb6b8ae5f73cadd0abf34e40e0e5624054763e0197a4f83635fb26`

The complete English-source export hash, including modification timestamps,
was identical:

`0f9b02238fe28524554bddda94ff8659135be66fd40061ab52f51778b6165349`

The active-plugin export was also identical.

Therefore:

- Chinese titles, slugs, excerpts, content, ACF, SEO fields, breadcrumbs,
  and all eight translation-meta values did not change;
- reviewer, review date, source ID, locale, group, and payload hash did not
  change;
- all seven English sources remained unchanged;
- no eighth localized record appeared.

## 8. Blocking Database Drift

Read-only SQL diagnosis identified the seven additional rows:

| New row | Parent | Type | Status | Slug |
|---:|---:|---|---|---|
| 247 | 240 | revision | inherit | `240-revision-v1` |
| 248 | 241 | revision | inherit | `241-revision-v1` |
| 249 | 242 | revision | inherit | `242-revision-v1` |
| 250 | 243 | revision | inherit | `243-revision-v1` |
| 251 | 244 | revision | inherit | `244-revision-v1` |
| 252 | 245 | revision | inherit | `245-revision-v1` |
| 253 | 246 | revision | inherit | `246-revision-v1` |

The rows are WordPress revisions created during status publication. They
carry no new postmeta, which is why Postmeta remained `2558`.

Although these rows are consistent with normal WordPress revision behavior,
the M5E-7 authorization explicitly required Posts `201 → 201` and listed
only target status/date changes as permitted. The observed `201 → 208`
therefore falls outside the authorized acceptance boundary and requires a
**BLOCKED** conclusion.

No revision was deleted and no database repair or rollback was attempted.

## 9. REST, Hreflang, and Health Check Status

A targeted read-only REST sample originally appeared to confirm both a Product
pair (`48`/`240`) and a Solution pair (`142`/`244`). M5E-7A replaced that
incomplete sample with a full seven-pair audit. The full audit confirmed:

- source language `en`;
- localized language `zh`;
- the expected `shb2b-<type>-<source-id>` translation group;
- exact `en` and `zh` translation paths;
- LTR direction for Chinese.

It also found that every source and target REST `hreflang` object contains the
`en` path but omits the expected `zh` path. The earlier statement that the
sample exposed exact `en` and `zh` hreflang paths is withdrawn.

M5E-7A completed the remaining five REST pairs and the full post-publish
service-health suite after Allan accepted the revision rows.

Pre-publish evidence retained:

- sitemap: 76 URLs;
- frontend Chinese public pages: 0;
- twelve approved Chinese frontend paths: 12/12 still 301;
- production frontend remained English-only before CMS publish.

No frontend deployment occurred. This report does not claim full
post-publish REST, sitemap, redirect, or service-health acceptance because
the phase stopped at the database-diff gate.

## 10. Final Decision

Historical M5E-7 decision: **BLOCKED**.

M5E-7A accepted the seven revision rows and initially remained **BLOCKED** on
the missing REST `zh` hreflang relationships. M5E-7B proved that the REST
field is not the production frontend hreflang source and that omitting an
unreleased 301 URL is correct. The blocker is superseded; M5F preparation is
allowed, while deployment remains unauthorized.

The seven authorized CMS records are currently published, and their approved
content, ACF, translation metadata, and English sources remain intact.
However, seven WordPress revision rows caused Posts to change from `201` to
`208`, outside the approved acceptance boundary.

The production state has been preserved for review:

- no apply;
- no second publish;
- no rollback;
- no manual database edit;
- no frontend deployment;
- no `main` push;
- no GSC request;
- no publication of the remaining 402 localized pages.

M5F Chinese P0 frontend production release preparation is **not allowed**
until Allan reviews and explicitly resolves the revision-row acceptance
question in a separate phase.
