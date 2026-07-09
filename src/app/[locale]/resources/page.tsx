import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resources } from "@/config/resources";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createItemListSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";

type ResourcesPageProps = {
  params: Promise<{ locale: string }>;
};

const resourcesDescription =
  "B2B resources for hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers planning smart hotel automation projects.";

const listingGroups = [
  "Buying Guides",
  "Hotel Automation Guides",
  "OEM/ODM Guides",
  "Technical Resources",
] as const;

function ResourceCard({
  locale,
  resource,
  compact = false,
}: {
  locale: "en";
  resource: (typeof resources)[number];
  compact?: boolean;
}) {
  const primarySolution = resource.relatedSolutions[0];
  const primaryProduct = resource.relatedProducts[0];

  return (
    <article className="border border-line bg-surface p-6">
      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-brand">
        <span className="border border-line bg-background px-2 py-1">
          {resource.category}
        </span>
        <span className="border border-line bg-background px-2 py-1">
          {resource.listingGroup}
        </span>
        <span className="border border-line bg-background px-2 py-1">
          {resource.readingTime}
        </span>
      </div>

      <h3
        className={
          compact
            ? "mt-4 text-xl font-semibold leading-7 text-foreground"
            : "mt-4 text-2xl font-semibold leading-8 text-foreground"
        }
      >
        <Link
          href={`/${locale}/resources/${resource.slug}/`}
          className="hover:text-brand"
        >
          {resource.title}
        </Link>
      </h3>

      <p className="mt-3 leading-7 text-muted">{resource.summary}</p>

      <div className="mt-5 grid gap-3 border-t border-line pt-5 text-sm">
        {primarySolution ? (
          <p>
            <span className="font-semibold text-foreground">Solution: </span>
            <Link href={primarySolution.href} className="text-brand">
              {primarySolution.title}
            </Link>
          </p>
        ) : null}
        {primaryProduct ? (
          <p>
            <span className="font-semibold text-foreground">Product: </span>
            <Link href={primaryProduct.href} className="text-brand">
              {primaryProduct.title}
            </Link>
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {resource.audience.slice(0, 4).map((item) => (
          <span
            key={item}
            className="border border-line bg-background px-3 py-2 text-xs font-semibold text-muted"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${locale}/resources/${resource.slug}/`}
          className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 text-sm font-semibold text-white"
        >
          Read Guide
        </Link>
        <Link
          href={`/${locale}/contact/#get-a-quote`}
          className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 text-sm font-semibold text-brand"
        >
          Request a Quote
        </Link>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = buildLocalizedPath(locale, "resources");

  return createMetadata({
    locale,
    path,
    title: "Resources",
    description: resourcesDescription,
    hreflang: createStaticHreflang(locales, "resources"),
  });
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "en") notFound();

  const path = buildLocalizedPath(locale, "resources");
  const url = buildSiteUrl(path);
  const featuredResources = resources
    .filter((resource) => resource.featuredPriority)
    .sort((a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99));
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: "DUALCORE LINK Resources",
      description: resourcesDescription,
    }),
    createItemListSchema({
      id: `${url}#itemlist`,
      items: resources.map((resource) => ({
        name: resource.title,
        url: buildSiteUrl(
          buildLocalizedPath(locale, `resources/${resource.slug}`),
        ),
        description: resource.summary,
      })),
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      { name: "Resources", url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <section className="border border-line bg-surface p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                B2B knowledge library
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                Resources
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                Compare hotel RCU systems, smart room control devices,
                OEM/ODM smart panels, and guest room automation planning before
                preparing a quotation request.
              </p>
            </div>
            <div className="border-l-0 border-line pt-0 text-sm leading-7 text-muted lg:border-l lg:pl-6">
              <p>
                These guides are written for overseas B2B buyers who need a
                practical product direction, document request path, and internal
                link map before discussing a hotel automation project.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
                >
                  Get a Quote
                </Link>
                <Link
                  href={`/${locale}/faqs/`}
                  className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 font-semibold text-brand"
                >
                  Buyer FAQs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                Featured guides
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Start with high-intent B2B project topics
              </h2>
              <p className="mt-2 max-w-3xl leading-7 text-muted">
                These guides are the best first reads for buyers comparing hotel
                RCU control, complete room automation, or OEM/ODM smart panel
                customization.
              </p>
            </div>
            <Link
              href={`/${locale}/downloads/`}
              className="inline-flex min-h-11 w-fit items-center justify-center border border-line px-5 py-3 text-sm font-semibold text-brand"
            >
              Request Datasheets
            </Link>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.slug} locale="en" resource={resource} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="border-b border-line pb-5">
            <p className="text-sm font-semibold uppercase text-brand">
              Browse by project need
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Resource groups for buying, automation, OEM/ODM, and technical
              planning
            </h2>
          </div>

          <div className="mt-6 grid gap-8">
            {listingGroups.map((group) => {
              const groupResources = resources.filter(
                (resource) => resource.listingGroup === group,
              );
              if (groupResources.length === 0) return null;

              return (
                <section key={group} className="border-t border-line pt-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {group}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {group === "Buying Guides"
                          ? "Compare product selection factors before shortlisting devices and quote items."
                          : null}
                        {group === "Hotel Automation Guides"
                          ? "Plan guest room workflows, control systems, and device combinations for hotel projects."
                          : null}
                        {group === "OEM/ODM Guides"
                          ? "Review customization scope, samples, documents, and quote inputs for smart panel programs."
                          : null}
                        {group === "Technical Resources"
                          ? "Understand room control concepts, wiring questions, product documents, and early engineering review."
                          : null}
                      </p>
                    </div>
                    <Link
                      href={`/${locale}/contact/#get-a-quote`}
                      className="inline-flex min-h-10 w-fit items-center justify-center border border-line px-4 py-2 text-sm font-semibold text-brand"
                    >
                      Discuss This Topic
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    {groupResources.map((resource) => (
                      <ResourceCard
                        key={resource.slug}
                        locale="en"
                        resource={resource}
                        compact
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-12 border border-line bg-foreground p-6 text-white sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-white/70">
                Project support
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Need help matching guides to products and solutions?
              </h2>
              <p className="mt-3 leading-8 text-white/75">
                Send your room type, target market, device interests, voltage,
                protocol preference, quantity, and document needs. The team can
                review relevant products, solutions, catalogs, and quote inputs
                by project request.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/products/`}
                className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
              >
                Explore Products
              </Link>
              <Link
                href={`/${locale}/solutions/`}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
              >
                View Solutions
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
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
