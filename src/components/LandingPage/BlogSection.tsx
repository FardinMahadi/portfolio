import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { BlogPostsProps } from "../types/BlogPostsProps";
import Link from "next/link";

const blogPosts: BlogPostsProps[] = [
  {
    title: "Building Scalable APIs with Node.js and Express",
    excerpt:
      "Best practices for designing RESTful APIs that scale, including middleware patterns, error handling, and security considerations.",
    date: "Oct 15, 2024",
    readTime: "8 min read",
    category: "Backend",
    slug: "building-scalable-apis-nodejs-express",
  },
  {
    title: "State Management in React: Context vs Redux",
    excerpt:
      "A comprehensive comparison of state management solutions, when to use each, and performance optimization techniques.",
    date: "Sep 28, 2024",
    readTime: "12 min read",
    category: "React",
    slug: "state-management-react-context-redux",
  },
  {
    title: "TypeScript Tips for Better Code Quality",
    excerpt:
      "Advanced TypeScript patterns and utilities that improve type safety, code maintainability, and developer experience.",
    date: "Sep 10, 2024",
    readTime: "6 min read",
    category: "TypeScript",
    slug: "typescript-tips-better-code-quality",
  },
  {
    title: "Optimizing Next.js for Production",
    excerpt:
      "Performance optimization strategies including image optimization, code splitting, and server-side rendering best practices.",
    date: "Aug 22, 2024",
    readTime: "10 min read",
    category: "Next.js",
    slug: "optimizing-nextjs-production",
  },
];

export function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="blog"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#111827] to-[#0a0e1a] relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-blue-400 font-mono">{"</"}</span>
            <h2 className="text-blue-400">Blog & Thoughts</h2>
            <span className="text-blue-400 font-mono">{">"}</span>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Sharing insights on web development, best practices, and lessons
            learned from building production applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={post.slug ? `/blog/${post.slug}` : "#"} className="block h-full" aria-label={`Read article: ${post.title}`}>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col cursor-pointer">
                {/* Category badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-mono bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-slate-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3 mb-4">
                  <h3 className="text-slate-100 group-hover:text-blue-400 transition-colors duration-300 font-mono">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read more */}
                <Button
                  variant="ghost"
                  className="w-full justify-between text-slate-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300 group/btn min-h-[44px]"
                  asChild
                >
                  <Link href={post.slug ? `/blog/${post.slug}` : "#"} aria-label={`Read article: ${post.title}`}>
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
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
            className="border-slate-600 text-slate-300 hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
