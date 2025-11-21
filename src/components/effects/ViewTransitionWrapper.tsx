"use client";

import type { ViewTransitionWrapperProps } from "@/components/types/shared/effects";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  supportsViewTransitions,
  startViewTransition,
} from "@/lib/transitions";

/**
 * Wrapper component that enables View Transitions API for navigation
 * Provides fallback for browsers without support
 */
export function ViewTransitionWrapper({
  children,
}: ViewTransitionWrapperProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Enable view transitions if supported
    if (supportsViewTransitions()) {
      // View transitions are handled automatically by the browser
      // when navigation occurs and view-transition-name is set
    }
  }, [pathname]);

  return <>{children}</>;
}

/**
 * Hook to handle view transitions for programmatic navigation
 */
export function useViewTransition() {
  const navigateWithTransition = (callback: () => void | Promise<void>) => {
    return startViewTransition(callback);
  };

  return { navigateWithTransition };
}
