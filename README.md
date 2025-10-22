# Works in Prod

> *A dashboard, a philosophy, and a joke that got serious.*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-green?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

##  For Recruiters / Reviewers

**Works in Prod** is a live, instrumented portfolio artifact built by **Jerusha Gray** for roles in **Marketing Operations**, **MarTech**, and **Data Strategy**.

It demonstrates practical skills in:
- Data modeling and automation with **Supabase (Postgres + Cron)**
- **Vercel** API development and deployment
- **Next.js 14 + TypeScript** application structure
- Marketing-ops observability, cost tracking, and data health governance

The system simulates a real MarTech stack — tracking tool uptime, data quality, and cost governance — with real heartbeat-driven metrics and dashboards.

---

##  Overview

**Works in Prod** uses hourly “heartbeat” checks to generate realistic operational data across a simulated MarTech ecosystem.

It’s both a monitoring system and a reflection on the art of keeping complex marketing systems *functional, explainable, and resilient.*

🔗 **Live Site:** [https://worksinprod.app](https://worksinprod.app)  
📄 **Docs:** [`/supabase/migrations`](./supabase/migrations) — schema, migrations, and triggers

---

## Core Features

| Feature | Description |
|----------|--------------|
| **Stack Tracker** | Inventory of MarTech tools, owners, costs, integrations, and renewal dates. |
| **Performance Metrics** | Hourly drift data for uptime, latency, error rates, and sync health. |
| **Heartbeat Log** | Automated hourly runs triggered by Supabase Cron → Vercel API. |
| **Audit Log** | Tracks all configuration or stack changes for governance and traceability. |
| **7-Day Summary Views** | Aggregated averages for uptime, latency, and system stability. |

---

##  Architecture

~~~text
Vercel (Next.js 14 + API Routes)
│
├── /api/heartbeat.ts ← Supabase-connected cron endpoint
│
└─→ Supabase (Postgres)
    ├── tables:
    │   ├── tools_index
    │   ├── stack_tracker
    │   ├── tool_performance_metrics
    │   ├── stack_audit_log
    │   └── heartbeat_log
    ├── views:
    │   ├── tool_performance_summary_7d
    │   ├── martech_stack_overview
    │   └── system_health_overview
    └── cron: works-in-prod-heartbeat → POST /api/heartbeat hourly
~~~

### Heartbeat Cycle

1. Supabase Cron triggers every hour  
2. `/api/heartbeat.ts` in Vercel simulates metric drift  
3. Inserts new rows into `tool_performance_metrics` and updates tool states  
4. Writes status summary to `heartbeat_log`  
5. Supabase views aggregate data for dashboards  
6. Audit logs capture schema and operational changes  

---

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [Supabase (Postgres + Cron)](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## Local Setup

```bash
# 1️⃣ Clone the repo
git clone https://github.com/JerushaGray/works-in-prod.git
cd works-in-prod

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env.local
# Required:
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SECRET_KEY=

# 4️⃣ Run locally
npm run dev
# Visit http://localhost:3000

# 5️⃣ Deploy to Vercel
vercel deploy
```

---

##  Data Schema (Simplified)

| Table / View | Purpose |
|---------------|----------|
| `tools_index` | Canonical list of MarTech tools, vendors, and categories. |
| `stack_tracker` | Ownership, cost, renewal dates, integration status, and SLAs. |
| `tool_performance_metrics` | Hourly time-series metrics (uptime, latency, error %, data freshness). |
| `tool_performance_summary_7d` | Rolling 7-day averages for dashboard visualization. |
| `stack_audit_log` | Historical record of stack and configuration changes. |
| `heartbeat_log` | Execution results from hourly heartbeat jobs. |

---

##  Roadmap

| Phase | Focus | Deliverables |
|--------|--------|--------------|
| **v1.0** | Supabase + API alignment | Heartbeat + audit logs + new schema |
| **v1.1** | Dashboard UI | Vercel v0.app + Supabase queries + charts |
| **v1.2** | Alerts & Governance | Slack / email notifications for renewals and SLA drift |
| **v1.3** | Portfolio Layer | Use cases, documentation, and thought pieces |

---

##  Microcopy (UX Tone)

| Context | Text |
|----------|------|
| Loading | “Deploying good intentions…” |
| Success | “Stable (ish).” |
| Empty | “Suspiciously quiet.” |
| Footer | “Last checked: still works in prod.” |

---

## 📜 License

MIT License © 2025 **Jerusha Gray**  
Use, learn, and adapt freely — just give credit and don’t sue.

---

##  Acknowledgments

- The DevOps and MarTech Ops community for embracing *controlled chaos*  
- **Vercel** and **Supabase** for making experimentation frictionless  
- Everyone who’s ever said: *“It’s fine. It works in prod.”*

---

> *Ship it. Observe it. Laugh about it. Still, it works in prod.*
