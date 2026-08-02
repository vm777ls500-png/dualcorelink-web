# DualCoreLink Current Status

Last updated: 2026-08-02

## Current Phase

**UX Hotfix — Close Header Dropdown After Navigation**

Status: BLOCKED — isolated candidate passed every technical validation and was
committed locally, but GitHub HTTPS 443 remained unavailable and the feature
branch could not be pushed. It is not authorized for main or production
deployment.

## Completed

- Created `hotfix/header-close-after-navigation-20260802` from latest
  `origin/main` baseline `cae55ccc829e005cdcd97d70ee94c12d9d635039`.
- Added a unified close path for desktop dropdowns, mobile accordions, the
  mobile drawer, pending timers, and pointer-open state.
- Closed Header state from every internal link and from a `usePathname()`
  route-change fallback without restoring focus to the previous page.
- Preserved Escape focus restoration, hover/focus opening, the 220 ms close
  delay, mobile behavior, clean URLs, GA4, and inquiry attribution.
- Completed automated, static-export, and local browser validation.

## Modified Files

- `src/components/layout/header-navigation.tsx`
- `src/components/contact/tracked-inquiry-link.tsx`
- `tests/header-navigation.test.ts`
- `tests/header-navigation-close.test.ts`
- `docs/reports/ux-header-close-after-navigation-hotfix-20260802.md`
- `docs/reports/latest-status.md`

## Validation

- Tests: PASS, 170/170 with public read-only CMS.
- Lint: PASS, 0 errors.
- Media audit: PASS, 0 errors and 1 existing warning.
- Multilingual audit: PASS, 414/414; ready 12; pending 402.
- Build: PASS, 163/163.
- Static export audit: PASS; sitemap 88 (76 English + 12 Chinese).
- Browser QA: PASS for required desktop/mobile navigation paths and five
  viewports; console/hydration errors and horizontal overflow are 0.
- Query URL scans: all 0.
- `git diff --check`: PASS.

## Git Status

- Branch: `hotfix/header-close-after-navigation-20260802`.
- Base: `cae55ccc829e005cdcd97d70ee94c12d9d635039`.
- Commit: created locally with message
  `fix: close header menus after navigation`.
- Feature push: blocked before push because bounded `ls-remote` checks could
  not reach GitHub over HTTPS; existing SSH authentication was unavailable.
- Main: not modified or pushed.

## Production Boundary

- Deployment: not performed.
- CMS/database writes: none.
- GSC requests: none.
- Production sitemap/content: unchanged.
- Pending localized pages: 402, still blocked.

## Risks

- `npm ci` reports seven existing high-severity dependency advisories; no
  dependency or lockfile changed in this hotfix.
- Pointer re-entry suppression is intentionally released only by real pointer
  movement so a stationary pointer cannot reopen a menu after navigation.
- GitHub DNS resolved, but TCP 443 and IPv4 HTTPS timed out after an initial
  connection reset. No remote, proxy, SSL, or permanent Git setting changed.

## Next Action

Retry the existing local feature commit push after GitHub connectivity returns.
Wait for separate authorization before any main push or production deployment.
