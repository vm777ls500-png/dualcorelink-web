import type { Locale } from "@/config/i18n";
import type { DownloadModel } from "@/types/content";
import { adaptDownload } from "../adapters";
import type { WordPressClient } from "../client";
import { resolveMediaIds } from "../media";

export function createDownloadRepository(
  client: WordPressClient,
  mediaConcurrency = 4,
) {
  let source: ReturnType<WordPressClient["listPosts"]> | undefined;
  const load = () => (source ??= client.listPosts("downloads"));

  return {
    async list(locale: Locale): Promise<DownloadModel[]> {
      const downloads = (await load())
        .filter((post) => post.language === locale)
        .map(adaptDownload);
      const media = await resolveMediaIds(
        client,
        downloads.flatMap((item) => [item.coverImageId, item.fileId]),
        mediaConcurrency,
      );

      return downloads.map(({ fileId, ...item }) => ({
        ...item,
        coverImage: item.coverImageId
          ? (media.get(item.coverImageId) ?? null)
          : null,
        publicFileUrl:
          item.access.exposeFile && fileId
            ? (media.get(fileId)?.sourceUrl ?? item.publicFileUrl)
            : item.publicFileUrl,
      }));
    },
  };
}
