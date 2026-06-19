import type { MetadataRoute } from "next";
import { buildSiteUrl, siteOrigin } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/wp-json/", "/wp-admin/"],
    },
    sitemap: buildSiteUrl("/sitemap.xml"),
    host: siteOrigin,
  };
}
