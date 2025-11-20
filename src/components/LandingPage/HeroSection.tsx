import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "../ui/button";
import { MagneticButton } from "../effects/MagneticButton";

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "FardinMahadi";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--color-background) py-16 text-theme-text"
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 92%, transparent), color-mix(in srgb, var(--color-surface) 85%, transparent) 45%, color-mix(in srgb, var(--color-accent) 28%, transparent))",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "var(--color-primary)" }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "var(--color-accent)" }}
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Code editor window */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 rounded-t-lg border border-theme-border/70 bg-theme-surface/90 p-3 backdrop-blur"
            role="presentation"
          >
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="h-3 w-3 rounded-full bg-theme-primary/70" />
              <div className="h-3 w-3 rounded-full bg-theme-accent/70" />
              <div className="h-3 w-3 rounded-full bg-theme-secondary/70" />
            </div>
            <div
              className="ml-4 text-sm font-mono text-theme-text/60"
              aria-label="File path"
            >
              ~/portfolio/dev.ts
            </div>
          </div>

          {/* Code content */}
          <div className="rounded-b-lg border-x border-b border-theme-border/70 bg-theme-surface/80 p-8 text-left backdrop-blur">
            <div className="flex gap-4">
              <div
                className="select-none font-mono text-sm text-theme-text/50"
                aria-hidden="true"
              >
                1
              </div>
              <div className="flex-1">
                <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                  <span className="text-purple-400" aria-hidden="true">
                    const
                  </span>{" "}
                  <span className="text-theme-primary">dev</span>{" "}
                  <span className="text-pink-400" aria-hidden="true">
                    =
                  </span>{" "}
                  <span className="text-green-400">
                    &apos;{displayedText}
                    <span className="animate-pulse" aria-hidden="true">
                      |
                    </span>
                    &apos;
                  </span>
                  <span className="text-theme-text/60" aria-hidden="true">
                    ;
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-12 text-center md:flex-row md:justify-center md:items-center md:gap-16 md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56 rounded-full overflow-hidden border-4 border-slate-700/70 shadow-xl shadow-theme-accent/20"
            aria-hidden="true"
          >
            <Image
              src="/Images/me.jpg"
              alt="Portrait of Fardin Mahadi"
              fill
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(34,211,238,0.2), transparent 50%, rgba(139,92,246,0.2))",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="space-y-6 max-w-2xl"
          >
            <h2 className="text-2xl font-semibold text-theme-text sm:text-3xl">
              Shipping purposeful digital products with empathy and code.
            </h2>
            <p className="text-base text-theme-text/75">
              Full-stack engineer focused on thoughtful UX and performant React
              & Next.js applications. I lean on calm interfaces, inclusive
              accessibility, and fast feedback loops to help teams move from
              idea to impact.
            </p>

            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <MagneticButton magneticStrength={0.2}>
                <Button
                  size="lg"
                  className="text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 min-h-[44px]"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                    boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px -5px var(--color-primary)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(to right, var(--color-primary), var(--color-secondary))`;
                    e.currentTarget.style.filter = "brightness(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(to right, var(--color-primary), var(--color-secondary))`;
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  aria-label="Navigate to projects section"
                >
                  View Projects
                </Button>
              </MagneticButton>
              <MagneticButton magneticStrength={0.2}>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-h-[44px] border-theme-border/70 text-theme-text/85 transition-all duration-300 hover:border-theme-accent hover:bg-theme-surface/60 hover:text-theme-accent"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  aria-label="Navigate to contact section"
                >
                  Get In Touch
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ y: [0, 10, 0], opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.5,
          }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-theme-primary" />
        </motion.div>
      </div>
    </section>
  );
}
