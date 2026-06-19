import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPage } from "@/components/content/cms-page";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { stripHtml } from "@/lib/text";
import { pageRepository } from "@/lib/wordpress/repositories";
import { brand } from "@/config/brand";

type AboutPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = await pageRepository.getBySlug(locale, "about");
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "about"),
    title: stripHtml(page?.title || "About DUALCORE LINK"),
    description: stripHtml(
      page?.excerpt ||
        "Smart home manufacturing, integration, and global B2B supply support.",
    ),
    seo: page?.seo,
    hreflang: createStaticHreflang(locales, "about"),
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = await pageRepository.getBySlug(locale, "about");

  return (
    <CmsPage
      page={page}
      eyebrow="Company"
      fallbackTitle="About DUALCORE LINK"
      fallbackDescription="A B2B smart home platform connecting product engineering, project integration, and global supply."
    >
      <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
        <div className="bg-surface p-6">
          <dt className="text-sm text-muted">Brand</dt>
          <dd className="mt-2 font-semibold">{brand.name}</dd>
        </div>
        <div className="bg-surface p-6">
          <dt className="text-sm text-muted">Legal entity</dt>
          <dd className="mt-2 font-semibold">{brand.legalEntity}</dd>
        </div>
        <div className="bg-surface p-6">
          <dt className="text-sm text-muted">Core markets</dt>
          <dd className="mt-2 font-semibold">Middle East & Southeast Asia</dd>
        </div>
      </dl>
      <div className="mt-8 border-s-4 border-accent ps-5">
        <p className="text-sm font-semibold uppercase text-brand">
          Manufacturing & supply chain
        </p>
        <p className="mt-2 text-lg font-semibold">{brand.supplyChainEntity}</p>
      </div>
    </CmsPage>
  );
}
