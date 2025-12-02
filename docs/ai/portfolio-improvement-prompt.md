# AI IDE Prompt: Portfolio Improvement Guide

Use this prompt with your AI-powered IDE (Cursor, Windsurf, GitHub Copilot, etc.) to systematically improve your portfolio project.

---

## 🎯 Project Context

You are working on **Fardin Mahadi Studio**, a Next.js 15 portfolio website with the following tech stack:

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom color palette system
- **Animation**: Framer Motion + GSAP
- **UI Components**: shadcn/ui + Lucide Icons
- **Email**: Resend API for contact form
- **Content**: JSON-driven data files in `src/data/`

### Key Files & Directories

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Landing page
│   ├── blog/              # Blog routes
│   ├── resume/            # Resume section
│   └── api/contact/       # Contact form API
├── components/
│   ├── LandingPage/       # Hero, Projects, Blog, Contact sections
│   ├── effects/           # Cursor effects, animations
│   ├── ui/                # shadcn/ui components
│   └── shared/            # Navigation, common components
├── contexts/
│   └── ColorPaletteContext.tsx  # Theme state management
├── data/
│   ├── projects.json      # Project showcase data
│   ├── blogPosts.json     # Blog content
│   ├── resumeData.json    # Resume information
│   └── socialLinks.json   # Social media links
└── lib/
    ├── colorPalettes.ts   # Theme definitions
    └── seo.ts             # SEO utilities
```

---

## 📋 Improvement Tasks

Copy and paste ONE of these prompts into your AI IDE to work on specific improvements:

---

### 1. Add "Available for Hire" Badge

```
Add an "Available for Hire" badge to the hero section that:
- Displays prominently near the main headline
- Uses a pulsing green dot animation to indicate availability
- Is theme-aware and uses CSS variables from the color palette system
- Can be toggled on/off via a constant or environment variable
- Is accessible with proper ARIA labels

Files to modify:
- src/components/LandingPage/hero/HeroSection.tsx or HeroCodeWindow.tsx
- Consider creating a new AvailabilityBadge.tsx component

Style guidelines:
- Use Framer Motion for subtle animations
- Match the existing design language (glassmorphism, theme colors)
- Ensure mobile responsiveness
```

---

### 2. Create Skills Section

```
Create a dedicated Skills section for the landing page that:
- Displays technology skills in a filterable grid or pill layout
- Groups skills by category (Frontend, Backend, Tools, etc.)
- Uses icons from Lucide or custom SVGs
- Animates on scroll using Framer Motion
- Is theme-aware using CSS variables

Implementation:
1. Create src/components/LandingPage/skills/SkillsSection.tsx
2. Create src/data/skills.json with categorized skill data
3. Add the section to src/app/page.tsx between IntroSummary and ProjectsSection

Data structure suggestion:
{
  "categories": [
    {
      "name": "Frontend",
      "skills": [
        { "name": "React", "icon": "react", "proficiency": "expert" },
        { "name": "Next.js", "icon": "nextjs", "proficiency": "expert" }
      ]
    }
  ]
}
```

---

### 3. Add Testimonials Section

```
Create a Testimonials section that:
- Displays client/colleague testimonials in a carousel or grid
- Shows name, role, company, avatar, and quote
- Uses smooth animations with Framer Motion
- Is responsive across all device sizes
- Matches the existing glassmorphism design

Implementation:
1. Create src/components/LandingPage/testimonials/TestimonialsSection.tsx
2. Create src/data/testimonials.json
3. Add to src/app/page.tsx after ProjectsSection

Features:
- Auto-rotating carousel with pause on hover
- Navigation dots or arrows
- Proper accessibility (ARIA labels, keyboard navigation)
- Theme-aware styling
```

---

### 4. Add Blog Search & Filter

```
Add search and category filtering to the blog index page:

Features:
- Real-time search input that filters posts by title/content
- Category filter buttons/tabs
- Smooth animations when filtering
- "No results" state with helpful messaging
- URL query params for shareable filtered views

Files to modify:
- src/components/blog/BlogIndexPage.tsx
- src/components/blog/CategoryFilter.tsx (enhance existing)

Implementation:
- Use React state for search query
- Debounce search input for performance
- Maintain keyboard accessibility
- Animate list items entering/leaving with Framer Motion
```

---

### 5. Add Social Share Buttons to Blog Posts

```
Add social share buttons to blog post pages:

Platforms to support:
- Twitter/X
- LinkedIn
- Copy link to clipboard

Implementation:
1. Create src/components/blog/ShareButtons.tsx
2. Add to src/components/blog/BlogPostContent.tsx

Features:
- Fixed position or inline placement
- Copy link with toast notification
- Generate proper share URLs with post title/description
- Accessible with proper ARIA labels
- Theme-aware styling
- Mobile-friendly (bottom sticky bar or floating action)
```

---

### 6. Add GitHub Stats Widget

```
Add a GitHub contributions/stats widget to the portfolio:

Display options:
- Contribution graph (green squares)
- Language usage breakdown
- Public repos count
- Total stars/forks

Implementation:
1. Create src/components/LandingPage/github/GitHubStats.tsx
2. Use GitHub GraphQL API or a service like github-readme-stats
3. Add to About section or create dedicated section

