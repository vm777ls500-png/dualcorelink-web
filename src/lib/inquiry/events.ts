import type { InquiryAttribution } from "@/lib/inquiry/attribution";
import { sendGa4InquiryEvent } from "@/lib/analytics/ga4";

export type InquiryChannel = "form" | "whatsapp" | "email";
export type InquiryAction =
  | "cta_click"
  | "form_submit"
  | "form_submit_attempt"
  | "form_submit_success"
  | "form_submit_failure"
  | "email_draft_open";

export type InquiryEvent = {
  event: `inquiry_${InquiryAction}`;
  source_type: InquiryAttribution["contentType"];
  source_slug?: string;
  cta_location: string;
  category: InquiryChannel;
  page_path: string;
  error_category?: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
};

export function trackInquiryEvent(
  action: InquiryAction,
  channel: InquiryChannel,
  attribution: InquiryAttribution,
  errorCategory?: string,
) {
  if (typeof window === "undefined") return;

  const payload = createInquiryEvent(
    action,
    channel,
    attribution,
    window.location.pathname,
    errorCategory,
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
  errorCategory?: string,
): InquiryEvent {
  const event: InquiryEvent = {
    event: `inquiry_${action}`,
    source_type: attribution.contentType,
    source_slug: attribution.contentSlug,
    cta_location: attribution.ctaPosition,
    category: channel,
    page_path: attribution.sourcePage || fallbackPagePath,
  };
  if (errorCategory) event.error_category = errorCategory;
  return event;
}
