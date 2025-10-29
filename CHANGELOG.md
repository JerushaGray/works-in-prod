# Changelog

All notable changes to **Work In Prod** are documented here following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standards.

## [2025-10-29] - Supabase Type Integration + Documentation

# 🧾 CHANGELOG — October 29, 2025

## 🚀 [v0.8.4] – Stability & Rendering Fixes

### ✨ Enhancements
- Improved overall UI rendering stability for the **Tool Details Drawer** component.  
- Ensured the drawer panel now renders with a fully opaque background for better readability.  
- Added persistent, Strict Mode–safe Framer Motion hooks for consistent metric animations.  
- Refined `Sheet` overlay behavior for accessibility and consistent z-index layering.  

### 🐛 Bug Fixes
- **Fixed critical React Hook order error** (`Rendered more hooks than during the previous render`).  
  - **Cause:** `useSpring` was being recreated inconsistently on re-renders.  
  - **Fix:** Wrapped all Framer Motion springs in `useRef()` to ensure consistent hook order.  
- Resolved runtime crash caused by attempting to render motion values directly as React children.  
  - Metrics are now rendered via `.get().toFixed()` values instead of motion objects.  
- Addressed Supabase metric fetch failures by correcting the table reference to `tool_performance_metrics`.  
- Fixed transparent drawer issue — background is now fully opaque and readable.  

### 🧰 Developer Notes
- **Component:** `components/tool-details-drawer.tsx` rewritten for stability and strict compliance.  
- Verified safe under **Next.js 16.0.1 (Turbopack)** and React Strict Mode.  
- Next step: validate Supabase `tool_id` linkage for metrics visualization.  

### 📋 Pending (Backlog)
- Add animated metric transitions once the current version is fully stable.  
- Implement smooth drawer slide-in animations (see “UI Enhancements” backlog item).  
---

## [2025-10-25] - Supabase Type Integration + Documentation

### Added

* Generated full Supabase TypeScript schema (`types/database.types.ts`) using the Supabase CLI.
* Implemented type-safe Supabase clients with `<Database>` generics in:

  * `/lib/client.ts`
  * `/lib/server.ts`
* Added new technical documentation files:

  * `/docs/supabase-setup.md` — dual-client pattern (server + browser)
  * `/docs/app-router-boundaries.md` — clean SSR/CSR separation
  * `/docs/typescript-supabase.md` — type generation, usage, and regeneration instructions

### Improved

* Verified Supabase CLI installation, authentication, and environment setup.
* Confirmed autocompletion and type inference for all Supabase queries.
* Added consistent cross-linking between `/docs` files and README draft.

### Notes

* Project is now fully type-safe across server and client.
* Next milestone: Middleware & RLS validation and README polish for Vercel submission.

---

## [2025-10-20] - Initial Setup

### Added

* Created Next.js 16 + TypeScript project structure.
* Installed and configured TailwindCSS and shadcn/ui.
* Added Supabase configuration files and `.env.local` setup guide.

### Notes

* Foundation established for Work In Prod portfolio artifact.
