import { Metadata } from "next";
import { Footer } from "@/components/LandingPage/Footer";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/effects/PageTransition";
import { Navigation } from "@/components/shared/navigation/Navigation";
import { ContactSection } from "@/components/LandingPage/contact/ContactSection";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact",
  description:
    "Ready to collaborate? Reach out to discuss full-stack web development opportunities, freelance work, or consulting engagements.",
  keywords: [
    "contact",
    "hire",
    "full stack developer",
    "web development",
    "React",
    "Next.js",
    "freelance",
    "consulting",
  ],
  canonical: `${siteUrl}/contact`,
});

const backdropStyle = {
  backgroundColor: "var(--color-background)",
  backgroundImage: `
    radial-gradient(circle at top, color-mix(in srgb, var(--color-primary) 35%, transparent) 0%, transparent 55%),
    radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-secondary) 18%, transparent) 0%, transparent 45%),
    radial-gradient(circle at bottom, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 60%)
  `,
  backgroundAttachment: "fixed",
};

export default function ContactPage() {
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen text-theme-text" style={backdropStyle}>
        <header>
          <Navigation />
        </header>
        <main className="relative z-10 pt-16">
          <ContactSection variant="page" />
        </main>
        <footer className="mt-10 border-t border-theme-border/40 bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)]">
          <Footer />
        </footer>
      </div>
    </PageTransition>
  );
}
