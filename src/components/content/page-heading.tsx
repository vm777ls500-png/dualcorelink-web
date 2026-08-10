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
      <p className="text-sm font-semibold uppercase text-brand">
        <BidiTechnicalText text={eyebrow} />
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        <BidiTechnicalText text={title} />
      </h1>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-muted">
          <BidiTechnicalText text={description} />
        </p>
      ) : null}
    </header>
  );
}
import { BidiTechnicalText } from "@/components/i18n/bidi-technical-text";
