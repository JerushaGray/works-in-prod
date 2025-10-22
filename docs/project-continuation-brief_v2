# 🧠 Works in Prod — Continuation Brief v2.0

> *A dashboard, a philosophy, and a joke that got serious.*

---

## 1️⃣ Project Overview

**Project Name:** Works in Prod  
**Creator:** Jerusha Gray  
**Domains:**  
- **worksinprod.com** → primary portfolio hub  
- **worksinprod.app** → live project instance (demo environment)

**Tagline:**  
> *“I build systems that work — at least once.”*

---

## 2️⃣ Concept & Philosophy

**Works in Prod** is a *live metaphor for operational systems*.  
It’s a MarTech-ops observability app that simulates how tools, data, and governance perform over time — but it’s also a statement about *resilience, clarity, and imperfection in production systems.*

At its core, it explores the tension between:
- **Ideal governance** (clean, compliant, observable)  
- **Operational reality** (messy, reactive, still somehow working)

### Conceptual spine
> The project began as a joke — “well, it works in prod” — but evolved into a commentary on the beauty and absurdity of systems that hold together through care and improvisation.

**The humor is not sarcasm; it’s empathy.**  
Every “heartbeat” is a nod to the operators, analysts, and marketers who keep systems alive long enough to make them better.

---

## 3️⃣ Current Technical State

