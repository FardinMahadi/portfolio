"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { generateProfessionalServiceSchema } from "@/lib/seo";

import { TechStackProps } from "../types/TechStackProps";
import { GlassmorphismPanel } from "../effects/GlassmorphismPanel";

const techStack: TechStackProps[] = [
  {
    name: "React",
    icon: {
      link: "/Icons/reactjs.png",
      height: 40,
      width: 40,
    },
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Node.js",
    icon: {
      link: "/Icons/nodejs.png",
      height: 40,
      width: 40,
    },
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "MongoDB",
    icon: {
      link: "/Icons/mongodb.png",
      height: 40,
      width: 40,
    },
    color: "from-green-500 to-green-600",
  },
  {
    name: "Express",
    icon: {
      link: "/Icons/express.png",
      height: 40,
      width: 40,
    },
    color: "from-gray-400 to-gray-500",
  },
  {
    name: "Next.js",
    icon: {
      link: "/Icons/nextjs.png",
      height: 40,
      width: 40,
    },
    color: "from-slate-700 to-slate-900",
  },
  {
    name: "TypeScript",
    icon: {
      link: "/Icons/ts.png",
      height: 40,
      width: 40,
    },
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "TailwindCSS",
    icon: {
      link: "/Icons/tailwind.png",
      height: 40,
      width: 40,
    },
    color: "from-cyan-400 to-teal-500",
  },
  {
    name: "PostgreSQL",
    icon: {
      link: "/Icons/PostgreSQL.png",
      height: 40,
      width: 40,
    },
    color: "from-blue-400 to-blue-600",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const professionalServiceSchema = generateProfessionalServiceSchema(
    "Full Stack Web Development",
    "MERN stack development services including React, Next.js, Node.js, MongoDB, and TypeScript. Specializing in building scalable web applications and modern user interfaces.",
    "Worldwide"
  );

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 px-4 text-theme-text sm:px-6 lg:px-8"
    >
      {/* Background accents */}
      <div
        className="absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-primary) 26%, transparent), transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-theme-primary font-mono" aria-hidden="true">
              {"<"}
            </span>
            <h2 className="text-theme-primary text-3xl font-bold">About Me</h2>
            <span className="text-theme-primary font-mono" aria-hidden="true">
              {"/>"}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <GlassmorphismPanel className="p-6 text-theme-text/80">
                <p className="leading-relaxed">
                  I&apos;m a Full Stack Developer passionate about creating
                  seamless web experiences. With expertise in the MERN stack
                  (MongoDB, Express, React, Node.js) and modern frameworks like
                  Next.js, I transform ideas into robust, scalable applications.
                </p>
                <p className="mt-4 leading-relaxed">
                  My approach combines clean code architecture with cutting-edge
                  technologies, ensuring every project is performant,
                  maintainable, and user-focused. I focus on writing quality
                  code that solves real-world problems.
                </p>
              </GlassmorphismPanel>

              <div className="flex w-fit items-center gap-3 rounded border border-theme-border/60 bg-theme-surface/70 px-4 py-2 backdrop-blur">
                <div className="h-2 w-2 animate-pulse rounded-full bg-theme-primary" />
                <span className="font-mono text-sm text-theme-text/70">
                  Available for new projects
                </span>
              </div>
            </motion.article>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="mb-6 font-mono text-xl text-theme-text">
                Tech Stack
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="group relative"
                  >
                    <div
                      className="flex aspect-square flex-col items-center justify-center rounded-lg border border-theme-border/60 bg-theme-surface/80 p-4 backdrop-blur-sm transition-all duration-300 hover:border-theme-primary/50"
                      style={{
                        background:
                          "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 92%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
                      }}
                    >
                      <div className="text-3xl mb-2">
                        <Image
                          src={tech.icon.link}
                          alt={`${tech.name} technology icon - Frontend and backend development tool`}
                          height={tech.icon.height}
                          width={tech.icon.width}
                          loading="lazy"
                          sizes="(max-width: 640px) 80px, 40px"
                          quality={90}
                        />
                      </div>
                      <div className="text-center text-xs font-mono text-theme-text/70">
                        {tech.name}
                      </div>

                      {/* Glow effect on hover */}
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${tech.color} opacity-0 transition-opacity duration-300 blur-xl group-hover:opacity-20`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>
          </div>
        </motion.header>
      </div>
    </section>
  );
}
