import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactCard } from "@/components/contact/contact-card";
import { GetQuoteForm } from "@/components/contact/get-quote-form";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { PageHeading } from "@/components/content/page-heading";
import { brand } from "@/config/brand";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { isServerInquirySubmissionEnabled } from "@/lib/inquiry/submission";
import { stripHtml } from "@/lib/text";
import { pageRepository } from "@/lib/wordpress/repositories";

type ContactPageProps = { params: Promise<{ locale: string }> };

const officeAddress =
  "Unit 1-2202, Building 19, Yuhe Xincheng East District, Yuhe Road, Yunhe District, Cangzhou City, Hebei Province, China";
const wechatId = "a13703333750";
const phoneNumber = "+86 13703333750";
const phoneHref = "tel:+8613703333750";
const serverSubmissionEnabled = isServerInquirySubmissionEnabled(
  process.env.NEXT_PUBLIC_INQUIRY_SUBMISSION_ENABLED,
  process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT,
);

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
  const body = stripHtml(page?.content || "");
  const contactSource = {
    sourcePage: `/${locale}/contact/`,
    contentType: "contact" as const,
  };

  return (
    <main className="contact-page-shell mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-12">
      <section className="contact-conversion-hero border border-line bg-surface p-6">
        <PageHeading
          eyebrow="Project contact"
          title={stripHtml(page?.title || "Talk to our B2B team")}
          description={stripHtml(
            page?.excerpt ||
              "Share your market, project type, required products, estimated quantity, and delivery target.",
          )}
        />
      </section>
      {body ? (
        <p className="contact-intro-copy mt-10 whitespace-pre-line border-t border-line pt-8 leading-8 text-muted">
          {body}
        </p>
      ) : null}
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <ContactCard
          label="Sales & quotations"
          value={brand.emails.sales}
          href={`mailto:${brand.emails.sales}`}
          description={brand.emailPurposes.sales}
          highlight
          attribution={{
            ...contactSource,
            ctaPosition: "sales_email_card",
          }}
        />
        <ContactCard
          label="General contact"
          value={brand.emails.general}
          href={`mailto:${brand.emails.general}`}
          description={brand.emailPurposes.general}
          attribution={{
            ...contactSource,
            ctaPosition: "general_email_card",
          }}
        />
        <ContactCard
          label="Technical support"
          value={brand.emails.support}
          href={`mailto:${brand.emails.support}`}
          description={brand.emailPurposes.support}
          attribution={{
            ...contactSource,
            ctaPosition: "support_email_card",
          }}
        />
        <div className="contact-method-card border border-line bg-surface p-6">
          <p className="text-sm font-semibold uppercase text-brand">WhatsApp</p>
          <p className="mt-3 text-xl font-semibold">{brand.whatsapp.display}</p>
          <p className="mt-3 leading-7 text-muted">
            Fast quotation support for product lists, hotel projects, and
            OEM/ODM requirements.
          </p>
          <WhatsAppButton
            message={whatsappMessage}
            attribution={{
              ...contactSource,
              ctaPosition: "whatsapp_card",
            }}
            className="contact-method-action mt-5 inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          />
        </div>
      </div>
      <section className="mt-10 border-y border-line py-8">
        <p className="text-sm font-semibold uppercase text-brand">
          Faster project review
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Include the details that shape product selection
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground">Project scope</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Country, hotel type, room count, project stage, and delivery target.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Technical fit</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Voltage, frequency, protocol, wiring, panel finish, and room functions.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Commercial needs</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Estimated quantity, OEM/ODM scope, documents, samples, and packaging.
            </p>
          </div>
        </div>
      </section>
      <section className="contact-details-panel mt-8 border border-line bg-surface p-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-brand">
              Contact Details
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">
              Office Address, WeChat and Phone
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-foreground">Office Address</dt>
                <dd className="mt-2 leading-7 text-muted">{officeAddress}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">WeChat ID</dt>
                <dd className="mt-2 text-muted">{wechatId}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Phone</dt>
                <dd className="mt-2">
                  <a className="font-semibold text-brand" href={phoneHref}>
                    {phoneNumber}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="max-w-[220px]">
            <Image
              src="/media/contact/wechat-allan-qr.png"
              alt="WeChat QR code for DualCoreLink contact"
              width={220}
              height={220}
              className="h-auto w-full border border-line bg-white p-2"
            />
            <p className="mt-3 text-sm leading-6 text-muted">
              Scan to add WeChat contact.
            </p>
          </div>
        </div>
      </section>
      <section id="get-a-quote" className="contact-quote-section mt-12">
        <h2 className="text-3xl font-semibold text-foreground">Get a Quote</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          {serverSubmissionEnabled
            ? "Submit inquiry details securely to our sales team. If delivery is unavailable, use "
            : "Send inquiry details to our sales team. This form opens an email draft to "}
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
        <ol className="mt-6 grid gap-4 border-y border-line py-5 text-sm md:grid-cols-3">
          <li><strong className="text-brand">1.</strong> Share the project brief and product interest.</li>
          <li><strong className="text-brand">2.</strong> We review technical fit and document needs.</li>
          <li><strong className="text-brand">3.</strong> Continue by email or WhatsApp for quotation details.</li>
        </ol>
        <div className="mt-6">
          <GetQuoteForm />
        </div>
      </section>
    </main>
  );
}
