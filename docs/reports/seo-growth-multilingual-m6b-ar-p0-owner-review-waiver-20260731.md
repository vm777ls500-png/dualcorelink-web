# DualCoreLink SEO Growth — Multilingual Phase M6B

## Arabic P0 Owner Review Waiver

- Waiver by: **Allan**
- Waiver date: **2026-07-31**
- Scope: **15 exact Arabic P0 URLs**
- Independent native Arabic review: **not performed**
- Native review approved: **0**
- Native review pending: **15**
- Owner waiver approved: **15**
- Arabic `productionReleaseReady`: **0**
- Conclusion: **Arabic P0 owner-waiver release gate implemented and locally verified**

> WARNING: Arabic P0 was released under owner review waiver and was not approved by an independent native Arabic reviewer.

This phase records Allan's explicit decision to waive independent native-language
engineering review for the Arabic P0 batch and accept the resulting localization
risk. The waiver is a separate evidence type. It does not change
`nativeReviewStatus`, does not create a native reviewer or review date, and does
not set `productionReleaseReady`.

No production CMS write, frontend deployment, `main` push, GSC request, or
Arabic publication occurred.

## 1. Exact waiver scope

| # | Localized URL | Owner waiver | Native review | Production ready |
|---:|---|---|---|---|
| 1 | `https://dualcorelink.com/ar/about/` | approved | pending | false |
| 2 | `https://dualcorelink.com/ar/contact/` | approved | pending | false |
| 3 | `https://dualcorelink.com/ar/faqs/` | approved | pending | false |
| 4 | `https://dualcorelink.com/ar/products/` | approved | pending | false |
| 5 | `https://dualcorelink.com/ar/solutions/` | approved | pending | false |
| 6 | `https://dualcorelink.com/ar/regions/` | approved | pending | false |
| 7 | `https://dualcorelink.com/ar/solutions/rcu-room-control-solution/` | approved | pending | false |
| 8 | `https://dualcorelink.com/ar/solutions/smart-hotel-automation-solution/` | approved | pending | false |
| 9 | `https://dualcorelink.com/ar/solutions/hotel-guest-room-control-solution/` | approved | pending | false |
| 10 | `https://dualcorelink.com/ar/regions/middle-east/` | approved | pending | false |
| 11 | `https://dualcorelink.com/ar/regions/saudi-arabia/` | approved | pending | false |
| 12 | `https://dualcorelink.com/ar/regions/uae/` | approved | pending | false |
| 13 | `https://dualcorelink.com/ar/products/hotel-smart-room-rcu-host-1/` | approved | pending | false |
| 14 | `https://dualcorelink.com/ar/products/rcu-controller-cabinet/` | approved | pending | false |
| 15 | `https://dualcorelink.com/ar/products/86-type-ai-smart-control-display/` | approved | pending | false |

Each record carries:

- `ownerReviewWaiverStatus = approved`
- `ownerReviewWaiverBy = Allan`
- `ownerReviewWaiverDate = 2026-07-31`
- `ownerReviewWaiverReason = "Business owner explicitly waived Arabic native-language review and accepted localization risk."`

All 15 records continue to carry:

- `nativeReviewStatus = pending`
- `nativeReviewer = null`
- `nativeReviewDate = null`
- `productionReleaseReady = false`

No Arabic P1/P2 page and no page in another locale has waiver evidence.

## 2. Release-gate behavior

The dedicated command is:

```text
npm run multilingual:release-check -- --locale=ar --batch=p0 --allow-owner-waiver
```

It validates:

- the explicit `ar:p0` batch;
- exactly 15 unique approved URLs;
- Allan as the waiver owner;
- `2026-07-31` as the waiver date;
- the exact approved reason;
- native review remaining pending;
- blank native reviewer/date fields;
- `productionReleaseReady = false`;
- six structurally valid Arabic CMS payloads that remain native-pending.

Result:

- candidates: `15`
- owner-waiver-approved: `15`
- native production-ready: `0`
- release-eligible under explicit waiver: `15`
- CMS payloads: `6/6` structurally ready
- CMS native-approved: `0`
- errors: `0`

The command emits the mandatory warning:

> WARNING: Arabic P0 was released under owner review waiver and was not approved by an independent native Arabic reviewer.

Without `--allow-owner-waiver`, the same `ar:p0` check exits nonzero and blocks
all 15 pages as native-review pending. The ordinary full-site check also exits
nonzero: the original 12 Chinese pages remain production-ready and the other
402 localized candidates remain blocked. The waiver is never inferred by
default.

## 3. RCU Host terminology

Allan selected:

`وحدة RCU رئيسية للتحكم`

The first occurrence on each affected Arabic P0 page retains the formal English
term:

`وحدة RCU رئيسية للتحكم (RCU Host)`

The Arabic P0 file content, CMS payload, catalog entry, and review workbook were
updated consistently. The product remains linked to English source ID `48` and
slug `hotel-smart-room-rcu-host-1`. Product model, specifications, protocols,
business terms, and English facts were not changed. Arabic P1/P2 approval state
was not changed.

## 4. Automated safety tests

New tests verify:

1. Owner waiver is independent from native approval.
2. The exact 15 entries remain native-pending and non-production-ready.
3. Explicit `--allow-owner-waiver` behavior passes only `ar:p0`.
4. The same batch fails without the explicit waiver option.
5. Allan/date/policy mismatches fail.
6. Fewer or more than the exact 15 URLs fail.
7. The waiver cannot spread to Chinese, Arabic non-P0 batches, or other locales.
8. A waiver entry cannot masquerade as native-approved.
9. The full release check continues to block the 402 non-native-approved pages.
10. The selected RCU Host expression and English first-occurrence form are present.

## 5. Validation

| Validation | Result |
|---|---|
| `npm run multilingual:audit` | PASS — manifest 414; owner waiver 15; native pending 402; production-ready 12 |
| Arabic P0 release check with explicit waiver | PASS — 15/15; CMS 6/6; warning emitted |
| Arabic P0 release check without waiver | EXPECTED BLOCK — 15 native-pending |
| Full release check | EXPECTED BLOCK — 402 pending; 12/414 normally eligible |
| New focused tests | PASS — 6/6 |
| `npm test` with public read-only CMS | PASS — 151/151 |
| `npm run lint` | PASS — 0 errors |
| `npm run media:audit` | PASS — 0 errors, 1 existing warning |
| `npm run build` with public read-only CMS | PASS — 163 generated before cleanup |
| Static export audit | PASS — 12 localized Chinese pages; sitemap 88 |
| `git diff --check` | PASS |

The normal build and cleanup retained the existing production candidate
boundary: 76 English URLs plus 12 approved Chinese URLs. No Arabic file entered
the normal static release output.

## 6. Risk acceptance and recommendation

Allan has explicitly accepted the language-quality risk for this release batch.
The code and reports therefore identify the release basis as an owner waiver,
not an independent native Arabic approval.

Independent Arabic hotel-engineering review is still recommended after this
phase. Any future review should record its own reviewer and date and may replace
the waiver path with the ordinary native-review gate only after genuine
approval.

## 7. Prohibited actions confirmed

- Production CMS writes: **none**
- Arabic CMS import: **none**
- Frontend deployment: **none**
- Public Arabic pages: **none**
- Commit: **none**
- Push: **none**
- `main` change: **none**
- GSC request: **none**
- Chinese or English production-content change: **none**
- Arabic P1/P2 approval: **none**
