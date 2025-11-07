"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { generateArticleSchema } from "@/lib/seo";
import { blogPosts } from "@/lib/blogData";
import { GlassmorphismPanel } from "../effects/GlassmorphismPanel";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Limit to 4 most recent blog posts
  const displayedPosts = blogPosts.slice(0, 4);

  return (
    <section
      id="blog"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e1a] to-[#111827] relative overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: "var(--color-secondary)" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {displayedPosts.map((post, index) => {
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
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-theme-secondary font-mono" aria-hidden="true">
              {"</"}
            </span>
            <h2 className="text-theme-secondary text-3xl font-bold">
              Latest Articles
            </h2>
            <span className="text-theme-secondary font-mono" aria-hidden="true">
              {">"}
            </span>
          </div>
          <p className="text-slate-400 max-w-2xl text-lg">
            Discover articles about web development, programming tips, career
            insights, and practical lessons from real-world projects.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-6">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                href={post.slug ? `/blog/${post.slug}` : "#"}
                className="block h-full"
                aria-label={`Read article: ${post.title}`}
              >
                <GlassmorphismPanel
                  className="h-full flex flex-col p-6"
                  hover={true}
                >
                  <div className="h-full flex flex-col cursor-pointer">
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
                      <h3 className="text-slate-100 group-hover:text-theme-primary transition-colors duration-300 font-semibold text-xl tracking-tight">
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
                        href={post.slug ? `/blog/${post.slug}` : "#"}
                        aria-label={`Read article: ${post.title}`}
                      >
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </GlassmorphismPanel>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-theme-primary/10 hover:border-theme-primary hover:text-theme-primary transition-all duration-300"
            asChild
          >
            <Link href="/blog" aria-label="View all blog articles">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
