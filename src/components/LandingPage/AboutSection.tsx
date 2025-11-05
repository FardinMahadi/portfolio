import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TechStackProps } from "../types/TechStackProps";
import Image from "next/image";
import { generateProfessionalServiceSchema } from "@/lib/seo";

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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e1a] to-[#111827] relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
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
            <span className="text-cyan-400 font-mono" aria-hidden="true">
              {"<"}
            </span>
            <h2 className="text-cyan-400 text-3xl font-bold">About</h2>
            <span className="text-cyan-400 font-mono" aria-hidden="true">
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
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                <p className="text-slate-300 leading-relaxed">
                  I&apos;m a full-stack developer passionate about creating
                  seamless web experiences. With expertise in the MERN stack and
                  modern frameworks like Next.js, I transform ideas into robust,
                  scalable applications.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  My approach combines clean code architecture with cutting-edge
                  technologies, ensuring every project is performant,
                  maintainable, and user-focused.
                </p>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 rounded border border-slate-700/50 w-fit">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-slate-400 font-mono text-sm">
                  Available for new projects
                </span>
              </div>
            </motion.article>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-slate-200 mb-6 font-mono text-xl">
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
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4 rounded-lg border border-slate-700/50 backdrop-blur-sm flex flex-col items-center justify-center aspect-square hover:border-cyan-500/50 transition-all duration-300">
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
                      <div className="text-xs text-slate-400 text-center font-mono">
                        {tech.name}
                      </div>

                      {/* Glow effect on hover */}
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
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
