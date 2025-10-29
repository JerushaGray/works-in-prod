Updated Context

Project Name: Work In Prod
Purpose: Portfolio artifact to demonstrate production-quality full-stack marketing operations tooling — ready for Vercel review.

Tech Stack:

Next.js 16 (App Router + TypeScript)
Supabase (database + auth)
TailwindCSS
shadcn/ui
Recharts
Framer Motion

Recommended File Plan for Your README Work
File	Purpose
/README.md	The main, public-facing README (leave as-is for now until you ship)
/docs/readme-draft.md	The new draft you’ll update over time — this will replace /README.md right before launch
/docs/supabase-setup.md	The detailed Supabase architecture doc we just created
/docs/compatibility-audit.md	(optional) The compatibility audit you already have — rename from “GetFunnelCaked” if you like

Proposed New Draft Template

Here’s a starter for your new /docs/readme-draft.md tailored to Work In Prod 👇

# Work In Prod — Marketing Operations Dashboard

A modern, production-quality demo app built with **Next.js 16**, **Supabase**, and **shadcn/ui** — designed as a portfolio artifact to demonstrate operational analytics, UI precision, and scalable architecture for marketing operations.

---

## Tech Stack

| Layer     | Tool                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router + TypeScript)                   |
| Database  | [Supabase](https://supabase.com/)                                             |
| Styling   | [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Charts    | [Recharts](https://recharts.org/)                                             |
| Animation | [Framer Motion](https://www.framer.com/motion/)                               |
| Hosting   | [Vercel](https://vercel.com/)                                                 |

---

## Core Features

- **Dynamic Charting:** Recharts integrated with smooth client hydration and Framer Motion fade-in transitions.  
- **Smart Supabase Context:** Separate server and browser clients for reliable SSR/CSR operation on Vercel.  
- **Type-Safe Queries:** Auto-generated Supabase types for strict compile-time safety.  
- **Polished UI:** Responsive, accessible, and consistent visual design with purple (`#9333ea`) and green (`#84cc16`) accents.  
- **Secure Environment Separation:** Server and client keys isolated for predictable behavior in Next.js App Router.  

---

## Local Setup

```bash
git clone https://github.com/YOUR-USERNAME/work-in-prod.git
cd work-in-prod
npm install
cp .env.example .env.local
npm run dev

Then open http://localhost:3000
.

Environment Variables
Create a .env.local file in the root:
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (server only)

Supabase Setup
This project uses a dual-client pattern optimized for Next.js 16 SSR + CSR.
See /docs/supabase-setup.md
 for a full explanation.

Key Components
app/dashboard/DashboardClientPage.tsx – Main dashboard logic
app/components/charts/revenue-chart.tsx – Client-only Recharts component with smooth hydration
lib/supabase.ts – Auto-selects server or browser Supabase client
lib/server.ts – SSR-safe Supabase client
lib/client.ts – Browser-only Supabase client

For details on how this project maintains clean Server/Client separation in Next.js 16,
see [App Router Boundaries](./app-router-boundaries.md).

For details on how this project implements type-safe Supabase integration with TypeScript,
see [TypeScript + Supabase Integration](./typescript-supabase.md).

## 📜 Version History

For a detailed history of updates and milestones, see [CHANGELOG](../CHANGELOG.md).



Roadmap

 Add role-based Supabase Auth demo
 Include mock API route to demonstrate server actions
 Add animated onboarding tour for marketing operations team workflows

🧾 License
MIT © 2025 Your Name
Developed as part of the Work In Prod portfolio series.