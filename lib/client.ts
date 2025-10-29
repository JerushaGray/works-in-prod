// /lib/client.ts
import { createBrowserClient, type SupabaseClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

/**
 * Singleton browser Supabase client.
 * Safe to call multiple times in client components.
 */
let browserClient: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error(
        "Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    }

    browserClient = createBrowserClient<Database>(url, anonKey);
  }

  return browserClient;
}
