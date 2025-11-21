"use client";

import type { MouseEvent } from "react";

import type { ProjectsProps } from "./ProjectsProps";

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
