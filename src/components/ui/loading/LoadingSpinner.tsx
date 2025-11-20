"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, Terminal } from "lucide-react";

import type { LoadingSpinnerProps } from "./schema";

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function LoadingSpinner({
  variant = "default",
  size = "md",
  text,
  className,
}: LoadingSpinnerProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const spinnerContent = () => {
    switch (variant) {
      case "terminal":
        return (
          <div className="flex items-center gap-2 font-mono">
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className={cn("text-theme-primary", sizeClasses[size])}
            >
              <Terminal className="w-full h-full" />
            </motion.div>
            {text && (
              <span className={cn("text-theme-text", textSizeClasses[size])}>
                {text}
                <motion.span
                  animate={prefersReducedMotion ? {} : { opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block ml-1"
                >
                  _
                </motion.span>
              </span>
            )}
          </div>
        );

      case "minimal":
        return (
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className={cn(
              "border-2 border-theme-primary border-t-transparent rounded-full",
              sizeClasses[size]
            )}
            style={{
              borderColor: "var(--color-primary)",
              borderTopColor: "transparent",
            }}
          />
        );

      case "pulse":
        return (
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn("rounded-full bg-theme-primary", sizeClasses[size])}
            style={{
              backgroundColor: "var(--color-primary)",
            }}
          />
        );

      default:
        return (
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className={cn("text-theme-primary", sizeClasses[size])}
          >
            <Loader2 className="w-full h-full" />
          </motion.div>
        );
    }
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      role="status"
      aria-label={text || "Loading"}
      aria-live="polite"
    >
      {spinnerContent()}
    </div>
  );
}
