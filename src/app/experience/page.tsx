import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/LandingPage/Footer";
import { Navigation } from "@/components/LandingPage/Navigation";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/effects/PageTransition";
import { ExperienceSection } from "@/components/LandingPage/ExperienceSection";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export const metadata: Metadata = generateSEOMetadata({
  title: "Work Experience",
  description:
    "A timeline of my professional journey, showcasing my growth and contributions in web development and software engineering. Experience in frontend development, React, Next.js, and TypeScript.",
  keywords: [
    "experience",
    "work history",
    "career",
    "frontend engineer",
    "web development",
    "React",
    "Next.js",
    "TypeScript",
    "professional experience",
  ],
  canonical: `${siteUrl}/experience`,
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

export default function ExperiencePage() {
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen text-theme-text" style={backdropStyle}>
        <header>
          <Navigation />
        </header>
        <main className="relative z-10 pt-16">
          <ExperienceSection />
          <section className="mt-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl border border-theme-border/50 bg-linear-to-br from-(--color-surface) to-(--color-background) p-8 text-center shadow-lg shadow-theme-secondary/10">
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-theme-secondary/70">
                Hiring Now?
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-theme-text">
                Let&apos;s bring this experience to your team.
              </h2>
              <p className="mt-3 text-theme-text/70">
                I partner with engineering leads and founders to deliver
                production-ready, accessible interfaces. Tell me about your
                technical gap—we&apos;ll design the fastest path to impact.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="min-h-[48px] px-8 text-white"
                >
                  <Link href="/contact" aria-label="Navigate to contact page">
                    Book a call
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[48px] border-theme-border/60 bg-transparent px-8 text-theme-text hover:text-theme-primary"
                >
                  <Link href="/blog" aria-label="Read latest case studies">
                    Read case studies
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
