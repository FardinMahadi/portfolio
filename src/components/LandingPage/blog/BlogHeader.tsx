"use client";

import { motion } from "framer-motion";

export function BlogHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="mb-6 flex items-center gap-3 text-theme-accent">
        <span className="font-mono" aria-hidden="true">
          {"</"}
        </span>
        <h2 className="text-3xl font-bold">Latest Articles</h2>
        <span className="font-mono" aria-hidden="true">
          {">"}
        </span>
      </div>
      <p className="max-w-2xl text-lg text-theme-text/75">
        Discover articles about web development, programming tips, career
        insights, and practical lessons from real-world projects.
      </p>
    </motion.header>
  );
}
