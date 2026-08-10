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
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import {
  getProductListingSourceLocale,
  getProductListingCategoryLabel,
  localizeProductListingProducts,
} from "@/lib/product-listing";
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

function arabicProductCount(count: number): string {
  if (count === 1) return "منتج واحد";
  if (count === 2) return "منتجان";
  return `${count} منتجات`;
}

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
  const rendersLocalizedCatalog =
    supportsSpecializedLocalizedComposition(locale) && Boolean(localizedPage);
  if (localizedPage && !rendersLocalizedCatalog) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const sourceProducts = await productRepository.list(
    getProductListingSourceLocale(locale),
  );
  const products = localizeProductListingProducts(locale, sourceProducts);
  const isArabic = locale === "ar";
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
      name: localizedPage?.title ?? "DUALCORE LINK Products",
      description: localizedPage?.metaDescription ?? productsDescription,
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
      { name: localizedPage?.content.breadcrumbLabel ?? "Products", url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <section className="products-page-shell mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <header className="products-catalog-hero mb-8 flex flex-col justify-between gap-5 p-6 lg:flex-row lg:items-end lg:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-brand">
            {localizedPage?.content.eyebrow ?? "B2B product catalog"}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">
            {localizedPage?.content.h1 ??
              "Smart Hotel & Smart Home Automation Products"}
          </h1>
          <p className="mt-4 leading-7 text-muted">
            {localizedPage ? (
              localizedPage.content.introduction
            ) : (
              <>
                Browse hotel control panels, RCU hosts, sensors, displays,
                sockets, thermostats, and related devices by category, series,
                or application scenario. Use this catalog for device selection;{" "}
                <Link
                  href={`/${locale}/solutions/`}
                  className="font-semibold text-brand underline decoration-brand/40 underline-offset-4"
                >
                  compare hotel room automation solutions
                </Link>{" "}
                when the project scope extends across multiple systems.
              </>
            )}
          </p>
        </div>
        <div className="products-hero-actions flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact/#get-a-quote`}
            className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          >
            {isArabic ? "إرسال استفسار" : locale === "zh" ? "提交询盘" : "Send Inquiry"}
          </Link>
          <a
            href={whatsappUrl}
            className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
          >
            {isArabic ? "طلب عرض عبر WhatsApp" : locale === "zh" ? "通过 WhatsApp 获取报价" : "Get a Quote on WhatsApp"}
          </a>
        </div>
      </header>

      <div
        className={`products-browse-grid mb-10 grid gap-6 ${
          locale === "en" ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        <section className="products-browse-panel border border-line bg-surface p-5">
          <h2 className="text-lg font-semibold">{isArabic ? "التصفح حسب الفئة" : locale === "zh" ? "按类别浏览" : "Browse by Category"}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {isArabic
              ? "اختر مجموعات المنتجات لغرف الفنادق والمناطق العامة وحزم التكامل وتوريد المشروع."
              : locale === "zh"
                ? "按酒店客房、公共区域、集成套件和项目供货选择产品组。"
                : "Choose product groups for hotel rooms, public areas, integration packages, and project supply."}
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
                    {getProductListingCategoryLabel(locale, category)}
                  </span>
                  {locale === "zh" ? (
                    <span className="mt-1 block text-sm text-muted">
                      {category.title}
                    </span>
                  ) : null}
                  <span
                    className={
                      hasProducts
                        ? "mt-2 block text-xs font-semibold uppercase text-brand"
                        : "mt-2 block text-xs font-semibold uppercase text-muted"
                    }
                  >
                    {hasProducts
                      ? isArabic
                        ? arabicProductCount(count)
                        : `${count} ${count === 1 ? "product" : "products"}`
                      : isArabic ? "قريباً" : "Coming soon"}
                  </span>
                </ProductFilterControl>
                  );
                })()}
              </li>
            ))}
          </ul>
        </section>

        <section className="products-browse-panel border border-line bg-surface p-5">
          <h2 className="text-lg font-semibold">{isArabic ? "التصفح حسب السلسلة" : locale === "zh" ? "按系列浏览" : "Browse by Series"}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {isArabic
              ? "قارن تشطيبات المنتجات وأنماط اللوحات وملاءمتها للمشروع."
              : locale === "zh"
                ? "比较产品饰面、面板风格和项目定位。"
                : "Compare product finishes, panel styles, and project positioning."}
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
                  {locale === "zh" ? (
                    <span className="mt-1 block text-sm text-muted">
                      {series.chineseTitle}
                    </span>
                  ) : null}
                  <span
                    className={
                      hasProducts
                        ? "mt-2 block text-xs font-semibold uppercase text-brand"
                        : "mt-2 block text-xs font-semibold uppercase text-muted"
                    }
                  >
                    {hasProducts
                      ? isArabic
                        ? `متاح الآن - ${arabicProductCount(count)}`
                        : `Available now - ${count} ${count === 1 ? "product" : "products"}`
                      : isArabic ? "سلسلة قادمة" : "Upcoming series"}
                  </span>
                </ProductFilterControl>
              </li>
              );
            })}
          </ul>
        </section>

        {locale === "en" ? (
          <section className="products-browse-panel border border-line bg-surface p-5">
            <h2 className="text-lg font-semibold">
              Browse by Application Scenario
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Application scenarios are independent scene materials, not
              product categories.
            </p>
            <ul className="mt-5 space-y-3">
              {applicationScenarios.map((scenario) => (
                <li key={scenario.slug}>
                  <Link
                    href={`/${locale}/application-scenarios/#${scenario.slug}`}
                    className="products-entry-card block border border-line bg-background p-3 hover:border-brand"
                  >
                    <span className="block font-semibold">
                      {scenario.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {scenario.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {products.length === 0 ? (
        <EmptyState
          title={isArabic ? "لا توجد منتجات منشورة" : "No products published"}
          description={isArabic ? "ستظهر المنتجات هنا بعد نشرها." : "Product content will appear here after it is published in WordPress."}
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
              title: getProductListingCategoryLabel(locale, category),
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
              {isArabic ? "هل تحتاج مزيج منتجات للمشروع؟" : locale === "zh" ? "需要项目产品组合？" : "Need a project product mix?"}
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-muted">
              {isArabic
                ? "شارك نوع الغرفة والسوق المستهدف والكمية وفئات المنتجات المطلوبة ليعد فريق B2B قائمة عرض مركزة."
                : locale === "zh"
                  ? "请提供房型、目标市场、数量和所需产品类别，我们的 B2B 团队可协助准备重点报价清单。"
                  : "Share your room type, target market, quantity, and required product categories. Our B2B team can help prepare a focused quotation list."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact/#get-a-quote`}
              className="inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
            >
              {isArabic ? "إرسال استفسار" : locale === "zh" ? "提交询盘" : "Send Inquiry"}
            </Link>
            <a
              href={whatsappUrl}
              className="inline-flex min-h-11 items-center border border-line px-5 py-3 font-semibold text-brand"
            >
              {isArabic ? "طلب عرض عبر WhatsApp" : locale === "zh" ? "通过 WhatsApp 获取报价" : "Get a Quote on WhatsApp"}
            </a>
          </div>
        </div>
      </section>
      </section>
    </>
  );
}
