"use client";

import type { MouseEventHandler, ReactNode } from "react";
import {
  writeInquiryAttributionToSession,
  type InquiryAttribution,
} from "@/lib/inquiry/attribution";
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
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function TrackedInquiryLink({
  href,
  channel,
  attribution,
  className,
  children,
  ariaLabel,
  onClick,
}: TrackedInquiryLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        if (channel === "form") {
          writeInquiryAttributionToSession(attribution);
        }
        trackInquiryEvent("cta_click", channel, attribution);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
