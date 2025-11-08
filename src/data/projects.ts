import type { ProjectsProps } from "@/components/types/ProjectsProps";

export const projects: ProjectsProps[] = [
  {
    title: "Lern Beta Platform",
    description:
      "Personal project: an AI-powered learning platform landing page focused on delivering quality education access for all.",
    role: "Product Designer & Engineer",
    highlights: [
      "Crafted messaging and visuals to tell the story behind Lern's AI assistant.",
      "Architected responsive layout and CTA flow to drive sign-ups on any device.",
      "Deployed to Vercel with performance budgets to keep the experience fast.",
    ],
    tags: ["Next.js", "Tailwind CSS", "Vercel", "AI"],
    image: "/Projects/Lern/image.png",
    width: 1600,
    height: 900,
    gallery: [
      {
        src: "/Projects/Lern/image.png",
        width: 1600,
        height: 900,
        alt: "Lern Beta landing page hero showing AI assistant messaging",
      },
    ],
    liveUrl: "https://lern-beta.vercel.app/",
    codeUrl:
      "https://github.com/FardinMahadi/Lern-AI-Powered-Study-Assistant-Uni-project-showcase",
  },
  {
    title: "ACS Youth Summit Website",
    description:
      "Built at DevGenit as the core frontend engineer, delivering the official ACS Bangladesh Youth Summit conference platform with schedules, submissions, and partner showcases.",
    role: "Lead Frontend Engineer · DevGenit",
    highlights: [
      "Coordinated stakeholder workshops to map sponsor, speaker, and attendee journeys.",
      "Implemented abstract submission workflows and timeline modules with CMS hooks.",
      "Optimized imagery, accessibility, and SEO to support hybrid conference audiences.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/Projects/ACS/image.png",
    width: 1600,
    height: 900,
    gallery: [
      {
        src: "/Projects/ACS/image.png",
        width: 1600,
        height: 900,
        alt: "ACS Youth Summit homepage above the fold",
      },
      {
        src: "/Projects/ACS/image2.png",
        width: 1600,
        height: 900,
        alt: "ACS Youth Summit sessions overview",
      },
      {
        src: "/Projects/ACS/image3.png",
        width: 1600,
        height: 900,
        alt: "ACS Youth Summit sponsors and partners section",
      },
      {
        src: "/Projects/ACS/image4.png",
        width: 1600,
        height: 900,
        alt: "ACS Youth Summit conference registration CTA",
      },
    ],
    liveUrl: "https://acsduyouthsummit2025.org/",
  },
];
