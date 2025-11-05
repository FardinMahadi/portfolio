import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "./analytics";
import { TargetCursor } from "@/components/effects/TargetCursor";
import { ColorPaletteProvider } from "@/contexts/ColorPaletteContext";
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
    default: "Mahadi Hasan Fardin - Full Stack Developer Portfolio",
    template: "%s | FardinMahadi",
  },
  description:
    "Portfolio of Mahadi Hasan Fardin, a skilled MERN Stack Developer specializing in React, Next.js, Node.js, MongoDB, and TypeScript. Discover innovative web applications, full-stack projects, and modern web development solutions. Available for hire for React development, Node.js backend, and full-stack projects.",
  keywords: [
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "MongoDB Developer",
    "Node.js Developer",
    "Express.js Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "React Portfolio",
    "Next.js Portfolio",
    "MERN Portfolio",
    "Web Development",
    "Full Stack Projects",
    "React Projects",
    "Node.js Projects",
    "MongoDB Projects",
    "TypeScript Projects",
    "Tailwind CSS",
    "Framer Motion",
    "Vercel",
    "Portfolio Website",
    "Developer Portfolio",
    "Hire React Developer",
    "Hire MERN Developer",
    "Mahadi Hasan Fardin",
    "FardinMahadi",
  ],
  authors: [{ name: "Mahadi Hasan Fardin", url: siteUrl }],
  creator: "Mahadi Hasan Fardin",
  publisher: "Mahadi Hasan Fardin",
  applicationName: "FardinMahadi Portfolio",
  category: "Portfolio",
  classification: "Developer Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Mahadi Hasan Fardin - Full Stack Developer Portfolio",
    description:
      "Professional portfolio showcasing MERN stack development expertise. Specializing in React, Next.js, Node.js, MongoDB, and TypeScript. Explore innovative web applications and modern development solutions.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FardinMahadi - MERN Stack Developer Portfolio",
        type: "image/png",
      },
    ],
    countryName: "Bangladesh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahadi Hasan Fardin - Full Stack Developer Portfolio",
    description:
      "Professional MERN stack developer portfolio featuring React, Next.js, Node.js, MongoDB, and TypeScript projects. Available for hire.",
    creator: "@FardinMahadi",
    site: "@FardinMahadi",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        alt: "FardinMahadi Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
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
    givenName: "Mahadi Hasan",
    familyName: "Fardin",
    url: siteUrl,
    jobTitle: "MERN Stack Developer",
    description:
      "Full-stack developer passionate about creating seamless web experiences with MERN stack and modern frameworks. Specializing in React, Next.js, Node.js, MongoDB, Express, and TypeScript.",
    knowsAbout: [
      "React",
      "React.js",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express",
      "Express.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Full Stack Development",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "RESTful APIs",
      "GraphQL",
      "Framer Motion",
      "Vercel",
    ],
    sameAs: [
      "https://github.com/FardinMahadi",
      "https://www.linkedin.com/in/mahadi-hasan-fardin",
    ],
    email: "mailto:mahadihasanfardin2015@gmail.com",
    alumniOf: [
      {
        "@type": "University",
        name: "Comilla University",
        description: "Currently pursuing studies",
      },
      {
        "@type": "College",
        name: "Dhaka College",
        description: "Completed Higher Secondary Certificate (HSC)",
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "DevGenit",
      description: "Software Agency",
      jobTitle: "Frontend Engineer",
      employmentType: "Contract",
      workLocation: {
        "@type": "Place",
        name: "Remote",
      },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Engineer",
      occupationLocation: {
        "@type": "Organization",
        name: "DevGenit",
      },
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Frontend Development",
        "UI/UX Development",
      ],
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Higher Secondary Certificate",
        recognizedBy: {
          "@type": "Organization",
          name: "Dhaka College",
        },
      },
    ],
    knowsLanguage: ["English", "Bengali"],
    nationality: {
      "@type": "Country",
      name: "Bangladesh",
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description:
      "Professional portfolio website showcasing MERN stack development projects and expertise.",
    author: {
      "@type": "Person",
      name: "Mahadi Hasan Fardin",
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/#projects`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}/#about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projects",
        item: `${siteUrl}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Blog",
        item: `${siteUrl}/#blog`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: `${siteUrl}/#contact`,
      },
    ],
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DevGenit",
    description:
      "Software Agency specializing in web development and frontend engineering",
    url: "https://devgenit.com",
    logo: `${siteUrl}/logo.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Bengali"],
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <link rel="canonical" href={siteUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ColorPaletteProvider>
          <TargetCursor targetSelector="a, button, [role='button'], [class*='cursor-pointer']" />
          {children}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </ColorPaletteProvider>
      </body>
    </html>
  );
}
