export type AboutCopyProps = {
  isInView: boolean;
};

export type TechStackGridProps = {
  isInView: boolean;
};

/** For updated icons */
export interface TechStackProps {
  name: string;
  icon: {
    link: string;
    height: number;
    width: number;
  };
  color: string;
}
