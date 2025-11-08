"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TargetCursor } from "@/components/effects/TargetCursor";

export function AppCursorLayer() {
  const pathname = usePathname();
  const [isSuspended, setIsSuspended] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncState = (value?: boolean) => {
      if (typeof value === "boolean") {
        setIsSuspended(value);
        return;
      }
      setIsSuspended(
        typeof document !== "undefined" &&
          document.body.dataset.cursorSuspended === "true"
      );
    };

    const handleSuspend = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      if (typeof customEvent.detail === "boolean") {
        syncState(customEvent.detail);
      }
    };

    syncState();
    window.addEventListener("target-cursor:suspend", handleSuspend);

    return () => {
      window.removeEventListener("target-cursor:suspend", handleSuspend);
    };
  }, []);

  if (pathname?.startsWith("/blog") || isSuspended) {
    return null;
  }

  return (
    <TargetCursor targetSelector="a, button, [role='button'], [class*='cursor-pointer']" />
  );
}
