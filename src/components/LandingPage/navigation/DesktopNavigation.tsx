"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Terminal, X } from "lucide-react";
import type { MouseEvent, Dispatch, SetStateAction } from "react";

import { Button } from "../../ui/button";
import type { NavItemsProps } from "../../types/NavItemsProps";
import { ColorPaletteSwitcher } from "../../ui/ColorPaletteSwitcher";

type DesktopNavigationProps = {
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

export function DesktopNavigation({
  isScrolled,
  navItems,
  handleNavClick,
  isActive,
  openSubmenu,
  setOpenSubmenu,
  isMobileMenuOpen,
  toggleMobileMenu,
}: DesktopNavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-3xl border-b border-slate-800/50 shadow-lg"
          : "bg-transparent"
      }`}
      style={
        isScrolled
          ? {
              backgroundColor: "var(--color-background)",
              opacity: "0.8",
              boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px var(--color-primary)`,
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Link
              href="/"
              className="font-mono text-slate-100 transition-colors group-hover:text-theme-primary"
              aria-label="Navigate to home"
            >
              {"<FardinMahadi />"}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const itemIsActive = isActive(item);
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.name} className="relative group/item">
                  {item.isRoute ? (
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 py-2 cursor-pointer min-h-[44px] flex items-center ${
                          itemIsActive ? "text-theme-primary" : "text-slate-300"
                        }`}
                        aria-label={`Navigate to ${item.name}`}
                        onMouseEnter={() =>
                          hasSubItems && setOpenSubmenu(item.name)
                        }
                        onMouseLeave={() => setOpenSubmenu(null)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center text-slate-500 transition-colors group-hover/item:text-theme-primary">
                            {item.icon}
                          </span>
                          <span className="text-sm transition-colors group-hover/item:text-theme-primary">
                            {item.name}
                          </span>
                          {hasSubItems && (
                            <ChevronDown className="w-3 h-3 opacity-60" />
                          )}
                        </div>

                        {/* Active indicator */}
                        {itemIsActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{
                              background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}

                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            opacity: "0.05",
                          }}
                        />
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={(e) => handleNavClick(item, e)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 min-h-[44px] flex items-center ${
                        itemIsActive
                          ? "text-theme-primary"
                          : "text-slate-300 group-hover/item:text-theme-primary"
                      }`}
                      aria-label={`Navigate to ${item.name} section`}
                      aria-current={itemIsActive ? "page" : undefined}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center text-slate-500 transition-colors group-hover/item:text-theme-primary">
                          {item.icon}
                        </span>
                        <span className="text-sm transition-colors">
                          {item.name}
                        </span>
                      </div>

                      {/* Active indicator */}
                      {itemIsActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{
                            background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          opacity: "0.05",
                        }}
                      />
                    </motion.button>
                  )}

                  {/* Submenu Dropdown */}
                  {hasSubItems && (
                    <AnimatePresence>
                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 bg-linear-to-br from-(--color-background) to-(--color-surface) border border-slate-800 rounded-lg shadow-xl min-w-[200px]"
                          onMouseEnter={() => setOpenSubmenu(item.name)}
                          onMouseLeave={() => setOpenSubmenu(null)}
                        >
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800/50 transition-colors hover:text-theme-primary"
                            >
                              {subItem.icon && (
                                <span className="mr-2 font-mono text-xs opacity-60">
                                  {subItem.icon}
                                </span>
                              )}
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button & Color Switcher - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <ColorPaletteSwitcher />
            <Button
              size="sm"
              className="text-white shadow-lg transition-all duration-300 hover:shadow-xl min-h-[44px]"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                boxShadow:
                  "0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.12), 0 0 25px -8px var(--color-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)";
              }}
              onClick={() => {
                try {
                  const link = document.createElement("a");
                  link.href = "/mahadi-hasan-fardin-cv.pdf";
                  link.download = "mahadi-hasan-fardin-cv.pdf";
                  link.style.display = "none";
                  document.body.appendChild(link);
                  link.click();
                  setTimeout(() => {
                    if (link.parentNode === document.body) {
                      document.body.removeChild(link);
                    }
                  }, 100);
                } catch (error) {
                  console.error("Error downloading CV:", error);
                }
              }}
              aria-label="Download CV as PDF"
            >
              <Terminal className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-slate-300 transition-colors relative group min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-theme-primary"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                backgroundColor: "var(--color-primary)",
                opacity: "0.1",
              }}
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
