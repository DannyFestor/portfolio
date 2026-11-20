# festor.info — portfolio

The rebuilt portfolio for Danny Festor — German fullstack freelancer based in Japan.

Built with [Astro](https://astro.build) 7 (static site, zero client JS) and the Vite+ toolchain.

## Development

```sh
vp install       # install dependencies
vp dev           # dev server (background: astro dev --background)
vp check         # format, lint, type check
vp test          # run tests
vp build         # production build to dist/
```

## Structure

- `src/pages/` — the product pages (Home, Case studies, About, Contact, Blog — built in subsequent issues)
- `src/content/` — content collections (`blog`, later `caseStudies`)
- `src/consts.ts` — site identity (title/description)
- `astro.config.mjs` — site URL (`https://festor.info`), MDX + sitemap integrations

## Domain docs

Single-context domain model: `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
