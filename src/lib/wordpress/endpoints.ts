export const wordpressEndpoints = {
  root: "",
  types: "wp/v2/types",
  media: "wp/v2/media",
  products: "wp/v2/products",
  solutions: "wp/v2/solutions",
  caseStudies: "wp/v2/case-studies",
  faqs: "wp/v2/faqs",
  resources: "wp/v2/resources",
  certifications: "wp/v2/certifications",
  partners: "wp/v2/partners",
  regions: "wp/v2/regions",
  downloads: "wp/v2/downloads",
  pages: "wp/v2/pages",
} as const;

export type WordPressEndpointName = keyof typeof wordpressEndpoints;

export const publicCollectionEndpoints = [
  "products",
  "solutions",
  "caseStudies",
  "faqs",
  "resources",
  "certifications",
  "partners",
  "regions",
  "downloads",
  "pages",
] as const satisfies readonly WordPressEndpointName[];

export type PublicCollectionEndpoint =
  (typeof publicCollectionEndpoints)[number];

export function isPublicCollectionEndpoint(
  value: string,
): value is PublicCollectionEndpoint {
  return publicCollectionEndpoints.includes(value as PublicCollectionEndpoint);
}
