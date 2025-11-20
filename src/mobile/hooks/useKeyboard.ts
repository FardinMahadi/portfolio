"use client";

import { useEffect, useState } from "react";

import { Keyboard } from "@capacitor/keyboard";

import { usePlatform } from "./usePlatform";

export interface KeyboardInfo {
  isVisible: boolean;
  keyboardHeight: number;
}

/**
 * Hook for keyboard handling
 */
export function useKeyboard(): KeyboardInfo {
  const { isNative } = usePlatform();
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardInfo>({
    isVisible: false,
    keyboardHeight: 0,
  });

  useEffect(() => {
    if (!isNative) {
      return;
    }

    const showListener = Keyboard.addListener("keyboardWillShow", (info) => {
      setKeyboardInfo({
        isVisible: true,
        keyboardHeight: info.keyboardHeight,
      });
    });

    const hideListener = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardInfo({
        isVisible: false,
        keyboardHeight: 0,
      });
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [isNative]);

  return keyboardInfo;
}
