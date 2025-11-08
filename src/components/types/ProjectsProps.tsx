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
