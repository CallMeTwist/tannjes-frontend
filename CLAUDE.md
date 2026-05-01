# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server on port 8080 (host `::`, HMR overlay disabled)
- `npm run build` — production build
- `npm run build:dev` — development-mode build (keeps `lovable-tagger` plugin)
- `npm run lint` — run ESLint over the repo
- `npm run test` — run Vitest once (jsdom env)
- `npm run test:watch` — Vitest watch mode
- Run a single test: `npx vitest run src/path/to/file.test.tsx` (or `-t "test name"` to filter)

## Architecture

Single-page marketing site built with Vite + React 18 + TypeScript, styled via Tailwind and shadcn/ui (Radix primitives). It is a Lovable-generated project (note `lovable-tagger` plugin runs only in dev/`build:dev` mode).

- Entry: `src/main.tsx` → `src/App.tsx`. `App.tsx` wires global providers (`QueryClientProvider`, `TooltipProvider`, two toaster systems) and `BrowserRouter` with two routes: `/` → `pages/Index.tsx`, `*` → `pages/NotFound.tsx`. Custom routes must be added above the catch-all.
- The home page (`pages/Index.tsx`) is composed by stacking section components from `src/components/site/` (Navbar, Hero, About, Services, Specialties, WhyChoose, HowItWorks, Testimonials, CallToAction, Contact, Footer). Adding a new landing-page section means creating a component in `components/site/` and inserting it in `Index.tsx`.
- `src/components/ui/` holds shadcn/ui primitives (do not hand-edit unless intentionally customizing the design system; regenerate via shadcn CLI when possible). Configuration lives in `components.json` (style=default, baseColor=slate, CSS variables on).
- Path alias `@/*` → `src/*` is configured in both `vite.config.ts` and `vitest.config.ts`. Use `@/components/...`, `@/lib/utils`, `@/hooks/...` rather than relative paths.
- React/React-DOM/React-Query are deduped in Vite to prevent duplicate-instance issues; keep that in mind if introducing libraries that bundle their own React.
- Tests: Vitest + Testing Library + jsdom; globals enabled, setup file `src/test/setup.ts`, pattern `src/**/*.{test,spec}.{ts,tsx}`.
