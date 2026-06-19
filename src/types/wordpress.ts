import type { Locale } from "@/config/i18n";

export type WordPressRendered = {
  rendered: string;
};

export type WordPressRestRoot = {
  name: string;
  url: string;
  namespaces: string[];
};

export type WordPressMedia = {
  id: number;
  sourceUrl: string;
  altText: string;
  mediaType: string;
  mimeType: string;
  width?: number;
  height?: number;
};

export type WordPressPost = {
  id: number;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
  featuredMedia: number | null;
  productCategories: number[];
  language: Locale;
  direction: "ltr" | "rtl";
  translations: Record<string, number>;
  translationGroup: string;
  hreflang: Record<string, string>;
  acf: Record<string, unknown>;
};

export type WordPressListQuery = {
  page?: number;
  perPage?: number;
  slug?: string;
  include?: number[];
  status?: "publish";
};
