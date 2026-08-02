# DualCoreLink UX Hotfix — Close Header Dropdown After Navigation

Date: 2026-08-02

Branch: `hotfix/header-close-after-navigation-20260802`

Base: `cae55ccc829e005cdcd97d70ee94c12d9d635039`

## Conclusion

**BLOCKED — the isolated candidate closes all Header navigation state
correctly and passed every technical validation, but GitHub connectivity did
not recover and the feature branch could not be pushed.** It preserves the
existing desktop hover, keyboard, Escape/focus, 220 ms delay, mobile accordion,
inquiry attribution, and multilingual publication boundaries.

No main push, deployment, CMS/database write, or GSC request was performed.

## Root Cause

`HeaderNavigation` is a Client Component rendered by the persistent App Router
layout. A soft `Link` navigation replaces page content without unmounting the
Header, so its `openDropdown`, `mobileOpen`, and `mobileSection` state survived
the route transition.

The original links had no shared navigation-close callback and the component
had no pathname-change fallback. A focused link and a stationary pointer could
also reopen a dropdown while the persistent Header reconciled after navigation.

## Implementation

`HeaderNavigation` now uses one `closeAllNavigation` callback to:

- cancel the pending mouseleave timer;
- close Products and Language desktop dropdowns;
- reset pointer-open bookkeeping;
- close Products and Language mobile accordions;
- close the mobile drawer; and
- avoid focus restoration during navigation.

Every internal Header route uses `handleHeaderNavigation` before normal link
navigation: brand/Home, primary links, Product quick links, categories, series
hash links, featured products, language links, mobile links, and quote links.
`TrackedInquiryLink` accepts the same callback only after persisting the
allowlisted inquiry attribution and sending the existing GA4 event.

A `usePathname()` effect calls the same close function whenever the pathname
changes. Hash-only links still close from their click callback because a hash
change does not necessarily change the pathname.

Navigation closure temporarily ignores synthetic hover re-entry from the
persistent Header. Normal hover resumes on the next real pointer movement;
zero-delta layout events cannot reopen the menu. Escape remains a separate path
that restores focus to its trigger and retains the existing focus-open guard.

## Modified Files

- `src/components/layout/header-navigation.tsx`
- `src/components/contact/tracked-inquiry-link.tsx`
- `tests/header-navigation.test.ts`
- `tests/header-navigation-close.test.ts`
- `docs/reports/ux-header-close-after-navigation-hotfix-20260802.md`
- `docs/reports/latest-status.md`

## Automated Coverage

The new Header close suite contains 17 contract tests covering normal Products
navigation, category links, featured products, language switching, pathname
fallback, mobile drawer closure, hash-only series links, focus-restoration
separation, pointer re-entry protection, Escape behavior, keyboard reopening,
the 220 ms delay, mobile accordions, `aria-expanded`, query-free links, inquiry
attribution order, timer cancellation, and pointer-state reset.

Existing Header tests were updated only for the new focus-handler signature and
navigation-hover guard.

## Browser QA

The production static candidate was served locally with `Cache-Control:
no-store` and exercised with real Next.js client navigation.

Desktop results:

- English Home → Products: menus closed, `aria-expanded=false`.
- Products → RCU Controller Cabinet: menus closed.
- Products dropdown → RCU category hash: menus closed.
- Products dropdown → Smart Series hash: menus closed.
- English → Chinese and Chinese → English: both menus closed.
- Escape: Products closed and focus returned to `Toggle Products menu`.

Mobile results:

- Products accordion → RCU Controller Cabinet: accordion and drawer closed.
- Language accordion → Chinese RCU Controller Cabinet: accordion and drawer
  closed.

Viewport smoke checks at 390, 768, 1024, 1280, and 1440 pixels found zero
horizontal overflow. Console warnings/errors and hydration errors were zero.
The mobile layout remained active through 1024 pixels and desktop layout at
1280/1440 as expected.

## Validation

- `npm test`: PASS, 170/170.
- `npm run lint`: PASS, 0 errors.
- `npm run media:audit`: PASS, 0 errors and 1 existing warning.
- `npm run multilingual:audit`: PASS, manifest 414/414; production-ready 12;
  pending 402.
- `npm run build`: PASS, 163/163 generated pages.
- `npm run multilingual:static-export-audit`: PASS, 12 localized pages;
  sitemap 88.
- `git diff --check`: PASS.

The tests and build used the public read-only CMS endpoint. One earlier test
invocation without that environment attempted the absent local endpoint and
failed five CMS-dependent assertions; the required public-CMS rerun passed all
170 tests.

## SEO and Publication Boundary

- Sitemap: 88 URLs (76 English + 12 Chinese).
- Other public localized languages: 0.
- Pending localized candidates: 402, still excluded.
- `source_page`, `content_type`, `content_slug`, `cta_position` query hrefs: 0.
- Products `category` and `series` query hrefs: 0.
- Any internal query href: 0.
- Sitemap, canonical, and hreflang query URLs: 0.
- Inquiry attribution and GA4 field ordering: regression tests passed.

## Safety Result

- Main push: none.
- Production deployment: none.
- CMS/database writes: none.
- GSC requests: none.
- English/Chinese page content changes: none.
- Multilingual release status changes: none.

## Feature Preservation

The implementation and this report were committed locally with the required
message `fix: close header menus after navigation`. The feature push was not
attempted after the final connectivity checks because the prerequisite
`ls-remote` could not reach GitHub.

- DNS: resolved `github.com`.
- TCP 443: failed.
- IPv4 HTTPS: timed out.
- Git smart HTTP/1.1: connection reset, then timed out on bounded retries.
- Existing SSH authentication: unavailable (`Permission denied (publickey)`).
- Remote, proxy, SSL, and Git configuration changes: none.
- Production Actions/deployment: none.
