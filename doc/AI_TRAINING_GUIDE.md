# AI Training Guide - Quick Reference

This document provides quick reference patterns for AI assistants to follow when working on this project.

## Component Template

```typescript
"use client"; // If using hooks

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "@/components/types/ComponentProps";

export function ComponentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="section-id"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0e1a] relative overflow-hidden"
    >
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
            <h2 className="text-cyan-400 text-3xl font-bold">Title</h2>
          </div>
          <p className="text-slate-400 max-w-2xl text-lg">Description</p>
        </motion.header>
      </div>
    </section>
  );
}
```

## Key Rules

1. **Always use semantic HTML** (`<section>`, `<header>`, `<article>`, `<aside>`, `<footer>`)
2. **Always include ARIA attributes** for accessibility
3. **Always use Framer Motion** with `useInView` for scroll animations
4. **Always use TypeScript** with explicit types
5. **Always optimize images** with `sizes`, `loading`, and `quality` props
6. **Always include structured data** for SEO when applicable
7. **Always use Tailwind classes** - no inline styles
8. **Always follow the color palette** - dark backgrounds with cyan/blue/violet accents
9. **Always use terminal/code editor aesthetic** for developer-themed elements
10. **Always ensure minimum touch target** of 44x44px

## Common Patterns

### Navigation Item

```typescript
<motion.button
  onClick={() => scrollToSection(href)}
  aria-label={`Navigate to ${name} section`}
  aria-current={isActive ? "page" : undefined}
  className="min-h-[44px] min-w-[44px]"
>
```

### Image with Optimization

```typescript
<ImageWithFallback
  src={src}
  alt={`Descriptive alt text with context`}
  width={width}
  height={height}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  loading="lazy"
/>
```

### Structured Data

```typescript
const schema = {
  "@context": "https://schema.org",
  "@type": "Type",
  // properties
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>;
```

### Form Input

```typescript
<label htmlFor="id" className="...">
  Label
</label>
<Input
  id="id"
  aria-required="true"
  aria-label="Description"
  aria-invalid={!!error}
  aria-describedby={error ? "error-id" : undefined}
/>
{error && (
  <p id="error-id" role="alert" className="...">
    {error}
  </p>
)}
```
