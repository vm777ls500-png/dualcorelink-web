import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { BidiTechnicalText } from "@/components/i18n/bidi-technical-text";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import {
  ResourceConversionSections,
  ResourceMidArticleCta,
} from "@/components/content/resource-conversion-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { brand, createWhatsAppUrl } from "@/config/brand";
import { isLocale, type Locale } from "@/config/i18n";
import {
  getResourceBySlug,
  resources,
  type ResourceGuide,
  type ResourceLink,
} from "@/config/resources";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { buildQuoteHref } from "@/lib/inquiry/attribution";
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
import { localizeResourceGuide } from "@/lib/localized-nonproduct";
import { getSpecializedLabel } from "@/content/locales/m4a-specialized-ui";

type ResourcePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

const vietnameseResourceLabels: Record<string, string> = {
  "Back to Resources": "Quay lại tài nguyên",
  "Last reviewed": "Cập nhật gần nhất",
  "Direct answer": "Trả lời trực tiếp",
  Overview: "Tổng quan hướng dẫn",
  "Table of contents": "Mục lục",
  "Best for": "Phù hợp nhất với",
  "Main advantage": "Ưu điểm chính",
  "Main consideration": "Điểm cần lưu ý chính",
  "Typical system role": "Vai trò điển hình trong hệ thống",
  "Related planning reference": "Tài liệu lập kế hoạch liên quan",
  "Frequently asked questions": "Câu hỏi thường gặp",
  "Safe B2B scope": "Phạm vi thông tin B2B an toàn",
  "Project quotation": "Báo giá dự án",
};

function resourceLabel(locale: Locale, english: string, chinese: string, arabic: string) {
  if (locale === "ar") return arabic;
  if (locale === "zh") return chinese;
  if (locale === "vi") return vietnameseResourceLabels[english] ?? english;
  return getSpecializedLabel(locale, english);
}

export function generateStaticParams() {
  return ensureStaticExportParams(
    [
      ...resources.map((resource) => ({
        locale: "en" as const,
        slug: resource.slug,
      })),
      ...localizedRenderablePublicationPages
        .filter((page) => page.pageType === "resource")
        .map((page) => ({
          locale: page.locale,
          slug: page.slug,
        })),
    ],
  );
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(locale, "resource", slug);
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  if (locale !== "en") return {};
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  const path = buildLocalizedPath(locale, `resources/${resource.slug}`);

  const metadata = createMetadata({
    locale,
    path,
    title: resource.seoTitle,
    description: resource.metaDescription,
    hreflang: getPublicationHreflang(`resources/${resource.slug}`),
  });

  return {
    ...metadata,
    title: { absolute: resource.seoTitle },
  };
}

