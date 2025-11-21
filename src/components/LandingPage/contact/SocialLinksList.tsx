"use client";

import type { SocialLinksProps } from "@/components/types/landing/contact";

import { motion } from "framer-motion";

export function SocialLinksList({
  socialLinks,
  isInView,
}: {
  socialLinks: SocialLinksProps[];
  isInView: boolean;
}) {
  return (
    <aside>
      <h3 className="mb-6 font-mono text-xl text-theme-text">
        Connect With Me
      </h3>
      <div className="space-y-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            whileHover={{ x: 10 }}
            className="group flex min-h-[44px] items-center gap-4 rounded-lg border border-theme-border/40 p-4 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-theme-primary/5 hover:border-theme-primary/60"
            style={{
              background:
                "linear-gradient(145deg, color-mix(in srgb, var(--color-surface) 78%, transparent), color-mix(in srgb, var(--color-background) 60%, transparent))",
            }}
            aria-label={`Visit ${social.name} profile for ${social.username}`}
          >
            <div
              className={`rounded-lg border border-theme-border/40 p-3 shadow-lg transition-all duration-300 group-hover:border-theme-primary/50 ${social.glow}`}
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 85%, transparent), color-mix(in srgb, var(--color-background) 55%, transparent))",
              }}
            >
              <social.icon
                className={`h-5 w-5 text-theme-text ${social.color} transition-colors duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]`}
              />
            </div>
            <div className="flex-1">
              <div className="text-theme-text transition-colors duration-300 group-hover:text-theme-primary">
                {social.name}
              </div>
              <div className="text-sm font-mono text-theme-text/85">
                @{social.username}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </aside>
  );
}
