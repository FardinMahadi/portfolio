"use client";

import type { BlogCardProps } from "@/components/types/blogTypes";

import Link from "next/link";
import { motion } from "framer-motion";
import { generateArticleSchema } from "@/lib/seo";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getBlogCardTransitionName } from "@/lib/transitions";

import { Button } from "../../ui/button";
import { GlassmorphismPanel } from "../../effects/GlassmorphismPanel";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export function BlogCard({ post, index, isInView }: BlogCardProps) {
  const articleSchema = generateArticleSchema(
    post.title,
    post.excerpt,
    post.date,
    post.date,
    "Mahadi Hasan Fardin",
    `${siteUrl}/og-image.png`
  );

  return (
    <>
      <script
        key={`article-${post.title}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
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
            hover
            style={{
              viewTransitionName: post.slug
                ? getBlogCardTransitionName(post.slug)
                : undefined,
            }}
          >
            <div className="h-full flex flex-col cursor-pointer">
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

              <div className="flex-1 space-y-3 mb-4">
                <h3 className="text-xl font-semibold tracking-tight text-theme-text transition-colors duration-300 group-hover:text-theme-primary">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-theme-text/70">
                  {post.excerpt}
                </p>
              </div>

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
    </>
  );
}
