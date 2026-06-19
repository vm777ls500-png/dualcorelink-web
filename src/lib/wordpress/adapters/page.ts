import type { PageModel } from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import {
  adaptContentIdentity,
  adaptSchemaModel,
  adaptSeoModel,
} from "./shared";

export function adaptPage(post: WordPressPost): PageModel {
  return {
    ...adaptContentIdentity(post),
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    seo: adaptSeoModel(post, "page"),
    schema: adaptSchemaModel(post, "page"),
  };
}
