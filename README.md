# DUALCORE LINK Headless Frontend

Next.js 15, TypeScript, Tailwind CSS, App Router, and static export foundation for Cloudflare Pages.

## Next.js

```bash
npm run dev
```

Open `http://localhost:3000/en/`.

Build the static export:

```bash
npm run build
```

The generated site is written to `out/`.

## Cloudflare Pages

This project is configured for static export to `out/`. Deployment is intentionally not performed during stage 8A.

```bash
npm run pages:build
npm run pages:preview
npm run pages:deploy
```

Cloudflare Pages dashboard settings:

- Build command: `npm run pages:build`
- Build output directory: `out`
- Node.js version: `24`

## WordPress Local

Start WordPress and MySQL:

```bash
npm run wp:up
```

Open:

- WordPress: http://localhost:8080
- phpMyAdmin: http://localhost:8081

Stop the environment:

```bash
npm run wp:down
```
