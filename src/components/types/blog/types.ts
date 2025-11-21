export interface BlogPostsProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image?: string;
  content: string;
  link?: string;
}

export interface BlogPostContentProps {
  post: BlogPostsProps;
}

export type BlogCardProps = {
  post: BlogPostsProps;
  index: number;
  isInView: boolean;
};

export type BlogListProps = {
  posts: BlogPostsProps[];
  isInView: boolean;
};

export interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export interface MarkdownRendererProps {
  content: string;
}
