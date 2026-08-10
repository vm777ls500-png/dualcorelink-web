import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactCard } from "@/components/contact/contact-card";
import { GetQuoteForm } from "@/components/contact/get-quote-form";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { PageHeading } from "@/components/content/page-heading";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import { chineseContactCopy } from "@/config/static-page-localization";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createSchemaGraph,
  organizationId,
  websiteId,
} from "@/lib/schema";
import { isServerInquirySubmissionEnabled } from "@/lib/inquiry/submission";
import { stripHtml } from "@/lib/text";
import { pageRepository } from "@/lib/wordpress/repositories";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
} from "@/lib/localized-publication";

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
  const localizedPage = getLocalizedPublicationPage(locale, "static", "contact");
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
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
    hreflang: getPublicationHreflang("contact"),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const localizedPage = getLocalizedPublicationPage(locale, "static", "contact");
  if (localizedPage && locale !== "zh") {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }
  const isChinese = locale === "zh" && Boolean(localizedPage);
  const page = localizedPage
    ? undefined
    : await pageRepository.getBySlug(locale, "contact");
  const whatsappMessage = isChinese
    ? `您好 ${brand.name}，我想咨询智能酒店或智能家居 B2B 项目。`
    : `Hello ${brand.name}, I would like to discuss a smart hotel or smart home B2B project.`;
  const body = stripHtml(page?.content || "");
  const contactSource = {
    sourcePage: `/${locale}/contact/`,
    contentType: "contact" as const,
  };
  const contactUrl = buildSiteUrl(buildLocalizedPath(locale, "contact"));
  const contactTitle =
    localizedPage?.content.h1 ??
    stripHtml(page?.title || "Talk to our B2B team");
  const contactDescription =
    localizedPage?.content.introduction ??
    stripHtml(
      page?.excerpt ||
        "Share your market, project type, required products, estimated quantity, and delivery target.",
    );

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          {
            "@type": "ContactPage",
            "@id": `${contactUrl}#contact`,
            url: contactUrl,
            name: localizedPage?.title ?? contactTitle,
            description:
              localizedPage?.metaDescription ?? contactDescription,
            isPartOf: { "@id": websiteId },
            about: { "@id": organizationId },
          },
          createBreadcrumbSchema(`${contactUrl}#breadcrumb`, [
            {
              name: isChinese ? "首页" : "Home",
              url: buildSiteUrl(buildLocalizedPath(locale)),
            },
            {
              name: localizedPage?.content.breadcrumbLabel ?? "Contact",
              url: contactUrl,
            },
          ]),
        ])}
      />
      <main className="contact-page-shell mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-12">
      <section className="contact-conversion-hero border border-line bg-surface p-6">
        <PageHeading
          eyebrow={isChinese ? chineseContactCopy.eyebrow : "Project contact"}
          title={contactTitle}
          description={contactDescription}
        />
      </section>
      {body ? (
        <p className="contact-intro-copy mt-10 whitespace-pre-line border-t border-line pt-8 leading-8 text-muted">
          {body}
        </p>
      ) : null}
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <ContactCard
          label={isChinese ? chineseContactCopy.salesLabel : "Sales & quotations"}
          value={brand.emails.sales}
          href={`mailto:${brand.emails.sales}`}
          description={
            isChinese
              ? chineseContactCopy.salesDescription
              : brand.emailPurposes.sales
          }
          highlight
          attribution={{
            ...contactSource,
            ctaPosition: "sales_email_card",
          }}
        />
        <ContactCard
          label={isChinese ? chineseContactCopy.generalLabel : "General contact"}
          value={brand.emails.general}
          href={`mailto:${brand.emails.general}`}
          description={
            isChinese
              ? chineseContactCopy.generalDescription
              : brand.emailPurposes.general
          }
          attribution={{
            ...contactSource,
            ctaPosition: "general_email_card",
          }}
        />
        <ContactCard
          label={isChinese ? chineseContactCopy.supportLabel : "Technical support"}
          value={brand.emails.support}
          href={`mailto:${brand.emails.support}`}
          description={
            isChinese
              ? chineseContactCopy.supportDescription
              : brand.emailPurposes.support
          }
          attribution={{
            ...contactSource,
            ctaPosition: "support_email_card",
          }}
        />
        <div className="contact-method-card border border-line bg-surface p-6">
          <p className="text-sm font-semibold uppercase text-brand">WhatsApp</p>
          <p className="mt-3 text-xl font-semibold">{brand.whatsapp.display}</p>
          <p className="mt-3 leading-7 text-muted">
            {isChinese
              ? chineseContactCopy.whatsappDescription
              : "Fast quotation support for product lists, hotel projects, and OEM/ODM requirements."}
          </p>
          <WhatsAppButton
            message={whatsappMessage}
            label={
              isChinese ? chineseContactCopy.whatsappLabel : undefined
            }
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
          {isChinese ? chineseContactCopy.reviewEyebrow : "Faster project review"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          {isChinese
            ? chineseContactCopy.reviewTitle
            : "Include the details that shape product selection"}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {(isChinese
            ? chineseContactCopy.reviewItems
            : [
                ["Project scope", "Country, hotel type, room count, project stage, and delivery target."],
                ["Technical fit", "Voltage, frequency, protocol, wiring, panel finish, and room functions."],
                ["Commercial needs", "Estimated quantity, OEM/ODM scope, documents, samples, and packaging."],
              ]
          ).map(([title, description]) => (
            <div key={title}>
              <p className="font-semibold text-foreground">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="contact-details-panel mt-8 border border-line bg-surface p-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-brand">
              {isChinese ? chineseContactCopy.detailsEyebrow : "Contact Details"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">
              {isChinese
                ? chineseContactCopy.detailsTitle
                : "Office Address, WeChat and Phone"}
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-foreground">
                  {isChinese ? chineseContactCopy.officeLabel : "Office Address"}
                </dt>
                <dd className="mt-2 leading-7 text-muted">{officeAddress}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  {isChinese ? chineseContactCopy.wechatLabel : "WeChat ID"}
                </dt>
                <dd className="mt-2 text-muted">{wechatId}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  {isChinese ? chineseContactCopy.phoneLabel : "Phone"}
                </dt>
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
              alt={
                isChinese
                  ? chineseContactCopy.qrAlt
                  : "WeChat QR code for DualCoreLink contact"
              }
              width={220}
              height={220}
              className="h-auto w-full border border-line bg-white p-2"
            />
            <p className="mt-3 text-sm leading-6 text-muted">
              {isChinese
                ? chineseContactCopy.qrHelp
                : "Scan to add WeChat contact."}
            </p>
          </div>
        </div>
      </section>
      <section id="get-a-quote" className="contact-quote-section mt-12">
        <h2 className="text-3xl font-semibold text-foreground">
          {isChinese ? chineseContactCopy.quoteTitle : "Get a Quote"}
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          {serverSubmissionEnabled
            ? isChinese
              ? `${chineseContactCopy.quoteServerIntro} `
              : "Submit inquiry details securely to our sales team. If delivery is unavailable, use "
            : isChinese
              ? `${chineseContactCopy.quoteMailtoIntro} `
              : "Send inquiry details to our sales team. This form opens an email draft to "}
          <a href={`mailto:${brand.emails.sales}`} className="font-semibold text-brand">
            {brand.emails.sales}
          </a>
          .
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          {isChinese
            ? chineseContactCopy.quoteHelp
            : "For Middle East and Southeast Asia projects, include your country, hotel room type, voltage and frequency requirements, protocol preference, estimated quantity, and required documents."}
        </p>
        <ol className="mt-6 grid gap-4 border-y border-line py-5 text-sm md:grid-cols-3">
          {(isChinese
            ? chineseContactCopy.quoteSteps
            : [
                "Share the project brief and product interest.",
                "We review technical fit and document needs.",
                "Continue by email or WhatsApp for quotation details.",
              ]
          ).map((step, index) => (
            <li key={step}>
              <strong className="text-brand">{index + 1}.</strong> {step}
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <GetQuoteForm locale={locale} />
        </div>
      </section>
      </main>
    </>
  );
}
