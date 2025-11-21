"use client";

import type { Dispatch, MouseEvent, SetStateAction } from "react";

import type { NavItemsProps } from "./NavItemsProps";

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

