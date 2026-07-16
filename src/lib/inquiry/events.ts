import type { InquiryAttribution } from "@/lib/inquiry/attribution";
import { sendGa4InquiryEvent } from "@/lib/analytics/ga4";

export type InquiryChannel = "form" | "whatsapp" | "email";
export type InquiryAction = "cta_click" | "form_submit";

export type InquiryEvent = {
  event: `inquiry_${InquiryAction}`;
  source_type: InquiryAttribution["contentType"];
  source_slug?: string;
  cta_location: string;
  category: InquiryChannel;
  page_path: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
};

export function trackInquiryEvent(
  action: InquiryAction,
  channel: InquiryChannel,
  attribution: InquiryAttribution,
) {
  if (typeof window === "undefined") return;

  const payload = createInquiryEvent(
    action,
    channel,
    attribution,
    window.location.pathname,
  );
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push(payload);
  window.dispatchEvent(
    new CustomEvent("dualcorelink:inquiry", { detail: payload }),
  );
  sendGa4InquiryEvent(payload);
}

export function createInquiryEvent(
  action: InquiryAction,
  channel: InquiryChannel,
  attribution: InquiryAttribution,
  fallbackPagePath = "/en/",
): InquiryEvent {
  return {
    event: `inquiry_${action}`,
    source_type: attribution.contentType,
    source_slug: attribution.contentSlug,
    cta_location: attribution.ctaPosition,
    category: channel,
    page_path: attribution.sourcePage || fallbackPagePath,
  };
}
