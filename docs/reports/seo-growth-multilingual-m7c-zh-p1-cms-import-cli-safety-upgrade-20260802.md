# DualCoreLink Multilingual Phase M7C

## Chinese P1 CMS Import CLI Safety Upgrade

Date: 2026-08-02

Authorized by: Allan
Approved content source: `review/zh-p1-human-review-20260802` at
`9c27bb64b13a872bad3b7d727011ef50295ae343`

## Final result

**PASS — CMS Import CLI 1.2.0 is active in production and the exact Chinese
P1 17-record preflight passed with `writes: 0`.**

No Chinese P1 record was created, updated, or published. No `apply`, `verify`,
`publish`, or `rollback` command ran. A separate write authorization is still
required before the 17 records may be imported.

## Exact scope

The new gate accepts only locale `zh`, batch `p1`, reviewer Allan, review date
2026-08-02, and exactly 17 `productionReleaseReady` records: 15 Products and
2 Solutions.

| Source ID | Post type | Slug |
|---:|---|---|
| 219 | Product | `hotel-smart-room-rcu-host-3` |
| 190 | Product | `hotel-delivery-robot-charging-dock` |
| 189 | Product | `hotel-smart-room-rcu-host-2` |
| 188 | Product | `smart-curtain-motor` |
| 51 | Product | `smart-four-key-curtain-control-panel` |
| 50 | Product | `smart-key-card-energy-saver-panel` |
| 46 | Product | `hotel-guest-room-doorbell` |
| 45 | Product | `hotel-room-door-magnetic-sensor` |
| 43 | Product | `embedded-human-presence-sensor` |
| 13 | Product | `hotel-smart-delivery-cabinet` |
| 12 | Product | `hotel-delivery-robot` |
| 11 | Product | `ai-music-control-panel` |
| 10 | Product | `thermostat-hvac-control-panel` |
| 9 | Product | `rotary-knob-smart-control-display` |
| 8 | Product | `ai-large-smart-display` |
| 141 | Solution | `hotel-delivery-robot-solution` |
| 139 | Solution | `ai-smart-display-solution` |

Chinese P0 remains exactly 7 CMS records. Arabic P0 remains exactly 6 CMS
records and still requires the explicit owner-waiver flag. Chinese P2, other
batches, and all other locale/batch combinations remain unsupported.

## Local implementation

- Worktree: `C:\Users\empir\Documents\dualcorelink-zh-p1-cms-import-safety`
- Branch: `feature/zh-p1-cms-import-safety-20260802`
- Content preparation commit: `43655ee27dab36a69b0a229bc85f2d51ca4a25f3`
- Runtime implementation commit: `562e23f1da861fef0a3191237763f2cbaf537561`
- Approval record commit: `0c73d9d7c36bd55daf0a3c9bbc785b7e9df790d2`
- PHP zero-write assertion correction: `178b402`

The test correction does not change the plugin package. It replaces a mock
object serialization assertion—which counted read-only write-plan validation
calls as state drift—with direct assertions for 17 validations, zero localized
records, and an unchanged `wp_insert_post` call count.

## Deterministic candidate

- Plugin version: `1.2.0`
- Translation schema version: `1` (unchanged)
- Runtime files: 9
- Plugin ZIP SHA-256:
  `f4ae3aaa08ea7cd1086a64ae5770c0f7c797ca4f72baae57ee46af0e2f6de67e`
- Deterministic manifest SHA-256:
  `2ed593e76a6f18b5a6138a176d9a67d852b1a8a82859c752a84ac6e93db0d0ad`
- Manifest JSON file SHA-256:
  `478b5c227f0958df7ea192eacbcc0c543a6faefe9730f5d8b2643a045b43e119`
- Chinese P1 canonical payload SHA-256:
  `d8d87652cc9aeb4fbc1cb9220cfad44df5ac19fab346655536007210d1d75ce7`
- Chinese P1 JSON file SHA-256:
  `b177ee6de77e8b40a04a1237022c84c3bb0892b8a8722c2904dddb425786ad71`
- Reproducibility: 3/3 builds identical

## Production baseline and backup

