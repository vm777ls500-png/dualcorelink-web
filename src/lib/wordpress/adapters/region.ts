import type { RegionModel } from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import { normalizeMediaId, normalizeRelationshipIds } from "../relationships";
import {
  adaptContentIdentity,
  adaptSchemaModel,
  adaptSeoModel,
  readAcfBoolean,
  readAcfString,
} from "./shared";

export function adaptRegion(
  post: WordPressPost,
): Omit<RegionModel, "heroImage"> {
  const fields = post.acf;
  const whatsappEnabled = readAcfBoolean(
    fields,
    "region_whatsapp_cta_enabled",
  );
  const whatsappNumber = readAcfString(fields, "region_whatsapp_number");

  return {
    ...adaptContentIdentity(post),
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    regionCode: readAcfString(fields, "region_code"),
    regionType: readAcfString(fields, "region_type"),
    marketMaturity:
      readAcfString(fields, "region_market_maturity") || undefined,
    heroImageId: normalizeMediaId(fields.region_hero_image),
    marketIntroduction: readAcfString(
      fields,
      "region_market_introduction",
    ),
    marketSummary: readAcfString(fields, "region_market_summary"),
    marketOpportunities: readAcfString(
      fields,
      "region_market_opportunities",
    ),
    marketChallenges: readAcfString(fields, "region_market_challenges"),
    hotelNeeds: readAcfString(fields, "region_hotel_needs"),
    apartmentNeeds: readAcfString(fields, "region_apartment_needs"),
    certificationOverview: readAcfString(
      fields,
      "region_certification_overview",
    ),
    certificationNotes:
      readAcfString(fields, "region_certification_notes") || undefined,
    standardsAuthority:
      readAcfString(fields, "region_standards_authority") || undefined,
    standardsAuthorityUrl:
      readAcfString(fields, "region_standards_authority_url") || undefined,
    recommendedProductIds: normalizeRelationshipIds(
      fields.region_recommended_products,
    ),
    recommendedSolutionIds: normalizeRelationshipIds(
      fields.region_recommended_solutions,
    ),
    faqIds: normalizeRelationshipIds(fields.region_faqs),
    whatsapp:
      whatsappEnabled && whatsappNumber
        ? {
            label:
              readAcfString(fields, "region_whatsapp_cta_label") ||
              "Talk to our regional team",
            number: whatsappNumber,
            message:
              readAcfString(fields, "region_whatsapp_message") || undefined,
          }
        : undefined,
    geoDirectAnswer: readAcfString(fields, "region_geo_direct_answer"),
    geoKeyFacts:
      readAcfString(fields, "region_geo_key_facts") || undefined,
    seo: adaptSeoModel(post, "region"),
    schema: adaptSchemaModel(post, "region"),
  };
}
