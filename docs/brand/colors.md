# Brand System Usage Guide

## Color Palette Overview

### Primary: Lime Green (Brand)
The lime green is your main brand color - energetic, growth-focused, and modern.

**When to use:**
- Primary CTAs and action buttons
- Success states and positive metrics
- Logo and brand moments
- Data highlights showing growth/positive trends
- Active states and selected items

**Shades:**
- `brand-500` (#84CC16) - Main brand color
- `brand-600` (#65A30D) - Hover states on lime buttons
- `brand-400` (#A3E635) - Lighter accents
- `brand-100` (#ECFCCB) - Subtle backgrounds

### Secondary: Purple (Accent)
Purple provides sophistication and works great for interactive elements.

**When to use:**
- Secondary CTAs
- Links and interactive text
- Data visualization (charts, graphs)
- Premium/pro features
- Alternative states and actions

**Shades:**
- `accent-600` (#9333EA) - Main accent color
- `accent-700` (#7E22CE) - Hover states
- `accent-500` (#A855F7) - Lighter interactive elements
- `accent-100` (#F3E8FF) - Subtle backgrounds

### Dark Backgrounds
For dark mode and creating depth.

**Shades:**
- `dark` (#0F172A) - Main dark background
- `dark-100` (#1E293B) - Elevated surfaces (cards, modals)
- `dark-200` (#334155) - Borders and dividers
- `dark-300` (#475569) - Disabled/muted elements

## Typography System

### Font Families

**Manrope (Display/Headings)**
```jsx
className="font-display"
```
- Use for: H1-H4, hero text, key marketing copy
- Weights: 600 (semibold), 700 (bold), 800 (extrabold)

**Inter (Body/UI)**
```jsx
className="font-sans"
```
- Use for: Body text, UI elements, data tables
- Weights: 400 (regular), 500 (medium), 600 (semibold)

### Display Sizes
Pre-configured sizes for large headings:

```jsx
// 72px - Hero headlines
className="text-display-2xl"

// 60px - Section heroes
className="text-display-xl"

// 48px - Page titles
className="text-display-lg"

// 36px - Section headers
className="text-display-md"

// 30px - Card headers
className="text-display-sm"
```

## Component Patterns

### Buttons

**Primary (Lime) - Main actions**
```jsx
<button className="bg-brand-500 hover:bg-brand-600 text-dark font-semibold px-6 py-3 rounded-lg transition-colors">
  Get Started
</button>
```

**Secondary (Purple) - Alternative actions**
```jsx
<button className="bg-accent-600 hover:bg-accent-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
  Learn More
</button>
```

**Outline**
```jsx
<button className="border-2 border-brand-500 text-brand-600 hover:bg-brand-50 font-semibold px-6 py-3 rounded-lg transition-colors">
  View Details
</button>
```

### Cards

**Light Mode**
```jsx
<div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-500 transition-all">
  {/* content */}
</div>
```

**Dark Mode**
```jsx
<div className="bg-dark-100 rounded-xl p-6 border border-dark-200 hover:border-brand-500 transition-all">
  {/* content */}
</div>
```

### Text Hierarchy

```jsx
// Primary text
<p className="text-gray-900 dark:text-white">

// Secondary text
<p className="text-gray-600 dark:text-gray-300">

// Muted text
<p className="text-gray-500 dark:text-gray-400">
```

### Gradients

**Background Gradients**
```jsx
// Lime gradient
className="bg-gradient-brand"

// Purple gradient
className="bg-gradient-accent"

// Combined brand gradient
className="bg-gradient-brand-accent"
```

**Text Gradients**
```jsx
// Lime text gradient
<span className="text-gradient-brand">Highlighted Text</span>

// Purple text gradient
<span className="text-gradient-accent">Premium Feature</span>

// Combined gradient
<span className="text-gradient-brand-accent">Marketing Intelligence</span>
```

## Accessibility Guidelines

### Color Contrast
All color combinations meet WCAG AA standards:

✅ `brand-500` on white - Excellent contrast
✅ `accent-600` on white - Excellent contrast
✅ White text on `dark` - Excellent contrast
✅ `brand-500` on `dark` - High contrast

### Dark Mode
Always provide dark mode alternatives:

```jsx
className="bg-white dark:bg-dark text-gray-900 dark:text-white"
```

## Data Visualization

### Chart Color Order
Use this order for multi-series charts:
1. `brand-500` (Lime) - Primary data series
2. `accent-600` (Purple) - Secondary series
3. `accent-400` (#C084FC) - Third series
4. `brand-400` (#A3E635) - Fourth series

### Status Colors
- **Success/Positive**: `brand-600` (lime)
- **Warning**: `amber-500` (#F59E0B)
- **Error**: `red-600` (#DC2626)
- **Info**: `accent-600` (purple)

## Do's and Don'ts

### ✅ Do's
- Use lime for primary actions and positive metrics
- Use purple for links and secondary interactions
- Maintain high contrast ratios
- Use gradient text sparingly for emphasis
- Keep dark mode in mind for all designs

### ❌ Don'ts
- Don't use lime and purple equally (lime is primary)
- Don't use pure black (#000000) - use `dark` instead
- Don't overuse gradients - they're accent pieces
- Don't mix lime/purple in single components (pick one per element)
- Don't forget hover states and transitions

## Quick Reference

```jsx
// Primary button
bg-brand-500 hover:bg-brand-600

// Secondary button
bg-accent-600 hover:bg-accent-700

// Card
bg-white dark:bg-dark-100 border border-gray-200 dark:border-dark-200

// Text
text-gray-900 dark:text-white

// Link
text-brand-600 hover:text-brand-700

// Badge
bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-400
```

## Implementation Checklist

- [ ] Install fonts (Inter & Manrope from Google Fonts)
- [ ] Add `tailwind.config.js` to your project
- [ ] Import `globals.css` in your app
- [ ] Set up dark mode toggle
- [ ] Test all components in both light and dark mode
- [ ] Verify color contrast with accessibility tools
- [ ] Create reusable component library
- [ ] Document any custom patterns for your team

---

## Need Help?

Reference the `example-components.jsx` file for pre-built examples of:
- Navigation
- Hero sections
- Metric cards
- Feature cards
- Buttons
- Badges
- Alerts
- Stats grids

Happy building! 🚀
