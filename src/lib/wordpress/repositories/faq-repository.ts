import type { Locale } from "@/config/i18n";
import type { FaqModel } from "@/types/content";
import { adaptFaq } from "../adapters";
import type { WordPressClient } from "../client";

export function createFaqRepository(client: WordPressClient) {
  let source: ReturnType<WordPressClient["listPosts"]> | undefined;
  const load = () => (source ??= client.listPosts("faqs"));

  return {
    async list(locale: Locale): Promise<FaqModel[]> {
      return (await load())
        .filter((post) => post.language === locale)
        .map(adaptFaq)
        .sort(
          (a, b) =>
            Number(b.isFeatured) - Number(a.isFeatured) ||
            a.displayOrder - b.displayOrder ||
            a.question.localeCompare(b.question),
        );
    },
  };
}
