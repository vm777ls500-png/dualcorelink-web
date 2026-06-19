import type { Locale } from "@/config/i18n";
import type {
  ProductDetailModel,
  ProductListItem,
} from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import { adaptProduct } from "../adapters";
import type { WordPressClient } from "../client";
import { resolveMediaIds } from "../media";
import { resolveRelatedContent } from "../related-content";

export type ProductRepository = {
  list(locale: Locale): Promise<ProductListItem[]>;
  getBySlug(locale: Locale, slug: string): Promise<ProductDetailModel | null>;
  getStaticParams(locale: Locale): Promise<{ slug: string }[]>;
};

export function createProductRepository(
  client: WordPressClient,
  mediaConcurrency = 4,
): ProductRepository {
  let sourcePromise: Promise<WordPressPost[]> | undefined;

  function loadSource() {
    sourcePromise ??= client.listPosts("products");
    return sourcePromise;
  }

  async function loadLocaleProducts(locale: Locale) {
    const posts = await loadSource();
    return posts.filter((post) => post.language === locale).map(adaptProduct);
  }

  return {
    async list(locale) {
      const products = await loadLocaleProducts(locale);
      const media = await resolveMediaIds(
        client,
        products.map((product) => product.imageIds[0]),
        mediaConcurrency,
      );

      return products.map((product) => ({
        ...product,
        primaryImage: product.imageIds[0]
          ? (media.get(product.imageIds[0]) ?? null)
          : null,
      }));
    },

    async getBySlug(locale, slug) {
      const products = await loadLocaleProducts(locale);
      const product = products.find((item) => item.slug === slug);

      if (!product) {
        return null;
      }

      const media = await resolveMediaIds(
        client,
        [
          ...product.imageIds,
          product.seo.openGraphImageId,
          product.seo.twitterImageId,
        ],
        mediaConcurrency,
      );
      const relatedProducts = await resolveRelatedContent(
        client,
        "products",
        product.relatedProductIds,
        locale,
      );
      const relatedSolutions = await resolveRelatedContent(
        client,
        "solutions",
        product.relatedSolutionIds,
        locale,
      );
      const relatedFaqs = await resolveRelatedContent(
        client,
        "faqs",
        product.relatedFaqIds,
        locale,
      );

      return {
        ...product,
        images: product.imageIds.flatMap((id) => {
          const item = media.get(id);
          return item ? [item] : [];
        }),
        seoOpenGraphImage: product.seo.openGraphImageId
          ? (media.get(product.seo.openGraphImageId) ?? null)
          : null,
        seoTwitterImage: product.seo.twitterImageId
          ? (media.get(product.seo.twitterImageId) ?? null)
          : null,
        relatedProducts,
        relatedSolutions,
        relatedFaqs,
      };
    },

    async getStaticParams(locale) {
      const products = await loadLocaleProducts(locale);
      return products.map(({ slug }) => ({ slug }));
    },
  };
}
