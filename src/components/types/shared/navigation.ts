import type { Dispatch, MouseEvent, ReactNode, SetStateAction } from "react";

export interface NavItemsProps {
  name: string;
  href: string;
  icon: ReactNode;
  isRoute?: boolean;
  subItems?: NavSubItemProps[];
}

export interface NavSubItemProps {
  name: string;
  href: string;
  icon?: string;
}

export type DesktopNavigationProps = {
  isScrolled: boolean;
  navItems: NavItemsProps[];
  handleNavClick: (
    item: NavItemsProps,
    e?: MouseEvent<HTMLButtonElement>
  ) => void;
  isActive: (item: NavItemsProps) => boolean;
  openSubmenu: string | null;
  setOpenSubmenu: Dispatch<SetStateAction<string | null>>;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

export type MobileNavigationProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  navItems: NavItemsProps[];
  handleNavClick: (
    item: NavItemsProps,
    e?: MouseEvent<HTMLButtonElement>
  ) => void;
  isActive: (item: NavItemsProps) => boolean;
  openSubmenu: string | null;
  setOpenSubmenu: Dispatch<SetStateAction<string | null>>;
};
