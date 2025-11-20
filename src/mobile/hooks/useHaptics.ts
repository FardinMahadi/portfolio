"use client";

import { useCallback } from "react";

import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

import { usePlatform } from "./usePlatform";

/**
 * Hook for haptic feedback
 */
export function useHaptics() {
  const { isNative } = usePlatform();

  const impact = useCallback(
    async (style: ImpactStyle = ImpactStyle.Medium) => {
      if (isNative) {
        try {
          await Haptics.impact({ style });
        } catch (error) {
          // Silently fail if haptics not available
          console.debug("Haptics not available:", error);
        }
      }
    },
    [isNative]
  );

  const notification = useCallback(
    async (type: NotificationType = NotificationType.Success) => {
      if (isNative) {
        try {
          await Haptics.notification({ type });
        } catch (error) {
          console.debug("Haptics not available:", error);
        }
      }
    },
    [isNative]
  );

  const selectionStart = useCallback(async () => {
    if (isNative) {
      try {
        await Haptics.selectionStart();
      } catch (error) {
        console.debug("Haptics not available:", error);
      }
    }
  }, [isNative]);

  const selectionChanged = useCallback(async () => {
    if (isNative) {
      try {
        await Haptics.selectionChanged();
      } catch (error) {
        console.debug("Haptics not available:", error);
      }
    }
  }, [isNative]);

  const selectionEnd = useCallback(async () => {
    if (isNative) {
      try {
        await Haptics.selectionEnd();
      } catch (error) {
        console.debug("Haptics not available:", error);
      }
    }
  }, [isNative]);

  const vibrate = useCallback(async () => {
    if (isNative) {
      try {
        await Haptics.vibrate();
      } catch (error) {
        console.debug("Haptics not available:", error);
      }
    }
  }, [isNative]);

  return {
    impact,
    notification,
    selectionStart,
    selectionChanged,
    selectionEnd,
    vibrate,
  };
}
