"use client";

import type { MobileNavigationProps } from "@/components/types/navigationTypes";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Code2, Terminal, X } from "lucide-react";

import { Button } from "../../ui/button";
import { ColorPaletteSwitcher } from "../../ui/ColorPaletteSwitcher";

export function MobileNavigation({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navItems,
  handleNavClick,
  isActive,
  openSubmenu,
  setOpenSubmenu,
}: MobileNavigationProps) {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-background) 60%, transparent)",
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-64 border-l z-50 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 95%, transparent), color-mix(in srgb, var(--color-background) 98%, transparent))",
              borderColor: "var(--color-border)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-theme-primary" />
                  <span className="font-mono text-theme-text">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-theme-text/60 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-theme-primary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const itemIsActive = isActive(item);
                  const hasSubItems = item.subItems && item.subItems.length > 0;
                  const isSubmenuOpen = openSubmenu === item.name;

                  return (
                    <div key={item.name}>
                      {item.isRoute ? (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`w-full text-left p-4 rounded-lg border transition-all duration-300 min-h-[44px] ${
                              itemIsActive
                                ? "text-theme-primary"
                                : "text-theme-text/70 hover:text-theme-primary"
                            }`}
                            style={
                              itemIsActive
                                ? {
                                    backgroundColor:
                                      "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                                    borderColor:
                                      "color-mix(in srgb, var(--color-primary) 50%, transparent)",
                                  }
                                : {
                                    backgroundColor:
                                      "color-mix(in srgb, var(--color-surface) 30%, transparent)",
                                    borderColor:
                                      "color-mix(in srgb, var(--color-border) 70%, transparent)",
                                  }
                            }
                            aria-label={`Navigate to ${item.name}`}
                            aria-current={itemIsActive ? "page" : undefined}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="flex h-5 w-5 items-center justify-center text-theme-text/60 transition-colors group-hover:text-theme-primary">
                                  {item.icon}
                                </span>
                                <span>{item.name}</span>
                              </div>
                              {hasSubItems && (
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    isSubmenuOpen ? "rotate-180" : ""
                                  }`}
                                />
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      ) : (
                        <motion.button
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={(e) => handleNavClick(item, e)}
                          className={`w-full text-left p-4 rounded-lg border transition-all duration-300 min-h-[44px] ${
                            itemIsActive
                              ? "text-theme-primary"
                              : "text-theme-text/70 hover:text-theme-primary"
                          }`}
                          style={
                            itemIsActive
                              ? {
                                  backgroundColor:
                                    "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                                  borderColor:
                                    "color-mix(in srgb, var(--color-primary) 50%, transparent)",
                                }
                              : {
                                  backgroundColor:
                                    "color-mix(in srgb, var(--color-surface) 30%, transparent)",
                                  borderColor:
                                    "color-mix(in srgb, var(--color-border) 70%, transparent)",
                                }
                          }
                          aria-label={`Navigate to ${item.name} section`}
                          aria-current={itemIsActive ? "page" : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center text-theme-text/60 transition-colors group-hover:text-theme-primary">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </div>
                        </motion.button>
                      )}

                      {/* Mobile Submenu */}
                      {hasSubItems && (
                        <AnimatePresence>
                          {isSubmenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-2 space-y-1"
                            >
                              {item.subItems?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setOpenSubmenu(null);
                                  }}
                                  className="block px-4 py-2 text-sm text-theme-text/60 hover:text-theme-primary rounded transition-colors"
                                  style={{
                                    backgroundColor: "transparent",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "color-mix(in srgb, var(--color-surface) 30%, transparent)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                  }}
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

                      {hasSubItems && (
                        <button
                          onClick={() =>
                            setOpenSubmenu(isSubmenuOpen ? null : item.name)
                          }
                          className="w-full text-left px-4 py-2 text-xs text-slate-500 transition-colors hover:text-theme-primary"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          {isSubmenuOpen ? "Hide" : "Show"} categories
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-3"
              >
                <div className="flex justify-center">
                  <ColorPaletteSwitcher />
                </div>
                <Button
                  className="w-full text-white shadow-lg min-h-[44px]"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                    boxShadow:
                      "0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.12), 0 0 25px -8px var(--color-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to right, var(--color-primary), var(--color-secondary))";
                    e.currentTarget.style.filter = "brightness(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/mahadi-hasan-fardin-cv.pdf";
                    link.download = "mahadi-hasan-fardin-cv.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  aria-label="Download CV as PDF"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </motion.div>

              {/* Decorative terminal prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-4 rounded-lg border font-mono text-xs"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-surface) 50%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--color-border) 50%, transparent)",
                }}
              >
                <div className="mb-1" style={{ color: "var(--color-primary)" }}>
                  $ whoami
                </div>
                <div className="text-theme-text/60">
                  Fardin - MERN Developer
                </div>
                <div
                  className="mt-2 flex items-center gap-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  $ <span className="animate-pulse">_</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
