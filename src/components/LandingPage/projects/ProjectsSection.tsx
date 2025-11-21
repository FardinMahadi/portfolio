"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { projects } from "@/lib/projects";
import { generateItemListSchema } from "@/lib/seo";

import { ProjectCard } from "./ProjectCard";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsBackground } from "./ProjectsBackground";
import { ProjectModalFooter } from "./ProjectModalFooter";
import { ProjectScreenshotModal } from "../../effects/ProjectScreenshotModal";

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
  const schemaJson = JSON.stringify(itemListSchema);
  const selectedProject =
    selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-(--color-background) py-20 px-4 text-theme-text sm:px-6 lg:px-8 scroll-mt-28 md:scroll-mt-32"
    >
      <ProjectsBackground />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <ProjectsHeader isInView={isInView} schemaJson={schemaJson} />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
              onOpen={(event) => {
                setFocusReturnElement(event.currentTarget);
                setSelectedProjectIndex(index);
              }}
            />
          ))}
          <ProjectScreenshotModal
            project={selectedProject}
            isOpen={selectedProjectIndex !== null}
            modalId={
              selectedProjectIndex !== null
                ? `project-modal-${selectedProjectIndex}`
                : "project-modal"
            }
            onClose={() => setSelectedProjectIndex(null)}
            focusReturnPoint={focusReturnElement}
            footerSlot={
              selectedProject !== null ? (
                <ProjectModalFooter project={selectedProject} />
              ) : null
            }
          />
        </div>
      </div>
    </section>
  );
}
