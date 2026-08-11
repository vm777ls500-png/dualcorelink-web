import Image from "next/image";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { brand } from "@/config/brand";
import type { Locale } from "@/config/i18n";
import { buildQuoteHref } from "@/lib/inquiry/attribution";
import {
  panelConfigurationCopy,
  panelConfigurations,
  panelConfigurationSeries,
} from "@/config/static-oem-odm-configurations";

type CustomPanelConfigurationSectionProps = {
  locale: Locale;
};

export function CustomPanelConfigurationSection({
  locale,
}: CustomPanelConfigurationSectionProps) {
  const isChinese = locale === "zh";
  const isVietnamese = locale === "vi";
  const copy = isChinese
    ? {
        eyebrow: "OEM/ODM 配置",
        title: "客房控制面板定制配置选项",
        subtitle: "面向酒店客房与 OEM/ODM 项目协调面板饰面和可选功能模块。",
        intro: "以下布局用于讨论照明、窗帘、房态、插卡取电、温控、插座、USB 与低压功能组合；每张图片都是项目配置示例，并非固定库存型号。",
        cardNote: "配置示例。最终模块选择与生产范围需按项目书面确认。",
        disclaimer: "图片展示 OEM/ODM 配置示例，不代表标准库存型号。模块、颜色、布局、功能与数量可按项目讨论；最终兼容性、起订量、交期和报价以书面确认为准。",
        primaryCta: "提交 OEM/ODM 配置需求",
        secondaryCta: "发送客房布局",
      }
    : isVietnamese
      ? {
          ...panelConfigurationCopy,
          eyebrow: "Cấu hình OEM/ODM",
          title: "Tùy chọn cấu hình bảng điều khiển phòng khách sạn",
          subtitle: "Phối hợp bề mặt và mô-đun chức năng tùy chọn cho phòng khách sạn và dự án OEM/ODM.",
          intro: "Các bố cục sau hỗ trợ trao đổi về tổ hợp chiếu sáng, rèm, trạng thái phòng, thẻ tiết kiệm điện, điều nhiệt, ổ cắm, USB và chức năng điện áp thấp; mỗi hình là ví dụ cấu hình dự án, không phải model tồn kho cố định.",
          cardNote: "Ví dụ cấu hình. Lựa chọn mô-đun và phạm vi sản xuất cuối cùng phải được xác nhận bằng văn bản theo dự án.",
          disclaimer: "Hình ảnh minh họa cấu hình OEM/ODM, không đại diện cho model tồn kho tiêu chuẩn. Mô-đun, màu sắc, bố cục, chức năng và số lượng có thể trao đổi theo dự án; khả năng tương thích, MOQ, thời gian giao hàng và báo giá phải được xác nhận bằng văn bản.",
          primaryCta: "Gửi yêu cầu cấu hình OEM/ODM",
          secondaryCta: "Gửi bố cục phòng",
        }
      : panelConfigurationCopy;
  const emailUrl = `mailto:${brand.emails.sales}?subject=${encodeURIComponent(
    "OEM/ODM room panel configuration",
  )}`;
  const baseAttribution = {
    sourcePage: `/${locale}/solutions/oem-odm-custom-panel-solution/`,
    contentType: "solution" as const,
    contentSlug: "oem-odm-custom-panel-solution",
    sourceTitle: "OEM/ODM Smart Panel Solution",
  };
  const quoteAttribution = {
    ...baseAttribution,
    ctaPosition: "custom_panel_configuration",
  };

  return (
    <section
      id={panelConfigurationCopy.moduleId}
      className="border-t border-line pt-10"
    >
      <header className="max-w-4xl">
        <p className="text-sm font-semibold uppercase text-brand">
          {copy.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-foreground">
          {copy.title}
        </h2>
        <p className="mt-3 text-lg leading-8 text-foreground">
          {copy.subtitle}
        </p>
        <p className="mt-3 leading-7 text-muted">
          {copy.intro}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {panelConfigurationSeries.map((series) => {
          const configurations = panelConfigurations.filter(
            (configuration) => configuration.series === series,
          );
          const seriesHeadingId = `${series
            .toLowerCase()
            .replaceAll(" ", "-")}-heading`;

          return (
            <section key={series} aria-labelledby={seriesHeadingId}>
              <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                <h3
                  id={seriesHeadingId}
                  className="text-xl font-semibold text-foreground"
                >
                  {series}
                </h3>
                <p className="text-sm text-muted">
                  {isChinese
                    ? `${configurations.length} 个配置示例`
                    : isVietnamese
                      ? `${configurations.length} ví dụ cấu hình`
                    : `${configurations.length} configuration${
                        configurations.length === 1 ? "" : "s"
                      }`}
                </p>
              </div>

              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {configurations.map((configuration, index) => (
                  <li
                    key={configuration.id}
                    className="border border-line bg-surface"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-background">
                      <Image
                        src={configuration.image}
                        alt={
                          isChinese
                            ? `${series}酒店客房面板配置示例 ${index + 1}`
                            : isVietnamese
                              ? `Ví dụ cấu hình bảng điều khiển phòng khách sạn ${series} ${index + 1}`
                            : configuration.alt
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase text-brand">
                        {isChinese ? "配置示例" : isVietnamese ? "Ví dụ cấu hình" : "Configuration example"}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold leading-7 text-foreground">
                        {isChinese
                          ? `${series}配置方案 ${index + 1}`
                          : isVietnamese
                            ? `Phương án cấu hình ${series} ${index + 1}`
                          : configuration.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {isChinese
                          ? "用于酒店客房控制与供电面板的项目规划"
                          : isVietnamese
                            ? "Dùng để lập kế hoạch bảng điều khiển và cấp nguồn cho phòng khách sạn"
                          : configuration.useCase}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {configuration.modules.map((module) => (
                          <li
                            key={module}
                            className="border border-line bg-background px-3 py-2 text-xs font-medium text-foreground"
                          >
                            {isChinese ? "可选功能模块" : isVietnamese ? "Mô-đun chức năng tùy chọn" : module}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">
                        {copy.cardNote}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-10 border-y border-line bg-background px-5 py-6 sm:px-6">
        <p className="max-w-5xl text-sm leading-6 text-muted">
          {copy.disclaimer}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedInquiryLink
            href={buildQuoteHref(locale, quoteAttribution)}
            channel="form"
            attribution={quoteAttribution}
            className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          >
            {copy.primaryCta}
          </TrackedInquiryLink>
          <TrackedInquiryLink
            href={emailUrl}
            channel="email"
            attribution={{
              ...baseAttribution,
              ctaPosition: "custom_panel_email",
            }}
            className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
          >
            {copy.secondaryCta}
          </TrackedInquiryLink>
          <WhatsAppButton
            className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
            message="Hello DUALCORE LINK, I would like to discuss an OEM/ODM room panel configuration."
            attribution={{
              ...baseAttribution,
              ctaPosition: "custom_panel_whatsapp",
            }}
          />
        </div>
      </div>
    </section>
  );
}
