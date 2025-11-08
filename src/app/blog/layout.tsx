import type { ReactNode } from "react";
import { BlogCursorEffect } from "@/components/effects/BlogCursorEffect";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <BlogCursorEffect>{children}</BlogCursorEffect>;
}
