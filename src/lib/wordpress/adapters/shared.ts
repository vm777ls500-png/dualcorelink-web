import { isLocale, type Locale } from "@/config/i18n";
import type {
  ContentIdentity,
  SchemaModel,
  SeoModel,
} from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import { normalizeMediaId } from "../relationships";

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}

function readBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (value === 1 || value === "1") return true;
  if (value === 0 || value === "0") return false;
  return fallback;
}

function optionalNumber(value: unknown): number | undefined {
  const number =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(number) ? number : undefined;
}

function localeRecord<T>(
  value: Record<string, T>,
): Partial<Record<Locale, T>> {
  return Object.fromEntries(
    Object.entries(value).filter(([locale]) => isLocale(locale)),
  ) as Partial<Record<Locale, T>>;
}

export function adaptContentIdentity(post: WordPressPost): ContentIdentity {
  return {
    id: post.id,
    slug: post.slug,
    language: post.language,
    direction: post.direction,
    translations: localeRecord(post.translations),
    translationGroup: post.translationGroup,
    hreflang: localeRecord(post.hreflang),
  };
}

export function adaptSeoModel(
  post: WordPressPost,
  prefix: string,
): SeoModel {
  const fields = post.acf;
  const robotsIndex = optionalString(fields[`${prefix}_robots_index`]);
  const robotsFollow = optionalString(fields[`${prefix}_robots_follow`]);
  const twitterCard = optionalString(fields[`${prefix}_twitter_card_type`]);

  return {
    title: optionalString(fields[`${prefix}_seo_title`]),
    description: optionalString(fields[`${prefix}_meta_description`]),
    canonicalUrl: optionalString(fields[`${prefix}_canonical_url`]),
    robotsIndex:
      robotsIndex === "index" || robotsIndex === "noindex"
        ? robotsIndex
        : undefined,
    robotsFollow:
      robotsFollow === "follow" || robotsFollow === "nofollow"
        ? robotsFollow
        : undefined,
    openGraphTitle: optionalString(fields[`${prefix}_og_title`]),
    openGraphDescription: optionalString(fields[`${prefix}_og_description`]),
    openGraphImageId:
      normalizeMediaId(fields[`${prefix}_og_image`]) ?? undefined,
    twitterCard:
      twitterCard === "summary" || twitterCard === "summary_large_image"
        ? twitterCard
        : undefined,
    twitterTitle: optionalString(fields[`${prefix}_twitter_title`]),
    twitterDescription: optionalString(
      fields[`${prefix}_twitter_description`],
    ),
    twitterImageId:
      normalizeMediaId(fields[`${prefix}_twitter_image`]) ?? undefined,
    breadcrumbLabel: optionalString(fields[`${prefix}_breadcrumb_label`]),
    sitemapExclude: readBoolean(
      fields[`${prefix}_sitemap_exclude`],
      false,
    ),
    sitemapPriority: optionalNumber(fields[`${prefix}_sitemap_priority`]),
  };
}

export function adaptSchemaModel(
  post: WordPressPost,
  prefix: string,
): SchemaModel {
  const fields = post.acf;

  return {
    enabled: readBoolean(fields[`${prefix}_schema_enabled`], true),
    typeOverride: optionalString(fields[`${prefix}_schema_type_override`]),
    nameOverride: optionalString(fields[`${prefix}_schema_name_override`]),
    descriptionOverride: optionalString(
      fields[`${prefix}_schema_description_override`],
    ),
  };
}

export function readAcfString(
  fields: Record<string, unknown>,
  name: string,
): string {
  return typeof fields[name] === "string" ? fields[name] : "";
}

export function readAcfBoolean(
  fields: Record<string, unknown>,
  name: string,
  fallback = false,
): boolean {
  return readBoolean(fields[name], fallback);
}

export function readAcfNumber(
  fields: Record<string, unknown>,
  name: string,
): number | undefined {
  return optionalNumber(fields[name]);
}
