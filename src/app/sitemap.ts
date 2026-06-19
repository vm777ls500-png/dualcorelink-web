import type { MetadataRoute } from "next";
import { buildLocalizedPath, buildSiteUrl } from "@/lib/seo";
import {
  productRepository,
  solutionRepository,
} from "@/lib/wordpress/repositories";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = "en";
  const staticRoutes = [
    "",
    "products",
    "product-series",
    "solutions",
    "application-scenarios",
    "faqs",
    "contact",
  ].map((pathname) => ({
    url: buildSiteUrl(buildLocalizedPath(locale, pathname)),
    changeFrequency: pathname ? ("weekly" as const) : ("daily" as const),
    priority: pathname ? 0.8 : 1,
  }));

  const [products, solutions] = await Promise.all([
    productRepository.list(locale),
    solutionRepository.list(locale),
  ]);

  const contentRoutes = [
    ...products
      .filter((item) => !item.seo.sitemapExclude)
      .map((item) => ({
        url: buildSiteUrl(buildLocalizedPath(locale, `products/${item.slug}`)),
        changeFrequency: "weekly" as const,
        priority: item.seo.sitemapPriority ?? 0.7,
      })),
    ...solutions
      .filter((item) => !item.seo.sitemapExclude)
      .map((item) => ({
        url: buildSiteUrl(buildLocalizedPath(locale, `solutions/${item.slug}`)),
        changeFrequency: "weekly" as const,
        priority: item.seo.sitemapPriority ?? 0.7,
      })),
  ];

  return [...staticRoutes, ...contentRoutes];
}
