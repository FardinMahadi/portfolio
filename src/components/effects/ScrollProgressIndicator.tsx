"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressIndicatorProps {
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  showOnMobile?: boolean;
}

export function ScrollProgressIndicator({
  position = "top",
  height = "2px",
  showOnMobile = false,
}: ScrollProgressIndicatorProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const positionClasses = {
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
    left: "left-0 top-0 bottom-0",
    right: "right-0 top-0 bottom-0",
  };

  const isHorizontal = position === "left" || position === "right";

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-[9998] pointer-events-none ${
        showOnMobile ? "" : "hidden md:block"
      }`}
      style={
        isHorizontal
          ? {
              width: height,
              scaleY: scaleX,
              transformOrigin: "top",
            }
          : {
              height: height,
              scaleX: scaleX,
              transformOrigin: "left",
            }
      }
    >
      <div
        className="h-full w-full"
        style={{
          background: `linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-accent))`,
          opacity: 0.8,
        }}
      />
    </motion.div>
  );
}

