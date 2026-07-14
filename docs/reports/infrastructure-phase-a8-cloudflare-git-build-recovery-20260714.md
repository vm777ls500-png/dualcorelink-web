# Infrastructure Phase A8 - Cloudflare Git Build Recovery

Date: 2026-07-14

## Objective

Restore the normal production workflow from `git push main` to Cloudflare Pages by giving the cloud build a public WordPress REST source.

## Configuration

The final `wrangler.toml` contains a non-secret build variable:

```toml
[vars]
WORDPRESS_REST_ROOT = "https://cms.dualcorelink.com/wp-json"
```

No localhost or `127.0.0.1` value is configured for Cloudflare. No DNS, WordPress data, Cloudflare Dashboard variable, or frontend feature code was changed.

The final implementation commit deployed by Cloudflare was:

- Commit: `1cbdf7be6e8d77fc5f7d37874cf1e8dec5bd0b64`
- Message: `chore: keep cloudflare wordpress config minimal`

The earlier implementation commit `a6a3c2b` added the public REST variable. Two temporary build-concurrency experiments were tested and then removed, leaving only the requested public REST variable in the final configuration.

## Local QA

- `npm.cmd run lint`: passed.
- `WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json npm.cmd run test:data`: passed, 27/27 tests.
- `WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json npm.cmd run build`: passed.
- Next.js generated 147 static pages and completed the static export cleanup.
- Local sitemap output contained 67 URLs.
- `git diff --check`: passed with no whitespace errors; Git only reported the existing LF-to-CRLF checkout warning.

## Cloudflare Git Build

Cloudflare read `wrangler.toml` and reported the following build variable:

- `WORDPRESS_REST_ROOT: https://cms.dualcorelink.com/wp-json`

The successful build no longer fell back to `127.0.0.1:8080` and did not report `ECONNREFUSED 127.0.0.1:8080`.

Final deployment:

- Environment: Production
- Branch: `main`
- Deployment commit: `1cbdf7be6e8d77fc5f7d37874cf1e8dec5bd0b64`
- Deployment ID: `768222a6-28c7-44ce-9222-18ae5de83cea`
- Deployment URL: https://768222a6.dualcorelink-web.pages.dev
- Build result: passed
- Asset result: 533 assets processed; 312 uploaded and 221 reused
- Cloudflare result: `Success: Your site was deployed!`

Before the successful run, several builds exposed intermittent SiteGround REST responses: two requests exceeded the existing 10-second application timeout, and one request returned an HTML protection response instead of JSON. The final minimal-configuration Git build completed successfully without frontend code changes.

## Production URL Verification

All checked URLs returned HTTP 200:

- https://dualcorelink.com/en/
- https://dualcorelink.com/en/products/
- https://dualcorelink.com/en/resources/
- https://dualcorelink.com/en/resources/hotel-rcu-buying-guide/
- https://dualcorelink.com/en/solutions/
- https://dualcorelink.com/en/contact/
- https://dualcorelink.com/en/products/rcu-controller-cabinet/
- https://dualcorelink.com/sitemap.xml

The Products page contains the published product content, including the known RCU controller cabinet entry. The Resources page contains the Phase 2B Featured Guides section, Buying Guides, Hotel Automation Guides, OEM/ODM Guides, Technical Resources, Read Guide actions, and Request a Quote actions.

## Sitemap Verification

- Sitemap status: HTTP 200
- Content type: `application/xml`
- URL count: 67
- All five Phase 2A Resource URLs are present:
  - `/en/resources/hotel-rcu-buying-guide/`
  - `/en/resources/smart-hotel-room-control-system-guide/`
  - `/en/resources/hotel-smart-switch-panel-guide/`
  - `/en/resources/oem-odm-smart-panel-customization-guide/`
  - `/en/resources/hotel-guest-room-automation-guide/`

## SEO and Schema Verification

- Resources listing: `CollectionPage`, `ItemList`, and `BreadcrumbList` JSON-LD present.
- Hotel RCU Buying Guide: one H1, canonical, title, meta description, `Article`, and `BreadcrumbList` present.
- RCU controller cabinet product page: `Product` and `BreadcrumbList` present.
- Exact empty `href="#"` links found: 0.
- `localhost` or `127.0.0.1` leaks found in checked production responses: 0.

## Responsive Production QA

Chrome headless checks covered these widths:

- 375
- 390
- 430
- 768
- 1280

Each width covered:

- `/en/`
- `/en/products/`
- `/en/resources/`
- `/en/resources/hotel-rcu-buying-guide/`
- `/en/solutions/`
- `/en/contact/`

All 30 page and viewport combinations passed:

- No horizontal overflow.
- Header visible, width-constrained, and sticky.
- Main content visible and non-empty.
- Buyer CTA elements present.
- No exact empty `href="#"` links.

## Issues and Resolution

The original Cloudflare failure was caused by the build not receiving `WORDPRESS_REST_ROOT` and falling back to the local REST URL. Adding the public variable to `wrangler.toml` resolved that configuration problem. Intermittent public CMS responses caused three subsequent attempts to fail, but the final automatic Git build completed with the minimal requested configuration.

No functional code fix was made. No WordPress content, DNS record, Cloudflare Dashboard setting, Staging site, or backup was deleted or modified.

## Follow-up

- Keep `https://cms.dualcorelink.com/wp-json` publicly reachable for every Cloudflare Git build.
- Monitor SiteGround REST response time and protection logs because intermittent timeout or HTML challenge responses were observed during recovery.
- Keep Staging and the A1/manual backups until several normal Git deployments have completed reliably.
