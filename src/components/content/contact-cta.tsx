import Link from "next/link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import type { Locale } from "@/config/i18n";

type ContactCtaProps = {
  locale: Locale;
  label?: string;
};

export function ContactCta({
  locale,
  label = "Contact Sales",
}: ContactCtaProps) {
  return (
    <aside className="section-tech border-y border-brand/30 px-6 py-9 text-white sm:px-8">
      <div className="tech-grid absolute inset-0 opacity-35" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-white/70">
            B2B project support
          </p>
          <p className="mt-2 text-2xl font-semibold">
            Technical fit, OEM options, and supply planning.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact/#get-a-quote`}
            className="cta-button-light inline-flex min-h-11 shrink-0 items-center justify-center px-5 py-3 font-semibold"
          >
            {label || "Contact Sales"}
          </Link>
          <WhatsAppButton
            className="inline-flex min-h-11 shrink-0 items-center justify-center border border-white/55 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
            message="Hello DUALCORE LINK, I would like to get a quote."
          />
        </div>
      </div>
    </aside>
  );
}
