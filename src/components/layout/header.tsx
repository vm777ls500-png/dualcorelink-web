import Link from "next/link";
import { localeNames, locales, type Locale } from "@/config/i18n";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
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

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex min-h-18 max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href={`/${locale}/`}
          className="text-lg font-bold text-foreground"
          aria-label="DUALCORE LINK home"
        >
          DUALCORE LINK
        </Link>

        <nav aria-label="Primary" className="order-3 w-full lg:order-none lg:w-auto">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {primaryNavigation.map(([label, route]) => (
              <li key={route}>
                <Link href={`/${locale}/${route}/`} className="hover:text-brand">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Language">
          <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm">
            {locales.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item}/`}
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
