# Anis — Personal Website

A dark, image-led personal website for Anis, an Algerian Computer Science student from Jijel. It is deliberately not a résumé or educational landing page: it is a set of rich, scrollable chapters about music, screens, travel, programming, and everyday life.

## Run & Operate

- `pnpm --filter @workspace/anis-profile run dev` — run the personal archive site
- `pnpm --filter @workspace/api-server run dev` — run the optional API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- The profile site is frontend-only and does not need database credentials.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/anis-profile/src/App.tsx` — the chapter navigation, scrollable sections, detail modals, interactions, and static profile data
- `artifacts/anis-profile/src/index.css` — the dark navy visual system, image-led layouts, typography, textures, motion, internal scrollbars, and responsive rules
- `attached_assets/image_1790468943672.png` — the suitcase collage used as the visual reference and cover image
- `vercel.json` — root-level Vercel build and output configuration
- `screenshots/anis-profile-final.jpg` — latest verified preview capture

## Architecture decisions

- The profile is frontend-only and static; no backend, database, audio embed, or personal data service is needed.
- The page uses local static content so it can be pushed to GitHub and built directly by Vercel.
- Replit workflow variables remain supported, but Vite defaults to standard values so Vercel can run the same build command.

## Product

- Full-viewport chapter navigator with no global document scrolling
- Six independently scrollable chapters: home, music, screens, travel, tech, and the rest
- Music track cards, TV/movie detail rows, travel destinations, programming stack rows, and image-led mood sections
- Clickable detail modals, keyboard chapter navigation, a fake music player interaction, and responsive mobile navigation
- Dark blue and black palette with cyan, pink, yellow, lime, blue, and purple accents

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
