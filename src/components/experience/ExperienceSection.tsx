"use client";

import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { experiences } from "./experienceData";
import { ExperienceCard } from "./ExperienceCard";

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const workHistorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: experiences.map((exp, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "JobPosting",
        title: exp.position,
        employmentType: exp.type,
        hiringOrganization: {
          "@type": "Organization",
          name: exp.company,
          url: exp.companyUrl,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: exp.location,
          },
        },
        datePosted: exp.startDate,
        description: exp.description,
        skills: exp.technologies.join(", "),
      },
    })),
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden py-20 px-4 text-theme-text sm:px-6 lg:px-8"
    >
      {/* Background accents */}
      <div
        className="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-primary) 25%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(workHistorySchema),
          }}
        />
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3 text-theme-primary">
            <Briefcase className="h-6 w-6" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-theme-accent">
              Work Experience
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-theme-text/75">
            A timeline of my professional journey, showcasing my growth and
            contributions in web development and software engineering.
          </p>
        </motion.header>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${index}`}
              experience={experience}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
