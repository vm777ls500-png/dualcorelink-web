import { locales, type Locale } from "@/config/i18n";

export const inquiryContentTypes = [
  "product",
  "resource",
  "solution",
  "region",
  "contact",
  "site",
] as const;

export type InquiryContentType = (typeof inquiryContentTypes)[number];

export type InquiryAttribution = {
  sourcePage: string;
  contentType: InquiryContentType;
  contentSlug?: string;
  sourceTitle?: string;
  ctaPosition: string;
};

const contentTypeSet = new Set<string>(inquiryContentTypes);
const localeSet = new Set<string>(locales);

export const inquiryAttributionStorageKey =
  "dualcorelink_inquiry_attribution_v1";
export const inquiryAttributionMaxAgeMs = 2 * 60 * 60 * 1000;

type InquiryAttributionStorage = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

type StoredInquiryAttribution = {
  version: 1;
  savedAt: number;
  attribution: InquiryAttribution;
};

function cleanValue(value: string | null | undefined, maxLength: number) {
  return (value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function buildQuoteHref(
  locale: Locale,
  attribution: InquiryAttribution,
) {
  void attribution;
  return `/${locale}/contact/#get-a-quote`;
}

function validSourcePage(value: string) {
  if (!value.startsWith("/") || value.includes("?") || value.includes("#")) {
    return false;
  }
  const segments = value.split("/").filter(Boolean);
  return (
    segments.length >= 1 &&
    localeSet.has(segments[0]) &&
    segments.every((segment) => /^[a-z0-9-]+$/.test(segment)) &&
    value.endsWith("/")
  );
}

function normalizeInquiryAttribution(
  input: {
    sourcePage?: string | null;
    contentType?: string | null;
    contentSlug?: string | null;
    sourceTitle?: string | null;
    ctaPosition?: string | null;
  },
): InquiryAttribution | undefined {
  const exceedsLimit = (
    value: string | null | undefined,
    maxLength: number,
  ) => (value?.length ?? 0) > maxLength;
  if (
    exceedsLimit(input.sourcePage, 240) ||
    exceedsLimit(input.contentType, 32) ||
    exceedsLimit(input.contentSlug, 120) ||
    exceedsLimit(input.sourceTitle, 160) ||
    exceedsLimit(input.ctaPosition, 80)
  ) {
    return undefined;
  }
  const sourcePage = cleanValue(input.sourcePage, 240);
  const contentType = cleanValue(input.contentType, 32);
  const contentSlug = cleanValue(input.contentSlug, 120);
  const sourceTitle = cleanValue(input.sourceTitle, 160);
  const ctaPosition = cleanValue(input.ctaPosition, 80);
  const requiresSlug = [
    "product",
    "resource",
    "solution",
    "region",
  ].includes(contentType);

  if (
    !validSourcePage(sourcePage) ||
    !contentTypeSet.has(contentType) ||
    (requiresSlug && !/^[a-z0-9-]+$/.test(contentSlug)) ||
    !/^[a-z0-9][a-z0-9_-]*$/.test(ctaPosition)
  ) {
    return undefined;
  }

  return {
    sourcePage,
    contentType: contentType as InquiryContentType,
    contentSlug: contentSlug || undefined,
    sourceTitle: sourceTitle || undefined,
    ctaPosition,
  };
}

export function parseLegacyInquiryAttribution(
  search: string,
): InquiryAttribution | undefined {
  if (!search) return undefined;
  const params = new URLSearchParams(search);
  return normalizeInquiryAttribution({
    sourcePage: params.get("source_page"),
    contentType: params.get("content_type"),
    contentSlug: params.get("content_slug"),
    sourceTitle: params.get("source_title"),
    ctaPosition: params.get("cta_position"),
  });
}

export function parseInquiryAttribution(
  search: string,
  fallbackSourcePage = "/en/contact/",
): InquiryAttribution {
  return (
    parseLegacyInquiryAttribution(search) ?? {
      sourcePage: validSourcePage(fallbackSourcePage)
        ? fallbackSourcePage
        : "/en/contact/",
      contentType: "contact",
      contentSlug: undefined,
      sourceTitle: undefined,
      ctaPosition: "contact_page",
    }
  );
}

export function writeInquiryAttribution(
  storage: InquiryAttributionStorage,
  attribution: InquiryAttribution,
  savedAt = Date.now(),
) {
  const normalized = normalizeInquiryAttribution(attribution);
  if (!normalized || !Number.isFinite(savedAt)) return false;
  const record: StoredInquiryAttribution = {
    version: 1,
    savedAt,
    attribution: normalized,
  };
  storage.setItem(inquiryAttributionStorageKey, JSON.stringify(record));
  return true;
}

export function readInquiryAttribution(
  storage: InquiryAttributionStorage,
  now = Date.now(),
): InquiryAttribution | undefined {
  const raw = storage.getItem(inquiryAttributionStorageKey);
  if (!raw) return undefined;

  try {
    const record = JSON.parse(raw) as Partial<StoredInquiryAttribution>;
    const savedAt = Number(record.savedAt);
    const expired =
      !Number.isFinite(savedAt) ||
      savedAt > now + 60_000 ||
      now - savedAt > inquiryAttributionMaxAgeMs;
    const attribution = normalizeInquiryAttribution(record.attribution ?? {});
    if (record.version !== 1 || expired || !attribution) {
      storage.removeItem(inquiryAttributionStorageKey);
      return undefined;
    }
    return attribution;
  } catch {
    storage.removeItem(inquiryAttributionStorageKey);
    return undefined;
  }
}

export function writeInquiryAttributionToSession(
  attribution: InquiryAttribution,
) {
  if (typeof window === "undefined") return false;
  try {
    return writeInquiryAttribution(window.sessionStorage, attribution);
  } catch {
    return false;
  }
}

export function readInquiryAttributionFromSession() {
  if (typeof window === "undefined") return undefined;
  try {
    return readInquiryAttribution(window.sessionStorage);
  } catch {
    return undefined;
  }
}

export function cleanContactHistoryUrl(pathname: string, hash: string) {
  const cleanPath = validSourcePage(pathname) ? pathname : "/en/contact/";
  return `${cleanPath}${hash.startsWith("#") ? hash : ""}`;
}
