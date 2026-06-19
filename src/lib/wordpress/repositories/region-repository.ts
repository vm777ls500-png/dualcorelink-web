import type { Locale } from "@/config/i18n";
import type { RegionModel } from "@/types/content";
import { adaptRegion } from "../adapters";
import type { WordPressClient } from "../client";
import { resolveMediaIds } from "../media";

export function createRegionRepository(
  client: WordPressClient,
  mediaConcurrency = 4,
) {
  let source: ReturnType<WordPressClient["listPosts"]> | undefined;
  const load = () => (source ??= client.listPosts("regions"));

  async function list(locale: Locale): Promise<RegionModel[]> {
    const regions = (await load())
      .filter((post) => post.language === locale)
      .map(adaptRegion);
    const media = await resolveMediaIds(
      client,
      regions.map((item) => item.heroImageId),
      mediaConcurrency,
    );

    return regions.map((item) => ({
      ...item,
      heroImage: item.heroImageId
        ? (media.get(item.heroImageId) ?? null)
        : null,
    }));
  }

  return {
    list,
    async getBySlug(locale: Locale, slug: string) {
      return (await list(locale)).find((item) => item.slug === slug) ?? null;
    },
    async getStaticParams(locale: Locale) {
      return (await list(locale)).map(({ slug }) => ({ slug }));
    },
  };
}
