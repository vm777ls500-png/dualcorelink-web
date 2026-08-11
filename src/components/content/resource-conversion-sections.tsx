import Image from "next/image";
import Link from "next/link";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { BidiTechnicalText } from "@/components/i18n/bidi-technical-text";
import { brand, createWhatsAppUrl } from "@/config/brand";
import { productDisplayImages } from "@/config/product-display-images";
import type { ResourceGuide, ResourceLink } from "@/config/resources";
import type { Locale } from "@/config/i18n";
import { buildQuoteHref } from "@/lib/inquiry/attribution";

function getSlugFromHref(href: string) {
  return href.split("/").filter(Boolean).at(-1) ?? "";
}

export function ResourceMidArticleCta({
  resource,
  continueReading,
  locale,
}: {
  resource: ResourceGuide;
  continueReading: ResourceGuide[];
  locale: Locale;
}) {
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const isVietnamese = locale === "vi";
  const nextResource = continueReading[0];
  const primaryProduct = resource.relatedProducts[0];
  const primarySolution = resource.relatedSolutions[0];
  const baseAttribution = {
    sourcePage: `/${locale}/resources/${resource.slug}/`,
    contentType: "resource" as const,
    contentSlug: resource.slug,
    sourceTitle: resource.h1,
  };
  const projectAttribution = {
    ...baseAttribution,
    ctaPosition: "resource_mid_article",
  };
  const salesAttribution = {
    ...baseAttribution,
    ctaPosition: "resource_mid_contact_sales",
  };

  return (
    <aside
      aria-labelledby="resource-mid-cta-title"
      className="resource-mid-cta border border-line bg-surface p-6 sm:p-7"
    >
      <p className="text-sm font-semibold uppercase text-brand">
        {isArabic ? "استشارة المشروع" : isChinese ? "项目咨询" : isVietnamese ? "Tư vấn dự án" : "Project consultation"}
      </p>
      <h2
        id="resource-mid-cta-title"
        className="mt-2 text-2xl font-semibold leading-8 text-foreground"
      >
        {isArabic ? "هل تخطط لمشروع فندق ذكي؟" : isChinese ? "正在规划智能酒店项目？" : isVietnamese ? "Bạn đang lập kế hoạch cho dự án khách sạn thông minh?" : "Planning a smart hotel project?"}
      </h2>
      <p className="mt-3 max-w-3xl leading-8 text-muted">
        {isArabic
          ? "شارك عدد الغرف وموقع المشروع والوظائف المطلوبة واحتياجات التخصيص لتقييم خيارات RCU ولوحات التحكم وأتمتة الغرف."
          : isChinese
          ? "请提供客房数量、项目地点、所需功能与定制需求，我们可以协助评估 RCU、控制面板和客房自动化产品方向。"
          : isVietnamese
          ? "Cung cấp số phòng, địa điểm dự án, chức năng cần thiết và yêu cầu tùy chỉnh để chúng tôi hỗ trợ đánh giá RCU, bảng điều khiển và các phương án tự động hóa phòng."
          : "Share your room count, project location, required functions, and customization needs. Our team can help you evaluate suitable RCU, control panel, and room automation options."}
      </p>
      <div className="resource-conversion-actions mt-5 flex flex-wrap gap-3">
        <TrackedInquiryLink
          href={buildQuoteHref(locale, projectAttribution)}
          channel="form"
          attribution={projectAttribution}
          className="brand-button w-full px-5 py-3 sm:w-auto"
        >
          {isArabic ? "ناقش مشروعك" : isChinese ? "讨论项目" : isVietnamese ? "Trao đổi về dự án" : "Discuss Your Project"}
        </TrackedInquiryLink>
        <TrackedInquiryLink
          href={buildQuoteHref(locale, salesAttribution)}
          channel="form"
          attribution={salesAttribution}
          className="brand-button-outline w-full px-5 py-3 sm:w-auto"
        >
          {isArabic ? "تواصل مع المبيعات" : isChinese ? "联系销售" : isVietnamese ? "Liên hệ kinh doanh" : "Contact Sales"}
        </TrackedInquiryLink>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-sm font-semibold text-foreground">
          {isArabic ? "الخطوات التالية المقترحة" : isChinese ? "建议下一步" : isVietnamese ? "Bước tiếp theo đề xuất" : "Useful next steps"}
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-3">
          <li>
            <Link
              href={primaryProduct.href}
              className="font-semibold text-brand hover:text-foreground"
            >
              {isArabic ? "عرض" : isChinese ? "查看" : isVietnamese ? "Xem" : "Review"} {primaryProduct.title}
            </Link>
          </li>
          <li>
            <Link
              href={primarySolution.href}
              className="font-semibold text-brand hover:text-foreground"
            >
              {isArabic ? "استكشاف" : isChinese ? "了解" : isVietnamese ? "Khám phá" : "Explore"} {primarySolution.title}
            </Link>
          </li>
          {nextResource ? (
            <li>
              <Link
                href={`/${locale}/resources/${nextResource.slug}/`}
                className="font-semibold text-brand hover:text-foreground"
              >
                {isArabic ? "متابعة القراءة" : isChinese ? "继续阅读" : isVietnamese ? "Đọc tiếp" : "Read"} {nextResource.h1}
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </aside>
  );
}

function ProductCard({
  product,
  locale,
}: {
  product: ResourceLink;
  locale: Locale;
}) {
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const isVietnamese = locale === "vi";
  const slug = getSlugFromHref(product.href);
  const image = productDisplayImages[slug];

  return (
    <article className="surface-card surface-card-hover flex min-w-0 flex-col overflow-hidden">
      {image ? (
        <Link
          href={product.href}
        aria-label={`${isArabic ? "عرض" : isChinese ? "查看" : isVietnamese ? "Xem" : "View"} ${product.title}`}
          className="block aspect-[4/3] overflow-hidden border-b border-line bg-white p-4"
        >
          <Image
            src={image.src}
            alt={product.title}
            width={image.width}
            height={image.height}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 360px"
            className="h-full w-full object-contain"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase text-brand">
          {isArabic ? "المنتج" : isChinese ? "产品" : isVietnamese ? "Sản phẩm" : "Product"}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">
          <Link href={product.href} className="hover:text-brand">
            {product.title}
          </Link>
        </h3>
        {product.description ? (
          <p className="mt-3 flex-1 text-sm leading-6 text-muted">
            <BidiTechnicalText text={product.description} />
          </p>
        ) : null}
        <Link
          href={product.href}
          className="mt-5 inline-flex min-h-11 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand hover:border-brand hover:text-foreground"
        >
          {isArabic ? "عرض المنتج" : isChinese ? "查看产品" : isVietnamese ? "Xem sản phẩm" : "View Product"}
        </Link>
      </div>
    </article>
  );
}

function SolutionCard({
  solution,
  locale,
}: {
  solution: ResourceLink;
  locale: Locale;
}) {
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const isVietnamese = locale === "vi";
  return (
    <article className="surface-card surface-card-hover flex min-w-0 flex-col p-5">
      <p className="text-xs font-semibold uppercase text-brand">
        {isArabic ? "الحل" : isChinese ? "解决方案" : isVietnamese ? "Giải pháp" : "Solution"}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">
        <Link href={solution.href} className="hover:text-brand">
          {solution.title}
        </Link>
      </h3>
      {solution.description ? (
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">
          <BidiTechnicalText text={solution.description} />
        </p>
      ) : null}
      <Link
        href={solution.href}
        className="mt-5 inline-flex min-h-11 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand hover:border-brand hover:text-foreground"
      >
        {isArabic ? "عرض الحل" : isChinese ? "查看解决方案" : isVietnamese ? "Xem giải pháp" : "View Solution"}
      </Link>
    </article>
  );
}

function ContinueReadingCard({
  resource,
  locale,
}: {
  resource: ResourceGuide;
  locale: Locale;
}) {
  const href = `/${locale}/resources/${resource.slug}/`;

  return (
    <article className="surface-card surface-card-hover flex min-w-0 flex-col p-5">
      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-brand">
        <span>{resource.category}</span>
        <span aria-hidden="true">/</span>
        <span>{resource.readingTime}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold leading-7 text-foreground">
        <Link href={href} className="hover:text-brand">
          {resource.h1}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">
        <BidiTechnicalText text={resource.summary} />
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex min-h-11 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand hover:border-brand hover:text-foreground"
      >
        {locale === "ar" ? "قراءة الدليل" : locale === "zh" ? "阅读指南" : locale === "vi" ? "Đọc hướng dẫn" : "Read Guide"}
      </Link>
    </article>
  );
}

export function ResourceConversionSections({
  resource,
  continueReading,
  locale,
}: {
  resource: ResourceGuide;
  continueReading: ResourceGuide[];
  locale: Locale;
}) {
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const isVietnamese = locale === "vi";
  const whatsappUrl = createWhatsAppUrl(resource.cta.whatsappMessage);
  const baseAttribution = {
    sourcePage: `/${locale}/resources/${resource.slug}/`,
    contentType: "resource" as const,
    contentSlug: resource.slug,
    sourceTitle: resource.h1,
  };
  const projectAttribution = {
    ...baseAttribution,
    ctaPosition: "resource_bottom_project_inquiry",
  };
  const salesAttribution = {
    ...baseAttribution,
    ctaPosition: "resource_bottom_contact_sales",
  };

  return (
    <div className="resource-conversion-sections space-y-10">
      <section aria-labelledby="recommended-products-title">
        <p className="text-sm font-semibold uppercase text-brand">
          {isArabic ? "اختيار المنتجات" : isChinese ? "产品选型" : isVietnamese ? "Lựa chọn sản phẩm" : "Product discovery"}
        </p>
        <h2
          id="recommended-products-title"
          className="mt-2 text-2xl font-semibold leading-8 text-foreground"
        >
          {isArabic ? "المنتجات الموصى بها" : isChinese ? "推荐产品" : isVietnamese ? "Sản phẩm đề xuất" : "Recommended Products"}
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          {isArabic
            ? "راجع المنتجات المرتبطة بموضوع الدليل، ثم أكد الاختيار النهائي وفق التوصيلات والجهد والبروتوكول ووظائف الغرفة."
            : isChinese
            ? "查看与本指南规划主题相关的产品。最终选型仍需结合项目布线、电压、协议和客房功能要求确认。"
            : isVietnamese
            ? "Xem các sản phẩm liên quan đến chủ đề lập kế hoạch trong hướng dẫn này. Lựa chọn cuối cùng cần được xác nhận theo hệ thống dây, điện áp, giao thức và yêu cầu chức năng của phòng."
            : "Review a focused set of products that relates to the planning topics in this guide. Final selection should be confirmed against project wiring, voltage, protocol, and room-function requirements."}
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {resource.relatedProducts.map((product) => (
            <ProductCard key={product.href} product={product} locale={locale} />
          ))}
        </div>
      </section>

      <section aria-labelledby="relevant-solutions-title">
        <p className="text-sm font-semibold uppercase text-brand">
          {isArabic ? "تخطيط المشروع" : isChinese ? "项目规划" : isVietnamese ? "Lập kế hoạch dự án" : "Project planning"}
        </p>
        <h2
          id="relevant-solutions-title"
          className="mt-2 text-2xl font-semibold leading-8 text-foreground"
        >
          {isArabic ? "الحلول ذات الصلة" : isChinese ? "相关解决方案" : isVietnamese ? "Giải pháp liên quan" : "Relevant Solutions"}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {resource.relatedSolutions.map((solution) => (
            <SolutionCard key={solution.href} solution={solution} locale={locale} />
          ))}
        </div>
      </section>

      <section aria-labelledby="continue-reading-title">
        <p className="text-sm font-semibold uppercase text-brand">
          {isArabic ? "مكتبة الموارد" : isChinese ? "资源中心" : isVietnamese ? "Thư viện tài nguyên" : "Resource library"}
        </p>
        <h2
          id="continue-reading-title"
          className="mt-2 text-2xl font-semibold leading-8 text-foreground"
        >
          {isArabic ? "متابعة القراءة" : isChinese ? "继续阅读" : isVietnamese ? "Đọc tiếp" : "Continue Reading"}
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {continueReading.map((relatedResource) => (
            <ContinueReadingCard
              key={relatedResource.slug}
              resource={relatedResource}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <section className="cta-tech-panel border border-transparent p-6 text-white sm:p-8">
        <p className="text-sm font-semibold uppercase text-white/70">
          {isArabic ? "استفسار المشروع" : isChinese ? "项目询盘" : isVietnamese ? "Yêu cầu dự án" : "Project inquiry"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-8">
          {isArabic ? "هل تحتاج مساعدة في اختيار حل تحكم فندقي؟" : isChinese ? "需要协助选择酒店客控方案？" : isVietnamese ? "Bạn cần hỗ trợ lựa chọn giải pháp điều khiển khách sạn?" : "Need help selecting a hotel control solution?"}
        </h2>
        <p className="mt-3 max-w-3xl leading-8 text-white/75">
          {isArabic
            ? "أرسل نوع الفندق وعدد الغرف والسوق المستهدف والوظائف المطلوبة لنقترح بنية التحكم والمنتجات وخيارات OEM/ODM المناسبة."
            : isChinese
            ? "请说明酒店类型、客房数量、目标市场和所需功能，我们可以协助梳理控制架构、产品与 OEM/ODM 选项。"
            : isVietnamese
            ? "Cho chúng tôi biết loại khách sạn, số phòng, thị trường mục tiêu và chức năng cần thiết để được hỗ trợ xác định kiến trúc điều khiển, sản phẩm và lựa chọn OEM/ODM."
            : "Tell us your hotel type, room count, target market, and required functions. We can recommend suitable control architecture, products, and OEM/ODM options for your project."}
        </p>
        <div className="resource-conversion-actions mt-6 flex flex-wrap gap-3">
          <TrackedInquiryLink
            href={buildQuoteHref(locale, projectAttribution)}
            channel="form"
            attribution={projectAttribution}
            className="cta-button-light inline-flex min-h-11 w-full items-center justify-center border px-5 py-3 font-semibold sm:w-auto"
          >
            {isArabic ? "إرسال استفسار المشروع" : isChinese ? "提交项目询盘" : isVietnamese ? "Gửi yêu cầu dự án" : "Send Project Inquiry"}
          </TrackedInquiryLink>
          <TrackedInquiryLink
            href={buildQuoteHref(locale, salesAttribution)}
            channel="form"
            attribution={salesAttribution}
            className="inline-flex min-h-11 w-full items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white sm:w-auto"
          >
            {isArabic ? "تواصل مع المبيعات" : isChinese ? "联系销售" : isVietnamese ? "Liên hệ kinh doanh" : "Contact Sales"}
          </TrackedInquiryLink>
          <TrackedInquiryLink
            href={whatsappUrl}
            channel="whatsapp"
            attribution={{
              ...baseAttribution,
              ctaPosition: "resource_bottom_whatsapp",
            }}
            className="inline-flex min-h-11 w-full items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white sm:w-auto"
          >
            {brand.whatsapp.label}
          </TrackedInquiryLink>
        </div>
        <ul className="mt-6 grid gap-2 border-t border-white/20 pt-5 text-sm text-white/75 sm:grid-cols-2">
          <li>{isArabic ? "دعم OEM/ODM حسب سلسلة المنتج ومتطلبات المشروع." : isChinese ? "按产品系列和项目要求提供 OEM/ODM 支持。" : isVietnamese ? "Hỗ trợ OEM/ODM theo dòng sản phẩm và yêu cầu dự án." : "OEM/ODM support by product series and project requirements."}</li>
          <li>{isArabic ? "دعم اختيار RCU واللوحات الذكية." : isChinese ? "提供 RCU 与智能面板产品选型支持。" : isVietnamese ? "Hỗ trợ lựa chọn RCU và bảng điều khiển thông minh." : "RCU and smart panel product selection support."}</li>
        </ul>
      </section>
    </div>
  );
}
