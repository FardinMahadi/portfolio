import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Prevent spam - basic rate limiting by checking message length
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long" },
        { status: 400 }
      );
    }

    // Email service integration with Resend
    // If RESEND_API_KEY is not set, it will log to console (for development)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.CONTACT_EMAIL || "mahadihasanfardin2015@gmail.com";
    const senderEmail =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (resendApiKey) {
      try {
        // Dynamic import to avoid bundling Resend in client-side code
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: senderEmail,
          to: recipientEmail,
          replyTo: email,
          subject: `Contact Form Submission from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #06b6d4;">New Contact Form Submission</h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #06b6d4;">
                <h3 style="color: #333;">Message:</h3>
                <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message.replace(
                  /\n/g,
                  "<br>"
                )}</p>
              </div>
            </div>
          `,
          text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Submitted: ${new Date().toLocaleString()}

Message:
${message}
          `,
        });

        // Log successful submission
        console.log("Contact form email sent successfully:", {
          name,
          email,
          timestamp: new Date().toISOString(),
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Fall through to logging for development
      }
    } else {
      // Development mode: log to console
      console.log("Contact form submission (development mode):", {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        note: "Set RESEND_API_KEY in environment variables to enable email sending",
      });
    }

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
