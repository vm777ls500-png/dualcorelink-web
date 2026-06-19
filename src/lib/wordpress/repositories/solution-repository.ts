import type { Locale } from "@/config/i18n";
import type {
  SolutionDetailModel,
  SolutionListItem,
} from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import { adaptSolution } from "../adapters";
import type { WordPressClient } from "../client";
import { resolveMediaIds } from "../media";
import { resolveRelatedContent } from "../related-content";

export type SolutionRepository = {
  list(locale: Locale): Promise<SolutionListItem[]>;
  getBySlug(locale: Locale, slug: string): Promise<SolutionDetailModel | null>;
  getStaticParams(locale: Locale): Promise<{ slug: string }[]>;
};

export function createSolutionRepository(
  client: WordPressClient,
  mediaConcurrency = 4,
): SolutionRepository {
  let sourcePromise: Promise<WordPressPost[]> | undefined;

  function loadSource() {
    sourcePromise ??= client.listPosts("solutions");
    return sourcePromise;
  }

  async function loadLocaleSolutions(locale: Locale) {
    const posts = await loadSource();
    return posts.filter((post) => post.language === locale).map(adaptSolution);
  }

  return {
    async list(locale) {
      const solutions = await loadLocaleSolutions(locale);
      const media = await resolveMediaIds(
        client,
        solutions.map((solution) => solution.heroImageId),
        mediaConcurrency,
      );

      return solutions.map((solution) => ({
        ...solution,
        heroImage: solution.heroImageId
          ? (media.get(solution.heroImageId) ?? null)
          : null,
      }));
    },

    async getBySlug(locale, slug) {
      const solutions = await loadLocaleSolutions(locale);
      const solution = solutions.find((item) => item.slug === slug);

      if (!solution) {
        return null;
      }

      const media = await resolveMediaIds(
        client,
        [
          solution.heroImageId,
          solution.seo.openGraphImageId,
          solution.seo.twitterImageId,
        ],
        mediaConcurrency,
      );
      const relatedProducts = await resolveRelatedContent(
        client,
        "products",
        solution.relatedProductIds,
        locale,
      );

      return {
        ...solution,
        heroImage: solution.heroImageId
          ? (media.get(solution.heroImageId) ?? null)
          : null,
        seoOpenGraphImage: solution.seo.openGraphImageId
          ? (media.get(solution.seo.openGraphImageId) ?? null)
          : null,
        seoTwitterImage: solution.seo.twitterImageId
          ? (media.get(solution.seo.twitterImageId) ?? null)
          : null,
        relatedProducts,
      };
    },

    async getStaticParams(locale) {
      const solutions = await loadLocaleSolutions(locale);
      return solutions.map(({ slug }) => ({ slug }));
    },
  };
}
