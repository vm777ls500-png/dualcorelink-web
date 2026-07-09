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
  createSchemaGraph,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";

type ResourcesPageProps = {
  params: Promise<{ locale: string }>;
};

const resourcesDescription =
  "B2B guides for smart hotel automation, RCU planning, OEM/ODM smart panels, and project quotation preparation.";

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
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: "DUALCORE LINK Resources",
      description: resourcesDescription,
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
        <section className="border border-line bg-surface p-6">
          <p className="text-sm font-semibold uppercase text-brand">
            B2B knowledge library
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Resources
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {resourcesDescription}
          </p>
        </section>

        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                Guides
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Project planning resources
              </h2>
            </div>
            <Link
              href={`/${locale}/contact/#get-a-quote`}
              className="inline-flex min-h-11 w-fit items-center justify-center border border-line px-5 py-3 text-sm font-semibold text-brand"
            >
              Discuss a Project
            </Link>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {resources.map((resource) => (
              <article
                key={resource.slug}
                className="border border-line bg-surface p-6"
              >
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-brand">
                  <span className="border border-line bg-background px-2 py-1">
                    {resource.category}
                  </span>
                  <span className="border border-line bg-background px-2 py-1">
                    Last reviewed {resource.lastReviewed}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold leading-8 text-foreground">
                  <Link
                    href={`/${locale}/resources/${resource.slug}/`}
                    className="hover:text-brand"
                  >
                    {resource.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-muted">
                  {resource.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {resource.audience.map((item) => (
                    <span
                      key={item}
                      className="border border-line bg-background px-3 py-2 text-xs font-semibold text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${locale}/resources/${resource.slug}/`}
                  className="mt-6 inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 text-sm font-semibold text-white"
                >
                  Read Guide
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
