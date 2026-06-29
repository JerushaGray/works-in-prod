# Changelog

All notable changes to **Work In Prod** are documented here following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standards.

---

## [2026-06-29] - Repo cleanup + naming normalization (v0.9.0)

### Changed

- Standardized all component filenames to kebab-case: `Header.tsx` → `header.tsx`, `DashboardClientPage.tsx` → `dashboard-client-page.tsx`. Updated all imports accordingly.
- Renamed `docs/project-continuation-brief_v2` → `project-continuation-brief_v2.md` (added missing extension).
- Renamed `docs/brand/examples/example page` → `example-page.tsx` (removed space from filename).

### Removed

- Deleted `styles/globals.css` — unused Tailwind v3 remnant; `app/globals.css` (Tailwind v4) is the active stylesheet.
- Removed empty `supabase/` directory.

---

## [2026-06-28] - Repo consolidation + App Router migration

### Removed

- Deleted `pages/` directory entirely: `_app.tsx`, `_document.tsx` (inert under App Router), `api/hello.ts` (boilerplate, no callers), and `api/heartbeat.ts` (ported — see below).
- Deleted `README-DRAFT.md` and corrupted root file `"tabilized Next.js 16.1 setup"` (pasted git diff output with trailing PUA Unicode byte).
- Untracked and deleted `supabase/.temp/` (local CLI cache); added to `.gitignore`.

### Added

- `app/api/heartbeat/route.ts` — App Router port of the heartbeat endpoint. Rewrote from Pages API handler signature (`default export`, `NextApiRequest`/`NextApiResponse`) to named `GET`/`POST` exports using the Web API `Request`/`Response`. Supabase client moved inside the handler to avoid build-time crash. Added `export const dynamic = 'force-dynamic'`.

### Changed

- Moved `CODE-OF-CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md` into `.github/` with GitHub-canonical names for auto-detection.
- Updated `.gitattributes`: `* text=auto` → `* text=auto eol=lf` to enforce LF normalization.
- Fixed clone URL in README (`jerusha-gray` → `JerushaGray`), bumped Next.js 14 → 16 across README, `docs/PRD_v1.2.md`, and `docs/brand/design-notes.md`, removed duplicate microcopy table, rewrote Project Structure to reflect real `app/` tree.
- Updated `docs/CHANGELOG.md`: `works-in-prod.vercel.app` → `worksinprod.app`; annotated migrated heartbeat scope.

---

## [2025-12-16] - Security: React Server Components dependency patch

### Security

- Updated `next`, `react-server-dom-webpack`, `react-server-dom-parcel`, and `react-server-dom-turbopack` to patched versions per the React Server Components security advisory. Applied automatically via Vercel's fix-react2shell-next tool (PR #4).

---

## [2025-10-29] - Stability and rendering fixes (v0.8.4)

### Changed

- Improved overall UI rendering stability for the **Tool Details Drawer** component.
- Ensured the drawer panel now renders with a fully opaque background for better readability.
- Added persistent, Strict Mode–safe Framer Motion hooks for consistent metric animations.
- Refined `Sheet` overlay behavior for accessibility and consistent z-index layering.

### Fixed

- **React Hook order error** (`Rendered more hooks than during the previous render`): `useSpring` was being recreated inconsistently on re-renders; wrapped all Framer Motion springs in `useRef()` to ensure consistent hook order.
- Runtime crash from rendering motion values directly as React children — metrics now rendered via `.get().toFixed()` values.
- Supabase metric fetch failures corrected by fixing table reference to `tool_performance_metrics`.
- Transparent drawer background — now fully opaque and readable.

### Notes

- `components/tool-details-drawer.tsx` rewritten for stability and strict compliance.
- Verified safe under Next.js 16.0.1 (Turbopack) and React Strict Mode.
- Next step: validate Supabase `tool_id` linkage for metrics visualization.

---

## [2025-10-25] - Supabase type integration and documentation

### Added

- Generated full Supabase TypeScript schema (`types/database.types.ts`) using the Supabase CLI.
- Implemented type-safe Supabase clients with `<Database>` generics in `/lib/client.ts` and `/lib/server.ts`.
- New technical documentation:
  - `/docs/supabase-setup.md` — dual-client pattern (server + browser)
  - `/docs/app-router-boundaries.md` — clean SSR/CSR separation
  - `/docs/typescript-supabase.md` — type generation, usage, and regeneration instructions

### Changed

- Verified Supabase CLI installation, authentication, and environment setup.
- Confirmed autocompletion and type inference for all Supabase queries.
- Added consistent cross-linking between `/docs` files and README draft.

### Notes

- Project is now fully type-safe across server and client.
- Next milestone: middleware and RLS validation, README polish for Vercel submission.

---

## [2025-10-20] - Initial setup

### Added

- Created Next.js 16 + TypeScript project structure.
- Installed and configured TailwindCSS and shadcn/ui.
- Added Supabase configuration files and `.env.local` setup guide.

### Notes

- Foundation established for Work In Prod portfolio artifact.
