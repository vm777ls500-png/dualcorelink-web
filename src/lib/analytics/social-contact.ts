import type { Locale } from "@/config/i18n";
import type { SocialPlatform } from "@/config/social-links";
import { sendConsentSafeGa4Event } from "@/lib/analytics/ga4";

export type SocialContactCtaPosition =
  | "footer_social"
  | "contact_social";

export type SocialContactEvent = {
  event: "social_contact_click";
  platform: SocialPlatform;
  locale: Locale;
  source_page: string;
  cta_position: SocialContactCtaPosition;
};

export function createSocialContactEvent(input: {
  platform: SocialPlatform;
  locale: Locale;
  sourcePage: string;
  ctaPosition: SocialContactCtaPosition;
}): SocialContactEvent {
  return {
    event: "social_contact_click",
    platform: input.platform,
    locale: input.locale,
    source_page: input.sourcePage,
    cta_position: input.ctaPosition,
  };
}

export function trackSocialContactClick(
  input: Parameters<typeof createSocialContactEvent>[0],
) {
  const { event, ...params } = createSocialContactEvent(input);
  return sendConsentSafeGa4Event(event, params);
}
