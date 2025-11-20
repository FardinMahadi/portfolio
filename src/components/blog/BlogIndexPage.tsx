"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { blogPosts } from "@/lib/blogData";
import { Button } from "@/components/ui/button";
import { generateArticleSchema } from "@/lib/seo";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import {
  getBlogImageTransitionName,
  getBlogCardTransitionName,
} from "@/lib/transitions";

import { CategoryFilter } from "./CategoryFilter";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter blog posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="blog-index"
      className="relative min-h-screen overflow-hidden bg-(--color-background) pt-24 pb-20 px-4 text-theme-text sm:px-6 lg:px-8 scroll-mt-16 md:scroll-mt-32"
      style={{
        background:
          "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 94%, transparent), var(--color-background))",
        zIndex: 1,
      }}
    >
      {/* Background accent */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {blogPosts.map((post, index) => {
          const articleSchema = generateArticleSchema(
            post.title,
            post.excerpt,
            post.date,
            post.date,
            "Mahadi Hasan Fardin",
            `${siteUrl}/og-image.png`
          );
          return (
            <script
              key={`article-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(articleSchema),
              }}
            />
          );
        })}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3 text-theme-primary">
            <span className="font-mono" aria-hidden="true">
              {"</"}
            </span>
            <h1 className="text-4xl font-bold text-theme-accent">
              Blog Articles
            </h1>
            <span className="font-mono" aria-hidden="true">
              {">"}
            </span>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-theme-text/75">
            Explore articles about web development, programming tips, career
            insights, and learning resources. Written to help developers grow
            and succeed in their journey.
          </p>
        </motion.header>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Results count */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-slate-400 text-sm font-mono"
          >
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} in{" "}
            <span className="text-theme-primary">{selectedCategory}</span>
          </motion.div>
        )}

        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <p className="text-lg text-theme-text/70">
              No articles found in this category.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
                data-blog-category={post.category}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full"
                  aria-label={`Read article: ${post.title}`}
                >
                  <div
                    className="flex h-full cursor-pointer flex-col rounded-lg border border-theme-border/60 p-6 transition-all duration-300 backdrop-blur-sm hover:border-theme-primary/60"
                    style={{
                      background:
                        "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 90%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
                      viewTransitionName: getBlogCardTransitionName(post.slug),
                    }}
                  >
                    {post.image && (
                      <div
                        className="relative mb-4 h-44 overflow-hidden rounded-lg border border-theme-border/50"
                        style={{
                          viewTransitionName: getBlogImageTransitionName(
                            post.slug
                          ),
                        }}
                      >
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          priority={index === 0}
                        />
                      </div>
                    )}

                    {/* Category badge */}
                    <header className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-mono bg-theme-primary/10 text-theme-primary rounded-full border border-theme-primary/20">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-theme-text/60 text-xs">
                        <time
                          dateTime={post.date}
                          className="flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          <span>{post.date}</span>
                        </time>
                        <div
                          className="flex items-center gap-1"
                          aria-label={`Reading time: ${post.readTime}`}
                        >
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </header>

                    {/* Content */}
                    <div className="flex-1 space-y-3 mb-4">
                      <h3 className="text-xl font-semibold tracking-tight text-theme-text transition-colors duration-300 group-hover:text-theme-primary">
                        {post.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-theme-text/70">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read more */}
                    <Button
                      variant="ghost"
                      className="group/btn min-h-[44px] w-full justify-between text-theme-text/70 transition-all duration-300 hover:bg-theme-primary/5 hover:text-theme-primary"
                      asChild
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={`Read article: ${post.title}`}
                      >
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
