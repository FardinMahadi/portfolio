"use client";

import { ExternalLink, Github } from "lucide-react";

import { Button } from "../../ui/button";

import type { ProjectModalFooterProps } from "../../types/ProjectHelperProps";

export function ProjectModalFooter({ project }: ProjectModalFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs uppercase tracking-[0.28em] text-theme-text/60">
        Scroll to explore the full canvas
      </p>
      <div className="flex gap-3">
        {project.liveUrl && (
          <Button
            className="inline-flex items-center gap-2 rounded-full border border-theme-border/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-theme-text/85 transition hover:border-theme-primary hover:text-theme-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-primary/60"
            asChild
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              Live Site
            </a>
          </Button>
        )}
        {project.codeUrl && (
          <Button
            className="inline-flex items-center gap-2 rounded-full border border-theme-border/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-theme-text/85 transition hover:border-theme-accent hover:text-theme-accent focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-accent/60"
            asChild
          >
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-3 w-3" aria-hidden="true" />
              Code
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
