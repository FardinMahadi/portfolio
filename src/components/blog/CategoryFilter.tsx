"use client";

import type { CategoryFilterProps } from "@/components/types/blog";

import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blogData";
import { useMemo, useRef, useEffect } from "react";

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get unique categories from all blog posts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(blogPosts.map((post) => post.category))
    );
    return ["All", ...uniqueCategories.sort()];
  }, []);

  // Auto-scroll to selected category
  useEffect(() => {
    if (selectedCategory && scrollContainerRef.current) {
      const selectedButton = scrollContainerRef.current.querySelector(
        `[data-category="${selectedCategory}"]`
      ) as HTMLElement;
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedCategory]);

  return (
    <div className="relative mb-8">
      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto md:overflow-visible scrollbar-hide pb-2 scroll-smooth -mx-6 px-6 md:mx-0 md:px-0 snap-x md:snap-none"
        style={{
          scrollbarWidth: "none",
          scrollPaddingInlineStart: "1.5rem",
          scrollPaddingInlineEnd: "1.5rem",
        }}
      >
        {categories.map((category) => {
          const isSelected =
            (category === "All" && selectedCategory === null) ||
            category === selectedCategory;

          return (
            <motion.button
              key={category}
              data-category={category}
              onClick={() =>
                onCategoryChange(category === "All" ? null : category)
              }
              className={`px-4 py-2 rounded-full text-sm font-mono whitespace-nowrap transition-all duration-200 min-h-[44px] flex items-center justify-center relative snap-start ${
                isSelected
                  ? "bg-theme-primary text-[#0a0e1a] border border-theme-primary"
                  : "text-slate-300 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Filter by ${category}`}
              aria-pressed={isSelected}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
