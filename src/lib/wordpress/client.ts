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
const MAX_REQUEST_ATTEMPTS = 2;
const RETRY_DELAY_MS = 250;
const COLLECTION_PAGE_SIZE = 10;
const buildCacheBuster =
  process.env.WORDPRESS_CACHE_BUST ??
  process.env.CF_PAGES_COMMIT_SHA ??
  process.env.GITHUB_SHA;
const fetchTraceEnabled = process.env.WORDPRESS_FETCH_TRACE === "1";
let activeRequests = 0;
let requestSequence = 0;

function isTransientNetworkError(error: unknown): boolean {
  return (
    error instanceof TypeError ||
    (error instanceof Error && error.name === "AbortError")
  );
}

async function waitBeforeRetry(
  url: string,
  attempt: number,
  elapsedMs: number,
  error: unknown,
) {
  const errorName = error instanceof Error ? error.name : "UnknownError";
  console.warn(
    `[wordpress-retry] ${JSON.stringify({
      endpoint: publicEndpoint(url),
      attempt,
      elapsedMs,
      errorName,
    })}`,
  );
  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
}

function publicEndpoint(url: string): string {
  const endpoint = new URL(url);
  endpoint.searchParams.delete("_cache_bust");
  return `${endpoint.pathname}${endpoint.search}`;
}

function traceRequest(
  url: string,
  details: {
    event: "start" | "success" | "failure";
    requestId: number;
    attempt: number;
    elapsedMs?: number;
    errorName?: string;
  },
) {
  if (!fetchTraceEnabled) return;

  console.info(
    `[wordpress-fetch] ${JSON.stringify({
      ...details,
      pid: process.pid,
      endpoint: publicEndpoint(url),
      active: activeRequests,
    })}`,
  );
}

function normalizeRestRoot(value: string): string {
  return value.replace(/\/+$/, "").replace(/\/wp\/v2$/, "");
}

