# DualCoreLink SEO Growth — Multilingual Phase M5E-5B

## Production Plugin 1.0.1 Update and Read-Only Verify Recovery

Date: 2026-07-30

Final status: **PASS — M5E-6 Draft Content Review may begin**

Publish remains unauthorized.

## 1. Authorization and Fixed Package Approval

Allan approved the verifier package on 2026-07-30:

- Plugin version: `1.0.1`
- ZIP SHA-256:
  `c419df6e422a72cfdee40b932520fab717ccde01b80529aeeeaabf6e58024f44`
- Manifest canonical SHA-256:
  `0fe777ecd1bf401f5f443e47a1ed52e13e61d9b901095e1300a988ac7df7e0c9`
- Implementation commit:
  `3ba48384387deb495a42516a303ecbec24bec175`
- Approval-record commit:
  `2d2b34094090aad316f32bdd50f27ee9fc4033b6`

The approval record was updated only with the approved hashes, approver,
approval date, and implementation commit. Three local deterministic builds
matched. Package verification and approved-package verification passed, and
the packaging process did not modify the approval record.

The approval commit was pushed non-forcibly only to
`feature/multilingual-cms-import-safety-20260729`. `origin/main` remained
`9130c58190a8ded92c06127f48fff682b831ded5`; no production deployment was
triggered by the feature push.

The previous `1.0.0` package approval, installation report, and production
evidence remain preserved in the earlier M5E reports.

## 2. Pre-Update Production Baseline

The WordPress path resolved from:

`/srv/dualcorelink/wordpress/current`

to the current versioned WordPress release. Before package staging or plugin
replacement:

| Check | Result |
|---|---|
| Importer plugin | `1.0.0`, active |
| Installed plugin files | 9 |
| Posts | 201 |
| Postmeta rows | 2558 |
| Chinese localized IDs | exactly `240`–`246` |
| Chinese drafts | 7 |
| Chinese published records | 0 |
| Eighth Chinese record | absent |
| Translation-meta counts | 7 for each of all 8 keys |
| Active plugins | 3 |
| Active-plugins canonical hash | `0d6a6961be7f4abf056cd7d8ebbef7bba03e521837c698bc488cd6584eaf78ae` |
| Existing run pre-image | present |
| Existing run evidence files | 5 before recovered verify |
| Production sitemap | 76 URLs |
| Public non-English approved pages | 0 |

Existing run:

`/var/lib/dualcorelink/cms-import-runs/m5e5-zh-p0-20260729T145320Z`

The run contained `checksums.json`, `request.json`, `operations.json`,
`pre-image.json`, and `preflight.json`.

The M5E-4 database backup remained present, passed gzip integrity, and
retained SHA-256:

`aaedce641ae4477f7cfa29b286ffd44839b5d7929fe3f70eb7aa153665e02c6b`

## 3. Production Candidate Verification

The package was deterministically rebuilt from implementation commit
`3ba48384387deb495a42516a303ecbec24bec175` under the private, non-web staging
root:

`/var/lib/dualcorelink/cms-import-staging/m5e5b-20260729T165343Z`

Server-side validation confirmed:

- ZIP SHA-256 matched the approved value.
- Manifest's canonical `manifestSha256` matched the approved value.
- The archive contained exactly 9 approved paths.
- No archive path was absolute or traversed outside the plugin directory.
- Plugin version was `1.0.1`.
- All 8 PHP files passed `php -l`.
- No fixture, credential, log, or database file was present in the ZIP.

The manifest JSON file's outer file hash is not the approval hash; the
approval pins its canonical `manifestSha256` field, consistent with the
repository verifier. This distinction was checked locally and on the server.

## 4. Version 1.0.0 Backup

The active `1.0.0` plugin was backed up outside the web root:

`/var/backups/dualcorelink-cms/m5e5b-plugin-1.0.0-20260729T170411Z`

Backup archive:

`dualcorelink-multilingual-import-cli-1.0.0.tar.gz`

Archive SHA-256:

`f46566bbf0f5ef1fc174a52104eb536769a7bed97249e7e97b6eac7dd7804aba`

The backup root is `root:root` mode `0700`. The archive, file inventory, and
checksum file are `root:root` mode `0600`, and checksum verification passed.
The original swapped directory was subsequently moved into the same backup
root as `old-plugin-directory`, with root-only ownership and permissions.
No old importer copy remains under the public plugin directory.

## 5. Atomic Plugin Update

The new tree was prepared on the same filesystem with:

- owner/group: `deploy:www-data`
- directory mode: `0755`
- file mode: `0644`
- files: 9
- PHP lint: passed

The current and staged plugin directories were exchanged atomically with
Linux `renameat2(..., RENAME_EXCHANGE)`. The syscall returned `0` with
`errno=0`.

Immediate checks passed:

| Check | Result |
|---|---|
| Production importer version | `1.0.1` |
| Plugin status | active |
| Files | 9 |
| WP-CLI namespace | registered |
| Import REST routes | 0 |
| Admin write hooks/pages | 0 |
| Active plugin count/hash | unchanged, 3 |
| PHP fatal/parse errors | 0 |

