# Color Palette System

This document describes the dynamic color palette system used throughout the portfolio.

## Table of Contents

- [Overview](#overview)
- [Available Palettes](#available-palettes)
- [CSS Variables](#css-variables)
- [Using Palettes](#using-palettes)
- [Adding New Palettes](#adding-new-palettes)
- [Theme Utility Classes](#theme-utility-classes)
- [Implementation Details](#implementation-details)

---

## Overview

The portfolio uses a dynamic color palette system that allows users to switch between different color themes. Palettes are:

- Defined in `src/lib/colorPalettes.ts`
- Managed by `ColorPaletteContext`
- Persisted in `localStorage`
- Applied via CSS variables

---

## Available Palettes

### Default (Cyan Blue)

**Key**: `default`

**Colors**:

- Primary: `#06b6d4` (cyan-500)
- Secondary: `#3b82f6` (blue-500)
- Accent: `#8b5cf6` (violet-500)
- Background: `#0a0e1a`
- Surface: `#111827`
- Text: `#e4e7f0`
- Border: `#1f2937`

### Purple Dream

**Key**: `purple`

**Colors**:

- Primary: `#a855f7` (purple-500)
- Secondary: `#c084fc` (purple-400)
- Accent: `#e879f9` (fuchsia-400)
- Background: `#0a0a0f`
- Surface: `#1a1625`
- Text: `#f3e8ff`
- Border: `#2d1b3d`

### Emerald Forest

**Key**: `green`

**Colors**:

- Primary: `#10b981` (emerald-500)
- Secondary: `#34d399` (emerald-400)
- Accent: `#22d3ee` (cyan-400)
- Background: `#0a0f0a`
- Surface: `#111f11`
- Text: `#e0f2e9`
- Border: `#1f3a1f`

### Sunset Orange

**Key**: `orange`

**Colors**:

- Primary: `#f97316` (orange-500)
- Secondary: `#fb923c` (orange-400)
- Accent: `#fbbf24` (amber-400)
- Background: `#0f0a0a`
- Surface: `#1f1611`
- Text: `#fff7ed`
- Border: `#3a2a1f`

### Crimson Red

**Key**: `red`

**Colors**:

- Primary: `#ef4444` (red-500)
- Secondary: `#f87171` (red-400)
- Accent: `#ec4899` (pink-500)
- Background: `#0f0a0a`
- Surface: `#1f1111`
- Text: `#fef2f2`
- Border: `#3a1f1f`

### Ocean Blue

**Key**: `blue`

**Colors**:

- Primary: `#3b82f6` (blue-500)
- Secondary: `#60a5fa` (blue-400)
- Accent: `#06b6d4` (cyan-500)
- Background: `#0a0e1a`
- Surface: `#111827`
- Text: `#e0e7ff`
- Border: `#1e3a5f`

---

## CSS Variables

The palette system uses CSS variables that are applied to the document root:

```css
:root {
  --color-primary: #06b6d4;
  --color-secondary: #3b82f6;
  --color-accent: #8b5cf6;
  --color-background: #0a0e1a;
  --color-surface: #111827;
  --color-text: #e4e7f0;
  --color-border: #1f2937;
}
```

### Variable Usage

```typescript
// In Tailwind classes
className="bg-[var(--color-background)] text-[var(--color-text)]"

// In inline styles
style={{ backgroundColor: "var(--color-primary)" }}
```

---

## Using Palettes

### In Components

```typescript
import { useColorPalette } from "@/contexts/ColorPaletteContext";

export function Component() {
  const { currentPalette, setPalette, availablePalettes } = useColorPalette();

  return (
    <div>
      <p>Current palette: {currentPalette.name}</p>
      <button onClick={() => setPalette("purple")}>
        Switch to Purple
      </button>
    </div>
  );
}
```

### Accessing Palette Values

```typescript
const { currentPalette } = useColorPalette();

// Access individual colors
const primaryColor = currentPalette.primary;
const backgroundColor = currentPalette.background;
```

### Available Palettes

```typescript
const { availablePalettes } = useColorPalette();

// Get all palette keys
const paletteKeys = Object.keys(availablePalettes);

// Access specific palette
const purplePalette = availablePalettes.purple;
```

---

## Adding New Palettes

### Step 1: Define Palette

Edit `src/lib/colorPalettes.ts`:

```typescript
export const colorPalettes: Record<string, ColorPalette> = {
  // ... existing palettes
  pink: {
    name: "Pink Paradise",
    primary: "#ec4899", // pink-500
    secondary: "#f472b6", // pink-400
    accent: "#f43f5e", // rose-500
    background: "#0f0a0a",
    surface: "#1f1111",
    text: "#fdf2f8",
    border: "#3a1f1f",
  },
};
```

### Step 2: Test Palette

1. Use the `ColorPaletteSwitcher` component
2. Verify all components display correctly
3. Check contrast ratios for accessibility
4. Test on different screen sizes

### Step 3: Update Documentation

Update this file with the new palette information.

---

## Theme Utility Classes

The project includes Tailwind utility classes that use CSS variables:

### Background Colors

```typescript
className = "bg-theme-background"; // Uses --color-background
className = "bg-theme-surface"; // Uses --color-surface
```

### Text Colors

```typescript
className = "text-theme-primary"; // Uses --color-primary
className = "text-theme-text"; // Uses --color-text
```

### Border Colors

```typescript
className = "border-theme-border"; // Uses --color-border
```

### Custom CSS Variables

You can also use CSS variables directly:

```typescript
className = "bg-[var(--color-background)]";
className = "text-[var(--color-primary)]";
```

---

## Implementation Details

### ColorPaletteContext

**Location**: `src/contexts/ColorPaletteContext.tsx`

**Responsibilities**:

- Manage current palette state
- Persist palette selection in `localStorage`
- Apply CSS variables to document root
- Provide palette switching functionality

### Color Palette Definition

**Location**: `src/lib/colorPalettes.ts`

**Structure**:

```typescript
export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

export const colorPalettes: Record<string, ColorPalette> = {
  // Palette definitions
};
```

### CSS Variable Application

The context applies CSS variables to the document root:

```typescript
const cssVars = getPaletteCSSVariables(palette);
const root = document.documentElement;

Object.entries(cssVars).forEach(([key, value]) => {
  root.style.setProperty(key, value);
});
```

### Persistence

Palette selection is saved to `localStorage`:

```typescript
localStorage.setItem("colorPalette", paletteKey);
```

On page load, the saved palette is restored:

```typescript
const savedPalette = localStorage.getItem("colorPalette");
if (savedPalette && colorPalettes[savedPalette]) {
  setCurrentPaletteKey(savedPalette);
}
```

---

## Best Practices

### 1. Color Contrast

Ensure sufficient contrast for accessibility:

- Text on background: WCAG AA minimum (4.5:1)
- Large text: WCAG AA minimum (3:1)
- Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 2. Consistent Usage

- Use CSS variables instead of hardcoded colors
- Use theme utility classes when available
- Maintain consistent color usage across components

### 3. Palette Selection

- Choose colors that work well together
- Test palettes in both light and dark contexts
- Consider color psychology for your brand

### 4. Performance

- CSS variables are performant
- Palette switching is instant (no page reload)
- No additional bundle size for palette system

---

## Troubleshooting

### Palette Not Applying

1. Check if `ColorPaletteProvider` wraps your app
2. Verify CSS variables are being set on document root
3. Check browser console for errors
4. Ensure palette key exists in `colorPalettes`

### Colors Not Updating

1. Clear `localStorage` and reload
2. Check if component uses CSS variables
3. Verify Tailwind config includes CSS variables
4. Check for CSS specificity issues

### Accessibility Issues

1. Test color contrast ratios
2. Ensure text is readable on all backgrounds
3. Test with color blindness simulators
4. Provide alternative indicators (not just color)

---

## Summary

The color palette system provides:

- ✅ 6 built-in palettes
- ✅ Easy palette switching
- ✅ Persistent user preferences
- ✅ CSS variable integration
- ✅ Type-safe implementation
- ✅ Zero runtime overhead

For more information, see:

- [Style Guide](./STYLE_GUIDE.md#color-palette-system)
- [Component Reference](./COMPONENT_REFERENCE.md#ui-components)
