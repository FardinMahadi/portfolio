import type { CSSProperties } from "react";

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: CSSProperties;
  fallbackSrc?: string;
  showRetry?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
}
