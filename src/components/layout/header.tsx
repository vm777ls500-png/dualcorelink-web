import type { Locale } from "@/config/i18n";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { buildHeaderProductsMenu } from "@/lib/navigation-publication";

export function Header({ locale }: { locale: Locale }) {
  return (
    <HeaderNavigation
      locale={locale}
      productsMenu={buildHeaderProductsMenu(locale)}
    />
  );
}
