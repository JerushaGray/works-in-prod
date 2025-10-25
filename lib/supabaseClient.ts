import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Reusable client for client-side calls
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Named export for compatibility
export function createClient() {
  return supabase;
}
