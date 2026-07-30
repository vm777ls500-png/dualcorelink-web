# DualCoreLink SEO Growth — Multilingual Phase M5E-7A

## CMS Publish Closeout

Date: 2026-07-30

Historical decision: **BLOCKED — superseded by M5E-7B**

## M5E-7B Gate Correction

M5E-7B established that the M5E-7A REST hreflang requirement was applied at
the wrong publication boundary.

- The production content-architecture plugin's REST field seeds only the
  English frontend path for a published WordPress object.
- The importer enriches `language`, `translation_group`, and `translations`;
  it intentionally does not add a REST hreflang filter.
- The Next.js frontend does not consume CMS REST hreflang when generating
  HTML alternates. It derives frontend hreflang from the manifest entries that
  pass the native-review and production-release gate.
- Current Chinese frontend paths are still 301 and therefore must not appear
  in production hreflang.
- The local 12-page Chinese P0 release candidate has complete reciprocal
  en/zh/x-default hreflang, sitemap 88, and no pending-locale or query URL.

The REST `zh` omission is expected pre-release behavior rather than a code
defect. This report's historical BLOCKED decision is superseded by:

**PASS — M5F Frontend Release Preparation may begin.**

This does not authorize frontend deployment.

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

## 6. Historical Decision and Correction

M5E-7A originally returned **BLOCKED** because the seven REST translation
pairs did not expose a `zh` hreflang entry.

M5E-7B replaced that requirement with the correct staged gate:

1. before frontend publication, CMS translation relations must be complete and
   production hreflang must not point to the Chinese URLs that still return
   301;
2. the release candidate must contain only the approved 12-page batch with
   reciprocal en/zh/x-default hreflang;
3. after deployment, the 12 Chinese URLs, production HTML, and sitemap 88 must
   be verified on the public frontend.

The corrected outcome is **PASS for M5F preparation only**. No deployment was
authorized or performed.
