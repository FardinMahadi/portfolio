"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { LoadingSpinner } from "./LoadingSpinner";

export function NavigationLoader() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const navigationTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset navigation state when pathname changes
    if (previousPathname.current !== pathname) {
      setIsNavigating(false);
      previousPathname.current = pathname;
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
        navigationTimeout.current = null;
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href^='/blog/']");

      if (link && link.getAttribute("href") !== pathname) {
        setIsNavigating(true);

        // Fallback: hide loader after 5 seconds if navigation doesn't complete
        if (navigationTimeout.current) {
          clearTimeout(navigationTimeout.current);
        }
        navigationTimeout.current = setTimeout(() => {
          setIsNavigating(false);
        }, 5000);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
    };
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-background) 80%, transparent)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner
          variant="terminal"
          size="lg"
          text="Loading article..."
        />
      </div>
    </div>
  );
}
