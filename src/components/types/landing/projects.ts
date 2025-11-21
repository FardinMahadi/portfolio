import type { MouseEvent } from "react";

export interface ProjectsProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  width: number;
  height: number;
  liveUrl?: string;
  codeUrl?: string;
  role?: string;
  highlights?: string[];
  gallery?: {
    src: string;
    width: number;
    height: number;
    alt?: string;
  }[];
}

export type ProjectCardProps = {
  project: ProjectsProps;
  index: number;
  isInView: boolean;
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type ProjectModalFooterProps = {
  project: ProjectsProps;
};

export type ProjectsHeaderProps = {
  isInView: boolean;
  schemaJson: string;
};
