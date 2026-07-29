<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Bifor landing (bifor.games)

Marketing landing for the Bifor party-games mobile app. Polish UI copy, dark theme, no CMS - all content lives in `app/lib/`.

## Content architecture

- `app/lib/games.ts` - single source of truth for the 6 games (rules, players, FAQ, glow color). Feeds `/gry`, `/gry/[slug]`, the home carousel, footer, `sitemap.ts` and `llms.txt`. Add or edit a game only here.
- `app/lib/site.ts` - URL, e-mail, descriptions, key facts. Never hardcode `https://bifor.games` in components; use `abs()`.
- `app/lib/jsonld.ts` - JSON-LD node builders. `Organization`/`WebSite`/`MobileApplication` are emitted once in `layout.tsx`; page-level graphs must not repeat them.
- `app/lib/llms.ts` + `app/llms.txt/route.ts` + `app/llms-full.txt/route.ts` - AI-agent context files, generated from the data above. Do not put an `llms.txt` in `public/` - a static file shadows the route.
- New indexable page = metadata with `alternates.canonical`, a JSON-LD graph, an entry in `sitemap.ts` and an internal link from nav/footer.

## Copy and visuals

- Polish copy, plain hyphen `-` (never a long dash), no emoji in new content, no comments in code.
- `public/games/*.webp` are portrait 800x1071 character art - render at natural aspect ratio; `object-cover`/`object-top` crops the face off.

## Verification

- `npm run build` (Turbopack) then `npx next start -p 3111` and curl the HTML to check titles, canonicals and JSON-LD - do not assume metadata rendered.
- `npx eslint app --max-warnings=0` fails on pre-existing issues in `app/components/Navbar.tsx` (window.location) and `app/potwierdz/page.tsx` (`<img>`); lint only the files you touched.
- `npx tsc --noEmit` may report stale `.next/types` errors for the removed `app/test3d` route; a fresh `npm run build` is authoritative.
