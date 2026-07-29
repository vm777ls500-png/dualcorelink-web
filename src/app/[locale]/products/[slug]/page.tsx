import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactCta } from "@/components/content/contact-cta";
import { ContentSection } from "@/components/content/content-section";
import { MediaFrame } from "@/components/content/media-frame";
import { ProductGallery } from "@/components/content/product-gallery";
import { ProductProjectBuyingGuide } from "@/components/content/product-project-buying-guide";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import { SpecificationList } from "@/components/content/specification-list";
import { productDisplayImages } from "@/config/product-display-images";
import { productGalleries } from "@/config/product-galleries";
import { getProductConversionProfile } from "@/config/product-conversion";
import { isLocale, locales } from "@/config/i18n";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createProductSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { buildQuoteHref } from "@/lib/inquiry/attribution";
import {
  createProductSeoDescription,
  createProductSeoTitle,
} from "@/lib/seo/product-metadata";
import { productRepository } from "@/lib/wordpress/repositories";
import type { SeoModel } from "@/types/content";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
  localizedPublicationPages,
} from "@/lib/localized-publication";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

function cleanPublicProductText(value?: string) {
  if (!value) return "";

  const withoutUnconfirmedSpecs = value
    .replace(/\|\s*[^|]+\s*\|\s*To be confirmed[^|]*(?=\||$)/gi, "")
    .replace(/\|[^\r\n|]*To be confirmed[^\r\n]*\|?/gi, "")
    .replace(
      /\b[A-Za-z][A-Za-z0-9 /()&-]*:\s*To be confirmed\b\.?/gi,
      "",
    );

  return withoutUnconfirmedSpecs
    .split(/\r?\n/)
    .flatMap((line) =>
      line
        .split(/(?<=[.!?])\s+/)
        .map((part) => part.trim())
        .filter((part) => part && !/to be confirmed/i.test(part)),
    )
    .join("\n")
    .trim();
}

function cleanSpecifications(
  items: Array<{ label: string; value: string }>,
) {
  return items.filter(
    (item) =>
      item.label.trim() &&
      item.value.trim() &&
      !/to be confirmed/i.test(`${item.label} ${item.value}`),
  );
}

function cleanProductSeo(seo: SeoModel): SeoModel {
  return {
    ...seo,
    title: cleanPublicProductText(seo.title),
    description: cleanPublicProductText(seo.description),
    openGraphTitle: cleanPublicProductText(seo.openGraphTitle),
    openGraphDescription: cleanPublicProductText(seo.openGraphDescription),
    twitterTitle: cleanPublicProductText(seo.twitterTitle),
    twitterDescription: cleanPublicProductText(seo.twitterDescription),
    breadcrumbLabel: cleanPublicProductText(seo.breadcrumbLabel),
  };
}

