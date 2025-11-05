import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FardinMahadi - MERN Stack Developer Portfolio",
    short_name: "FardinMahadi",
    description:
      "Professional portfolio of Mahadi Hasan Fardin showcasing MERN stack development expertise, React projects, Next.js applications, and full-stack web development solutions.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0e1a",
    theme_color: "#06b6d4",
    categories: ["portfolio", "developer", "technology"],
    lang: "en-US",
    dir: "ltr",
    scope: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/x-icon",
        purpose: "maskable",
      },
    ],
  };
}
