# Multilingual Phase M6E-2 — Plugin 1.1.1 Production Preflight

Date: 2026-08-01

Final conclusion: **BLOCKED**

## 1. Authorization

Authorizer: Allan
Approved date: 2026-08-01

Approved candidate:

| Item | Approved value |
|---|---|
| Plugin version | `1.1.1` |
| Implementation commit | `8d9a4c65c9cf518d0bffe9dddb36cbedf29f5724` |
| Plugin ZIP SHA-256 | `a42fc429c46ccb4848fbfb7cbec40938061086dedbb4a2f0d09016e0e05114e2` |
| Plugin manifest SHA-256 | `b080969df2ca6ab14d43b459d9d47de4aad61515d0177f26b8dc46f3c56de65a` |
| Arabic payload canonical SHA-256 | `82f8803975f5c6dcf135f45a3f11e15dbf911c39a9da0fae53b97f7ec45ffe0e` |
| Arabic payload JSON SHA-256 | `68ec8cde60ee376a0ec963c2cf4498dcafcb3be3488702c89dae91977320a5b5` |
| Review basis | `owner-review-waiver` — not native review approval |

The authorization permitted an atomic production plugin update and exactly
one Arabic P0 read-only preflight only after a completely healthy production
baseline. It did not authorize apply, verify, publish, rollback, Arabic draft
creation, frontend deployment, `main` push, or GSC requests.

## 2. Fixed approval record

The independent Arabic approval record was updated without modifying the
historical Chinese `1.0.1` approval evidence.

Approval commit:
`10e87b2f170d7711d60c67d3fc6879a966e3e22b`

The following local checks passed:

- three deterministic plugin builds reproduced the approved ZIP and manifest;
- package verification passed with exactly nine files;
- Arabic payload generation reproduced both approved payload hashes;
- Arabic approval verification passed when explicitly given
  `config/multilingual-cms-import-package-approval-ar-p0.json`;
- the packaging commands did not modify the approval record;
- the commit was pushed only to
  `feature/ar-p0-cms-import-safety-20260731`;
- `origin/main` remained
  `ac10bed6effb94da13395677b46baf31088a86f7`.

The CLI's generic `--locale` and `--batch` arguments do not select an approval
file; the explicit `--approval` path was therefore used to verify the Arabic
record. No implementation file was changed in the approval commit.

## 3. Production read-only baseline

The baseline was collected through the signed-in Lightsail SSH terminal using
read-only WordPress, database, systemd, Nginx, and HTTPS checks.

| Boundary | Observed value | Required value | Result |
|---|---:|---:|---|
| WordPress core checksums | exit `0` | pass | Passed |
| CMS Import CLI | `1.1.0`, active | `1.1.0`, active | Passed |
| Users | `3` | `3` | Passed |
| Administrators | `1` | `1` | Passed |
| Sessions | `0` | `0` | Passed |
| Posts | `216` | `216` | Passed |
| Postmeta | `2576` | `2576` | Passed |
| Maximum post ID | `261` | `261` | Passed |
| Chinese publish / draft | `7 / 0` | `7 / 0` | Passed |
| Arabic Product/Solution records | `0` | `0` | Passed |
| `DISALLOW_FILE_EDIT` | enabled | enabled | Passed |
| `DISALLOW_FILE_MODS` | enabled | enabled | Passed |
| PHP-FPM | active | active | Passed |
| MariaDB | active | active | Passed |
| Nginx | failed | active | **Failed** |
| Local HTTPS | `000` | HTTP success | **Failed** |
| Production-domain HTTPS | `000` | HTTP success | **Failed** |
| Sitemap count | unavailable | `88` | **Blocked** |

The English-source and Chinese-record fingerprint step was not completed after
the mandatory service-health gate failed. No inference of unchanged hashes is
made in this report.

## 4. Nginx failure evidence

Read-only diagnostics confirmed:

- Nginx unit state: `failed`;
- `nginx -t`: failed;
- error: host not found in the API Gateway upstream configured at
  `/etc/nginx/snippets/dualcorelink-inquiry-api.conf:23`;
- journal timestamp: 2026-08-01 06:29:07 +08;
- Nginx stopped after the failed configuration test;
- neither `https://127.0.0.1/` with the production Host header nor
  `https://dualcorelink.com/` was reachable from the instance.

No Nginx configuration, DNS record, service state, or inquiry infrastructure
was changed during this phase.

## 5. Fail-closed result

The baseline did not meet the explicit M6E-2 prerequisite. Execution stopped
before all production mutations:

| Operation | Result |
|---|---|
| Backup of plugin `1.1.0` | Not created |
| Candidate upload/private staging | Not created |
| Server ZIP/manifest validation | Not run |
| Atomic plugin update to `1.1.1` | Not run |
| Arabic payload staging | Not created |
| Arabic preflight | Not run |
| Arabic apply/verify/publish/rollback | Not run |
| Arabic CMS drafts or published records | `0 / 0` |
| Frontend deployment / `main` push | Not run |

The production plugin remains `1.1.0` active. Posts and Postmeta remained at
216 and 2576 during the read-only baseline; no CMS write was performed.

## 6. Required next action

M6E-2 cannot continue until the Nginx/API Gateway DNS failure is resolved in a
separately authorized infrastructure incident. After Nginx is active,
`nginx -t` passes, local and external HTTPS are healthy, and sitemap 88 is
confirmed, a fresh authorization should restart M6E-2 from the complete
read-only baseline. This blocked run did not consume the one authorized Arabic
preflight because the command was never invoked.

Even after infrastructure recovery, apply, verify, publish, rollback, Arabic
draft creation, and frontend deployment remain unauthorized.
