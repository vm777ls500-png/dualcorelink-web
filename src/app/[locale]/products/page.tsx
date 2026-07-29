import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { ContentList } from "@/components/content/content-list";
import { EmptyState } from "@/components/content/empty-state";
import {
  ProductFilterControl,
  ProductFilteredList,
} from "@/components/content/product-filtered-list";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import { isLocale } from "@/config/i18n";
import { applicationScenarios } from "@/config/application-scenarios";
import { productCategories } from "@/config/product-taxonomy";
import { productSeries } from "@/config/product-series";
import { productDisplayImages } from "@/config/product-display-images";
import { brand } from "@/config/brand";
import {
  createMetadata,
  buildLocalizedPath,
  buildSiteUrl,
} from "@/lib/seo";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
} from "@/lib/localized-publication";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { productRepository } from "@/lib/wordpress/repositories";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

const productsDescription =
  "Explore smart hotel panels, RCU hosts, sensors, sockets, thermostats, robots, and OEM/ODM automation devices for B2B projects.";

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "product-listing",
    "products",
  );
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  const path = buildLocalizedPath(locale, "products");
  return createMetadata({
    locale,
    path,
    title: "Smart Hotel Products & OEM/ODM Devices",
    description: productsDescription,
    hreflang: getPublicationHreflang("products"),
  });
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "product-listing",
    "products",
  );
  if (localizedPage) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const products = await productRepository.list(locale);
  const productCountsByCategory = new Map<string, number>();
  const publishedSlugs = new Set(products.map((product) => product.slug));
  const seriesSlugsByProduct = new Map<string, string[]>();

  for (const product of products) {
    for (const categorySlug of product.categorySlugs) {
      productCountsByCategory.set(
        categorySlug,
        (productCountsByCategory.get(categorySlug) ?? 0) + 1,
      );
    }
  }
  for (const series of productSeries) {
    for (const slug of series.productSlugs) {
      seriesSlugsByProduct.set(slug, [
        ...(seriesSlugsByProduct.get(slug) ?? []),
        series.slug,
      ]);
    }
  }

  const path = buildLocalizedPath(locale, "products");
  const url = buildSiteUrl(path);
  const whatsappUrl = `https://wa.me/${brand.whatsapp.international}?text=${encodeURIComponent(
    "Hello DUALCORE LINK, I would like to discuss smart hotel and smart home automation products.",
  )}`;
  const productListItems = products.map((product) => ({
    id: product.id,
    slug: product.slug,
    title: stripHtml(product.title),
    description: stripHtml(product.shortDescription || product.excerpt),
    reference: product.model || undefined,
    hasMedia:
      productDisplayImages[product.slug] !== undefined ||
      product.primaryImage !== null,
    mediaUrl:
      productDisplayImages[product.slug]?.src ?? product.primaryImage?.sourceUrl,
    mediaAlt: stripHtml(product.title),
    categories: product.categoryNames,
    categorySlugs: product.categorySlugs,
    seriesSlugs: seriesSlugsByProduct.get(product.slug) ?? [],
  }));
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: "DUALCORE LINK Products",
      description: productsDescription,
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      { name: "Products", url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <section className="products-page-shell mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <header className="products-catalog-hero mb-8 flex flex-col justify-between gap-5 p-6 lg:flex-row lg:items-end lg:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-brand">
            B2B product catalog
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">
            Smart Hotel & Smart Home Automation Products
          </h1>
          <p className="mt-4 leading-7 text-muted">
            Browse hotel control panels, RCU hosts, sensors, displays, sockets,
            thermostats, and related devices by category, series, or
            application scenario. Use this catalog for device selection;{" "}
            <Link
              href={`/${locale}/solutions/`}
              className="font-semibold text-brand underline decoration-brand/40 underline-offset-4"
            >
              compare hotel room automation solutions
            </Link>{" "}
            when the project scope extends across multiple systems.
          </p>
        </div>
        <div className="products-hero-actions flex flex-wrap gap-3">
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
            Get a Quote on WhatsApp
          </a>
        </div>
      </header>

      <div className="products-browse-grid mb-10 grid gap-6 lg:grid-cols-3">
        <section className="products-browse-panel border border-line bg-surface p-5">
          <h2 className="text-lg font-semibold">Browse by Category</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Choose product groups for hotel rooms, public areas, integration
            packages, and project supply.
          </p>
          <ul className="mt-4 space-y-2">
            {productCategories.map((category) => (
              <li key={category.slug} id={`category-${category.slug}`}>
                {(() => {
                  const count = productCountsByCategory.get(category.slug) ?? 0;
                  const hasProducts = count > 0;

                  return (
                <ProductFilterControl
                  filterType="category"
                  slug={category.slug}
                  enabled={hasProducts}
                  className={
                    hasProducts
                      ? "products-entry-card block border border-line bg-background p-3 hover:border-brand"
                      : "products-entry-card products-entry-card-muted block border border-line bg-background/50 p-3 text-muted"
                  }
                >
                  <span
                    className={
                      hasProducts
                        ? "block font-semibold text-foreground"
                        : "block font-semibold text-muted"
                    }
                  >
                    {category.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {category.chineseTitle}
                  </span>
                  <span
                    className={
                      hasProducts
                        ? "mt-2 block text-xs font-semibold uppercase text-brand"
                        : "mt-2 block text-xs font-semibold uppercase text-muted"
                    }
                  >
                    {hasProducts
                      ? `${count} ${count === 1 ? "product" : "products"}`
                      : "Coming soon"}
                  </span>
                </ProductFilterControl>
                  );
                })()}
              </li>
            ))}
          </ul>
        </section>

        <section className="products-browse-panel border border-line bg-surface p-5">
          <h2 className="text-lg font-semibold">Browse by Series</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Compare product finishes, panel styles, and project positioning.
          </p>
          <ul className="mt-4 space-y-2">
            {productSeries.map((series) => {
              const count = series.productSlugs.filter((slug) =>
                publishedSlugs.has(slug),
              ).length;
              const hasProducts = count > 0;

              return (
              <li key={series.slug}>
                <ProductFilterControl
                  filterType="series"
                  slug={series.slug}
                  enabled={hasProducts}
                  className={
                    hasProducts
                      ? "products-entry-card block border border-line bg-background p-3 hover:border-brand"
                      : "products-entry-card products-entry-card-muted block border border-line bg-background/50 p-3 text-muted"
                  }
                >
                  <span
                    className={
                      hasProducts
                        ? "block font-semibold text-foreground"
                        : "block font-semibold text-muted"
                    }
                  >
                    {series.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {series.chineseTitle}
                  </span>
                  <span
                    className={
                      hasProducts
                        ? "mt-2 block text-xs font-semibold uppercase text-brand"
                        : "mt-2 block text-xs font-semibold uppercase text-muted"
                    }
                  >
                    {hasProducts
                      ? `Available now - ${count} ${count === 1 ? "product" : "products"}`
                      : "Upcoming series"}
                  </span>
                </ProductFilterControl>
              </li>
              );
            })}
          </ul>
        </section>

        <section className="products-browse-panel border border-line bg-surface p-5">
          <h2 className="text-lg font-semibold">Browse by Application Scenario</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Application scenarios are independent scene materials, not product
            categories.
          </p>
          <ul className="mt-5 space-y-3">
            {applicationScenarios.map((scenario) => (
              <li key={scenario.slug}>
                <Link
                  href={`/${locale}/application-scenarios/#${scenario.slug}`}
                  className="products-entry-card block border border-line bg-background p-3 hover:border-brand"
                >
                  <span className="block font-semibold">{scenario.title}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {scenario.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="No products published"
          description="Product content will appear here after it is published in WordPress."
        />
      ) : (
        <Suspense
          fallback={
            <ContentList
              locale={locale}
              route="products"
              items={productListItems}
              variant="product"
            />
          }
        >
          <ProductFilteredList
            locale={locale}
            variant="product"
            categories={productCategories.map((category) => ({
              slug: category.slug,
              title: category.title,
            }))}
            series={productSeries.map((item) => ({
              slug: item.slug,
              title: item.title,
            }))}
            items={productListItems}
          />
        </Suspense>
      )}
      <section className="products-quote-panel mt-12 border border-line bg-surface p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Need a project product mix?
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-muted">
              Share your room type, target market, quantity, and required
              product categories. Our B2B team can help prepare a focused
              quotation list.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact/#get-a-quote`}
              className="inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
            >
              Send Inquiry
            </Link>
            <a
              href={whatsappUrl}
              className="inline-flex min-h-11 items-center border border-line px-5 py-3 font-semibold text-brand"
            >
              Get a Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>
      </section>
    </>
  );
}
