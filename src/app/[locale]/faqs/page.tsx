import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/content/empty-state";
import { PageHeading } from "@/components/content/page-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { createFaqPageSchema, createSchemaGraph } from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { faqRepository } from "@/lib/wordpress/repositories";

type FaqPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "faqs"),
    title: "Smart Home B2B FAQ",
    description:
      "Technical, commercial, integration, and regional answers for smart home buyers.",
    hreflang: createStaticHreflang(locales, "faqs"),
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const faqs = await faqRepository.list(locale);
  const schemaQuestions = faqs
    .filter((faq) => faq.schemaEnabled && faq.citationAnswer)
    .map((faq) => ({
      question: stripHtml(faq.question),
      answer: stripHtml(faq.citationAnswer),
    }));
  const url = buildSiteUrl(buildLocalizedPath(locale, "faqs"));

  return (
    <>
      <JsonLd
        graph={createSchemaGraph(
          schemaQuestions.length
            ? [createFaqPageSchema(`${url}#faq`, url, schemaQuestions)]
            : [],
        )}
      />
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-12">
        <PageHeading
          eyebrow="Knowledge"
          title="Smart Home B2B FAQ"
          description="Clear answers for distributors, integrators, developers, hotel operators, and project buyers."
        />
        <div className="mt-10 space-y-3">
          {faqs.length === 0 ? (
            <EmptyState
              title="No FAQs published"
              description="Published WordPress FAQs will appear here automatically."
            />
          ) : (
            faqs.map((faq) => (
              <details
                key={faq.id}
                className="group border border-line bg-surface"
                open={faq.isFeatured}
              >
                <summary className="cursor-pointer list-none px-6 py-5 font-semibold">
                  {stripHtml(faq.question)}
                </summary>
                <div className="border-t border-line px-6 py-5">
                  <p className="leading-8 text-muted">
                    {stripHtml(faq.detailedAnswer || faq.shortAnswer)}
                  </p>
                  {faq.regionApplicability ? (
                    <p className="mt-4 text-sm text-muted">
                      Region: {stripHtml(faq.regionApplicability)}
                    </p>
                  ) : null}
                </div>
              </details>
            ))
          )}
        </div>
      </main>
    </>
  );
}
