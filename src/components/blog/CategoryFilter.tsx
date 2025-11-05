"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useEffect } from "react";
import { blogPosts } from "@/lib/blogData";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

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
        className="flex gap-3 scrollbar-hide pb-2 scroll-smooth"
        style={{
          scrollbarWidth: "none",
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
              className={`px-4 py-2 rounded-full text-sm font-mono whitespace-nowrap transition-all duration-300 min-h-[44px] flex items-center justify-center relative ${
                isSelected
                  ? "text-white"
                  : "text-slate-300 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50"
              }`}
              style={
                isSelected
                  ? {
                      background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                      borderColor: "var(--color-primary)",
                      boxShadow: `0 0 20px -5px var(--color-primary), 0 4px 12px -2px var(--color-primary), 0 0 0 1px var(--color-primary), inset 0 0 20px -10px var(--color-primary)`,
                    }
                  : {}
              }
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
