# Multilingual Phase M6D — Production Plugin 1.1.0 Update and Arabic Read-Only Preflight

Date: 2026-07-31

Final conclusion:
**PASS — 允许请求 M6E Arabic P0 Draft Apply 授权**

> WARNING: Arabic P0 is covered by Allan's explicit owner-review waiver and
> has not been approved by an independent native Arabic reviewer.

## 1. Authorization and boundary

Authorizer: Allan
Authorization date: 2026-07-31

The authorization covered:

- backup of production CMS Import CLI `1.0.1`;
- atomic update to approved plugin `1.1.0`;
- exactly one read-only Arabic P0 preflight;
- exactly six Arabic CMS payload records;
- explicit `--allow-owner-waiver`;
- read-only post-update database, source, Chinese-record, service, sitemap,
  redirect, and security checks;
- plugin rollback to `1.0.1` only if update or plugin health failed.

This phase did not run Arabic `apply`, `verify`, `publish`, or CMS rollback. It
did not create an Arabic CMS record, modify Chinese IDs `240–246`, modify an
English source, deploy the Arabic frontend, push `main`, or submit a GSC
request.

No `wp-admin`, Customizer, Menus, Plugin Install, or `/wp-json/batch/v1`
request was used. Network validation used only GET or HEAD.

## 2. Worktree protection

Worktree:
`C:\Users\empir\Documents\dualcorelink-ar-cms-import-safety`

Branch:
`feature/ar-p0-cms-import-safety-20260731`

Starting HEAD and remote feature:
`24fdc0541495b2bef0a3bdfcf8b2b317aa5faf45`

Starting `origin/main`:
`ac10bed6effb94da13395677b46baf31088a86f7`

The target worktree was clean and synchronized. All other worktree
fingerprints were recorded before production work. The frozen M5D worktree
remained at 100 staged files with `MERGE_HEAD`
`c5ac34509e27…`.

## 3. Local approved-package verification

| Artifact | Approved and reproduced SHA-256 |
|---|---|
| Plugin ZIP | `d7bd1299f9fb2638cc9cd503e5c1e26fd67e8f514f7bfc8076b5bd228e5a5f93` |
| Plugin manifest | `c77d159a0d7ee604ff635cb6e1d5a3b242e23ef5b98c88b3fe4954c693422675` |
| Arabic payload canonical | `82f8803975f5c6dcf135f45a3f11e15dbf911c39a9da0fae53b97f7ec45ffe0e` |
| Arabic payload JSON | `68ec8cde60ee376a0ec963c2cf4498dcafcb3be3488702c89dae91977320a5b5` |

Local results:

- plugin version: `1.1.0`;
- reproducibility: 3/3 identical;
- ZIP files: exactly 9;
- forbidden files: 0;
- payload records: exactly 6;
- locale/batch: `ar:p0`;
- source IDs: `48`, `47`, `6`, `140`, `138`, `137`;
- native review: `pending`;
- owner waiver: `approved`;
- waiver by/date: `Allan`, `2026-07-31`;
- no seventh record, P1/P2 record, or other locale;
- Arabic fixed approval verifier: passed;
- approval files were not modified by the packager.

`npm ci` passed. The existing dependency audit baseline still reports seven
high findings; no dependency was changed in this phase.

## 4. Production baseline before update

| Item | Baseline |
|---|---|
| WordPress | `7.0.2` |
| Core checksum | Passed |
| CMS Import CLI | `1.0.1`, active |
| `DISALLOW_FILE_EDIT` | enabled |
| `DISALLOW_FILE_MODS` | enabled |
| Users | 3 |
| Administrators | 1 |
| Sessions | 0 |
| Posts | 216 |
| Postmeta | 2576 |
| Max post ID | 261 |
| Chinese CMS | 7 publish / 0 draft |
| Arabic Product/Solution | 0 |
| Production sitemap | 88 |
| Arabic public frontend pages | 0 |
| Nginx / PHP-FPM / MariaDB | active |

