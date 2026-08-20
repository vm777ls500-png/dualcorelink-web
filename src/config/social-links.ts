import { createWhatsAppUrl } from "@/config/brand";
import type { Locale } from "@/config/i18n";

export const socialPlatforms = [
  "facebook",
  "telegram_chat",
  "telegram_updates",
  "whatsapp",
] as const;

export type SocialPlatform = (typeof socialPlatforms)[number];

export type SocialLink = {
  platform: SocialPlatform;
  label: "Facebook" | "Telegram Chat" | "Telegram Updates" | "WhatsApp";
  href: string;
};

export const socialContactCopy: Record<
  Locale,
  { footerTitle: string; title: string; description: string }
> = {
  en: {
    footerTitle: "Social & Contact",
    title: "Connect with DualCoreLink",
    description:
      "Follow our updates or contact our B2B team through the channel that suits you.",
  },
  zh: {
    footerTitle: "社交与联系",
    title: "联系 DualCoreLink",
    description: "关注最新动态，或通过适合您的渠道联系 B2B 团队。",
  },
  de: {
    footerTitle: "Social & Kontakt",
    title: "DualCoreLink kontaktieren",
    description:
      "Folgen Sie unseren Updates oder kontaktieren Sie unser B2B-Team über den passenden Kanal.",
  },
  es: {
    footerTitle: "Redes y contacto",
    title: "Conecta con DualCoreLink",
    description:
      "Sigue nuestras novedades o contacta con el equipo B2B por el canal que prefieras.",
  },
  ar: {
    footerTitle: "التواصل والقنوات",
    title: "تواصل مع DualCoreLink",
    description:
      "تابع تحديثاتنا أو تواصل مع فريق B2B عبر القناة المناسبة لك.",
  },
  vi: {
    footerTitle: "Kênh liên hệ",
    title: "Kết nối với DualCoreLink",
    description:
      "Theo dõi cập nhật hoặc liên hệ đội ngũ B2B qua kênh phù hợp với bạn.",
  },
  fa: {
    footerTitle: "شبکه‌های اجتماعی و تماس",
    title: "ارتباط با DualCoreLink",
    description:
      "به‌روزرسانی‌ها را دنبال کنید یا از کانال مناسب با تیم B2B تماس بگیرید.",
  },
};

export function getSocialLinks(): readonly SocialLink[] {
  return [
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/dualcorelink/",
    },
    {
      platform: "telegram_chat",
      label: "Telegram Chat",
      href: "https://t.me/dualcorelink",
    },
    {
      platform: "telegram_updates",
      label: "Telegram Updates",
      href: "https://t.me/dualcorelinknews",
    },
    {
      platform: "whatsapp",
      label: "WhatsApp",
      href: createWhatsAppUrl(),
    },
  ];
}
