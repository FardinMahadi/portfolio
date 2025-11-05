import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getBlogPostBySlug } from "@/lib/blogData";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "programming", "web development", "learning"],
    canonical: `${siteUrl}/blog/${slug}`,
    ogImage: `${siteUrl}/og-image.png`,
    ogType: "article",
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}

export async function generateStaticParams() {
  const { getAllBlogPosts } = await import("@/lib/blogData");
  const posts = getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
