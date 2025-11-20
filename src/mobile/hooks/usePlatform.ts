"use client";

import { useEffect, useState } from "react";

import { getPlatformInfo, type PlatformInfo } from "../lib/platform";

/**
 * Hook to get current platform information
 */
export function usePlatform(): PlatformInfo {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>(() => {
    // Initialize with web platform for SSR
    if (typeof window === "undefined") {
      return {
        platform: "web",
        isNative: false,
        isIOS: false,
        isAndroid: false,
        isWeb: true,
        isMobile: false,
      };
    }
    return getPlatformInfo();
  });

  useEffect(() => {
    // Update platform info on client side
    setPlatformInfo(getPlatformInfo());
  }, []);

  return platformInfo;
}
