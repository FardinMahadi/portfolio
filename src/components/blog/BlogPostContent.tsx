"use client";

import type { BlogPostContentProps } from "@/components/types/blog";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { generateArticleSchema } from "@/lib/seo";
import { Calendar, Clock, ArrowLeft, Home } from "lucide-react";
import {
  getBlogImageTransitionName,
  getBlogCardTransitionName,
} from "@/lib/transitions";

import { MarkdownRenderer } from "./MarkdownRenderer";

export function BlogPostContent({ post }: BlogPostContentProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

  const publishedTime = new Date(post.date).toISOString();
  const articleSchema = generateArticleSchema(
    post.title,
    post.excerpt,
    publishedTime,
    publishedTime,
    "Mahadi Hasan Fardin",
    post.image ?? `${siteUrl}/og-image.png`
  );

  return (
    <article
      className="relative min-h-screen bg-(--color-background) text-theme-text"
      style={{
        background:
          "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 92%, transparent), var(--color-background))",
      }}
    >
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Background accents */}
      <div
        className="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-primary) 24%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            asChild
            className="transition-all duration-300 text-theme-text/70 hover:bg-theme-primary/5 hover:text-theme-primary"
          >
            <Link href="/blog" aria-label="Back to blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Category badge */}
          <div className="mb-6">
            <span className="px-3 py-1 text-xs font-mono bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-mono text-4xl font-bold leading-tight text-theme-text md:text-5xl">
            {post.title}
          </h1>

          {/* Meta information */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-theme-text/70">
            <time dateTime={publishedTime} className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{post.date}</span>
            </time>
            <div
              className="flex items-center gap-2"
              aria-label={`Reading time: ${post.readTime}`}
            >
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.header>

        {post.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-10 overflow-hidden rounded-2xl border border-theme-border/60 shadow-lg shadow-theme-primary/10"
            style={{
              viewTransitionName: getBlogCardTransitionName(post.slug),
            }}
          >
            <div
              className="relative h-72 w-full sm:h-56 lg:h-80"
              style={{
                viewTransitionName: getBlogImageTransitionName(post.slug),
              }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
              />
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div
            className="rounded-lg border border-theme-border/60 p-8 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 92%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
            }}
          >
            <MarkdownRenderer content={post.content} />
          </div>
        </motion.div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-theme-border/60 pt-8 sm:flex-row"
        >
          <Button
            variant="outline"
            asChild
            className="border-theme-border/70 text-theme-text/80 transition-all duration-300 hover:border-theme-primary hover:bg-theme-primary/10 hover:text-theme-primary"
          >
            <Link href="/blog" aria-label="Back to blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-theme-border/70 text-theme-text/80 transition-all duration-300 hover:border-theme-primary hover:bg-theme-primary/10 hover:text-theme-primary"
          >
            <Link href="/" aria-label="Go to homepage">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </article>
  );
}
