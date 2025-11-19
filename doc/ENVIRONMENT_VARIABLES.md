# Environment Variables

This document describes all environment variables used in this Next.js portfolio project.

## Table of Contents

- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Development Setup](#development-setup)
- [Production Setup](#production-setup)
- [Security Best Practices](#security-best-practices)

---

## Required Variables

### None for Basic Functionality

The portfolio works without any environment variables. However, certain features require configuration:

---

## Optional Variables

### Contact Form Email Integration

#### `RESEND_API_KEY`

**Type**: String  
**Required**: No (only for email functionality)  
**Default**: None  
**Description**: API key for Resend email service

**How to get**:

1. Sign up at [resend.com](https://resend.com)
2. Create an API key in the dashboard
3. Copy the key (starts with `re_`)

**Example**:

```env
RESEND_API_KEY=re_1234567890abcdefghijklmnopqrstuvwxyz
```

#### `CONTACT_EMAIL`

**Type**: String (email address)  
**Required**: No  
**Default**: `mahadihasanfardin2015@gmail.com`  
**Description**: Email address where contact form submissions are sent

**Example**:

```env
CONTACT_EMAIL=your-email@example.com
```

#### `RESEND_FROM_EMAIL`

**Type**: String (email address)  
**Required**: No  
**Default**: `onboarding@resend.dev`  
**Description**: Email address used as the sender for contact form emails

**Note**: Must be a verified domain in Resend for production use

**Example**:

```env
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

---

## Development Setup

### Creating `.env.local`

1. Create a `.env.local` file in the project root:

```bash
touch .env.local
```

2. Add your environment variables:

```env
# Contact Form (Optional - for email functionality)
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Development Behavior

- **Without `RESEND_API_KEY`**: Contact form still works, but emails are logged to console instead of being sent
- **With `RESEND_API_KEY`**: Contact form sends actual emails via Resend

### Testing Locally

You can test the contact form without setting up Resend:

- Form submissions will be logged to the console
- All validation still works
- Response format is identical

---

## Production Setup

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add each variable:
   - `RESEND_API_KEY` - Your Resend API key
   - `CONTACT_EMAIL` - Your contact email (optional)
   - `RESEND_FROM_EMAIL` - Your sender email (optional)

### Environment-Specific Values

You can set different values for:

- **Production**: Live site environment
- **Preview**: Pull request previews
- **Development**: Local development

### Verifying Setup

After deployment:

1. Submit a test contact form
2. Check your email inbox
3. Verify email was received

---

## Security Best Practices

### 1. Never Commit Secrets

**DO NOT** commit `.env.local` or `.env` files to version control.

The project includes `.env.local` in `.gitignore`:

```
.env*.local
.env
```

### 2. Use Different Keys for Development and Production

- Use a test Resend API key for development
- Use a production Resend API key for production
- Never share API keys publicly

### 3. Rotate Keys Regularly

- Change API keys if they're exposed
- Use Resend's dashboard to revoke old keys
- Generate new keys when needed

### 4. Limit API Key Permissions

- Use Resend's permission system to limit key scope
- Only grant necessary permissions
- Monitor API key usage

### 5. Validate Environment Variables

The application validates environment variables:

- Checks for required format
- Provides fallback values
- Logs warnings for missing optional variables

---

## Environment Variable Reference

### Complete Example `.env.local`

```env
# Contact Form Email Service
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Variable Validation

The application handles missing variables gracefully:

```typescript
// Example from contact API route
const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail =
  process.env.CONTACT_EMAIL || "mahadihasanfardin2015@gmail.com";
const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
```

---

## Troubleshooting

### Contact Form Not Sending Emails

1. **Check `RESEND_API_KEY` is set**

   ```bash
   echo $RESEND_API_KEY
   ```

2. **Verify API key format**
   - Should start with `re_`
   - Should be 40+ characters

3. **Check Resend dashboard**
   - Verify API key is active
   - Check usage limits
   - Review error logs

4. **Check email domain verification**
   - `RESEND_FROM_EMAIL` must use verified domain
   - Or use `onboarding@resend.dev` for testing

### Environment Variables Not Loading

1. **Restart development server**

   ```bash
   # Stop server (Ctrl+C)
   # Start again
   pnpm dev
   ```

2. **Check file location**
   - `.env.local` should be in project root
   - Not in `src/` or other subdirectories

3. **Check file name**
   - Must be exactly `.env.local`
   - Not `.env.local.txt` or similar

4. **Clear Next.js cache**
   ```bash
   rm -rf .next
   pnpm dev
   ```

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Resend Documentation](https://resend.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## Summary

| Variable            | Required | Default                           | Purpose                |
| ------------------- | -------- | --------------------------------- | ---------------------- |
| `RESEND_API_KEY`    | No       | None                              | Enable email sending   |
| `CONTACT_EMAIL`     | No       | `mahadihasanfardin2015@gmail.com` | Contact form recipient |
| `RESEND_FROM_EMAIL` | No       | `onboarding@resend.dev`           | Email sender address   |

**Note**: The portfolio works perfectly without any environment variables. They're only needed for email functionality.
