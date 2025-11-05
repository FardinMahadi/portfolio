import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Terminal } from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ProjectsProps } from "./../types/ProjectsProps";

const projects: ProjectsProps[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack shopping platform with real-time inventory, payment integration, and admin dashboard.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1759752394397-3c745feb24e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MTA1MDI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    width: 1080,
    height: 720,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Data visualization dashboard with real-time metrics, custom charts, and export functionality.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "D3.js"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYxMDQxNDk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    width: 1080,
    height: 720,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task manager with drag-and-drop, real-time updates, and team workspaces.",
    tags: ["React", "Express", "Socket.io", "TailwindCSS"],
    image:
      "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEwMjEyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    width: 1080,
    height: 720,
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Mobile Banking UI",
    description:
      "Modern banking interface with transaction history, card management, and biometric authentication.",
    tags: ["React Native", "TypeScript", "Node.js", "JWT"],
    image:
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYwOTg0NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    width: 1080,
    height: 720,
    liveUrl: "#",
    codeUrl: "#",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0e1a] relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-violet-400" />
            <h2 className="text-violet-400">Featured Projects</h2>
          </div>
          <p className="text-slate-400 max-w-2xl">
            A collection of projects showcasing my expertise in full-stack
            development, from concept to deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-lg border border-slate-700/50 overflow-hidden backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                {/* Terminal header */}
                <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-700/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-2 text-slate-500 text-xs font-mono">
                    ~/{project.title.toLowerCase().replace(/\s+/g, "-")}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    width={project.width}
                    height={project.height}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-slate-100 mb-2 font-mono">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono bg-slate-800/50 text-cyan-400 rounded border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
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
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
