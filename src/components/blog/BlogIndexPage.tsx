"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateArticleSchema } from "@/lib/seo";
import { blogPosts } from "@/lib/blogData";
import { CategoryFilter } from "./CategoryFilter";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export function BlogIndexPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter blog posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="blog-index"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e1a] to-[#111827] relative overflow-hidden min-h-screen"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-theme-primary font-mono" aria-hidden="true">
              {"</"}
            </span>
            <h1 className="text-theme-primary text-4xl font-bold">
              Blog Articles
            </h1>
            <span className="text-theme-primary font-mono" aria-hidden="true">
              {">"}
            </span>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore articles about web development, programming tips, career
            insights, and learning resources. Written to help developers grow
            and succeed in their journey.
          </p>
        </motion.header>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
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
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">
              No articles found in this category.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full"
                  aria-label={`Read article: ${post.title}`}
                >
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50 p-6 backdrop-blur-sm hover:border-theme-primary/50 transition-all duration-300 h-full flex flex-col cursor-pointer">
                    {/* Category badge */}
                    <header className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-mono bg-theme-primary/10 text-theme-primary rounded-full border border-theme-primary/20">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-slate-500 text-xs">
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
                      <h3 className="text-slate-100 group-hover:text-theme-primary transition-colors duration-300 font-mono text-xl">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read more */}
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-slate-400 hover:text-theme-primary hover:bg-theme-primary/5 transition-all duration-300 group/btn min-h-[44px]"
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
