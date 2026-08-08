import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productCategories } from "../src/config/product-taxonomy";
import { productSeries } from "../src/config/product-series";
import {
  buildHeaderLanguageOptions,
  buildHeaderPrimaryNavigation,
  buildHeaderProductsMenu,
} from "../src/lib/navigation-publication";

const clientSource = readFileSync(
  new URL("../src/components/layout/header-navigation.tsx", import.meta.url),
  "utf8",
);

test("primary navigation matches the approved English and Chinese catalogs", () => {
  const english = buildHeaderPrimaryNavigation("en");
  const chinese = buildHeaderPrimaryNavigation("zh");

  assert.deepEqual(
    english.map((item) => item.label),
    ["Home", "Products", "Solutions", "Resources", "Regions", "About", "Contact"],
  );
  assert.deepEqual(
    chinese.map((item) => item.label),
    ["首页", "产品中心", "解决方案", "资源中心", "服务地区", "关于我们", "联系我们"],
  );
  assert.equal(english.some((item) => item.label === "Case Studies"), false);
  assert.equal(chinese.find((item) => item.key === "products")?.href, "/zh/products/");
  assert.equal(chinese.find((item) => item.key === "resources")?.href, "/zh/resources/");
});

test("Products mega menu is derived from the real category and series configs", () => {
  const menu = buildHeaderProductsMenu("en");

  assert.equal(menu.categories.length, productCategories.length);
  assert.deepEqual(
    new Set(menu.categories.map((item) => item.key)),
    new Set(productCategories.map((item) => item.slug)),
  );
  assert.equal(menu.series.length, productSeries.length);
  assert.deepEqual(
    new Set(menu.series.map((item) => item.key)),
    new Set(productSeries.map((item) => item.slug)),
  );
  assert.deepEqual(
    menu.featured.map((item) => item.key),
    [
      "hotel-smart-room-rcu-host-1",
      "rcu-controller-cabinet",
      "86-type-ai-smart-control-display",
      "smart-four-key-scene-control-panel",
    ],
  );
  assert.equal(menu.quickLinks.length, 3);
  assert.equal(
    [...menu.quickLinks, ...menu.categories, ...menu.series, ...menu.featured].some(
      (item) => item.href.includes("?category=") || item.href.includes("?series="),
    ),
    false,
  );
});

test("Chinese Products menu uses only released Chinese destinations", () => {
  const menu = buildHeaderProductsMenu("zh");
  const links = [
    ...menu.quickLinks,
    ...menu.categories,
    ...menu.series,
    ...menu.featured,
    menu.viewAllCategories,
    menu.viewAllProducts,
  ];

  assert.equal(links.some((item) => /^\/(ar|de|es|vi|fa)\//.test(item.href)), false);
  assert.equal(menu.categories.every((item) => item.href === "/zh/products/"), true);
  assert.equal(menu.series.every((item) => item.href === "/zh/products/"), true);
  assert.deepEqual(
    menu.featured.map((item) => item.label),
    [
      "酒店智能客房 RCU 控制主机",
      "酒店客房 RCU 控制箱",
      "86 型 AI 智能控制屏",
      "四键酒店场景控制面板",
    ],
  );
});

test("language availability comes from the release batch", () => {
  const released = buildHeaderLanguageOptions(
    "en",
    "products/rcu-controller-cabinet",
  );
  const unavailable = buildHeaderLanguageOptions(
    "en",
    "downloads",
  );
  const chinese = buildHeaderLanguageOptions(
    "zh",
    "products/rcu-controller-cabinet",
  );

  assert.deepEqual(released.map((item) => item.locale), ["en", "zh"]);
  assert.equal(released[1]?.href, "/zh/products/rcu-controller-cabinet/");
  assert.equal(unavailable[1]?.available, false);
  assert.equal(unavailable[1]?.href, undefined);
  assert.equal(unavailable[1]?.unavailableMessage, "当前页面暂未提供");
  assert.equal(chinese[0]?.href, "/en/products/rcu-controller-cabinet/");
  assert.equal(chinese[1]?.active, true);
  assert.equal(chinese[1]?.href, undefined);
});

test("desktop and mobile controls expose the required interaction and a11y hooks", () => {
  for (const marker of [
    'aria-label="Primary"',
    "onMouseEnter",
    "onMouseLeave",
    "onFocusCapture",
    "onBlurCapture",
    "productsPointerStartedOpen",
    "languagePointerStartedOpen",
    "navigationHoverSuppressed",
    "handleDesktopToggleKeyDown",
    'event.key !== "Escape"',
    'document.addEventListener("pointerdown"',
    "aria-expanded",
    "aria-controls",
    "aria-haspopup",
    'aria-label="Mobile primary"',
    "mobile-accordion-panel",
  ]) {
    assert.match(clientSource, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(clientSource, /setTimeout\(\(\) => setOpenDropdown\(null\), 220\)/);
  assert.match(clientSource, /productsButtonRef\.current/);
  assert.match(clientSource, /languageButtonRef\.current/);
  assert.match(clientSource, /mobileButtonRef\.current\?\.focus/);
  assert.doesNotMatch(clientSource, /role="menu"/);
});

test("Escape focus restoration suppresses only its own focus-open event", () => {
  assert.match(clientSource, /const restoringDropdownFocus = useRef\(false\)/);
  assert.match(
    clientSource,
    /const handleDesktopFocusCapture = \([\s\S]*event: FocusEvent<HTMLLIElement>[\s\S]*id: DropdownId[\s\S]*\) => \{[\s\S]*if \(restoringDropdownFocus\.current\) return;[\s\S]*event\.target\.matches\("a\.nav-link"\)[\s\S]*openDesktopDropdown\(id\);[\s\S]*\};/,
  );
  assert.match(
    clientSource,
    /restoringDropdownFocus\.current = true;\s+try \{\s+button\?\.focus\(\);\s+\} finally \{\s+restoringDropdownFocus\.current = false;\s+\}/,
  );
  assert.match(
    clientSource,
    /onFocusCapture=\{\(event\) => handleDesktopFocusCapture\(event, "products"\)\}/,
  );
  assert.match(
    clientSource,
    /onFocusCapture=\{\(event\) => handleDesktopFocusCapture\(event, "language"\)\}/,
  );
  assert.doesNotMatch(
    clientSource,
    /onFocusCapture=\{\(\) => openDesktopDropdown\(("products"|"language")\)\}/,
  );
});
