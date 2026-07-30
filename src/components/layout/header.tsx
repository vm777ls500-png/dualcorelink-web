"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { localeNames, type Locale } from "@/config/i18n";
import { getUiMessages } from "@/content/locales/ui";
import {
  buildPublishedNavigationHref,
  getReleasedLocalesForPath,
} from "@/lib/multilingual-release-batches";
import {
  buildQuoteHref,
  type InquiryContentType,
} from "@/lib/inquiry/attribution";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const messages = getUiMessages(locale);
  const pathSegments = pathname.split("/").filter(Boolean);
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
  const primaryNavigation = [
    ["Products", "products"],
    ["Series", "product-series"],
    ["Solutions", "solutions"],
    ["Applications", "application-scenarios"],
    ["Regions", "regions"],
    ["Downloads", "downloads"],
    ["FAQ", "faqs"],
    ["About", "about"],
  ] as const;
  const localizedNavigation = [
    [messages.navigation.products, "products"],
    [messages.navigation.solutions, "solutions"],
    [messages.navigation.regions, "regions"],
    [messages.navigation.faqs, "faqs"],
    [messages.navigation.about, "about"],
  ] as const;
  const navigation =
    locale === "en" ? primaryNavigation : localizedNavigation;
  const contentPath = pathSegments.slice(1).join("/");
  const languageLocales: readonly Locale[] = [
    "en",
    ...getReleasedLocalesForPath(contentPath),
  ];
  const isActiveRoute = (href: string) => {
    const normalizedPathname = pathname.replace(/\/$/, "");
    const normalizedHref = href.replace(/\/$/, "");

    return (
      normalizedPathname === normalizedHref ||
      normalizedPathname.startsWith(`${normalizedHref}/`)
    );
  };

  return (
    <header className="site-header site-header-sticky">
      <div className="mx-auto flex min-h-18 max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href={
            locale === "en" ? `/${locale}/` : `/${locale}/about/`
          }
          className="text-lg font-bold text-foreground"
          aria-label={messages.homeLabel}
        >
          DUALCORE LINK
        </Link>

        <nav
          aria-label={messages.primaryNavigationLabel}
          className="order-3 w-full lg:order-none lg:w-auto"
        >
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {navigation.map(([label, route]) => (
              <li key={route} className="flex">
                <Link
                  href={buildPublishedNavigationHref(locale, route)}
                  className={
                    isActiveRoute(
                      buildPublishedNavigationHref(locale, route),
                    )
                      ? "nav-link nav-link-active"
                      : "nav-link"
                  }
                  aria-current={
                    isActiveRoute(
                      buildPublishedNavigationHref(locale, route),
                    )
                      ? "page"
                      : undefined
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <TrackedInquiryLink
          href={buildQuoteHref(locale, headerAttribution)}
          channel="form"
          attribution={headerAttribution}
          className="order-2 inline-flex min-h-10 items-center justify-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white lg:order-none"
        >
          {messages.quote}
        </TrackedInquiryLink>

        <nav
          aria-label={messages.languageNavigationLabel}
          className="order-2 lg:order-none"
        >
          <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm">
            {languageLocales.map((item) => (
              <li key={item}>
                <Link
                  href={
                    contentPath
                      ? buildPublishedNavigationHref(item, contentPath)
                      : "/en/"
                  }
                  hrefLang={item}
                  aria-current={item === locale ? "page" : undefined}
                  className={
                    item === locale
                      ? "font-semibold text-brand"
                      : "text-muted hover:text-foreground"
                  }
                >
                  {localeNames[item]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
