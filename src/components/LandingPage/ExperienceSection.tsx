import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import { ExperienceProps } from "../types/ExperienceProps";

const experiences: ExperienceProps[] = [
  {
    company: "DevGenit",
    position: "Frontend Engineer",
    type: "Contract",
    location: "Remote",
    startDate: "July 2025",
    current: true,
    description:
      "Working as a frontend engineer on a project basis, developing modern web applications using React, Next.js, and TypeScript. Successfully built and deployed the official website for the 1st International Conference on Environmental Sustainability and Green Earth: ACS Bangladesh Youth Summit (ICESGE-2025). Collaborating with cross-functional teams to deliver high-quality, scalable solutions.",
    responsibilities: [
      "Develop responsive and interactive user interfaces using React and Next.js",
      "Built and deployed the conference website for ACS Bangladesh Youth Summit (ICESGE-2025)",
      "Implement TypeScript for type-safe code and improved developer experience",
      "Collaborate with designers and backend developers to implement features",
      "Optimize application performance and ensure accessibility standards",
      "Write clean, maintainable code following best practices",
      "Participate in code reviews and team discussions",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Git",
    ],
    companyUrl: "https://www.devgenit.com/",
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Generate structured data for experience/work history
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e1a] to-[#111827] relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

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
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-theme-secondary" aria-hidden="true" />
            <h2 className="text-theme-secondary text-3xl font-bold">
              Work Experience
            </h2>
          </div>
          <p className="text-slate-400 max-w-2xl text-lg">
            Professional journey and work experience in web development
          </p>
        </motion.header>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent hidden md:block" />

              {/* Content card */}
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 p-6 md:pl-12 group">
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-3 h-3 rounded-full bg-blue-400 border-2 border-slate-900 hidden md:block" />

                <header className="mb-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 mb-1">
                        {experience.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-slate-300">
                        {experience.companyUrl ? (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-blue-400 transition-colors group"
                            aria-label={`Visit ${experience.company} website`}
                          >
                            <span className="font-semibold">
                              {experience.company}
                            </span>
                            <ExternalLink
                              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <span className="font-semibold">
                            {experience.company}
                          </span>
                        )}
                        {experience.type && (
                          <>
                            <span className="text-slate-500" aria-hidden="true">
                              •
                            </span>
                            <span className="text-sm bg-slate-700/50 px-2 py-1 rounded border border-slate-600/50">
                              {experience.type}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <time dateTime="2025-07">{experience.startDate}</time>
                      {experience.endDate ? (
                        <>
                          <span aria-hidden="true"> - </span>
                          <time dateTime={experience.endDate}>
                            {experience.endDate}
                          </time>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true"> - </span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">
                            {experience.current ? "Present" : "Ongoing"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </header>

                <div className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    {experience.description}
                  </p>

                  {experience.responsibilities.length > 0 && (
                    <div>
                      <h4 className="text-slate-200 font-semibold mb-3 text-sm uppercase tracking-wide">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2" role="list">
                        {experience.responsibilities.map(
                          (responsibility, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-slate-300"
                              role="listitem"
                            >
                              <span
                                className="text-blue-400 mt-1.5 shrink-0"
                                aria-hidden="true"
                              >
                                ▹
                              </span>
                              <span className="leading-relaxed">
                                {responsibility}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {experience.technologies.length > 0 && (
                    <div>
                      <h4 className="text-slate-200 font-semibold mb-3 text-sm uppercase tracking-wide">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2" role="list">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded text-sm text-slate-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
                            role="listitem"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
