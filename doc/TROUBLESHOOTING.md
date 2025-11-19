# Troubleshooting

This document provides solutions to common issues you might encounter while working with this portfolio project.

## Table of Contents

- [Build Errors](#build-errors)
- [Runtime Errors](#runtime-errors)
- [Performance Issues](#performance-issues)
- [Deployment Issues](#deployment-issues)
- [Environment Issues](#environment-issues)
- [Component Issues](#component-issues)

---

## Build Errors

### TypeScript Errors

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solutions**:

1. Check type definitions
2. Verify imports are correct
3. Use type assertions if needed
4. Check for missing type definitions

```bash
# Check TypeScript errors
pnpm tsc --noEmit
```

### Module Not Found

**Error**: `Cannot find module 'X'`

**Solutions**:

1. Install missing dependency

   ```bash
   pnpm add package-name
   ```

2. Check import paths

   ```typescript
   // ✅ Good
   import { Component } from "@/components/Component";

   // ❌ Bad
   import { Component } from "../../components/Component";
   ```

3. Clear cache and reinstall
   ```bash
   rm -rf node_modules .next
   pnpm install
   ```

### Build Fails

**Error**: Build command failed

**Solutions**:

1. Check build logs for specific errors
2. Verify Node.js version (18+)
3. Clear Next.js cache

   ```bash
   rm -rf .next
   pnpm build
   ```

4. Check for syntax errors
   ```bash
   pnpm lint
   ```

---

## Runtime Errors

### Hydration Errors

**Error**: `Hydration failed because the initial UI does not match` or `Minified React error #418`

**Solutions**:

1. **Use mounted state pattern** - Prevent conditional rendering based on client-only state

```typescript
// ✅ Good - Prevents hydration mismatch
"use client";
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// Only render client-only content after mount
if (!mounted) {
  return <div>Loading...</div>; // Or return null
}
```

2. **Avoid conditional rendering based on client state during SSR**

```typescript
// ❌ Bad - Causes hydration mismatch
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  setIsLoading(false);
}, []);

if (isLoading) {
  return <Loader />; // Server renders this, client doesn't
}

// ✅ Good - Use mounted pattern
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null; // Consistent on server and client
}
```

3. **Check for browser-only APIs during render**

```typescript
// ❌ Bad - window/document in render
function Component() {
  const isMobile = window.innerWidth < 768; // Error during SSR
  return <div>{isMobile ? "Mobile" : "Desktop"}</div>;
}

// ✅ Good - Check in useEffect
function Component() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return <div>{isMobile ? "Mobile" : "Desktop"}</div>;
}
```

4. **Ensure consistent initial state**

```typescript
// ❌ Bad - Different initial values
const [value, setValue] = useState(
  typeof window !== "undefined" ? localStorage.getItem("key") : null
);

// ✅ Good - Consistent initial state
const [value, setValue] = useState(null);

useEffect(() => {
  setValue(localStorage.getItem("key"));
}, []);
```

5. **Check for date/time formatting differences**

```typescript
// ❌ Bad - Different output on server vs client
const date = new Date().toLocaleString(); // Timezone differences

// ✅ Good - Use consistent formatting or client-only
const [date, setDate] = useState("");

useEffect(() => {
  setDate(new Date().toLocaleString());
}, []);
```

### Cursor Effects Not Working

**Error**: Cursor effects don't appear

**Solutions**:

1. Check if on mobile (auto-disabled)
2. Verify component is in layout
3. Check browser console for errors
4. Ensure GSAP is loaded

### Images Not Loading

**Error**: Images return 404

**Solutions**:

1. Verify image paths

   ```typescript
   // ✅ Good - absolute path from public
   src = "/Images/me.jpg";

   // ❌ Bad - relative path
   src = "./Images/me.jpg";
   ```

2. Check images are in `public/` folder
3. Verify Next.js Image configuration
4. Check remote image domains in `next.config.ts`

### Form Not Submitting

**Error**: Contact form doesn't send emails

**Solutions**:

1. Check environment variables

   ```bash
   echo $RESEND_API_KEY
   ```

2. Verify API route is working

   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test"}'
   ```

3. Check browser console for errors
4. Verify Resend API key is valid

---

## Performance Issues

### Slow Page Loads

**Solutions**:

1. Optimize images

   ```typescript
   <Image
     src={src}
     width={800}
     height={600}
     quality={85}
     loading="lazy"
   />
   ```

2. Check bundle size

   ```bash
   pnpm build
   # Check .next/analyze for bundle analysis
   ```

3. Use dynamic imports

   ```typescript
   const Component = dynamic(() => import('./Component'), {
     loading: () => <Loading />,
   });
   ```

4. Enable compression in `next.config.ts`

### Animation Lag

**Solutions**:

1. Reduce animation complexity
2. Use `will-change` CSS property
3. Limit number of simultaneous animations
4. Use `once: true` for scroll animations

```typescript
const isInView = useInView(ref, { once: true });
```

### Memory Leaks

**Solutions**:

1. Cleanup event listeners

   ```typescript
   useEffect(() => {
     window.addEventListener("resize", handleResize);
     return () => {
       window.removeEventListener("resize", handleResize);
     };
   }, []);
   ```

2. Cancel animations
   ```typescript
   useEffect(() => {
     const animation = gsap.to(element, { ... });
     return () => animation.kill();
   }, []);
   ```

---

## Deployment Issues

### Hydration Errors on Vercel

**Error**: `Minified React error #418` or `Hydration failed` on production but works locally

**Common Causes**:

1. **Conditional rendering based on client state**
   - Loading states that differ between server and client
   - Browser API checks during render
   - Date/time formatting differences

2. **Solutions**:

```typescript
// Fix: Use mounted pattern
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// Only render client-specific content after mount
if (!mounted) return null;
```

3. **Check for these patterns**:
   - `useState(true)` with conditional rendering
   - `window` or `document` in component body
   - `localStorage` or `sessionStorage` in initial state
   - Random values or IDs generated differently

4. **Debug steps**:

   ```bash
   # Build locally to catch hydration issues
   pnpm build
   pnpm start

   # Check for hydration warnings in console
   # Look for "Text content does not match" errors
   ```

### Build Fails on Vercel

**Solutions**:

1. Check build logs in Vercel dashboard
2. Verify Node.js version in `package.json`
3. Check environment variables are set
4. Ensure all dependencies are in `package.json`

### Environment Variables Not Working

**Solutions**:

1. Verify variables in Vercel settings
2. Check variable names (case-sensitive)
3. Redeploy after adding variables
4. Check variable values are correct

### 404 Errors on Deployed Site

**Solutions**:

1. Check routing structure
2. Verify `next.config.ts` settings
3. Check for case-sensitive paths
4. Ensure pages are in correct directories

---

## Environment Issues

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solutions**:

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
pnpm dev -- -p 3001
```

### Dependencies Out of Sync

**Error**: Package version conflicts

**Solutions**:

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Update dependencies
pnpm update
```

### Environment Variables Not Loading

**Solutions**:

1. Check `.env.local` exists in project root
2. Verify file name is exactly `.env.local`
3. Restart development server
4. Check variable names match code

---

## Component Issues

### Component Not Rendering

**Solutions**:

1. Check component is exported

   ```typescript
   // ✅ Good
   export function Component() {}

   // ❌ Bad
   function Component() {}
   ```

2. Verify import path
3. Check for errors in console
4. Verify component is used correctly

### Styling Not Applying

**Solutions**:

1. Check Tailwind classes are correct
2. Verify CSS variables are set
3. Check for CSS specificity issues
4. Ensure Tailwind is configured

### Animation Not Working

**Solutions**:

1. Check Framer Motion is installed
2. Verify `useInView` hook is used
3. Check animation props are correct
4. Test with simple animation first

---

## Quick Fixes

### Clear Everything

```bash
# Nuclear option - clears all caches
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Reset Environment

```bash
# Remove environment file
rm .env.local

# Create new one
cp .env.example .env.local
# Edit with your values
```

### TypeScript Reset

```bash
# Restart TypeScript server
# VS Code: Cmd/Ctrl + Shift + P
# Type: "TypeScript: Restart TS Server"
```

---

## Getting Help

If you can't resolve an issue:

1. **Check Documentation**
   - Review relevant docs
   - Search for similar issues

2. **Check GitHub Issues**
   - Search existing issues
   - Check if already reported

3. **Create Issue**
   - Provide detailed information
   - Include error messages
   - Add steps to reproduce

4. **Ask for Help**
   - Open GitHub discussion
   - Provide context
   - Share relevant code

---

## Summary

Common fixes:

- ✅ Clear cache: `rm -rf .next`
- ✅ Reinstall: `rm -rf node_modules && pnpm install`
- ✅ Check types: `pnpm tsc --noEmit`
- ✅ Check logs: Browser console and build logs
- ✅ Verify config: `next.config.ts`, environment variables

For more information:

- [Development Workflow](./DEVELOPMENT_WORKFLOW.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [API Documentation](./API_DOCUMENTATION.md)
