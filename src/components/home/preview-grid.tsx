import Image from "next/image";
import Link from "next/link";

export type PreviewItem = {
  id: number;
  title: string;
  description: string;
  href: string;
  meta?: string;
  categoryLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageFit?: "contain" | "cover";
};

type PreviewGridProps = {
  items: PreviewItem[];
  emptyTitle: string;
  emptyDescription: string;
  actionLabel?: string;
};

export function PreviewGrid({
  items,
  emptyTitle,
  emptyDescription,
  actionLabel = "View Details",
}: PreviewGridProps) {
  if (items.length === 0) {
    return (
      <div className="surface-card mt-8 px-6 py-10">
        <p className="font-semibold text-foreground">{emptyTitle}</p>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-5 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="surface-card surface-card-hover overflow-hidden">
          <div className="media-shell aspect-[4/3]">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.imageAlt ?? item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={
                  item.imageFit === "cover"
                    ? "object-cover"
                    : "object-contain p-5"
                }
              />
            ) : (
              <div className="relative z-10 grid h-full place-items-center text-xs font-semibold uppercase text-muted">
                Media preview unavailable
              </div>
            )}
          </div>
          <div className="p-5">
            {item.categoryLabel ? (
              <p className="eyebrow-chip">
                {item.categoryLabel}
              </p>
            ) : item.meta ? (
              <p className="eyebrow-chip">
                {item.meta}
              </p>
            ) : null}
            <h3 className="mt-2 text-xl font-semibold">
              <Link href={item.href}>{item.title}</Link>
            </h3>
            <p className="mt-3 line-clamp-3 leading-7 text-muted">
              {item.description}
            </p>
            <Link
              href={item.href}
              className="brand-button-outline mt-5 px-4 py-2 text-sm"
            >
              {actionLabel}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
