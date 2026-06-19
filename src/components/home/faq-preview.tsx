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
      <div className="mt-8 border-y border-line bg-surface px-6 py-10">
        <p className="font-semibold">Buyer questions are being reviewed.</p>
        <p className="mt-2 leading-7 text-muted">
          Approved technical and commercial answers will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 divide-y divide-line border-y border-line">
      {faqs.slice(0, 4).map((faq) => (
        <details key={faq.id} className="bg-surface px-6 py-5">
          <summary className="cursor-pointer font-semibold">
            {stripHtml(faq.question)}
          </summary>
          <p className="mt-4 max-w-4xl leading-7 text-muted">
            {stripHtml(faq.shortAnswer)}
          </p>
        </details>
      ))}
      <div className="bg-surface px-6 py-5">
        <Link href={`/${locale}/faqs/`} className="font-semibold text-brand">
          View all FAQs →
        </Link>
      </div>
    </div>
  );
}
