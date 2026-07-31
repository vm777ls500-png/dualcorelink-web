# Multilingual Phase M6C-1 — Arabic P0 Approved Package Record and Production Compatibility Audit

Date: 2026-07-31
Conclusion: **PASS**

> WARNING: Arabic P0 is covered by an explicit business-owner review waiver.
> It has not been approved by an independent native Arabic reviewer.

## 1. Scope and safety boundary

This phase recorded Allan's approved Arabic P0 package hashes, reproduced the
approved artifacts locally, and performed a read-only production compatibility
audit.

No production plugin was installed or updated. No production `preflight`,
`apply`, `verify`, `publish`, or `rollback` command was executed. No CMS,
database, server configuration, frontend, `main`, deployment, or GSC write
occurred.

Worktree:
`C:\Users\empir\Documents\dualcorelink-ar-cms-import-safety`

Branch:
`feature/ar-p0-cms-import-safety-20260731`

## 2. Immutable approval record

The Arabic approval is stored separately from the Chinese approval:

`config/multilingual-cms-import-package-approval-ar-p0.json`

| Field | Approved value |
|---|---|
| Plugin version | `1.1.0` |
| Implementation commit | `fb3fb2b4b480416351e469de8cca670a96d05966` |
| Plugin ZIP SHA-256 | `d7bd1299f9fb2638cc9cd503e5c1e26fd67e8f514f7bfc8076b5bd228e5a5f93` |
| Plugin manifest SHA-256 | `c77d159a0d7ee604ff635cb6e1d5a3b242e23ef5b98c88b3fe4954c693422675` |
| Arabic payload canonical SHA-256 | `82f8803975f5c6dcf135f45a3f11e15dbf911c39a9da0fae53b97f7ec45ffe0e` |
| Arabic payload JSON SHA-256 | `68ec8cde60ee376a0ec963c2cf4498dcafcb3be3488702c89dae91977320a5b5` |
| Approved by | `Allan` |
| Approved date | `2026-07-31` |
| Review basis | `owner-review-waiver` |

The existing Chinese `1.0.1` approval record was not changed. The Arabic
approval record was committed as
`6a7213f7c7ff2f33a31ff01fe71d5e89cccb56cc`.

## 3. Approved package reproduction

The package and payload were regenerated locally without changing either
approval record.

| Check | Result |
|---|---|
| Plugin reproducibility | Passed, 3/3 identical builds |
| Plugin runtime inventory | Exactly 9 files |
| Forbidden package files | 0 |
| ZIP SHA-256 | Exact approved match |
| Manifest SHA-256 | Exact approved match |
| Arabic payload records | Exactly 6 |
| Payload canonical SHA-256 | Exact approved match |
| Payload JSON SHA-256 | Exact approved match |
| Arabic approval verifier | Passed |
| Existing Chinese approval | Unchanged |

The exact Arabic CMS scope is:

| Type | English source ID | Slug |
|---|---:|---|
| Product | 48 | `hotel-smart-room-rcu-host-1` |
| Product | 47 | `rcu-controller-cabinet` |
| Product | 6 | `86-type-ai-smart-control-display` |
| Solution | 140 | `rcu-room-control-solution` |
| Solution | 138 | `smart-hotel-automation-solution` |
| Solution | 137 | `hotel-guest-room-control-solution` |

## 4. Local regression results

| Validation | Result |
|---|---|
| `npm ci` | Passed; existing npm audit baseline: 7 high findings |
| CMS import TypeScript tests | Passed: 65/65 |
| CMS import PHP tests | Passed: 64/64 |
| Fixture preflight | Passed; zh 7/7, ar 6/6, writes 0 |
| `multilingual:audit` | Passed: 414/414 |
| Arabic owner-waiver gate | Passed: 15/15 pages, 6/6 CMS records |
| Arabic gate without waiver | Controlled failure |
| Full-site release gate | Controlled failure; 402 pending |
| Project tests | Passed: 217/217 |
| Lint | Passed: 0 errors |
| Media audit | Passed: 0 errors; 1 existing warning |
| Build | Passed: 163/163 |
| Static export audit | Passed |
| Candidate static output | 12 Chinese pages; 0 Arabic pages |
| Candidate sitemap | 88 URLs |
| `git diff --check` | Passed |

## 5. Production read-only baseline

The production audit was performed through the authenticated Lightsail
terminal using read-only commands only.

