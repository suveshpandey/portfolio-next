"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    company: "Euron",
    role: "Associate Software Engineer",
    duration: "Feb 2026 – Present",
    logo: "/images/euron-logo.png",
    description:
      "Building AI-powered platforms — a US healthcare system that turns live conversations into SOAP notes and medical codes, plus EuronTracker, a full internal project-management tool on an event-driven AWS backend.",
  },
  {
    company: "Euron",
    role: "Software Engineering Intern",
    duration: "Nov 2025 – Jan 2026",
    logo: "/images/euron-logo.png",
    description:
      "Built StudyTap, a RAG-based AI study assistant serving 2K–4K students, with async FastAPI pipelines and AWS (S3, Kendra, SQS) document ingestion.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-wrapper w-full">
      <div className="section-heading">
        <h2 className="section-title">Work Experience</h2>
      </div>

      <div className="relative flex w-full flex-col gap-7">
        <span
          aria-hidden
          className="absolute left-[21px] top-6 bottom-6 w-px bg-border"
        />
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="relative z-10 flex items-start gap-4"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.role}</p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground sm:text-right">
                  {exp.duration}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