function LinkList({
  title,
  links,
}: {
  title: string;
  links: ResourceLink[];
}) {
  return (
    <section className="border border-line bg-surface p-5">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-semibold text-brand hover:text-foreground"
            >
              {link.title}
            </Link>
            {link.description ? (
              <p className="mt-1 text-sm leading-6 text-muted">
                {link.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResourceJsonLd({
  locale,
  resource,
}: {
  locale: Locale;
  resource: ResourceGuide;
}) {
  const path = buildLocalizedPath(locale, `resources/${resource.slug}`);
  const url = buildSiteUrl(path);

  return (
    <JsonLd
      graph={createSchemaGraph([
        createArticleSchema({
          id: `${url}#article`,
          url,
          headline: resource.title,
          description: resource.metaDescription,
          datePublished: resource.lastReviewed,
          dateModified: resource.lastReviewed,
        }),
        createBreadcrumbSchema(`${url}#breadcrumb`, [
          { name: "Home", url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
          {
            name: "Resources",
            url: buildSiteUrl(buildLocalizedPath(locale, "resources")),
          },
          { name: resource.title, url },
        ]),
      ])}
    />
  );
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const localizedPage = getLocalizedPublicationPage(locale, "resource", slug);
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }
  if (locale !== "en" && !localizedPage) notFound();
  const sourceResource = getResourceBySlug(slug);
  if (!sourceResource) notFound();
  const resource = localizedPage
    ? localizeResourceGuide(sourceResource, localizedPage)
    : sourceResource;
  const isChinese = locale === "zh" && Boolean(localizedPage);
  const isVietnamese = locale === "vi" && Boolean(localizedPage);

  const whatsappUrl = createWhatsAppUrl(resource.cta.whatsappMessage);
  const resourceAttribution = {
    sourcePage: `/${locale}/resources/${resource.slug}/`,
    contentType: "resource" as const,
    contentSlug: resource.slug,
    sourceTitle: resource.h1,
  };
  const heroQuoteAttribution = {
    ...resourceAttribution,
    ctaPosition: "resource_hero",
  };
  const continueReading =
    resource.conversion?.continueReadingSlugs
      .map((relatedSlug) => {
        const related = getResourceBySlug(relatedSlug);
        const relatedPage = getLocalizedPublicationPage(
          locale,
          "resource",
          relatedSlug,
        );
        return related && relatedPage
          ? localizeResourceGuide(related, relatedPage)
          : related;
      })
      .filter(
        (relatedResource): relatedResource is ResourceGuide =>
          relatedResource !== undefined && relatedResource.slug !== resource.slug,
      ) ?? [];

  return (
    <>
      <ResourceJsonLd locale={locale} resource={resource} />
      <article className="resource-detail-page">
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
            <Link
              href={`/${locale}/resources/`}
              className="text-sm font-semibold text-brand hover:text-foreground"
            >
              {resourceLabel(locale, "Back to Resources", "返回资源中心", "العودة إلى الموارد")}
            </Link>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase text-brand">
              <span className="border border-line bg-background px-2 py-1">
                {resource.category}
              </span>
              <span className="border border-line bg-background px-2 py-1">
                {resource.topic}
              </span>
              <span className="border border-line bg-background px-2 py-1">
                {resource.readingTime}
              </span>
              <span className="border border-line bg-background px-2 py-1">
                {resourceLabel(locale, "Last reviewed", "最近审核", "آخر مراجعة")} <BidiTechnicalText text={resource.lastReviewed} />
              </span>
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {resource.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              <BidiTechnicalText text={resource.summary} />
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedInquiryLink
                href={buildQuoteHref(locale, heroQuoteAttribution)}
                channel="form"
                attribution={heroQuoteAttribution}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                {resource.cta.primaryLabel}
              </TrackedInquiryLink>
              <TrackedInquiryLink
                href={whatsappUrl}
                channel="whatsapp"
                attribution={{
                  ...resourceAttribution,
                  ctaPosition: "resource_hero_whatsapp",
                }}
                className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 font-semibold text-brand"
              >
                {resource.cta.whatsappLabel}
              </TrackedInquiryLink>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-12">
          <div className="space-y-10">
            {resource.answerCapsule ? (
              <section className="border border-line bg-background p-6">
                <p className="text-sm font-semibold uppercase text-brand">
                  {resourceLabel(locale, "Direct answer", "直接回答", "إجابة مباشرة")}
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-8 text-foreground">
                  {resource.answerCapsule.heading}
                </h2>
                <p className="mt-4 leading-8 text-muted">
                  <BidiTechnicalText text={resource.answerCapsule.body} />
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {resource.answerCapsule.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border-s-2 border-brand ps-4"
                    >
                      <span className="font-semibold text-brand">
                        {link.title}
                      </span>
                      {link.description ? (
                        <span className="mt-1 block text-sm leading-6 text-muted">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {resourceLabel(locale, "Overview", "指南概览", "نظرة عامة")}
              </p>
              <p className="mt-3 leading-8 text-muted">
                {locale === "ar"
                  ? `صُمم هذا الدليل لـ ${resource.audience.join("، ")} لإعداد الاختيار الأولي وعرض المشروع ومراجعة الوثائق لمشروعات التحكم وأتمتة غرف الفنادق.`
                  : isChinese
                  ? `本指南面向${resource.audience.join("、")}，用于酒店客控与自动化项目的前期选型、报价准备和资料核对。`
                  : isVietnamese
                  ? `Hướng dẫn này dành cho ${resource.audience.join(", ")} khi chuẩn bị lựa chọn sản phẩm ban đầu, báo giá dự án và rà soát tài liệu cho hệ thống điều khiển và tự động hóa phòng khách sạn.`
                  : `This guide is designed for ${resource.audience.join(", ")} teams preparing early product selection, project quotation, and document review for hotel room control and automation projects.`}
              </p>
            </section>

            <nav
              aria-label={resourceLabel(locale, "Table of contents", "目录", "جدول المحتويات")}
              className="border border-line bg-background p-6"
            >
              <p className="text-sm font-semibold uppercase text-brand">
                {resourceLabel(locale, "Table of contents", "目录", "جدول المحتويات")}
              </p>
              <ol className="mt-4 grid gap-2 text-sm leading-6">
                {resource.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="font-semibold text-foreground hover:text-brand"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {resource.sections.map((section) => (
              <Fragment key={section.id}>
                <section
                  id={section.id}
                  className="border-t border-line pt-8"
                >
                  <h2 className="text-2xl font-semibold leading-8 text-foreground">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-8 text-muted">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}><BidiTechnicalText text={paragraph} /></p>
                    ))}
                    {section.subsections?.map((subsection) => (
                      <section key={subsection.id} id={subsection.id}>
                        <h3 className="pt-2 text-xl font-semibold leading-7 text-foreground">
                          {subsection.heading}
                        </h3>
                        <div className="mt-3 space-y-4">
                          {subsection.body.map((paragraph) => (
                            <p key={paragraph}><BidiTechnicalText text={paragraph} /></p>
                          ))}
                        </div>
                      </section>
                    ))}
                    {section.comparisonItems?.length ? (
                      <div
                        aria-label="Guest room control interface comparison"
                        className="grid gap-4 sm:grid-cols-2"
                      >
                        {section.comparisonItems.map((item) => (
                          <article
                            key={item.interfaceType}
                            className="min-w-0 border border-line bg-surface p-5"
                          >
                            <h3 className="text-xl font-semibold leading-7 text-foreground">
                              {item.interfaceType}
                            </h3>
                            <dl className="mt-4 grid gap-3 text-sm leading-6">
                              <div>
                                <dt className="font-semibold text-foreground">
                                  {resourceLabel(locale, "Best for", "适用场景", "الأنسب لـ")}
                                </dt>
                                <dd>{item.bestFor}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold text-foreground">
                                  {resourceLabel(locale, "Main advantage", "主要优势", "الميزة الرئيسية")}
                                </dt>
                                <dd>{item.mainAdvantage}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold text-foreground">
                                  {resourceLabel(locale, "Main consideration", "主要注意事项", "الاعتبار الرئيسي")}
                                </dt>
                                <dd>{item.mainConsideration}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold text-foreground">
                                  {resourceLabel(locale, "Typical system role", "典型系统角色", "الدور المعتاد في النظام")}
                                </dt>
                                <dd>{item.typicalSystemRole}</dd>
                              </div>
                            </dl>
                          </article>
                        ))}
                      </div>
                    ) : null}
                    {section.relatedLinks?.length ? (
                      <p className="border-s-2 border-brand ps-4 text-sm leading-7">
                        {resourceLabel(locale, "Related planning reference", "相关规划参考", "مرجع تخطيط ذو صلة")}:{" "}
                        {section.relatedLinks.map((link, index) => (
                          <Fragment key={link.href}>
                            {index > 0 ? ", " : null}
                            <Link
                              href={link.href}
                              className="font-semibold text-brand hover:text-foreground"
                            >
                              {link.title}
                            </Link>
                          </Fragment>
                        ))}
                        .
                      </p>
                    ) : null}
                  </div>
                </section>
                {resource.conversion?.midCtaAfterSectionId === section.id ? (
                  <ResourceMidArticleCta
                    resource={resource}
                    continueReading={continueReading}
                    locale={locale}
                  />
                ) : null}
              </Fragment>
            ))}

            {localizedPage ? (
              <section className="resource-localized-faq border-t border-line pt-8">
                <h2 className="text-2xl font-semibold text-foreground">
                  {resourceLabel(locale, "Frequently asked questions", "常见问题", "الأسئلة الشائعة")}
                </h2>
                <div className="mt-5 space-y-3">
                  {localizedPage.content.faqs.map((faq) => (
                    <details key={faq.question} className="border border-line bg-surface p-5">
                      <summary className="cursor-pointer font-semibold text-foreground">
                        {faq.question}
                      </summary>
                      <p className="mt-4 leading-7 text-muted"><BidiTechnicalText text={faq.answer} /></p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="border border-line bg-surface p-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {resourceLabel(locale, "Safe B2B scope", "安全的 B2B 信息边界", "نطاق B2B الآمن")}
              </h2>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">
                {resource.safeClaims.map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
            </section>

            {resource.conversion ? (
              <ResourceConversionSections
                resource={resource}
                continueReading={continueReading}
                locale={locale}
              />
            ) : (
              <section className="border border-line bg-foreground p-7 text-white sm:p-8">
                <p className="text-sm font-semibold uppercase text-white/70">
                  {resourceLabel(locale, "Project quotation", "项目报价", "عرض سعر المشروع")}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {resource.cta.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-8 text-white/75">
                  {resource.cta.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <TrackedInquiryLink
                    href={buildQuoteHref(locale, {
                      ...resourceAttribution,
                      ctaPosition: "resource_fallback_bottom",
                    })}
                    channel="form"
                    attribution={{
                      ...resourceAttribution,
                      ctaPosition: "resource_fallback_bottom",
                    }}
                    className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
                  >
                    {resource.cta.primaryLabel}
                  </TrackedInquiryLink>
                  <Link
                    href={resource.cta.secondaryHref}
                    className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
                  >
                    {resource.cta.secondaryLabel}
                  </Link>
                  <TrackedInquiryLink
                    href={whatsappUrl}
                    channel="whatsapp"
                    attribution={{
                      ...resourceAttribution,
                      ctaPosition: "resource_fallback_whatsapp",
                    }}
                    className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
                  >
                    {brand.whatsapp.label}
                  </TrackedInquiryLink>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-5">
            <section className="border border-line bg-surface p-5">
              <h2 className="text-xl font-semibold text-foreground">
                {resourceLabel(locale, "Guide focus", "指南重点", "محور الدليل")}
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-muted">
                    {resourceLabel(locale, "Topic", "主题", "الموضوع")}
                  </dt>
                  <dd className="mt-1 text-foreground">{resource.topic}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">
                    {resourceLabel(locale, "Reading time", "阅读时间", "وقت القراءة")}
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {resource.readingTime}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">
                    {resourceLabel(locale, "Primary keyword", "主要关键词", "الكلمة الرئيسية")}
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {resource.primaryKeyword}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">
                    {resourceLabel(locale, "Secondary topics", "相关主题", "الموضوعات ذات الصلة")}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {resource.secondaryKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="border border-line bg-background px-2 py-1 text-xs font-semibold text-muted"
                      >
                        {keyword}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </section>

            {!resource.conversion ? (
              <>
                <LinkList
                  title={resourceLabel(locale, "Related solutions", "相关解决方案", "الحلول ذات الصلة")}
                  links={resource.relatedSolutions}
                />
                <LinkList
                  title={resourceLabel(locale, "Related products", "相关产品", "المنتجات ذات الصلة")}
                  links={resource.relatedProducts}
                />
              </>
            ) : null}
            <LinkList
              title={resourceLabel(locale, "Related regions", "相关区域", "المناطق ذات الصلة")}
              links={resource.relatedRegions}
            />
            <LinkList
              title={resourceLabel(locale, "Downloads and documents", "下载与资料", "التنزيلات والوثائق")}
              links={resource.relatedDownloads}
            />
          </aside>
        </div>
      </article>
    </>
  );
}
