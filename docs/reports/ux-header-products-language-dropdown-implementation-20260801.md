# DualCoreLink UX Phase H1 — Header Products and Language Dropdown

Date: 2026-08-01
Branch: `feature/header-products-language-dropdown-20260801`
Base: `ac10bed6effb94da13395677b46baf31088a86f7` (`origin/main` at worktree creation)

## Outcome

BLOCKED — the implementation and all local validation are production-ready,
but the required feature-branch push could not complete because GitHub HTTPS
port 443 failed after three bounded, non-force attempts.

This phase adds a configuration-driven Products mega menu, a publication-aware
English/Chinese language dropdown, and mobile drawer accordions. It does not
deploy production, write CMS data, change sitemap/canonical/hreflang rules, or
expose any pending localized page.

## Root Cause

The previous Header rendered only flat links. It had no dropdown state, no
desktop hover/focus/click behavior, no mobile drawer or accordion, and no
disabled-language representation for pages whose Chinese counterpart is not
published.

## Changed Files

- `src/app/globals.css`
- `src/components/layout/header.tsx`
- `src/components/layout/header-navigation.tsx`
- `src/lib/navigation-publication.ts`
- `tests/header-navigation.test.ts`
- `docs/reports/ux-header-products-language-dropdown-implementation-20260801.md`
- `docs/reports/latest-status.md`

No dependency, CMS, Nginx, Cloudflare, database, canonical, hreflang, sitemap,
robots, content, or product metadata file changed.

## Header Architecture

- `header.tsx` remains a small server wrapper that prepares the Products menu.
- `header-navigation.tsx` is the isolated client interaction boundary.
- `navigation-publication.ts` derives product and language destinations from
  the existing taxonomy, series, and multilingual release-control sources.
- All category, series, featured-product, and language destinations are emitted
  as static HTML anchors where a published destination exists.

## Products Mega Menu

### Quick Access

- All Products
- New Products → the existing 86-Type AI Smart Control Display page
- OEM / ODM Products → the existing OEM/ODM solution page

### Product Categories

The menu reads all 10 current records from `src/config/product-taxonomy.ts`:

1. RCU Room Control Host
2. AI Smart Displays
3. Smart Panels & Switches
4. HVAC & Thermostat Control
5. Sensors
6. Room Status & Hotel Service Panels
7. Hotel Audio & Communication Devices
8. Hotel Delivery Robot System
9. Smart Sockets & Power Modules
10. Curtain Control Panels

English category links use stable `/en/products/#category-*` anchors. Chinese
category entries use the released `/zh/products/` catalog because independent
Chinese category routes are not published. No query-filter URLs are generated.

### Product Series

All four records come from `src/config/product-series.ts`:

- Borui Series / 铂锐系列
- Vintage Series / 复古系列
- Brushed Aluminum Series / 铝拉丝系列
- Smart Series / 智慧系列

English links use stable `/en/product-series/#*` anchors. Chinese entries use
the released Chinese Products catalog. No `?series=` URLs are generated.

### Featured Products

- Hotel Smart Room RCU Host
- RCU Controller Cabinet
- 86-Type AI Smart Control Display
- Smart Four-Key Scene Control Panel

The Chinese menu uses the approved localized names and only the four released
Chinese product URLs.

## Language Publication Rules

- The dropdown exposes exactly `English` and `简体中文`.
- Availability is calculated from the existing release-control functions; no
  second hand-maintained list of 12 URLs was introduced.
- A released counterpart is a normal link to the matching page.
- An unavailable Chinese counterpart is visible as `当前页面暂未提供`, disabled,
  and has no `href`.
- On Chinese pages, English links to the corresponding English source and
  Chinese is marked as the current language.
- Arabic, German, Spanish, Vietnamese, and Persian are absent.

## Desktop Interaction QA

- Products text remains a normal `/en/products/` or `/zh/products/` link.
- Separate arrow buttons toggle Products; Language uses its own trigger.
- Click opening, mutual exclusion, outside click closing, and Escape focus
  restoration passed in the local production build.
- Tab focus opens the Products dropdown. Enter closes it; Space opens it.
- Mouse-enter/mouse-leave handlers are wired to both trigger and panel, with a
  220 ms delayed close and timer cancellation while the pointer is over the
  panel. The interaction contract is covered by the source regression test.
