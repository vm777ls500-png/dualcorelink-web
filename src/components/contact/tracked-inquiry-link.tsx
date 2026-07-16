"use client";

import type { ReactNode } from "react";
import type { InquiryAttribution } from "@/lib/inquiry/attribution";
import {
  trackInquiryEvent,
  type InquiryChannel,
} from "@/lib/inquiry/events";

type TrackedInquiryLinkProps = {
  href: string;
  channel: InquiryChannel;
  attribution: InquiryAttribution;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export function TrackedInquiryLink({
  href,
  channel,
  attribution,
  className,
  children,
  ariaLabel,
}: TrackedInquiryLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackInquiryEvent("cta_click", channel, attribution)}
    >
      {children}
    </a>
  );
}
