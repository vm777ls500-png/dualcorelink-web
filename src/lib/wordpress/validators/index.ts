import { defaultLocale, getDirection, isLocale } from "@/config/i18n";
import type {
  WordPressMedia,
  WordPressPost,
  WordPressRestRoot,
} from "@/types/wordpress";
import { discardInternalFields } from "../internal-fields";
import { isRecord, readNumber, readRecord, readString } from "./primitives";

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string; field?: string };

function validateRendered(
  value: unknown,
  field: string,
): ValidationResult<{ rendered: string }> {
  if (!isRecord(value) || typeof value.rendered !== "string") {
    return {
      ok: false,
      message: `Expected ${field}.rendered to be a string.`,
      field,
    };
  }

  return { ok: true, value: { rendered: value.rendered } };
}

function readNumberArray(
  value: Record<string, unknown>,
  field: string,
): number[] {
  const item = value[field];

  if (!Array.isArray(item)) {
    return [];
  }

  return item.filter(
    (entry): entry is number => Number.isSafeInteger(entry) && entry > 0,
  );
}

export function validateRestRoot(
  value: unknown,
): ValidationResult<WordPressRestRoot> {
  if (!isRecord(value)) {
    return { ok: false, message: "Expected the REST root to be an object." };
  }

  if (
    typeof value.name !== "string" ||
    typeof value.url !== "string" ||
    !Array.isArray(value.namespaces)
  ) {
    return {
      ok: false,
      message: "REST root is missing name, url, or namespaces.",
    };
  }

  return {
    ok: true,
    value: {
      name: value.name,
      url: value.url,
      namespaces: value.namespaces.filter(
        (namespace): namespace is string => typeof namespace === "string",
      ),
    },
  };
}

export function validatePost(value: unknown): ValidationResult<WordPressPost> {
  if (!isRecord(value)) {
    return { ok: false, message: "Expected a WordPress post object." };
  }

  const id = readNumber(value, "id");
  const slug = readString(value, "slug");
  const type = readString(value, "type");
  const title = validateRendered(value.title, "title");
  const excerpt = validateRendered(value.excerpt, "excerpt");
  const content = validateRendered(value.content, "content");

  if (!id || !slug || !type) {
    return {
      ok: false,
      message: "Post is missing a valid id, slug, or type.",
    };
  }

  if (!title.ok) return title;
  if (!excerpt.ok) return excerpt;
  if (!content.ok) return content;

  const languageValue = readString(value, "language", defaultLocale);
  const language = isLocale(languageValue) ? languageValue : defaultLocale;
  const directionValue = readString(value, "direction");
  const translations = readRecord(value, "translations");
  const hreflang = readRecord(value, "hreflang");

  return {
    ok: true,
    value: {
      id,
      slug,
      type,
      status: readString(value, "status"),
      link: readString(value, "link"),
      title: title.value,
      excerpt: excerpt.value,
      content: content.value,
      featuredMedia: readNumber(value, "featured_media") || null,
      productCategories: readNumberArray(value, "product-category"),
      language,
      direction:
        directionValue === "rtl" || directionValue === "ltr"
          ? directionValue
          : getDirection(language),
      translations: Object.fromEntries(
        Object.entries(translations).filter(
          (entry): entry is [string, number] =>
            typeof entry[1] === "number" && entry[1] > 0,
        ),
      ),
      translationGroup: readString(value, "translation_group"),
      hreflang: Object.fromEntries(
        Object.entries(hreflang).filter(
          (entry): entry is [string, string] =>
            typeof entry[1] === "string",
        ),
      ),
      acf: discardInternalFields(readRecord(value, "acf")),
    },
  };
}

export function validatePostCollection(
  value: unknown,
): ValidationResult<WordPressPost[]> {
  if (!Array.isArray(value)) {
    return { ok: false, message: "Expected a WordPress post collection." };
  }

  const posts: WordPressPost[] = [];

  for (const item of value) {
    const result = validatePost(item);
    if (!result.ok) {
      return result;
    }
    posts.push(result.value);
  }

  return { ok: true, value: posts };
}

export function validateMedia(
  value: unknown,
): ValidationResult<WordPressMedia> {
  if (!isRecord(value)) {
    return { ok: false, message: "Expected a WordPress media object." };
  }

  const id = readNumber(value, "id");
  const sourceUrl = readString(value, "source_url");

  if (!id || !sourceUrl) {
    return {
      ok: false,
      message: "Media is missing a valid id or source_url.",
    };
  }

  const details = readRecord(value, "media_details");

  return {
    ok: true,
    value: {
      id,
      sourceUrl,
      altText: readString(value, "alt_text"),
      mediaType: readString(value, "media_type"),
      mimeType: readString(value, "mime_type"),
      width: readNumber(details, "width") || undefined,
      height: readNumber(details, "height") || undefined,
    },
  };
}
