# Blog System

This document describes the blog system architecture and how to manage blog content.

## Table of Contents

- [Overview](#overview)
- [Blog Post Structure](#blog-post-structure)
- [Adding Blog Posts](#adding-blog-posts)
- [Markdown Rendering](#markdown-rendering)
- [Categories](#categories)
- [SEO Implementation](#seo-implementation)
- [Routing](#routing)

---

## Overview

The blog system uses:

- JSON file for blog post metadata (`src/data/blogPosts.json`)
- Markdown content stored in JSON
- Next.js App Router for routing
- React Markdown for rendering
- Category-based filtering

---

## Blog Post Structure

### Data Schema

```typescript
interface BlogPostsProps {
  title: string; // Blog post title
  excerpt: string; // Short description (used in listings)
  date: string; // Publication date (e.g., "Dec 15, 2024")
  readTime: string; // Estimated read time (e.g., "8 min read")
  category: string; // Category (e.g., "Beginners", "Learning")
  slug: string; // URL-friendly identifier
  image?: string; // Optional: Featured image URL
  content: string; // Full markdown content
  link?: string; // Optional: External link
}
```

### Example Blog Post

```json
{
  "title": "🎉 Programming Should Be Fun",
  "excerpt": "Programming doesn't have to be scary! Let's explore why coding is actually one of the most creative and rewarding skills you can learn.",
  "date": "Dec 15, 2024",
  "readTime": "8 min read",
  "category": "Beginners",
  "slug": "programming-should-be-fun",
  "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  "content": "# 🎉 Programming Should Be Fun\n\n[Full markdown content here]"
}
```

---

## Adding Blog Posts

### Step 1: Create Content

Write your blog post in Markdown format. Supported features:

- Headings (h1-h4)
- Paragraphs
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Inline code
- Links
- Bold and italic text
- Blockquotes
- Tables (via remark-gfm)
- Images

### Step 2: Generate Slug

Create a URL-friendly slug from your title:

- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Keep it descriptive

Example: `"Programming Should Be Fun"` → `"programming-should-be-fun"`

### Step 3: Calculate Read Time

Estimate read time (average reading speed: 200-250 words per minute):

- Count words in content
- Divide by 200-250
- Round to nearest minute
- Format: `"8 min read"`

### Step 4: Add to JSON

Open `src/data/blogPosts.json` and add your post:

```json
{
  "title": "Your Post Title",
  "excerpt": "Short description",
  "date": "Jan 15, 2025",
  "readTime": "5 min read",
  "category": "Beginners",
  "slug": "your-post-slug",
  "image": "https://example.com/image.jpg",
  "content": "# Your Markdown Content\n\n..."
}
```

**Important**: Add new posts at the beginning of the array (most recent first).

### Step 5: Verify

1. Start development server: `pnpm dev`
2. Navigate to `/blog`
3. Verify post appears in list
4. Click to view full post
5. Check markdown rendering

---

## Markdown Rendering

### MarkdownRenderer Component

**Location**: `src/components/blog/MarkdownRenderer.tsx`

**Usage**:

```typescript
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

<MarkdownRenderer content={post.content} />
```

### Supported Markdown Features

#### Headings

```markdown
# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading
```

#### Lists

```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

#### Code Blocks

````markdown
```javascript
const code = "example";
```
````

Supported languages: JavaScript, TypeScript, Python, HTML, CSS, JSON, and more.

#### Inline Code

```markdown
Use `code` inline
```

#### Links

```markdown
[Link text](https://example.com)
```

#### Images

```markdown
![Alt text](https://example.com/image.jpg)
```

#### Bold and Italic

```markdown
**Bold text** and _italic text_
```

#### Blockquotes

```markdown
> This is a quote
```

#### Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

### Custom Styling

The MarkdownRenderer applies custom styles:

- Dark theme colors
- Syntax highlighting (Prism)
- Terminal/code editor aesthetic
- Responsive typography

---

## Categories

### Available Categories

- `Beginners` - Beginner-friendly content
- `Learning` - Learning resources and tutorials
- `Motivation` - Motivational and inspirational content

### Adding Categories

1. Add category to blog post:

   ```json
   {
     "category": "NewCategory"
   }
   ```

2. Category will automatically appear in filter
3. No code changes needed

### Filtering by Category

```typescript
import { getAllBlogPosts } from "@/lib/blogData";

const posts = getAllBlogPosts();
const filtered = posts.filter((p) => p.category === "Beginners");
```

---

## SEO Implementation

### Structured Data (JSON-LD)

Each blog post includes structured data:

```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.excerpt,
  image: post.image,
  datePublished: post.date,
  author: {
    "@type": "Person",
    name: "Mahadi Hasan Fardin",
  },
};
```

### Meta Tags

Blog posts include:

- Title (with site name)
- Description (excerpt)
- Open Graph tags
- Twitter Card tags
- Canonical URL

### Implementation

**Location**: `src/app/blog/[slug]/page.tsx`

```typescript
export async function generateMetadata({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
```

---

## Routing

### Blog Index

**Route**: `/blog`

**File**: `src/app/blog/page.tsx`

**Features**:

- Lists all blog posts
- Category filtering
- Search functionality
- Pagination (if needed)

### Individual Post

**Route**: `/blog/[slug]`

**File**: `src/app/blog/[slug]/page.tsx`

**Features**:

- Dynamic routing based on slug
- Markdown rendering
- SEO metadata
- Related posts (optional)

### Generating Routes

Next.js automatically generates routes from the file structure:

- `/blog` → `src/app/blog/page.tsx`
- `/blog/my-post` → `src/app/blog/[slug]/page.tsx`

---

## Best Practices

### 1. Content Quality

- Write clear, engaging content
- Use proper markdown formatting
- Include code examples where relevant
- Add images for visual interest

### 2. SEO Optimization

- Use descriptive titles
- Write compelling excerpts
- Include relevant keywords
- Add alt text to images

### 3. Performance

- Optimize images (use Next.js Image component)
- Keep content reasonable length
- Use lazy loading for images

### 4. Accessibility

- Use semantic HTML (via markdown)
- Include alt text for images
- Ensure proper heading hierarchy
- Test with screen readers

---

## Troubleshooting

### Post Not Appearing

1. Check JSON syntax (valid JSON)
2. Verify slug is unique
3. Check file is saved
4. Restart dev server

### Markdown Not Rendering

1. Check markdown syntax
2. Verify content field has content
3. Check browser console for errors
4. Test with simple markdown first

### Images Not Loading

1. Verify image URL is accessible
2. Check CORS settings
3. Use absolute URLs
4. Consider hosting images locally

---

## Summary

The blog system provides:

- ✅ JSON-based content management
- ✅ Markdown rendering with syntax highlighting
- ✅ Category filtering
- ✅ SEO optimization
- ✅ Dynamic routing
- ✅ Responsive design

For more information, see:

- [Data Structures](./DATA_STRUCTURES.md#blog-posts-data)
- [Component Reference](./COMPONENT_REFERENCE.md#blog-components)
