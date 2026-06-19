import { wordpressEndpoints, type PublicCollectionEndpoint } from "./endpoints";
import { WordPressDataError } from "./errors";
import {
  validatePostCollection,
  validateMedia,
  validateRestRoot,
  type ValidationResult,
} from "./validators";
import type {
  WordPressListQuery,
  WordPressMedia,
  WordPressPost,
  WordPressRestRoot,
} from "@/types/wordpress";

export type WordPressClientConfig = {
  restRoot: string;
  timeoutMs?: number;
  fetcher?: typeof fetch;
};

export type WordPressClient = {
  readonly config: Readonly<Required<Omit<WordPressClientConfig, "fetcher">>>;
  getRoot(): Promise<WordPressRestRoot>;
  listPosts(
    endpoint: PublicCollectionEndpoint,
    query?: WordPressListQuery,
  ): Promise<WordPressPost[]>;
  getMedia(id: number): Promise<WordPressMedia | null>;
};

const DEFAULT_TIMEOUT_MS = 10_000;
const buildCacheBuster =
  process.env.WORDPRESS_CACHE_BUST ?? String(Date.now());

function normalizeRestRoot(value: string): string {
  return value.replace(/\/+$/, "").replace(/\/wp\/v2$/, "");
}

function buildQuery(query: WordPressListQuery = {}): URLSearchParams {
  const params = new URLSearchParams();
  params.set("status", query.status ?? "publish");
  params.set("per_page", String(query.perPage ?? 100));
  params.set("_cache_bust", buildCacheBuster);

  if (query.page) {
    params.set("page", String(query.page));
  }

  if (query.slug) {
    params.set("slug", query.slug);
  }

  if (query.include?.length) {
    params.set("include", query.include.join(","));
  }

  return params;
}

async function requestJson(
  fetcher: typeof fetch,
  url: string,
  timeoutMs: number,
): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetcher(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new WordPressDataError(
        "WORDPRESS_HTTP_ERROR",
        `WordPress request failed with status ${response.status}.`,
        { endpoint: url, status: response.status },
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof WordPressDataError) {
      throw error;
    }

    throw new WordPressDataError(
      "WORDPRESS_REQUEST_FAILED",
      "WordPress request could not be completed.",
      { endpoint: url },
      { cause: error },
    );
  } finally {
    clearTimeout(timeout);
  }
}

function unwrapValidation<T>(
  result: ValidationResult<T>,
  endpoint: string,
): T {
  if (result.ok) {
    return result.value;
  }

  throw new WordPressDataError(
    "WORDPRESS_INVALID_RESPONSE",
    result.message,
    { endpoint, field: result.field },
  );
}

export function createWordPressClient(
  config: WordPressClientConfig,
): WordPressClient {
  const restRoot = normalizeRestRoot(config.restRoot);
  const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const fetcher = config.fetcher ?? fetch;

  return {
    config: { restRoot, timeoutMs },

    async getRoot() {
      const data = await requestJson(fetcher, restRoot, timeoutMs);
      return unwrapValidation(validateRestRoot(data), restRoot);
    },

    async listPosts(endpoint, query = {}) {
      const path = wordpressEndpoints[endpoint];
      const url = `${restRoot}/${path}?${buildQuery(query)}`;
      const data = await requestJson(fetcher, url, timeoutMs);
      return unwrapValidation(validatePostCollection(data), url);
    },

    async getMedia(id) {
      if (!Number.isSafeInteger(id) || id <= 0) {
        return null;
      }

      const url = `${restRoot}/${wordpressEndpoints.media}/${id}`;

      try {
        const data = await requestJson(fetcher, url, timeoutMs);
        return unwrapValidation(validateMedia(data), url);
      } catch (error) {
        if (
          error instanceof WordPressDataError &&
          error.context.status === 404
        ) {
          return null;
        }
        throw error;
      }
    },
  };
}
