# Multilingual Phase M6E — Arabic P0 Production Draft Apply

Date: 2026-07-31
Authorizer: Allan
Decision: **BLOCKED**

## 1. Authorized scope

Allan authorized exactly six Arabic P0 CMS drafts for source IDs `48`, `47`,
`6`, `140`, `138`, and `137`, with one explicit owner-waiver preflight, one
draft-only apply, and—only after complete apply success—one read-only verify.
Publish, a second apply, `--allow-update`, rollback, manual database changes,
frontend deployment, `main` push, and GSC requests were not authorized.

The approved evidence remained:

| Item | Approved value |
|---|---|
| Plugin | `dualcorelink-multilingual-import-cli` `1.1.0` |
| Payload canonical SHA-256 | `82f8803975f5c6dcf135f45a3f11e15dbf911c39a9da0fae53b97f7ec45ffe0e` |
| Payload JSON SHA-256 | `68ec8cde60ee376a0ec963c2cf4498dcafcb3be3488702c89dae91977320a5b5` |
| Native review | `pending` |
| Owner waiver | Allan, `2026-07-31` |

## 2. Worktree protection

The target remained
`feature/ar-p0-cms-import-safety-20260731` at
`24fdc0541495b2bef0a3bdfcf8b2b317aa5faf45`. The remote feature ref remained
the same, and `origin/main` remained
`ac10bed6effb94da13395677b46baf31088a86f7`.

The existing uncommitted M6D report was preserved. Only this M6E report and
`docs/reports/latest-status.md` were changed for M6E. No other worktree was
modified.

## 3. Pre-apply blocking defect

Code review before any CMS write found that the approved and installed `1.1.0`
plugin cannot safely persist the required Arabic owner-waiver metadata:

- `class-renderer.php` adds all five approved owner-waiver keys to the mapped
  `meta` array for Arabic records;
- `class-wordpress-repository.php::write_meta()` accepts only keys in
  `DualCoreLink_Import_Config::META_KEYS`;
- it does not also accept
  `DualCoreLink_Import_Config::OWNER_WAIVER_META_KEYS`;
- production read-only inspection confirmed five renderer owner-waiver key
  references and zero repository references to the owner-waiver whitelist.

The relevant production condition is equivalent to:

```php
if (!in_array($key, DualCoreLink_Import_Config::META_KEYS, true)) {
    throw new DualCoreLink_Import_Exception(
        'Attempted to write an unapproved translation meta key.',
        DualCoreLink_Import_Config::EXIT_SAFETY
    );
}
```

This is not a harmless validation mismatch. `create()` calls
`wp_insert_post()`, writes ACF fields, and then calls `write_meta()`. The eight
translation meta values precede the five waiver values in the mapped array.
Consequently, an Arabic apply can create the post and write ACF/translation
metadata before throwing on the first owner-waiver key. The apply path does
not automatically remove that partially created record.

That violates the M6E requirements of complete `6/6` success, no partial
success, five waiver meta per record, and no seventh or abnormal record.

## 4. Production read-only confirmation

The installed production copy was inspected through the signed-in Lightsail
terminal without using `wp-admin`, `/batch/v1`, or any REST write method.

| Check | Result |
|---|---|
| Installed plugin | `1.1.0`, active |
| Renderer owner-waiver references | `5` |
| Repository owner-waiver whitelist references | `0` |
| Users | `3` |
| Posts | `216` |
| Postmeta | `2576` |
| Maximum post ID | `261` |
| Arabic Product/Solution records | `0` |
| Chinese CMS | `7 publish / 0 draft` |
| Nginx | active |
| PHP-FPM | active |
| MariaDB | active |
| Sitemap URLs | `88` |

No M6E run directory was created. A filesystem check for the proposed unique
run ID `m6e-ar-p0-20260731T145403Z` returned `absent`.

## 5. Commands intentionally not executed

Because the defect was confirmed before the final preflight and before backup
preparation for an apply, execution stopped immediately as required.

| Operation | Result |
|---|---|
| M6E database backup | Not created; apply preparation stopped before the write phase |
| M6E final preflight | Not executed |
| Arabic draft apply | Not executed |
| Verify | Not executed |
| Publish | Not executed |
| Rollback | Not executed |
| Frontend deployment | Not executed |
| `main` push | Not executed |

No preflight, apply, or verify command was retried or partially invoked.

## 6. Zero-write result

The production state remained at the established M6D baseline:

| Boundary | Before | After |
|---|---:|---:|
| Users | 3 | 3 |
| Posts | 216 | 216 |
| Postmeta | 2576 | 2576 |
| Maximum post ID | 261 | 261 |
| Arabic Product/Solution | 0 | 0 |
| Chinese publish | 7 | 7 |
| Chinese draft | 0 | 0 |

No new Arabic record, extra post, revision, auto-draft, changeset, request,
translation meta, owner-waiver meta, or private M6E run was created. The
English source and Chinese CMS records were not modified.

## 7. Required remediation before a new apply authorization

Do not reuse this M6E authorization. A separate implementation phase must:

1. extend the repository whitelist only to the five exact
   `OWNER_WAIVER_META_KEYS` in addition to the existing eight translation keys;
2. preserve rejection of all other metadata keys;
3. add a WordPress-repository-path test proving an Arabic create writes all
   eight translation and five waiver meta values without partial state;
4. add failure tests proving unknown keys still fail before a persistent
   partial record is left behind;
5. version, package, reproduce, and independently approve new plugin hashes;
6. update production only under a new authorization, then repeat a read-only
   preflight and request a fresh draft-apply authorization.

No code remediation was performed in M6E because the authorized worktree
scope allowed only the report and latest status update.

## 8. Final decision

**BLOCKED**

M6F Arabic Draft Content Review is not allowed because no Arabic drafts were
created. The next safe phase is a narrowly scoped importer whitelist fix,
tests, deterministic package regeneration, hash approval, and controlled
production plugin update before requesting a new draft apply.

WARNING: Arabic P0 remains under Allan's owner review waiver and has not been
approved by an independent native Arabic reviewer.