Considerations:
- Cache API responses to avoid rate limits
- Fallback UI if API fails
- Theme-aware color schemes
- Lazy load component for performance
```

---

### 7. Add Experience Timeline

```
Convert the experience section to a visual timeline:

Design:
- Vertical timeline with alternating left/right cards (desktop)
- Single column timeline (mobile)
- Date markers on the timeline
- Animated entry on scroll

Implementation:
- Modify src/components/experience/ExperienceSection.tsx
- Create TimelineItem.tsx component
- Use existing data from experienceData.ts

Features:
- Visual connection lines between items
- Current role highlighted differently
- Icons for each role/company
- Expandable details on click
```

---

### 8. Add Form Honeypot & Spam Protection

```
Add spam protection to the contact form:

Implementation:
1. Add a hidden honeypot field to ContactFormPanel.tsx
2. Update the API route at src/app/api/contact/route.ts to check the honeypot
3. Add rate limiting (optional)

Honeypot approach:
- Add hidden field named "website" or "company"
- Style it with CSS to hide from users
- Reject submissions where honeypot is filled
- Use aria-hidden for accessibility

Additional security:
- Add CSRF token if not present
- Validate email format server-side
- Sanitize all inputs
```

---

### 9. Improve Loading States & Toast Notifications

```
Enhance UX with better loading and feedback states:

Contact Form:
- Add loading spinner during submission
- Show success/error toast notifications
- Disable form during submission
- Clear form on success

Implementation:
1. Create or enhance src/components/ui/toast.tsx
2. Update ContactFormPanel.tsx with loading states
3. Add global toast container to layout.tsx

Features:
- Animated toast entrance/exit
- Auto-dismiss after timeout
- Dismissible by click
- Multiple toast queue support
- Theme-aware styling
```

---

### 10. Add Resume Preview Modal

```
Add a PDF preview modal for the resume section:

Features:
- Preview resume in modal before downloading
- Multiple template options with preview
- Download button in modal
- Responsive modal design

Implementation:
1. Create src/components/resume/ResumePreviewModal.tsx
2. Use @react-pdf/renderer for PDF generation
3. Add modal trigger to resume page
4. Use existing shadcn Dialog component

UX considerations:
- Loading state while PDF generates
- Fallback for browsers without PDF support
- Keyboard navigation (Escape to close)
- Mobile-friendly preview
```

---

### 11. Add Dark/Light Mode Toggle

```
Add an explicit dark/light mode toggle alongside the palette switcher:

Implementation:
1. Update src/contexts/ColorPaletteContext.tsx to include mode state
2. Create ModeToggle.tsx component with sun/moon icons
3. Add toggle to Navigation component
4. Persist preference to localStorage

Features:
- Smooth transition between modes
- Respect system preference on first visit
- Toggle animation with rotating icon
- Update all theme variables for light mode
- Ensure sufficient contrast in light mode
```

---

### 12. Add Accessibility Improvements

```
Audit and improve accessibility across the portfolio:

Tasks:
1. Run axe-core or Lighthouse accessibility audit
2. Fix any color contrast issues
3. Ensure all images have descriptive alt text
4. Test keyboard navigation flow
5. Verify skip-to-main-content link works
6. Add focus indicators to all interactive elements
7. Ensure proper heading hierarchy
8. Add ARIA labels where needed

Files to check:
- All components in src/components/
- Images in public/
- Navigation and interactive elements

Tools to use:
- Chrome DevTools Accessibility tab
- axe DevTools extension
- WAVE browser extension
```

---

### 13. Optimize Performance & Core Web Vitals

```
Audit and optimize performance:

Tasks:
1. Run Lighthouse performance audit
2. Optimize images (WebP format, proper sizing)
3. Lazy load below-fold content
4. Reduce JavaScript bundle size
5. Optimize animations for reduced motion preference
6. Add loading="lazy" to images
7. Preload critical assets

Files to check:
- next.config.ts for optimization settings
- Image components for proper next/image usage
- Heavy animation components

Metrics to target:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
```

---

## 🔧 General Guidelines

When implementing any improvement:

1. **Follow existing patterns**: Match the coding style, component structure, and naming conventions already used in the project.

2. **Use the theme system**: Always use CSS variables from the color palette (`--color-background`, `--color-primary`, etc.) instead of hardcoded colors.

3. **Ensure responsiveness**: Test on mobile, tablet, and desktop breakpoints.

4. **Add animations thoughtfully**: Use Framer Motion for scroll reveals and interactions, matching existing animation timing.

5. **Maintain accessibility**: Include proper ARIA labels, keyboard navigation, and focus states.

6. **Update types**: Add TypeScript interfaces for new data structures in `src/components/types/`.

7. **Test thoroughly**: Run `npm run lint` and `npm run build` after changes.

---

## 🚀 Quick Start Command

After pasting a prompt, start with:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

Then make your changes incrementally, testing in the browser as you go.

---

## 📚 Reference Documentation

- Existing roadmap: `docs/roadmap/portfolio-improvements.md`
- Style guide: `docs/reference/style-guide.md`
- Component docs: `docs/reference/components.md`
- AI training guide: `docs/ai/training-guide.md`

---

*This prompt guide was generated to help systematically improve the Fardin Mahadi Portfolio project.*