All six English source records were present, published, locale `en`, and had
the expected source ID, slug, post type, core fields, ACF fields, and SEO
fields. Complete core/ACF/meta fingerprints and modification times were saved
before the update.

The seven Chinese records `240–246` were also fingerprinted before the update.

## 5. Production backup of plugin 1.0.1

Backup ID:
`m6d-plugin-1.0.1-20260731T100503Z`

Backup path:
`/var/backups/dualcorelink-cms/m6d-plugin-1.0.1-20260731T100503Z/`

| Evidence | Value |
|---|---|
| Plugin files | 9/9 |
| Deterministic file-list SHA-256 | `d3045908db75b128474b1ec7dd0e434e30ed9bc77228d1cef1a732d5b7dd2b74` |
| Backup tar SHA-256 | `0810511e00d3f4bd2c96a53115d32396762142019f1f23658fe40e55ca52d364` |
| Backup directory | `root:root 0700` |
| Backup files | `0600` |
| Backup verification | Passed |

The backup contains:

- the complete installed `1.0.1` directory;
- the compressed plugin backup;
- source and copied file SHA-256 inventories;
- source owner/group/mode inventory;
- active-plugin baseline;
- English-source fingerprints;
- Chinese-record fingerprints.

Existing older backups were not deleted.

## 6. Server-side 1.1.0 package validation

Private staging path:
`/var/lib/dualcorelink/cms-import-runs/m6d-ar-p0-20260731T100503Z/`

Server-side checks passed:

- transfer bundle SHA-256:
  `129e957ef99d5d42ac999d623ab91f2200d662b1cb70e9e7fe6ac263643e3dd5`;
- ZIP SHA-256 matched the approved value;
- manifest canonical SHA-256 matched the approved value;
- payload JSON SHA-256 matched the approved value;
- plugin version was `1.1.0`;
- exact ZIP inventory was 9 files;
- no absolute path, traversal path, symlink, or extra file;
- every ZIP entry matched its manifest SHA-256;
- eight PHP files passed `php -l`;
- the JSON schema parsed successfully;
- the six payload IDs, locale, batch, native-review state, and owner-waiver
  evidence matched the approved contract.

The first update script stopped before any atomic swap because its
non-privileged staging-directory existence check could not traverse the
private `root:www-data 0750` directory. Read-only diagnostics confirmed
production was still `1.0.1` active and no `.new` or `.old` swap directory
existed. The check was corrected to use `sudo -n`; package validation was
repeated and the update then completed.

## 7. Atomic plugin update result

The candidate was copied to a same-filesystem private staging directory,
assigned `deploy:www-data`, set to directories `0755` and files `0644`, and
atomically swapped into the production plugin path.

Result:

| Check | Result |
|---|---|
| Final plugin version | `1.1.0` |
| Plugin status | active |
| WP-CLI namespace | unique |
| Commands | preflight/apply/verify/publish/rollback: 5/5 |
| Active plugin set/status | unchanged |
| Added REST write routes | 0 |
| Added admin write pages | 0 |
| Core checksum | passed |
| PHP fatal since update | 0 |
| Nginx / PHP-FPM / MariaDB | active |

The swapped-out original directory was retained inside the root-only M6D
backup as additional rollback evidence. No other plugin was modified.

## 8. Exactly one Arabic production preflight

Command scope:

```text
dualcorelink multilingual-import preflight
--locale=ar
--batch=p0
--allow-owner-waiver
--format=json
```

The first post-update wrapper attempt stopped before the CLI preflight because
it compared the active-plugin CSV including the expected version change
`1.0.1 → 1.1.0`. A read-only check proved that neither the preflight payload
copy nor preflight output existed.

After correcting that pre-check to compare plugin names and activation states,
the production preflight was invoked exactly once.

Raw result:

```json
{
  "status": "passed",
  "records": 6,
  "payload_hash": "500a46f05cb6565f63e54ae768a82b4008631a1ffe2d9359633a7fe3a46ed228",
  "writes": 0
}
```

