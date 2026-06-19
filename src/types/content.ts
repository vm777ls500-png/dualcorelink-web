import type { Locale } from "@/config/i18n";

export type ContentIdentity = {
  id: number;
  slug: string;
  language: Locale;
  direction: "ltr" | "rtl";
  translations: Partial<Record<Locale, number>>;
  translationGroup: string;
  hreflang: Partial<Record<Locale, string>>;
};

export type PublicMedia = {
  id: number;
  sourceUrl: string;
  altText: string;
  width?: number;
  height?: number;
};

export type SeoModel = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robotsIndex?: "index" | "noindex";
  robotsFollow?: "follow" | "nofollow";
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImageId?: number;
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageId?: number;
  breadcrumbLabel?: string;
  sitemapExclude: boolean;
  sitemapPriority?: number;
};

export type SchemaModel = {
  enabled: boolean;
  typeOverride?: string;
  nameOverride?: string;
  descriptionOverride?: string;
};

export type ProductModel = ContentIdentity & {
  title: string;
  excerpt: string;
  content: string;
  model: string;
  shortDescription: string;
  chineseName?: string;
  coreFunctions?: string;
  productFeatures?: string;
  applicationScenarios?: string;
  installationPosition?: string;
  customizationOptions?: string;
  technicalSpecsText?: string;
  faqsText?: string;
  status?: string;
  categoryIds: number[];
  categorySlugs: string[];
  categoryNames: string[];
  isFeatured: boolean;
  isNew: boolean;
  specifications: Array<{ label: string; value: string }>;
  commerce: {
    minimumOrderQuantity?: number;
    moqUnit?: string;
    leadTime?: string;
    warranty?: string;
    oemAvailable: boolean;
    odmAvailable: boolean;
    privateLabelAvailable: boolean;
    sampleAvailable: boolean;
    packagingOptions?: string;
  };
  inquiryCtaLabel?: string;
  imageIds: number[];
  relatedProductIds: number[];
  relatedSolutionIds: number[];
  relatedFaqIds: number[];
  relatedDownloadIds: number[];
  relatedCertificationIds: number[];
  seo: SeoModel;
  schema: SchemaModel;
};

export type SolutionModel = ContentIdentity & {
  title: string;
  excerpt: string;
  content: string;
  summary: string;
  customerChallenges: string;
  architecture: string;
  keyBenefitsText: string;
  deploymentProcess: string;
  supportedProtocolsSummary: string;
  integrationNotes: string;
  compatibilityNotes: string;
  knownLimitations: string;
  typicalDeploymentTime?: string;
  inquiryCtaLabel?: string;
  heroImageId: number | null;
  relatedProductIds: number[];
  seo: SeoModel;
  schema: SchemaModel;
};

export type RelatedContentModel = ContentIdentity & {
  title: string;
  excerpt: string;
};

export type ProductListItem = ProductModel & {
  primaryImage: PublicMedia | null;
};

export type ProductDetailModel = ProductModel & {
  images: PublicMedia[];
  seoOpenGraphImage: PublicMedia | null;
  seoTwitterImage: PublicMedia | null;
  relatedProducts: RelatedContentModel[];
  relatedSolutions: RelatedContentModel[];
  relatedFaqs: RelatedContentModel[];
};

export type SolutionListItem = SolutionModel & {
  heroImage: PublicMedia | null;
};

export type SolutionDetailModel = SolutionModel & {
  heroImage: PublicMedia | null;
  seoOpenGraphImage: PublicMedia | null;
  seoTwitterImage: PublicMedia | null;
  relatedProducts: RelatedContentModel[];
};

export type FaqModel = ContentIdentity & {
  title: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  targetAudience?: string;
  searchIntent?: string;
  regionApplicability?: string;
  displayOrder: number;
  isFeatured: boolean;
  schemaEnabled: boolean;
  citationAnswer: string;
  keyFacts?: string;
  limitations?: string;
};

export type DownloadModel = ContentIdentity & {
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  fileVersion?: string;
  fileLanguage: string;
  fileSizeLabel?: string;
  releaseDate?: string;
  coverImageId: number | null;
  coverImage: PublicMedia | null;
  access: {
    isPublic: boolean;
    leadCaptureRequired: boolean;
    directEnabled: boolean;
    exposeFile: boolean;
    reason: string;
  };
  publicFileUrl?: string;
  relatedProductIds: number[];
  seo: SeoModel;
  schema: SchemaModel;
};

export type RegionModel = ContentIdentity & {
  title: string;
  excerpt: string;
  regionCode: string;
  regionType: string;
  marketMaturity?: string;
  heroImageId: number | null;
  heroImage: PublicMedia | null;
  marketIntroduction: string;
  marketSummary: string;
  marketOpportunities: string;
  marketChallenges: string;
  hotelNeeds: string;
  apartmentNeeds: string;
  certificationOverview: string;
  certificationNotes?: string;
  standardsAuthority?: string;
  standardsAuthorityUrl?: string;
  recommendedProductIds: number[];
  recommendedSolutionIds: number[];
  faqIds: number[];
  whatsapp?: {
    label: string;
    number: string;
    message?: string;
  };
  geoDirectAnswer: string;
  geoKeyFacts?: string;
  seo: SeoModel;
  schema: SchemaModel;
};

export type PageModel = ContentIdentity & {
  title: string;
  excerpt: string;
  content: string;
  seo: SeoModel;
  schema: SchemaModel;
};
