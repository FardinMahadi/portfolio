# Cursor Effects

This document describes the cursor effect system used in the portfolio.

## Table of Contents

- [Overview](#overview)
- [TargetCursor](#targetcursor)
- [BlogCursorEffect](#blogcursoreffect)
- [Mobile Detection](#mobile-detection)
- [Customization](#customization)
- [Implementation Details](#implementation-details)

---

## Overview

The portfolio includes two cursor effect systems:

1. **TargetCursor** - Animated cursor for main pages
2. **BlogCursorEffect** - Label-following cursor for blog pages

Both systems:

- Automatically disable on mobile devices
- Use GSAP for smooth animations
- Respect user preferences (reduced motion)
- Provide enhanced interactivity

---

## TargetCursor

### Description

An animated cursor that responds to interactive elements marked with the `.cursor-target` class. Features corner animations and smooth following.

### Location

`src/components/effects/TargetCursor.tsx`

### Props

```typescript
interface TargetCursorProps {
  targetSelector?: string; // CSS selector for target elements
  spinDuration?: number; // Rotation animation duration (seconds)
  hideDefaultCursor?: boolean; // Hide default browser cursor
}
```

**Defaults**:

- `targetSelector`: `".cursor-target"`
- `spinDuration`: `2`
- `hideDefaultCursor`: `true`

### Usage

```typescript
import { TargetCursor } from "@/components/effects/TargetCursor";

<TargetCursor
  targetSelector=".cursor-target"
  spinDuration={2}
  hideDefaultCursor={true}
/>
```

### Marking Elements

Add the `.cursor-target` class to interactive elements:

```typescript
<button className="cursor-target">
  Hover Me
</button>

<a href="#" className="cursor-target">
  Link
</a>
```

### Features

- **Corner Animation**: Corners expand to frame target elements
- **Smooth Following**: Cursor smoothly follows mouse movement
- **Click Feedback**: Scale animation on click
- **Scroll Handling**: Maintains state during scroll
- **Auto-disable on Mobile**: Detects and disables on touch devices

### Animation Details

- **Rotation**: Continuous 360° rotation when idle
- **Corner Expansion**: Corners expand to element bounds on hover
- **Parallax Effect**: Subtle parallax movement within target
- **Click Scale**: Cursor scales down on click

---

## BlogCursorEffect

### Description

A cursor effect specifically for blog pages that displays category labels as you hover over blog-related elements.

### Location

`src/components/effects/BlogCursorEffect.tsx`

### Props

```typescript
interface BlogCursorEffectProps {
  children: React.ReactNode;
  className?: string;
  label?: string; // Default label text
  targetSelector?: string; // CSS selector for target elements
}
```

**Defaults**:

- `label`: `"Creative Reading"`
- `targetSelector`: `"[data-blog-category]"`

### Usage

```typescript
import { BlogCursorEffect } from "@/components/effects/BlogCursorEffect";

<BlogCursorEffect label="Creative Reading" targetSelector="[data-blog-category]">
  {/* Blog content */}
</BlogCursorEffect>
```

### Marking Elements

Add `data-blog-category` attribute to elements:

```typescript
<div data-blog-category="Beginners">
  Beginner Content
</div>

<button data-blog-category="Learning">
  Learning Resources
</button>
```

### Features

- **Label Following**: Cursor displays category labels
- **Dynamic Labels**: Changes based on hovered element
- **Theme Integration**: Uses color palette system
- **Responsive**: Only active on desktop (md+)
- **Smooth Transitions**: Animated label changes

### Label Resolution

The component resolves labels from:

1. `data-blog-category` attribute value
2. Falls back to default `label` prop

---

## Mobile Detection

Both cursor effects automatically detect and disable on mobile devices.

### Detection Logic

```typescript
const isMobile = useMemo(() => {
  if (typeof window === "undefined") return false;

  const hasTouchScreen =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  const mobileRegex =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobileUserAgent = mobileRegex.test(navigator.userAgent.toLowerCase());

  return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
}, []);
```

### Behavior

- **Desktop**: Cursor effects are active
- **Mobile/Tablet**: Cursor effects are disabled (returns `null`)
- **Touch Devices**: Automatically detected and disabled

---

## Customization

### Custom Target Selector

```typescript
// Use custom selector
<TargetCursor targetSelector=".my-custom-target" />

// In your component
<div className="my-custom-target">
  Custom Target
</div>
```

### Custom Spin Duration

```typescript
<TargetCursor spinDuration={3} />  // Slower rotation
```

### Custom Blog Labels

```typescript
<BlogCursorEffect
  label="Explore"
  targetSelector="[data-category]"
>
  {/* Content */}
</BlogCursorEffect>
```

### Styling

Cursor effects use CSS classes that can be customized:

```css
/* TargetCursor styles */
.target-cursor-corner {
  /* Corner styling */
}

/* BlogCursorEffect styles */
.cursor-follow-label {
  /* Label styling */
}
```

---

## Implementation Details

### GSAP Integration

Both cursor effects use GSAP for animations:

```typescript
import { gsap } from "gsap";

// Smooth cursor movement
gsap.to(cursorRef.current, {
  x: mouseX,
  y: mouseY,
  duration: 0.1,
  ease: "power3.out",
});

// Corner animations
gsap.to(corner, {
  x: targetX,
  y: targetY,
  duration: 0.2,
  ease: "power2.out",
});
```

### Performance Optimizations

1. **RequestAnimationFrame**: Mouse movement throttled with RAF
2. **Passive Event Listeners**: Scroll handlers use passive listeners
3. **Conditional Rendering**: Components return `null` on mobile
4. **Memoization**: Mobile detection memoized
5. **Cleanup**: Proper event listener cleanup

### Event Handling

```typescript
// Mouse move handler
const moveHandler = (e: MouseEvent) => {
  moveCursor(e.clientX, e.clientY);
};

// Scroll handler
const scrollHandler = () => {
  // Update cursor position
};

// Cleanup
return () => {
  window.removeEventListener("mousemove", moveHandler);
  window.removeEventListener("scroll", scrollHandler);
};
```

### Accessibility

- Cursor effects don't interfere with keyboard navigation
- Screen readers are not affected
- Reduced motion preferences respected
- Focus indicators remain visible

---

## Best Practices

### 1. Use Appropriate Selectors

```typescript
// ✅ Good - Specific selector
<button className="cursor-target">Button</button>

// ❌ Bad - Too broad
<div className="cursor-target">Everything</div>
```

### 2. Don't Overuse

Only mark truly interactive elements:

- Buttons
- Links
- Cards with hover effects
- Interactive components

### 3. Test on Mobile

Always test that effects are disabled on mobile:

- Touch devices
- Small screens
- Mobile browsers

### 4. Performance

- Limit number of `.cursor-target` elements
- Avoid nested cursor targets
- Test performance on lower-end devices

---

## Troubleshooting

### Cursor Not Appearing

1. Check if component is included in layout
2. Verify not on mobile device
3. Check browser console for errors
4. Ensure GSAP is loaded

### Cursor Not Responding

1. Verify elements have `.cursor-target` class
2. Check selector matches
3. Verify no CSS conflicts
4. Check z-index values

### Performance Issues

1. Reduce number of target elements
2. Check for memory leaks
3. Verify cleanup functions run
4. Profile with browser dev tools

---

## Summary

| Feature   | TargetCursor       | BlogCursorEffect       |
| --------- | ------------------ | ---------------------- |
| Purpose   | Interactive cursor | Label following        |
| Target    | `.cursor-target`   | `[data-blog-category]` |
| Animation | GSAP               | Framer Motion          |
| Mobile    | Auto-disabled      | Auto-disabled          |
| Usage     | Main pages         | Blog pages             |

For more information, see:

- [Style Guide](./STYLE_GUIDE.md#cursor-effects)
- [Component Reference](./COMPONENT_REFERENCE.md#effects-components)
