import type { Locale } from "@/config/i18n";

export const siteOrigin = "https://dualcorelink.com";
export const siteUrl = new URL(siteOrigin);

export function buildSiteUrl(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalized, siteUrl).toString();
}

export function buildLocalizedPath(
  locale: Locale,
  pathname = "",
): string {
  const suffix = pathname.replace(/^\/+|\/+$/g, "");
  return `/${locale}/${suffix ? `${suffix}/` : ""}`;
}

export function validateCanonical(
  candidate: string | undefined,
  fallbackPath: string,
): string {
  if (candidate) {
    try {
      const url = new URL(candidate);
      if (
        url.protocol === "https:" &&
        url.hostname === siteUrl.hostname &&
        url.port === "" &&
        url.username === "" &&
        url.password === ""
      ) {
        url.hash = "";
        url.search = "";
        return url.toString();
      }
    } catch {
      // Invalid CMS overrides use the route-derived canonical.
    }
  }

  return buildSiteUrl(fallbackPath);
}