function buildQuery(query: WordPressListQuery = {}): URLSearchParams {
  const params = new URLSearchParams();
  params.set("status", query.status ?? "publish");
  params.set("per_page", String(query.perPage ?? 100));

  if (buildCacheBuster) {
    params.set("_cache_bust", buildCacheBuster);
  }

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
): Promise<{ data: unknown; headers: Headers }> {
  for (let attempt = 1; attempt <= MAX_REQUEST_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const requestId = ++requestSequence;
    const startedAt = Date.now();
    activeRequests += 1;
    traceRequest(url, { event: "start", requestId, attempt });

    try {
      let response: Response;

      try {
        response = await fetcher(url, {
          cache: "force-cache",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
      } catch (error) {
        const elapsedMs = Date.now() - startedAt;
        const errorName =
          error instanceof Error ? error.name : "UnknownError";
        traceRequest(url, {
          event: "failure",
          requestId,
          attempt,
          elapsedMs,
          errorName,
        });

        if (
          isTransientNetworkError(error) &&
          attempt < MAX_REQUEST_ATTEMPTS
        ) {
          await waitBeforeRetry(url, attempt, elapsedMs, error);
          continue;
        }

        throw new WordPressDataError(
          "WORDPRESS_REQUEST_FAILED",
          `WordPress request could not be completed after ${attempt} attempt${attempt === 1 ? "" : "s"}.`,
          { endpoint: url, attempt, elapsedMs },
          { cause: error },
        );
      }

      if (!response.ok) {
        throw new WordPressDataError(
          "WORDPRESS_HTTP_ERROR",
          `WordPress request failed with status ${response.status}.`,
          {
            endpoint: url,
            status: response.status,
            attempt,
            elapsedMs: Date.now() - startedAt,
          },
        );
      }

      let data: unknown;
      try {
        data = await response.json();
      } catch (error) {
        const elapsedMs = Date.now() - startedAt;
        if (
          isTransientNetworkError(error) &&
          attempt < MAX_REQUEST_ATTEMPTS
        ) {
          traceRequest(url, {
            event: "failure",
            requestId,
            attempt,
            elapsedMs,
            errorName: error instanceof Error ? error.name : "UnknownError",
          });
          await waitBeforeRetry(url, attempt, elapsedMs, error);
          continue;
        }

        throw new WordPressDataError(
          "WORDPRESS_INVALID_JSON",
          "WordPress returned a response that could not be parsed as JSON.",
          {
            endpoint: url,
            attempt,
            elapsedMs,
          },
          { cause: error },
        );
      }

      traceRequest(url, {
        event: "success",
        requestId,
        attempt,
        elapsedMs: Date.now() - startedAt,
      });
      return { data, headers: response.headers };
    } finally {
      clearTimeout(timeout);
      activeRequests -= 1;
    }
  }

  throw new Error("Unreachable WordPress request state.");
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
  const requests = new Map<
    string,
    Promise<{ data: unknown; headers: Headers }>
  >();
  const mediaRequests = new Map<number, Promise<WordPressMedia | null>>();

  function loadJsonResponse(url: string) {
    const existing = requests.get(url);
    if (existing) return existing;

    const request = requestJson(fetcher, url, timeoutMs).catch((error) => {
      requests.delete(url);
      throw error;
    });
    requests.set(url, request);
    return request;
  }

  async function loadJson(url: string) {
    return (await loadJsonResponse(url)).data;
  }

  return {
    config: { restRoot, timeoutMs },

    async getRoot() {
      const data = await loadJson(restRoot);
      return unwrapValidation(validateRestRoot(data), restRoot);
    },

    async listPosts(endpoint, query = {}) {
      const path = wordpressEndpoints[endpoint];
      const shouldPaginate =
        query.page === undefined &&
        query.perPage === undefined &&
        query.slug === undefined &&
        query.include === undefined;

      if (!shouldPaginate) {
        const url = `${restRoot}/${path}?${buildQuery(query)}`;
        const data = await loadJson(url);
        return unwrapValidation(validatePostCollection(data), url);
      }

      const firstUrl = `${restRoot}/${path}?${buildQuery({
        ...query,
        page: 1,
        perPage: COLLECTION_PAGE_SIZE,
      })}`;
      const firstResponse = await loadJsonResponse(firstUrl);
      const firstPage = unwrapValidation(
        validatePostCollection(firstResponse.data),
        firstUrl,
      );
      const totalPagesHeader = firstResponse.headers.get("x-wp-totalpages");
      if (!totalPagesHeader && firstPage.length === COLLECTION_PAGE_SIZE) {
        throw new WordPressDataError(
          "WORDPRESS_INVALID_RESPONSE",
          "WordPress omitted the collection page count for a full page.",
          { endpoint: firstUrl, field: "x-wp-totalpages" },
        );
      }
      const totalPages = totalPagesHeader
        ? Number.parseInt(totalPagesHeader, 10)
        : 1;

      const emptyCollection = totalPages === 0 && firstPage.length === 0;
      if (
        !Number.isSafeInteger(totalPages) ||
        totalPages < 0 ||
        (totalPages === 0 && !emptyCollection)
      ) {
        throw new WordPressDataError(
          "WORDPRESS_INVALID_RESPONSE",
          "WordPress returned an invalid collection page count.",
          { endpoint: firstUrl, field: "x-wp-totalpages" },
        );
      }

      if (emptyCollection) return [];

      const posts = [...firstPage];
      for (let page = 2; page <= totalPages; page += 1) {
        const pageUrl = `${restRoot}/${path}?${buildQuery({
          ...query,
          page,
          perPage: COLLECTION_PAGE_SIZE,
        })}`;
        const data = await loadJson(pageUrl);
        posts.push(
          ...unwrapValidation(validatePostCollection(data), pageUrl),
        );
      }

      return posts;
    },

    async getMedia(id) {
      if (!Number.isSafeInteger(id) || id <= 0) {
        return null;
      }

      const existing = mediaRequests.get(id);
      if (existing) return existing;

      const url = `${restRoot}/${wordpressEndpoints.media}/${id}`;
      const request = (async () => {
        try {
          const data = await loadJson(url);
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
      })().catch((error) => {
        mediaRequests.delete(id);
        throw error;
      });
      mediaRequests.set(id, request);
      return request;
    },
  };
}
