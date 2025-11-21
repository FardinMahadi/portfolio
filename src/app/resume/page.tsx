import { Metadata } from "next";
import { Footer } from "@/components/LandingPage/Footer";
import { resumeData } from "@/components/resume/resumeData";
import { ResumeHero } from "@/components/resume/ResumeRouteHero";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Navigation } from "@/components/shared/navigation/Navigation";

export const metadata: Metadata = {
  title: "Resume | Mahadi Hasan Fardin",
  description:
    "Download themed resume PDFs for Mahadi Hasan Fardin with multiple layouts inspired by the portfolio aesthetic.",
};

const backdropStyle = {
  backgroundColor: "var(--color-background)",
  backgroundImage: `
    radial-gradient(circle at top, color-mix(in srgb, var(--color-primary) 35%, transparent) 0%, transparent 55%),
    radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-secondary) 18%, transparent) 0%, transparent 45%),
    radial-gradient(circle at bottom, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 60%)
  `,
  backgroundAttachment: "fixed",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen text-theme-text" style={backdropStyle}>
      <header>
        <Navigation />
      </header>
      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-16 md:pb-24">
        <ResumeHero portfolioUrl={resumeData.personalInfo.portfolio} />
        <ResumePreview />
      </main>
      <footer className="mt-10 border-t border-theme-border/40 bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)]">
        <Footer />
      </footer>
    </div>
  );
}
