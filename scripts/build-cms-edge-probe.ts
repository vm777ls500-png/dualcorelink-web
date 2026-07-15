import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve(process.cwd(), "out");

const worker = String.raw`
const targets = {
  root: "/wp-json/",
  media: "/wp-json/wp/v2/media?per_page=1",
  products: "/wp-json/wp/v2/products?status=publish&per_page=100",
  solutions: "/wp-json/wp/v2/solutions?status=publish&per_page=100",
  regions: "/wp-json/wp/v2/regions?status=publish&per_page=100",
};

const userAgents = {
  default: null,
  build: "DualCoreLink-Cloudflare-Build/1.0 (+https://dualcorelink.com)",
  browser:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    if (request.method !== "GET" || requestUrl.pathname !== "/probe") {
      return json({ error: "Only GET /probe is available." }, 404);
    }

    const targetName = requestUrl.searchParams.get("target") || "root";
    const userAgentName = requestUrl.searchParams.get("ua") || "default";
    const target = targets[targetName];
    const userAgent = userAgents[userAgentName];
    if (!target || userAgent === undefined) {
      return json({ error: "Unsupported target or user-agent profile." }, 400);
    }

    const upstream = new URL(target, "https://cms.dualcorelink.com");
    upstream.searchParams.set("_a11_probe", crypto.randomUUID());
    const headers = new Headers({ Accept: "application/json" });
    if (userAgent) headers.set("User-Agent", userAgent);

    const startedAt = Date.now();
    try {
      const response = await fetch(upstream, {
        method: "GET",
        headers,
        redirect: "manual",
        cf: { cacheEverything: false, cacheTtl: 0 },
      });
      const text = await response.text();
      const contentType = response.headers.get("content-type") || "";
      const trimmed = text.trimStart();
      return json({
        target: targetName,
        userAgent: userAgentName,
        status: response.status,
        elapsedMs: Date.now() - startedAt,
        bytes: new TextEncoder().encode(text).length,
        contentType,
        bodyKind: contentType.includes("json")
          ? "json"
          : trimmed.startsWith("<")
            ? "html"
            : "other",
        bodyPrefix: trimmed.slice(0, 240),
        server: response.headers.get("server"),
        location: response.headers.get("location"),
        sitegroundCdn: response.headers.get("x-sg-cdn"),
        proxyCache: response.headers.get("x-proxy-cache"),
      });
    } catch (error) {
      return json({
        target: targetName,
        userAgent: userAgentName,
        elapsedMs: Date.now() - startedAt,
        error: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : String(error),
      }, 502);
    }
  },
};
`;

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(path.join(outputDirectory, "_worker.js"), worker, "utf8"),
    writeFile(
      path.join(outputDirectory, "index.html"),
      "<!doctype html><title>A11 CMS edge probe</title>",
      "utf8",
    ),
  ]);

  console.log(`Created isolated A11 edge probe in ${outputDirectory}.`);
}

void main();
