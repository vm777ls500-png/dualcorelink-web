"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import type { Locale } from "@/config/i18n";
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
  onNavigate?: () => void;
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
  onNavigate?: () => void;
}) {
  return (
    <div className={mobile ? "mobile-products-grid" : "products-mega-grid"}>
      <div className="products-mega-column">
        <section>
          <h2>{locale === "zh" ? "快速入口" : "Quick Access"}</h2>
          <ProductLinkList links={menu.quickLinks} onNavigate={onNavigate} />
        </section>
        <section className="products-mega-section-spaced">
          <h2>{locale === "zh" ? "产品系列" : "Product Series"}</h2>
          <ProductLinkList links={menu.series} onNavigate={onNavigate} />
        </section>
      </div>

      <section className="products-mega-column products-mega-categories">
        <h2>{locale === "zh" ? "产品分类" : "Product Categories"}</h2>
        <ProductLinkList links={menu.categories} onNavigate={onNavigate} />
        <Link className="header-menu-view-all" href={menu.viewAllCategories.href} onClick={onNavigate}>
          {menu.viewAllCategories.label}
        </Link>
      </section>

      <section className="products-mega-column products-mega-featured">
        <h2>{locale === "zh" ? "推荐产品" : "Featured Products"}</h2>
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
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSection>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const productsPointerStartedOpen = useRef(false);
  const languagePointerStartedOpen = useRef(false);
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

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDesktopDropdown = (id: DropdownId) => {
    clearCloseTimer();
    setOpenDropdown(id);
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

  const closeMobile = (restoreFocus = false) => {
    setMobileOpen(false);
    setMobileSection(null);
    if (restoreFocus) {
      window.requestAnimationFrame(() => mobileButtonRef.current?.focus());
    }
  };

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
        window.requestAnimationFrame(() => button?.focus());
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      clearCloseTimer();
    };
  }, [mobileOpen, openDropdown]);

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
          href={locale === "zh" ? "/zh/about/" : "/en/"}
          className="header-brand"
          aria-label={messages.homeLabel}
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
                  onMouseEnter={() => openDesktopDropdown("products")}
                  onMouseLeave={scheduleDesktopClose}
                  onFocusCapture={() => openDesktopDropdown("products")}
                  onBlurCapture={handleDropdownBlur}
                >
                  <span className="header-nav-pair">
                    <Link
                      href={item.href}
                      className={isActiveRoute(item.href) ? "nav-link nav-link-active" : "nav-link"}
                      aria-current={isActiveRoute(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                    <button
                      ref={productsButtonRef}
                      type="button"
                      className="header-dropdown-toggle"
                      aria-label={locale === "zh" ? "展开产品菜单" : "Toggle Products menu"}
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
                    <ProductsMenuContent locale={locale} menu={productsMenu} />
                  </div>
                </li>
              );
            })}

            <li
              className="header-dropdown-item header-language-item"
              onMouseEnter={() => openDesktopDropdown("language")}
              onMouseLeave={scheduleDesktopClose}
              onFocusCapture={() => openDesktopDropdown("language")}
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
                <span>{locale === "zh" ? "语言" : "Language"}</span>
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
                        <Link href={option.href} hrefLang={option.locale}>
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
        >
          {messages.quote}
        </TrackedInquiryLink>

        <button
          ref={mobileButtonRef}
          type="button"
          className="header-mobile-toggle"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
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
        <button className="header-mobile-overlay" type="button" aria-label="Close navigation" onClick={() => closeMobile(true)} />
        <div className="header-mobile-drawer">
          <div className="header-mobile-drawer-heading">
            <strong>DUALCORE LINK</strong>
            <button type="button" onClick={() => closeMobile(true)} aria-label="Close navigation">×</button>
          </div>
          <nav aria-label="Mobile primary">
            <ul className="header-mobile-list">
              {navigation.map((item) => {
                if (item.key !== "products") {
                  return (
                    <li key={item.key}>
                      <Link href={item.href} onClick={() => closeMobile()} aria-current={isActiveRoute(item.href) ? "page" : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.key} className="mobile-accordion-item">
                    <div className="mobile-accordion-heading">
                      <Link href={item.href} onClick={() => closeMobile()}>{item.label}</Link>
                      <button
                        type="button"
                        aria-label={locale === "zh" ? "展开产品菜单" : "Toggle Products menu"}
                        aria-expanded={mobileSection === "products"}
                        aria-controls="mobile-products-menu"
                        onClick={() => setMobileSection((current) => current === "products" ? null : "products")}
                      >
                        <Chevron open={mobileSection === "products"} />
                      </button>
                    </div>
                    <div id="mobile-products-menu" className="mobile-accordion-panel" hidden={mobileSection !== "products"}>
                      <ProductsMenuContent locale={locale} menu={productsMenu} mobile onNavigate={() => closeMobile()} />
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
                  <span>{locale === "zh" ? "语言" : "Language"}</span>
                  <Chevron open={mobileSection === "language"} />
                </button>
                <div id="mobile-language-menu" className="mobile-accordion-panel" hidden={mobileSection !== "language"}>
                  <ul className="mobile-language-list">
                    {languageOptions.map((option) => (
                      <li key={option.locale}>
                        {option.href ? (
                          <Link href={option.href} hrefLang={option.locale} onClick={() => closeMobile()}>{option.label}</Link>
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
          >
            {messages.quote}
          </TrackedInquiryLink>
        </div>
      </div>
    </header>
  );
}
