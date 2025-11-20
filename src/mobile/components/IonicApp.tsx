"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { IonApp, setupIonicReact } from "@ionic/react";

import { App } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";

import { usePlatform } from "../hooks/usePlatform";

// Setup Ionic React
setupIonicReact();

interface IonicAppProps {
  children: React.ReactNode;
}

/**
 * Ionic App wrapper component
 * Handles mobile-specific initialization and behavior
 */
export function IonicApp({ children }: IonicAppProps) {
  const { isNative, isIOS, isAndroid } = usePlatform();
  const router = useRouter();

  useEffect(() => {
    if (!isNative) {
      return;
    }

    // Initialize Status Bar
    const initStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: "#06b6d4" });
      } catch (error) {
        console.debug("StatusBar not available:", error);
      }
    };

    // Hide splash screen
    const hideSplash = async () => {
      try {
        await SplashScreen.hide();
      } catch (error) {
        console.debug("SplashScreen not available:", error);
      }
    };

    // Handle app state changes
    const handleAppStateChange = async () => {
      try {
        const { state } = await App.getState();
        if (state === "active") {
          // App came to foreground
        }
      } catch (error) {
        console.debug("App state not available:", error);
      }
    };

    // Handle back button on Android
    const handleBackButton = () => {
      if (isAndroid) {
        App.addListener("backButton", ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            App.exitApp();
          }
        });
      }
    };

    // Handle deep links
    const handleDeepLinks = () => {
      App.addListener("appUrlOpen", (data) => {
        const url = new URL(data.url);
        const path = url.pathname + url.search;
        router.push(path);
      });
    };

    initStatusBar();
    hideSplash();
    handleAppStateChange();
    handleBackButton();
    handleDeepLinks();

    // Cleanup
    return () => {
      if (isAndroid) {
        App.removeAllListeners();
      }
    };
  }, [isNative, isIOS, isAndroid, router]);

  // Only wrap with IonApp on native platforms
  if (isNative) {
    return <IonApp>{children}</IonApp>;
  }

  // On web, just return children
  return <>{children}</>;
}
