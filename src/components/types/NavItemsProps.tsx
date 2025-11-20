import { ReactNode } from "react";

export interface NavItemsProps {
  name: string;
  href: string;
  icon: ReactNode;
  isRoute?: boolean; // true if it's a route (e.g., /blog), false if it's a hash link (e.g., #about)
  subItems?: NavSubItemProps[];
}

export interface NavSubItemProps {
  name: string;
  href: string;
  icon?: string;
}
