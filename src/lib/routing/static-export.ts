import type { Locale } from "@/config/i18n";

export const emptyStaticExportSlug = "__empty__";

export type LocalizedSlugParam = {
  locale: Locale;
  slug: string;
};

export function ensureStaticExportParams(
  paths: LocalizedSlugParam[],
): LocalizedSlugParam[] {
  return paths.length > 0
    ? paths
    : [{ locale: "en", slug: emptyStaticExportSlug }];
}