| Item | Result |
|---|---|
| WordPress | `7.0.2` |
| WordPress core checksum | Passed |
| Active importer | `dualcorelink-multilingual-import-cli` `1.0.1` |
| Importer runtime files | 9 |
| Other active plugins | ACF `6.8.5`; content architecture `1.0.0` |
| `DISALLOW_FILE_EDIT` | Enabled |
| `DISALLOW_FILE_MODS` | Enabled |
| `FORCE_SSL_ADMIN` | Enabled |
| Debug mode | Not enabled |
| Nginx | Active; configuration test passed |
| PHP-FPM | Active |
| MariaDB | Active |
| CMS REST and public frontend | HTTP 200 |
| Cloudflare | CMS remains proxied under the verified Full (strict) baseline |

The importer directory is owned by `deploy:www-data` with mode `0755`. Its
nine installed files exactly match the deterministic, normalized bytes from
the approved `1.0.1` source commit
`3ba48384387deb495a42516a303ecbec24bec175`.

The first raw-source comparison differed because the deterministic packager
normalizes BOM, line endings, and trailing newlines. A second comparison using
the packager's exact normalization rules matched all 9/9 production files.

The run-store root is owned by `www-data:www-data` with mode `0750`. It
contains one existing Chinese run and no Arabic run. Upload executable count
is zero. No unexpected plugin directory was found.

## 6. Database and content boundary

| Metric | Before | After |
|---|---:|---:|
| Posts | 216 | 216 |
| Postmeta | 2576 | 2576 |
| Maximum post ID | 261 | 261 |
| Arabic Product/Solution records | 0 | 0 |

Additional read-only baseline:

- WordPress users: 3
- Administrators: 1
- Active session tokens: 0
- Application-password rows: 0
- Chinese Product/Solution publish records: 7
- Chinese drafts: 0
- Arabic Product/Solution records: 0

All six English source records exist, are published, use locale `en`, and have
the expected Product or Solution type and slug. Read-only content and ACF
fingerprints were captured. No command in this audit could modify them.

Slug collision checks found only the expected English/Chinese relation rows.
There is no Arabic collision and no seventh Arabic CMS candidate.

The existing eight translation-meta keys each have seven rows for the Chinese
batch. All five Arabic owner-waiver meta keys currently have zero production
rows, which is correct before an Arabic apply. Their names do not collide with
the eight translation-meta keys.

## 7. Version 1.0.1 to 1.1.0 compatibility

The `1.1.0` change is compatible with the current production baseline:

- translation schema remains version `1`;
- the existing Chinese numeric-meta normalization remains unchanged;
- existing Chinese run evidence remains readable;
- Arabic owner-waiver evidence is additive and restricted to `ar:p0`;
- owner waiver cannot be represented as native approval;
- Chinese and other locales reject the Arabic waiver;
- the plugin registers import commands only under WP-CLI;
- no public REST write route, admin write page, activation migration, or
  automatic database mutation was added;
- existing Product and Solution ACF mappings required by the six Arabic
  records are present in production.

## 8. Required M6D installation and rollback plan

This audit does not perform the following plan. A separate Allan authorization
is required.

1. Reconfirm the approved `1.1.0` ZIP, manifest, payload, source commit, and
   exact nine-file inventory.
2. Capture fresh Posts, Postmeta, active-plugin, English-source, Chinese-record,
   run-store, and service baselines.
3. Create a root-owned, timestamped backup of the currently installed `1.0.1`
   plugin outside the web root. The server presently retains the older
   `1.0.0` backup, so creating a fresh `1.0.1` backup is a mandatory M6D
   pre-update step.
4. Extract to a new temporary directory, verify all hashes and file modes, and
   atomically replace only the importer plugin directory.
5. Run WordPress core checksum, plugin-version/inventory checks, WP-CLI command
   registration checks, and service health checks.
6. If separately authorized, run exactly one read-only Arabic preflight with
   `--allow-owner-waiver`. Do not run apply, verify, publish, or rollback.
7. Compare all production counters and fingerprints with the pre-update
   baseline.
8. On any package, activation, checksum, command-registration, service, or
   boundary failure, atomically restore the new `1.0.1` backup and repeat the
   read-only checks.

## 9. Retained risks

- Arabic P0 has no independent native-language approval.
- The business owner has explicitly accepted that language-quality risk.
- The existing npm audit baseline contains seven high findings; this phase
  does not change dependencies.
- A current-version `1.0.1` server backup must be created immediately before
  any authorized update.
- Passing this audit does not authorize a plugin update, production
  preflight, Arabic draft creation, publishing, rollback, frontend release, or
  GSC action.

## 10. Final decision

**PASS — 允许请求 M6D 受控插件 1.1.0 更新和生产只读 Arabic Preflight 授权**

This PASS authorizes only requesting the next explicit approval. It does not
authorize executing M6D.
