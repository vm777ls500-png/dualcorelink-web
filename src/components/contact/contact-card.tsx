import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import type { InquiryAttribution } from "@/lib/inquiry/attribution";

type ContactCardProps = {
  label: string;
  value: string;
  href: string;
  description: string;
  highlight?: boolean;
  attribution: InquiryAttribution;
};

export function ContactCard({
  label,
  value,
  href,
  description,
  highlight = false,
  attribution,
}: ContactCardProps) {
  return (
    <TrackedInquiryLink
      href={href}
      channel="email"
      attribution={attribution}
      className={
        highlight
          ? "contact-method-card contact-method-card-highlight block border border-brand bg-brand p-6 text-white"
          : "contact-method-card block border border-line bg-surface p-6"
      }
    >
      <p
        className={
          highlight
            ? "text-sm font-semibold uppercase text-white/70"
            : "text-sm font-semibold uppercase text-brand"
        }
      >
        {label}
      </p>
      <p className="mt-3 break-all text-xl font-semibold">{value}</p>
      <p className={highlight ? "mt-3 leading-7 text-white/75" : "mt-3 leading-7 text-muted"}>
        {description}
      </p>
    </TrackedInquiryLink>
  );
}
