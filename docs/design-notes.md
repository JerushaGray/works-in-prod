# 🎨 Design Notes

> *Design is a system for thinking clearly under load.*

These notes document the design philosophy, structure, and decision logic behind **Works in Prod** —  
how form supports function, and how calm design can reflect operational reliability.

---

## 🧠 Design Philosophy

| Principle                   | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| **Clarity over cleverness** | Every visual element earns its place. If it doesn’t clarify, it’s removed. |
| **Functional calm**         | The interface should lower cognitive load, not add decoration.             |
| **Signal, not noise**       | Each metric, color, and motion communicates system state.                  |
| **Humor in the margins**    | Playfulness appears in microcopy — not in layout or color.                 |

> “A calm UI makes even chaos look intentional.”

---

## 🧩 Visual Language

| Element            | Role                                                | Notes                                                                      |
| ------------------ | --------------------------------------------------- | -------------------------------------------------------------------------- |
| **Palette**        | Neutral grays, white, and soft contrast green.      | Mimics system console calm; green = “working,” amber = “uncertain.”        |
| **Typography**     | Sans-serif, high legibility (Inter / system fonts). | Consistent hierarchy: `h1` (section), `h2` (subheading), body text = 16px. |
| **Icons & Emojis** | Sparse, purposeful.                                 | Used to add human tone — not decoration.                                   |
| **Spacing**        | Generous line-height and padding.                   | Reduces cognitive density and improves scanability.                        |
| **Motion**         | Minimal, intentional (fade, slide).                 | Used for transitions, not attention-grabs.                                 |

---

## 🧭 Layout Structure

### 1. **Home / Landing**
- Hero: project tagline + quick links to Stack Dashboard and About.  
- Visual weight: 70% whitespace, 30% content.  
- Purpose: introduce clarity and tone before interaction.

### 2. **Stack Dashboard**
- Two-column grid:
  - Left: Stack Inventory (table view).  
  - Right: Metrics cards and trend charts.  
- Top bar: “System Health” summary with small humor quip.  
- Live health indicators: green = stable, yellow = drift, red = fail.  

### 3. **Ops Feed**
- Simple chronological list of heartbeats (timestamp + message).  
- Includes subtle icons or emojis to humanize status (✅ / ⚠️ / 💀).  
- Scroll anchored to latest entry for real-time feel.

### 4. **About Page**
- One-column layout for maximum readability.  
- Features quote block (“I build systems that work — at least once.”)  
- Links to portfolio, resume, and PRD.  
- Feels like documentation, reads like narrative.

### 5. **Labs**
- Sandbox area for future experiments and prototypes.  
- Placeholder cards styled as disabled components (“coming soon”).  
- Design echoes the dashboard for visual continuity.

---

## 🧱 Components

| Component                  | Purpose                                    | Design Note                                            |
| -------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| **Metric Card**            | Displays uptime, latency, or health score. | Minimal info density, strong contrast for readability. |
| **Health Badge**           | Single color-coded dot + text label.       | One glance = one decision.                             |
| **Trend Chart (Recharts)** | 24-hour rolling health snapshot.           | Light-weight visuals; hover for exact values.          |
| **Ops Log Entry**          | Timestamped event text.                    | Mimics real console output with personality.           |
| **Footer**                 | Small quip + last update timestamp.        | Acts as human heartbeat of the UI.                     |

---

## 🧰 Tools & Frameworks

| Tool            | Use                        | Why                                              |
| --------------- | -------------------------- | ------------------------------------------------ |
| **Next.js 14**  | Frontend + API routes      | Fast builds, easy routing, Vercel-native.        |
| **TailwindCSS** | Styling                    | Utility-first for clarity and scalability.       |
| **Recharts**    | Data visualization         | Lightweight and expressive for trend data.       |
| **Supabase**    | Data + scheduled functions | Easy heartbeat logic + SQL view generation.      |
| **Vercel**      | Hosting + CI/CD            | Deployment simplicity aligns with project ethos. |

---

## 🧩 Accessibility & Usability

- **Color contrast** meets WCAG AA standards (gray text on white, green on neutral).  
- **Keyboard navigation** supported for all major UI elements.  
- **Focus states** use subtle borders, not flashy outlines.  
- **Screen reader labels** mirror visual content.  
- **Motion reduced** under prefers-reduced-motion settings.  

> “Calm systems are inclusive systems.”

---

## 🧱 Responsive Behavior

| Viewport              | Layout Behavior                                   |
| --------------------- | ------------------------------------------------- |
| **Desktop (≥1024px)** | Two-column dashboard, persistent nav.             |
| **Tablet (≥768px)**   | Stacked layout, collapsible sections.             |
| **Mobile (<768px)**   | Vertical scroll, simplified cards, sticky header. |

---

## 🪶 Style Hierarchy

| Element      | Example               | Note                                       |
| ------------ | --------------------- | ------------------------------------------ |
| `h1`         | 🧠 Works in Prod       | Used once per page; acts as visual anchor. |
| `h2`         | 🚀 Overview            | Major section headers.                     |
| `h3`         | Sub-sections          | Used for detail blocks.                    |
| `blockquote` | > “It works in prod.” | Adds tone; not overused.                   |
| `code`       | `metrics(check_time)` | Indicates system logic or schema elements. |

---

## ✨ Design Ethos Summary

> **The UI should feel like an observability tool built by someone who likes people.**  
> Every layout choice communicates calm competence.  
> Every interaction reassures rather than demands attention.

---

> *Design quietly. Ship confidently. Let clarity do the talking.*  
> — **Jerusha Gray**
