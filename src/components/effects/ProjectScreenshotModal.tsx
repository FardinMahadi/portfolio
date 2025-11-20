"use client";

import type { ProjectScreenshotModalProps } from "@/components/types/ProjectScreenshotModalProps";

import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const dialogVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
};

export function ProjectScreenshotModal({
  project,
  isOpen,
  modalId,
  onClose,
  focusReturnPoint,
  footerSlot,
}: ProjectScreenshotModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gallery = useMemo(() => {
    if (!project) return [];
    if (project.gallery && project.gallery.length > 0) {
      return project.gallery;
    }
    return [
      {
        src: project.image,
        width: project.width,
        height: project.height,
        alt: `${project.title} full-size screenshot`,
      },
    ];
  }, [project]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        const focusableElements =
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
        if (!focusableElements || focusableElements.length === 0) {
          return;
        }
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }

      if (gallery.length > 1) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setActiveIndex((current) => (current + 1) % gallery.length);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          setActiveIndex(
            (current) => (current - 1 + gallery.length) % gallery.length
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      focusReturnPoint?.focus({ preventScroll: true });
    };
  }, [isOpen, onClose, focusReturnPoint, gallery.length]);

  useEffect(() => {
    const updateSuspended = (value: boolean) => {
      if (typeof document === "undefined") return;

      if (value) {
        document.body.dataset.cursorSuspended = "true";
      } else {
        delete document.body.dataset.cursorSuspended;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("target-cursor:suspend", { detail: value })
        );
      }
    };

    updateSuspended(isOpen);

    return () => {
      updateSuspended(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
  }, [isOpen, project]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && project ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          data-project-modal
        >
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              background:
                "color-mix(in srgb, var(--color-background) 88%, rgba(6, 5, 17, 0.9))",
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${modalId}-title`}
            aria-describedby={`${modalId}-description`}
            id={modalId}
            className="relative z-1 mx-4 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-theme-border/60 text-theme-text shadow-2xl"
            style={{
              background:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 94%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
            }}
            ref={dialogRef}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-start justify-between border-b border-theme-border/50 bg-theme-surface/80 px-6 py-4 backdrop-blur">
              <div>
                <h2
                  id={`${modalId}-title`}
                  className="font-mono text-lg text-theme-primary"
                >
                  {project.title}
                </h2>
                <p
                  id={`${modalId}-description`}
                  className="mt-1 text-sm text-theme-text/70"
                >
                  {project.description}
                </p>
                {project.role && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-theme-text/60">
                    {project.role}
                  </p>
                )}
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="rounded-full border border-theme-border/60 bg-theme-surface/80 p-2 text-theme-text/70 transition hover:border-theme-primary/60 hover:text-theme-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-primary/60"
                aria-label="Close screenshot preview"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <motion.div
              className="relative flex-1 overflow-auto bg-(--color-background) p-4 sm:p-6"
              layout
            >
              <div className="relative mx-auto w-full max-w-4xl">
                <div
                  className="relative rounded-xl border border-theme-border/60 bg-theme-surface/80 p-3 shadow-inner"
                  style={{
                    background:
                      "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 94%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
                  }}
                >
                  <ImageWithFallback
                    src={gallery[activeIndex]?.src ?? project.image}
                    alt={
                      gallery[activeIndex]?.alt ??
                      `${project.title} full-size screenshot`
                    }
                    width={gallery[activeIndex]?.width ?? project.width}
                    height={gallery[activeIndex]?.height ?? project.height}
                    className="h-auto w-full rounded-md object-cover"
                    sizes="100vw"
                    priority
                  />
                  {gallery.length > 1 && (
                    <>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIndex(
                              (current) =>
                                (current - 1 + gallery.length) % gallery.length
                            )
                          }
                          className="pointer-events-auto rounded-full border border-theme-border/60 bg-theme-surface/80 p-2 text-theme-text/70 transition hover:border-theme-primary/60 hover:text-theme-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-primary/60"
                          aria-label="View previous screenshot"
                        >
                          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIndex(
                              (current) => (current + 1) % gallery.length
                            )
                          }
                          className="pointer-events-auto rounded-full border border-theme-border/60 bg-theme-surface/80 p-2 text-theme-text/70 transition hover:border-theme-primary/60 hover:text-theme-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-primary/60"
                          aria-label="View next screenshot"
                        >
                          <ChevronRight
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                        {gallery.map((item, index) => {
                          const isActive = index === activeIndex;
                          return (
                            <button
                              key={`${project.title}-thumb-${index}`}
                              type="button"
                              onClick={() => setActiveIndex(index)}
                              aria-label={`View screenshot ${index + 1}`}
                              aria-pressed={isActive}
                              className={`relative overflow-hidden rounded-lg border transition focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-primary/60 ${
                                isActive
                                  ? "border-theme-primary shadow-[0_0_0_2px_rgba(56,189,248,0.35)]"
                                  : "border-theme-border/60 hover:border-theme-primary/50"
                              }`}
                            >
                              <ImageWithFallback
                                src={item.src}
                                alt={item.alt ?? `${project.title} thumbnail`}
                                width={item.width}
                                height={item.height}
                                className="h-20 w-32 object-cover"
                                sizes="128px"
                              />
                              {isActive && (
                                <span className="absolute inset-0 border-2 border-theme-primary/70" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {footerSlot && (
              <div className="border-t border-theme-border/60 bg-theme-surface/80 px-6 py-4 text-sm text-theme-text/75 backdrop-blur">
                {footerSlot}
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
