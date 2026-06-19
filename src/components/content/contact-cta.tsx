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
    <aside className="border-y border-line bg-brand px-6 py-8 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 lg:flex-row lg:items-center">
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
            className="inline-flex min-h-11 shrink-0 items-center justify-center border border-white bg-white px-5 py-3 font-semibold text-brand"
          >
            {label || "Contact Sales"}
          </Link>
          <WhatsAppButton
            className="inline-flex min-h-11 shrink-0 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
            message="Hello DUALCORE LINK, I would like to get a quote."
          />
        </div>
      </div>
    </aside>
  );
}
