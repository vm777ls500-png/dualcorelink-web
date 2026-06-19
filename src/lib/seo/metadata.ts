import type { Metadata } from "next";
import type { Locale } from "@/config/i18n";
import type { PublicMedia, SeoModel } from "@/types/content";
import { stripHtml } from "@/lib/text";
import type { HreflangMap } from "./hreflang";
import { buildSiteUrl, siteUrl, validateCanonical } from "./site";

const defaultSocialImage: PublicMedia = {
  id: 0,
  sourceUrl:
    "/media/wordpress/2026/06/86-type-ai-smart-control-display-1-scaled.png",
  altText: "86-type AI smart control display for smart hotel automation",
};

export type SeoDocumentInput = {
  locale: Locale;
  path: string;
  title: string;
  description?: string;
  seo?: SeoModel;
  hreflang?: HreflangMap;
  openGraphImage?: PublicMedia | null;
  twitterImage?: PublicMedia | null;
};

function resolvePublicMediaUrl(image: PublicMedia): string {
  return image.sourceUrl.startsWith("/")
    ? buildSiteUrl(image.sourceUrl)
    : image.sourceUrl;
}

export function createMetadata(input: SeoDocumentInput): Metadata {
  const title = stripHtml(input.seo?.title || input.title);
  const description = stripHtml(
    input.seo?.description || input.description || "",
  );
  const canonical = validateCanonical(input.seo?.canonicalUrl, input.path);
  const openGraphTitle = stripHtml(input.seo?.openGraphTitle || title);
  const openGraphDescription = stripHtml(
    input.seo?.openGraphDescription || description,
  );
  const twitterTitle = stripHtml(input.seo?.twitterTitle || openGraphTitle);
  const twitterDescription = stripHtml(
    input.seo?.twitterDescription || openGraphDescription,
  );
  const openGraphImage = input.openGraphImage ?? defaultSocialImage;
  const twitterImage = input.twitterImage ?? input.openGraphImage ?? defaultSocialImage;

  return {
    metadataBase: siteUrl,
    title,
    description: description || undefined,
    alternates: {
      canonical,
      languages: input.hreflang,
    },
    robots: {
      index: input.seo?.robotsIndex !== "noindex",
      follow: input.seo?.robotsFollow !== "nofollow",
    },
    openGraph: {
      type: "website",
      locale: input.locale,
      url: canonical,
      siteName: "DUALCORE LINK",
      title: openGraphTitle,
      description: openGraphDescription || undefined,
      images: [
        {
          url: resolvePublicMediaUrl(openGraphImage),
          alt: openGraphImage.altText,
        },
      ],
    },
    twitter: {
      card: input.seo?.twitterCard ?? "summary_large_image",
      title: twitterTitle,
      description: twitterDescription || undefined,
      images: [resolvePublicMediaUrl(twitterImage)],
    },
  };
}
