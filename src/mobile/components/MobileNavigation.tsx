"use client";

import { Navigation } from "@/components/LandingPage/Navigation";

import { useHaptics } from "../hooks/useHaptics";
import { usePlatform } from "../hooks/usePlatform";

/**
 * Mobile Navigation Component
 * Uses Ionic components on native platforms, falls back to existing navigation on web
 */
export function MobileNavigation() {
  const { isNative } = usePlatform();
  const { impact } = useHaptics();

  // On native platforms, we can enhance the navigation with Ionic components
  // For now, we'll use the existing Navigation component which already has mobile support
  // In the future, you can replace this with IonTabs or IonMenu for a more native feel

  // Add haptic feedback to navigation interactions on native
  const handleNavInteraction = () => {
    if (isNative) {
      impact();
    }
  };

  // For now, return the existing navigation
  // You can enhance this later with Ionic-specific components like:
  // - IonTabs for bottom tab navigation
  // - IonMenu for side menu navigation
  // - IonNav for stack-based navigation

  return <Navigation />;
}
