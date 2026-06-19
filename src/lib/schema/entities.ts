import { siteOrigin } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { JsonLdNode } from "./types";

export const organizationId = `${siteOrigin}/#organization`;
export const brandId = `${siteOrigin}/#brand`;
export const websiteId = `${siteOrigin}/#website`;

export function createGlobalEntities(): JsonLdNode[] {
  return [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: brand.legalEntity,
      url: siteOrigin,
      brand: { "@id": brandId },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${brand.whatsapp.international}`,
        email: brand.emails.sales,
        contactType: "sales",
      },
    },
    {
      "@type": "Brand",
      "@id": brandId,
      name: brand.name,
      url: siteOrigin,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteOrigin,
      name: brand.name,
      publisher: { "@id": organizationId },
    },
  ];
}
