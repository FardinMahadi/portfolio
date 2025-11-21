"use client";

import type { PageTransitionProps } from "@/components/types/shared/effects";

import { usePathname } from "next/navigation";
import { TRANSITION_PRESETS } from "@/lib/transitions";
import { motion, AnimatePresence } from "framer-motion";

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

  // Convert CSS cubic-bezier string to Framer Motion array format
  const parseEasing = (easing: string): [number, number, number, number] => {
    // Extract numbers from cubic-bezier string
    const match = easing.match(/cubic-bezier\(([^)]+)\)/);
    if (match) {
      const values = match[1].split(",").map((v) => parseFloat(v.trim()));
      if (values.length === 4) {
        return values as [number, number, number, number];
      }
    }
    // Fallback to default easing
    return [0.4, 0, 0.2, 1];
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
          ease: parseEasing(preset.easing),
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
