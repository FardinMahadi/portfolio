"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

import type { ProjectsHeaderProps } from "../../types/ProjectHelperProps";

export function ProjectsHeader({ isInView, schemaJson }: ProjectsHeaderProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaJson,
        }}
      />
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="mb-6 flex items-center gap-3 text-theme-primary">
          <Terminal className="h-6 w-6" aria-hidden="true" />
          <h2 className="text-3xl font-bold text-theme-accent">Projects</h2>
        </div>
        <p className="max-w-2xl text-lg text-theme-text/75">
          A curated collection of my best work, showcasing full-stack
          development projects from concept to deployment. Each project
          demonstrates technical skills and problem-solving abilities.
        </p>
      </motion.header>
    </>
  );
}
