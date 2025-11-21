import type { CSSProperties, ReactNode } from "react";

import type { ProjectsProps } from "../landing/projects";

export interface GlassmorphismPanelProps {
  children: ReactNode;
  className?: string;
  blur?: string;
  opacity?: number;
  borderOpacity?: number;
  hover?: boolean;
  style?: CSSProperties;
}

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticStrength?: number;
  [key: string]: unknown;
}

export interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale";
}

export interface ParticleProps {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export interface ScrollProgressIndicatorProps {
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  showOnMobile?: boolean;
}

export interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
}

export interface ViewTransitionWrapperProps {
  children: ReactNode;
}

export type ModalProject = ProjectsProps;

export interface ProjectScreenshotModalProps {
  project: ModalProject | null;
  isOpen: boolean;
  modalId: string;
  onClose: () => void;
  focusReturnPoint?: HTMLElement | null;
  footerSlot?: ReactNode;
}
