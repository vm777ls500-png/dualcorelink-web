import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/config/i18n";

export type ContentListItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  reference?: string;
  categories?: string[];
  hasMedia: boolean;
  mediaUrl?: string;
  mediaAlt?: string;
};

type ContentListProps = {
  locale: Locale;
  route: "products" | "solutions";
  items: ContentListItem[];
  variant?: "product";
};

export function ContentList({ locale, route, items, variant }: ContentListProps) {
  const isProductList = variant === "product";
  const mediaReadyLabel = locale === "ar" ? "الوسائط متاحة" : "Media ready";
  const mediaUnavailableLabel =
    locale === "ar" ? "معاينة الوسائط غير متاحة" : "Media preview unavailable";
  const detailsLabel = locale === "ar" ? "عرض التفاصيل" : "View Details";

  return (
    <ul
      className={
        isProductList
          ? "product-list-grid grid gap-5 md:grid-cols-2"
          : "grid gap-5 md:grid-cols-2"
      }
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={
            isProductList
              ? "product-list-card surface-card surface-card-hover grid overflow-hidden sm:grid-cols-[12rem_1fr]"
              : "surface-card surface-card-hover grid overflow-hidden sm:grid-cols-[12rem_1fr]"
          }
        >
          <div className="media-shell product-card-media aspect-[4/3] min-h-40 sm:aspect-auto">
            {item.mediaUrl ? (
              <Image
                src={item.mediaUrl}
                alt={item.mediaAlt ?? ""}
                fill
                sizes="192px"
                className="object-contain p-5"
              />
            ) : (
              <div className="relative z-10 grid h-full min-h-32 place-items-center text-xs font-semibold uppercase text-muted">
                {item.hasMedia ? mediaReadyLabel : mediaUnavailableLabel}
              </div>
            )}
          </div>
          <div className="product-card-body flex flex-col p-6">
            {item.categories?.length ? (
              <p className="eyebrow-chip mb-3 w-fit">
                {item.categories.join(" / ")}
              </p>
            ) : null}
            <h2 className="text-lg font-semibold leading-7 text-foreground">
              <Link href={`/${locale}/${route}/${item.slug}/`}>
                {item.title}
              </Link>
            </h2>
            {item.reference ? (
              <p className="mt-2 text-sm font-medium text-muted">
                {item.reference}
              </p>
            ) : null}
            <p className="mt-4 line-clamp-3 leading-7 text-muted">
              {item.description}
            </p>
            <Link
              href={`/${locale}/${route}/${item.slug}/`}
              className={
                isProductList
                  ? "product-card-link brand-button mt-5 w-fit px-4 py-2 text-sm"
                  : "brand-button mt-5 w-fit px-4 py-2 text-sm"
              }
            >
              {detailsLabel}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
