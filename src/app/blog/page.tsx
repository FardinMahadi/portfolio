import { Metadata } from "next";
import { BlogIndexPage } from "@/components/blog/BlogIndexPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Navigation } from "@/components/LandingPage/Navigation";
import { Footer } from "@/components/LandingPage/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog",
  description:
    "Read articles about web development, programming tips, and insights on making coding fun and accessible. Learn from practical examples and personal experiences.",
  keywords: ["blog", "programming", "web development", "learning", "tutorials"],
  canonical: `${siteUrl}/blog`,
});

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Navigation />
      <BlogIndexPage />
      <Footer />
    </div>
  );
}
