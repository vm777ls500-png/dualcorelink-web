import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/config/brand";
import { isLocale, locales } from "@/config/i18n";
import { staticCaseStudies } from "@/config/static-case-studies";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createSchemaGraph,
} from "@/lib/schema";

type CaseStudiesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: CaseStudiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = buildLocalizedPath(locale, "case-studies");

  return createMetadata({
    locale,
    path,
    title: "B2B Smart Hotel Case Studies",
    description:
      "Anonymous B2B case studies for smart hotel guest room control, serviced apartment automation, and OEM/ODM smart panel customization projects.",
    hreflang: createStaticHreflang(locales, "case-studies"),
  });
}

export default async function CaseStudiesPage({
  params,
}: CaseStudiesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const path = buildLocalizedPath(locale, "case-studies");
  const url = buildSiteUrl(path);
  const whatsappUrl = `https://wa.me/${brand.whatsapp.international}?text=${encodeURIComponent(
    "Hello DUALCORE LINK, I would like to discuss a smart hotel or smart home project reference.",
  )}`;
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: "DUALCORE LINK Case Studies",
      description:
        "Anonymous smart hotel, smart home, and OEM/ODM project references for B2B buyers.",
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      { name: "Case Studies", url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <header className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand">
              Anonymous project references
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground">
              Smart Hotel & Smart Home Case Studies
            </h1>
            <p className="mt-4 leading-7 text-muted">
              Explore anonymized B2B project references for hotel guest room
              control, serviced apartment automation, and OEM/ODM smart panel
              customization. Customer names, hotel brands, and exact addresses
              are intentionally not disclosed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact/#get-a-quote`}
              className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
            >
              Send Inquiry
            </Link>
            <a
              href={whatsappUrl}
              className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
            >
              {brand.whatsapp.label}
            </a>
          </div>
        </header>

        <div className="mb-10 grid gap-3 border-y border-line py-5 text-sm font-semibold text-muted sm:grid-cols-2 lg:grid-cols-4">
          <p>Anonymous references</p>
          <p>Hotel and residential projects</p>
          <p>OEM/ODM cooperation</p>
          <p>B2B project planning</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {staticCaseStudies.map((caseStudy) => (
            <article
              key={caseStudy.slug}
              className="flex flex-col border border-line bg-surface p-6"
            >
              <p className="text-xs font-semibold uppercase text-brand">
                {caseStudy.region}
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-8 text-foreground">
                {caseStudy.title}
              </h2>
              <p className="mt-3 leading-7 text-muted">{caseStudy.summary}</p>

              <dl className="mt-5 grid gap-4 border-t border-line pt-5 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">
                    Project type
                  </dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {caseStudy.projectType}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Customer type
                  </dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {caseStudy.customerType}
                  </dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">
                  Products involved
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {caseStudy.productsInvolved.slice(0, 4).map((product) => (
                    <li
                      key={product.slug}
                      className="border border-line bg-background px-3 py-2 text-xs font-semibold text-brand"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Link
                  href={`/${locale}/case-studies/${caseStudy.slug}/`}
                  className="inline-flex min-h-10 items-center justify-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white"
                >
                  View Case Study
                </Link>
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-10 items-center justify-center border border-line px-4 py-2 text-sm font-semibold text-brand"
                >
                  Discuss Project
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 border border-line bg-background p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand">
                Project consultation
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Need a similar product mix for your market?
              </h2>
              <p className="mt-3 leading-7 text-muted">
                Send your project type, target region, product needs, and
                estimated quantity. Our team can help prepare a practical
                solution direction for your hotel, apartment, or OEM/ODM plan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/solutions/`}
                className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
              >
                Explore Solutions
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
