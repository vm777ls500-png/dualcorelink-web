"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type MouseEventHandler,
} from "react";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { getDirection, type Locale } from "@/config/i18n";
import { getUiMessages } from "@/content/locales/ui";
import {
  buildQuoteHref,
  type InquiryContentType,
} from "@/lib/inquiry/attribution";
import {
  buildHeaderLanguageOptions,
  buildHeaderPrimaryNavigation,
  type HeaderProductLink,
  type HeaderProductsMenu,
} from "@/lib/navigation-publication";

type DropdownId = "products" | "language";
type MobileSection = DropdownId | null;

type CloseAllNavigationOptions = {
  closeMobileDrawer?: boolean;
  restoreMobileFocus?: boolean;
};

type HeaderNavigationProps = {
  locale: Locale;
  productsMenu: HeaderProductsMenu;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={open ? "header-chevron header-chevron-open" : "header-chevron"}
    >
      <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ProductLinkList({
  links,
  onNavigate,
}: {
  links: readonly HeaderProductLink[];
  onNavigate?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <ul className="header-menu-list">
      {links.map((link) => (
        <li key={link.key}>
          <Link href={link.href} onClick={onNavigate}>
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ProductsMenuContent({
  locale,
  menu,
  mobile = false,
  onNavigate,
}: {
  locale: Locale;
  menu: HeaderProductsMenu;
  mobile?: boolean;
  onNavigate?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <div className={mobile ? "mobile-products-grid" : "products-mega-grid"}>
      <div className="products-mega-column">
        <section>
          <h2>{locale === "ar" ? "وصول سريع" : locale === "zh" ? "快速入口" : locale === "vi" ? "Truy cập nhanh" : "Quick Access"}</h2>
          <ProductLinkList links={menu.quickLinks} onNavigate={onNavigate} />
        </section>
        <section className="products-mega-section-spaced">
          <h2>{locale === "ar" ? "سلاسل المنتجات" : locale === "zh" ? "产品系列" : locale === "vi" ? "Dòng sản phẩm" : "Product Series"}</h2>
          <ProductLinkList links={menu.series} onNavigate={onNavigate} />
        </section>
      </div>

      <section className="products-mega-column products-mega-categories">
        <h2>{locale === "ar" ? "فئات المنتجات" : locale === "zh" ? "产品分类" : locale === "vi" ? "Danh mục sản phẩm" : "Product Categories"}</h2>
        <ProductLinkList links={menu.categories} onNavigate={onNavigate} />
        <Link className="header-menu-view-all" href={menu.viewAllCategories.href} onClick={onNavigate}>
          {menu.viewAllCategories.label}
        </Link>
      </section>

      <section className="products-mega-column products-mega-featured">
        <h2>{locale === "ar" ? "منتجات مختارة" : locale === "zh" ? "推荐产品" : locale === "vi" ? "Sản phẩm nổi bật" : "Featured Products"}</h2>
        <ProductLinkList links={menu.featured} onNavigate={onNavigate} />
        <Link className="header-menu-view-all" href={menu.viewAllProducts.href} onClick={onNavigate}>
          {menu.viewAllProducts.label}
        </Link>
      </section>
    </div>
  );
}

export function HeaderNavigation({ locale, productsMenu }: HeaderNavigationProps) {
  const pathname = usePathname();
  const messages = getUiMessages(locale);
  const mobileNavigationLabels =
    locale === "ar"
      ? { open: "فتح التنقل", close: "إغلاق التنقل", nav: "التنقل الرئيسي للجوال" }
      : locale === "zh"
        ? { open: "打开导航", close: "关闭导航", nav: "移动端主导航" }
        : locale === "vi"
          ? { open: "Mở điều hướng", close: "Đóng điều hướng", nav: "Điều hướng chính trên thiết bị di động" }
          : { open: "Open navigation", close: "Close navigation", nav: "Mobile primary" };
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSection>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const productsPointerStartedOpen = useRef(false);
  const languagePointerStartedOpen = useRef(false);
  const navigationHoverSuppressed = useRef(false);
  const restoringDropdownFocus = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathSegments = pathname.split("/").filter(Boolean);
  const contentPath = pathSegments.slice(1).join("/");
  const navigation = buildHeaderPrimaryNavigation(locale);
  const languageOptions = buildHeaderLanguageOptions(locale, contentPath);
  const section = pathSegments[1];
  const contentTypeBySection: Record<string, InquiryContentType> = {
    products: "product",
    resources: "resource",
    solutions: "solution",
    regions: "region",
    contact: "contact",
  };
  const headerAttribution = {
    sourcePage: pathname,
    contentType: contentTypeBySection[section] ?? ("site" as const),
    contentSlug: pathSegments[2],
    ctaPosition: "global_header",
  };

  const isActiveRoute = (href: string) => {
    const current = pathname.replace(/\/$/, "");
    const target = href.replace(/\/$/, "");
    return current === target || (target !== "/en" && current.startsWith(`${target}/`));
  };

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeAllNavigation = useCallback(({
    closeMobileDrawer = true,
    restoreMobileFocus = false,
  }: CloseAllNavigationOptions = {}) => {
    clearCloseTimer();
    productsPointerStartedOpen.current = false;
    languagePointerStartedOpen.current = false;
    setOpenDropdown(null);
    setMobileSection(null);
    if (closeMobileDrawer) {
      setMobileOpen(false);
    }
    if (restoreMobileFocus) {
      window.requestAnimationFrame(() => mobileButtonRef.current?.focus());
    }
  }, [clearCloseTimer]);

  const handleHeaderNavigation = useCallback(() => {
    navigationHoverSuppressed.current = true;
    closeAllNavigation();
  }, [closeAllNavigation]);

  const openDesktopDropdown = (id: DropdownId) => {
    clearCloseTimer();
    setOpenDropdown(id);
  };

  const handleDesktopMouseEnter = (id: DropdownId) => {
    if (navigationHoverSuppressed.current) return;
    openDesktopDropdown(id);
  };

  const handleDesktopPointerMove = (
    event: MouseEvent<HTMLLIElement>,
    id: DropdownId,
  ) => {
    if (!navigationHoverSuppressed.current) return;
    if (event.movementX === 0 && event.movementY === 0) return;
    navigationHoverSuppressed.current = false;
    openDesktopDropdown(id);
  };

  const handleDesktopFocusCapture = (
    event: FocusEvent<HTMLLIElement>,
    id: DropdownId,
  ) => {
    if (restoringDropdownFocus.current) return;
    if (
      id === "products" &&
      event.target instanceof HTMLElement &&
      event.target.matches("a.nav-link")
    ) {
      return;
    }
    openDesktopDropdown(id);
  };

  const scheduleDesktopClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 220);
  };

  const handleDesktopToggleKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    id: DropdownId,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    clearCloseTimer();
    setOpenDropdown((current) => current === id ? null : id);
  };

  const handleDropdownBlur = (
    event: FocusEvent<HTMLLIElement>,
  ) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      scheduleDesktopClose();
    }
  };

  const closeMobile = useCallback((restoreFocus = false) => {
    closeAllNavigation({ restoreMobileFocus: restoreFocus });
  }, [closeAllNavigation]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  useEffect(() => {
    closeAllNavigation();
  }, [pathname, closeAllNavigation]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        clearCloseTimer();
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        closeMobile(true);
        return;
      }
      if (openDropdown) {
        const button =
          openDropdown === "products"
            ? productsButtonRef.current
            : languageButtonRef.current;
        setOpenDropdown(null);
        window.requestAnimationFrame(() => {
          restoringDropdownFocus.current = true;
          try {
            button?.focus();
          } finally {
            restoringDropdownFocus.current = false;
          }
        });
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      clearCloseTimer();
    };
  }, [clearCloseTimer, closeMobile, mobileOpen, openDropdown]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} className="site-header site-header-sticky">
      <div className="header-shell">
        <Link
          href={locale === "ar" ? "/ar/about/" : locale === "zh" ? "/zh/about/" : locale === "vi" ? "/vi/about/" : "/en/"}
          className="header-brand"
          aria-label={messages.homeLabel}
          onClick={handleHeaderNavigation}
        >
          DUALCORE LINK
        </Link>

        <nav aria-label="Primary" className="header-desktop-navigation">
          <ul className="header-desktop-list">
            {navigation.map((item) => {
              if (item.key !== "products") {
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={isActiveRoute(item.href) ? "nav-link nav-link-active" : "nav-link"}
                      aria-current={isActiveRoute(item.href) ? "page" : undefined}
                      onClick={handleHeaderNavigation}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.key}
                  className="header-dropdown-item header-products-item"
                  onMouseEnter={() => handleDesktopMouseEnter("products")}
                  onMouseMove={(event) => handleDesktopPointerMove(event, "products")}
                  onMouseLeave={scheduleDesktopClose}
                  onFocusCapture={(event) => handleDesktopFocusCapture(event, "products")}
                  onBlurCapture={handleDropdownBlur}
                >
                  <span className="header-nav-pair">
                    <Link
                      href={item.href}
                      className={isActiveRoute(item.href) ? "nav-link nav-link-active" : "nav-link"}
                      aria-current={isActiveRoute(item.href) ? "page" : undefined}
                      onClick={handleHeaderNavigation}
                    >
                      {item.label}
                    </Link>
                    <button
                      ref={productsButtonRef}
                      type="button"
                      className="header-dropdown-toggle"
                      aria-label={locale === "ar" ? "فتح قائمة المنتجات" : locale === "zh" ? "展开产品菜单" : locale === "vi" ? "Mở menu sản phẩm" : "Toggle Products menu"}
                      aria-expanded={openDropdown === "products"}
                      aria-controls="desktop-products-menu"
                      aria-haspopup="true"
                      onPointerDown={() => {
                        productsPointerStartedOpen.current = openDropdown === "products";
                      }}
                      onKeyDown={(event) => handleDesktopToggleKeyDown(event, "products")}
                      onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        event.stopPropagation();
                        if (event.detail > 0) {
                          setOpenDropdown(productsPointerStartedOpen.current ? null : "products");
                          return;
                        }
                        setOpenDropdown((current) => current === "products" ? null : "products");
                      }}
                    >
                      <Chevron open={openDropdown === "products"} />
                    </button>
                  </span>
                  <div
                    id="desktop-products-menu"
                    className="header-dropdown products-mega-menu"
                    hidden={openDropdown !== "products"}
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={scheduleDesktopClose}
                  >
                    <ProductsMenuContent
                      locale={locale}
                      menu={productsMenu}
                      onNavigate={handleHeaderNavigation}
                    />
                  </div>
                </li>
              );
            })}

            <li
              className="header-dropdown-item header-language-item"
              onMouseEnter={() => handleDesktopMouseEnter("language")}
              onMouseMove={(event) => handleDesktopPointerMove(event, "language")}
              onMouseLeave={scheduleDesktopClose}
              onFocusCapture={(event) => handleDesktopFocusCapture(event, "language")}
              onBlurCapture={handleDropdownBlur}
            >
              <button
                ref={languageButtonRef}
                type="button"
                className="nav-link header-language-trigger"
                aria-label={messages.languageNavigationLabel}
                aria-expanded={openDropdown === "language"}
                aria-controls="desktop-language-menu"
                aria-haspopup="true"
                onPointerDown={() => {
                  languagePointerStartedOpen.current = openDropdown === "language";
                }}
                onKeyDown={(event) => handleDesktopToggleKeyDown(event, "language")}
                onClick={(event) => {
                  if (event.detail > 0) {
                    setOpenDropdown(languagePointerStartedOpen.current ? null : "language");
                    return;
                  }
                  setOpenDropdown((current) => current === "language" ? null : "language");
                }}
              >
                      <span>{locale === "ar" ? "اللغة" : locale === "zh" ? "语言" : locale === "vi" ? "Ngôn ngữ" : "Language"}</span>
                <Chevron open={openDropdown === "language"} />
              </button>
              <div
                id="desktop-language-menu"
                className="header-dropdown language-dropdown"
                hidden={openDropdown !== "language"}
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleDesktopClose}
              >
                <ul>
                  {languageOptions.map((option) => (
                    <li key={option.locale}>
                      {option.href ? (
                        <Link
                          href={option.href}
                          hrefLang={option.locale}
                          onClick={handleHeaderNavigation}
                        >
                          {option.label}
                        </Link>
                      ) : (
                        <span
                          className={option.active ? "language-option-active" : "language-option-disabled"}
                          aria-current={option.active ? "page" : undefined}
                          aria-disabled={!option.available || undefined}
                        >
                          <strong>{option.label}</strong>
                          {option.unavailableMessage ? <small>{option.unavailableMessage}</small> : null}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <TrackedInquiryLink
          href={buildQuoteHref(locale, headerAttribution)}
          channel="form"
          attribution={headerAttribution}
          className="header-quote-link"
          onClick={handleHeaderNavigation}
        >
          {messages.quote}
        </TrackedInquiryLink>

        <button
          ref={mobileButtonRef}
          type="button"
          className="header-mobile-toggle"
          aria-label={mobileOpen ? mobileNavigationLabels.close : mobileNavigationLabels.open}
          aria-expanded={mobileOpen}
          aria-controls="mobile-site-navigation"
          onClick={() => {
            setOpenDropdown(null);
            setMobileOpen((current) => !current);
            if (mobileOpen) setMobileSection(null);
          }}
        >
          <span aria-hidden="true" className="header-mobile-toggle-lines" />
        </button>
      </div>

      <div id="mobile-site-navigation" className="header-mobile-layer" hidden={!mobileOpen}>
        <button className="header-mobile-overlay" type="button" aria-label={mobileNavigationLabels.close} onClick={() => closeMobile(true)} />
        <div className="header-mobile-drawer">
          <div className="header-mobile-drawer-heading">
            <strong>DUALCORE LINK</strong>
            <button type="button" onClick={() => closeMobile(true)} aria-label={mobileNavigationLabels.close}>×</button>
          </div>
          <nav aria-label={mobileNavigationLabels.nav}>
            <ul className="header-mobile-list">
              {navigation.map((item) => {
                if (item.key !== "products") {
                  return (
                    <li key={item.key}>
                      <Link href={item.href} onClick={handleHeaderNavigation} aria-current={isActiveRoute(item.href) ? "page" : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.key} className="mobile-accordion-item">
                    <div className="mobile-accordion-heading">
                      <Link href={item.href} onClick={handleHeaderNavigation}>{item.label}</Link>
                      <button
                        type="button"
              aria-label={locale === "ar" ? "فتح قائمة المنتجات" : locale === "zh" ? "展开产品菜单" : locale === "vi" ? "Mở menu sản phẩm" : "Toggle Products menu"}
                        aria-expanded={mobileSection === "products"}
                        aria-controls="mobile-products-menu"
                        onClick={() => setMobileSection((current) => current === "products" ? null : "products")}
                      >
                        <Chevron open={mobileSection === "products"} />
                      </button>
                    </div>
                    <div id="mobile-products-menu" className="mobile-accordion-panel" hidden={mobileSection !== "products"}>
                      <ProductsMenuContent locale={locale} menu={productsMenu} mobile onNavigate={handleHeaderNavigation} />
                    </div>
                  </li>
                );
              })}
              <li className="mobile-accordion-item">
                <button
                  type="button"
                  className="mobile-language-trigger"
                  aria-expanded={mobileSection === "language"}
                  aria-controls="mobile-language-menu"
                  onClick={() => setMobileSection((current) => current === "language" ? null : "language")}
                >
              <span>{locale === "ar" ? "اللغة" : locale === "zh" ? "语言" : locale === "vi" ? "Ngôn ngữ" : "Language"}</span>
                  <Chevron open={mobileSection === "language"} />
                </button>
                <div id="mobile-language-menu" className="mobile-accordion-panel" hidden={mobileSection !== "language"}>
                  <ul className="mobile-language-list">
                    {languageOptions.map((option) => (
                      <li key={option.locale}>
                        {option.href ? (
                          <Link href={option.href} hrefLang={option.locale} onClick={handleHeaderNavigation}>{option.label}</Link>
                        ) : (
                          <span className={option.active ? "language-option-active" : "language-option-disabled"} aria-current={option.active ? "page" : undefined} aria-disabled={!option.available || undefined}>
                            <strong>{option.label}</strong>
                            {option.unavailableMessage ? <small>{option.unavailableMessage}</small> : null}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          <TrackedInquiryLink
            href={buildQuoteHref(locale, headerAttribution)}
            channel="form"
            attribution={headerAttribution}
            className="header-mobile-quote"
            onClick={handleHeaderNavigation}
          >
            {messages.quote}
          </TrackedInquiryLink>
        </div>
      </div>
    </header>
  );
}
