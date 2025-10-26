# Supabase Client Setup for Work In Prod

This project uses a **dual Supabase client pattern** optimized for **Next.js 16 App Router**.

---

## Why Two Clients?

Next.js uses two runtimes:
- **Server Runtime** (Edge or Node): runs Server Components, API routes, and server actions.
- **Client Runtime**: runs React components in the browser.

Each environment needs a Supabase client configured for its capabilities.

---

## Directory Structure

lib/
client.ts → Supabase client for browser components
server.ts → Supabase client for server components (SSR)
supabase.ts → Auto-selector helper (chooses correct client)

pgsql


---

## Client (Browser) — `lib/client.ts`

```ts
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    browserClient = createBrowserClient<Database>(url, anonKey);
  }
  return browserClient;
}
Used in "use client" components like the dashboard or charts.

Server (SSR) — lib/server.ts
ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

export function getSupabaseServerClient() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {}
      },
    },
  });
}
✅ Used in page.tsx, API routes, and server actions.

🔁 Auto-Selector Helper — lib/supabase.ts
ts

import { getSupabaseBrowserClient } from "@/lib/client";
import { getSupabaseServerClient } from "@/lib/server";

export function getSupabaseClient() {
  if (typeof window === "undefined") return getSupabaseServerClient();
  return getSupabaseBrowserClient();
}
✅ Lets you safely call getSupabaseClient() anywhere — it auto-selects the correct runtime.

🔐 Environment Variables
Ensure these are defined in .env.local:

ini

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional, server-only)
The SERVICE_ROLE_KEY is never used client-side and should stay private.

🧪 Testing
You can verify the server client by hitting this endpoint:

ts

// app/api/test/route.ts
import { getSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("martech_stack").select("tool_name").limit(3);
  return NextResponse.json(data);
}

🚀 Benefits
✅ Fully compatible with Vercel Edge Runtime
✅ No “window is not defined” hydration errors
✅ One-line Supabase access with getSupabaseClient()
✅ Demonstrates clean separation of concerns for SSR/CSR

Maintained as part of the Work In Prod Next.js 16 + Supabase demo architecture.