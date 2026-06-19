import { createWordPressClient } from "../client";

const restRoot =
  process.env.WORDPRESS_REST_ROOT ?? "http://127.0.0.1:8080/wp-json";

export const wordpressClient = createWordPressClient({ restRoot });

export const repositoryMediaConcurrency = Math.max(
  1,
  Number(process.env.BUILD_FETCH_CONCURRENCY ?? 4),
);
