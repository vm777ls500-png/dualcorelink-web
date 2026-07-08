import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-brand">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-foreground">
          {title}
        </h2>
        <p className="mt-3 leading-7 text-muted">{description}</p>
      </div>
      {href && actionLabel ? (
        <Link
          href={href}
          className="brand-button-outline shrink-0 px-4 py-2 text-sm"
        >
          {actionLabel} →
        </Link>
      ) : null}
    </header>
  );
}
