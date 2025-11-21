"use client";

import type { TechStackGridProps } from "@/components/types/about";

import Image from "next/image";
import { motion } from "framer-motion";

import { techStack } from "./techStack";

export function TechStackGrid({ isInView }: TechStackGridProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="mb-6 font-mono text-xl text-theme-text">Tech Stack</h3>
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
  );
}
