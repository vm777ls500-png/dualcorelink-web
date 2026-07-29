# DualCoreLink SEO Growth — Multilingual Phase M5E-7A

## CMS Publish Closeout

Date: 2026-07-30

Decision: **BLOCKED**

Accepted by: **Allan**

Acceptance date: **2026-07-30**

This was a read-only production closeout. No CMS write, revision deletion,
database repair, plugin update, frontend deployment, `main` push, or GSC
request occurred.

## 1. Accepted WordPress Revisions

Allan accepted the seven revisions created by the authorized M5E-7 publish.
The Posts change from `201` to `208` is no longer considered unauthorized.

| Revision | Expected parent | Actual parent | Type | Status | Public request | Translation meta |
|---:|---:|---:|---|---|---|---:|
| 247 | 240 | 240 | revision | inherit | HTTP 404 | 0 |
| 248 | 241 | 241 | revision | inherit | HTTP 404 | 0 |
| 249 | 242 | 242 | revision | inherit | HTTP 404 | 0 |
| 250 | 243 | 243 | revision | inherit | HTTP 404 | 0 |
| 251 | 244 | 244 | revision | inherit | HTTP 404 | 0 |
| 252 | 245 | 245 | revision | inherit | HTTP 404 | 0 |
| 253 | 246 | 246 | revision | inherit | HTTP 404 | 0 |

All seven rows also satisfied `wp_is_post_revision()` with the expected
parent. They do not appear in Product or Solution REST collections, do not
appear in the frontend sitemap, and do not represent an eighth localized
Product or Solution. Their 404 responses contain no canonical or hreflang
link. The two `alternate` links observed on the CMS 404 template are generic
WordPress RSS feed links, not revision hreflang.

## 2. Seven REST Translation Pairs

| English | Chinese | Status/language/group | `translations` | Direction | Chinese SEO/metadata | REST hreflang |
|---:|---:|---|---|---|---|---|
| 48 | 240 | Pass | en + zh pass | Pass | Pass | **Fail: zh missing** |
| 47 | 241 | Pass | en + zh pass | Pass | Pass | **Fail: zh missing** |
| 6 | 242 | Pass | en + zh pass | Pass | Pass | **Fail: zh missing** |
| 222 | 243 | Pass | en + zh pass | Pass | Pass | **Fail: zh missing** |
| 142 | 244 | Pass | en + zh pass | Pass | Pass | **Fail: zh missing** |
| 140 | 245 | Pass | en + zh pass | Pass | Pass | **Fail: zh missing** |
| 138 | 246 | Pass | en + zh pass | Pass | Pass | **Fail: zh missing** |

For all seven pairs:

- the English record reports `language = en`;
- the Chinese record reports `language = zh`;
- both sides share the expected translation group;
- both `translations` objects contain the exact English and Chinese paths;
- direction is `ltr`;
- the Chinese SEO title, meta description, and breadcrumb label are present;
- no multilingual importer REST write route is exposed.

The blocker is deterministic: both sides expose the English path in the REST
`hreflang` object, while the expected `zh` key is absent for all seven pairs.
This fails the requested bidirectional hreflang acceptance criterion. No
production fix was attempted.

## 3. CMS Content Integrity

CMS IDs `240`–`246` remain `publish`. Their full core, ACF, SEO, all eight
translation meta values, reviewer `Allan`, review date `2026-07-29`, payload
hash, and rendered Chinese content are unchanged from the M5E-7 post-publish
baseline.

End-to-end fingerprints were identical at the start and end of this audit:

- target full:
  `d25625a95c3c670043e59f74bfa88889f8e428975be5ca6085380cb4ada170ea8`
- target content:
  `4b0b83778dfb6b8ae5f73cadd0abf34e40e0e5624054763e0197a4f83635fb26`
- English sources:
  `0f9b02238fe28524554bddda94ff8659135be66fd40061ab52f51778b6165349`
- revisions:
  `1a61a923da39260c273be33246ec0a0190f0de0694f946a66c54de4f0439c0a7`
- counts and translation-meta boundary:
  `8b9703b46330f69440b5f2e1d6a9c9a26420e5ce120ca599218267e720821e0a`
- active plugins:
  `6801fb2483b95a8456a83a4505154b3c3569c6a1055cc9dce207364c13c98420`

The seven English sources retained identical core, ACF, and modification-time
fingerprints. No eighth Chinese Product or Solution exists.

## 4. Zero-Write Database Boundary

| Metric | Audit start | Audit end |
|---|---:|---:|
| Posts | 208 | 208 |
| Postmeta | 2558 | 2558 |
| Chinese publish | 7 | 7 |
| Chinese draft | 0 | 0 |
| Localized IDs | 240–246 | 240–246 |
| Eighth localized record | 0 | 0 |

All eight translation-meta keys still have exactly seven rows. Active plugins
are unchanged. Target, source, revision, count, and active-plugin fingerprints
are byte-for-byte unchanged, proving the closeout itself performed zero CMS
or database writes.

## 5. Production Health and Frontend Boundary

| Check | Result |
|---|---|
| Nginx | active |
| PHP-FPM | `php8.3-fpm`, running |
| MariaDB | active |
| CMS REST | HTTP 200 |
| Homepage | HTTP 200 |
| Products | HTTP 200 |
| Solutions | HTTP 200 |
| Resources | HTTP 200 |
| Contact | HTTP 200 |
| PHP fatal since publish | 0 |
| Sitemap | 76 URLs |
| Public non-English frontend pages | 0 |
| Approved Chinese frontend paths | 12/12 remain HTTP 301 |
| `/zh/about/` | 301 to English `/en/about/` |
| Contact tracking query href | 0 |
| Product category/series query href | 0 |
| Sitemap query URL | 0 |
| Canonical/hreflang query URL | 0 |

No frontend deployment occurred.

## 6. Final Decision

**BLOCKED**

The accepted revision boundary and all zero-write, content-integrity, database,
service-health, sitemap, redirect, and query-URL checks pass. However, the
seven REST translation pairs do not expose the required `zh` hreflang entry.

M5E-7 CMS publish cannot be formally closed, and M5F Chinese P0 frontend
production release preparation is not authorized. A separately authorized
read-only diagnosis or code-change phase is required; this closeout did not
modify production.
