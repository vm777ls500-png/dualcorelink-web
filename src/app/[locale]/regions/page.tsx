import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/content/empty-state";
import { PageHeading } from "@/components/content/page-heading";
import { isLocale, locales } from "@/config/i18n";
import { getRegionLandingPage } from "@/config/region-landing-pages";
import {
  buildLocalizedPath,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { stripHtml } from "@/lib/text";
import { regionRepository } from "@/lib/wordpress/repositories";

type RegionsPageProps = { params: Promise<{ locale: string }> };

const plannedMarkets = [
  { title: "Middle East", slug: "middle-east" },
  { title: "Saudi Arabia", slug: "saudi-arabia" },
  { title: "United Arab Emirates", slug: "uae" },
  { title: "Southeast Asia", slug: "southeast-asia" },
  { title: "Vietnam", slug: "vietnam" },
  { title: "Indonesia", slug: "indonesia" },
  { title: "Thailand", slug: "thailand" },
  { title: "Malaysia", slug: "malaysia" },
];

export async function generateMetadata({
  params,
}: RegionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "regions"),
    title: "Regional Smart Home Markets",
    description:
      "Smart home requirements, certifications, and project priorities across the Middle East and Southeast Asia.",
    hreflang: createStaticHreflang(locales, "regions"),
  });
}

export default async function RegionsPage({ params }: RegionsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const regions = await regionRepository.list(locale);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <PageHeading
        eyebrow="Markets"
        title="Regional smart home intelligence"
        description="Local demand, technical conditions, certification context, and recommended product strategies."
      />
      {regions.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Regional pages are being prepared"
            description="We currently support regional inquiries through the contact form, WhatsApp, and multilingual catalogs while dedicated market pages are prepared."
          />
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {regions.map((region) => (
            <li key={region.id} className="border border-line bg-surface p-6">
              <p className="text-xs font-semibold uppercase text-brand">
                {region.regionType} · {region.marketMaturity || "market"}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                <Link href={`/${locale}/regions/${region.slug}/`}>
                  {stripHtml(region.title)}
                </Link>
              </h2>
              <p className="mt-4 leading-7 text-muted">
                {stripHtml(region.marketSummary || region.excerpt)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <section className="mt-10 border border-line bg-surface p-6">
        <p className="text-sm font-semibold uppercase text-brand">
          Target markets
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Regional Project Inquiry Support
        </h2>
        <p className="mt-3 max-w-4xl leading-7 text-muted">
          We support smart hotel and OEM/ODM project inquiries from the Middle
          East and Southeast Asia, including product selection, panel
          customization, catalog sharing, and controlled document requests.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {plannedMarkets.map((market) => (
            <li key={market.slug}>
              {getRegionLandingPage(market.slug) ? (
                <Link
                  href={`/${locale}/regions/${market.slug}/`}
                  className="inline-flex min-h-10 items-center border border-line bg-background px-3 py-2 text-sm font-semibold text-brand hover:border-brand"
                >
                  {market.title}
                </Link>
              ) : (
                <span className="inline-flex min-h-10 items-center border border-line bg-background px-3 py-2 text-sm font-semibold text-muted">
                  {market.title}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-muted">
          For regional projects, share your country, hotel room type, voltage
          and frequency requirements, protocol preference, estimated quantity,
          and required documents so our team can prepare the right product
          direction.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact/#get-a-quote`}
            className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          >
            Discuss Regional Project
          </Link>
          <Link
            href={`/${locale}/downloads/`}
            className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 font-semibold text-brand"
          >
            View Catalogs
          </Link>
        </div>
      </section>
    </main>
  );
}
