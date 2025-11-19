"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { TRANSITION_PRESETS } from "@/lib/transitions";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale";
}

/**
 * Page-level transition wrapper with Framer Motion fallback
 * Works alongside View Transitions API for browsers without support
 */
export function PageTransition({
  children,
  variant = "fade",
}: PageTransitionProps) {
  const pathname = usePathname();
  const preset = TRANSITION_PRESETS[variant];

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants[variant].initial}
        animate={variants[variant].animate}
        exit={variants[variant].exit}
        transition={{
          duration: preset.duration / 1000,
          ease: preset.easing,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
