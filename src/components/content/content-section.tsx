import { stripHtml } from "@/lib/text";
import { BidiTechnicalText } from "@/components/i18n/bidi-technical-text";

type ContentSectionProps = {
  title: string;
  content?: string;
};

export function ContentSection({ title, content }: ContentSectionProps) {
  const text = stripHtml(content ?? "");
  if (!text) return null;

  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-2xl font-semibold text-foreground">
        <BidiTechnicalText text={title} />
      </h2>
      <p className="mt-4 max-w-4xl whitespace-pre-line leading-8 text-muted">
        <BidiTechnicalText text={text} />
      </p>
    </section>
  );
}
