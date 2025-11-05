import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#1e1b4b] opacity-90" />

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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Code editor window */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Window chrome */}
          <div
            className="bg-[#1e293b] rounded-t-lg border border-slate-700 p-3 flex items-center gap-2"
            role="presentation"
          >
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div
              className="ml-4 text-slate-400 text-sm font-mono"
              aria-label="File path"
            >
              ~/portfolio/dev.ts
            </div>
          </div>

          {/* Code content */}
          <div className="bg-[#0f172a] rounded-b-lg border-x border-b border-slate-700 p-8 text-left">
            <div className="flex gap-4">
              <div
                className="text-slate-600 select-none font-mono text-sm"
                aria-hidden="true"
              >
                1
              </div>
              <div className="flex-1">
                <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl md:text-center">
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
                  <span className="text-slate-400" aria-hidden="true">
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
          className="space-y-6"
        >
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Full Stack Developer specializing in React, Next.js, and Node.js.
            Building modern web applications with clean code and best practices.
          </p>

          <div className="flex gap-4 justify-center items-center flex-wrap">
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
                className="border-slate-600 text-slate-200 hover:bg-slate-800/50 transition-all duration-300 min-h-[44px] hover:border-theme-accent hover:text-theme-accent"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-theme-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
