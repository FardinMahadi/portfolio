# Deployment Guide

This document provides step-by-step instructions for deploying the portfolio to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Build Configuration](#build-configuration)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Resend account (for contact form emails)
- ✅ Domain name (optional)

---

## Vercel Deployment

### Step 1: Prepare Repository

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Ensure `.env.local` is in `.gitignore` (it should be by default)

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Select the repository

### Step 3: Configure Project

Vercel will auto-detect Next.js settings:

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `pnpm build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `pnpm install` (auto-detected)

### Step 4: Add Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add the following variables:

   ```
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=your-email@example.com
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

3. Select environment (Production, Preview, Development)
4. Click "Save"

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `your-project.vercel.app`

---

## Environment Variables

### Required for Email Functionality

```env
RESEND_API_KEY=re_your_api_key_here
```

### Optional

```env
CONTACT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Setting in Vercel

1. Project Settings → Environment Variables
2. Add each variable
3. Select environment (Production/Preview/Development)
4. Save and redeploy

For detailed information, see [Environment Variables](./ENVIRONMENT_VARIABLES.md).

---

## Build Configuration

### Next.js Config

The project uses `next.config.ts` with:

- Image optimization
- Security headers
- Cache control
- Compression

No changes needed for deployment.

### Build Command

Vercel automatically uses:

```bash
pnpm build
```

### Build Output

Next.js generates:

- Static pages
- Server components
- API routes
- Optimized assets

---

## Post-Deployment

### 1. Verify Deployment

1. Visit your live URL
2. Test all pages
3. Check contact form
4. Verify images load
5. Test on mobile

### 2. Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

### 3. Analytics

Consider adding:

- Vercel Analytics (built-in)
- Google Analytics
- Plausible Analytics

### 4. Performance

Check:

- Lighthouse scores
- Core Web Vitals
- Image optimization
- Bundle size

---

## Troubleshooting

### Build Fails

**Error**: Build command failed

**Solutions**:

1. Check build logs in Vercel
2. Verify all dependencies in `package.json`
3. Ensure Node.js version is compatible
4. Check for TypeScript errors locally first

### Environment Variables Not Working

**Error**: Contact form not sending emails

**Solutions**:

1. Verify variables are set in Vercel
2. Check variable names (case-sensitive)
3. Redeploy after adding variables
4. Check Resend API key is valid

### Images Not Loading

**Error**: Images return 404

**Solutions**:

1. Verify images are in `public/` folder
2. Check image paths in code
3. Ensure images are committed to Git
4. Check Next.js Image configuration

### Performance Issues

**Error**: Slow page loads

**Solutions**:

1. Optimize images (use Next.js Image)
2. Enable compression in `next.config.ts`
3. Check bundle size
4. Use Vercel Analytics to identify issues

### 404 Errors

**Error**: Pages return 404

**Solutions**:

1. Check routing structure
2. Verify `next.config.ts` settings
3. Check for case-sensitive paths
4. Ensure pages are in correct directories

---

## Alternative Deployment Options

### Netlify

1. Connect GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

### Self-Hosting

1. Build locally: `pnpm build`
2. Start server: `pnpm start`
3. Use reverse proxy (nginx)
4. Configure SSL certificate
5. Set up environment variables

---

## Continuous Deployment

Vercel automatically deploys:

- Every push to `main` branch → Production
- Pull requests → Preview deployments

### Manual Deployment

You can also trigger manual deployments:

1. Go to Vercel dashboard
2. Select project
3. Click "Deployments"
4. Click "Redeploy"

---

## Monitoring

### Vercel Analytics

Built-in analytics show:

- Page views
- Performance metrics
- Error rates
- Geographic data

### Error Tracking

Consider adding:

- Sentry
- LogRocket
- Vercel's error tracking

---

## Security Checklist

Before going live:

- [ ] Environment variables set
- [ ] API keys secured
- [ ] Security headers configured
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] No sensitive data in code
- [ ] `.env.local` in `.gitignore`

---

## Summary

Deployment process:

1. ✅ Push code to GitHub
2. ✅ Connect to Vercel
3. ✅ Configure environment variables
4. ✅ Deploy
5. ✅ Verify and test

For more information:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](./ENVIRONMENT_VARIABLES.md)
