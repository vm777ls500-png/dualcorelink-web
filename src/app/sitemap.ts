import type { MetadataRoute } from "next";
import { regionLandingPages } from "@/config/region-landing-pages";
import { resources } from "@/config/resources";
import { buildLocalizedPath, buildSiteUrl } from "@/lib/seo";
import {
  productRepository,
  solutionRepository,
} from "@/lib/wordpress/repositories";
import { multilingualPublicationManifest } from "@/lib/multilingual-publication-manifest";
import { getSitemapEligibleEntries } from "@/lib/multilingual-publication-control";
import { getPublicationHreflang } from "@/lib/localized-publication";

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
    "resources",
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
    ...regionLandingPages.map((region) => ({
      url: buildSiteUrl(buildLocalizedPath(locale, `regions/${region.slug}`)),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...resources.map((resource) => ({
      url: buildSiteUrl(buildLocalizedPath(locale, `resources/${resource.slug}`)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const localizedRoutes = getSitemapEligibleEntries(
    multilingualPublicationManifest,
  ).map((entry) => {
    const pathname = new URL(entry.localizedUrl).pathname;
    const contentPath = pathname
      .replace(new RegExp(`^/${entry.locale}/|/$`, "g"), "");
    return {
      url: entry.localizedUrl,
      changeFrequency: "monthly" as const,
      priority: entry.priority === "P0" ? 0.8 : 0.7,
      alternates: {
        languages: getPublicationHreflang(contentPath),
      },
    };
  });

  return [...staticRoutes, ...contentRoutes, ...localizedRoutes];
}
