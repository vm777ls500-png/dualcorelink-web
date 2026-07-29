"use client";

import { brand } from "@/config/brand";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import {
  buildQuoteHref,
  type InquiryContentType,
} from "@/lib/inquiry/attribution";
import type { Locale } from "@/config/i18n";
import { getUiMessages } from "@/content/locales/ui";

const officeLocation = "Cangzhou, Hebei, China";
const wechatId = "a13703333750";
const phoneNumber = "+86 13703333750";
const phoneHref = "tel:+8613703333750";

export function Footer({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const messages = getUiMessages(locale);
  const pathSegments = pathname.split("/").filter(Boolean);
  const contentTypeBySection: Record<string, InquiryContentType> = {
    products: "product",
    resources: "resource",
    solutions: "solution",
    regions: "region",
    contact: "contact",
  };
  const footerAttribution = {
    sourcePage: pathname,
    contentType: contentTypeBySection[pathSegments[1]] ?? ("site" as const),
    contentSlug: pathSegments[2],
  };

  if (locale !== "en") {
    const localizedLinks = [
      [messages.navigation.products, `/${locale}/products/`],
      [messages.navigation.solutions, `/${locale}/solutions/`],
      [messages.navigation.regions, `/${locale}/regions/`],
      [messages.navigation.faqs, `/${locale}/faqs/`],
      [messages.navigation.about, `/${locale}/about/`],
    ] as const;

    return (
      <footer className="border-t border-line bg-foreground text-white">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-9 text-sm sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          <div>
            <p className="font-semibold">{brand.name}</p>
            <p className="mt-2 text-white/70">{brand.legalEntity}</p>
            <Link
              className="mt-3 block text-white/70"
              href={`/${locale}/about/`}
            >
              {messages.navigation.about}
            </Link>
          </div>
          <div>
            <p className="font-semibold">{messages.footer.navigation}</p>
            {localizedLinks.map(([label, href]) => (
              <Link
                key={href}
                className="mt-2 block text-white/70"
                href={href}
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p className="font-semibold">{messages.footer.contact}</p>
            <TrackedInquiryLink
              className="mt-3 inline-flex min-h-10 items-center border border-white/50 px-4 py-2 font-semibold text-white"
              href={buildQuoteHref(locale, {
                ...footerAttribution,
                ctaPosition: "global_footer",
              })}
              channel="form"
              attribution={{
                ...footerAttribution,
                ctaPosition: "global_footer",
              }}
            >
              {messages.footer.projectInquiry}
            </TrackedInquiryLink>
            <TrackedInquiryLink
              className="mt-3 block text-white/70"
              href={`mailto:${brand.emails.sales}`}
              channel="email"
              attribution={{
                ...footerAttribution,
                ctaPosition: "footer_sales_email",
              }}
            >
              {brand.emails.sales}
            </TrackedInquiryLink>
          </div>
          <div>
            <p className="font-semibold">{messages.footer.whatsapp}</p>
            <TrackedInquiryLink
              className="mt-2 block text-white/70"
              href={`https://wa.me/${brand.whatsapp.international}`}
              channel="whatsapp"
              attribution={{
                ...footerAttribution,
                ctaPosition: "footer_whatsapp_number",
              }}
            >
              {brand.whatsapp.display}
            </TrackedInquiryLink>
            <div className="mt-4 space-y-1 text-white/70">
              <p>
                {messages.footer.office}: {officeLocation}
              </p>
              <p>
                {messages.footer.wechat}: {wechatId}
              </p>
              <a className="block" href={phoneHref}>
                {messages.footer.phone}: {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-line bg-foreground text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 text-sm sm:grid-cols-4 sm:px-8 lg:px-12">
        <div>
          <p className="font-semibold">{brand.name}</p>
          <p className="mt-2 text-white/70">{brand.legalEntity}</p>
          <TrackedInquiryLink
            className="mt-3 block text-white/70"
            href={`mailto:${brand.emails.general}`}
            channel="email"
            attribution={{
              ...footerAttribution,
              ctaPosition: "footer_general_email",
            }}
          >
            {brand.emails.general}
          </TrackedInquiryLink>
          <Link className="mt-3 block text-white/70" href="/en/about/">
            About DualCoreLink
          </Link>
        </div>
        <div>
          <p className="font-semibold">Product Navigation</p>
          <Link className="mt-2 block text-white/70" href="/en/products/">
            Product Center
          </Link>
          <Link className="mt-2 block text-white/70" href="/en/product-series/">
            Product Series
          </Link>
          <Link className="mt-2 block text-white/70" href="/en/solutions/">
            Solutions
          </Link>
          <Link className="mt-2 block text-white/70" href="/en/case-studies/">
            Case Studies
          </Link>
          <Link
            className="mt-2 block text-white/70"
            href="/en/application-scenarios/"
          >
            Applications
          </Link>
        </div>
        <div>
          <p className="font-semibold">Get a Quote</p>
          <TrackedInquiryLink
            className="mt-3 inline-flex min-h-10 items-center border border-white/50 px-4 py-2 font-semibold text-white"
            href={buildQuoteHref("en", {
              ...footerAttribution,
              ctaPosition: "global_footer",
            })}
            channel="form"
            attribution={{
              ...footerAttribution,
              ctaPosition: "global_footer",
            }}
          >
            Send Project Inquiry
          </TrackedInquiryLink>
          <TrackedInquiryLink
            className="mt-3 block text-white/70"
            href={`mailto:${brand.emails.sales}`}
            channel="email"
            attribution={{
              ...footerAttribution,
              ctaPosition: "footer_sales_email",
            }}
          >
            {brand.emails.sales}
          </TrackedInquiryLink>
          <p className="mt-2 text-white/60">{brand.emailPurposes.sales}</p>
        </div>
        <div>
          <p className="font-semibold">WhatsApp</p>
          <TrackedInquiryLink
            className="mt-2 block text-white/70"
            href={`https://wa.me/${brand.whatsapp.international}`}
            channel="whatsapp"
            attribution={{
              ...footerAttribution,
              ctaPosition: "footer_whatsapp_number",
            }}
          >
            WhatsApp: {brand.whatsapp.display}
          </TrackedInquiryLink>
          <TrackedInquiryLink
            className="mt-3 inline-flex min-h-10 items-center border border-white/50 px-4 py-2 font-semibold text-white"
            href={`https://wa.me/${brand.whatsapp.international}`}
            channel="whatsapp"
            attribution={{
              ...footerAttribution,
              ctaPosition: "footer_whatsapp_cta",
            }}
          >
            {brand.whatsapp.label}
          </TrackedInquiryLink>
          <div className="mt-4 space-y-1 text-white/70">
            <p>Office: {officeLocation}</p>
            <p>WeChat: {wechatId}</p>
            <a className="block" href={phoneHref}>
              Phone: {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
