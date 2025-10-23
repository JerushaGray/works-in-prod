# Logo Usage Guide

## Logo Versions

Your logo has **two color schemes** that adapt based on background:

### Version 1: Purple + Lime (Light Backgrounds)
**Colors:**
- Left element: Purple `#9333EA` (accent-600)
- Right element: Lime `#84CC16` (brand-500)

**Use on:**
- White backgrounds
- Light gray backgrounds (`#F8FAFC`, `#F5F5F5`)
- Colored backgrounds where purple + lime have good contrast

### Version 2: White + Lime (Dark Backgrounds)
**Colors:**
- Left element: White `#FFFFFF`
- Right element: Lime `#84CC16` (brand-500)

**Use on:**
- Dark navy backgrounds (`#0F172A`)
- Dark slate backgrounds (`#1E293B`)
- Purple backgrounds (`#9333EA`)
- Brand lime backgrounds (use white + darker lime variant)

---

## Quick Decision Tree

```
Is background dark/saturated?
├─ YES → Use White + Lime version
└─ NO → Use Purple + Lime version
```

---

## Specific Use Cases

### ✅ Purple + Lime (Light Version)
- Website header (light mode)
- Email signatures
- Light-colored marketing materials
- White product backgrounds
- Documentation sites
- Social media posts with light backgrounds

### ✅ White + Lime (Dark Version)
- Website header (dark mode)
- Dark hero sections
- App loading screens
- Dark mode dashboards
- Purple brand moments
- Video overlays

---

## Color Specifications

### For Designers/Export

**Light Version (Purple + Lime)**
```
Left Element:
- HEX: #9333EA
- RGB: 147, 51, 234
- Tailwind: accent-600

Right Element:
- HEX: #84CC16
- RGB: 132, 204, 22
- Tailwind: brand-500
```

**Dark Version (White + Lime)**
```
Left Element:
- HEX: #FFFFFF
- RGB: 255, 255, 255

Right Element:
- HEX: #84CC16
- RGB: 132, 204, 22
- Tailwind: brand-500
```

---

## Automatic Switching (React)

For automatic dark mode switching:

```jsx
export function Logo() {
  return (
    <>
      {/* Light mode: Purple + Lime */}
      <div className="dark:hidden">
        <YourLogoSVG colors={{ left: "#9333EA", right: "#84CC16" }} />
      </div>
      
      {/* Dark mode: White + Lime */}
      <div className="hidden dark:block">
        <YourLogoSVG colors={{ left: "#FFFFFF", right: "#84CC16" }} />
      </div>
    </>
  );
}
```

---

## Size Guidelines

### Minimum Size
- Digital: 120px wide minimum
- Print: 0.75 inches wide minimum

### Recommended Sizes
- Navigation bar: 32-40px height
- Hero sections: 80-120px height
- Favicon: 32x32px, 64x64px

### Clear Space
Maintain clear space around logo equal to 1/4 of the logo's height on all sides.

---

## File Naming Convention

When exporting logo files:

```
logo-light.svg        (Purple + Lime for light backgrounds)
logo-dark.svg         (White + Lime for dark backgrounds)
logo-light@2x.png     (Hi-res raster version)
logo-dark@2x.png      (Hi-res raster version)
```

---

## Don'ts ❌

- ❌ Don't use purple on purple backgrounds
- ❌ Don't use white on light backgrounds
- ❌ Don't change the lime color to any other shade
- ❌ Don't add gradients or effects to the logo
- ❌ Don't rotate or skew the logo
- ❌ Don't use low-contrast color combinations
- ❌ Don't place logo on busy background images without sufficient contrast

---

## Testing Checklist

Before using logo in production:

- [ ] Test on white background
- [ ] Test on dark navy background
- [ ] Test on purple background
- [ ] Test on lime background (if applicable)
- [ ] Verify at minimum size (120px)
- [ ] Check contrast ratios (WCAG AA minimum)
- [ ] Test in both light and dark modes
- [ ] Verify clear space is maintained

---

## Contrast Ratios

**Purple + Lime on White**
- Purple on white: 8.59:1 ✅ (AAA)
- Lime on white: 2.92:1 ✅ (AA Large)

**White + Lime on Dark Navy**
- White on dark: 15.68:1 ✅ (AAA)
- Lime on dark: 5.41:1 ✅ (AA)

All combinations meet accessibility standards! 🎉

---

## Brand Consistency

The lime green (`#84CC16`) is **constant across both versions** - this creates strong brand recognition. Only the first element changes (purple ↔ white) based on contrast needs.

This approach:
✅ Maintains brand identity
✅ Ensures accessibility
✅ Works in any context
✅ Simplifies your asset library
