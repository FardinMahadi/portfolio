"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { HeroBackdrop } from "./HeroBackdrop";
import { HeroCodeWindow } from "./HeroCodeWindow";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--color-background) py-16 text-theme-text"
    >
      <HeroBackdrop />
      <HeroCodeWindow />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: [0, 10, 0], opacity: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.5,
        }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-theme-primary" />
      </motion.div>
    </section>
  );
}
