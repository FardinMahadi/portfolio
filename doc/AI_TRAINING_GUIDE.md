# AI Training Guide - Quick Reference

This document provides quick reference patterns for AI assistants to follow when working on this Next.js 15 portfolio project.

## Component Template

```typescript
"use client"; // If using hooks

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "@/components/types/ComponentProps";
import { useColorPalette } from "@/contexts/ColorPaletteContext";

export function ComponentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { currentPalette } = useColorPalette();

  return (
    <section
      id="section-id"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)] relative overflow-hidden"
    >
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Icon className="w-6 h-6 text-theme-primary" aria-hidden="true" />
            <h2 className="text-theme-primary text-3xl font-bold">Title</h2>
          </div>
          <p className="text-theme-text/70 max-w-2xl text-lg">Description</p>
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
8. **Always use color palette CSS variables** - `bg-[var(--color-background)]`, `text-theme-primary`, etc.
9. **Always use terminal/code editor aesthetic** for developer-themed elements
10. **Always ensure minimum touch target** of 44x44px
11. **Always use Next.js 15 App Router patterns** - Server Components by default, "use client" when needed
12. **Always handle mobile devices** - Cursor effects should be disabled on mobile

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

### Color Palette Usage

```typescript
import { useColorPalette } from "@/contexts/ColorPaletteContext";

export function Component() {
  const { currentPalette, setPalette, availablePalettes } = useColorPalette();

  // Use CSS variables in className
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Or use theme utility classes */}
      <div className="text-theme-primary border-theme-border">
        Content
      </div>
    </div>
  );
}
```

### Cursor Effects

```typescript
// For interactive elements that should trigger cursor effects
<button className="cursor-target">
  Hover me
</button>

// TargetCursor is automatically applied in layout
// Blog routes use BlogCursorEffect instead
```

### Blog System Patterns

```typescript
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blogData";

// Get all posts
const posts = await getBlogPosts();

// Get single post
const post = await getBlogPostBySlug("slug-name");

// Filter by category
const filteredPosts = posts.filter((post) => post.category === "Beginners");
```

### API Route Pattern

```typescript
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate input
    // Process request
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error message" }, { status: 500 });
  }
}
```

### Loading States

```typescript
import { ContentSkeleton, LoadingSpinner, PageLoader } from "@/components/ui/loading";

// Page-level loading
export default function Loading() {
  return <PageLoader message="Loading..." />;
}

// Component-level loading
{isLoading ? (
  <ContentSkeleton type="blogList" count={3} />
) : (
  <BlogList posts={posts} />
)}
```

### Next.js 15 App Router

```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component (when needed)
"use client";
import { useState } from "react";
export function ClientComponent() {
  const [state, setState] = useState();
  return <div>...</div>;
}
```

### Mobile Detection for Cursor Effects

```typescript
// Always check for mobile before enabling cursor effects
const isMobile = useMemo(() => {
  if (typeof window === "undefined") return false;
  const hasTouchScreen =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  return hasTouchScreen && isSmallScreen;
}, []);

if (isMobile) return null; // Disable cursor effects on mobile
```

### Blog Post Markdown Rendering

```typescript
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

// Render markdown content
<MarkdownRenderer content={post.content} />
```

### Project Data Structure

```typescript
import { projects } from "@/lib/projects";

// Access projects
const allProjects = projects;
```

### Middleware Pattern

```typescript
// middleware.ts handles security headers and caching
// No need to modify unless adding new headers
```
