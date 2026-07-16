import Image from "next/image";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { brand } from "@/config/brand";
import type { Locale } from "@/config/i18n";
import { buildQuoteHref } from "@/lib/inquiry/attribution";
import {
  roomDisplayGroups,
  roomDisplayProjectCopy,
  roomDisplayProjectReferences,
} from "@/config/static-room-display-projects";

type RoomDisplayProjectReferencesSectionProps = {
  locale: Locale;
};

export function RoomDisplayProjectReferencesSection({
  locale,
}: RoomDisplayProjectReferencesSectionProps) {
  const emailUrl = `mailto:${brand.emails.sales}?subject=${encodeURIComponent(
    "Hotel room signage customization",
  )}`;
  const baseAttribution = {
    sourcePage: `/${locale}/solutions/hotel-guest-room-control-solution/`,
    contentType: "solution" as const,
    contentSlug: "hotel-guest-room-control-solution",
    sourceTitle: "Hotel Guest Room Control Solution",
  };
  const quoteAttribution = {
    ...baseAttribution,
    ctaPosition: "room_display_references",
  };

  return (
    <section
      id={roomDisplayProjectCopy.moduleId}
      className="border-t border-line pt-10"
    >
      <header className="max-w-4xl">
        <p className="text-sm font-semibold uppercase text-brand">
          {roomDisplayProjectCopy.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-foreground">
          {roomDisplayProjectCopy.title}
        </h2>
        <p className="mt-3 text-lg leading-8 text-foreground">
          {roomDisplayProjectCopy.subtitle}
        </p>
        <p className="mt-3 leading-7 text-muted">
          {roomDisplayProjectCopy.intro}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {roomDisplayGroups.map((group) => {
          const references = roomDisplayProjectReferences.filter(
            (reference) => reference.group === group.title,
          );
          const headingId = `${group.id}-heading`;

          return (
            <section key={group.id} aria-labelledby={headingId}>
              <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                <h3
                  id={headingId}
                  className="text-xl font-semibold text-foreground"
                >
                  {group.title}
                </h3>
                <p className="shrink-0 text-sm text-muted">
                  {references.length} references
                </p>
              </div>

              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {references.map((reference) => (
                  <li
                    key={reference.id}
                    className="border border-line bg-surface"
                  >
                    <div className="relative aspect-video overflow-hidden border-b border-line bg-background">
                      <Image
                        src={reference.image}
                        alt={reference.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase text-brand">
                        {roomDisplayProjectCopy.cardLabel}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold leading-7 text-foreground">
                        {reference.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {reference.displayType}
                      </p>
                      <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">
                        {reference.visibleContext}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-10 border-y border-line bg-background px-5 py-6 sm:px-6">
        <p className="max-w-5xl text-sm leading-6 text-muted">
          {roomDisplayProjectCopy.disclaimer}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedInquiryLink
            href={buildQuoteHref(locale, quoteAttribution)}
            channel="form"
            attribution={quoteAttribution}
            className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          >
            {roomDisplayProjectCopy.primaryCta}
          </TrackedInquiryLink>
          <TrackedInquiryLink
            href={emailUrl}
            channel="email"
            attribution={{
              ...baseAttribution,
              ctaPosition: "room_display_email",
            }}
            className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
          >
            {roomDisplayProjectCopy.secondaryCta}
          </TrackedInquiryLink>
          <WhatsAppButton
            className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
            message="Hello DUALCORE LINK, I would like to discuss a hotel room signage configuration."
            attribution={{
              ...baseAttribution,
              ctaPosition: "room_display_whatsapp",
            }}
          />
        </div>
      </div>
    </section>
  );
}
