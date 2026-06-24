import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/config/brand";
import { isLocale, locales } from "@/config/i18n";
import { staticFaqCategories, staticFaqItems } from "@/config/static-faqs";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { createFaqPageSchema, createSchemaGraph } from "@/lib/schema";

type FaqPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "faqs"),
    title: "Smart Hotel & OEM/ODM FAQ",
    description:
      "FAQ for B2B buyers about smart hotel room control, smart home automation, OEM/ODM cooperation, samples, delivery, technical support, and after-sales service.",
    hreflang: createStaticHreflang(locales, "faqs"),
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const path = buildLocalizedPath(locale, "faqs");
  const url = buildSiteUrl(path);
  const schemaQuestions = staticFaqItems.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          createFaqPageSchema(`${url}#faq`, url, schemaQuestions),
        ])}
      />
      <main>
        <section className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-12">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                FAQ
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                Common questions about smart hotel room control solutions,
                OEM/ODM cooperation, samples, delivery, technical support, and
                after-sales service.
              </p>
            </div>
            <div className="border border-line bg-background p-6">
              <p className="text-sm font-semibold text-foreground">
                B2B inquiry support
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                For product selection, hotel project matching, distributor
                cooperation, or OEM/ODM quotation, contact our team with your
                product type, quantity, target market, and project needs.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-2 text-sm font-semibold text-white"
                >
                  Send Inquiry
                </Link>
                <Link
                  href={`/${locale}/downloads/`}
                  className="inline-flex min-h-11 items-center border border-line px-5 py-2 text-sm font-semibold text-foreground"
                >
                  View Catalogs
                </Link>
                <a
                  href={`https://wa.me/${brand.whatsapp.international}`}
                  className="inline-flex min-h-11 items-center border border-line px-5 py-2 text-sm font-semibold text-foreground"
                >
                  Get a Quote on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <nav
            aria-label="FAQ categories"
            className="flex flex-wrap gap-3 border-b border-line pb-8"
          >
            {staticFaqCategories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="border border-line bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
              >
                {category.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-12">
            {staticFaqCategories.map((category) => (
              <section key={category.slug} id={category.slug}>
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-3">
                  <div>
                    <p className="text-sm font-semibold uppercase text-brand">
                      {category.items.length} questions
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.items.map((faq, index) => (
                    <details
                      key={faq.question}
                      className="group border border-line bg-surface"
                      open={index === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 font-semibold text-foreground">
                        <span>{faq.question}</span>
                        <span className="text-brand">+</span>
                      </summary>
                      <div className="border-t border-line px-5 py-4">
                        <p className="max-w-4xl leading-8 text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-12">
          <div className="border border-line bg-foreground p-7 text-white sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold">
                  Still have questions?
                </h2>
                <p className="mt-3 max-w-3xl leading-8 text-white/75">
                  Contact our team for product selection, OEM/ODM cooperation,
                  and hotel project solutions.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-11 items-center border border-white bg-white px-5 py-2 text-sm font-semibold text-foreground"
                >
                  Send Inquiry
                </Link>
                <Link
                  href={`/${locale}/products/`}
                  className="inline-flex min-h-11 items-center border border-white/50 px-5 py-2 text-sm font-semibold text-white"
                >
                  View Products
                </Link>
                <a
                  href={`https://wa.me/${brand.whatsapp.international}`}
                  className="inline-flex min-h-11 items-center border border-white/50 px-5 py-2 text-sm font-semibold text-white"
                >
                  Get a Quote on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
