import type { PublicMedia } from "@/types/content";
import { toStaticMediaUrl } from "@/lib/media/static-media";
import type { WordPressClient } from "./client";
import { mapWithConcurrency } from "./batch";
import { normalizeMediaId } from "./relationships";

export async function resolveMediaId(
  client: WordPressClient,
  value: unknown,
): Promise<PublicMedia | null> {
  const id = normalizeMediaId(value);

  if (id === null) {
    return null;
  }

  const media = await client.getMedia(id);

  if (!media) {
    return null;
  }

  return {
    id: media.id,
    sourceUrl: toStaticMediaUrl(media.sourceUrl),
    altText: media.altText,
    width: media.width,
    height: media.height,
  };
}

export async function resolveMediaIds(
  client: WordPressClient,
  values: readonly unknown[],
  concurrency = 4,
): Promise<Map<number, PublicMedia>> {
  const ids = [
    ...new Set(
      values
        .map(normalizeMediaId)
        .filter((id): id is number => id !== null),
    ),
  ];
  const media = await mapWithConcurrency(ids, concurrency, async (id) => {
    const item = await resolveMediaId(client, id);
    return [id, item] as const;
  });

  return new Map(
    media.filter(
      (entry): entry is readonly [number, PublicMedia] => entry[1] !== null,
    ),
  );
}
