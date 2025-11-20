import { useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { motion, useInView } from "framer-motion";
import { generateItemListSchema } from "@/lib/seo";
import { ExternalLink, Github, Terminal } from "lucide-react";

import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { GlassmorphismPanel } from "../effects/GlassmorphismPanel";
import { ProjectScreenshotModal } from "../effects/ProjectScreenshotModal";

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
  const [focusReturnElement, setFocusReturnElement] =
    useState<HTMLElement | null>(null);

  const itemListSchema = generateItemListSchema(
    projects.map((project) => ({
      name: project.title,
      description: project.description,
      url: project.liveUrl !== "#" ? project.liveUrl : undefined,
      image: project.image,
    }))
  );

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-(--color-background) py-20 px-4 text-theme-text sm:px-6 lg:px-8 scroll-mt-28 md:scroll-mt-32"
    >
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-primary) 18%, transparent) 55%, color-mix(in srgb, var(--color-accent) 16%, transparent))",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListSchema),
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

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const modalId = `project-modal-${index}`;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                {/* Card */}
                <GlassmorphismPanel className="overflow-hidden" hover={true}>
                  <div className="rounded-lg overflow-hidden">
                    {/* Terminal header */}
                    <header
                      className="flex items-center gap-2 border-b border-theme-border/50 bg-theme-surface/80 px-4 py-2 backdrop-blur"
                      role="presentation"
                    >
                      <div className="flex gap-1.5" aria-hidden="true">
                        <div className="h-3 w-3 rounded-full bg-theme-primary/60" />
                        <div className="h-3 w-3 rounded-full bg-theme-accent/60" />
                        <div className="h-3 w-3 rounded-full bg-theme-secondary/60" />
                      </div>
                      <div className="ml-2 text-xs font-mono text-theme-text/60">
                        ~/{project.title.toLowerCase().replace(/\s+/g, "-")}
                      </div>
                    </header>

                    {/* Image */}
                    <figure className="relative h-48 overflow-hidden bg-theme-surface/70">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        aria-controls={modalId}
                        onClick={(event) => {
                          setFocusReturnElement(event.currentTarget);
                          setSelectedProjectIndex(index);
                        }}
                        className="peer group/button relative inline-flex h-full w-full cursor-zoom-in items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-primary/70"
                      >
                        <span className="sr-only">
                          Open full-size screenshot of {project.title}
                        </span>
                        <ImageWithFallback
                          src={project.image}
                          alt={`${project.title} project screenshot - ${project.description}`}
                          width={project.width}
                          height={project.height}
                          className="h-full w-full object-cover transition-transform duration-300 peer-hover:scale-110 peer-focus-visible:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                          loading="lazy"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300"
                          aria-hidden="true"
                          style={{
                            background:
                              "linear-gradient(to top, color-mix(in srgb, var(--color-background) 92%, transparent), color-mix(in srgb, var(--color-background) 40%, transparent) 45%, transparent)",
                          }}
                        />
                        <div
                          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 peer-hover:opacity-100 peer-focus-visible:opacity-100"
                          aria-hidden="true"
                        >
                          <span className="rounded-full bg-[color:color-mix(in_srgb,var(--color-surface) 92%,transparent)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-theme-text shadow-lg ring-1 ring-theme-border/60 backdrop-blur">
                            View Screenshot
                          </span>
                        </div>
                      </button>
                    </figure>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <header>
                        <h3 className="mb-2 font-mono text-xl text-theme-text">
                          {project.title}
                        </h3>
                        <p className="text-sm text-theme-text/75">
                          {project.description}
                        </p>
                        {project.role && (
                          <p className="mt-3 text-xs font-mono uppercase tracking-[0.2em] text-theme-text/60">
                            {project.role}
                          </p>
                        )}
                      </header>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2" role="list">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-theme-border/60 bg-theme-surface/70 px-2 py-1 text-xs font-mono text-theme-primary"
                            role="listitem"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.highlights && project.highlights.length > 0 && (
                        <ul
                          className="space-y-2 text-theme-text/85"
                          role="list"
                        >
                          {project.highlights.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-3 text-sm leading-relaxed"
                              role="listitem"
                            >
                              <span
                                className="mt-0.5 text-theme-primary"
                                aria-hidden="true"
                              >
                                ▹
                              </span>
                              <span className="text-theme-text/75">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Actions */}
                      {(project.liveUrl || project.codeUrl) && (
                        <div className="flex gap-3 pt-2">
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-theme-border/70 text-theme-text/80 transition-all duration-300 hover:border-theme-primary hover:bg-theme-primary/10 hover:text-theme-primary"
                              asChild
                            >
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live
                              </a>
                            </Button>
                          )}
                          {project.codeUrl && project.codeUrl !== "#" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-theme-border/70 text-theme-text/80 transition-all duration-300 hover:border-theme-accent hover:bg-theme-accent/10 hover:text-theme-accent"
                              asChild
                            >
                              <a
                                href={project.codeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </GlassmorphismPanel>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 -z-10 rounded-lg blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(to bottom right, color-mix(in srgb, var(--color-primary) 30%, transparent), color-mix(in srgb, var(--color-accent) 28%, transparent))",
                  }}
                />
              </motion.article>
            );
          })}
          <ProjectScreenshotModal
            project={
              selectedProjectIndex !== null
                ? projects[selectedProjectIndex]
                : null
            }
            isOpen={selectedProjectIndex !== null}
            modalId={
              selectedProjectIndex !== null
                ? `project-modal-${selectedProjectIndex}`
                : "project-modal"
            }
            onClose={() => setSelectedProjectIndex(null)}
            focusReturnPoint={focusReturnElement}
            footerSlot={
              selectedProjectIndex !== null ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-theme-text/60">
                    Scroll to explore the full canvas
                  </p>
                  <div className="flex gap-3">
                    {projects[selectedProjectIndex].liveUrl && (
                      <a
                        href={projects[selectedProjectIndex].liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-theme-border/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-theme-text/85 transition hover:border-theme-primary hover:text-theme-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-primary/60"
                      >
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        Live Site
                      </a>
                    )}
                    {projects[selectedProjectIndex].codeUrl && (
                      <a
                        href={projects[selectedProjectIndex].codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-theme-border/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-theme-text/85 transition hover:border-theme-accent hover:text-theme-accent focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-accent/60"
                      >
                        <Github className="h-3 w-3" aria-hidden="true" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ) : null
            }
          />
        </div>
      </div>
    </section>
  );
}
