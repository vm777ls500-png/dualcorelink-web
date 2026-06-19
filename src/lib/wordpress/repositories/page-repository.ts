import type { Locale } from "@/config/i18n";
import type { PageModel } from "@/types/content";
import { adaptPage } from "../adapters";
import type { WordPressClient } from "../client";

export function createPageRepository(client: WordPressClient) {
  const pages = new Map<string, Promise<PageModel | null>>();

  return {
    getBySlug(locale: Locale, slug: string): Promise<PageModel | null> {
      const key = `${locale}:${slug}`;
      const existing = pages.get(key);
      if (existing) return existing;

      const request = client
        .listPosts("pages", { slug, perPage: 10 })
        .then(
          (posts) =>
            posts
              .filter((post) => post.language === locale)
              .map(adaptPage)[0] ?? null,
        );
      pages.set(key, request);
      return request;
    },
  };
}
