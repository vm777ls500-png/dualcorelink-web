"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  normalizeGa4MeasurementId,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/analytics/ga4";

type Ga4ConsentProps = {
  measurementId?: string;
};

const googleTagScriptId = "dualcorelink-ga4";

function ensureGtag() {
  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
}

function setConsent(value: AnalyticsConsent) {
  ensureGtag();
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function Ga4Consent({ measurementId: rawMeasurementId }: Ga4ConsentProps) {
  const measurementId = normalizeGa4MeasurementId(rawMeasurementId);
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsConsent>();
  const [isOpen, setIsOpen] = useState(false);
  const [configured, setConfigured] = useState(false);
  const lastPagePath = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!measurementId) return;

    ensureGtag();
    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    window.gtag?.("set", "ads_data_redaction", true);

    const storedChoice = readAnalyticsConsent();
    setChoice(storedChoice);
    setIsOpen(storedChoice === undefined);

    if (storedChoice !== "granted") return;

    setConsent("granted");
    void configureGa4(measurementId)
      .then(() => setConfigured(true))
      .catch(() => setConfigured(false));
  }, [measurementId]);

  useEffect(() => {
    if (
      !measurementId ||
      choice !== "granted" ||
      !configured ||
      !pathname ||
      lastPagePath.current === pathname
    ) {
      return;
    }

    lastPagePath.current = pathname;
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
    });
  }, [choice, configured, measurementId, pathname]);

  if (!measurementId) return null;

  async function updateChoice(nextChoice: AnalyticsConsent) {
    writeAnalyticsConsent(nextChoice);
    setChoice(nextChoice);
    setIsOpen(false);
    setConsent(nextChoice);

    if (nextChoice === "granted") {
      try {
        await configureGa4(measurementId as string);
        setConfigured(true);
      } catch {
        setConfigured(false);
      }
    } else {
      setConfigured(false);
      lastPagePath.current = undefined;
    }
  }

  return (
    <>
      {isOpen ? (
        <aside
          aria-labelledby="analytics-consent-title"
          aria-modal="true"
          className="analytics-consent-panel"
          role="dialog"
        >
          <div>
            <h2
              id="analytics-consent-title"
              className="text-lg font-semibold text-foreground"
            >
              Analytics choices
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Allow privacy-safe analytics to help us understand which B2B pages
              and inquiry actions are useful. Contact details and form contents
              are never sent to analytics.
            </p>
          </div>
          <div className="analytics-consent-actions flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-4 py-2 font-semibold text-white"
              onClick={() => void updateChoice("granted")}
            >
              Allow analytics
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center border border-line bg-white px-4 py-2 font-semibold text-brand"
              onClick={() => void updateChoice("denied")}
            >
              Continue without analytics
            </button>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          className="analytics-preferences-button"
          onClick={() => setIsOpen(true)}
        >
          Analytics preferences
        </button>
      )}
    </>
  );
}

async function configureGa4(measurementId: string) {
  ensureGtag();

  if (!window.dualcorelinkGa4Configured) {
    window.gtag?.("js", new Date());
    window.gtag?.("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: "SameSite=Lax;Secure",
    });
    window.dualcorelinkGa4Configured = true;
  }

  const existingScript = document.getElementById(
    googleTagScriptId,
  ) as HTMLScriptElement | null;
  if (existingScript?.dataset.loaded === "true") return;

  await new Promise<void>((resolve, reject) => {
    const script = existingScript ?? document.createElement("script");
    const handleLoad = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", () => reject(new Error("GA4 script failed")), {
      once: true,
    });

    if (!existingScript) {
      script.id = googleTagScriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }
  });
}
