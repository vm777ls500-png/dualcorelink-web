import { stripHtml } from "@/lib/text";

type ContentSectionProps = {
  title: string;
  content?: string;
};

export function ContentSection({ title, content }: ContentSectionProps) {
  const text = stripHtml(content ?? "");
  if (!text) return null;

  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-4 max-w-4xl whitespace-pre-line leading-8 text-muted">
        {text}
      </p>
    </section>
  );
}