The production baseline found the active plugin at `1.1.0`, not `1.1.1`.
File inspection confirmed this was a real older installation rather than a
stale WordPress version cache. The 1.2.0 candidate was built from the approved
1.1.1 source baseline, so it retains the 1.1.1 Arabic/P0 repository whitelist
fix while adding the exact Chinese P1 policy and tests.

Before replacement, the active 1.1.0 plugin was archived outside the Web root:

`/var/backups/dualcorelink-cms-import/m7c-zh-p1-cli-20260802T121442Z`

The directory is root-owned, mode `0700`, with evidence files mode `0600`.
The pre-update archive SHA-256 is:

`cd7674d05654aa254196eeeaaac9ef98d72fe84e0e9cd60a99c3f50c9b1b71db3`

It also contains the candidate ZIP, manifest, payload, the installed 1.2.0
file inventory, and a final SHA-256 manifest.

## Production runtime validation and update

The candidate transfer matched its local hash. On the production PHP runtime:

- all eight PHP runtime files passed `php -l`;
- the PHP safety suite passed 78/78;
- the exact 17/17 Chinese P1 preflight test passed;
- record-count and identity/review drift tests failed closed;
- no mock WordPress insert call occurred during preflight.

The plugin was replaced atomically with automatic restoration of the 1.1.0
tree on activation or version failure. Replacement succeeded:

- installed version: `1.2.0`
- status: `active`
- runtime files: 9

Production policy inspection returned:

| Policy | Result |
|---|---|
| `zh/p0`, no waiver | 7 records; Allan; 2026-07-29 |
| `zh/p1`, no waiver | 17 records; Allan; 2026-08-02 |
| `ar/p0`, explicit waiver | 6 records |
| `zh/p2` | rejected |
| `de/p1` | rejected |
| `ar/p1`, waiver | rejected |

## Chinese P1 production preflight

The exact approved payload was run once in read-only preflight mode:

```json
{
  "status": "passed",
  "records": 17,
  "writes": 0
}
```

The temporary readable payload and root-only staging directory were removed
after evidence was sealed.

## Database zero-write evidence

| Metric | Before | After |
|---|---:|---:|
| Users | 3 | 3 |
| Posts | 216 | 216 |
| Postmeta | 2576 | 2576 |
| Chinese publish | 7 | 7 |
| Chinese draft | 0 | 0 |
| Arabic CMS records | 0 | 0 |

CMS content writes: **0**.

## Validation summary

| Check | Result |
|---|---|
| CMS Import TypeScript/Node safety tests | Passed, 73/73 |
| Production PHP safety tests | Passed, 78/78 |
| Fixture preflight | Passed: zh/p0 7, ar/p0 6, zh/p1 17; writes 0 |
| Approved package verification | Passed |
| Project tests | Passed, 225/225 |
| Lint | Passed |
| Media audit | Passed; 0 errors, 1 existing warning |
| Build | Passed; 163 generated routes before cleanup |
| Multilingual audit | Passed; manifest 414/414 |
| Static export audit | Passed; 12 Chinese P0 pages, sitemap 88 |
| Chinese P0 release check | Passed, 12/12 pages and 7/7 CMS payload |
| Chinese P1 frontend release check | Not imported into this isolated CMS-safety branch |
| Full release check | Continues to block pending pages by design |
| `git diff --check` | Passed |

`npm ci` reported seven existing high-severity dependency audit findings.
Dependency remediation was outside this phase and no dependency file changed.

## Boundaries preserved

- No Chinese P1 `apply`, `verify`, `publish`, or `rollback` ran.
- No WordPress content, user, role, permission, theme, or unrelated plugin was
  modified.
- Existing Chinese P0 records remained 7 publish / 0 draft.
- Arabic CMS remained 0.
- No frontend, Nginx, Cloudflare, MariaDB, sitemap, or GSC operation ran.
- `main` was not pushed and no frontend deployment ran.
- The frozen M5D worktree was not modified.

## Next action

A separate, explicit production write authorization is required before a
Chinese P1 `apply`. That phase must take a fresh database baseline, use a
unique run ID, create drafts first, verify all 17 records, and stop before
publish unless publish is separately and explicitly authorized.
