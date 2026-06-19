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
      <div className="mt-8 border-y border-line bg-surface px-6 py-10">
        <p className="font-semibold text-foreground">{emptyTitle}</p>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="border border-line bg-surface">
          <div className="relative aspect-[4/3] bg-background">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-5"
              />
            ) : (
              <div className="grid h-full place-items-center text-xs font-semibold uppercase text-muted">
                Media preview unavailable
              </div>
            )}
          </div>
          <div className="p-5">
            {item.categoryLabel ? (
              <p className="inline-flex border border-line bg-background px-2 py-1 text-xs font-semibold uppercase text-brand">
                {item.categoryLabel}
              </p>
            ) : item.meta ? (
              <p className="text-xs font-semibold uppercase text-brand">
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
              className="mt-5 inline-flex min-h-10 items-center justify-center border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand hover:text-white"
            >
              {actionLabel}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
