# Works in Prod

[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-black.svg)](https://worksinprod.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Works in Prod** is a living, self-updating MarTech-ops observability demo and personal portfolio project by **Jerusha Gray**.
It proves that clarity, governance, and humor can coexist in production.

**Live site:** [worksinprod.app](https://worksinprod.app/) · **Docs:** [/docs/index.md](./docs/index.md) · **PRD:** [PRD_v1.2.md](./docs/PRD_v1.2.md)

## What it does

| Feature              | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| **Stack Tracker**    | Inventory of mock MarTech tools, owners, and integrations.      |
| **Health Dashboard** | Displays health, latency, and uptime metrics that drift hourly. |
| **Ops Feed**         | Real-time log of heartbeat runs with a touch of dry humor.      |
| **Governance Logic** | Auto-cleanup of old data and trend aggregation for charts.      |
| **About Page**       | Personal ethos and links — the human behind the system.         |

## Quick start

```bash
# 1. Clone the repo
git clone https://github.com/JerushaGray/works-in-prod.git
cd works-in-prod

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Add your Supabase URL and anon key

# 4. Run locally
npm run dev
# Visit http://localhost:3000

# 5. Deploy to Vercel
vercel deploy
```

## How it works

```
Vercel (Next.js 16 + TailwindCSS)
↓ read/write
Supabase (Postgres)
├─ tables: see Data Schema below
├─ views: tool_health_trends · heartbeat_recent
├─ trigger: purge_old_metrics() → deletes >7 days
└─ API route: /api/heartbeat → hourly data drift
```

### Heartbeat cycle

1. Cron triggers hourly
2. Next.js route handler jitters metric values
3. Inserts new metrics + updates tool records
4. Writes summary to `heartbeat_log`
5. Trigger purges old metrics

## Tech stack

- [Next.js 16](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Recharts](https://recharts.org/)

## Data schema

| Table                      | Purpose                                                              |
| -------------------------- | -------------------------------------------------------------------- |
| `tools_index`              | Static catalog of MarTech tools — vendor, category, and description. |
| `martech_stack`            | Active tool records with health score, seat counts, and utilization. |
| `stack_tracker`            | Governance metadata: ownership, cost, contracts, and compliance.     |
| `stack_services`           | Live service health — uptime, response time, status, last heartbeat. |
| `tool_performance_metrics` | Historical performance metrics per tool.                             |
| `stack_audit_log`          | Audit trail of metric drift and changes per heartbeat run.           |
| `heartbeat_log`            | Summary of each heartbeat run — status, timing, and averages.        |

## Roadmap

| Phase        | Focus                        | Key Additions                        |
| ------------ | ---------------------------- | ------------------------------------ |
| ~~v0.1~~     | MVP live dashboard           | Stack tracker · heartbeat · Ops Feed |
| ~~v0.8~~     | Stability + App Router       | RSC migration · drawer · animations  |
| **v0.9** ✓   | Repo cleanup + normalization | kebab-case · dead asset removal      |
| **v1.0**     | Full portfolio hub           | Playbooks · Writing · Contact        |

## Sample microcopy

| Context     | Text                                 |
| ----------- | ------------------------------------ |
| Loading     | "Deploying good intentions…"         |
| Success     | "Stable (ish)."                      |
| Empty State | "Suspiciously quiet."                |
| Footer      | "Last checked: still works in prod." |

## Project structure

```text
works-in-prod/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home
│   ├── about/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── dashboard-client-page.tsx
│   └── api/
│       └── heartbeat/
│           └── route.ts              # Manual trigger / cron target
├── lib/                              # Supabase clients + utilities
├── public/
├── docs/
│   └── PRD_v1.2.md
├── LICENSE
└── README.md
```

## License

[MIT](LICENSE)

## Author

**Jerusha Gray** — Marketing Operations, MarTech, and Data Strategy

*Ship it. Test it. Watch it work (at least once).*