- At 1240, 1280, and 1440 px the 1088 px panel stays fully inside the viewport;
  internal horizontal overflow is zero.

During QA, two implementation defects were found and corrected before commit:

1. focus-before-click initially caused a first pointer click to close the menu;
   pointer-start state now makes click toggling deterministic.
2. `backdrop-filter` on the sticky ancestor constrained the fixed mobile drawer
   to Header height; removing that containing-block trigger restores a full
   viewport drawer while retaining the existing readable Header background.

## Mobile and Tablet QA

- 375, 390, 430, 768, and 1024 px use the drawer/accordion navigation.
- Products text remains a navigation link and the separate 44×44 arrow opens
  the product accordion.
- Language opens as a mutually exclusive accordion.
- Escape and overlay close the drawer; Escape restores focus to the launcher.
- The drawer and overlay measured exactly the viewport height (844/844 in the
  390 px verification), with vertical submenu scrolling and no horizontal
  overflow.
- Product submenu: 23 static links, three content sections, scroll container
  490 px client height / 1217 px content height at 390 px.

## Accessibility

- Primary navigation uses `<nav aria-label="Primary">`.
- Triggers expose `aria-expanded`, `aria-controls`, and `aria-haspopup`.
- Focus-visible styling and minimum 44×44 controls are present.
- Tab, Enter, Space, Escape, outside click, overlay click, and focus restoration
  were verified.
- Closed panels use the `hidden` attribute and leave no hidden tabbable items.
- Navigation keeps standard website semantics and does not use `role="menu"`.
- `prefers-reduced-motion` disables chevron animation.

## Browser QA

Eight routes were checked across seven viewports (56 page/viewport checks):

- `/en/`
- `/en/products/`
- `/en/products/rcu-controller-cabinet/`
- `/en/solutions/rcu-room-control-solution/`
- `/en/resources/what-is-hotel-rcu-room-control-system/`
- `/zh/products/`
- `/zh/products/rcu-controller-cabinet/`
- `/en/resources/hotel-rcu-buying-guide/` (no Chinese counterpart)

Viewports: 375, 390, 430, 768, 1024, 1280, and 1440 px.

Results: 56/56 passed; horizontal-overflow failures 0; broken images 0;
console errors 0; H1 failures 0; sticky/z-index failures 0; desktop/mobile
breakpoint failures 0. Product filter clicks, browser back/forward navigation,
and the Header inquiry link retained clean fragment URLs with no query string.

## SEO, GEO, and Query URL Regression

Final static output contained 92 HTML files and sitemap 88 URLs. Scans returned:

- internal query href: 0
- Contact attribution query href: 0
- category query href: 0
- series query href: 0
- sitemap query URL: 0
- canonical query URL: 0
- hreflang query URL: 0
- pending localized href: 0

The build still exposes only 76 English and 12 approved Chinese sitemap URLs.
The 402 pending localized candidates remain blocked. Inquiry attribution and
GA4 non-PII mapping tests remain green.

## Validation

- `npm ci`: PASS; no dependency files changed. The command reported the
  repository's existing seven high-severity dependency advisories, which are
  outside H1 scope.
- `npm test`: PASS, 152/152.
- `npm run lint`: PASS, 0 errors.
- `npm run media:audit`: PASS, 0 errors (1 existing warning).
- `npm run multilingual:audit`: PASS, 414 records; 12 production-ready and 402
  pending.
- `npm run build`: PASS, 163/163 generated; export cleanup passed.
- `npm run multilingual:static-export-audit`: PASS, 12 localized pages;
  sitemap 88.
- `git diff --check`: PASS.

All CMS-backed validation used the public read-only REST root. No administrator
session, CMS write, database write, GSC request, production deployment, or main
branch push occurred.

## Remaining Risk and Release Boundary

- H1 implementation is ready for a separate production release authorization,
  but the feature branch must first be pushed successfully.
- This feature branch must not be treated as deployed until that authorization
  and production QA occur.
- The existing dependency advisory baseline remains for a separate dependency
  maintenance phase.
- Feature push result: BLOCKED by GitHub HTTPS connection reset/timeout after
  three attempts; no remote, SSL, or proxy configuration was changed.
