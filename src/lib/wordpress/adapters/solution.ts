import type { SolutionModel } from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import {
  normalizeMediaId,
  normalizeRelationshipIds,
} from "../relationships";
import {
  adaptContentIdentity,
  adaptSchemaModel,
  adaptSeoModel,
  readAcfString,
} from "./shared";

export function adaptSolution(post: WordPressPost): SolutionModel {
  if (post.type !== "solution") {
    throw new TypeError(`Expected solution, received ${post.type}.`);
  }

  const fields = post.acf;

  return {
    ...adaptContentIdentity(post),
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    summary: readAcfString(fields, "solution_summary"),
    customerChallenges: readAcfString(fields, "customer_challenges"),
    architecture: readAcfString(fields, "solution_architecture"),
    keyBenefitsText: readAcfString(fields, "key_benefits_text"),
    deploymentProcess: readAcfString(fields, "deployment_process"),
    supportedProtocolsSummary: readAcfString(
      fields,
      "supported_protocols_summary",
    ),
    integrationNotes: readAcfString(fields, "integration_notes"),
    compatibilityNotes: readAcfString(fields, "compatibility_notes"),
    knownLimitations: readAcfString(fields, "known_limitations"),
    typicalDeploymentTime:
      readAcfString(fields, "typical_deployment_time") || undefined,
    inquiryCtaLabel:
      readAcfString(fields, "solution_inquiry_cta_label") || undefined,
    heroImageId: normalizeMediaId(fields.solution_hero_image),
    relatedProductIds: normalizeRelationshipIds(fields.recommended_products),
    seo: adaptSeoModel(post, "solution"),
    schema: adaptSchemaModel(post, "solution"),
  };
}

export function adaptSolutions(posts: WordPressPost[]): SolutionModel[] {
  return posts.map(adaptSolution);
}
