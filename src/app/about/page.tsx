import { Metadata } from "next";
import { Footer } from "@/components/LandingPage/Footer";
import { Navigation } from "@/components/LandingPage/Navigation";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { AboutSection } from "@/components/LandingPage/AboutSection";
import { PageTransition } from "@/components/effects/PageTransition";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Me",
  description:
    "Full Stack Developer passionate about creating seamless web experiences. Expertise in MERN stack (MongoDB, Express, React, Node.js) and modern frameworks like Next.js. Transforming ideas into robust, scalable applications.",
  keywords: [
    "about",
    "full stack developer",
    "MERN stack",
    "web development",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "portfolio",
  ],
  canonical: `${siteUrl}/about`,
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

export default function AboutPage() {
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen text-theme-text" style={backdropStyle}>
        <header>
          <Navigation />
        </header>
        <main className="relative z-10 pt-16">
          <AboutSection />
        </main>
        <footer className="mt-10 border-t border-theme-border/40 bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)]">
          <Footer />
        </footer>
      </div>
    </PageTransition>
  );
}
