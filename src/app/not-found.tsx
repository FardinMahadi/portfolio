"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Note: Metadata export is not supported in client components
// Metadata will be handled by the layout or through other means

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-(--color-background) px-4 text-theme-text"
      style={{
        background:
          "radial-gradient(circle at top left, color-mix(in srgb, var(--color-primary) 22%, transparent), transparent 55%), radial-gradient(circle at bottom right, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 60%), var(--color-background)",
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal-style error display */}
          <div
            className="mb-8 rounded-lg border border-theme-border/60 p-8 shadow-lg shadow-theme-primary/10 backdrop-blur"
            style={{
              background:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 92%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
            }}
          >
            <div className="mb-4 flex items-center gap-2 rounded-t-lg border border-theme-border/60 bg-theme-surface/80 p-3 backdrop-blur">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-theme-primary/70" />
                <div className="h-3 w-3 rounded-full bg-theme-accent/70" />
                <div className="h-3 w-3 rounded-full bg-theme-secondary/70" />
              </div>
              <div className="ml-4 text-slate-400 text-sm font-mono">
                ~/error/404.ts
              </div>
            </div>

            <div className="space-y-4 text-left font-mono text-theme-text/80">
              <div className="flex gap-4">
                <div className="select-none text-sm text-theme-text/45">1</div>
                <div className="flex-1">
                  <span className="text-theme-accent">console</span>
                  <span className="text-theme-text/60">.</span>
                  <span className="text-theme-secondary">error</span>
                  <span className="text-theme-text/60">(</span>
                  <span className="text-theme-primary">
                    &apos;404: Page Not Found&apos;
                  </span>
                  <span className="text-theme-text/60">);</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="select-none text-sm text-theme-text/45">2</div>
                <div className="flex-1">
                  <span className="text-theme-secondary">const</span>{" "}
                  <span className="text-theme-primary/90">error</span>{" "}
                  <span className="text-theme-accent/80">=</span>{" "}
                  <span className="text-theme-primary">
                    &apos;Page does not exist&apos;
                  </span>
                  <span className="text-theme-text/60">;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="mb-4 font-mono text-6xl font-bold text-theme-primary">
              404
            </h1>
            <h2 className="mb-4 font-mono text-2xl text-theme-text">
              Page Not Found
            </h2>
            <p className="mx-auto max-w-md text-theme-text/70">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              asChild
              size="lg"
              className="min-h-[44px] text-theme-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                boxShadow:
                  "0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.12), 0 0 25px -8px var(--color-primary)",
              }}
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-[44px] border-theme-border/70 text-theme-text/80 transition-all duration-300 hover:border-theme-accent hover:bg-theme-surface/70 hover:text-theme-accent"
            >
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Link>
            </Button>
          </motion.div>

          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mt-12 max-w-md rounded-lg border border-theme-border/60 bg-theme-surface/80 p-4 font-mono text-sm backdrop-blur"
          >
            <div className="flex gap-2">
              <span className="text-theme-primary">$</span>
              <span className="text-theme-text/70">cd /home</span>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="text-theme-primary">$</span>
              <span className="animate-pulse text-theme-text/60">_</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
