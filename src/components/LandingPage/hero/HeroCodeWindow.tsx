"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { HeroActions } from "./HeroActions";

export function HeroCodeWindow() {
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
    <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
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
            Full-stack engineer focused on thoughtful UX and performant React &
            Next.js applications. I lean on calm interfaces, inclusive
            accessibility, and fast feedback loops to help teams move from idea
            to impact.
          </p>

          <HeroActions />
        </motion.div>
      </motion.div>
    </div>
  );
}
