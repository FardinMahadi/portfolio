/**
 * Mobile App Module
 *
 * Centralized exports for all mobile-related functionality
 * This makes it easier to import mobile features throughout the app
 */

// Components
export { IonicApp } from "./components/IonicApp";
export { MobileNavigation } from "./components/MobileNavigation";

// Hooks
export { useHaptics } from "./hooks/useHaptics";
export { useKeyboard } from "./hooks/useKeyboard";
export { usePlatform } from "./hooks/usePlatform";
export type { KeyboardInfo } from "./hooks/useKeyboard";

// Platform utilities
export {
  getPlatform,
  getPlatformInfo,
  isPlatform,
  isNativePlatform,
  isMobilePlatform,
  getPlatformClasses,
} from "./lib/platform";
export type { Platform, PlatformInfo } from "./lib/platform";
