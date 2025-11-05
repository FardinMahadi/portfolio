import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fardinmahadi.vercel.app";
const siteName = "FardinMahadi - MERN Stack Developer Portfolio";

export const metadata: Metadata = {
  title: {
    default: "FardinMahadi - MERN Stack Developer",
    template: "%s | FardinMahadi",
  },
  description:
    "A futuristic, VS Code-inspired developer portfolio for showcasing MERN stack projects. Built with React, TypeScript, and Tailwind CSS, featuring smooth animations and a sleek dark-mode interface.",
  keywords: [
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "MongoDB",
    "Node.js",
    "Express",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Mahadi Hasan Fardin", url: siteUrl }],
  creator: "Mahadi Hasan Fardin",
  publisher: "Mahadi Hasan Fardin",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "FardinMahadi - MERN Stack Developer",
    description:
      "A futuristic, VS Code-inspired developer portfolio for showcasing MERN stack projects.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FardinMahadi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FardinMahadi - MERN Stack Developer",
    description:
      "A futuristic, VS Code-inspired developer portfolio for showcasing MERN stack projects.",
    creator: "@FardinMahadi",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mahadi Hasan Fardin",
    alternateName: "FardinMahadi",
    url: siteUrl,
    jobTitle: "MERN Stack Developer",
    description:
      "Full-stack developer passionate about creating seamless web experiences with MERN stack and modern frameworks.",
    knowsAbout: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    sameAs: [
      "https://github.com/FardinMahadi",
      "https://www.linkedin.com/in/mahadi-hasan-fardin",
    ],
    email: "mailto:mahadihasanfardin2015@gmail.com",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
