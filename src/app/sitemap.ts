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
    "about",
    "products",
    "product-series",
    "solutions",
    "application-scenarios",
    "faqs",
    "case-studies",
    "downloads",
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
    ...[
      "middle-east-smart-hotel-guest-room-control-project",
      "southeast-asia-serviced-apartment-residential-automation-project",
      "overseas-oem-odm-smart-panel-customization-project",
    ].map((slug) => ({
      url: buildSiteUrl(buildLocalizedPath(locale, `case-studies/${slug}`)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...contentRoutes];
}
