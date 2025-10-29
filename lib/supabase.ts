// /lib/supabase.ts
import { getSupabaseBrowserClient } from "@/lib/client";

/**
 * 🧠 Universal Supabase client loader (Next.js 16 safe)
 *
 * - Uses the browser client when running in the browser.
 * - Dynamically loads the server-only client at runtime on the server.
 * - Never statically imports "next/headers" (Turbopack-safe).
 */
export function getSupabaseClient() {
  if (typeof window === "undefined") {
    // ✅ Lazy runtime-only import (not bundled into client)
    const loadServerClient = () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { getSupabaseServerClient } = require("./server-only");
      return getSupabaseServerClient();
    };
    return loadServerClient();
  }

  // ✅ Browser-side client
  return getSupabaseBrowserClient();
}

/**
 * Stable cached browser client
 * Prevents re-instantiation during hydration or re-render.
 */
let cachedClient: ReturnType<typeof getSupabaseBrowserClient> | null = null;

export function getStableSupabaseClient() {
  if (typeof window === "undefined") {
    const loadServerClient = () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { getSupabaseServerClient } = require("./server-only");
      return getSupabaseServerClient();
    };
    return loadServerClient();
  }

  if (!cachedClient) {
    cachedClient = getSupabaseBrowserClient();
  }
  return cachedClient;
}
