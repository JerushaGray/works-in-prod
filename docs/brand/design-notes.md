# 🎨 Design Notes

> *Design is a system for thinking clearly under load.*

These notes document the design philosophy, structure, and decision logic behind **Works in Prod** —  
how form supports function, and how modern martech design can reflect operational reliability.

---

## 🧠 Design Philosophy

| Principle                   | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| **Clarity over cleverness** | Every visual element earns its place. If it doesn't clarify, it's removed. |
| **Functional calm**         | The interface should lower cognitive load, not add decoration.             |
| **Signal, not noise**       | Each metric, color, and motion communicates system state.                  |
| **Humor in the margins**    | Playfulness appears in microcopy — not in layout or color.                 |

> "A calm UI makes even chaos look intentional."

---

## 🧩 Visual Language

| Element            | Role                                                | Notes                                                                      |
| ------------------ | --------------------------------------------------- | -------------------------------------------------------------------------- |
| **Palette**        | Purple + Lime primary, with neutral grays.          | Purple = sophistication/depth, Lime = energy/growth, Navy = calm foundation. |
| **Typography**     | Manrope (headings), Inter (body), high legibility.  | Manrope adds modern geometric edge; Inter for readable body text.          |
| **Icons & Emojis** | Sparse, purposeful.                                 | Used to add human tone — not decoration.                                   |
| **Spacing**        | Generous line-height and padding.                   | Reduces cognitive density and improves scanability.                        |
| **Motion**         | Minimal, intentional (fade, slide).                 | Used for transitions, not attention-grabs.                                 |

### 🎨 Color System

| Color    | Hex       | Usage                                                  |
| -------- | --------- | ------------------------------------------------------ |
| **Lime** | `#84CC16` | Primary brand, CTAs, success states, growth metrics    |
| **Purple** | `#9333EA` | Secondary actions, links, interactive elements, accents |
| **Navy**   | `#0F172A` | Dark mode backgrounds, grounding element              |
| **Slate**  | `#1E293B` | Elevated surfaces, cards                              |
| **Gray**   | Various   | Text hierarchy, borders, subtle backgrounds           |

### 📊 Status Colors

Since lime is the primary brand color, status indicators use:

| Status    | Color         | Usage                                    |
| --------- | ------------- | ---------------------------------------- |
| ✅ Success | Lime `#84CC16` | System healthy, operations nominal      |
| ⚠️ Warning | Amber `#F59E0B` | Drift detected, attention needed       |
| 🔴 Error   | Red `#DC2626`   | System failure, immediate action       |
| 💜 Active  | Purple `#9333EA` | Interactive/selected states           |

---

## 🧭 Layout Structure

### 1. **Home / Landing**
- Hero: project tagline + quick links to Stack Dashboard and About.  
- Visual weight: 70% whitespace, 30% content.  
- Purpose: introduce clarity and tone before interaction.
- Brand colors: Purple accents on light backgrounds, lime CTAs.

### 2. **Stack Dashboard**
- Two-column grid:
  - Left: Stack Inventory (table view).  
  - Right: Metrics cards and trend charts.  
- Top bar: "System Health" summary with small humor quip.  
- Live health indicators: lime = stable, amber = drift, red = fail.
- Dark mode: Navy backgrounds with purple/lime highlights.

### 3. **Ops Feed**
- Simple chronological list of heartbeats (timestamp + message).  
- Includes subtle icons or emojis to humanize status (✅ / ⚠️ / 💀).  
- Scroll anchored to latest entry for real-time feel.
- Success events use lime accent, warnings use amber.

### 4. **About Page**
- One-column layout for maximum readability.  
- Features quote block ("I build systems that work — at least once.")  
- Links to portfolio, resume, and PRD.  
- Feels like documentation, reads like narrative.
- Purple gradient on hero text for brand moment.

### 5. **Labs**
- Sandbox area for future experiments and prototypes.  
- Placeholder cards styled as disabled components ("coming soon").  
- Design echoes the dashboard for visual continuity.
- Purple borders for experimental/beta features.

---

## 🧱 Components

| Component                  | Purpose                                    | Design Note                                            |
| -------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| **Metric Card**            | Displays uptime, latency, or health score. | White/navy background, lime accents for positive metrics. |
| **Health Badge**           | Single color-coded dot + text label.       | Lime = healthy, amber = warning, red = error. |
| **Trend Chart (Recharts)** | 24-hour rolling health snapshot.           | Lime line for positive trends, purple for secondary data. |
| **Ops Log Entry**          | Timestamped event text.                    | Mimics real console output with personality.           |
| **CTA Button**             | Primary action button.                     | Lime background, navy text, purple hover.              |
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

- **Color contrast** meets WCAG AA standards:
  - Purple (#9333EA) on white: 8.59:1 ✅
  - Lime (#84CC16) on navy: 5.41:1 ✅
- **Keyboard navigation** supported for all major UI elements.  
- **Focus states** use purple borders for consistency with brand.  
- **Screen reader labels** mirror visual content.  
- **Motion reduced** under prefers-reduced-motion settings.  

> "Calm systems are inclusive systems."

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
| `h1`         | 🧠 Works in Prod       | Manrope bold, used once per page.         |
| `h2`         | 🚀 Overview            | Manrope semibold, major section headers.   |
| `h3`         | Sub-sections          | Inter semibold for detail blocks.          |
| `blockquote` | > "It works in prod." | Adds tone; purple left border accent.      |
| `code`       | `metrics(check_time)` | Indicates system logic or schema elements. |

---

## 🎨 Dark Mode Strategy

- **Backgrounds:** Navy (`#0F172A`) base, Slate (`#1E293B`) for cards
- **Text:** White/gray scale for hierarchy
- **Accents:** Lime and purple maintain brand consistency
- **Borders:** Subtle slate (`#334155`) for definition without harshness

---

## ✨ Design Ethos Summary

> **The UI should feel like a modern martech tool built by someone who understands ops reliability.**  
> Every layout choice communicates calm competence with energetic purpose.  
> Every interaction reassures rather than demands attention.

The purple/lime palette bridges analytical depth with growth-focused energy —  
professional enough for enterprise, distinctive enough for portfolio impact.

---

> *Design quietly. Ship confidently. Let clarity do the talking.*  
> — **Jerusha Gray**
