"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Code2, Menu, X, Terminal, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { NavItemsProps } from "../types/NavItemsProps";

const navItems: NavItemsProps[] = [
  { name: "Home", href: "/", icon: "~/", isRoute: true },
  { name: "About", href: "#about", icon: "</>" },
  { name: "Experience", href: "#experience", icon: "{}" },
  { name: "Projects", href: "#projects", icon: "[]" },
  {
    name: "Blog",
    href: "/blog",
    icon: "//",
    isRoute: true,
  },
  { name: "Contact", href: "#contact", icon: ">_" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    // Set active section based on route
    if (pathname === "/blog" || pathname?.startsWith("/blog/")) {
      setActiveSection("blog");
    } else if (pathname === "/") {
      setActiveSection("home");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only detect active section on homepage
      if (pathname === "/") {
        const sections = [
          "home",
          "about",
          "experience",
          "projects",
          "blog",
          "contact",
        ];
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
      // Handle route navigation
      setIsMobileMenuOpen(false);
      return;
    } else {
      // Handle hash navigation
      e?.preventDefault();
      const sectionId = item.href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        if (pathname !== "/") {
          // If not on homepage, navigate to homepage first, then scroll
          window.location.href = `/${item.href}`;
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (item: NavItemsProps) => {
    if (item.isRoute) {
      if (item.href === "/") {
        return pathname === "/" && activeSection === "home";
      }
      return pathname?.startsWith(item.href);
    } else {
      return activeSection === item.href.replace("#", "");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-cyan-500/5"
            : "bg-transparent"
        }`}
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
                className="font-mono text-slate-100 group-hover:text-cyan-400 transition-colors"
                aria-label="Navigate to home"
              >
                {"<FardinMahadi />"}
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
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
                            itemIsActive ? "text-cyan-400" : "text-slate-300"
                          }`}
                          aria-label={`Navigate to ${item.name}`}
                          onMouseEnter={() =>
                            hasSubItems && setOpenSubmenu(item.name)
                          }
                          onMouseLeave={() => setOpenSubmenu(null)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-500 group-hover/item:text-cyan-400 transition-colors">
                              {item.icon}
                            </span>
                            <span className="text-sm transition-colors group-hover/item:text-cyan-400">
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
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}

                          {/* Hover glow */}
                          <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.button
                        onClick={(e) => handleNavClick(item, e)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 py-2 min-h-[44px] flex items-center ${
                          itemIsActive
                            ? "text-cyan-400"
                            : "text-slate-300 group-hover/item:text-cyan-400"
                        }`}
                        aria-label={`Navigate to ${item.name} section`}
                        aria-current={itemIsActive ? "page" : undefined}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-500 group-hover/item:text-cyan-400 transition-colors">
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
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}

                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity" />
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
                            className="absolute top-full left-0 mt-2 bg-gradient-to-br from-[#0a0e1a] to-[#111827] border border-slate-800 rounded-lg shadow-xl overflow-hidden min-w-[200px]"
                            onMouseEnter={() => setOpenSubmenu(item.name)}
                            onMouseLeave={() => setOpenSubmenu(null)}
                          >
                            {item.subItems?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
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

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/50 min-h-[44px]"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/cv.pdf";
                  link.download = "Mahadi Hasan Fardin.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                aria-label="Download CV as PDF"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors relative group min-h-[44px] min-w-[44px] flex items-center justify-center"
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
              <div className="absolute inset-0 bg-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-gradient-to-br from-[#0a0e1a] to-[#111827] border-l border-slate-800 z-50 md:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    <span className="font-mono text-slate-100">Menu</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-cyan-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const itemIsActive = isActive(item);
                    const hasSubItems =
                      item.subItems && item.subItems.length > 0;
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
                                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                                  : "bg-slate-800/30 border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-cyan-500/30"
                              }`}
                              aria-label={`Navigate to ${item.name}`}
                              aria-current={itemIsActive ? "page" : undefined}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-sm opacity-60">
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
                                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                                : "bg-slate-800/30 border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-cyan-500/30"
                            }`}
                            aria-label={`Navigate to ${item.name} section`}
                            aria-current={itemIsActive ? "page" : undefined}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm opacity-60">
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
                                className="ml-4 mt-2 space-y-1 overflow-hidden"
                              >
                                {item.subItems?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setOpenSubmenu(null);
                                    }}
                                    className="block px-4 py-2 text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-800/30 rounded transition-colors"
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
                            className="w-full text-left px-4 py-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
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
                  className="mt-8"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/30 min-h-[44px]"
                    onClick={() => {
                      const contactItem = navItems.find(
                        (item) => item.name === "Contact"
                      );
                      if (contactItem) {
                        handleNavClick(contactItem);
                      }
                    }}
                    aria-label="Navigate to contact section"
                  >
                    <Terminal className="w-4 h-4 mr-2" />
                    Hire Me
                  </Button>
                </motion.div>

                {/* Decorative terminal prompt */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 font-mono text-xs"
                >
                  <div className="text-green-400 mb-1">$ whoami</div>
                  <div className="text-slate-400">Fardin - MERN Developer</div>
                  <div className="text-green-400 mt-2 flex items-center gap-1">
                    $ <span className="animate-pulse">_</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
