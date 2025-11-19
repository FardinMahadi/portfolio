"use client";
import { AboutSection } from "@/components/LandingPage/AboutSection";
import { BlogSection } from "@/components/LandingPage/BlogSection";
import { ContactSection } from "@/components/LandingPage/ContactSection";
import { ExperienceSection } from "@/components/LandingPage/ExperienceSection";
import { Footer } from "@/components/LandingPage/Footer";
import { HeroSection } from "@/components/LandingPage/HeroSection";
import { IntroSummary } from "@/components/LandingPage/IntroSummary";
import { Navigation } from "@/components/LandingPage/Navigation";
import { ProjectsSection } from "@/components/LandingPage/ProjectsSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect, useState } from "react";

export default function Home() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted to prevent hydration mismatch
    setMounted(true);

    // Only run client-side code after mount
    if (typeof window === "undefined") return;

    document.documentElement.classList.add("dark");

    // Check if device supports touch
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-expect-error - for older browsers (IE/Edge legacy)
          navigator.msMaxTouchPoints > 0
      );
    };
    checkTouchDevice();
  }, []);

  // Prevent hydration mismatch by using consistent initial render
  // Only apply cursor-none class after mount to avoid SSR/client mismatch
  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen bg-[#0a0e1a] text-slate-100 overflow-x-hidden ${
          mounted && !isTouchDevice ? "cursor-none" : ""
        }`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0e1a]"
        >
          Skip to main content
        </a>
        <header role="banner">
          <Navigation />
        </header>
        <main id="main-content" role="main">
          <HeroSection />
          <IntroSummary />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
