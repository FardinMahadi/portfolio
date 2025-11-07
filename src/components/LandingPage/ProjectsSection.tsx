import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Terminal } from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ProjectsProps } from "./../types/ProjectsProps";
import { generateItemListSchema } from "@/lib/seo";
import { GlassmorphismPanel } from "../effects/GlassmorphismPanel";

const projects: ProjectsProps[] = [
  {
    title: "Lern Beta Platform",
    description:
      "Personal project: an AI-powered learning platform landing page focused on delivering quality education access for all.",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "AI"],
    image: "/Projects/Lern/image.png",
    width: 1600,
    height: 900,
    liveUrl: "https://lern-beta.vercel.app/",
    codeUrl:
      "https://github.com/FardinMahadi/Lern-AI-Powered-Study-Assistant-Uni-project-showcase",
  },
  {
    title: "ACS Youth Summit Website",
    description:
      "Built at DevGenit as the core frontend engineer, delivering the official ACS Bangladesh Youth Summit conference platform with schedules, submissions, and partner showcases.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/Projects/ACS/image.png",
    width: 1600,
    height: 900,
    liveUrl: "https://acsduyouthsummit2025.org/",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e1a] to-[#111827] relative overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

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
          <div className="flex items-center gap-3 mb-6">
            <Terminal
              className="w-6 h-6 text-theme-accent"
              aria-hidden="true"
            />
            <h2 className="text-theme-accent text-3xl font-bold">Projects</h2>
          </div>
          <p className="text-slate-400 max-w-2xl text-lg">
            A curated collection of my best work, showcasing full-stack
            development projects from concept to deployment. Each project
            demonstrates technical skills and problem-solving abilities.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
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
                    className="bg-slate-900/80 px-4 py-2 border-b border-slate-700/50 flex items-center gap-2"
                    role="presentation"
                  >
                    <div className="flex gap-1.5" aria-hidden="true">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="ml-2 text-slate-500 text-xs font-mono">
                      ~/{project.title.toLowerCase().replace(/\s+/g, "-")}
                    </div>
                  </header>

                  {/* Image */}
                  <figure className="relative h-48 overflow-hidden bg-slate-900">
                    <ImageWithFallback
                      src={project.image}
                      alt={`${project.title} project screenshot - ${project.description}`}
                      width={project.width}
                      height={project.height}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60"
                      aria-hidden="true"
                    />
                  </figure>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <header>
                      <h3 className="text-slate-100 mb-2 font-mono text-xl">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {project.description}
                      </p>
                    </header>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2" role="list">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono bg-slate-800/50 text-cyan-400 rounded border border-slate-700/50"
                          role="listitem"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    {(project.liveUrl || project.codeUrl) && (
                      <div className="flex gap-3 pt-2">
                        {project.liveUrl && project.liveUrl !== "#" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-slate-600 text-slate-300 hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
                            asChild
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live
                            </a>
                          </Button>
                        )}
                        {project.codeUrl && project.codeUrl !== "#" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-slate-600 text-slate-300 hover:bg-violet-500/10 hover:border-violet-500 hover:text-violet-400 transition-all duration-300"
                            asChild
                          >
                            <a
                              href={project.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-4 h-4 mr-2" />
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
                className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
