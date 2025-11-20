"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import {
  CursorFollow,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";

type BlogCursorEffectProps = PropsWithChildren<{
  className?: string;
  label?: string;
  targetSelector?: string;
}>;

const DEFAULT_SELECTOR = "[data-blog-category]";

export function BlogCursorEffect({
  children,
  className,
  label = "Creative Reading",
  targetSelector = DEFAULT_SELECTOR,
}: BlogCursorEffectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeLabel, setActiveLabel] = useState(label);
  const [mounted, setMounted] = useState(false);
  const [isMdOrLarger, setIsMdOrLarger] = useState(false);

  const selectorList = useMemo(
    () => targetSelector.split(",").map((selector) => selector.trim()),
    [targetSelector]
  );

  // Check if screen is md or larger (768px+) - only after mount
  useEffect(() => {
    // Mark as mounted first
    setMounted(true);

    const checkScreenSize = () => {
      setIsMdOrLarger(window.innerWidth >= 768);
    };

    // Check on mount
    checkScreenSize();

    // Listen for resize events
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !isMdOrLarger) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId: number | null = null;
    let currentLabel = label;

    const resolveLabel = (element: Element | null) => {
      if (!(element instanceof HTMLElement)) return label;

      const matchedElement =
        element.closest<HTMLElement>(DEFAULT_SELECTOR) ?? element;

      const category = matchedElement.dataset.blogCategory?.trim();

      return category && category.length > 0 ? category : label;
    };

    const updateLabel = (nextLabel: string) => {
      if (nextLabel === currentLabel) return;
      currentLabel = nextLabel;
      setActiveLabel(nextLabel);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const target =
          (event.target as Element | null)?.closest(selectorList.join(",")) ??
          null;
        updateLabel(resolveLabel(target));
      });
    };

    const handleMouseLeave = () => {
      updateLabel(label);
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted, label, selectorList, isMdOrLarger]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative min-h-screen bg-theme-background text-theme-text",
        className
      )}
    >
      {children}

      {mounted && isMdOrLarger && (
        <CursorProvider className="pointer-events-none absolute inset-0">
          <CursorFollow
            align="bottom-right"
            sideOffset={20}
            className="pointer-events-none"
            aria-hidden="true"
          >
            <div className="select-none rounded-full bg-theme-primary/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-theme-primary shadow-[0_12px_32px_-16px_var(--color-primary)] ring-1 ring-theme-accent/40">
              {activeLabel}
            </div>
          </CursorFollow>
        </CursorProvider>
      )}
    </div>
  );
}
