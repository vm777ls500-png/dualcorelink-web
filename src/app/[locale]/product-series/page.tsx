import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, locales } from "@/config/i18n";
import { productSeries } from "@/config/product-series";
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
import { productRepository } from "@/lib/wordpress/repositories";

type ProductSeriesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProductSeriesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = buildLocalizedPath(locale, "product-series");
  return createMetadata({
    locale,
    path,
    title: "Product Series",
    description:
      "Compare DUALCORE LINK smart panel series for hotel, apartment, and OEM/ODM projects, including Smart, Borui, Vintage, and Brushed Aluminum designs.",
    hreflang: createStaticHreflang(locales, "product-series"),
  });
}

export default async function ProductSeriesPage({
  params,
}: ProductSeriesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const path = buildLocalizedPath(locale, "product-series");
  const url = buildSiteUrl(path);
  const products = await productRepository.list(locale);
  const publishedSlugs = new Set(products.map((product) => product.slug));

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          createCollectionPageSchema({
            id: `${url}#collection`,
            url,
            name: "DUALCORE LINK Product Series",
            description:
              "Frontend product series configuration for DUALCORE LINK.",
          }),
          createBreadcrumbSchema(`${url}#breadcrumb`, [
            { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
            { name: "Product Series", url },
          ]),
        ])}
      />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-brand">
            Product families
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">
            Product Series
          </h1>
          <p className="mt-4 leading-7 text-muted">
            Product series help project buyers compare finish, panel style,
            hotel or smart home design direction, and product positioning
            before requesting a quotation.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {productSeries.map((series) => (
            (() => {
              const productCount = series.productSlugs.filter((slug) =>
                publishedSlugs.has(slug),
              ).length;
              const hasProducts = productCount > 0;

              return (
            <section
              key={series.slug}
              id={series.slug}
              className={
                hasProducts
                  ? "border border-line bg-surface p-6"
                  : "border border-line bg-surface/60 p-6 text-muted"
              }
            >
              <p className="text-sm font-semibold uppercase text-brand">
                {series.chineseTitle}
              </p>
              <h2
                className={
                  hasProducts
                    ? "mt-2 text-2xl font-semibold text-foreground"
                    : "mt-2 text-2xl font-semibold text-muted"
                }
              >
                {series.title}
              </h2>
              <p className="mt-3 leading-7 text-muted">{series.description}</p>
              <p
                className={
                  hasProducts
                    ? "mt-5 text-sm font-semibold text-brand"
                    : "mt-5 text-sm font-semibold text-muted"
                }
              >
                {hasProducts
                  ? `${productCount} ${productCount === 1 ? "product" : "products"} available`
                  : "Upcoming series - more products coming soon"}
              </p>
              <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                Rule: {series.rule}
              </p>
            </section>
              );
            })()
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/${locale}/products/`}
            className="inline-flex min-h-11 items-center border border-brand px-5 py-3 font-semibold text-brand"
          >
            Back to Products
          </Link>
        </div>
      </main>
    </>
  );
}
