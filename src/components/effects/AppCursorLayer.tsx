"use client";

import { usePathname } from "next/navigation";
import { TargetCursor } from "@/components/effects/TargetCursor";

export function AppCursorLayer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/blog")) {
    return null;
  }

  return (
    <TargetCursor targetSelector="a, button, [role='button'], [class*='cursor-pointer']" />
  );
}
