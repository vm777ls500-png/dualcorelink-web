import Link from "next/link";
import type { Locale } from "@/config/i18n";
import type { FaqModel } from "@/types/content";
import { stripHtml } from "@/lib/text";

type FaqPreviewProps = {
  locale: Locale;
  faqs: FaqModel[];
};

export function FaqPreview({ locale, faqs }: FaqPreviewProps) {
  if (faqs.length === 0) {
    return (
      <div className="surface-card mt-8 px-6 py-10">
        <p className="font-semibold">Buyer questions are being reviewed.</p>
        <p className="mt-2 leading-7 text-muted">
          Approved technical and commercial answers will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="surface-card mt-8 overflow-hidden">
      {faqs.slice(0, 4).map((faq) => (
        <details
          key={faq.id}
          className="group border-b border-line/80 bg-white/70 px-6 py-5 transition hover:bg-white"
        >
          <summary className="cursor-pointer border-s-4 border-brand/30 ps-4 font-semibold text-foreground transition group-open:border-accent">
            {stripHtml(faq.question)}
          </summary>
          <p className="mt-4 max-w-4xl leading-7 text-muted">
            {stripHtml(faq.shortAnswer)}
          </p>
        </details>
      ))}
      <div className="bg-white/80 px-6 py-5">
        <Link
          href={`/${locale}/faqs/`}
          className="brand-button-outline px-4 py-2 text-sm"
        >
          View all FAQs →
        </Link>
      </div>
    </div>
  );
}
