import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import type { Locale } from "@/config/i18n";
import {
  buildQuoteHref,
  type InquiryAttribution,
} from "@/lib/inquiry/attribution";

type ContactCtaProps = {
  locale: Locale;
  label?: string;
  attribution?: Omit<InquiryAttribution, "ctaPosition">;
};

export function ContactCta({
  locale,
  label = "Contact Sales",
  attribution,
}: ContactCtaProps) {
  const isChinese = locale === "zh";
  const baseAttribution = attribution ?? {
    sourcePage: `/${locale}/`,
    contentType: "site",
  };
  const quoteAttribution: InquiryAttribution = {
    ...baseAttribution,
    ctaPosition: "bottom_contact_cta",
  };

  return (
    <aside className="section-tech border-y border-brand/30 px-6 py-9 text-white sm:px-8">
      <div className="tech-grid absolute inset-0 opacity-35" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-white/70">
            {isChinese ? "B2B 项目支持" : "B2B project support"}
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {isChinese
              ? "技术适配、OEM 选项与供货规划。"
              : "Technical fit, OEM options, and supply planning."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <TrackedInquiryLink
            href={buildQuoteHref(locale, quoteAttribution)}
            channel="form"
            attribution={quoteAttribution}
            className="cta-button-light inline-flex min-h-11 shrink-0 items-center justify-center px-5 py-3 font-semibold"
          >
            {label || "Contact Sales"}
          </TrackedInquiryLink>
          <WhatsAppButton
            className="inline-flex min-h-11 shrink-0 items-center justify-center border border-white/55 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
            message={
              isChinese
                ? "您好，DUALCORE LINK。我想咨询项目报价。"
                : "Hello DUALCORE LINK, I would like to get a quote."
            }
            label={isChinese ? "通过 WhatsApp 咨询" : undefined}
            attribution={{
              ...baseAttribution,
              ctaPosition: "bottom_whatsapp_cta",
            }}
          />
        </div>
      </div>
    </aside>
  );
}
