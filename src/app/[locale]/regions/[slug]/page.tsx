import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContactCta } from "@/components/content/contact-cta";
import { ContentSection } from "@/components/content/content-section";
import { MediaFrame } from "@/components/content/media-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { brand, createWhatsAppUrl } from "@/config/brand";
import { isLocale, locales } from "@/config/i18n";
import {
  getRegionLandingPage,
  regionLandingPages,
  type RegionLandingPage,
} from "@/config/region-landing-pages";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createContentHreflang,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { regionRepository } from "@/lib/wordpress/repositories";

type RegionPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const staticPaths = regionLandingPages.map((region) => ({
    locale: "en" as const,
    slug: region.slug,
  }));
  const paths = await Promise.all(
    locales.map(async (locale) =>
      (await regionRepository.getStaticParams(locale)).map(({ slug }) => ({
        locale,
        slug,
      })),
    ),
  );
  return ensureStaticExportParams([...staticPaths, ...paths.flat()]);
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const staticRegion = locale === "en" ? getRegionLandingPage(slug) : undefined;
  if (staticRegion) {
    const path = buildLocalizedPath(locale, `regions/${slug}`);
    return createMetadata({
      locale,
      path,
      title: staticRegion.seoTitle,
      description: staticRegion.metaDescription,
      hreflang: createContentHreflang({
        locale,
        currentPath: path,
        published: {},
      }),
    });
  }
  const region = await regionRepository.getBySlug(locale, slug);
  if (!region) return {};
  const path = buildLocalizedPath(locale, `regions/${slug}`);
  return createMetadata({
    locale,
    path,
    title: stripHtml(region.title),
    description: stripHtml(region.marketSummary || region.excerpt),
    seo: region.seo,
    hreflang: createContentHreflang({
      locale,
      currentPath: path,
      published: region.hreflang,
    }),
    openGraphImage: region.heroImage,
  });
}

function RegionTextCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-line bg-surface p-6">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="mt-4 leading-8 text-muted">{children}</div>
    </section>
  );
}

function RegionListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="border border-line bg-surface p-6">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 grid gap-3 leading-7 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StaticRegionPage({
  locale,
  region,
}: {
  locale: "en";
  region: RegionLandingPage;
}) {
  const path = buildLocalizedPath(locale, `regions/${region.slug}`);
  const url = buildSiteUrl(path);
  const whatsappUrl = createWhatsAppUrl(
    `Hello ${brand.name}, I would like to discuss a ${region.market} regional project inquiry.`,
  );
  const graph = createSchemaGraph([
    createCreativeWorkSchema({
      id: `${url}#region`,
      url,
      name: region.h1,
      description: region.metaDescription,
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      {
        name: "Regions",
        url: buildSiteUrl(buildLocalizedPath(locale, "regions")),
      },
      { name: region.market, url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <article>
        <section className="border-b border-line bg-foreground text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
            <header>
              <Link
                href={`/${locale}/regions/`}
                className="text-sm font-semibold text-white/70 hover:text-white"
              >
                Back to Regions
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase text-brand">
                Regional inquiry support
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
                {region.h1}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
                {region.heroSubtitle}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
                >
                  {region.primaryCta}
                </Link>
                <Link
                  href={`/${locale}/downloads/`}
                  className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
                >
                  {region.secondaryCta}
                </Link>
                <a
                  href={whatsappUrl}
                  className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
                >
                  {brand.whatsapp.label}
                </a>
              </div>
            </header>
            <aside className="border border-white/15 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                Target buyers
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/75">
                {region.buyerTypes.map((buyer) => (
                  <li key={buyer}>{buyer}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <RegionTextCard title="Regional project needs">
              <p>{region.regionalNeeds}</p>
            </RegionTextCard>
            <RegionTextCard title="Catalog and document support">
              <p>{region.catalogNote}</p>
              <p className="mt-4">{region.documentSupport}</p>
              <Link
                href={`/${locale}/downloads/`}
                className="mt-5 inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                {region.secondaryCta}
              </Link>
            </RegionTextCard>
          </div>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <RegionListCard
              title="Recommended product categories"
              items={region.recommendedCategories}
            />
            <RegionListCard
              title="Recommended solutions"
              items={region.recommendedSolutions}
            />
            <RegionListCard
              title="Inquiry checklist"
              items={region.inquiryChecklist}
            />
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <RegionTextCard title="Product selection for regional buyers">
              <p>{region.productSelection}</p>
            </RegionTextCard>
            <RegionTextCard title="Hotel room and automation planning">
              <p>{region.solutionPlanning}</p>
            </RegionTextCard>
          </div>

          <section className="mt-8 border border-line bg-background p-6">
            <h2 className="text-2xl font-semibold text-foreground">
              OEM/ODM customization
            </h2>
            <p className="mt-4 max-w-4xl leading-8 text-muted">
              {region.customization}
            </p>
          </section>

          <section className="mt-8 border border-line bg-surface p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-brand">
                  Regional FAQ
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                  Questions for {region.market} project inquiries
                </h2>
              </div>
              <Link
                href={`/${locale}/faqs/`}
                className="inline-flex min-h-10 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand"
              >
                View Full FAQ
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {region.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group border border-line bg-background"
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

          <section className="mt-8 border border-line bg-foreground p-7 text-white sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-white/70">
                  Regional quotation
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {region.finalCtaTitle}
                </h2>
                <p className="mt-3 max-w-3xl leading-8 text-white/75">
                  {region.finalCtaText}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
                >
                  {region.primaryCta}
                </Link>
                <a
                  href={whatsappUrl}
                  className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
                >
                  {brand.whatsapp.label}
                </a>
              </div>
            </div>
          </section>

          <section className="mt-8 border border-line bg-surface p-6">
            <p className="text-sm font-semibold uppercase text-brand">
              Safe B2B scope
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted md:grid-cols-2">
              {region.safeClaims.map((claim) => (
                <li key={claim}>{claim}</li>
              ))}
            </ul>
          </section>
        </main>

        <ContactCta locale={locale} label="Discuss Regional Project" />
      </article>
    </>
  );
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const staticRegion = locale === "en" ? getRegionLandingPage(slug) : undefined;
  if (staticRegion) {
    return <StaticRegionPage locale="en" region={staticRegion} />;
  }
  const region = await regionRepository.getBySlug(locale, slug);
  if (!region) notFound();
  const url = buildSiteUrl(buildLocalizedPath(locale, `regions/${slug}`));
  const whatsappUrl = region.whatsapp
    ? `https://wa.me/${region.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(region.whatsapp.message || "")}`
    : undefined;

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          createCreativeWorkSchema({
            id: `${url}#region`,
            url,
            name: stripHtml(region.title),
            description: stripHtml(region.marketSummary),
          }),
        ])}
      />
      <article>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <header className="self-center">
            <p className="text-sm font-semibold uppercase text-brand">
              {region.regionType} · {region.marketMaturity || "market"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              {stripHtml(region.title)}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {stripHtml(region.marketSummary)}
            </p>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                className="mt-8 inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                {region.whatsapp?.label}
              </a>
            ) : null}
          </header>
          <MediaFrame
            src={region.heroImage?.sourceUrl}
            alt={region.heroImage?.altText || stripHtml(region.title)}
          />
        </div>
        <div className="mx-auto max-w-7xl space-y-10 px-5 pb-14 sm:px-8 lg:px-12">
          <ContentSection title="Market introduction" content={region.marketIntroduction} />
          <div className="grid gap-8 md:grid-cols-2">
            <ContentSection title="Hotel demand" content={region.hotelNeeds} />
            <ContentSection title="Apartment demand" content={region.apartmentNeeds} />
          </div>
          <ContentSection title="Market opportunities" content={region.marketOpportunities} />
          <ContentSection title="Market challenges" content={region.marketChallenges} />
          <ContentSection title="Certification overview" content={region.certificationOverview} />
          <ContentSection title="Local buyer answer" content={region.geoDirectAnswer} />
        </div>
        <ContactCta locale={locale} />
      </article>
    </>
  );
}