No other plugin was modified and `active_plugins` was not changed.

## 6. Authorized Read-Only Verify

Exactly one verify command was run:

```text
sudo -n -u www-data wp \
  --path=/srv/dualcorelink/wordpress/current \
  dualcorelink multilingual-import verify \
  --run-id=m5e5-zh-p0-20260729T145320Z \
  --format=json
```

Raw result:

- status: `passed`
- exit code: `0`
- records: `7`
- localized IDs: `240`, `241`, `242`, `243`, `244`, `245`, `246`
- payload hash:
  `7c453b4ad305771643a99a85ade456f44973bb226c43f032b1115ec81b37dee7`
- verify timestamp: `2026-07-29T17:12:38+00:00`

The recovered verifier accepted WordPress canonical numeric meta strings only
for the two declared integer translation fields. It confirmed all seven
records without relaxing comparison for core, ACF, or other translation
metadata.

All records remained:

- status `draft`
- locale `zh`
- reviewer `Allan`
- review date `2026-07-29`
- translation schema version `1`
- approved source ID and slug
- approved payload hash
- complete core and mapped ACF fields

The only new run artifact was private `verify.json`, SHA-256:

`11d8b4b3316cde74e65570b398752308d99e23d5cd8dac5cd99ca2a8e554f5d9`

The run directory file count changed from 5 to 6 solely because of this
allowed private verification log.

## 7. Zero-Write Verification Audit

The following values were identical immediately before and after verify:

| Check | Before | After |
|---|---:|---:|
| Posts | 201 | 201 |
| Postmeta rows | 2558 | 2558 |
| Chinese drafts | 7 | 7 |
| Chinese published records | 0 | 0 |
| Translation-meta rows per key | 7 | 7 |
| Active plugins | 3 | 3 |

Draft hashes were identical before and after:

| ID | Canonical post + ACF + translation-meta SHA-256 |
|---:|---|
| 240 | `2de7bc266e87ebfb3a37fae1bca72f035fee66b832c4def2871428b3cec850513` |
| 241 | `59e4403937d316e53194accbb3d3294d3358a6686059b50c65143a28f77d24c3` |
| 242 | `b61dca806373bd5dbd5a7fd38de18a8291c89fec8bc38298b10c4ad060a4f713` |
| 243 | `d24659ed3f873649c42a31959d31ad143ffbdb016015b906a071713480fce2e4` |
| 244 | `9af01f224c4778cdae19248740571ff595a782d6cb94c02216a43292a3dcad9d` |
| 245 | `2c56606749767f29c9aeee2bcd6560837f8a4f6314dc644b36ef503f1b78ad15d` |
| 246 | `b3713def54302e0cb24497a9d5f54d4f7b39a91ce55ee200ca88e7ca2280b93e` |

English source post + ACF hashes were identical before and after:

| ID | SHA-256 |
|---:|---|
| 48 | `fe236026d19be484f4ba1486909fb865b2ff71042ffcf9c39685f8923c8f7272` |
| 47 | `914f3cf5e61aca58ad21b77682f280a7d0ad6828b4c11bda455ab726748b51c1` |
| 6 | `908ff62d88c9e9deb041fa969143c01c4425ec041d5ab90058dfb1b9446ffee2` |
| 222 | `f597f018bac0eb2b5c05e941049338d2413459128dc1c88447741b498b80b73` |
| 142 | `4903a6d7e7848820baed2017cd23fa59df73b6334a075e91ced8693399021825c` |
| 140 | `f654c6b26802d9bd662ddb61fee6f840ebaeaa5788801d8644d514bda7319194` |
| 138 | `3c7531890445826c02002988951ac93337548e661557f37bd15be536b91feb5` |

All corresponding modification timestamps were unchanged. No eighth Chinese
record and no record for another language appeared.

## 8. Production Health and Public Boundary

| Check | Result |
|---|---|
| Nginx | active |
| PHP-FPM | active |
| MariaDB | active |
| CMS REST root | HTTP 200 |
| Public homepage | HTTP 200 |
| Public Products page | HTTP 200 |
| Sitemap URLs | 76 |
| Twelve approved Chinese frontend URLs | 12/12 HTTP 301 |
| Public non-English pages in approved batch | 0 |
| Contact `source_page` query occurrences | 0 |
| Contact `content_type` query occurrences | 0 |
| Contact `content_slug` query occurrences | 0 |
| Contact `cta_position` query occurrences | 0 |
| Products `category` query occurrences | 0 |
| Products `series` query occurrences | 0 |
| PHP fatal/parse errors | 0 |

Production remains English-only. No frontend, sitemap, hreflang, canonical,
robots, schema, native-review state, or GSC change occurred.

## 9. Final Decision

**PASS — M5E-6 Draft Content Review may begin.**

This decision authorizes only the separately scoped draft content review.
Publish is not authorized. This phase did not rerun `apply`, execute
`publish`, execute CMS `rollback`, deploy the frontend, push `main`, resume
the frozen M5D worktree, process the other 402 pages, or submit any GSC
request.
