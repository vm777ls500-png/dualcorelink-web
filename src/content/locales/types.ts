import type {
  MultilingualLocale,
  PublicationStatus,
} from "@/lib/multilingual-publication-manifest";

export type LocalizedFilePageType =
  | "product-listing"
  | "solution-listing"
  | "resource-listing"
  | "resource"
  | "region-listing"
  | "region"
  | "static";

export type LocalizedContentSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type LocalizedFaqItem = {
  question: string;
  answer: string;
};

export type LocalizedContentLink = {
  label: string;
  description: string;
  href: string;
};

export type LocalizedContentCta = {
  heading: string;
  description: string;
  label: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type LocalizedStructuredContent = {
  h1: string;
  eyebrow: string;
  introduction: string;
  breadcrumbLabel: string;
  parentBreadcrumb?: {
    label: string;
    href: string;
  };
  sections: readonly LocalizedContentSection[];
  faqs: readonly LocalizedFaqItem[];
  relatedLinks: readonly LocalizedContentLink[];
  cta: LocalizedContentCta;
  imageAlt?: string;
};

export type LocalizedFileContent = {
  locale: MultilingualLocale;
  pageType: LocalizedFilePageType;
  slug: string;
  title: string;
  body: string;
  seoTitle: string;
  metaDescription: string;
  sourceEnglishContentHash: string;
  localizedContentHash: string;
  translationStatus: PublicationStatus;
  reviewStatus: PublicationStatus;
  structuredContent: LocalizedStructuredContent;
};

export type LocaleContentRegistry = {
  resources: readonly LocalizedFileContent[];
  regions: readonly LocalizedFileContent[];
  staticPages: readonly LocalizedFileContent[];
};

export function validateLocalizedStructuredContent(
  content: LocalizedStructuredContent | undefined,
): string[] {
  if (!content) return ["structured content is required"];
  const errors: string[] = [];
  const requiredText = [
    ["h1", content.h1],
    ["eyebrow", content.eyebrow],
    ["introduction", content.introduction],
    ["breadcrumbLabel", content.breadcrumbLabel],
    ["cta.heading", content.cta?.heading],
    ["cta.description", content.cta?.description],
    ["cta.label", content.cta?.label],
    ["cta.href", content.cta?.href],
  ] as const;
  for (const [field, value] of requiredText) {
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${field} is required`);
    }
  }
  if (!Array.isArray(content.sections) || content.sections.length < 3) {
    errors.push("at least three complete content sections are required");
  } else {
    content.sections.forEach((section, index) => {
      if (!section.heading.trim()) errors.push(`section ${index + 1} heading is required`);
      if (
        !Array.isArray(section.paragraphs) ||
        section.paragraphs.length === 0 ||
        section.paragraphs.some((paragraph: string) => !paragraph.trim())
      ) {
        errors.push(`section ${index + 1} requires non-empty paragraphs`);
      }
    });
  }
  if (
    !Array.isArray(content.faqs) ||
    content.faqs.length === 0 ||
    content.faqs.some(
      (faq) => !faq.question.trim() || !faq.answer.trim(),
    )
  ) {
    errors.push("at least one complete FAQ is required");
  }
  if (
    !Array.isArray(content.relatedLinks) ||
    content.relatedLinks.length === 0 ||
    content.relatedLinks.some(
      (link) =>
        !link.label.trim() ||
        !link.description.trim() ||
        !link.href.trim(),
    )
  ) {
    errors.push("at least one complete related link is required");
  }
  return errors;
}

export function defineLocaleContent(
  locale: MultilingualLocale,
  registry: LocaleContentRegistry,
): LocaleContentRegistry {
  for (const entry of [
    ...registry.resources,
    ...registry.regions,
    ...registry.staticPages,
  ]) {
    if (entry.locale !== locale) {
      throw new Error(
        `Locale content mismatch: expected ${locale}, received ${entry.locale}`,
      );
    }
  }
  return registry;
}

function contentFingerprint(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function defineLocalizedFileContent(
  input: Omit<
    LocalizedFileContent,
    "body" | "sourceEnglishContentHash" | "localizedContentHash"
  > & { sourceUrl: string },
): LocalizedFileContent {
  const body = [
    input.structuredContent.introduction,
    ...input.structuredContent.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...input.structuredContent.faqs.flatMap((faq) => [
      faq.question,
      faq.answer,
    ]),
  ].join("\n");

  return {
    locale: input.locale,
    pageType: input.pageType,
    slug: input.slug,
    title: input.title,
    body,
    seoTitle: input.seoTitle,
    metaDescription: input.metaDescription,
    sourceEnglishContentHash: contentFingerprint(input.sourceUrl),
    localizedContentHash: contentFingerprint(
      JSON.stringify(input.structuredContent),
    ),
    translationStatus: input.translationStatus,
    reviewStatus: input.reviewStatus,
    structuredContent: input.structuredContent,
  };
}
