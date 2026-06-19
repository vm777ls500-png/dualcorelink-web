type PageHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeading({
  eyebrow,
  title,
  description,
}: PageHeadingProps) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase text-brand">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
      ) : null}
    </header>
  );
}
