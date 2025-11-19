# Data Structures

This document describes the JSON data structures and TypeScript types used throughout the portfolio project.

## Table of Contents

- [Projects Data](#projects-data)
- [Blog Posts Data](#blog-posts-data)
- [Social Links Data](#social-links-data)
- [Type Definitions](#type-definitions)
- [Data Loading Patterns](#data-loading-patterns)

---

## Projects Data

### File Location

`src/data/projects.json`

### Schema

```typescript
interface ProjectsProps {
  title: string; // Project title
  description: string; // Project description
  role: string; // Your role in the project
  highlights: string[]; // Array of key achievements/highlights
  tags: string[]; // Technology tags
  image: string; // Main project image path
  width: number; // Image width in pixels
  height: number; // Image height in pixels
  gallery: Array<{
    // Additional project images
    src: string; // Image source path
    width: number; // Image width
    height: number; // Image height
    alt: string; // Alt text for accessibility
  }>;
  liveUrl?: string; // Optional: Live project URL
  codeUrl?: string; // Optional: Source code URL
}
```

### Example

```json
{
  "title": "Lern Beta Platform",
  "description": "Personal project: an AI-powered learning platform landing page focused on delivering quality education access for all.",
  "role": "Product Designer & Engineer",
  "highlights": [
    "Crafted messaging and visuals to tell the story behind Lern's AI assistant.",
    "Architected responsive layout and CTA flow to drive sign-ups on any device.",
    "Deployed to Vercel with performance budgets to keep the experience fast."
  ],
  "tags": ["Next.js", "Tailwind CSS", "Vercel", "AI"],
  "image": "/Projects/Lern/image.png",
  "width": 1600,
  "height": 900,
  "gallery": [
    {
      "src": "/Projects/Lern/image.png",
      "width": 1600,
      "height": 900,
      "alt": "Lern Beta landing page hero showing AI assistant messaging"
    }
  ],
  "liveUrl": "https://lern-beta.vercel.app/",
  "codeUrl": "https://github.com/FardinMahadi/Lern-AI-Powered-Study-Assistant-Uni-project-showcase"
}
```

### Usage

```typescript
import { projects } from "@/lib/projects";

// Access all projects
const allProjects = projects;

// Filter projects
const filteredProjects = projects.filter((p) => p.tags.includes("Next.js"));
```

---

## Blog Posts Data

### File Location

`src/data/blogPosts.json`

### Schema

```typescript
interface BlogPostsProps {
  title: string; // Blog post title
  excerpt: string; // Short description/excerpt
  date: string; // Publication date (e.g., "Dec 15, 2024")
  readTime: string; // Estimated read time (e.g., "8 min read")
  category: string; // Post category (e.g., "Beginners", "Learning", "Motivation")
  slug: string; // URL-friendly identifier
  image?: string; // Optional: Featured image URL
  content: string; // Full markdown content
  link?: string; // Optional: External link
}
```

### Example

```json
{
  "title": "🎉 Programming Should Be Fun: Breaking Down the Intimidation Barrier",
  "excerpt": "🎉 Programming doesn't have to be scary! Let's explore why coding is actually one of the most creative and rewarding skills you can learn, and how to approach it with excitement instead of fear.",
  "date": "Dec 15, 2024",
  "readTime": "8 min read",
  "category": "Beginners",
  "slug": "programming-should-be-fun-breaking-down-intimidation-barrier",
  "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  "content": "# 🎉 Programming Should Be Fun...\n\n[Full markdown content here]"
}
```

### Usage

```typescript
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blogData";

// Get all posts
const allPosts = getAllBlogPosts();

// Get single post by slug
const post = getBlogPostBySlug(
  "programming-should-be-fun-breaking-down-intimidation-barrier"
);

// Filter by category
const beginnerPosts = allPosts.filter((p) => p.category === "Beginners");
```

### Categories

Available categories:

- `Beginners` - Beginner-friendly content
- `Learning` - Learning resources and tutorials
- `Motivation` - Motivational and inspirational content

---

## Social Links Data

### File Location

`src/data/socialLinks.json`

### Schema

```typescript
interface SocialLinksProps {
  name: string; // Platform name (e.g., "GitHub", "LinkedIn")
  username: string; // Username or identifier
  icon: string; // Lucide icon name
  url: string; // Profile URL
  color: string; // Tailwind hover color class
  glow: string; // Tailwind glow effect class
}
```

### Example

```json
{
  "name": "GitHub",
  "username": "FardinMahadi",
  "icon": "Github",
  "url": "https://github.com/FardinMahadi/",
  "color": "hover:text-theme-text",
  "glow": "group-hover:shadow-theme-primary/30"
}
```

### Usage

```typescript
import socialLinksData from "@/data/socialLinks.json";

// Access all social links
const socialLinks = socialLinksData;
```

### Available Icons

Icons use Lucide React. Common icons:

- `Github`
- `Linkedin`
- `Mail`
- `MessageCircle`
- `Twitter`
- `Instagram`

---

## Type Definitions

### File Locations

Type definitions are located in `src/components/types/`:

- `ProjectsProps.tsx` - Project data types
- `BlogPostsProps.tsx` - Blog post data types
- `SocialLinksProps.tsx` - Social link data types
- `NavItemsProps.tsx` - Navigation item types
- `ExperienceProps.tsx` - Experience section types
- `TechStackProps.tsx` - Technology stack types

### ProjectsProps

```typescript
export interface ProjectsProps {
  title: string;
  description: string;
  role: string;
  highlights: string[];
  tags: string[];
  image: string;
  width: number;
  height: number;
  gallery: Array<{
    src: string;
    width: number;
    height: number;
    alt: string;
  }>;
  liveUrl?: string;
  codeUrl?: string;
}
```

### BlogPostsProps

```typescript
export interface BlogPostsProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image?: string;
  content: string;
  link?: string;
}
```

### SocialLinksProps

```typescript
export interface SocialLinksProps {
  name: string;
  username: string;
  icon: string;
  url: string;
  color: string;
  glow: string;
}
```

---

## Data Loading Patterns

### Projects

**File**: `src/lib/projects.ts`

```typescript
import type { ProjectsProps } from "@/components/types/ProjectsProps";
import projectsData from "@/data/projects.json";

export const projects: ProjectsProps[] = projectsData;
```

### Blog Posts

**File**: `src/lib/blogData.ts`

```typescript
import { BlogPostsProps } from "@/components/types/BlogPostsProps";
import blogPostsData from "@/data/blogPosts.json";

export const blogPosts: BlogPostsProps[] = blogPostsData as BlogPostsProps[];

// Helper function to get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPostsProps | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get all blog posts
export function getAllBlogPosts(): BlogPostsProps[] {
  return blogPosts;
}
```

### Social Links

Social links are imported directly from JSON:

```typescript
import socialLinksData from "@/data/socialLinks.json";
```

---

## Adding New Data

### Adding a New Project

1. Open `src/data/projects.json`
2. Add a new project object following the schema
3. Ensure all required fields are present
4. Add project images to `public/Projects/{ProjectName}/`
5. Update image paths in the JSON

### Adding a New Blog Post

1. Open `src/data/blogPosts.json`
2. Add a new blog post object
3. Ensure `slug` is URL-friendly (lowercase, hyphens)
4. Add markdown content to the `content` field
5. Set appropriate `category`

### Adding a New Social Link

1. Open `src/data/socialLinks.json`
2. Add a new social link object
3. Use a valid Lucide icon name
4. Set appropriate `color` and `glow` classes

---

## Data Validation

### Type Safety

All data is typed using TypeScript interfaces:

- Compile-time type checking
- IDE autocomplete support
- Prevents type errors

### Runtime Validation

Consider adding runtime validation for production:

- Use libraries like `zod` for schema validation
- Validate data on import
- Provide helpful error messages

---

## Best Practices

1. **Keep JSON files clean**: Use proper formatting and indentation
2. **Use descriptive slugs**: Blog post slugs should be readable and SEO-friendly
3. **Optimize images**: Use appropriate sizes and formats
4. **Provide alt text**: Always include descriptive alt text for images
5. **Validate data**: Use TypeScript types and consider runtime validation
6. **Keep data separate**: Don't mix data with component logic

---

## Migration Guide

If you need to migrate data:

1. **Backup existing data**: Copy JSON files before changes
2. **Update types first**: Modify TypeScript interfaces
3. **Update data files**: Modify JSON to match new types
4. **Test thoroughly**: Verify all components still work
5. **Update documentation**: Keep this doc in sync

---

## Summary

| Data Type    | File                        | Type Definition    | Helper Functions                           |
| ------------ | --------------------------- | ------------------ | ------------------------------------------ |
| Projects     | `src/data/projects.json`    | `ProjectsProps`    | Direct import                              |
| Blog Posts   | `src/data/blogPosts.json`   | `BlogPostsProps`   | `getAllBlogPosts()`, `getBlogPostBySlug()` |
| Social Links | `src/data/socialLinks.json` | `SocialLinksProps` | Direct import                              |
