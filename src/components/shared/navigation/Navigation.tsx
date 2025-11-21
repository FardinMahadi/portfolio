"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { navItems } from "./navItems";
import { MobileNavigation } from "./MobileNavigation";
import { DesktopNavigation } from "./DesktopNavigation";

import type { NavItemsProps } from "../../types/NavItemsProps";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (pathname === "/blog" || pathname?.startsWith("/blog/")) {
      setActiveSection("blog");
    } else if (pathname === "/about") {
      setActiveSection("about");
    } else if (pathname === "/experience") {
      setActiveSection("experience");
    } else if (pathname === "/contact") {
      setActiveSection("contact");
    } else if (pathname === "/") {
      setActiveSection("home");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname === "/") {
        const sections = ["home", "blog"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (item: NavItemsProps, e?: React.MouseEvent) => {
    if (item.isRoute) {
      setIsMobileMenuOpen(false);
      return;
    }

    e?.preventDefault();
    const sectionId = item.href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      if (pathname !== "/") {
        window.location.href = `/${item.href}`;
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (item: NavItemsProps) => {
    if (item.isRoute) {
      if (item.href === "/") {
        return pathname === "/" && activeSection === "home";
      }
      return pathname?.startsWith(item.href);
    }
    return activeSection === item.href.replace("#", "");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <DesktopNavigation
        isScrolled={isScrolled}
        navItems={navItems}
        handleNavClick={handleNavClick}
        isActive={isActive}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileNavigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItems}
        handleNavClick={handleNavClick}
        isActive={isActive}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
      />
    </>
  );
}