### ✅ Hosting & Repo
- Hosted on **Vercel** → [https://works-in-prod.vercel.app](https://works-in-prod.vercel.app)  
- Source control → [GitHub Repo](https://github.com/JerushaGray/works-in-prod)  
- Connected to **Supabase project** (via GitHub integration)  
  - Direct deployment sync  
  - Migrations and schema versioning available

### ✅ Stack Summary
| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | Next.js 16 (TypeScript) | App structure, routing, API endpoints |
| **Styling** | Tailwind CSS + PostCSS (`@tailwindcss/postcss`) | Utility-first design system |
| **Backend** | Supabase (PostgreSQL + Edge Functions) | Metrics, logs, and trigger automation |
| **Hosting** | Vercel | Build + deploy pipeline |
| **Data Flow** | Supabase Client SDK | Realtime read/write + hourly drift generation |

---

## 4️⃣ Architecture & Governance

### 🩺 Heartbeat Architecture
Each hour, the `/api/heartbeat` route:
1. Queries existing tools from Supabase  
2. Applies randomized drift (“jitter”) to their metrics  
3. Inserts new rows into `metrics`  
4. Updates `tools` with the new baseline  
5. Logs the run summary in `heartbeat_log`  
6. Triggers a cleanup function to delete metrics older than 7 days

### ⚙️ Governance Philosophy
**Works in Prod** treats system hygiene as a metaphor for operational governance:

| Concept | System Analogue |
|----------|------------------|
| Hourly heartbeat | Continuous monitoring & reporting |
| 7-day retention policy | Governance & data minimization |
| Schema drift | Natural entropy in martech stacks |
| Cleanup triggers | Preventive governance design |
| Heartbeat logs | Evidence of operational continuity |

---

## 5️⃣ Database Schema (Supabase)

✅ **Supabase integrated with GitHub repo**  
→ versioned schema, environment-linked secrets, and potential for future migrations.

### Core Tables
```sql
-- Tools
id uuid pk
name text
category text
owner text
current_health numeric(5,2)
current_latency_ms integer
updated_at timestamptz

-- Metrics
id uuid pk
tool_id uuid fk -> tools.id
check_time timestamptz
health_score numeric(5,2)
latency_ms integer
uptime_pct numeric(5,2)
notes text

-- Heartbeat Log
id uuid pk
run_time timestamptz
updated_tools integer
inserted_metrics integer
duration_ms integer
status text
message text
```

### Views & Functions
- **`heartbeat_recent`** → last 10 heartbeat runs  
- **`tool_health_trends`** → aggregates avg health, latency, uptime  
- **`purge_old_metrics()`** → deletes metrics > 7 days old  
- **Trigger:** `purge_old_metrics_trigger` runs after each insert into `metrics`

---

## 6️⃣ Design System & Visual Philosophy

**Tone:** Calm · Competent · Wryly self-aware  
**Palette:**  
- Neutral grayscale base (`zinc`, `slate`, `black`)  
- Accent: success green (`#00D26A`)  
- Warnings: amber + red for state signals

**Typography:** Geist Sans + Geist Mono  
**Layout:** Modular grid, data-first, dashboard aesthetic  
**Microcopy Style:** Deadpan humor layered with empathy.

**Examples:**
- Loading → “Deploying good intentions…”  
- Success → “Stable (ish).”  
- Empty → “Suspiciously quiet.”  
- Footer → “Last checked: still works in prod.”

---

## 7️⃣ Experience Flow

### 🧭 User Flow
1. **Home:** Project headline + link to dashboard  
2. **Stack Tracker:** Lists mock MarTech tools and owners  
3. **Dashboard:** Visual health metrics & latency trends  
4. **Ops Feed:** Running heartbeat logs with timestamps + humor  
5. **About:** Ethos, author bio, links to worksinprod.com

### 📊 Interaction
- Hover for detailed metric trends (Recharts integration planned)  
- Auto-refresh every hour to simulate uptime drift  
- Ops feed updates live (via Supabase realtime subscription)  

---

## 8️⃣ Narrative & Brand Positioning

### Narrative Arc
1. **The Joke:** It “works in prod” — ironic phrase about shaky systems that somehow hold up  
2. **The Truth:** Real systems *do* run like this — imperfect, patched, monitored  
3. **The Build:** A system that embraces imperfection as insight  
4. **The Reflection:** A meta-commentary on how marketing operations and human systems mirror each other

### Emotional Intent
> “Works in Prod” isn’t cynical — it’s compassionate. It celebrates imperfection as evidence of persistence.

---

## 9️⃣ Next Build Steps

| Priority | Task | Description |
|-----------|------|--------------|
| 🔥 | Finalize Supabase schema | Run SQL (provided above) via integrated migration |
| 🔧 | Seed mock `tools` data | HubSpot, Salesforce, Marketo, GA4, Zapier, etc. |
| 🧩 | Test `/api/heartbeat` | Verify insertions + logging via dashboard |
| 🌐 | Link worksinprod.app | Add as primary domain in Vercel |
| 🖥️ | Build `/stack` UI | Basic table + sparkline view |
| ⚙️ | Enable Supabase Cron | Hourly POST to `/api/heartbeat` |
| 📄 | Update README + docs | Reflect Supabase integration and live URLs |

---

## 🔮 Future Extensions

| Concept | Description |
|----------|--------------|
| **Labs View** | Experimental MarTech metrics visualizations |
| **Real Integrations** | Optional API pulls (GA4, HubSpot, Notion) |
| **Auth Layer** | Admin access for adding tools / viewing logs |
| **Custom Webhooks** | Tie heartbeat events to Vercel analytics |
| **Portfolio Hub Sync** | Auto-update a “Recently Alive Systems” section on worksinprod.com |

---

## 🧬 System Philosophy Summary

| System Trait | Metaphor |
|---------------|----------|
| Self-updating | Adaptive governance |
| Drift + cleanup | Entropy + resilience |
| Logs | Memory + accountability |
| Humor | Humanity in complexity |
| “Works in prod” | Acceptance + clarity |

---

## 📚 Source Artifacts

| File | Purpose |
|------|----------|
| `README.md` | Public overview + ethos |
| `/docs/PRD_v1.2.md` | Product requirements document |
| `/docs/index.md` | Documentation hub |
| `/docs/tone-guide.md` | Tone + style module |
| `/pages/api/heartbeat.ts` | Primary backend logic |
| `/docs/Project_Continuation_Brief_v2.md` | This document |

---

## 10️⃣ Continuation Goal

From here, the next session should:

1. Verify Supabase schema creation via integrated migration.  
2. Seed initial `tools` table data.  
3. Test `/api/heartbeat` (expect live insertions + `ok:true` response).  
4. Begin scaffolding `/stack.tsx` for dashboard view.  
5. Link `worksinprod.app` as a primary Vercel domain.  
6. Draft content for `/about` page (tone-driven, narrative reflection).

---

## 🧠 Prompt for Next Chat

> “Here’s the full continuation brief for *Works in Prod*, a live MarTech-ops observability app by Jerusha Gray.  
> The Supabase project is already integrated with the GitHub repo.  
> Please pick up from Section 10 (Continuation Goal) and help me:  
> 1️⃣ Verify the schema via migration,  
> 2️⃣ Seed mock tool data,  
> 3️⃣ Test the heartbeat endpoint,  
> 4️⃣ Begin building the stack dashboard page layout.”
