"use client";

import type { NavItemsProps } from "@/components/types/shared/navigation";

import { BookOpen, Briefcase, FileText, Home, Mail, User } from "lucide-react";

const iconClass = "h-4 w-4";

export const navItems: NavItemsProps[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home className={iconClass} aria-hidden="true" />,
    isRoute: true,
  },
  {
    name: "About",
    href: "/about",
    icon: <User className={iconClass} aria-hidden="true" />,
    isRoute: true,
  },
  {
    name: "Experience",
    href: "/experience",
    icon: <Briefcase className={iconClass} aria-hidden="true" />,
    isRoute: true,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <Mail className={iconClass} aria-hidden="true" />,
    isRoute: true,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: <BookOpen className={iconClass} aria-hidden="true" />,
    isRoute: true,
  },
  {
    name: "Resume",
    href: "/resume",
    icon: <FileText className={iconClass} aria-hidden="true" />,
    isRoute: true,
  },
];
