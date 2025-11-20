import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
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
          <section className="mt-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl border border-theme-border/50 bg-linear-to-br from-(--color-surface) to-(--color-background) p-8 text-center shadow-lg shadow-theme-primary/10">
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-theme-primary/70">
                Let&apos;s Work Together
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-theme-text">
                Ready to build your next product?
              </h2>
              <p className="mt-3 text-theme-text/70">
                I collaborate with product-minded teams to ship polished,
                accessible experiences. Tell me about your roadmap and I&apos;ll
                help you get there faster.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="min-h-[48px] px-8 text-white"
                >
                  <Link href="/contact" aria-label="Navigate to contact page">
                    Start a conversation
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[48px] border-theme-border/60 bg-transparent px-8 text-theme-text hover:text-theme-primary"
                >
                  <Link href="/resume" aria-label="View resume">
                    View resume
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <footer className="mt-10 border-t border-theme-border/40 bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)]">
          <Footer />
        </footer>
      </div>
    </PageTransition>
  );
}
