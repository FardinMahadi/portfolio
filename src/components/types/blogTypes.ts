import type { BlogPostsProps } from "@/components/types/BlogPostsProps";

export type BlogCardProps = {
  post: BlogPostsProps;
  index: number;
  isInView: boolean;
};

export type BlogListProps = {
  posts: BlogPostsProps[];
  isInView: boolean;
};
