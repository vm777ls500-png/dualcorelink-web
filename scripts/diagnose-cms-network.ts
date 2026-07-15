import https from "node:https";

type TimingResult = {
  client: "https" | "fetch";
  endpoint: string;
  status: number;
  address?: string;
  family?: string;
  httpVersion: string;
  tlsVersion?: string;
  cipher?: string;
  dnsMs?: number;
  connectMs?: number;
  tlsMs?: number;
  ttfbMs: number;
  totalMs: number;
  bytes: number;
  contentEncoding?: string;
  server?: string;
  cacheStatus?: string;
  contentType?: string;
  bodyKind?: "json" | "html" | "other";
  bodyPrefix?: string;
};

const endpoints = [
  "/wp-json/",
  "/wp-json/wp/v2/media?per_page=1",
  "/wp-json/wp/v2/products?status=publish&per_page=100",
  "/wp-json/wp/v2/solutions?status=publish&per_page=100",
  "/wp-json/wp/v2/regions?status=publish&per_page=100",
];

const restRoot = new URL(
  process.env.WORDPRESS_REST_ROOT ?? "https://cms.dualcorelink.com/wp-json",
);
const origin = restRoot.origin;
const timeoutMs = 30_000;
const diagnosticCacheBust =
  process.env.CMS_DIAGNOSTIC_CACHE_BUST ?? process.env.CF_PAGES_COMMIT_SHA;

function diagnosticUrl(endpoint: string) {
  const url = new URL(endpoint, origin);
  if (diagnosticCacheBust && endpoint !== "/wp-json/") {
    url.searchParams.set("_cache_bust", diagnosticCacheBust);
  }
  return url;
}

function elapsed(startedAt: number, eventAt?: number) {
  return eventAt === undefined
    ? undefined
    : Math.round((eventAt - startedAt) * 100) / 100;
}

function headerValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function classifyBody(body: string) {
  try {
    JSON.parse(body);
    return "json" as const;
  } catch {
    return /^\s*<!doctype html|^\s*<html/i.test(body)
      ? ("html" as const)
      : ("other" as const);
  }
}

function bodyPrefix(body: string) {
  return body.replace(/\s+/g, " ").trim().slice(0, 180);
}

function requestEndpoint(endpoint: string): Promise<TimingResult> {
  return new Promise((resolve, reject) => {
    const startedAt = performance.now();
    let lookupAt: number | undefined;
    let connectAt: number | undefined;
    let secureConnectAt: number | undefined;
    let responseAt: number | undefined;
    let address: string | undefined;
    let family: string | undefined;
    let tlsVersion: string | undefined;
    let cipher: string | undefined;
    let bytes = 0;

    const request = https.get(
      diagnosticUrl(endpoint),
      {
        agent: false,
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "User-Agent": process.env.CMS_DIAGNOSTIC_USER_AGENT ?? "node",
        },
      },
      (response) => {
        responseAt = performance.now();
        response.on("data", (chunk: Buffer) => {
          bytes += chunk.length;
        });
        response.on("end", () => {
          clearTimeout(timeout);
          const completedAt = performance.now();
          resolve({
            client: "https",
            endpoint,
            status: response.statusCode ?? 0,
            address,
            family,
            httpVersion: response.httpVersion,
            tlsVersion,
            cipher,
            dnsMs: elapsed(startedAt, lookupAt),
            connectMs: elapsed(startedAt, connectAt),
            tlsMs: elapsed(startedAt, secureConnectAt),
            ttfbMs: elapsed(startedAt, responseAt) ?? 0,
            totalMs: elapsed(startedAt, completedAt) ?? 0,
            bytes,
            contentEncoding: headerValue(response.headers["content-encoding"]),
            server: headerValue(response.headers.server),
            cacheStatus:
              headerValue(response.headers["cf-cache-status"]) ??
              headerValue(response.headers["x-proxy-cache"]),
            contentType: headerValue(response.headers["content-type"]),
          });
        });
      },
    );

    const timeout = setTimeout(() => {
      request.destroy(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    request.on("socket", (socket) => {
      socket.once("lookup", (_error, resolvedAddress, resolvedFamily) => {
        lookupAt = performance.now();
        address = resolvedAddress;
        family = String(resolvedFamily);
      });
      socket.once("connect", () => {
        connectAt = performance.now();
        address = socket.remoteAddress;
        family = socket.remoteFamily;
      });
      socket.once("secureConnect", () => {
        secureConnectAt = performance.now();
        const tlsSocket = socket as import("node:tls").TLSSocket;
        tlsVersion = tlsSocket.getProtocol() ?? undefined;
        cipher = tlsSocket.getCipher().name;
      });
    });

    request.on("error", (error) => {
      clearTimeout(timeout);
      reject({
        endpoint,
        error: error.name,
        message: error.message,
        address,
        family,
        dnsMs: elapsed(startedAt, lookupAt),
        connectMs: elapsed(startedAt, connectAt),
        tlsMs: elapsed(startedAt, secureConnectAt),
        totalMs: elapsed(startedAt, performance.now()),
      });
    });
  });
}

async function requestEndpointWithFetch(
  endpoint: string,
): Promise<TimingResult> {
  const startedAt = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(diagnosticUrl(endpoint), {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    const responseAt = performance.now();
    const body = await response.text();

    return {
      client: "fetch",
      endpoint,
      status: response.status,
      httpVersion: "fetch-managed",
      ttfbMs: elapsed(startedAt, responseAt) ?? 0,
      totalMs: elapsed(startedAt, performance.now()) ?? 0,
      bytes: Buffer.byteLength(body),
      contentEncoding: response.headers.get("content-encoding") ?? undefined,
      server: response.headers.get("server") ?? undefined,
      cacheStatus:
        response.headers.get("cf-cache-status") ??
        response.headers.get("x-proxy-cache") ??
        undefined,
      contentType: response.headers.get("content-type") ?? undefined,
      bodyKind: classifyBody(body),
      bodyPrefix: classifyBody(body) === "json" ? undefined : bodyPrefix(body),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  console.log(
    JSON.stringify({
      origin,
      concurrency: 1,
      timeoutMs,
      endpointCount: endpoints.length,
      cacheBustApplied: Boolean(diagnosticCacheBust),
    }),
  );

  let failed = false;
  for (const endpoint of endpoints) {
    try {
      console.log(JSON.stringify(await requestEndpoint(endpoint)));
    } catch (error) {
      failed = true;
      console.error(JSON.stringify(error));
    }
  }

  console.log(JSON.stringify({ phase: "fetch-sequential" }));
  for (const endpoint of endpoints) {
    try {
      console.log(JSON.stringify(await requestEndpointWithFetch(endpoint)));
    } catch (error) {
      failed = true;
      console.error(
        JSON.stringify({
          client: "fetch",
          endpoint,
          error: error instanceof Error ? error.name : "UnknownError",
          message: error instanceof Error ? error.message : String(error),
        }),
      );
    }
  }

  console.log(JSON.stringify({ phase: "fetch-collection-burst", concurrency: 3 }));
  const collectionEndpoints = endpoints.slice(2);
  const burstResults = await Promise.allSettled(
    collectionEndpoints.map(requestEndpointWithFetch),
  );
  burstResults.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(JSON.stringify(result.value));
      return;
    }

    failed = true;
    const error = result.reason;
    console.error(
      JSON.stringify({
        client: "fetch",
        endpoint: collectionEndpoints[index],
        error: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : String(error),
      }),
    );
  });

  if (failed) {
    process.exitCode = 1;
  }
}

void main();
