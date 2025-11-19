"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TargetCursor } from "@/components/effects/TargetCursor";

export function AppCursorLayer() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);

  useEffect(() => {
    // Mark as mounted to prevent hydration mismatch
    setMounted(true);

    const syncState = (value?: boolean) => {
      if (typeof value === "boolean") {
        setIsSuspended(value);
        return;
      }
      setIsSuspended(document.body.dataset.cursorSuspended === "true");
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

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted || pathname?.startsWith("/blog") || isSuspended) {
    return null;
  }

  return (
    <TargetCursor targetSelector="a, button, [role='button'], [class*='cursor-pointer']" />
  );
}
