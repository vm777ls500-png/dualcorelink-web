import { brand } from "@/config/brand";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-foreground text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 text-sm sm:grid-cols-4 sm:px-8 lg:px-12">
        <div>
          <p className="font-semibold">{brand.name}</p>
          <p className="mt-2 text-white/70">{brand.legalEntity}</p>
          <a className="mt-3 block text-white/70" href={`mailto:${brand.emails.general}`}>
            {brand.emails.general}
          </a>
        </div>
        <div>
          <p className="font-semibold">Product Navigation</p>
          <Link className="mt-2 block text-white/70" href="/en/products/">
            Product Center
          </Link>
          <Link className="mt-2 block text-white/70" href="/en/product-series/">
            Product Series
          </Link>
          <Link className="mt-2 block text-white/70" href="/en/solutions/">
            Solutions
          </Link>
          <Link
            className="mt-2 block text-white/70"
            href="/en/application-scenarios/"
          >
            Applications
          </Link>
        </div>
        <div>
          <p className="font-semibold">Get a Quote</p>
          <a className="mt-2 block text-white/70" href={`mailto:${brand.emails.sales}`}>
            {brand.emails.sales}
          </a>
          <p className="mt-2 text-white/60">{brand.emailPurposes.sales}</p>
        </div>
        <div>
          <p className="font-semibold">WhatsApp</p>
          <a
            className="mt-2 block text-white/70"
            href={`https://wa.me/${brand.whatsapp.international}`}
          >
            WhatsApp: {brand.whatsapp.display}
          </a>
          <a
            className="mt-3 inline-flex min-h-10 items-center border border-white/50 px-4 py-2 font-semibold text-white"
            href={`https://wa.me/${brand.whatsapp.international}`}
          >
            {brand.whatsapp.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
