import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { applicationScenarios } from "@/config/application-scenarios";
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

type ApplicationScenariosPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ApplicationScenariosPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = buildLocalizedPath(locale, "application-scenarios");
  return createMetadata({
    locale,
    path,
    title: "Application Scenarios",
    description:
      "Independent smart hotel and smart home application scenario materials for DUALCORE LINK.",
    hreflang: createStaticHreflang(locales, "application-scenarios"),
  });
}

export default async function ApplicationScenariosPage({
  params,
}: ApplicationScenariosPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const path = buildLocalizedPath(locale, "application-scenarios");
  const url = buildSiteUrl(path);

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          createCollectionPageSchema({
            id: `${url}#collection`,
            url,
            name: "DUALCORE LINK Application Scenarios",
            description:
              "Independent scene materials for homepage, solutions, and application scenario pages.",
          }),
          createBreadcrumbSchema(`${url}#breadcrumb`, [
            { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
            { name: "Application Scenarios", url },
          ]),
        ])}
      />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-brand">
            Scene materials
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">
            Application Scenarios
          </h1>
          <p className="mt-4 leading-7 text-muted">
            These scenarios are used for homepage scene modules, solution
            pages, and independent scenario browsing. They are not product
            categories and are not mixed into ordinary product detail galleries.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {applicationScenarios.map((scenario) => (
            <section
              key={scenario.slug}
              id={scenario.slug}
              className="border border-line bg-surface p-6"
            >
              <h2 className="text-2xl font-semibold">{scenario.title}</h2>
              <p className="mt-3 leading-7 text-muted">
                {scenario.description}
              </p>
              <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                Used in: {scenario.usage}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/solutions/`}
            className="inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          >
            View Solutions
          </Link>
          <Link
            href={`/${locale}/products/`}
            className="inline-flex min-h-11 items-center border border-line px-5 py-3 font-semibold text-brand"
          >
            View Products
          </Link>
        </div>
      </main>
    </>
  );
}
