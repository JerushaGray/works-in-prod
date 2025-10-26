# Next.js App Router Boundaries — Work In Prod

This document explains how the **Work In Prod** portfolio project enforces clean boundaries between **server** and **client** components in a Next.js 16 App Router architecture.

---

## 🧠 Overview

Next.js App Router introduces two runtimes:

| Runtime               | Capabilities                                                                     | Use Cases                                              |
| --------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Server Components** | Access environment variables, perform data fetching, call Supabase server client | Page components, layouts, server actions               |
| **Client Components** | Access browser APIs, manage state, animations, interactivity                     | Charts, forms, tabs, filters, Framer Motion animations |

By maintaining explicit boundaries between these layers, this project achieves stable hydration, predictable rendering, and zero runtime context errors.

---

## ⚙️ Directory Strategy

| Folder            | Responsibility                                           | Runtime                        |
| ----------------- | -------------------------------------------------------- | ------------------------------ |
| `app/`            | Routing, layouts, and server entry points                | **Server** (default)           |
| `app/dashboard/`  | Dashboard routes and tab organization                    | Server entry + Client children |
| `app/components/` | Interactive UI components, charts, and motion effects    | **Client**                     |
| `lib/`            | Supabase clients, shared utilities, and type definitions | **Server or Shared**           |
| `components/ui/`  | shadcn/ui base elements (e.g., Card, Skeleton, Button)   | **Client**                     |

---

## 🧩 Component Boundaries

### ✅ Server Components

* `app/dashboard/page.tsx` — Entry point for dashboard route; server-only.
* `lib/server.ts` — Uses Supabase server client with `@supabase/ssr`.
* `lib/supabase.ts` — Exposes runtime-aware client selection (server or browser).

### ✅ Client Components

* `app/dashboard/DashboardClientPage.tsx` — Main interactive dashboard (uses state and Supabase browser client).
* `app/components/charts/revenue-chart.tsx` — Client-only Recharts + Framer Motion component.
* `components/ui/*` — shadcn/ui primitives marked as `"use client"`.

---

## ⚖️ Boundary Rules

1. **Data fetching** → Server components only.
2. **State management & interactivity** → Client components only.
3. **Client libraries** (Recharts, Framer Motion, etc.) → Always behind a `"use client"` marker.
4. **Server utilities** (Supabase, cookies, headers) → Never imported into client files.
5. **Prop passing** → Always JSON-serializable data from server → client.

---

## 🧱 Benefits

* 🚫 No `window is not defined` hydration errors.
* ⚡ Predictable SSR → CSR transitions.
* 🧩 Smaller client bundles (charts and motion isolated).
* 🧠 Clear mental model: server = data, client = interaction.

---

## 📚 Example Flow

```tsx
// app/dashboard/page.tsx — Server component
import { getSupabaseServerClient } from "@/lib/server";
import { DashboardClientPage } from "./DashboardClientPage";

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("martech_stack").select("*");
  return <DashboardClientPage initialTools={data ?? []} />;
}
```

```tsx
// app/dashboard/DashboardClientPage.tsx — Client component
"use client";
import { useState } from "react";

export function DashboardClientPage({ initialTools = [] }) {
  const [tools, setTools] = useState(initialTools);
  return <div>{tools.length} tools loaded</div>;
}
```

---

## ✅ Summary

| Area                         | Status                                 |
| ---------------------------- | -------------------------------------- |
| Page routing & data fetching | ✅ Server-only                          |
| Interactive dashboard        | ✅ Client-only                          |
| Chart hydration              | ✅ Client-only (dynamic import)         |
| Supabase client usage        | ✅ Context-specific (server vs browser) |
| shadcn/ui elements           | ✅ Isolated client primitives           |

This structure ensures **Work In Prod** remains fully compatible with Vercel's App Router runtime model and maintains stable SSR/CSR hydration.
