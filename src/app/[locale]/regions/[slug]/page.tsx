import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContactCta } from "@/components/content/contact-cta";
import { ContentSection } from "@/components/content/content-section";
import { MediaFrame } from "@/components/content/media-frame";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import { JsonLd } from "@/components/seo/json-ld";
import { brand, createWhatsAppUrl } from "@/config/brand";
import { isLocale, locales, type Locale } from "@/config/i18n";
import {
  getRegionLandingPage,
  regionLandingPages,
  type RegionLandingPage,
} from "@/config/region-landing-pages";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createCreativeWorkSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { regionRepository } from "@/lib/wordpress/repositories";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
  localizedRenderablePublicationPages,
  type LocalizedPublicationPage,
} from "@/lib/localized-publication";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import {
  localizeRegionLandingPage,
  localizeReleasedHref,
} from "@/lib/localized-nonproduct";
import { getSpecializedLabel } from "@/content/locales/m4a-specialized-ui";

type RegionPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

const vietnameseRegionLabels: Record<string, string> = {
  "Back to Regions": "Quay lại khu vực",
  "Regional inquiry support": "Hỗ trợ yêu cầu dự án theo khu vực",
  "Target buyers": "Nhóm khách hàng mục tiêu",
  "Project answer": "Thông tin dự án trọng tâm",
  "Regional project needs": "Nhu cầu dự án theo khu vực",
  "Catalog and document support": "Hỗ trợ danh mục và tài liệu",
  "Recommended product categories": "Danh mục sản phẩm đề xuất",
  "Recommended solutions": "Giải pháp đề xuất",
  "Inquiry checklist": "Danh sách thông tin yêu cầu",
  "Product selection for regional buyers": "Lựa chọn sản phẩm cho bên mua theo khu vực",
  "Hotel room and automation planning": "Lập kế hoạch phòng khách sạn và tự động hóa",
  "OEM/ODM customization": "Tùy chỉnh OEM/ODM",
  "Regional FAQ": "Câu hỏi thường gặp về dự án khu vực",
  "View Full FAQ": "Xem toàn bộ câu hỏi thường gặp",
  "Regional quotation": "Báo giá dự án khu vực",
  "Safe B2B scope": "Phạm vi thông tin B2B an toàn",
  "Discuss Regional Project": "Trao đổi về dự án khu vực",
  "Questions for": "Câu hỏi cho",
};

function regionLabel(locale: Locale, english: string, chinese: string, arabic: string) {
  if (locale === "ar") return arabic;
  if (locale === "zh") return chinese;
  if (locale === "vi") return vietnameseRegionLabels[english] ?? english;
  return getSpecializedLabel(locale, english);
}

export async function generateStaticParams() {
  const staticPaths = regionLandingPages.map((region) => ({
    locale: "en" as const,
    slug: region.slug,
  }));
  const paths = await Promise.all(
    locales.map(async (locale) =>
      (await regionRepository.getStaticParams(locale)).map(({ slug }) => ({
        locale,
        slug,
      })),
    ),
  );
  const localizedPaths = localizedRenderablePublicationPages
    .filter((page) => page.pageType === "region")
    .map((page) => ({ locale: page.locale, slug: page.slug }));
  return ensureStaticExportParams([
    ...staticPaths,
    ...paths.flat(),
    ...localizedPaths,
  ]);
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(locale, "region", slug);
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  const staticRegion = locale === "en" ? getRegionLandingPage(slug) : undefined;
  if (staticRegion) {
    const path = buildLocalizedPath(locale, `regions/${slug}`);
    return createMetadata({
      locale,
      path,
      title: staticRegion.seoTitle,
      description: staticRegion.metaDescription,
      hreflang: getPublicationHreflang(`regions/${slug}`),
    });
  }
  const region = await regionRepository.getBySlug(locale, slug);
  if (!region) return {};
  const path = buildLocalizedPath(locale, `regions/${slug}`);
  return createMetadata({
    locale,
    path,
    title: stripHtml(region.title),
    description: stripHtml(region.marketSummary || region.excerpt),
    seo: region.seo,
    hreflang: getPublicationHreflang(`regions/${slug}`),
    openGraphImage: region.heroImage,
  });
}

function RegionTextCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="region-market-panel border border-line bg-surface p-6">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="mt-4 leading-8 text-muted">{children}</div>
    </section>
  );
}

function RegionListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="region-market-panel region-market-list-panel border border-line bg-surface p-6">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 grid gap-3 leading-7 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StaticRegionPage({
  locale,
  region,
  localizedPage,
}: {
  locale: Locale;
  region: RegionLandingPage;
  localizedPage?: LocalizedPublicationPage;
}) {
  const isChinese = locale === "zh";
  const isVietnamese = locale === "vi";
  const path = buildLocalizedPath(locale, `regions/${region.slug}`);
  const url = buildSiteUrl(path);
  const whatsappUrl = createWhatsAppUrl(
    `Hello ${brand.name}, I would like to discuss a ${region.market} regional project inquiry.`,
  );
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: region.h1,
      description: region.metaDescription,
    }),
    createCreativeWorkSchema({
      id: `${url}#region`,
      url,
      name: region.h1,
      description: region.metaDescription,
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
      {
        name: "Regions",
        url: buildSiteUrl(buildLocalizedPath(locale, "regions")),
      },
      { name: region.market, url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <article className="region-detail-page">
        <section className="region-detail-hero border-b border-line bg-foreground text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
            <header className="region-detail-summary">
              <Link
                href={`/${locale}/regions/`}
                className="text-sm font-semibold text-white/70 hover:text-white"
              >
                {regionLabel(locale, "Back to Regions", "返回区域页面", "العودة إلى المناطق")}
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase text-brand">
                {regionLabel(locale, "Regional inquiry support", "区域项目支持", "دعم استفسارات المشاريع الإقليمية")}
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
                {region.h1}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
                {region.heroSubtitle}
              </p>
              <div className="region-detail-actions mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
                >
                  {region.primaryCta}
                </Link>
                <Link
                  href={localizeReleasedHref("/en/downloads/", locale)}
                  className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
                >
                  {region.secondaryCta}
                </Link>
                <a
                  href={whatsappUrl}
                  className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
                >
                  {brand.whatsapp.label}
                </a>
              </div>
            </header>
            <aside className="region-market-snapshot border border-white/15 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {regionLabel(locale, "Target buyers", "目标买家", "المشترون المستهدفون")}
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/75">
                {region.buyerTypes.map((buyer) => (
                  <li key={buyer}>{buyer}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <main className="region-detail-content mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          {region.answerCapsule ? (
            <section className="region-market-panel border border-line bg-background p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {regionLabel(locale, "Project answer", "项目要点", "إجابة المشروع")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-8 text-foreground">
                {region.answerCapsule.heading}
              </h2>
              <p className="mt-4 max-w-5xl leading-8 text-muted">
                {region.answerCapsule.body}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {region.answerCapsule.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-s-2 border-brand ps-4"
                  >
                    <span className="font-semibold text-brand">
                      {link.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div
            className={`grid gap-6 lg:grid-cols-[1.1fr_0.9fr] ${
              region.answerCapsule ? "mt-8" : ""
            }`}
          >
            <RegionTextCard title={regionLabel(locale, "Regional project needs", "区域项目需求", "احتياجات المشروع الإقليمي")}>
              <p>{region.regionalNeeds}</p>
            </RegionTextCard>
            <RegionTextCard title={regionLabel(locale, "Catalog and document support", "目录与资料支持", "دعم الكتالوجات والوثائق")}>
              <p>{region.catalogNote}</p>
              <p className="mt-4">{region.documentSupport}</p>
              <Link
                href={localizeReleasedHref("/en/downloads/", locale)}
                className="mt-5 inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                {region.secondaryCta}
              </Link>
            </RegionTextCard>
          </div>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <RegionListCard
              title={regionLabel(locale, "Recommended product categories", "推荐产品类别", "فئات المنتجات الموصى بها")}
              items={region.recommendedCategories}
            />
            <RegionListCard
              title={regionLabel(locale, "Recommended solutions", "推荐解决方案", "الحلول الموصى بها")}
              items={region.recommendedSolutions}
            />
            <RegionListCard
              title={regionLabel(locale, "Inquiry checklist", "询盘信息清单", "قائمة معلومات الاستفسار")}
              items={region.inquiryChecklist}
            />
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <RegionTextCard title={regionLabel(locale, "Product selection for regional buyers", "区域买家产品选型", "اختيار المنتجات للمشترين الإقليميين")}>
              <p>{region.productSelection}</p>
            </RegionTextCard>
            <RegionTextCard title={regionLabel(locale, "Hotel room and automation planning", "酒店客房与自动化规划", "تخطيط غرف الفنادق والأتمتة")}>
              <p>{region.solutionPlanning}</p>
            </RegionTextCard>
          </div>

          <section className="region-market-panel mt-8 border border-line bg-background p-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {regionLabel(locale, "OEM/ODM customization", "OEM/ODM 定制", "تخصيص OEM/ODM")}
            </h2>
            <p className="mt-4 max-w-4xl leading-8 text-muted">
              {region.customization}
            </p>
          </section>

          {localizedPage?.content.relatedLinks.length ? (
            <section className="region-related-links mt-8 border border-line bg-surface p-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {regionLabel(
                  locale,
                  "Related products and solutions",
                  "相关产品与解决方案",
                  "المنتجات والحلول ذات الصلة",
                )}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {localizedPage.content.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border border-line bg-background p-5 hover:border-brand"
                  >
                    <h3 className="font-semibold text-foreground">
                      {link.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="region-market-panel region-faq-panel mt-8 border border-line bg-surface p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-brand">
                  {regionLabel(locale, "Regional FAQ", "区域项目常见问题", "الأسئلة الشائعة للمشروعات الإقليمية")}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">
                  {locale === "ar" ? `أسئلة استفسارات المشروعات في ${region.market}` : isChinese ? "区域项目询盘常见问题" : isVietnamese ? `Câu hỏi về yêu cầu dự án tại ${region.market}` : `Questions for ${region.market} project inquiries`}
                </h2>
              </div>
              <Link
                href={`/${locale}/faqs/`}
                className="region-card-link inline-flex min-h-10 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand"
              >
                {regionLabel(locale, "View Full FAQ", "查看全部常见问题", "عرض جميع الأسئلة الشائعة")}
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {region.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="region-faq-item group border border-line bg-background"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 font-semibold text-foreground">
                    <span>{faq.question}</span>
                    <span className="text-brand">+</span>
                  </summary>
                  <div className="border-t border-line px-5 py-4">
                    <p className="max-w-4xl leading-8 text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="region-detail-quote mt-8 border border-line bg-foreground p-7 text-white sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-white/70">
                  {regionLabel(locale, "Regional quotation", "区域项目报价", "عرض سعر المشروع الإقليمي")}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {region.finalCtaTitle}
                </h2>
                <p className="mt-3 max-w-3xl leading-8 text-white/75">
                  {region.finalCtaText}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
                >
                  {region.primaryCta}
                </Link>
                <a
                  href={whatsappUrl}
                  className="inline-flex min-h-11 items-center justify-center border border-white/50 px-5 py-3 font-semibold text-white"
                >
                  {brand.whatsapp.label}
                </a>
              </div>
            </div>
          </section>

          <section className="region-market-panel mt-8 border border-line bg-surface p-6">
            <p className="text-sm font-semibold uppercase text-brand">
              {regionLabel(locale, "Safe B2B scope", "安全的 B2B 信息边界", "نطاق B2B الآمن")}
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted md:grid-cols-2">
              {region.safeClaims.map((claim) => (
                <li key={claim}>{claim}</li>
              ))}
            </ul>
          </section>
        </main>

        <div className="region-detail-quote">
          <ContactCta locale={locale} label={regionLabel(locale, "Discuss Regional Project", "讨论区域项目", "ناقش المشروع الإقليمي")} />
        </div>
      </article>
    </>
  );
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const localizedPage = getLocalizedPublicationPage(locale, "region", slug);
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }
  const sourceStaticRegion =
    locale === "en" || localizedPage ? getRegionLandingPage(slug) : undefined;
  const staticRegion =
    sourceStaticRegion && localizedPage
      ? localizeRegionLandingPage(sourceStaticRegion, localizedPage)
      : sourceStaticRegion;
  if (staticRegion) {
    return (
      <StaticRegionPage
        locale={locale}
        region={staticRegion}
        localizedPage={localizedPage}
      />
    );
  }
  const region = await regionRepository.getBySlug(locale, slug);
  if (!region) notFound();
  const url = buildSiteUrl(buildLocalizedPath(locale, `regions/${slug}`));
  const whatsappUrl = region.whatsapp
    ? `https://wa.me/${region.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(region.whatsapp.message || "")}`
    : undefined;

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          createCreativeWorkSchema({
            id: `${url}#region`,
            url,
            name: stripHtml(region.title),
            description: stripHtml(region.marketSummary),
          }),
        ])}
      />
      <article className="region-detail-page">
        <div className="region-detail-hero mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <header className="region-detail-summary self-center">
            <p className="text-sm font-semibold uppercase text-brand">
              {region.regionType} · {region.marketMaturity || "market"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              {stripHtml(region.title)}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {stripHtml(region.marketSummary)}
            </p>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                className="mt-8 inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                {region.whatsapp?.label}
              </a>
            ) : null}
          </header>
          <div className="region-detail-media-panel">
            <MediaFrame
              src={region.heroImage?.sourceUrl}
              alt={region.heroImage?.altText || stripHtml(region.title)}
            />
          </div>
        </div>
        <div className="region-detail-content mx-auto max-w-7xl space-y-10 px-5 pb-14 sm:px-8 lg:px-12">
          <ContentSection title="Market introduction" content={region.marketIntroduction} />
          <div className="grid gap-8 md:grid-cols-2">
            <ContentSection title="Hotel demand" content={region.hotelNeeds} />
            <ContentSection title="Apartment demand" content={region.apartmentNeeds} />
          </div>
          <ContentSection title="Market opportunities" content={region.marketOpportunities} />
          <ContentSection title="Market challenges" content={region.marketChallenges} />
          <ContentSection title="Certification overview" content={region.certificationOverview} />
          <ContentSection title="Local buyer answer" content={region.geoDirectAnswer} />
        </div>
        <div className="region-detail-quote">
          <ContactCta locale={locale} />
        </div>
      </article>
    </>
  );
}
