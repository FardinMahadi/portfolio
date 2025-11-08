import { Metadata } from "next";
import { BlogIndexPage } from "@/components/blog/BlogIndexPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Navigation } from "@/components/LandingPage/Navigation";
import { Footer } from "@/components/LandingPage/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog Articles",
  description:
    "Read articles about web development, programming tips, career insights, and learning resources. Learn from practical examples and personal experiences in full-stack development.",
  keywords: [
    "blog",
    "programming",
    "web development",
    "learning",
    "tutorials",
    "articles",
  ],
  canonical: `${siteUrl}/blog`,
});

export default function BlogPage() {
  return (
    <div className="relative flex min-h-screen flex-col gap-16">
      <Navigation />
      <main className="flex-1">
        <BlogIndexPage />
      </main>
      <Footer />
    </div>
  );
}
