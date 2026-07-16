"use client";

import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { brand, createWhatsAppUrl } from "@/config/brand";
import type { InquiryAttribution } from "@/lib/inquiry/attribution";

type WhatsAppButtonProps = {
  message?: string;
  className?: string;
  attribution?: InquiryAttribution;
};

export function WhatsAppButton({
  message,
  className,
  attribution,
}: WhatsAppButtonProps) {
  const resolvedAttribution = attribution ?? {
    sourcePage: "",
    contentType: "site",
    ctaPosition: "whatsapp_button",
  };

  return (
    <TrackedInquiryLink
      href={createWhatsAppUrl(message)}
      channel="whatsapp"
      attribution={resolvedAttribution}
      className={
        className ??
        "inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
      }
    >
      {brand.whatsapp.label}
    </TrackedInquiryLink>
  );
}
