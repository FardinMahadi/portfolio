import { Metadata } from "next";
import { Footer } from "@/components/LandingPage/Footer";
import { BlogIndexPage } from "@/components/blog/BlogIndexPage";
import { Navigation } from "@/components/LandingPage/Navigation";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/effects/PageTransition";

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
    <PageTransition variant="fade">
      <div className="relative flex min-h-screen flex-col bg-(--color-background)">
        <Navigation />
        <main className="flex-1 relative pt-16" style={{ zIndex: 1 }}>
          <BlogIndexPage />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
