import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildHeaderProductsMenu } from "../src/lib/navigation-publication";

const headerSource = readFileSync(
  new URL("../src/components/layout/header-navigation.tsx", import.meta.url),
  "utf8",
);
const trackedInquirySource = readFileSync(
  new URL("../src/components/contact/tracked-inquiry-link.tsx", import.meta.url),
  "utf8",
);

test("Products menu links close all navigation before normal navigation", () => {
  assert.match(
    headerSource,
    /<ProductsMenuContent\s+locale=\{locale\}\s+menu=\{productsMenu\}\s+onNavigate=\{handleHeaderNavigation\}/s,
  );
  assert.match(headerSource, /<Link href=\{link\.href\} onClick=\{onNavigate\}>/);
});

test("Products category links use the shared navigation close callback", () => {
  assert.match(
    headerSource,
    /<ProductLinkList links=\{menu\.categories\} onNavigate=\{onNavigate\} \/>/,
  );
});

test("Featured Product links use the shared navigation close callback", () => {
  assert.match(
    headerSource,
    /<ProductLinkList links=\{menu\.featured\} onNavigate=\{onNavigate\} \/>/,
  );
});

test("Language switching closes all navigation", () => {
  assert.match(
    headerSource,
    /hrefLang=\{option\.locale\}\s+onClick=\{handleHeaderNavigation\}/s,
  );
});

test("pathname changes close every desktop and mobile navigation state", () => {
  assert.match(
    headerSource,
    /useEffect\(\(\) => \{\s+closeAllNavigation\(\);\s+\}, \[pathname, closeAllNavigation\]\);/,
  );
  assert.match(headerSource, /setOpenDropdown\(null\)/);
  assert.match(headerSource, /setMobileSection\(null\)/);
  assert.match(headerSource, /setMobileOpen\(false\)/);
});

