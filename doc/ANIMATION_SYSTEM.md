# Animation System

This document describes the animation system used throughout the portfolio.

## Table of Contents

- [Overview](#overview)
- [Framer Motion](#framer-motion)
- [GSAP](#gsap)
- [Animation Patterns](#animation-patterns)
- [Performance](#performance)
- [Best Practices](#best-practices)

---

## Overview

The portfolio uses two animation libraries:

1. **Framer Motion** - Component animations and scroll-triggered effects
2. **GSAP** - Advanced cursor animations and complex sequences

### When to Use What

- **Framer Motion**: Component animations, scroll reveals, hover effects
- **GSAP**: Cursor effects, complex timelines, performance-critical animations

---

## Framer Motion

### Installation

Already included in `package.json`:

```json
{
  "dependencies": {
    "framer-motion": "^12.23.24"
  }
}
```

### Basic Usage

```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Scroll-Triggered Animations

```typescript
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Content
      </motion.div>
    </div>
  );
}
```

### Common Patterns

#### Fade In

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Slide Up

```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Scale

```typescript
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

#### Hover Effects

```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  transition={{ duration: 0.3 }}
>
  Hoverable Content
</motion.div>
```

#### Staggered Lists

```typescript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

---

## GSAP

### Installation

Already included in `package.json`:

```json
{
  "dependencies": {
    "gsap": "^3.13.0"
  }
}
```

### Basic Usage

```typescript
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function Component() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      x: 100,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return <div ref={ref}>Content</div>;
}
```

### Cursor Animations

```typescript
// Smooth cursor following
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

### Timelines

```typescript
const tl = gsap.timeline();

tl.to(element1, { x: 100, duration: 1 })
  .to(element2, { y: 50, duration: 0.5 }, "-=0.5") // Start 0.5s before previous ends
  .to(element3, { opacity: 0, duration: 0.3 });
```

### Continuous Animations

```typescript
// Infinite rotation
gsap.timeline({ repeat: -1 }).to(element, {
  rotation: "+=360",
  duration: 2,
  ease: "none",
});
```

---

## Animation Patterns

### Entry Animations

Standard pattern for section reveals:

```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });

<motion.section
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  Content
</motion.section>
```

### Card Hover Effects

```typescript
<motion.article
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ duration: 0.3 }}
  className="group"
>
  <div className="hover:border-theme-primary transition-colors">
    Card Content
  </div>
</motion.article>
```

### Loading States

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  {isLoading ? <Loader /> : <Content />}
</motion.div>
```

### Page Transitions

```typescript
import { AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  <motion.div
    key={page}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## Performance

### Optimization Techniques

1. **Use `once: true`** for scroll animations

   ```typescript
   const isInView = useInView(ref, { once: true });
   ```

2. **Throttle with `amount`**

   ```typescript
   const isInView = useInView(ref, { amount: 0.3 });
   ```

3. **Use `will-change` CSS property**

   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```

4. **Lazy load animations**

   ```typescript
   const shouldAnimate = isInView && !hasAnimated;
   ```

5. **Use `transform` and `opacity`**
   - These properties are GPU-accelerated
   - Avoid animating `width`, `height`, `top`, `left`

### Performance Monitoring

```typescript
// Measure animation performance
const startTime = performance.now();
// ... animation
const endTime = performance.now();
console.log(`Animation took ${endTime - startTime}ms`);
```

---

## Best Practices

### 1. Animation Timing

- **Fast interactions**: 0.2-0.3s
- **Standard animations**: 0.6-0.8s
- **Slow animations**: 1-2s

### 2. Easing Functions

```typescript
// Entry animations
ease: "easeOut";

// Exit animations
ease: "easeIn";

// Continuous animations
ease: "easeInOut";

// Bouncy animations
ease: "back.out";
```

### 3. Reduced Motion

Always respect user preferences:

```typescript
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1 }}
  transition={prefersReducedMotion ? {} : { duration: 0.6 }}
>
  Content
</motion.div>
```

### 4. Stagger Delays

```typescript
// Good - Consistent delay
delay: index * 0.1;

// Bad - Random delays
delay: Math.random() * 0.5;
```

### 5. Cleanup

Always cleanup animations:

```typescript
useEffect(() => {
  const animation = gsap.to(element, { ... });

  return () => {
    animation.kill();
  };
}, []);
```

---

## Common Issues

### Animation Not Triggering

1. Check `isInView` value
2. Verify ref is attached
3. Check `amount` threshold
4. Ensure element is visible

### Janky Animations

1. Use `transform` instead of position
2. Reduce number of animated properties
3. Check for layout shifts
4. Use `will-change` CSS property

### Performance Issues

1. Reduce animation complexity
2. Use `once: true` for scroll animations
3. Limit number of simultaneous animations
4. Profile with browser dev tools

---

## Summary

| Library       | Use Case                             | Performance |
| ------------- | ------------------------------------ | ----------- |
| Framer Motion | Component animations, scroll reveals | Good        |
| GSAP          | Cursor effects, complex timelines    | Excellent   |

### Animation Guidelines

- ✅ Use Framer Motion for most animations
- ✅ Use GSAP for cursor effects
- ✅ Respect reduced motion preferences
- ✅ Optimize for performance
- ✅ Test on various devices

For more information, see:

- [Style Guide](./STYLE_GUIDE.md#animation-patterns)
- [Cursor Effects](./CURSOR_EFFECTS.md)
