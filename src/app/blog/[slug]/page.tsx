import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blogData";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
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
      title: "Article Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  const defaultOgImage = `${siteUrl}/og-image.png`;
  const publishedTime = new Date(post.date).toISOString();
  const metadata = generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "programming", "web development", "learning"],
    canonical: `${siteUrl}/blog/${slug}`,
    ogImage: post.image ?? defaultOgImage,
    ogType: "article",
  });

  // Override title to bypass template (remove "| FardinMahadi" suffix)
  return {
    ...metadata,
    title: {
      absolute: post.title,
    },
    openGraph: {
      ...metadata.openGraph,
      title: post.title,
      type: "article",
      publishedTime,
      modifiedTime: publishedTime,
      authors: ["Mahadi Hasan Fardin"],
      tags: [post.category, "Programming", "Web Development"],
      images: [
        {
          url: post.image ?? defaultOgImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      ...metadata.twitter,
      title: post.title,
      images: [post.image ?? defaultOgImage],
    },
  };
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
