"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogPostsProps } from "@/components/types/BlogPostsProps";
import { generateArticleSchema } from "@/lib/seo";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface BlogPostContentProps {
  post: BlogPostsProps;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

  const articleSchema = generateArticleSchema(
    post.title,
    post.excerpt,
    post.date,
    post.date,
    "Mahadi Hasan Fardin",
    `${siteUrl}/og-image.png`
  );

  return (
    <article className="min-h-screen bg-[#0a0e1a] text-slate-100">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

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
            className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300"
          >
            <Link href="/blog" aria-label="Back to blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 font-mono leading-tight">
            {post.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8">
            <time dateTime={post.date} className="flex items-center gap-2">
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

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50 p-8 backdrop-blur-sm">
            <MarkdownRenderer content={post.content} />
          </div>
        </motion.div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-slate-700/50"
        >
          <Button
            variant="outline"
            asChild
            className="border-slate-600 text-slate-300 hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
          >
            <Link href="/blog" aria-label="Back to blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-slate-600 text-slate-300 hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
          >
            <Link href="/" aria-label="Go to homepage">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </article>
  );
}
