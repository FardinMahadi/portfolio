"use client";

import type { ContactPanelProps } from "@/components/types/landing/contact";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";

export function QuickActions({ isInView }: ContactPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-xl border border-theme-border/40 p-6 backdrop-blur-sm shadow-xl shadow-theme-primary/5"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-background) 65%, transparent))",
      }}
    >
      <h3 className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-theme-text/90">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <a
          href="mailto:mahadihasanfardin2015@gmail.com"
          className="flex min-h-[44px] items-center justify-between rounded-lg border border-theme-border/40 px-4 py-3 text-theme-text transition-colors hover:border-theme-primary/70 hover:text-white shadow-lg shadow-theme-primary/5"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in srgb, var(--color-surface) 65%, transparent), color-mix(in srgb, var(--color-primary) 10%, transparent))",
          }}
        >
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-theme-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.45)]" />
            <div>
              <p className="font-medium text-theme-text">Send me an email</p>
              <span className="text-sm text-theme-text/80">
                mahadihasanfardin2015@gmail.com
              </span>
            </div>
          </div>
          <span aria-hidden="true">↗</span>
        </a>
        <a
          href="/mahadi-hasan-fardin-cv.pdf"
          download="mahadi-hasan-fardin-cv.pdf"
          className="flex min-h-[44px] items-center justify-between rounded-lg border border-theme-border/40 px-4 py-3 text-theme-text transition-colors hover:border-theme-primary/70 hover:text-white shadow-lg shadow-theme-primary/5"
          aria-label="Download CV"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in srgb, var(--color-surface) 65%, transparent), color-mix(in srgb, var(--color-secondary) 10%, transparent))",
          }}
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-theme-secondary drop-shadow-[0_0_8px_rgba(139,92,246,0.45)]" />
            <div>
              <p className="font-medium text-theme-text">Download my CV</p>
              <span className="text-sm text-theme-text/80">
                Updated November 2025
              </span>
            </div>
          </div>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </motion.div>
  );
}
