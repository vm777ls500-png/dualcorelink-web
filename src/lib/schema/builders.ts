import type {
  ProductDetailModel,
  PublicMedia,
  SolutionDetailModel,
} from "@/types/content";
import type { DownloadAccessDecision } from "@/lib/downloads/access";
import { stripHtml } from "@/lib/text";
import { buildSiteUrl } from "@/lib/seo/site";
import {
  brandId,
  createGlobalEntities,
  organizationId,
  websiteId,
} from "./entities";
import type { JsonLdGraph, JsonLdNode } from "./types";

function compact<T extends Record<string, unknown>>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0),
    ),
  ) as T;
}

function publicUrl(value?: string): string | undefined {
  if (!value) return undefined;
  return value.startsWith("/") ? buildSiteUrl(value) : value;
}

export function createSchemaGraph(nodes: JsonLdNode[] = []): JsonLdGraph {
  const deduplicated = new Map<string, JsonLdNode>();
  const anonymous: JsonLdNode[] = [];

  for (const node of [...createGlobalEntities(), ...nodes]) {
    if (node["@id"]) deduplicated.set(node["@id"], node);
    else anonymous.push(node);
  }

  return {
    "@context": "https://schema.org",
    "@graph": [...deduplicated.values(), ...anonymous],
  };
}

export function createCollectionPageSchema(input: {
  id: string;
  url: string;
  name: string;
  description?: string;
}): JsonLdNode {
  return compact({
    "@type": "CollectionPage",
    "@id": input.id,
    url: input.url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": websiteId },
  });
}

export function createBreadcrumbSchema(
  id: string,
  items: Array<{ name: string; url: string }>,
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createProductSchema(
  product: ProductDetailModel,
  url: string,
  options?: {
    manufacturer?: { verified: true; name: string; id?: string };
  },
): JsonLdNode {
  const manufacturer = options?.manufacturer?.verified
    ? {
        "@type": "Organization",
        ...(options.manufacturer.id ? { "@id": options.manufacturer.id } : {}),
        name: options.manufacturer.name,
      }
    : undefined;

  return compact({
    "@type": product.schema.typeOverride || "Product",
    "@id": `${url}#product`,
    url,
    name: product.schema.nameOverride || stripHtml(product.title),
    description:
      product.schema.descriptionOverride ||
      stripHtml(product.shortDescription || product.excerpt),
    model: product.model || undefined,
    image: product.images
      .map((image) => publicUrl(image.sourceUrl))
      .filter(Boolean),
    brand: { "@id": brandId },
    category: product.categoryNames,
    manufacturer,
    mainEntityOfPage: url,
  });
}

export function createServiceSchema(
  solution: SolutionDetailModel,
  url: string,
): JsonLdNode {
  return compact({
    "@type": solution.schema.typeOverride || "Service",
    "@id": `${url}#service`,
    url,
    name: solution.schema.nameOverride || stripHtml(solution.title),
    description:
      solution.schema.descriptionOverride ||
      stripHtml(solution.summary || solution.excerpt),
    image: publicUrl(solution.heroImage?.sourceUrl),
    provider: { "@id": organizationId },
  });
}

export function createFaqPageSchema(
  id: string,
  url: string,
  questions: Array<{ question: string; answer: string }>,
): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": id,
    url,
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createArticleSchema(input: {
  id: string;
  url: string;
  headline: string;
  description?: string;
  image?: PublicMedia | null;
  datePublished?: string;
  dateModified?: string;
}): JsonLdNode {
  return compact({
    "@type": "Article",
    "@id": input.id,
    url: input.url,
    headline: input.headline,
    description: input.description,
    image: publicUrl(input.image?.sourceUrl),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
  });
}

export function createCreativeWorkSchema(input: {
  id: string;
  url: string;
  name: string;
  description?: string;
}): JsonLdNode {
  return compact({
    "@type": "CreativeWork",
    "@id": input.id,
    url: input.url,
    name: input.name,
    description: input.description,
    publisher: { "@id": organizationId },
  });
}

export function createDigitalDocumentSchema(input: {
  id: string;
  url: string;
  name: string;
  description?: string;
  access: DownloadAccessDecision;
  publicFileUrl?: string;
}): JsonLdNode {
  return compact({
    "@type": "DigitalDocument",
    "@id": input.id,
    url: input.url,
    name: input.name,
    description: input.description,
    contentUrl: input.access.exposeFile ? input.publicFileUrl : undefined,
    publisher: { "@id": organizationId },
  });
}

export function createPartnerSchema(input: {
  id: string;
  url: string;
  name: string;
  description?: string;
}): JsonLdNode {
  return compact({
    "@type": "Organization",
    "@id": input.id,
    url: input.url,
    name: input.name,
    description: input.description,
    parentOrganization: { "@id": organizationId },
  });
}
