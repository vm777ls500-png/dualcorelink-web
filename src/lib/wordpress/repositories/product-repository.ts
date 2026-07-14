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
  const localePromises = new Map<
    Locale,
    Promise<ReturnType<typeof adaptProduct>[]>
  >();
  const listPromises = new Map<Locale, Promise<ProductListItem[]>>();
  const detailPromises = new Map<string, Promise<ProductDetailModel | null>>();

  function loadSource() {
    sourcePromise ??= client.listPosts("products");
    return sourcePromise;
  }

  function loadLocaleProducts(locale: Locale) {
    const existing = localePromises.get(locale);
    if (existing) return existing;

    const request = loadSource().then((posts) =>
      posts.filter((post) => post.language === locale).map(adaptProduct),
    );
    localePromises.set(locale, request);
    return request;
  }

  return {
    list(locale) {
      const existing = listPromises.get(locale);
      if (existing) return existing;

      const request = (async () => {
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
      })();
      listPromises.set(locale, request);
      return request;
    },

    getBySlug(locale, slug) {
      const key = `${locale}:${slug}`;
      const existing = detailPromises.get(key);
      if (existing) return existing;

      const request = (async () => {
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
      })();
      detailPromises.set(key, request);
      return request;
    },

    async getStaticParams(locale) {
      const products = await loadLocaleProducts(locale);
      return products.map(({ slug }) => ({ slug }));
    },
  };
}
