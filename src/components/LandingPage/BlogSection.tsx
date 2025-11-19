"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { generateArticleSchema } from "@/lib/seo";
import { blogPosts } from "@/lib/blogData";
import { GlassmorphismPanel } from "../effects/GlassmorphismPanel";
import {
  getBlogImageTransitionName,
  getBlogCardTransitionName,
} from "@/lib/transitions";

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
      className="relative overflow-hidden bg-(--color-background) py-20 px-4 text-theme-text sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 92%, transparent), var(--color-background))",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-secondary) 30%, transparent), transparent 70%)",
        }}
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
          <div className="mb-6 flex items-center gap-3 text-theme-accent">
            <span className="font-mono" aria-hidden="true">
              {"</"}
            </span>
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <span className="font-mono" aria-hidden="true">
              {">"}
            </span>
          </div>
          <p className="max-w-2xl text-lg text-theme-text/75">
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
                  style={{
                    viewTransitionName: post.slug
                      ? getBlogCardTransitionName(post.slug)
                      : undefined,
                  }}
                >
                  <div className="h-full flex flex-col cursor-pointer">
                    {/* Category badge */}
                    <header className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-mono bg-theme-primary/10 text-theme-primary rounded-full border border-theme-primary/20">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-theme-text/60">
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
                    >
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
            className="border-theme-border/70 text-theme-text/80 transition-all duration-300 hover:border-theme-primary hover:bg-theme-primary/10 hover:text-theme-primary"
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
