import blogPostsData from "@/data/blogPosts.json";
import { BlogPostsProps } from "@/components/types/BlogPostsProps";

export const blogPosts: BlogPostsProps[] = blogPostsData as BlogPostsProps[];

// Helper function to get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPostsProps | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get all blog posts
export function getAllBlogPosts(): BlogPostsProps[] {
  return blogPosts;
}
