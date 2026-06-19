import type { Locale } from "@/config/i18n";
import type { RelatedContentModel } from "@/types/content";
import type { WordPressClient } from "./client";
import type { PublicCollectionEndpoint } from "./endpoints";
import { chunkValues } from "./batch";
import { normalizeRelationshipIds } from "./relationships";
import { adaptContentIdentity } from "./adapters/shared";

export async function resolveRelatedContent(
  client: WordPressClient,
  endpoint: PublicCollectionEndpoint,
  relationshipIds: unknown,
  locale: Locale,
): Promise<RelatedContentModel[]> {
  const ids = normalizeRelationshipIds(relationshipIds);

  if (ids.length === 0) {
    return [];
  }

  const chunks = chunkValues(ids, 100);
  const collections = await Promise.all(
    chunks.map((include) =>
      client.listPosts(endpoint, { include, perPage: include.length }),
    ),
  );
  const postsById = new Map(
    collections
      .flat()
      .filter((post) => post.language === locale)
      .map((post) => [post.id, post] as const),
  );

  return ids.flatMap((id) => {
    const post = postsById.get(id);

    return post
      ? [
          {
            ...adaptContentIdentity(post),
            title: post.title.rendered,
            excerpt: post.excerpt.rendered,
          },
        ]
      : [];
  });
}
