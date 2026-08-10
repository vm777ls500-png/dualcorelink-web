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
  localizedRenderablePublicationPages,
} from "@/lib/localized-publication";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import {
  createLocalizedProductDetailCopy,
  localizeProductConversionProfile,
  localizeProductDetailModel,
  localizeProductGallery,
} from "@/lib/localized-product-detail";

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

  const localizedPaths = localizedRenderablePublicationPages
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
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const sourceProduct = await productRepository.getBySlug(
    localizedPage ? "en" : locale,
    slug,
  );

  if (!sourceProduct) {
    notFound();
  }
  const product = localizedPage
    ? localizeProductDetailModel(sourceProduct, localizedPage)
    : sourceProduct;
  const localizedCopy = localizedPage
    ? createLocalizedProductDetailCopy(localizedPage)
    : undefined;
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const labels = isArabic
    ? {
        home: "الرئيسية",
        products: "المنتجات",
        new: "جديد",
        product: "منتج",
        getQuote: "اطلب عرض سعر",
        quoteHint: "للحصول على عرض أسرع، اذكر الدولة والكمية والجهد والبروتوكول أو الأسلاك وتشطيب اللوحة والتغليف وموعد التسليم.",
        leadTime: "مدة التسليم",
        onRequest: "حسب الطلب",
        available: "متاح",
        askTeam: "اسأل فريقنا",
        overview: "نظرة عامة على المنتج",
        coreFunctions: "الوظائف الأساسية",
        features: "ميزات المنتج",
        applications: "سيناريوهات الاستخدام",
        installation: "موضع التركيب",
        customization: "خيارات التخصيص",
        specifications: "المواصفات الفنية",
        relatedProducts: "منتجات ذات صلة",
        faq: "الأسئلة الشائعة",
        commercialOptions: "الخيارات التجارية",
        moq: "MOQ",
        units: "وحدة",
        warranty: "الضمان",
        privateLabel: "علامة خاصة",
        sample: "عينة",
        quoteDescription: "استخدم نموذج الاتصال لإرسال متطلبات المشروع والكمية والوثائق إلى فريق المبيعات.",
      }
    : isChinese
      ? {
        home: "首页",
        products: "产品",
        new: "新品",
        product: "产品",
        getQuote: "获取报价",
        quoteHint:
          "为便于快速报价，请提供项目国家或地区、预计数量、电压、协议或布线要求、面板表面、标识或包装要求以及目标交付时间。",
        leadTime: "交付周期",
        onRequest: "按需确认",
        available: "可提供",
        askTeam: "请咨询团队",
        overview: "产品概述",
        coreFunctions: "核心功能",
        features: "产品特点",
        applications: "应用场景",
        installation: "安装位置",
        customization: "可定制选项",
        specifications: "技术规格",
        relatedProducts: "相关产品",
        faq: "常见问题",
        commercialOptions: "商务选项",
        moq: "最小起订量",
        units: "件",
        warranty: "质保",
        privateLabel: "自有品牌",
        sample: "样品",
        quoteDescription:
          "请通过联系页面提交项目要求、数量和相关资料，我们的销售团队将进行审核。",
      }
      : {
        home: "Home",
        products: "Products",
        new: "New",
        product: "Product",
        getQuote: "Get a Quote",
        quoteHint:
          "For faster quotation, include project country, estimated quantity, voltage, protocol or wiring needs, panel finish, logo or packaging requests, and target delivery time.",
        leadTime: "Lead time",
        onRequest: "On request",
        available: "Available",
        askTeam: "Ask our team",
        overview: "Product overview",
        coreFunctions: "Core functions",
        features: "Product features",
        applications: "Application scenarios",
        installation: "Installation position",
        customization: "Customizable options",
        specifications: "Technical specifications",
        relatedProducts: "Related products",
        faq: "FAQ",
        commercialOptions: "Commercial options",
        moq: "MOQ",
        units: "units",
        warranty: "Warranty",
        privateLabel: "Private label",
        sample: "Sample",
        quoteDescription:
          "Use the contact page form to send project requirements, quantities, and files to our sales team.",
      };
  const path = buildLocalizedPath(locale, `products/${slug}`);
  const url = buildSiteUrl(path);
  const pageNodes = [
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: labels.home, url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
      {
        name: labels.products,
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
  const sourceGallery = productGalleries[product.slug];
  const productGallery =
    sourceGallery && localizedPage
      ? localizeProductGallery(sourceGallery, localizedPage)
      : sourceGallery;
  const heroImage = product.images[0];
  const productTitle = stripHtml(product.title);
  const sourceConversionProfile = getProductConversionProfile(
    product.categorySlugs,
  );
  const conversionProfile = localizedPage
    ? localizeProductConversionProfile(sourceConversionProfile, localizedPage)
    : sourceConversionProfile;
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
                locale={locale}
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
                <span className="border border-accent bg-accent px-2 py-1">{labels.new}</span>
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
                {isChinese
                  ? labels.product
                  : product.status?.replaceAll("_", " ") || labels.product}
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
                {labels.getQuote}
              </TrackedInquiryLink>
              <WhatsAppButton
                message={
                  isChinese
                    ? `您好，DUALCORE LINK。我想获取${productTitle}的报价。`
                    : `Hello DUALCORE LINK, I would like to get a quote for ${productTitle}.`
                }
                attribution={{
                  ...productAttribution,
                  ctaPosition: "product_hero_whatsapp",
                }}
                label={isChinese ? "通过 WhatsApp 获取报价" : undefined}
                className="inline-flex min-h-11 items-center justify-center border border-line bg-surface px-5 py-3 font-semibold text-brand"
              />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              {labels.quoteHint}
            </p>
            <div className="product-detail-commerce mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
              <div>
                <p className="text-muted">{labels.leadTime}</p>
                <p className="mt-1 font-semibold">{product.commerce.leadTime || labels.onRequest}</p>
              </div>
              <div>
                <p className="text-muted">OEM / ODM</p>
                <p className="mt-1 font-semibold">
                  {product.commerce.oemAvailable || product.commerce.odmAvailable
                    ? labels.available
                    : labels.askTeam}
                </p>
              </div>
            </div>
          </header>
        </div>

        <div className="product-detail-content mx-auto grid max-w-7xl gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-12">
          <div className="space-y-10">
            <ContentSection
              title={labels.overview}
              content={cleanPublicProductText(product.content)}
            />
            <ContentSection
              title={labels.coreFunctions}
              content={cleanPublicProductText(product.coreFunctions)}
            />
            <ContentSection
              title={labels.features}
              content={cleanPublicProductText(product.productFeatures)}
            />
            <ContentSection
              title={labels.applications}
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
              title={labels.installation}
              content={cleanPublicProductText(product.installationPosition)}
            />
            <ContentSection
              title={labels.customization}
              content={cleanPublicProductText(
                product.customizationOptions ||
                  product.commerce.packagingOptions,
              )}
            />
            {specifications.length > 0 ? (
              <section className="product-detail-spec-panel">
                <h2 className="mb-5 text-2xl font-semibold">
                  {labels.specifications}
                </h2>
                <SpecificationList items={specifications} />
              </section>
            ) : (
              <ContentSection
                title={labels.specifications}
                content={technicalSpecsText}
              />
            )}
            {product.relatedProducts.length > 0 ? (
              <section className="product-detail-related border-t border-line pt-8">
                <h2 className="text-2xl font-semibold text-foreground">
                  {labels.relatedProducts}
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
            {localizedCopy?.faqs.length ? (
              <section className="product-detail-related border-t border-line pt-8">
                <h2 className="text-2xl font-semibold text-foreground">
                  {labels.faq}
                </h2>
                <div className="mt-5 space-y-3">
                  {localizedCopy.faqs.map((item) => (
                    <details
                      key={item.question}
                      className="product-detail-related-card border border-line bg-surface p-5"
                    >
                      <summary className="cursor-pointer font-semibold">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : product.relatedFaqs.length > 0 ? (
              <section className="product-detail-related border-t border-line pt-8">
                <h2 className="text-2xl font-semibold text-foreground">{labels.faq}</h2>
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
              <ContentSection title={labels.faq} content={faqsText} />
            )}
          </div>
          <aside className="product-detail-aside border border-line bg-surface p-6">
            <h2 className="text-lg font-semibold">{labels.commercialOptions}</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-muted">{labels.moq}</dt><dd className="mt-1 font-semibold">{product.commerce.minimumOrderQuantity ? `${product.commerce.minimumOrderQuantity} ${product.commerce.moqUnit || labels.units}` : labels.onRequest}</dd></div>
              <div><dt className="text-muted">{labels.warranty}</dt><dd className="mt-1 font-semibold">{product.commerce.warranty || labels.onRequest}</dd></div>
              <div><dt className="text-muted">{labels.privateLabel}</dt><dd className="mt-1 font-semibold">{product.commerce.privateLabelAvailable ? labels.available : labels.askTeam}</dd></div>
              <div><dt className="text-muted">{labels.sample}</dt><dd className="mt-1 font-semibold">{product.commerce.sampleAvailable ? labels.available : labels.askTeam}</dd></div>
            </dl>
          </aside>
        </div>
        <section id="get-a-quote" className="product-detail-quote mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-semibold">{labels.getQuote}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            {labels.quoteDescription}
          </p>
        </section>
        <ContactCta
          locale={locale}
          label={labels.getQuote}
          attribution={productAttribution}
        />
      </article>
    </>
  );
}
