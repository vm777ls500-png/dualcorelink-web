import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/config/brand";
import { isLocale, type Locale } from "@/config/i18n";
import {
  getStaticCaseStudy,
  staticCaseStudies,
  type StaticCaseStudy,
} from "@/config/static-case-studies";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  createSchemaGraph,
} from "@/lib/schema";

type CaseStudyPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const caseStudyMetaOverrides: Record<
  string,
  { title: string; description: string }
> = {
  "middle-east-smart-hotel-guest-room-control-project": {
    title: "Middle East Hotel Room Control Case",
    description:
      "Anonymous smart hotel case study for Middle East guest room control, covering RCU planning, sensors, sockets, curtain control, and service panels.",
  },
  "southeast-asia-serviced-apartment-residential-automation-project": {
    title: "Southeast Asia Apartment Automation Case",
    description:
      "Anonymous serviced apartment automation case for Southeast Asia buyers planning smart displays, sensors, sockets, curtain panels, and OEM/ODM options.",
  },
  "overseas-oem-odm-smart-panel-customization-project": {
    title: "Overseas OEM/ODM Smart Panel Case",
    description:
      "Anonymous OEM/ODM smart panel case for overseas partners planning private label design, panel layout options, product mix, and B2B project supply.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return staticCaseStudies.map((caseStudy) => ({
    locale: "en",
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const caseStudy = getStaticCaseStudy(slug);
  if (!caseStudy) return {};

  const path = buildLocalizedPath(locale, `case-studies/${caseStudy.slug}`);
  const metaOverride = caseStudyMetaOverrides[caseStudy.slug];

  return createMetadata({
    locale,
    path,
    title: metaOverride?.title ?? `${caseStudy.title} | Anonymous Case Study`,
    description: metaOverride?.description ?? caseStudy.summary,
  });
}

function CaseStudyHero({
  caseStudy,
  locale,
}: {
  caseStudy: StaticCaseStudy;
  locale: Locale;
}) {
  const whatsappUrl = `https://wa.me/${brand.whatsapp.international}?text=${encodeURIComponent(
    `Hello DUALCORE LINK, I would like to discuss a project similar to ${caseStudy.title}.`,
  )}`;

  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
        <div>
          <Link
            href={`/${locale}/case-studies/`}
            className="text-sm font-semibold text-brand"
          >
            Back to Case Studies
          </Link>
          <p className="mt-5 text-sm font-semibold uppercase text-brand">
            Anonymous case study
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {caseStudy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {caseStudy.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
        </div>
        <aside className="border border-line bg-background p-6">
          <p className="text-sm font-semibold uppercase text-brand">
            Project snapshot
          </p>
          <dl className="mt-5 grid gap-4">
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">
                Region
              </dt>
              <dd className="mt-1 leading-7 text-foreground">
                {caseStudy.region}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">
                Project type
              </dt>
              <dd className="mt-1 leading-7 text-foreground">
                {caseStudy.projectType}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">
                Customer type
              </dt>
              <dd className="mt-1 leading-7 text-foreground">
                {caseStudy.customerType}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function TextList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border border-line bg-surface p-5">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 grid gap-3 leading-7 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const caseStudy = getStaticCaseStudy(slug);
  if (!caseStudy) notFound();

  const path = buildLocalizedPath(locale, `case-studies/${caseStudy.slug}`);
  const url = buildSiteUrl(path);
  const graph = createSchemaGraph([
    ...(caseStudy.schemaEnabled
      ? [
          createCreativeWorkSchema({
            id: `${url}#case-study`,
            url,
            name: caseStudy.title,
            description: caseStudy.summary,
          }),
        ]
      : []),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      {
        name: "Case Studies",
        url: buildSiteUrl(buildLocalizedPath(locale, "case-studies")),
      },
      { name: caseStudy.title, url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <CaseStudyHero caseStudy={caseStudy} locale={locale} />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-line bg-background p-6">
            <p className="text-sm font-semibold uppercase text-brand">
              Project background
            </p>
            <p className="mt-4 leading-8 text-muted">
              {caseStudy.background}
            </p>
          </div>
          <div className="border border-line bg-surface p-6">
            <p className="text-sm font-semibold uppercase text-brand">
              Privacy note
            </p>
            <p className="mt-4 leading-8 text-muted">
              This case study is intentionally anonymized. It does not disclose
              customer names, hotel brands, exact addresses, commercial amounts,
              or unsupported performance claims.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <TextList title="Customer requirements" items={caseStudy.requirements} />
          <TextList
            title="Recommended solution"
            items={caseStudy.recommendedSolution}
          />
          <TextList title="Solution value" items={caseStudy.solutionValue} />
        </section>

        <section className="mt-8 border border-line bg-background p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                Products involved
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Product mix for discussion
              </h2>
            </div>
            <Link
              href={`/${locale}/products/`}
              className="inline-flex min-h-10 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand"
            >
              Explore Products
            </Link>
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {caseStudy.productsInvolved.map((product) => (
              <li key={product.slug} className="border border-line bg-surface p-5">
                <h3 className="text-lg font-semibold leading-7 text-foreground">
                  {product.name}
                </h3>
                <Link
                  href={`/${locale}/products/${product.slug}/`}
                  className="mt-4 inline-flex min-h-10 items-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white"
                >
                  View Product
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <TextList title="Suitable for" items={caseStudy.suitableFor} />
          <section className="border border-line bg-surface p-5">
            <h2 className="text-xl font-semibold text-foreground">
              Related solutions
            </h2>
            <ul className="mt-4 grid gap-3 leading-7 text-muted">
              {caseStudy.relatedSolutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/${locale}/solutions/${solution.slug}/`}
                    className="font-semibold text-brand"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <section className="mt-8 bg-brand p-6 text-white">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-white/70">
                Project inquiry
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Share your project type, quantity, market, and customization
                needs.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/case-studies/`}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
              >
                Back to Case Studies
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-white bg-white px-5 py-3 font-semibold text-brand"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
