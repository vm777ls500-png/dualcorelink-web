import { adaptProducts, adaptSolutions } from "../src/lib/wordpress/adapters";
import { createWordPressClient } from "../src/lib/wordpress/client";
import { publicCollectionEndpoints } from "../src/lib/wordpress/endpoints";
import { formatBuildLog } from "../src/lib/wordpress/logger";

async function main() {
  const restRoot =
    process.env.WORDPRESS_REST_ROOT ?? "http://127.0.0.1:8080/wp-json";
  const client = createWordPressClient({ restRoot });
  const root = await client.getRoot();
  const counts: Record<string, number> = {};

  for (const endpoint of publicCollectionEndpoints) {
    const posts = await client.listPosts(endpoint, { perPage: 1 });
    counts[endpoint] = posts.length;
  }

  const products = adaptProducts(await client.listPosts("products"));
  const solutions = adaptSolutions(await client.listPosts("solutions"));

  console.log(
    JSON.stringify(
      {
        root: {
          name: root.name,
          url: root.url,
          namespaces: root.namespaces.length,
        },
        publicEndpointCounts: counts,
        adapters: {
          products: products.length,
          solutions: solutions.length,
        },
        inquiryRequested: false,
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  console.error(formatBuildLog(error));
  process.exitCode = 1;
});
