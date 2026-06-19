import type { ProductModel } from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import { productCategories } from "@/config/product-taxonomy";
import { normalizeRelationshipIds } from "../relationships";
import {
  adaptContentIdentity,
  adaptSchemaModel,
  adaptSeoModel,
  readAcfBoolean,
  readAcfNumber,
  readAcfString,
} from "./shared";

export function adaptProduct(post: WordPressPost): ProductModel {
  if (post.type !== "product") {
    throw new TypeError(`Expected product, received ${post.type}.`);
  }

  const fields = post.acf;
  const categoriesById = new Map(
    productCategories.flatMap((category) =>
      category.termId ? [[category.termId, category]] : [],
    ),
  );
  const productCategoryIds = post.productCategories ?? [];
  const productCategoryConfigs = productCategoryIds.flatMap((termId) => {
    const category = categoriesById.get(termId);
    return category ? [category] : [];
  });
  const imageIds = [
    fields.product_image_1,
    fields.product_image_2,
    fields.product_image_3,
    fields.product_image_4,
    fields.product_image_5,
  ].flatMap(normalizeRelationshipIds);
  const specificationFields = [
    ["Country of origin", "country_of_origin"],
    ["Wireless frequency", "wireless_frequency"],
    ["Input voltage", "input_voltage"],
    ["Rated power", "rated_power"],
    ["Operating temperature", "operating_temperature"],
    ["Dimensions", "product_dimensions"],
    ["Material", "product_material"],
    ["Color options", "color_options"],
    ["IP rating", "ip_rating"],
    ["Mobile app", "mobile_app"],
  ] as const;

  return {
    ...adaptContentIdentity(post),
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    model: readAcfString(fields, "product_model"),
    shortDescription: readAcfString(fields, "product_short_description"),
    chineseName: readAcfString(fields, "product_chinese_name") || undefined,
    coreFunctions: readAcfString(fields, "product_core_functions") || undefined,
    productFeatures: readAcfString(fields, "product_features") || undefined,
    applicationScenarios:
      readAcfString(fields, "product_application_scenarios") || undefined,
    installationPosition:
      readAcfString(fields, "product_installation_position") || undefined,
    customizationOptions:
      readAcfString(fields, "product_customization_options") || undefined,
    technicalSpecsText:
      readAcfString(fields, "product_technical_specs") || undefined,
    faqsText: readAcfString(fields, "product_faqs_text") || undefined,
    status: readAcfString(fields, "product_status") || undefined,
    categoryIds: productCategoryIds,
    categorySlugs: productCategoryConfigs.map((category) => category.slug),
    categoryNames: productCategoryConfigs.map((category) => category.title),
    isFeatured: readAcfBoolean(fields, "is_featured_product"),
    isNew: readAcfBoolean(fields, "is_new_product"),
    specifications: specificationFields.flatMap(([label, name]) => {
      const value = readAcfString(fields, name);
      return value ? [{ label, value }] : [];
    }),
    commerce: {
      minimumOrderQuantity: readAcfNumber(fields, "minimum_order_quantity"),
      moqUnit: readAcfString(fields, "moq_unit") || undefined,
      leadTime: readAcfString(fields, "lead_time") || undefined,
      warranty: readAcfString(fields, "warranty") || undefined,
      oemAvailable: readAcfBoolean(fields, "oem_available"),
      odmAvailable: readAcfBoolean(fields, "odm_available"),
      privateLabelAvailable: readAcfBoolean(
        fields,
        "private_label_available",
      ),
      sampleAvailable: readAcfBoolean(fields, "sample_available"),
      packagingOptions:
        readAcfString(fields, "packaging_options") || undefined,
    },
    inquiryCtaLabel:
      readAcfString(fields, "inquiry_cta_label") || undefined,
    imageIds: [...new Set(imageIds)],
    relatedProductIds: normalizeRelationshipIds(fields.related_products),
    relatedSolutionIds: normalizeRelationshipIds(fields.related_solutions),
    relatedFaqIds: normalizeRelationshipIds(fields.related_faqs),
    relatedDownloadIds: normalizeRelationshipIds(fields.related_downloads),
    relatedCertificationIds: normalizeRelationshipIds(
      fields.related_certifications,
    ),
    seo: adaptSeoModel(post, "product"),
    schema: adaptSchemaModel(post, "product"),
  };
}

export function adaptProducts(posts: WordPressPost[]): ProductModel[] {
  return posts.map(adaptProduct);
}
