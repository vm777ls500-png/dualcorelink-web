import type { FaqModel } from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import {
  adaptContentIdentity,
  readAcfBoolean,
  readAcfNumber,
  readAcfString,
} from "./shared";

export function adaptFaq(post: WordPressPost): FaqModel {
  const fields = post.acf;
  return {
    ...adaptContentIdentity(post),
    title: post.title.rendered,
    question:
      readAcfString(fields, "faq_canonical_question") || post.title.rendered,
    shortAnswer: readAcfString(fields, "faq_short_answer"),
    detailedAnswer:
      readAcfString(fields, "faq_detailed_answer") || post.content.rendered,
    targetAudience:
      readAcfString(fields, "faq_target_audience") || undefined,
    searchIntent: readAcfString(fields, "faq_search_intent") || undefined,
    regionApplicability:
      readAcfString(fields, "faq_region_applicability") || undefined,
    displayOrder: readAcfNumber(fields, "faq_display_order") ?? 0,
    isFeatured: readAcfBoolean(fields, "faq_is_featured"),
    schemaEnabled: readAcfBoolean(fields, "faq_schema_enabled", true),
    citationAnswer:
      readAcfString(fields, "faq_geo_citation_answer") ||
      readAcfString(fields, "faq_short_answer"),
    keyFacts: readAcfString(fields, "faq_geo_key_facts") || undefined,
    limitations:
      readAcfString(fields, "faq_geo_limitations") || undefined,
  };
}
