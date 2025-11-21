# Development Workflow

This document describes the development workflow, setup, and best practices for working on this project.

## Table of Contents

- [Local Setup](#local-setup)
- [Git Workflow](#git-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)

---

## Local Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (package manager)
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Clone repository**

   ```bash
   git clone https://github.com/FardinMahadi/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create environment file** (optional)

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check
```

---

## Git Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-new-section`
- `fix/contact-form-validation`
- `docs/update-readme`
- `refactor/navigation-component`

### Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

**Examples**:

```
feat(blog): add category filtering
fix(contact): validate email format
docs(readme): update installation steps
refactor(nav): improve mobile menu
```

### Workflow Steps

1. **Create branch**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes**
   - Write code
   - Test locally
   - Commit changes

3. **Commit changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push branch**

   ```bash
   git push origin feature/my-feature
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Create PR
   - Request review
   - Address feedback

6. **Merge**
   - After approval
   - Merge to main
   - Delete branch

---

## Code Standards

### TypeScript

- Use explicit types
- Avoid `any`
- Use interfaces for object shapes
- Use types for unions/intersections

```typescript
// ✅ Good
interface ComponentProps {
  title: string;
  onClick: () => void;
}

// ❌ Bad
function Component(props: any) {}
```

### React Components

- Use functional components
- Named exports
- Type all props
- Use hooks properly

```typescript
// ✅ Good
export function Component({ title }: ComponentProps) {
  return <div>{title}</div>;
}

// ❌ Bad
export default function Component(props) {
  return <div>{props.title}</div>;
}
```

### Styling

- Use Tailwind CSS
- Use CSS variables for colors
- Mobile-first approach
- Consistent spacing

```typescript
// ✅ Good
className="px-4 sm:px-6 lg:px-8"

// ❌ Bad
style={{ padding: "1rem" }}
```

### File Organization

- One component per file
- Co-locate related files
- Use index files for exports
- Group by feature

```
components/
  LandingPage/
    HeroSection.tsx
    Navigation.tsx
  blog/
    BlogIndexPage.tsx
```

### Formatting

- Follow the shared `.prettierrc.cjs` rules (two-space indent, single quotes, trailing commas, `arrowParens: "always"`, `printWidth: 100`) so markup, JS/TS, and Markdown stay consistent across docs and code.
- `pnpm format` rewrites files, while `pnpm format:check` reports misalignment before linting or committing.
- ESLint/perfectionist still governs import ordering, unused imports, and restricted class names; keep formatting separate and run the format command before or after lint runs as needed.

---

## Testing

### Manual Testing

Test these areas:

- [ ] All pages load
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] Images load
- [ ] Responsive design
- [ ] Animations work
- [ ] Color palette switching
- [ ] Blog posts render

### Browser Testing

Test in:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

### Performance Testing

- Lighthouse scores
- Core Web Vitals
- Bundle size
- Image optimization

---

## Debugging

### Common Issues

#### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

#### Type Errors

```bash
# Check TypeScript
pnpm tsc --noEmit
```

#### Dependency Issues

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Debugging Tools

1. **Browser DevTools**
   - Console for errors
   - Network tab for requests
   - Performance tab for profiling

2. **VS Code Debugger**
   - Set breakpoints
   - Step through code
   - Inspect variables

3. **React DevTools**
   - Component tree
   - Props inspection
   - State debugging

### Console Logging

```typescript
// Development only
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
```

---

## Common Tasks

### Adding a New Component

1. Create component file
2. Add TypeScript types
3. Implement component
4. Add to appropriate location
5. Export if needed
6. Test component

### Adding a New Page

1. Create page file in `app/`
2. Add route
3. Implement page
4. Add navigation link
5. Test routing

### Updating Styles

1. Use Tailwind classes
2. Use CSS variables for colors
3. Test responsive design
4. Check dark mode (if applicable)

### Adding Blog Post

1. Edit `src/data/blogPosts.json`
2. Add new post object
3. Test rendering
4. Verify SEO

### Updating Dependencies

1. Check for updates

   ```bash
   pnpm outdated
   ```

2. Update package

   ```bash
   pnpm update package-name
   ```

3. Test changes
4. Commit update

---

## Best Practices

### 1. Code Quality

- Write clean, readable code
- Follow project conventions
- Use TypeScript strictly
- Comment complex logic

### 2. Performance

- Optimize images
- Lazy load components
- Minimize bundle size
- Use proper caching

### 3. Accessibility

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support

### 4. Security

- Don't commit secrets
- Validate inputs
- Sanitize data
- Use HTTPS

---

## Troubleshooting

### Port Already in Use

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### Type Errors

```bash
# Restart TypeScript server
# In VS Code: Cmd/Ctrl + Shift + P
# Type: "TypeScript: Restart TS Server"
```

---

## Summary

Development workflow:

1. ✅ Setup local environment
2. ✅ Create feature branch
3. ✅ Make changes
4. ✅ Test locally
5. ✅ Commit and push
6. ✅ Create PR
7. ✅ Address feedback
8. ✅ Merge

For more information:

- [Style Guide](../reference/style-guide.md)
- [Contributing](./contributing.md)
- [Troubleshooting](../guides/troubleshooting.md)
