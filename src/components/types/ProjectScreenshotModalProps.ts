import type { ReactNode } from "react";
import type { ProjectsProps } from "./ProjectsProps";

export type ModalProject = ProjectsProps;

export interface ProjectScreenshotModalProps {
  project: ModalProject | null;
  isOpen: boolean;
  modalId: string;
  onClose: () => void;
  focusReturnPoint?: HTMLElement | null;
  footerSlot?: ReactNode;
}