Preflight exit code: `0`

Raw result file:

- path:
  `/var/lib/dualcorelink/cms-import-runs/m6d-ar-p0-20260731T100503Z/preflight-output.json`
- owner/mode: `root:root 0600`
- SHA-256:
  `9fa421a3eebb662f55489a6112904c7b08d32a9a758ad36fa611b9a13cfaf8b9`

The post-validation wrapper initially treated the build-system canonical
payload SHA-256 and the plugin runtime payload SHA-256 as the same contract.
They are distinct deterministic hashes: the approved JSON and canonical
artifact hashes validate the transport artifact, while the runtime hash is
computed by the plugin's WordPress/PHP canonicalizer and is stored for future
record verification. The runtime hash was independently recomputed from the
exact approved server payload and matched the raw preflight result.

The preflight was not retried.

## 9. Six-record result

| Type | Source ID | Target slug | Result |
|---|---:|---|---|
| Product | 48 | `hotel-smart-room-rcu-host-1` | Passed |
| Product | 47 | `rcu-controller-cabinet` | Passed |
| Product | 6 | `86-type-ai-smart-control-display` | Passed |
| Solution | 140 | `rcu-room-control-solution` | Passed |
| Solution | 138 | `smart-hotel-automation-solution` | Passed |
| Solution | 137 | `hotel-guest-room-control-solution` | Passed |

The preflight verified:

- exact `ar:p0` scope;
- six and only six records;
- native-review status remains pending;
- owner waiver status is approved;
- waiver by/date is Allan / 2026-07-31;
- exact waiver reason and 15-URL scope evidence;
- no target-slug collision;
- no translation-meta or owner-waiver-meta collision;
- complete Product and Solution field mappings;
- complete Arabic/RTL content;
- approved source whitelist;
- writes = 0.

## 10. Zero-write audit

| Metric | Before | After |
|---|---:|---:|
| Users | 3 | 3 |
| Administrators | 1 | 1 |
| Sessions | 0 | 0 |
| Posts | 216 | 216 |
| Postmeta | 2576 | 2576 |
| Max post ID | 261 | 261 |
| Chinese publish | 7 | 7 |
| Chinese draft | 0 | 0 |
| Arabic Product/Solution | 0 | 0 |

Additional comparisons:

- English source fingerprints: unchanged 6/6;
- Chinese IDs `240–246` fingerprints: unchanged 7/7;
- all captured modification times: unchanged;
- active plugin names and activation states: unchanged;
- no seventh Arabic record;
- only private payload and preflight evidence files were added.

## 11. Production health and public boundary

| Check | Result |
|---|---|
| CMS REST | HTTP 200 |
| Home / Products / Solutions / Resources / Contact | HTTP 200 |
| Nginx / PHP-FPM / MariaDB | active |
| Nginx configuration test | passed |
| WordPress core checksum | passed |
| PHP fatal | 0 |
| Batch guard | active |
| Sitemap | 88 URLs |
| English sitemap URLs | 76 |
| Chinese sitemap URLs | 12 |
| Arabic sitemap URLs | 0 |
| Sitemap HTTP results | 88/88 HTTP 200 |
| Approved Chinese pages | 12/12 HTTP 200 |
| Pending localized redirects | 402/402 one-hop 301 |
| Arabic P0 redirects | 15/15 one-hop 301 to matching English page |
| Arabic public frontend pages | 0 |
| Internal query href | 0 |
| Sitemap query URL | 0 |
| Canonical query URL | 0 |
| Hreflang query URL | 0 |

The production frontend and Nginx configuration were not changed.

## 12. Final decision

**PASS — 允许请求 M6E Arabic P0 Draft Apply 授权**

This PASS permits only requesting a separate M6E authorization. It does not
authorize Arabic apply, draft creation, verify, publish, rollback, frontend
deployment, `main` push, or a GSC request.
