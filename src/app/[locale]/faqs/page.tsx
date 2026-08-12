import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import { brand } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import { getStaticFaqCategories } from "@/config/static-faqs";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createFaqPageSchema,
  createSchemaGraph,
} from "@/lib/schema";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
} from "@/lib/localized-publication";
import {
  getSpecializedLabel,
  isFinalReviewLocale,
} from "@/content/locales/m4a-specialized-ui";

type FaqPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(locale, "static", "faqs");
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "faqs"),
    title: "Smart Hotel & OEM/ODM FAQ",
    description:
      "FAQ for B2B buyers about smart hotel room control, smart home automation, OEM/ODM cooperation, samples, delivery, technical support, and after-sales service.",
    hreflang: getPublicationHreflang("faqs"),
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const localizedPage = getLocalizedPublicationPage(locale, "static", "faqs");
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const isChinese = locale === "zh" && Boolean(localizedPage);
  const isArabic = locale === "ar" && Boolean(localizedPage);
  const isVietnamese = locale === "vi" && Boolean(localizedPage);
  const label = (english: string) => getSpecializedLabel(locale, english);
  const faqCategories = getStaticFaqCategories(locale);
  const faqItems = faqCategories.flatMap((category) => category.items);
  const path = buildLocalizedPath(locale, "faqs");
  const url = buildSiteUrl(path);
  const schemaQuestions = faqItems.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          createFaqPageSchema(`${url}#faq`, url, schemaQuestions),
          createBreadcrumbSchema(`${url}#breadcrumb`, [
            {
              name: isArabic
                ? "الرئيسية"
                : isChinese
                  ? "首页"
                  : isVietnamese
                    ? "Trang chủ"
                    : label("Home"),
              url: buildSiteUrl(getLocalizedCompositionHomePath(locale)),
            },
            {
              name: localizedPage?.content.breadcrumbLabel ?? label("FAQ"),
              url,
            },
          ]),
        ])}
      />
      <main className="faq-page-shell">
        <section className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-12">
            <div className="faq-help-hero border border-line bg-background p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                {isArabic
                  ? "الأسئلة الشائعة"
                  : isChinese
                    ? "常见问题"
                    : isVietnamese
                      ? "Câu hỏi thường gặp"
                      : "FAQ"}
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
                {localizedPage?.content.h1 ?? "Frequently Asked Questions"}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                {localizedPage?.content.introduction ??
                  "Common questions about smart hotel room control solutions, OEM/ODM cooperation, samples, delivery, technical support, and after-sales service."}
              </p>
            </div>
            <div className="faq-support-panel border border-line bg-background p-6">
              <p className="text-sm font-semibold text-foreground">
                {isArabic
                  ? "دعم استفسارات B2B"
                  : isChinese
                    ? "B2B 询盘支持"
                    : isVietnamese
                      ? "Hỗ trợ yêu cầu B2B"
                      : "B2B inquiry support"}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {isArabic
                  ? "لاختيار المنتجات أو مطابقة مشروع فندق أو عرض OEM/ODM، أرسل نوع المنتج والكمية والسوق ومتطلبات المشروع."
                  : isChinese
                  ? "如需产品选型、酒店项目匹配、分销合作或 OEM/ODM 报价，请提供产品类型、数量、目标市场和项目需求。"
                  : isVietnamese
                    ? "Để lựa chọn sản phẩm, đối chiếu dự án khách sạn, hợp tác phân phối hoặc báo giá OEM/ODM, hãy cung cấp loại sản phẩm, số lượng, thị trường mục tiêu và yêu cầu dự án."
                    : "For product selection, hotel project matching, distributor cooperation, or OEM/ODM quotation, contact our team with your product type, quantity, target market, and project needs."}
              </p>
              <div className="faq-support-actions mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-2 text-sm font-semibold text-white"
                >
                  {isArabic ? "إرسال استفسار" : isChinese ? "提交询盘" : isVietnamese ? "Gửi yêu cầu" : "Send Inquiry"}
                </Link>
                <Link
                  href={
                    isVietnamese || isFinalReviewLocale(locale)
                      ? `/${locale}/resources/`
                      : "/en/downloads/"
                  }
                  className="inline-flex min-h-11 items-center border border-line px-5 py-2 text-sm font-semibold text-foreground"
                >
                  {isArabic ? "عرض الكتالوجات" : isChinese ? "查看目录" : isVietnamese ? "Xem hướng dẫn kỹ thuật" : "View Catalogs"}
                </Link>
                <a
                  href={`https://wa.me/${brand.whatsapp.international}`}
                  className="inline-flex min-h-11 items-center border border-line px-5 py-2 text-sm font-semibold text-foreground"
                >
                  {isArabic ? "عرض سعر عبر WhatsApp" : isChinese ? "通过 WhatsApp 获取报价" : isVietnamese ? "Yêu cầu báo giá qua WhatsApp" : "Get a Quote on WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <nav
            aria-label={isArabic ? "فئات الأسئلة الشائعة" : isVietnamese ? "Nhóm câu hỏi thường gặp" : "FAQ categories"}
            className="flex flex-wrap gap-3 border-b border-line pb-8"
          >
            {faqCategories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="faq-category-chip border border-line bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
              >
                {category.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-12">
            {faqCategories.map((category) => (
              <section key={category.slug} id={category.slug} className="faq-group-panel">
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-3">
                  <div>
                    <p className="text-sm font-semibold uppercase text-brand">
                      {category.items.length} {isArabic ? "أسئلة" : isChinese ? "个问题" : isVietnamese ? "câu hỏi" : "questions"}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.items.map((faq, index) => (
                    <details
                      key={faq.question}
                      className="faq-item-card group border border-line bg-surface"
                      open={index === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 font-semibold text-foreground">
                        <span>{faq.question}</span>
                        <span className="faq-toggle-mark text-brand">+</span>
                      </summary>
                      <div className="faq-answer-panel border-t border-line px-5 py-4">
                        <p className="max-w-4xl leading-8 text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-12">
          <div className="faq-support-quote border border-line bg-foreground p-7 text-white sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold">
                  {isArabic ? "هل لديك أسئلة أخرى؟" : isChinese ? "还有其他问题？" : isVietnamese ? "Bạn vẫn còn câu hỏi?" : "Still have questions?"}
                </h2>
                <p className="mt-3 max-w-3xl leading-8 text-white/75">
                  {isArabic
                    ? "تواصل معنا لاختيار المنتجات وتعاون OEM/ODM وحلول مشروعات الفنادق."
                    : isChinese
                    ? "联系我们，讨论产品选型、OEM/ODM 合作和酒店项目解决方案。"
                    : isVietnamese
                      ? "Liên hệ với chúng tôi để trao đổi về lựa chọn sản phẩm, hợp tác OEM/ODM và giải pháp dự án khách sạn."
                      : "Contact our team for product selection, OEM/ODM cooperation, and hotel project solutions."}
                </p>
              </div>
              <div className="faq-support-actions flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="cta-button-light inline-flex min-h-11 items-center px-5 py-2 text-sm font-semibold"
                >
                  {isArabic ? "إرسال استفسار" : isChinese ? "提交询盘" : isVietnamese ? "Gửi yêu cầu" : "Send Inquiry"}
                </Link>
                <Link
                  href={`/${locale}/products/`}
                  className="inline-flex min-h-11 items-center border border-white/50 px-5 py-2 text-sm font-semibold text-white"
                >
                  {isArabic ? "عرض المنتجات" : isChinese ? "查看产品" : isVietnamese ? "Xem sản phẩm" : "View Products"}
                </Link>
                <a
                  href={`https://wa.me/${brand.whatsapp.international}`}
                  className="inline-flex min-h-11 items-center border border-white/50 px-5 py-2 text-sm font-semibold text-white"
                >
                  {isArabic ? "عرض سعر عبر WhatsApp" : isChinese ? "通过 WhatsApp 获取报价" : isVietnamese ? "Yêu cầu báo giá qua WhatsApp" : "Get a Quote on WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
