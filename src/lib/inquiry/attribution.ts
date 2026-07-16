import type { Locale } from "@/config/i18n";

export const inquiryContentTypes = [
  "product",
  "resource",
  "solution",
  "region",
  "contact",
  "site",
] as const;

export type InquiryContentType = (typeof inquiryContentTypes)[number];

export type InquiryAttribution = {
  sourcePage: string;
  contentType: InquiryContentType;
  contentSlug?: string;
  sourceTitle?: string;
  ctaPosition: string;
};

const contentTypeSet = new Set<string>(inquiryContentTypes);

function cleanValue(value: string | null | undefined, maxLength: number) {
  return (value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function buildQuoteHref(
  locale: Locale,
  attribution: InquiryAttribution,
) {
  const params = new URLSearchParams();
  params.set("source_page", cleanValue(attribution.sourcePage, 240));
  params.set("content_type", attribution.contentType);
  if (attribution.contentSlug) {
    params.set("content_slug", cleanValue(attribution.contentSlug, 120));
  }
  if (attribution.sourceTitle) {
    params.set("source_title", cleanValue(attribution.sourceTitle, 160));
  }
  params.set("cta_position", cleanValue(attribution.ctaPosition, 80));

  return `/${locale}/contact/?${params.toString()}#get-a-quote`;
}

export function parseInquiryAttribution(
  search: string,
  fallbackSourcePage = "/en/contact/",
): InquiryAttribution {
  const params = new URLSearchParams(search);
  const rawContentType = cleanValue(params.get("content_type"), 32);
  const contentSlug = cleanValue(params.get("content_slug"), 120);
  const contentTypeIsValid = contentTypeSet.has(rawContentType);
  const contentTypeNeedsSlug = [
    "product",
    "resource",
    "solution",
    "region",
  ].includes(rawContentType);

  if (!contentTypeIsValid || (contentTypeNeedsSlug && !contentSlug)) {
    return {
      sourcePage: fallbackSourcePage,
      contentType: "contact",
      contentSlug: undefined,
      sourceTitle: undefined,
      ctaPosition: "contact_page",
    };
  }

  return {
    sourcePage:
      cleanValue(params.get("source_page"), 240) || fallbackSourcePage,
    contentType: rawContentType as InquiryContentType,
    contentSlug: contentSlug || undefined,
    sourceTitle: cleanValue(params.get("source_title"), 160) || undefined,
    ctaPosition:
      cleanValue(params.get("cta_position"), 80) || "contact_page",
  };
}
