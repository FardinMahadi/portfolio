import { Capacitor } from "@capacitor/core";

export type Platform = "ios" | "android" | "web";

export interface PlatformInfo {
  platform: Platform;
  isNative: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isWeb: boolean;
  isMobile: boolean;
}

/**
 * Detect the current platform
 */
export function getPlatform(): Platform {
  if (Capacitor.isNativePlatform()) {
    return Capacitor.getPlatform() as Platform;
  }
  return "web";
}

/**
 * Get comprehensive platform information
 */
export function getPlatformInfo(): PlatformInfo {
  const platform = getPlatform();
  const isNative = Capacitor.isNativePlatform();
  const isIOS = platform === "ios";
  const isAndroid = platform === "android";
  const isWeb = platform === "web";
  const isMobile = isIOS || isAndroid;

  return {
    platform,
    isNative,
    isIOS,
    isAndroid,
    isWeb,
    isMobile,
  };
}

/**
 * Check if running on a specific platform
 */
export function isPlatform(platform: Platform): boolean {
  return getPlatform() === platform;
}

/**
 * Check if running on native platform
 */
export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Check if running on mobile (iOS or Android)
 */
export function isMobilePlatform(): boolean {
  const platform = getPlatform();
  return platform === "ios" || platform === "android";
}

/**
 * Get platform-specific class names
 */
export function getPlatformClasses(): string {
  const platform = getPlatform();
  return `platform-${platform} ${platform === "ios" ? "ios" : platform === "android" ? "android" : "web"}`;
}
