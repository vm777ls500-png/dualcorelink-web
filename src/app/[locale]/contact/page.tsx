import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCard } from "@/components/contact/contact-card";
import { GetQuoteForm } from "@/components/contact/get-quote-form";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { CmsPage } from "@/components/content/cms-page";
import { brand } from "@/config/brand";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { stripHtml } from "@/lib/text";
import { pageRepository } from "@/lib/wordpress/repositories";

type ContactPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = await pageRepository.getBySlug(locale, "contact");
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "contact"),
    title: stripHtml(page?.title || "Contact DUALCORE LINK"),
    description: stripHtml(
      page?.excerpt ||
        "Contact DUALCORE LINK for smart home products, OEM projects, distribution, and integration support.",
    ),
    seo: page?.seo,
    hreflang: createStaticHreflang(locales, "contact"),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = await pageRepository.getBySlug(locale, "contact");
  const whatsappMessage = `Hello ${brand.name}, I would like to discuss a smart hotel or smart home B2B project.`;

  return (
    <CmsPage
      page={page}
      eyebrow="Project contact"
      fallbackTitle="Talk to our B2B team"
      fallbackDescription="Share your market, project type, required products, estimated quantity, and delivery target."
    >
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <ContactCard
          label="Sales & quotations"
          value={brand.emails.sales}
          href={`mailto:${brand.emails.sales}`}
          description={brand.emailPurposes.sales}
          highlight
        />
        <ContactCard
          label="General contact"
          value={brand.emails.general}
          href={`mailto:${brand.emails.general}`}
          description={brand.emailPurposes.general}
        />
        <ContactCard
          label="Technical support"
          value={brand.emails.support}
          href={`mailto:${brand.emails.support}`}
          description={brand.emailPurposes.support}
        />
        <div className="border border-line bg-surface p-6">
          <p className="text-sm font-semibold uppercase text-brand">WhatsApp</p>
          <p className="mt-3 text-xl font-semibold">{brand.whatsapp.display}</p>
          <p className="mt-3 leading-7 text-muted">
            Fast quotation support for product lists, hotel projects, and
            OEM/ODM requirements.
          </p>
          <WhatsAppButton message={whatsappMessage} className="mt-5 inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white" />
        </div>
      </div>
      <section id="get-a-quote" className="mt-12">
        <h2 className="text-3xl font-semibold text-foreground">Get a Quote</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Send inquiry details to our sales team. Until backend email delivery
          is configured, this form opens an email draft to{" "}
          <a href={`mailto:${brand.emails.sales}`} className="font-semibold text-brand">
            {brand.emails.sales}
          </a>
          .
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          For Middle East and Southeast Asia projects, include your country,
          hotel room type, voltage and frequency requirements, protocol
          preference, estimated quantity, and required documents.
        </p>
        <div className="mt-6">
          <GetQuoteForm />
        </div>
      </section>
    </CmsPage>
  );
}
