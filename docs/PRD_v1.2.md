# 🧠 Product Requirements Document — v1.2

**Product:** Works in Prod  
**Owner:** Jerusha Gray  **Status:** MVP Draft  
**Updated:** 2025-10-22  

---

## 1 · Product Overview

**Works in Prod** is a live MarTech-operations observability app and personal portfolio hub.  
It proves that clarity, governance, and humor can coexist in production.  

**Tagline →** “I build systems that work — at least once.”  

Built with **Next.js**, **Supabase**, and **Vercel**, it demonstrates systems thinking, reliability, and personality through a self-updating dashboard of mock marketing-stack health.

---

## 2 · Objectives & Audience

| Goal                                                         | Metric                          | Audience                |
| ------------------------------------------------------------ | ------------------------------- | ----------------------- |
| Demonstrate operational clarity and dry wit in a working app | Recruiter dwell > 30 s          | Hiring Managers / Peers |
| Show realistic, autonomous telemetry                         | Heartbeat success ≥ 90 %        | Technical Marketers     |
| Maintain a living portfolio base                             | ≥ 2 future prototypes on domain | Jerusha Gray            |

---

## 3 · Scope

### ✅ In Scope (v0.1)
- Stack inventory + integration map  
- Hourly metric drift via Supabase heartbeat  
- Ops Feed (log of runs + humor)  
- About page with ethos and links  
- Responsive UI deployed to [worksinprod.com](https://worksinprod.com)

### 🚫 Out of Scope
Auth, live vendor APIs, multi-user features.

---

## 4 · Brand Voice & Tone

> “Clarity only matters if it survives production.”

**Voice:** calm · competent · wryly self-aware  
**Humor:** appears in microcopy (loading states, footers) only  
**Visual:** neutral palette + success-green accents  

**Sample Microcopy**
- “Deploying good intentions…”  
- “Stable (ish).”  
- “Last checked: still works in prod.”

---

## 5 · User Experience

**Flow:**  
`Home → Stack Dashboard → Ops Feed → About → Labs (placeholder)`

**Key Actions**
- View stack table and integration graph  
- Observe metrics (health, latency, uptime)  
- Check Ops Feed for hourly logs  
- Read About for ethos + links  

**UX Principles:** clarity first, humor second, minimal friction.

---

## 6 · System Architecture
Vercel (Next.js 16 + Tailwind)
↓ read
Supabase (Postgres)
├─ tables: tools · metrics · heartbeat_log
├─ views: tool_health_trends · heartbeat_recent
├─ trigger: purge_old_metrics() → deletes >7 days
└─ Edge Function 'heartbeat' → hourly metric drift


### 🩺 Heartbeat Cycle
1. Cron runs hourly.  
2. Function jitters tool health ± 3 pts & latency ± 300 ms.  
3. Writes metrics rows + updates tools.  
4. Logs run summary in `heartbeat_log`.  
5. Trigger cleans old metrics.

---

## 7 · Governance & Maintenance

| Function       | Mechanism                                         |
| -------------- | ------------------------------------------------- |
| Health updates | Supabase Edge Function + hourly cron              |
| Data cleanup   | 7-day retention trigger                           |
| Visibility     | `heartbeat_recent` view + Ops Feed                |
| Error handling | `status` column in log + UI icon                  |
| Indexing       | `metrics(check_time)` · `heartbeat_log(run_time)` |

---

## 8 · Roadmap & Delivery

| Phase          | Goal                        | Highlights                    |
| -------------- | --------------------------- | ----------------------------- |
| **v0.1 (MVP)** | Ship live demo              | Current scope                 |
| **v0.2**       | Add CRUD + trend sparklines | Realtime Supabase sync        |
| **v1.0**       | Portfolio hub               | Playbooks · Writing · Contact |

### ✅ Deployment Checklist
- Domain ↔ Vercel connected  
- Supabase schema & heartbeat live  
- Dashboard + Ops Feed working  
- About page complete  
- README + PRD in `/docs`

---

## 9 · Risks & Mitigations

| Risk          | Impact           | Mitigation                            |
| ------------- | ---------------- | ------------------------------------- |
| Cron failure  | Stale data       | Monitor `heartbeat_log`, manual rerun |
| Humor misread | Minor brand risk | Maintain clean aesthetic              |
| DB bloat      | Performance      | 7-day purge trigger                   |

---

## 10 · Summary

**Works in Prod** is a living demonstration that functional systems, good design, and dry humor can share one production environment.  
It’s part app, part manifesto:

> *Ship it, watch it work, learn why it did.*
