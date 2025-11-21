"use client";

import type { BlogListProps } from "@/components/types/blog";

import { BlogCard } from "./BlogCard";

export function BlogList({ posts, isInView }: BlogListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post, index) => (
        <BlogCard
          key={post.title}
          post={post}
          index={index}
          isInView={isInView}
        />
      ))}
    </div>
  );
}
