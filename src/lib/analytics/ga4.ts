import type { InquiryEvent } from "@/lib/inquiry/events";

export const analyticsConsentStorageKey =
  "dualcorelink_analytics_consent";

export type AnalyticsConsent = "granted" | "denied";

export type Ga4InquiryEvent = {
  name: InquiryEvent["event"];
  params: Omit<InquiryEvent, "event">;
};

type ConsentSafeGa4Params = Record<string, string | undefined>;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    dualcorelinkGa4Configured?: boolean;
  }
}

export function normalizeGa4MeasurementId(value?: string) {
  const measurementId = value?.trim().toUpperCase() ?? "";
  return /^G-[A-Z0-9]{6,20}$/.test(measurementId)
    ? measurementId
    : undefined;
}

export function createGa4InquiryEvent(
  event: InquiryEvent,
): Ga4InquiryEvent {
  const { event: name, ...params } = event;
  return { name, params };
}

export function readAnalyticsConsent(): AnalyticsConsent | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const value = window.localStorage.getItem(analyticsConsentStorageKey);
    return value === "granted" || value === "denied" ? value : undefined;
  } catch {
    return undefined;
  }
}

export function writeAnalyticsConsent(value: AnalyticsConsent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(analyticsConsentStorageKey, value);
  } catch {
    // Keep the in-memory choice for this page when browser storage is blocked.
  }
}

export function sendConsentSafeGa4Event(
  name: string,
  params: ConsentSafeGa4Params,
) {
  if (
    typeof window === "undefined" ||
    readAnalyticsConsent() !== "granted" ||
    typeof window.gtag !== "function" ||
    !window.dualcorelinkGa4Configured
  ) {
    return false;
  }

  window.gtag("event", name, params);
  return true;
}

export function sendGa4InquiryEvent(event: InquiryEvent) {
  const ga4Event = createGa4InquiryEvent(event);
  return sendConsentSafeGa4Event(ga4Event.name, ga4Event.params);
}
