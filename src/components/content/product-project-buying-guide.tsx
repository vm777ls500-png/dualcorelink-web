import Link from "next/link";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import type { Locale } from "@/config/i18n";
import {
  getPriorityProductReinforcement,
  type ProductConversionProfile,
} from "@/config/product-conversion";
import { buildQuoteHref } from "@/lib/inquiry/attribution";

type ProductProjectBuyingGuideProps = {
  locale: Locale;
  productSlug: string;
  productTitle: string;
  profile: ProductConversionProfile;
};

export function ProductProjectBuyingGuide({
  locale,
  productSlug,
  productTitle,
  profile,
}: ProductProjectBuyingGuideProps) {
  const baseAttribution = {
    sourcePage: `/${locale}/products/${productSlug}/`,
    contentType: "product" as const,
    contentSlug: productSlug,
    sourceTitle: productTitle,
  };
  const guideAttribution = {
    ...baseAttribution,
    ctaPosition: "product_buying_guide",
  };
  const priorityReinforcement =
    getPriorityProductReinforcement(productSlug);

  return (
    <section
      id="project-buying-guide"
      className="product-project-guide border-t border-line pt-8"
    >
      <header className="max-w-4xl">
        <p className="text-sm font-semibold uppercase text-brand">
          B2B buying guidance
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Plan this product for a real project
        </h2>
        <p className="mt-4 leading-8 text-muted">{profile.summary}</p>
      </header>

      {priorityReinforcement ? (
        <div className="mt-7 border border-line bg-background p-6">
          <p className="text-sm font-semibold uppercase text-brand">
            Direct product answer
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">
            {priorityReinforcement.heading}
          </h3>
          <p className="mt-4 leading-8 text-muted">
            {priorityReinforcement.answer}
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <GuideList
              title="Project decision points"
              items={priorityReinforcement.decisionPoints}
            />
            <RelatedLinks
              locale={locale}
              title="Continue project planning"
              links={priorityReinforcement.links}
            />
          </div>
        </div>
      ) : null}

      <div className="product-project-guide-grid mt-7 grid gap-6 lg:grid-cols-3">
        <GuideList title="Typical project fit" items={profile.projectFit} />
        <GuideList title="Confirm before selection" items={profile.selectionChecks} />
        <GuideList title="Prepare for quotation" items={profile.quoteChecklist} />
      </div>

      <div className="product-project-guide-links mt-8 grid gap-7 border-t border-line pt-7 lg:grid-cols-2">
        <RelatedLinks
          locale={locale}
          title="Relevant solutions"
          links={profile.solutions}
        />
        <RelatedLinks
          locale={locale}
          title="Buyer guides"
          links={profile.resources}
        />
      </div>

      <div className="product-project-guide-cta mt-8 border-y border-line bg-background px-5 py-6 sm:px-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="font-semibold text-foreground">
              Request a model and project review
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Share quantity, project country, room type, technical requirements,
              documents, customization scope, and target delivery timing.
            </p>
          </div>
          <div className="product-project-guide-actions flex flex-wrap gap-3">
            <TrackedInquiryLink
              href={buildQuoteHref(locale, guideAttribution)}
              channel="form"
              attribution={guideAttribution}
              className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
            >
              Request Project Review
            </TrackedInquiryLink>
            <WhatsAppButton
              message={`${profile.whatsappPrompt} Product: ${productTitle}.`}
              attribution={{
                ...baseAttribution,
                ctaPosition: "product_buying_guide_whatsapp",
              }}
              className="inline-flex min-h-11 items-center justify-center border border-line bg-surface px-5 py-3 font-semibold text-brand"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="product-project-guide-column">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedLinks({
  locale,
  title,
  links,
}: {
  locale: Locale;
  title: string;
  links: ProductConversionProfile["solutions"];
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={`/${locale}${link.href}`}
            className="product-project-guide-link border-s-2 border-brand ps-4"
          >
            <span className="font-semibold text-brand">{link.title}</span>
            <span className="mt-1 block text-sm leading-6 text-muted">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
