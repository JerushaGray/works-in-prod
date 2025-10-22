# 🧠 Works in Prod

> *A dashboard, a philosophy, and a joke that got serious.*

**Works in Prod** is a living, self-updating MarTech-ops observability demo and personal portfolio project by **Jerusha Gray**.  
It proves that clarity, governance, and humor can coexist in production.

🔗 **Live Site:** [https://worksinprod.com](https://worksinprod.com)  
📄 **Docs:** [/docs/index.md](./docs/index.md) — includes [PRD_v1.2.md](./docs/PRD_v1.2.md)



---

## 🚀 Overview

Built with **Next.js**, **Supabase**, and **Vercel**, Works in Prod simulates the health of a marketing-tech stack — uptime, latency, and data quality — through automated hourly *heartbeats*.  
It started as an inside joke (*“It works in prod”*) and became a statement about real-world systems: imperfect, functional, and still standing.

---

## 🧩 Core Features

| Feature              | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| **Stack Tracker**    | Inventory of mock MarTech tools, owners, and integrations.      |
| **Health Dashboard** | Displays health, latency, and uptime metrics that drift hourly. |
| **Ops Feed**         | Real-time log of heartbeat runs with a touch of dry humor.      |
| **Governance Logic** | Auto-cleanup of old data and trend aggregation for charts.      |
| **About Page**       | Personal ethos and links — the human behind the system.         |

---

## 🏗️ Architecture


Vercel (Next.js 14 + TailwindCSS)
↓ read/write
Supabase (Postgres)
├─ tables: tools · metrics · heartbeat_log
├─ views: tool_health_trends · heartbeat_recent
├─ trigger: purge_old_metrics() → deletes >7 days
└─ Edge Function: heartbeat → hourly data drift


**Heartbeat cycle**
1. Cron triggers hourly  
2. Supabase Edge Function jitters metric values  
3. Inserts new metrics + updates tool records  
4. Writes summary to `heartbeat_log`  
5. Trigger purges old metrics  

---

## 🧠 Philosophy

> *“I build systems that work — at least once.”*

This project embodies that ethos:  
Ship it, test it, learn why it worked, and document everything.  
The humor isn’t decoration — it’s commentary on operational reality.

---

## 🧰 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Recharts](https://recharts.org/)
- [React Flow](https://reactflow.dev/)

---

## ⚙️ Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/jerusha-gray/works-in-prod.git
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

📊 Data Schema (Simplified)
| Table           | Purpose                                    |
| --------------- | ------------------------------------------ |
| `tools`         | Stores mock MarTech stack inventory.       |
| `metrics`       | Tracks hourly health, latency, and uptime. |
| `heartbeat_log` | Records each cron run and summary.         |
| `views`         | Aggregates trends and recent logs.         |
| `trigger`       | Cleans metrics older than 7 days.          |

🧭 Roadmap
| Phase    | Focus                          | Key Additions                        |
| -------- | ------------------------------ | ------------------------------------ |
| **v0.1** | MVP live dashboard             | Stack tracker · heartbeat · Ops Feed |
| **v0.2** | Data editing + realtime trends | CRUD · sparklines                    |
| **v1.0** | Full portfolio hub             | Playbooks · Writing · Contact        |

| Context     | Text                                 |
| ----------- | ------------------------------------ |
| Loading     | “Deploying good intentions…”         |
| Success     | “Stable (ish).”                      |
| Empty State | “Suspiciously quiet.”                |
| Footer      | “Last checked: still works in prod.” |

💬 Sample Microcopy
| Context     | Text                                 |
| ----------- | ------------------------------------ |
| Loading     | “Deploying good intentions…”         |
| Success     | “Stable (ish).”                      |
| Empty State | “Suspiciously quiet.”                |
| Footer      | “Last checked: still works in prod.” |

🧱 Project Structure
works-in-prod/
├── pages/
│   ├── index.tsx          # Landing
│   ├── stack.tsx          # Main dashboard
│   ├── about.tsx          # Bio & ethos
│   └── api/
│       ├── tools.ts       # Fetch tool data
│       └── heartbeat.ts   # (optional) Manual trigger
├── lib/supabaseClient.js
├── public/
├── docs/
│   ├── PRD_v1.2.md
│   └── schema.sql
├── LICENSE
└── README.md

🧩 License

Released under the MIT License
 © 2025 Jerusha Gray.
Use, learn, and adapt freely — just give credit and don’t sue.

✨ Acknowledgments

The dev/ops community that keeps things running “in prod.”

Vercel
 + Supabase
 for making it absurdly easy to ship experiments.

Everyone who has ever said, “It’s fine, it works in prod.”

Ship it. Test it. Watch it work (at least once).
