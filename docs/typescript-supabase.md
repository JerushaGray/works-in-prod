# TypeScript + Supabase Integration — Work In Prod

This document outlines how **Work In Prod** implements a fully type-safe integration between **Supabase** and **TypeScript** to ensure reliability, autocompletion, and build-time schema validation.

---

## 🧠 Overview

The project uses Supabase's official CLI to generate TypeScript definitions from the live database schema. These definitions provide static typing for all Supabase queries in both **server** and **client** contexts.

```bash
supabase gen types typescript --project-id ljfkzsfkehqwvzkebwgr > types/database.types.ts
```

This creates `types/database.types.ts` — a single source of truth for the database schema.

---

## ⚙️ Folder Structure

```
lib/
  client.ts            → Browser Supabase client (uses createBrowserClient)
  server.ts            → Server Supabase client (uses createServerClient)
types/
  database.types.ts    → Auto-generated Supabase schema (typed)
```

---

## 🧩 Type Integration

### Client — `lib/client.ts`

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
```

### Server — `lib/server.ts`

```ts
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
```

---

## 🧱 Benefits

| Feature                | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| 🧠 **Type Safety**     | Compile-time validation for all Supabase queries         |
| 🧩 **Autocompletion**  | VS Code IntelliSense for table names, columns, and views |
| ⚡ **Error Prevention** | Catches schema mismatches before build or deploy         |
| 🧰 **Consistency**     | Shared Database type used across all client contexts     |

---

## 🧪 Example Usage

### Typed Query Example

```ts
import type { Database } from "@/types/database.types";
const supabase = getSupabaseBrowserClient();

const { data, error } = await supabase
  .from("martech_stack")
  .select("tool_name, status")
  .returns<Database["public"]["Tables"]["martech_stack"]["Row"][]>();
```

This ensures that every field returned matches the database schema, providing complete compile-time safety.

---

## 🔄 Regenerating Types

When the Supabase schema changes:

```bash
npm run gen:types
```

Add this to `package.json` for convenience:

```json
"scripts": {
  "gen:types": "supabase gen types typescript --project-id ljfkzsfkehqwvzkebwgr > types/database.types.ts"
}
```

---

## ✅ Summary

| Step                       | Purpose                                                |
| -------------------------- | ------------------------------------------------------ |
| Generate Types             | Creates `types/database.types.ts` from Supabase schema |
| Import Database Type       | Used in both server and client Supabase clients        |
| Apply `<Database>` Generic | Ensures all queries are type-checked                   |
| Regenerate as Needed       | Keeps schema in sync with Supabase changes             |

This setup guarantees that **Work In Prod** remains type-safe, maintainable, and aligned with modern Supabase + Next.js best practices.
