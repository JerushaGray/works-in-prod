import { getSupabaseBrowserClient } from "@/lib/client";
import { getSupabaseServerClient } from "@/lib/server";

/**
 * Returns the appropriate Supabase client depending on environment.
 * Safe for both server and client usage.
 */
export function getSupabaseClient() {
  if (typeof window === "undefined") {
    return getSupabaseServerClient();
  }
  return getSupabaseBrowserClient();
}
