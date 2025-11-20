"use client";

import { useEffect } from "react";
import { Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { LoadingSpinner } from "./LoadingSpinner";

import type { PageLoaderProps } from "./schema";

export function PageLoader({
  message = "Loading...",
  showProgress = false,
  progress = 0,
  variant = "overlay",
  className,
}: PageLoaderProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // Disable cursor effects when PageLoader is shown
    if (typeof window !== "undefined") {
      document.body.dataset.cursorSuspended = "true";
      window.dispatchEvent(
        new CustomEvent("target-cursor:suspend", { detail: true })
      );

      return () => {
        document.body.dataset.cursorSuspended = "false";
        window.dispatchEvent(
          new CustomEvent("target-cursor:suspend", { detail: false })
        );
      };
    }
  }, []);

  if (variant === "inline") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 p-8 ${className || ""}`}
      >
        <LoadingSpinner variant="terminal" size="lg" text={message} />
        {showProgress && (
          <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-theme-primary"
              style={{
                backgroundColor: "var(--color-primary)",
                width: `${progress}%`,
              }}
              initial={prefersReducedMotion ? {} : { width: 0 }}
              animate={prefersReducedMotion ? {} : { width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 backdrop-blur-sm ${className || ""}`}
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-background) 95%, transparent)",
        }}
        role="status"
        aria-label="Page loading"
        aria-live="polite"
      >
        {/* Terminal-style container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 p-8 rounded-lg border border-slate-800/50 bg-gradient-to-br from-(--color-surface) to-(--color-background) shadow-xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 font-mono text-sm text-slate-400">
            <Terminal className="w-4 h-4 text-theme-primary" />
            <span>Loading...</span>
          </div>

          {/* Spinner */}
          <LoadingSpinner variant="terminal" size="lg" />

          {/* Message */}
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-theme-text font-mono text-sm"
            >
              {message}
            </motion.p>
          )}

          {/* Progress bar */}
          {showProgress && (
            <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-theme-primary"
                style={{
                  backgroundColor: "var(--color-primary)",
                  width: `${progress}%`,
                }}
                initial={prefersReducedMotion ? {} : { width: 0 }}
                animate={prefersReducedMotion ? {} : { width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          )}

          {/* Terminal prompt decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-xs text-slate-500 flex items-center gap-1"
          >
            <span>$</span>
            <motion.span
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      opacity: [1, 0],
                    }
              }
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              _
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
