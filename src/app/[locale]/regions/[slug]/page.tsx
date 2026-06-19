import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/content/contact-cta";
import { ContentSection } from "@/components/content/content-section";
import { MediaFrame } from "@/components/content/media-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, locales } from "@/config/i18n";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createContentHreflang,
  createMetadata,
} from "@/lib/seo";
import { createCreativeWorkSchema, createSchemaGraph } from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { regionRepository } from "@/lib/wordpress/repositories";

type RegionPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths = await Promise.all(
    locales.map(async (locale) =>
      (await regionRepository.getStaticParams(locale)).map(({ slug }) => ({
        locale,
        slug,
      })),
    ),
  );
  return ensureStaticExportParams(paths.flat());
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
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

export default async function RegionPage({ params }: RegionPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
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
