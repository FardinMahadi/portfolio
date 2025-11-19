# Project Style Guide & Patterns

This document outlines the coding style, patterns, and conventions used throughout this portfolio project. Use this guide to maintain consistency and train AI assistants to follow similar patterns.

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Code Style & Conventions](#code-style--conventions)
3. [Component Patterns](#component-patterns)
4. [SEO & Semantic HTML](#seo--semantic-html)
5. [Styling Patterns](#styling-patterns)
6. [TypeScript Patterns](#typescript-patterns)
7. [Performance Optimizations](#performance-optimizations)
8. [Animation Patterns](#animation-patterns)
9. [Accessibility Patterns](#accessibility-patterns)
10. [File Organization](#file-organization)
11. [Cursor Effects](#cursor-effects)
12. [API Routes](#api-routes)
13. [Middleware](#middleware)
14. [Color Palette System](#color-palette-system)
15. [Blog System](#blog-system)

---

## Project Architecture

### Framework & Setup

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Shadcn/ui** for UI components

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   ├── analytics.tsx       # Analytics component
│   ├── manifest.ts        # PWA manifest
│   └── sitemap.ts         # Sitemap generation
├── components/
│   ├── LandingPage/       # Main page sections
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── ui/                # Reusable UI components (Shadcn)
│   ├── types/             # TypeScript type definitions
│   └── figma/             # Custom components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── seo.ts             # SEO utilities
└── public/                # Static assets
```

---

## Code Style & Conventions

### Naming Conventions

#### Files & Directories

- **Components**: PascalCase - `HeroSection.tsx`, `Navigation.tsx`
- **Utilities**: camelCase - `utils.ts`, `seo.ts`
- **Types**: PascalCase with suffix - `NavItemsProps.tsx`, `ProjectsProps.tsx`
- **Directories**: PascalCase for component folders, lowercase for others

#### Variables & Functions

```typescript
// Variables: camelCase
const siteUrl = "https://example.com";
const isScrolled = false;

// Functions: camelCase
function handleScroll() {}
function generateMetadata() {}

// Constants: UPPER_SNAKE_CASE for environment variables
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// Arrays/Objects: camelCase
const navItems: NavItemsProps[] = [];
const structuredData = {};
```

#### React Components

```typescript
// Export named function components
export function HeroSection() {
  return <section>...</section>;
}

// Use PascalCase for component names
export function Navigation() {}
export function AboutSection() {}
```

### Import Order

1. Next.js imports
2. React imports
3. Third-party libraries
4. Internal components
5. Types
6. Utilities
7. Styles

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { NavItemsProps } from "../types/NavItemsProps";
import { generateMetadata } from "@/lib/seo";
import "./styles.css";
```

### Code Formatting

#### TypeScript

- Use explicit types for function parameters and return types
- Prefer `interface` for object shapes
- Use `type` for unions, intersections, and utilities
- Always use type annotations for component props

```typescript
// ✅ Good
interface ComponentProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export function Component({ title, description, onClick }: ComponentProps) {
  // ...
}

// ❌ Bad
export function Component({ title, description, onClick }: any) {
  // ...
}
```

#### React Patterns

- Use functional components with hooks
- Prefer named exports over default exports for components
- Use `useState` for local state
- Use `useEffect` for side effects with cleanup
- Use `useRef` for DOM references and values that don't trigger re-renders

```typescript
// ✅ Good
export function Component() {
  const [state, setState] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, []);

  return <div ref={ref}>...</div>;
}

// ❌ Bad
export default function Component() {
  const [state, setState] = useState<any>(null);
  // No cleanup, no types
}
```

---

## Component Patterns

### Component Structure Template

```typescript
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentProps } from "../types/ComponentProps";

// Constants (if needed)
const items: ComponentProps[] = [
  // ...
];

export function ComponentSection() {
  // Hooks
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [state, setState] = useState(false);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Structured data (if needed)
  const schema = {
    "@context": "https://schema.org",
    // ...
  };

  return (
    <section
      id="section-id"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0e1a] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#1e1b4b] opacity-90" />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
            <h2 className="text-cyan-400 text-3xl font-bold">Section Title</h2>
          </div>
          <p className="text-slate-400 max-w-2xl text-lg">
            Section description
          </p>
        </motion.header>

        {/* Content */}
      </div>
    </section>
  );
}
```

### Animation Patterns

#### Framer Motion Usage

```typescript
// Entry animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Content
</motion.div>

// Hover animations
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  transition={{ duration: 0.3 }}
>
  Hoverable content
</motion.div>

// Continuous animations
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Animated content
</motion.div>
```

#### Animation Best Practices

- Use `useInView` hook for scroll-triggered animations
- Set `once: true` for performance (animations play once)
- Use `amount: 0.3` to trigger when 30% visible
- Stagger delays for list items: `delay: index * 0.1`
- Always provide `initial`, `animate`, and `transition` props

---

## SEO & Semantic HTML

### Semantic HTML Structure

```typescript
// Page structure
<header role="banner">
  <Navigation />
</header>

<main id="main-content" role="main">
  <section id="home">
    <HeroSection />
  </section>

  <section id="about">
    <AboutSection />
  </section>

  <section id="projects">
    <ProjectsSection />
  </section>

  <section id="blog">
    <BlogSection />
  </section>

  <section id="contact">
    <ContactSection />
  </section>
</main>

<footer role="contentinfo">
  <Footer />
</footer>
```

### Heading Hierarchy

```typescript
// ✅ Correct hierarchy
<h1>Main page title</h1>
  <h2>Section title</h2>
    <h3>Subsection title</h3>
      <h4>Minor heading</h4>

// Pattern in components
<section>
  <motion.header>
    <h2>Section Title</h2>
    <p>Description</p>
  </motion.header>

  <article>
    <header>
      <h3>Article Title</h3>
    </header>
  </article>
</section>
```

### Structured Data Patterns

```typescript
// Always use JSON-LD format
const schema = {
  "@context": "https://schema.org",
  "@type": "Type",
  // Required properties
};

// Add to head
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>;

// Common schemas used:
// - Person
// - WebSite
// - BreadcrumbList
// - Organization
// - Article
// - ItemList
// - ProfessionalService
```

### Meta Tags Pattern

```typescript
// In layout.tsx or page metadata
export const metadata: Metadata = {
  title: {
    default: "Full Title | Site Name",
    template: "%s | Site Name",
  },
  description: "Descriptive meta description (150-160 chars)",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Full Title",
    description: "OG description",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Alt text",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Title",
    description: "Description",
    images: [`${siteUrl}/og-image.png`],
  },
};
```

---

## Styling Patterns

### Tailwind CSS Conventions

#### Color Palette

```typescript
// Background colors
bg-[#0a0e1a]           // Primary dark background
bg-[#111827]           // Secondary dark background
bg-[#0f172a]           // Card background
bg-slate-900/50        // Semi-transparent overlay

// Accent colors
text-cyan-400          // Primary accent
text-blue-400         // Secondary accent
text-violet-400       // Tertiary accent
text-green-400        // Success/active states

// Text colors
text-slate-100        // Primary text
text-slate-300        // Secondary text
text-slate-400        // Muted text
text-slate-500        // Very muted text
```

#### Responsive Patterns

```typescript
// Mobile-first approach
className = "px-4 sm:px-6 lg:px-8";
className = "text-sm sm:text-base lg:text-lg";
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
```

#### Spacing Patterns

```typescript
// Section padding
py-20 px-4 sm:px-6 lg:px-8

// Component spacing
space-y-6              // Vertical spacing
gap-4                  // Flex/Grid gap
mb-6                   // Margin bottom
mt-4                   // Margin top
```

#### Border & Shadow Patterns

```typescript
// Borders
border border-slate-700/50
border-t border-slate-800
rounded-lg
rounded-t-lg rounded-b-lg

// Shadows
shadow-lg shadow-cyan-500/50
hover:shadow-xl hover:shadow-cyan-500/70

// Backdrop blur
backdrop-blur-sm
backdrop-blur-xl
```

### Component Styling Template

```typescript
// Card pattern
<div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
  {/* Content */}
</div>

// Button pattern
<Button
  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/70 min-h-[44px]"
>
  Button Text
</Button>

// Terminal-style header
<div className="bg-[#1e293b] rounded-t-lg border border-slate-700 p-3 flex items-center gap-2">
  <div className="flex gap-1.5" aria-hidden="true">
    <div className="w-3 h-3 rounded-full bg-red-500" />
    <div className="w-3 h-3 rounded-full bg-yellow-500" />
    <div className="w-3 h-3 rounded-full bg-green-500" />
  </div>
  <div className="ml-4 text-slate-400 text-sm font-mono">
    File path
  </div>
</div>
```

---

## TypeScript Patterns

### Type Definitions

```typescript
// Props interfaces
export interface ComponentProps {
  title: string;
  description: string;
  optional?: string;
  onClick?: () => void;
  items: Array<{
    id: string;
    name: string;
  }>;
}

// Extended props
interface ExtendedProps extends ComponentProps {
  additional: string;
}

// Union types
type Status = "idle" | "loading" | "success" | "error";

// Utility types
type Optional<T> = T | undefined;
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

### Type Safety Patterns

```typescript
// Always type function parameters
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

// Type event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Type refs
const ref = useRef<HTMLDivElement>(null);

// Type state
const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
```

---

## Performance Optimizations

### Image Optimization

```typescript
// Always use Next.js Image component
<Image
  src={src}
  alt="Descriptive alt text"
  width={width}
  height={height}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  loading="lazy"
  priority={false} // Only true for above-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Alt text pattern
alt={`${title} project screenshot - ${description}`}
alt={`${name} technology icon - Frontend and backend development tool`}
```

### Code Splitting

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <LoadingSpinner />,
  ssr: false, // If client-only
});
```

### Loading States

The project includes a comprehensive loading component system located in `src/components/ui/loading/`. All loading components follow the terminal/code editor aesthetic and integrate with the color palette system.

#### LoadingSpinner

Use for inline loading indicators:

```typescript
import { LoadingSpinner } from '@/components/ui/loading';

// Default spinner
<LoadingSpinner />

// Terminal variant with text
<LoadingSpinner variant="terminal" size="lg" text="Loading..." />

// Minimal variant
<LoadingSpinner variant="minimal" size="sm" />
```

**Variants:**

- `default` - Standard spinner (Loader2 icon)
- `terminal` - Terminal-themed with blinking cursor
- `minimal` - Simple border spinner
- `pulse` - Pulsing dot animation

**Sizes:** `sm`, `md`, `lg`

#### SkeletonLoader

Use for content placeholders:

```typescript
import { SkeletonLoader } from '@/components/ui/loading';

// Text skeleton
<SkeletonLoader variant="text" height="1.5rem" width="80%" />

// Image skeleton
<SkeletonLoader variant="image" height="200px" />

// Multiple skeletons
<SkeletonLoader variant="text" count={3} />
```

**Variants:**

- `text` - Text line placeholder
- `image` - Image placeholder with aspect ratio
- `card` - Card container placeholder
- `list` - List item placeholder
- `custom` - Custom dimensions

#### PageLoader

Use for full-page loading states:

```typescript
import { PageLoader } from '@/components/ui/loading';

// Overlay variant (default)
<PageLoader message="Loading page..." />

// With progress
<PageLoader message="Loading..." showProgress progress={75} />

// Inline variant
<PageLoader variant="inline" message="Loading content..." />
```

#### ContentSkeleton

Pre-built skeletons for common content types:

```typescript
import { ContentSkeleton } from '@/components/ui/loading';

// Blog post skeleton
<ContentSkeleton type="blogPost" />

// Blog list skeleton
<ContentSkeleton type="blogList" count={3} />

// Project grid skeleton
<ContentSkeleton type="projectGrid" count={6} />

// Contact form skeleton
<ContentSkeleton type="contactForm" />
```

**Types:**

- `blogPost` - Full blog post layout
- `blogList` - Blog list with cards
- `projectCard` - Individual project card
- `projectGrid` - Grid of project cards
- `contactForm` - Contact form layout

#### Next.js Route Loading

Create `loading.tsx` files in route directories for automatic loading states:

```typescript
// app/blog/loading.tsx
import { ContentSkeleton } from '@/components/ui/loading';

export default function BlogLoading() {
  return (
    <div className="min-h-screen py-20 px-4">
      <ContentSkeleton type="blogList" count={3} />
    </div>
  );
}
```

#### Best Practices

1. **Always provide loading states** for async operations
2. **Use appropriate skeleton types** that match the content structure
3. **Respect reduced motion** - all components handle `prefers-reduced-motion`
4. **Accessibility** - All loading components include ARIA labels
5. **Terminal theme** - Loading components match the project's aesthetic
6. **Color integration** - Uses CSS variables from color palette system

#### Integration Examples

```typescript
// In component with async data
const [isLoading, setIsLoading] = useState(true);

if (isLoading) {
  return <ContentSkeleton type="blogList" count={3} />;
}

// In Suspense boundary
<Suspense fallback={<PageLoader message="Loading..." />}>
  <AsyncComponent />
</Suspense>

// Button loading state
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <LoadingSpinner variant="minimal" size="sm" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

### Lazy Loading

```typescript
// Use useInView for scroll-triggered loading
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });

// Only render when visible
{
  isInView && <ExpensiveComponent />;
}
```

---

## Accessibility Patterns

### ARIA Attributes

```typescript
// Semantic roles
<header role="banner">
<main role="main">
<footer role="contentinfo">
<nav role="navigation">
<aside role="complementary">

// ARIA labels
<button aria-label="Navigate to projects section">
<input aria-label="Your name" aria-required="true" aria-invalid={!!error} />

// ARIA hidden for decorative elements
<span aria-hidden="true">Decorative text</span>
<div role="presentation">Decorative element</div>

// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Keyboard Navigation

```typescript
// Minimum touch target size: 44x44px
className="min-h-[44px] min-w-[44px]"

// Focus states
className="focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"

// Tab order
tabIndex={0} // For interactive elements
tabIndex={-1} // For programmatic focus only
```

### Form Accessibility

```typescript
// Proper label association
<label htmlFor="input-id" className="...">
  Label text
</label>
<input
  id="input-id"
  aria-required="true"
  aria-invalid={!!error}
  aria-describedby={error ? "error-id" : undefined}
/>

// Error messages
{error && (
  <p id="error-id" role="alert" className="...">
    {error}
  </p>
)}
```

---

## Animation Patterns

### Framer Motion Best Practices

```typescript
// Standard entry animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>

// Staggered list animations
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

// Hover animations
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  transition={{ duration: 0.3 }}
>

// Continuous animations
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
```

### Animation Timing

```typescript
// Fast interactions: 0.2-0.3s
transition={{ duration: 0.3 }}

// Standard animations: 0.6-0.8s
transition={{ duration: 0.6 }}

// Slow animations: 1-2s
transition={{ duration: 1.5 }}

// Easing functions
ease: "easeInOut" // Most common
ease: "easeOut"   // For entries
ease: "easeIn"    // For exits
```

---

## File Organization

### Component File Structure

```typescript
// 1. Imports (grouped)
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ComponentProps } from "../types/ComponentProps";

// 2. Constants (if any)
const DEFAULT_VALUE = "value";
const items: ComponentProps[] = [];

// 3. Component definition
export function Component() {
  // 3a. Hooks
  const ref = useRef(null);
  const [state, setState] = useState(false);

  // 3b. Derived state/computed values
  const computedValue = useMemo(() => {}, []);

  // 3c. Event handlers
  const handleClick = () => {};

  // 3d. Effects
  useEffect(() => {}, []);

  // 3e. Structured data (if needed)
  const schema = {};

  // 3f. Render
  return (
    <section>
      {/* Structured data */}
      <script type="application/ld+json" />

      {/* Content */}
    </section>
  );
}
```

### Type File Structure

```typescript
// types/ComponentProps.tsx
export interface ComponentProps {
  // Required props first
  title: string;
  description: string;

  // Optional props
  optional?: string;
  onClick?: () => void;

  // Complex types
  items: Array<{
    id: string;
    name: string;
  }>;
}
```

---

## SEO Best Practices

### Metadata Pattern

```typescript
// Always include comprehensive metadata
export const metadata: Metadata = {
  title: {
    default: "Full Descriptive Title | Brand Name",
    template: "%s | Brand Name",
  },
  description: "150-160 character description with keywords",
  keywords: ["keyword1", "keyword2", "keyword3"],
  authors: [{ name: "Author Name", url: siteUrl }],
  creator: "Author Name",
  publisher: "Author Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Title",
    description: "Description",
    images: [{ url, width: 1200, height: 630, alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Title",
    description: "Description",
    images: [imageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### Structured Data Usage

```typescript
// Use SEO utility functions
import { generateArticleSchema, generateItemListSchema } from "@/lib/seo";

// Generate schemas
const articleSchema = generateArticleSchema(
  title,
  description,
  datePublished,
  dateModified,
  author,
  image
);

// Add to component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
/>;
```

---

## Common Patterns

### Terminal/Code Editor Style

```typescript
// Window chrome pattern
<div className="bg-[#1e293b] rounded-t-lg border border-slate-700 p-3 flex items-center gap-2">
  <div className="flex gap-1.5" aria-hidden="true">
    <div className="w-3 h-3 rounded-full bg-red-500" />
    <div className="w-3 h-3 rounded-full bg-yellow-500" />
    <div className="w-3 h-3 rounded-full bg-green-500" />
  </div>
  <div className="ml-4 text-slate-400 text-sm font-mono">
    ~/path/to/file.ts
  </div>
</div>

// Code content pattern
<div className="bg-[#0f172a] rounded-b-lg border-x border-b border-slate-700 p-8">
  <div className="flex gap-4">
    <div className="text-slate-600 select-none font-mono text-sm" aria-hidden="true">
      1
    </div>
    <div className="flex-1">
      <code className="font-mono">
        <span className="text-purple-400">const</span>{" "}
        <span className="text-cyan-400">variable</span>{" "}
        <span className="text-pink-400">=</span>{" "}
        <span className="text-green-400">value</span>
      </code>
    </div>
  </div>
</div>
```

### Card Pattern

```typescript
<motion.article
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  whileHover={{ y: -8 }}
  className="group relative"
>
  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-lg border border-slate-700/50 overflow-hidden backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
    <header className="...">
      <h3>Title</h3>
    </header>

    <figure>
      <ImageWithFallback ... />
    </figure>

    <div className="p-6 space-y-4">
      {/* Content */}
    </div>
  </div>

  {/* Glow effect */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
</motion.article>
```

### Form Pattern

```typescript
<form onSubmit={handleSubmit} className="space-y-6" aria-label="Form name">
  <div>
    <label htmlFor="input-id" className="...">
      Label
    </label>
    <Input
      id="input-id"
      aria-required="true"
      aria-label="Description"
      aria-invalid={!!error}
      aria-describedby={error ? "error-id" : undefined}
      className={error ? "border-red-500" : ""}
    />
    {error && (
      <p id="error-id" role="alert" className="...">
        {error}
      </p>
    )}
  </div>

  <Button
    type="submit"
    disabled={isSubmitting}
    className="min-h-[44px]"
    aria-label="Submit form"
  >
    {isSubmitting ? "Submitting..." : "Submit"}
  </Button>
</form>
```

---

## Performance Patterns

### Image Loading Strategy

```typescript
// Hero images (above fold)
<Image priority={true} loading="eager" />

// Below fold images
<Image priority={false} loading="lazy" sizes="..." />

// Responsive sizes
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

### Resource Hints

```typescript
// In layout.tsx head
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```

---

## Accessibility Checklist

✅ **Semantic HTML**: Use proper HTML5 elements  
✅ **ARIA Labels**: Add labels for interactive elements  
✅ **Keyboard Navigation**: All interactive elements keyboard accessible  
✅ **Focus Management**: Visible focus indicators  
✅ **Color Contrast**: Meet WCAG AA standards  
✅ **Alt Text**: Descriptive alt text for all images  
✅ **Skip Links**: Skip to main content link  
✅ **Touch Targets**: Minimum 44x44px for touch targets  
✅ **Error Messages**: Properly associated with form fields  
✅ **Screen Reader**: Test with screen readers

---

## Code Quality Standards

### Linting & Formatting

- Use ESLint with Next.js config
- Follow TypeScript strict mode
- Use Prettier for consistent formatting
- No `any` types (use `unknown` if needed)
- No unused variables or imports

### Error Handling

```typescript
// Always handle errors gracefully
try {
  await operation();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  // User-friendly error message
}

// Form validation
const validateForm = () => {
  const errors: Record<string, string> = {};
  if (!value.trim()) {
    errors.field = "Field is required";
  }
  return errors;
};
```

### Comments

```typescript
// Use comments for complex logic
// Explain WHY, not WHAT

// ✅ Good
// Calculate delay based on index to create staggered animation effect
const delay = index * 0.1;

// ❌ Bad
// Set delay to index times 0.1
const delay = index * 0.1;
```

---

## Testing Patterns

### Component Testing Structure

```typescript
// Test accessibility
describe("Component", () => {
  it("should be accessible", () => {
    // Test ARIA attributes
    // Test keyboard navigation
    // Test screen reader compatibility
  });

  it("should handle interactions", () => {
    // Test user interactions
    // Test state changes
  });
});
```

---

## Deployment Checklist

- [ ] All metadata properly configured
- [ ] Structured data validated
- [ ] Images optimized and have alt text
- [ ] Performance optimizations enabled
- [ ] Security headers configured
- [ ] Analytics integrated
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] 404 page with SEO metadata
- [ ] Error boundaries implemented
- [ ] Accessible to screen readers
- [ ] Tested on mobile devices

---

## Quick Reference

### Color Palette

- Background: `#0a0e1a`, `#111827`, `#0f172a`
- Primary: `cyan-400` (`#06b6d4`)
- Secondary: `blue-400` (`#3b82f6`)
- Tertiary: `violet-400` (`#8b5cf6`)
- Text: `slate-100`, `slate-300`, `slate-400`

### Spacing Scale

- Section padding: `py-20 px-4 sm:px-6 lg:px-8`
- Component gap: `gap-4`, `gap-6`
- Margin: `mb-6`, `mt-4`

### Typography

- Headings: `font-mono` (JetBrains Mono)
- Body: Default sans-serif (Inter)
- Sizes: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-3xl`

### Animation Durations

- Fast: `0.2-0.3s`
- Standard: `0.6-0.8s`
- Slow: `1-2s`

---

## Cursor Effects

### TargetCursor Component

The `TargetCursor` component provides an animated cursor that responds to interactive elements marked with the `.cursor-target` class.

```typescript
// Elements that should trigger cursor effects
<button className="cursor-target">
  Interactive Button
</button>

// TargetCursor is automatically included in the root layout
// It's disabled on mobile devices automatically
```

### BlogCursorEffect Component

Used specifically for blog routes, provides a label-following cursor effect.

```typescript
import { BlogCursorEffect } from "@/components/effects/BlogCursorEffect";

<BlogCursorEffect label="Creative Reading" targetSelector="[data-blog-category]">
  {/* Blog content */}
</BlogCursorEffect>
```

### Mobile Detection

All cursor effects automatically detect and disable on mobile devices:

```typescript
const isMobile = useMemo(() => {
  if (typeof window === "undefined") return false;
  const hasTouchScreen =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  return hasTouchScreen && isSmallScreen;
}, []);
```

### Cursor Effect Best Practices

- Always disable on mobile devices
- Use `.cursor-target` class for interactive elements
- Cursor effects are automatically disabled on blog routes (uses BlogCursorEffect instead)
- GSAP is used for smooth animations
- Cursor effects use `mix-blend-difference` for visibility

---

## API Routes

### Route Handler Pattern

API routes follow Next.js 15 App Router conventions:

```typescript
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.field) {
      return NextResponse.json({ error: "Field is required" }, { status: 400 });
    }

    // Process request
    const result = await processRequest(body);

    return NextResponse.json(
      { message: "Success", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Contact API Route

The contact form API route (`/api/contact/route.ts`) handles form submissions:

- Validates required fields (name, email, message)
- Validates email format
- Enforces message length limits (5000 chars)
- Integrates with Resend for email sending
- Falls back to console logging in development
- Returns appropriate HTTP status codes

### Error Handling

Always return proper HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

---

## Middleware

The middleware (`src/middleware.ts`) handles:

### Security Headers

- `X-DNS-Prefetch-Control` - DNS prefetching
- `Strict-Transport-Security` - HSTS
- `X-Frame-Options` - Clickjacking protection
- `X-Content-Type-Options` - MIME type sniffing protection
- `X-XSS-Protection` - XSS protection
- `Referrer-Policy` - Referrer information
- `Permissions-Policy` - Feature permissions

### Cache Control

- Static assets (images, fonts): `max-age=31536000, immutable`
- JavaScript/CSS: `max-age=31536000, immutable`
- HTML pages: `s-maxage=60, stale-while-revalidate=300`

### Middleware Configuration

```typescript
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

---

## Color Palette System

### Using Color Palettes

The project uses a dynamic color palette system with CSS variables:

```typescript
// Access palette in components
import { useColorPalette } from "@/contexts/ColorPaletteContext";

export function Component() {
  const { currentPalette, setPalette, availablePalettes } = useColorPalette();

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <button onClick={() => setPalette("purple")}>
        Switch to Purple
      </button>
    </div>
  );
}
```

### CSS Variables

Available CSS variables:

- `--color-primary` - Primary accent color
- `--color-secondary` - Secondary accent color
- `--color-accent` - Tertiary accent color
- `--color-background` - Background color
- `--color-surface` - Surface/card background
- `--color-text` - Primary text color
- `--color-border` - Border color

### Theme Utility Classes

Use theme utility classes for consistent styling:

- `bg-theme-background` - Background color
- `text-theme-primary` - Primary text color
- `border-theme-border` - Border color
- `bg-theme-surface` - Surface background

### Available Palettes

- `default` - Cyan Blue (default)
- `purple` - Purple Dream
- `green` - Emerald Forest
- `orange` - Sunset Orange
- `red` - Crimson Red
- `blue` - Ocean Blue

### Palette Persistence

Palette selection is persisted in `localStorage` and restored on page load.

---

## Blog System

### Blog Post Structure

Blog posts are stored in `src/data/blogPosts.json`:

```typescript
interface BlogPostsProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image?: string;
  content: string; // Markdown content
  link?: string;
}
```

### Accessing Blog Posts

```typescript
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blogData";

// Get all posts
const posts = getAllBlogPosts();

// Get single post
const post = getBlogPostBySlug("slug-name");

// Filter by category
const filtered = posts.filter((p) => p.category === "Beginners");
```

### Markdown Rendering

Blog content is rendered using `MarkdownRenderer`:

```typescript
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

<MarkdownRenderer content={post.content} />
```

### Blog Categories

Categories are used for filtering:

- `Beginners` - Beginner-friendly content
- `Learning` - Learning resources
- `Motivation` - Motivational content

### Blog SEO

Each blog post includes:

- Structured data (JSON-LD)
- Meta tags
- Open Graph tags
- Twitter Card tags

---

This style guide ensures consistency across the codebase and helps AI assistants understand the project's patterns and conventions.
