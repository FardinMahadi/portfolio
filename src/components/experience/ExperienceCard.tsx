"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, MapPin } from "lucide-react";

import type { ExperienceProps } from "../../types/ExperienceProps";

type ExperienceCardProps = {
  experience: ExperienceProps;
  isInView: boolean;
  index: number;
};

export function ExperienceCard({
  experience,
  isInView,
  index,
}: ExperienceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div
        className="absolute left-6 top-0 hidden w-0.5 md:block"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 35%, transparent), color-mix(in srgb, var(--color-secondary) 18%, transparent) 55%, transparent)",
        }}
      />

      <div
        className="group relative rounded-lg border border-theme-border/60 bg-theme-surface/80 p-6 transition-all duration-300 backdrop-blur-sm hover:border-theme-primary/50 hover:shadow-lg hover:shadow-theme-primary/20 md:pl-12"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 92%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
        }}
      >
        <div className="absolute left-6 top-8 hidden h-3 w-3 rounded-full border-2 border-theme-border/80 bg-theme-primary md:block" />

        <header className="mb-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
            <div>
              <h3 className="mb-1 text-xl font-bold text-theme-text">
                {experience.position}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-theme-text/80">
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 transition-colors hover:text-theme-primary"
                    aria-label={`Visit ${experience.company} website`}
                  >
                    <span className="font-semibold">{experience.company}</span>
                    <ExternalLink
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <span className="font-semibold">{experience.company}</span>
                )}
                {experience.type && (
                  <>
                    <span className="text-theme-text/50" aria-hidden="true">
                      •
                    </span>
                    <span className="rounded border border-theme-border/60 bg-theme-surface/70 px-2 py-1 text-sm text-theme-text/75">
                      {experience.type}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-theme-text/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime="2025-07">{experience.startDate}</time>
              {experience.endDate ? (
                <>
                  <span aria-hidden="true"> - </span>
                  <time dateTime={experience.endDate}>
                    {experience.endDate}
                  </time>
                </>
              ) : (
                <>
                  <span aria-hidden="true"> - </span>
                  <span className="rounded border border-theme-primary/40 bg-theme-primary/15 px-2 py-0.5 text-theme-primary">
                    {experience.current ? "Present" : "Ongoing"}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <p className="leading-relaxed text-theme-text/80">
            {experience.description}
          </p>

          {experience.responsibilities.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-theme-text/75">
                Key Responsibilities
              </h4>
              <ul className="space-y-2" role="list">
                {experience.responsibilities.map((responsibility, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-theme-text/80"
                    role="listitem"
                  >
                    <span
                      className="text-theme-primary mt-1.5 shrink-0"
                      aria-hidden="true"
                    >
                      ▹
                    </span>
                    <span className="leading-relaxed">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.technologies.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-theme-text/75">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2" role="list">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-theme-border/60 bg-theme-surface/70 px-3 py-1 text-sm text-theme-text/80 transition-colors hover:border-theme-primary/50 hover:text-theme-primary"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
