# API Documentation

This document describes the API routes available in this Next.js portfolio project.

## Table of Contents

- [Contact API](#contact-api)
- [Request/Response Formats](#requestresponse-formats)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

---

## Contact API

### Endpoint

```
POST /api/contact
```

### Description

Handles contact form submissions from the portfolio website. Validates input, sends emails via Resend, and returns appropriate responses.

### Request

#### Headers

```
Content-Type: application/json
```

#### Body

```typescript
{
  name: string; // Required: User's name
  email: string; // Required: Valid email address
  message: string; // Required: Message content (max 5000 characters)
}
```

#### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project opportunity."
}
```

### Response

#### Success Response (200)

```json
{
  "message": "Thank you for your message! I'll get back to you soon."
}
```

#### Error Responses

**400 Bad Request - Missing Fields**

```json
{
  "error": "All fields are required"
}
```

**400 Bad Request - Invalid Email**

```json
{
  "error": "Invalid email address"
}
```

**400 Bad Request - Message Too Long**

```json
{
  "error": "Message is too long"
}
```

**500 Internal Server Error**

```json
{
  "error": "Failed to send message. Please try again later."
}
```

### Validation Rules

1. **Name**: Required, non-empty string
2. **Email**: Required, must match email regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. **Message**: Required, maximum length of 5000 characters

### Email Integration

The API integrates with [Resend](https://resend.com) for sending emails:

- **Production**: Requires `RESEND_API_KEY` environment variable
- **Development**: Falls back to console logging if API key is not set

#### Email Template

The email sent includes:

- Subject: `Contact Form Submission from {name}`
- HTML formatted email with:
  - Sender information (name, email)
  - Submission timestamp
  - Message content (formatted with line breaks)
- Plain text version for email clients that don't support HTML

### Implementation Details

**File**: `src/app/api/contact/route.ts`

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Message length check
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long" },
        { status: 400 }
      );
    }

    // Send email via Resend (if configured)
    // ...

    return NextResponse.json(
      { message: "Thank you for your message! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
```

---

## Request/Response Formats

### Request Format

All API requests should:

- Use `POST` method for form submissions
- Include `Content-Type: application/json` header
- Send JSON body with required fields

### Response Format

All API responses:

- Return JSON format
- Include appropriate HTTP status codes
- Provide clear error messages for failures
- Include success messages for successful operations

### Status Codes

- `200` - Success
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

---

## Error Handling

### Error Response Structure

```typescript
{
  error: string; // Human-readable error message
}
```

### Common Error Scenarios

1. **Missing Required Fields**
   - Status: `400`
   - Message: "All fields are required"

2. **Invalid Email Format**
   - Status: `400`
   - Message: "Invalid email address"

3. **Message Too Long**
   - Status: `400`
   - Message: "Message is too long"

4. **Server Errors**
   - Status: `500`
   - Message: "Failed to send message. Please try again later."

### Error Logging

All errors are logged to the console for debugging:

- Validation errors are logged with request details
- Server errors include full error stack traces
- Email sending errors are logged separately

---

## Environment Variables

### Required (for Production)

```env
RESEND_API_KEY=re_your_api_key_here
```

### Optional

```env
CONTACT_EMAIL=your-email@example.com          # Default: mahadihasanfardin2015@gmail.com
RESEND_FROM_EMAIL=onboarding@resend.dev      # Default: onboarding@resend.dev
```

### Development Mode

If `RESEND_API_KEY` is not set:

- API still returns success response
- Email details are logged to console
- Useful for local development and testing

---

## Testing

### Manual Testing

#### Using cURL

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

#### Using JavaScript Fetch

```javascript
fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "This is a test message",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Test Cases

1. **Valid Request**
   - Should return 200 with success message
   - Should send email (if RESEND_API_KEY is set)

2. **Missing Name**
   - Should return 400 with "All fields are required"

3. **Missing Email**
   - Should return 400 with "All fields are required"

4. **Missing Message**
   - Should return 400 with "All fields are required"

5. **Invalid Email Format**
   - Should return 400 with "Invalid email address"

6. **Message Too Long (>5000 chars)**
   - Should return 400 with "Message is too long"

7. **Server Error**
   - Should return 500 with error message
   - Should log error to console

---

## Security Considerations

1. **Input Validation**: All inputs are validated before processing
2. **Rate Limiting**: Basic rate limiting via message length check
3. **Email Sanitization**: Email addresses are validated but not sanitized (handled by Resend)
4. **Error Messages**: Generic error messages prevent information leakage
5. **CORS**: Handled by Next.js middleware

---

## Future Enhancements

Potential improvements:

- Rate limiting per IP address
- CAPTCHA integration
- Email template customization
- Webhook support for notifications
- Request logging and analytics
