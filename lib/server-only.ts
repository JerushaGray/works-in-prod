"use server"; // ✅ Ensures this file is treated as server-only

import { createServerClient, type SupabaseClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * ✅ Creates and caches a Supabase client for server-side use.
 *
 * This module must never be imported directly into a Client Component.
 * It's safe for:
 *   - Server Components (RSC)
 *   - Server Actions
 *   - Route Handlers
 *
 * ❌ Not safe for:
 *   - Client Components
 *   - useEffect, useState, or browser runtime contexts
 */
let serverClient: SupabaseClient<Database> | null = null;

export async function getSupabaseServerClient(): Promise<SupabaseClient<Database>> {
  if (serverClient) return serverClient;

  const cookieStore = cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "❌ Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  // ✅ Create server-side Supabase client
  serverClient = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Safe to ignore: Server Components can’t mutate cookies directly
        }
      },
    },
  });

  return serverClient;
}
