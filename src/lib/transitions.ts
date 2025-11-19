/**
 * Transition configuration and utilities for View Transitions API
 */

export const TRANSITION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const TRANSITION_EASING = {
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/**
 * Generate view transition name for blog images
 */
export function getBlogImageTransitionName(slug: string): string {
  return `blog-image-${slug}`;
}

/**
 * Generate view transition name for blog card
 */
export function getBlogCardTransitionName(slug: string): string {
  return `blog-card-${slug}`;
}

/**
 * Check if View Transitions API is supported
 */
export function supportsViewTransitions(): boolean {
  if (typeof document === "undefined") return false;
  return "startViewTransition" in document;
}

/**
 * Start a view transition with fallback
 */
export function startViewTransition(
  callback: () => void | Promise<void>
): void {
  if (supportsViewTransitions()) {
    document.startViewTransition(callback);
  } else {
    // Fallback: execute callback immediately
    callback();
  }
}

/**
 * Transition presets for different route types
 */
export const TRANSITION_PRESETS = {
  fade: {
    duration: TRANSITION_DURATION.normal,
    easing: TRANSITION_EASING.easeInOut,
  },
  slide: {
    duration: TRANSITION_DURATION.normal,
    easing: TRANSITION_EASING.easeOut,
  },
  scale: {
    duration: TRANSITION_DURATION.fast,
    easing: TRANSITION_EASING.easeOut,
  },
} as const;
