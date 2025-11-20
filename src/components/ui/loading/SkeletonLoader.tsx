"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import type { SkeletonLoaderProps } from "./schema";

export function SkeletonLoader({
  variant = "text",
  width,
  height,
  count = 1,
  className,
  rounded = true,
}: SkeletonLoaderProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getVariantStyles = () => {
    const baseStyles = {
      width: width || "100%",
      height: height || undefined,
    };

    switch (variant) {
      case "image":
        return {
          ...baseStyles,
          height: height || "200px",
          aspectRatio: "16/9",
        };
      case "card":
        return {
          ...baseStyles,
          height: height || "300px",
        };
      case "list":
        return {
          ...baseStyles,
          height: height || "60px",
        };
      case "text":
        return {
          ...baseStyles,
          height: height || "1em",
        };
      default:
        return baseStyles;
    }
  };

  const styles = getVariantStyles();

  const skeletonItem = (
    <div
      className={cn(
        "relative overflow-hidden bg-slate-800/50",
        rounded && "rounded-md",
        className
      )}
      style={styles}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-slate-700/50 to-transparent"
        style={{
          background: `linear-gradient(90deg, transparent, var(--color-primary)/20, transparent)`,
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: ["-100%", "100%"],
              }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );

  if (count === 1) {
    return skeletonItem;
  }

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{skeletonItem}</div>
      ))}
    </div>
  );
}