export async function generateStaticParams() {
  const paths = await Promise.all(
    locales.map(async (locale) =>
      (await productRepository.getStaticParams(locale)).map(({ slug }) => ({
        locale,
        slug,
      })),
    ),
  );

  const localizedPaths = localizedPublicationPages
    .filter((page) => page.pageType === "product")
    .map((page) => ({ locale: page.locale, slug: page.slug }));

  return ensureStaticExportParams([...paths.flat(), ...localizedPaths]);
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(locale, "product", slug);
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  const product = await productRepository.getBySlug(locale, slug);
  if (!product) return {};
  const path = buildLocalizedPath(locale, `products/${slug}`);
  const seo = cleanProductSeo(product.seo);
  const productTitle = cleanPublicProductText(product.title);
  const fallbackDescription = cleanPublicProductText(
    product.shortDescription || product.excerpt,
  );
  const metadataSeo = {
    ...seo,
    title: createProductSeoTitle(slug, productTitle, seo.title),
    description: createProductSeoDescription(
      slug,
      seo.description || "",
      fallbackDescription,
    ),
  };

  return createMetadata({
    locale,
    path,
    title: productTitle,
    description: fallbackDescription,
    seo: metadataSeo,
    hreflang: getPublicationHreflang(`products/${slug}`),
    openGraphImage: product.seoOpenGraphImage ?? product.images[0],
    twitterImage:
      product.seoTwitterImage ??
      product.seoOpenGraphImage ??
      product.images[0],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }
  const localizedPage = getLocalizedPublicationPage(locale, "product", slug);
  if (localizedPage) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const product = await productRepository.getBySlug(locale, slug);

  if (!product) {
    notFound();
  }
  const path = buildLocalizedPath(locale, `products/${slug}`);
  const url = buildSiteUrl(path);
  const pageNodes = [
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      {
        name: "Products",
        url: buildSiteUrl(buildLocalizedPath(locale, "products")),
      },
      { name: product.seo.breadcrumbLabel || stripHtml(product.title), url },
    ]),
    createProductSchema(product, url),
  ];
  const specifications = cleanSpecifications(product.specifications);
  const technicalSpecsText = cleanPublicProductText(product.technicalSpecsText);
  const faqsText = cleanPublicProductText(product.faqsText);
  const displayImage = productDisplayImages[product.slug];
  const productGallery = productGalleries[product.slug];
  const heroImage = product.images[0];
  const productTitle = stripHtml(product.title);
  const conversionProfile = getProductConversionProfile(product.categorySlugs);
  const productAttribution = {
    sourcePage: `/${locale}/products/${slug}/`,
    contentType: "product" as const,
    contentSlug: slug,
    sourceTitle: productTitle,
  };
  const heroQuoteAttribution = {
    ...productAttribution,
    ctaPosition: "product_hero",
  };

  return (
    <>
      <JsonLd graph={createSchemaGraph(pageNodes)} />
      <article className="product-detail-page">
        <div className="product-detail-hero mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div className="product-detail-media-panel">
            {productGallery ? (
              <ProductGallery
                productTitle={productTitle}
                featuredImage={productGallery.featuredImage}
                gallery={productGallery.gallery}
              />
            ) : (
              <MediaFrame
                src={displayImage?.src ?? heroImage?.sourceUrl}
                alt={heroImage?.altText || productTitle}
                width={displayImage?.width ?? heroImage?.width}
                height={displayImage?.height ?? heroImage?.height}
                loading="eager"
                fetchPriority="high"
              />
            )}
          </div>
          <header className="product-detail-summary self-center">
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase">
              {product.isNew ? (
                <span className="border border-accent bg-accent px-2 py-1">New</span>
              ) : null}
              {product.categoryNames.map((category) => (
                <span
                  key={category}
                  className="border border-brand/30 bg-background px-2 py-1 text-brand"
                >
                  {category}
                </span>
              ))}
              <span className="border border-line bg-surface px-2 py-1 text-brand">
                {product.status?.replaceAll("_", " ") || "Product"}
              </span>
            </div>
            <p className="mt-6 text-sm font-semibold uppercase text-brand">
              {product.model || "DUALCORE LINK"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {stripHtml(product.title)}
            </h1>
            {product.chineseName ? (
              <p className="mt-3 text-xl font-semibold text-brand">
                {product.chineseName}
              </p>
            ) : null}
            <p className="mt-6 text-lg leading-8 text-muted">
              {stripHtml(product.shortDescription || product.excerpt)}
            </p>
            {conversionProfile ? (
              <div className="product-procurement-summary mt-7 border-y border-line py-5">
                <p className="text-xs font-semibold uppercase text-brand">
                  {conversionProfile.label}
                </p>
                <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                  {conversionProfile.highlights.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs font-semibold uppercase text-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold leading-6 text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            <div className="product-detail-actions mt-8 flex flex-wrap gap-3">
              <TrackedInquiryLink
                href={buildQuoteHref(locale, heroQuoteAttribution)}
                channel="form"
                attribution={heroQuoteAttribution}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                Get a Quote
              </TrackedInquiryLink>
              <WhatsAppButton
                message={`Hello DUALCORE LINK, I would like to get a quote for ${productTitle}.`}
                attribution={{
                  ...productAttribution,
                  ctaPosition: "product_hero_whatsapp",
                }}
                className="inline-flex min-h-11 items-center justify-center border border-line bg-surface px-5 py-3 font-semibold text-brand"
              />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              For faster quotation, include project country, estimated
              quantity, voltage, protocol or wiring needs, panel finish, logo
              or packaging requests, and target delivery time.
            </p>
            <div className="product-detail-commerce mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
              <div>
                <p className="text-muted">Lead time</p>
                <p className="mt-1 font-semibold">{product.commerce.leadTime || "On request"}</p>
              </div>
              <div>
                <p className="text-muted">OEM / ODM</p>
                <p className="mt-1 font-semibold">
                  {product.commerce.oemAvailable || product.commerce.odmAvailable
                    ? "Available"
                    : "Ask our team"}
                </p>
              </div>
            </div>
          </header>
        </div>

        <div className="product-detail-content mx-auto grid max-w-7xl gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-12">
          <div className="space-y-10">
            <ContentSection
              title="Product overview"
              content={cleanPublicProductText(product.content)}
            />
            <ContentSection
              title="Core functions"
              content={cleanPublicProductText(product.coreFunctions)}
            />
            <ContentSection
              title="Product features"
              content={cleanPublicProductText(product.productFeatures)}
            />
            <ContentSection
              title="Application scenarios"
              content={cleanPublicProductText(product.applicationScenarios)}
            />
            {conversionProfile ? (
              <ProductProjectBuyingGuide
                locale={locale}
                productSlug={slug}
                productTitle={productTitle}
                profile={conversionProfile}
              />
            ) : null}
            <ContentSection
              title="Installation position"
              content={cleanPublicProductText(product.installationPosition)}
            />
            <ContentSection
              title="Customizable options"
              content={cleanPublicProductText(
                product.customizationOptions ||
                  product.commerce.packagingOptions,
              )}
            />
            {specifications.length > 0 ? (
              <section className="product-detail-spec-panel">
                <h2 className="mb-5 text-2xl font-semibold">
                  Technical specifications
                </h2>
                <SpecificationList items={specifications} />
              </section>
            ) : (
              <ContentSection
                title="Technical specifications"
                content={technicalSpecsText}
              />
            )}
            {product.relatedProducts.length > 0 ? (
              <section className="product-detail-related border-t border-line pt-8">
                <h2 className="text-2xl font-semibold text-foreground">
                  Related products
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {product.relatedProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${locale}/products/${item.slug}/`}
                      className="product-detail-related-card border border-line bg-surface p-5 hover:border-brand"
                    >
                      <h3 className="font-semibold">
                        {stripHtml(item.title)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {stripHtml(item.excerpt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
            {product.relatedFaqs.length > 0 ? (
              <section className="product-detail-related border-t border-line pt-8">
                <h2 className="text-2xl font-semibold text-foreground">FAQ</h2>
                <div className="mt-5 space-y-3">
                  {product.relatedFaqs.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${locale}/faqs/#faq-${item.id}`}
                      className="product-detail-related-card block border border-line bg-surface p-5 hover:border-brand"
                    >
                      <h3 className="font-semibold">
                        {stripHtml(item.title)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {stripHtml(item.excerpt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : (
              <ContentSection title="FAQ" content={faqsText} />
            )}
          </div>
          <aside className="product-detail-aside border border-line bg-surface p-6">
            <h2 className="text-lg font-semibold">Commercial options</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-muted">MOQ</dt><dd className="mt-1 font-semibold">{product.commerce.minimumOrderQuantity ? `${product.commerce.minimumOrderQuantity} ${product.commerce.moqUnit || "units"}` : "On request"}</dd></div>
              <div><dt className="text-muted">Warranty</dt><dd className="mt-1 font-semibold">{product.commerce.warranty || "On request"}</dd></div>
              <div><dt className="text-muted">Private label</dt><dd className="mt-1 font-semibold">{product.commerce.privateLabelAvailable ? "Available" : "Ask our team"}</dd></div>
              <div><dt className="text-muted">Sample</dt><dd className="mt-1 font-semibold">{product.commerce.sampleAvailable ? "Available" : "Ask our team"}</dd></div>
            </dl>
          </aside>
        </div>
        <section id="get-a-quote" className="product-detail-quote mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-semibold">Get a Quote</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            Use the contact page form to send project requirements, quantities,
            and files to our sales team.
          </p>
        </section>
        <ContactCta
          locale={locale}
          label="Get a Quote"
          attribution={productAttribution}
        />
      </article>
    </>
  );
}
