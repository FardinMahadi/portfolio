"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassmorphismPanelProps {
  children: ReactNode;
  className?: string;
  blur?: string;
  opacity?: number;
  borderOpacity?: number;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function GlassmorphismPanel({
  children,
  className = "",
  blur = "8px",
  opacity = 0.1,
  borderOpacity = 0.2,
  hover = true,
  style,
}: GlassmorphismPanelProps) {
  return (
    <motion.div
      className={`relative rounded-lg border backdrop-blur-md transition-all duration-300 ${
        hover ? "hover:border-opacity-40 hover:shadow-lg" : ""
      } ${className}`}
      style={{
        backgroundColor: `rgba(15, 23, 42, ${opacity})`,
        borderColor: `rgba(148, 163, 184, ${borderOpacity})`,
        backdropFilter: `blur(${blur})`,
        WebkitBackdropFilter: `blur(${blur})`,
        ...style,
      }}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
    >
      {children}
    </motion.div>
  );
}
