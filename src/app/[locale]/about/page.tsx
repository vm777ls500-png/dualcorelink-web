import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import { brand } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import {
  arabicAboutCopy,
  chineseAboutCopy,
} from "@/config/static-page-localization";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
} from "@/lib/localized-publication";
import {
  createBreadcrumbSchema,
  createSchemaGraph,
  organizationId,
  websiteId,
} from "@/lib/schema";

type AboutPageProps = { params: Promise<{ locale: string }> };

const title = "About DUALCORE LINK B2B Automation";
const description =
  "Learn how DUALCORE LINK supports smart hotel and smart home automation buyers with OEM/ODM product planning, room control devices, and B2B project support.";

const deliverySteps = [
  "Product concept and function planning",
  "Product matching for project needs",
  "OEM manufacturing partner coordination",
  "Sample evaluation",
  "Order confirmation",
  "Project and technical support",
];

const capabilities = [
  "RCU room control hosts",
  "AI smart control displays",
  "Smart panels and switches",
  "Sensors",
  "Smart sockets and power modules",
  "Curtain control",
  "HVAC control",
  "Room status and hotel service panels",
  "Hotel delivery robot systems",
];

const customerTypes = [
  "Hotel owners",
  "Hotel project contractors",
  "System integrators",
  "Smart home distributors",
  "Engineering companies",
  "OEM/ODM partners",
];

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(locale, "static", "about");
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);

  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "about"),
    title,
    description,
    hreflang: getPublicationHreflang("about"),
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const localizedPage = getLocalizedPublicationPage(locale, "static", "about");
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const isChinese = locale === "zh" && Boolean(localizedPage);
  const isArabic = locale === "ar" && Boolean(localizedPage);
  const isLocalized = isChinese || isArabic;
  const aboutCopy = isArabic
    ? arabicAboutCopy
    : isChinese
      ? chineseAboutCopy
      : null;
  const localizedSections = localizedPage?.content.sections ?? [];
  const profileParagraphs = isLocalized
    ? localizedSections[0]?.paragraphs ?? []
    : [
        "DualCoreLink focuses on product design, solution planning, system matching, and project communication for smart hotel and smart home automation projects. We help B2B buyers organize a practical product mix around room functions, project goals, installation needs, and commercial requirements.",
        "Our products are manufactured by qualified OEM partners according to our design requirements and confirmed project needs. DualCoreLink coordinates product selection, samples, order requirements, and project support with customers and qualified production partners.",
      ];
  const deliveryParagraphs = isLocalized
    ? localizedSections[1]?.paragraphs ?? []
    : [
        "Each project starts with confirmed functional, appearance, and integration requirements. Product choices and customization scope are reviewed before samples, quotation, and production coordination move forward.",
      ];
  const workflowSteps = isLocalized
    ? localizedSections[1]?.bullets ?? []
    : deliverySteps;
  const customizationParagraphs = isLocalized
    ? localizedSections[2]?.paragraphs ?? []
    : [
        "Project discussions can cover appearance customization, panel layout, button function configuration, logo and packaging, product combination planning, and project-specific matching.",
        "The final customization scope depends on product type, order quantity, and confirmed project requirements.",
      ];
  const supportParagraphs = isLocalized
    ? localizedSections[3]?.paragraphs ?? []
    : [
        "Support can include installation guidance, wiring references, product information, technical communication, and solution matching. The general warranty period is one year, with final terms depending on the product and order requirements.",
      ];
  const aboutPath = buildLocalizedPath(locale, "about");
  const aboutUrl = buildSiteUrl(aboutPath);
  const whatsappUrl = `https://wa.me/${brand.whatsapp.international}`;

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          {
            "@type": "AboutPage",
            "@id": `${aboutUrl}#about`,
            url: aboutUrl,
            name: localizedPage?.title ?? title,
            description: localizedPage?.metaDescription ?? description,
            isPartOf: { "@id": websiteId },
            about: { "@id": organizationId },
          },
          createBreadcrumbSchema(`${aboutUrl}#breadcrumb`, [
            {
              name: aboutCopy?.breadcrumbHome ?? "Home",
              url: buildSiteUrl(getLocalizedCompositionHomePath(locale)),
            },
            {
              name: aboutCopy?.breadcrumbAbout ?? "About",
              url: aboutUrl,
            },
          ]),
        ])}
      />

      <main className="about-page-shell">
        <section className="about-company-hero border-b border-line bg-foreground text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <p className="text-sm font-semibold uppercase text-accent">
              {aboutCopy?.heroEyebrow ?? "Company profile"}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
              {localizedPage?.content.h1 ??
                "Smart Hotel & Smart Home Solution Provider"}
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/75">
              {localizedPage?.content.introduction ??
                "DualCoreLink supports overseas B2B projects with smart hotel room control solutions, smart home automation products, OEM/ODM customization, and practical project support for system integrators, contractors, distributors, and solution partners."}
            </p>
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div className="about-info-panel border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {aboutCopy?.profileEyebrow ?? "Company profile"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                {aboutCopy?.profileTitle ?? "Who We Are"}
              </h2>
              {profileParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "mt-5 leading-8 text-muted" : "mt-4 leading-8 text-muted"}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="about-info-panel border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {aboutCopy?.deliveryEyebrow ?? "Delivery model"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                {aboutCopy
                  ? aboutCopy.deliveryTitle
                  : "From Product Design to Qualified Production"}
              </h2>
              {deliveryParagraphs.map((paragraph) => (
                <p key={paragraph} className="mt-5 leading-8 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <p className="text-sm font-semibold uppercase text-brand">
              {aboutCopy?.workflowEyebrow ?? "Project workflow"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              {aboutCopy
                ? aboutCopy.workflowTitle
                : "A Clear Path from Requirement to Project Support"}
            </h2>
            <ol className="mt-8 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {workflowSteps.map((step, index) => (
                <li key={step} className="about-step-card bg-background p-5">
                  <span className="text-sm font-semibold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-semibold text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <p className="text-sm font-semibold uppercase text-brand">
              {aboutCopy?.capabilityEyebrow ?? "Solution capability"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              {aboutCopy
                ? aboutCopy.capabilityTitle
                : "Smart Hotel Room Control Capabilities"}
            </h2>
            <p className="mt-4 max-w-4xl leading-8 text-muted">
              {aboutCopy
                ? aboutCopy.capabilityDescription
                : "We plan product combinations for complete hotel guest room control solutions and connected smart home projects."}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(aboutCopy ? aboutCopy.capabilities : capabilities).map((capability) => (
                <li
                  key={capability}
                  className="about-capability-card border border-line bg-surface p-5 font-semibold text-foreground"
                >
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div className="about-info-panel border border-line bg-background p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {aboutCopy?.customizationEyebrow ?? "Customization"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                {aboutCopy
                  ? aboutCopy.customizationTitle
                  : "OEM/ODM Project Support"}
              </h2>
              {customizationParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "mt-5 leading-8 text-muted"
                      : "mt-4 border-s-4 border-accent ps-5 leading-7 text-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="about-info-panel border border-line bg-background p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {aboutCopy?.customersEyebrow ?? "Customers"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                {aboutCopy?.customersTitle ?? "Who We Work With"}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {(aboutCopy ? aboutCopy.customerTypes : customerTypes).map((customerType) => (
                  <li
                    key={customerType}
                    className="border-b border-line pb-3 font-semibold text-foreground"
                  >
                    {customerType}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div className="about-info-panel border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {aboutCopy?.marketsEyebrow ?? "Target markets"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                {aboutCopy
                  ? aboutCopy.marketsTitle
                  : "Middle East & Southeast Asia"}
              </h2>
              <p className="mt-5 leading-8 text-muted">
                {aboutCopy
                  ? aboutCopy.marketsDescription
                  : "Our main focus markets are the Middle East and Southeast Asia. We also support overseas B2B smart hotel and smart home projects in other regions where product and project requirements can be clearly reviewed."}
              </p>
            </div>
            <div className="about-info-panel border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {aboutCopy?.commercialEyebrow ?? "Commercial terms"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                {aboutCopy
                  ? aboutCopy.commercialTitle
                  : "Samples, MOQ & Lead Time"}
              </h2>
              <ul className="mt-5 space-y-3 leading-7 text-muted">
                {(aboutCopy
                  ? aboutCopy.commercialItems
                  : [
                      "Samples are available for evaluation.",
                      "Customers pay the sample cost and shipping cost.",
                      "Regular products do not have a fixed minimum order quantity. Customized products may involve tooling or customization fees when a new mold is required. A color-only change using an existing mold does not require a customization fee.",
                      "Typical lead time is 7–15 days. Actual timing depends on the product, order quantity, customization scope, and project requirements.",
                    ]
                ).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <p className="text-sm font-semibold uppercase text-brand">
              {aboutCopy?.supportEyebrow ?? "Technical support"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              {aboutCopy
                ? aboutCopy.supportTitle
                : "Project & Technical Support"}
            </h2>
            {supportParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-4xl leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="about-final-cta bg-brand text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <p className="text-sm font-semibold uppercase text-white/65">
              {aboutCopy?.inquiryEyebrow ?? "Project inquiry"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {aboutCopy?.inquiryTitle ?? "Discuss Your Project"}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-white/75">
              {aboutCopy
                ? aboutCopy.inquiryDescription
                : "Share your room types, product interests, quantity range, customization needs, and delivery plan with our B2B team."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact/`}
                className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
              >
                {aboutCopy?.contactLabel ?? "Contact Us"}
              </Link>
              <Link
                href={`/${locale}/solutions/`}
                className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
              >
                {aboutCopy?.solutionsLabel ?? "Explore Solutions"}
              </Link>
              <a
                href={whatsappUrl}
                className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
              >
                {aboutCopy
                  ? aboutCopy.whatsappLabel
                  : "Get a Quote on WhatsApp"}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-6 text-sm text-white/75">
              <a href={`mailto:${brand.emails.sales}`}>{brand.emails.sales}</a>
              <a href={`mailto:${brand.emails.general}`}>{brand.emails.general}</a>
              <a href={`mailto:${brand.emails.support}`}>{brand.emails.support}</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