test("pathname fallback closes the mobile drawer", () => {
  assert.match(
    headerSource,
    /closeMobileDrawer = true[\s\S]*if \(closeMobileDrawer\) \{\s+setMobileOpen\(false\);/,
  );
});

test("hash-only Product series links close without relying on pathname", () => {
  const hashSeries = buildHeaderProductsMenu("en").series.filter((item) =>
    item.href.includes("#"),
  );
  assert.ok(hashSeries.length > 0);
  assert.match(
    headerSource,
    /<ProductLinkList links=\{menu\.series\} onNavigate=\{onNavigate\} \/>/,
  );
});

test("navigation close does not restore focus or arm focus suppression", () => {
  const handler = headerSource.match(
    /const handleHeaderNavigation = useCallback\(\(\) => \{([\s\S]*?)\}, \[closeAllNavigation\]\);/,
  )?.[1];
  assert.ok(handler);
  assert.match(handler, /closeAllNavigation\(\)/);
  assert.doesNotMatch(handler, /\.focus\(|requestAnimationFrame|restoringDropdownFocus/);
});

test("navigation suppresses synthetic hover reopen until real pointer movement", () => {
  assert.match(headerSource, /const navigationHoverSuppressed = useRef\(false\)/);
  assert.match(
    headerSource,
    /const handleHeaderNavigation = useCallback\(\(\) => \{\s+navigationHoverSuppressed\.current = true;\s+closeAllNavigation\(\);/,
  );
  assert.match(
    headerSource,
    /const handleDesktopMouseEnter = \(id: DropdownId\) => \{\s+if \(navigationHoverSuppressed\.current\) return;\s+openDesktopDropdown\(id\);/,
  );
  assert.match(
    headerSource,
    /const handleDesktopPointerMove = \([\s\S]*event: MouseEvent<HTMLLIElement>[\s\S]*id: DropdownId[\s\S]*\) => \{\s+if \(!navigationHoverSuppressed\.current\) return;\s+if \(event\.movementX === 0 && event\.movementY === 0\) return;\s+navigationHoverSuppressed\.current = false;\s+openDesktopDropdown\(id\);/,
  );
  assert.match(headerSource, /onMouseMove=\{\(event\) => handleDesktopPointerMove\(event, "products"\)\}/);
  assert.match(headerSource, /onMouseMove=\{\(event\) => handleDesktopPointerMove\(event, "language"\)\}/);
});

test("Escape still closes and restores focus to the desktop trigger", () => {
  assert.match(headerSource, /if \(event\.key !== "Escape"\) return;/);
  assert.match(headerSource, /button\?\.focus\(\)/);
  assert.match(headerSource, /restoringDropdownFocus\.current = true/);
  assert.match(headerSource, /restoringDropdownFocus\.current = false/);
});

test("normal focus can reopen desktop navigation after Escape", () => {
  assert.match(
    headerSource,
    /if \(restoringDropdownFocus\.current\) return;[\s\S]*event\.target\.matches\("a\.nav-link"\)[\s\S]*openDesktopDropdown\(id\);/,
  );
  assert.match(
    headerSource,
    /onFocusCapture=\{\(event\) => handleDesktopFocusCapture\(event, "products"\)\}/,
  );
});

test("hover, click, and the 220ms close delay remain intact", () => {
  assert.match(headerSource, /onMouseEnter=\{\(\) => handleDesktopMouseEnter\("products"\)\}/);
  assert.match(headerSource, /onMouseLeave=\{scheduleDesktopClose\}/);
  assert.match(headerSource, /setTimeout\(\(\) => setOpenDropdown\(null\), 220\)/);
  assert.match(headerSource, /productsPointerStartedOpen\.current/);
  assert.match(headerSource, /languagePointerStartedOpen\.current/);
});

test("Mobile accordion state remains independent and closes on navigation", () => {
  assert.match(
    headerSource,
    /setMobileSection\(\(current\) => current === "products" \? null : "products"\)/,
  );
  assert.match(
    headerSource,
    /setMobileSection\(\(current\) => current === "language" \? null : "language"\)/,
  );
  assert.match(headerSource, /mobile onNavigate=\{handleHeaderNavigation\}/);
});

test("aria-expanded remains derived from closed state", () => {
  assert.match(headerSource, /aria-expanded=\{openDropdown === "products"\}/);
  assert.match(headerSource, /aria-expanded=\{openDropdown === "language"\}/);
  assert.match(headerSource, /aria-expanded=\{mobileOpen\}/);
  assert.match(headerSource, /aria-expanded=\{mobileSection === "products"\}/);
  assert.match(headerSource, /aria-expanded=\{mobileSection === "language"\}/);
});

test("header close integration does not add query hrefs", () => {
  assert.doesNotMatch(headerSource, /href=\{?[^\n>]*\?(?:category|series|source_page|content_type|content_slug|cta_position)/);
});

test("tracked inquiry links preserve attribution before running header close", () => {
  assert.match(trackedInquirySource, /onClick\?: MouseEventHandler<HTMLAnchorElement>/);
  assert.match(
    trackedInquirySource,
    /writeInquiryAttributionToSession\(attribution\);[\s\S]*trackInquiryEvent\("cta_click", channel, attribution\);[\s\S]*onClick\?\.\(event\);/,
  );
  assert.match(headerSource, /className="header-quote-link"\s+onClick=\{handleHeaderNavigation\}/s);
  assert.match(headerSource, /className="header-mobile-quote"\s+onClick=\{handleHeaderNavigation\}/s);
});

test("the shared close function cancels delayed closes and resets pointer state", () => {
  assert.match(
    headerSource,
    /const closeAllNavigation = useCallback\([\s\S]*clearCloseTimer\(\);[\s\S]*productsPointerStartedOpen\.current = false;[\s\S]*languagePointerStartedOpen\.current = false;[\s\S]*setOpenDropdown\(null\);[\s\S]*setMobileSection\(null\);/,
  );
});
