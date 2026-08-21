"use client";

import type { Locale } from "@/config/i18n";
import { getSocialLinks } from "@/config/social-links";
import {
  trackSocialContactClick,
  type SocialContactCtaPosition,
} from "@/lib/analytics/social-contact";

type SocialContactLinksProps = {
  locale: Locale;
  sourcePage: string;
  ctaPosition: SocialContactCtaPosition;
  variant: "footer" | "contact";
};

export function SocialContactLinks({
  locale,
  sourcePage,
  ctaPosition,
  variant,
}: SocialContactLinksProps) {
  const links = getSocialLinks();
  const isFooter = variant === "footer";

  return (
    <ul
      className={
        isFooter
          ? "mt-3 flex flex-wrap gap-x-5 gap-y-3"
          : "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      }
    >
      {links.map((link) => (
        <li key={link.platform} className="min-w-0">
          <a
            className={
              isFooter
                ? "inline-flex min-h-10 items-center font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
                : "flex min-h-12 items-center justify-between border border-line bg-background px-4 py-3 font-semibold text-foreground hover:border-brand hover:text-brand"
            }
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-social-platform={link.platform}
            data-social-cta-position={ctaPosition}
            onClick={() =>
              trackSocialContactClick({
                platform: link.platform,
                locale,
                sourcePage,
                ctaPosition,
              })
            }
          >
            <bdi dir="ltr">{link.label}</bdi>
            {isFooter ? null : <span aria-hidden="true">↗</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
