"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ResumeHeroProps {
  portfolioUrl: string;
}

export function ResumeHero({ portfolioUrl }: ResumeHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-14 overflow-hidden rounded-3xl border border-theme-border/40 bg-linear-to-br from-[color-mix(in_srgb,var(--color-surface)_95%,transparent)] via-[color-mix(in_srgb,var(--color-background)_90%,transparent)] to-[color-mix(in_srgb,var(--color-background)_70%,transparent)] p-8 shadow-[0_40px_120px_-50px_rgba(14,165,233,0.5)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-theme-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-8 h-40 w-40 rounded-full bg-theme-secondary/20 blur-3xl" />
      <p className="font-mono text-sm uppercase tracking-[0.5em] text-theme-primary">
        Resume Library
      </p>
      <h1 className="text-4xl font-semibold text-theme-text md:text-5xl">
        Polished PDFs that mirror the product storytelling on my portfolio.
      </h1>
      <p className="max-w-3xl text-lg text-theme-text/80 leading-relaxed">
        Each variant uses the same up-to-date data pulled directly from my{" "}
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noreferrer"
          className="text-theme-primary underline-offset-4 hover:underline"
        >
          portfolio site
        </a>
        , making it easy to choose the tone that matches any pitch, interview,
        or partnership discussion.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href={portfolioUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-theme-primary/40 bg-theme-primary/10 px-4 py-2 text-sm font-medium text-theme-primary transition hover:border-theme-primary hover:bg-theme-primary/20"
        >
          Explore Portfolio <ArrowUpRight className="h-4 w-4" />
        </Link>
        <div className="rounded-full border border-theme-border/40 px-4 py-2 text-sm text-theme-text/80">
          3 PDF layouts · A4 · Theme adaptive
        </div>
      </div>
    </motion.div>
  );
}
