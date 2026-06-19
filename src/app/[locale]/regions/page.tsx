import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/content/empty-state";
import { PageHeading } from "@/components/content/page-heading";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { stripHtml } from "@/lib/text";
import { regionRepository } from "@/lib/wordpress/repositories";

type RegionsPageProps = { params: Promise<{ locale: string }> };

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
            title="No regions published"
            description="Published WordPress region pages will appear here automatically."
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
    </main>
  );
}
