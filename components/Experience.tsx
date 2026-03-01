"use client";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, Code2 } from "lucide-react";

const experiences = [
  {
    title: "Associate Software Engineer",
    company: "Euron",
    duration: "February 2026 – Present",
    isCurrent: true,
    project: null,
    description:
      "Full-time role building scalable web applications and cloud solutions. Working on production systems and collaborating with cross-functional teams.",
  },
  {
    title: "Web Development Intern",
    company: "Euron",
    duration: "November 2025 – February 2026",
    isCurrent: false,
    project: "RAG-based Chatbot for University Students",
    description:
      "Worked on a RAG (Retrieval-Augmented Generation) based chatbot that provides comprehensive answers to university students, including both text responses and diagram visualizations.",
  },
];

export default function Experience() {
  return (
    <motion.div id="experience" className="section-wrapper w-full pt-24 sm:pt-32 pb-24">
      <div className="w-full">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="section-heading"
        >
          <h2 className="section-title">Experience</h2>
          <motion.div
            whileInView={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left center" }}
            className="section-divider"
          />
          <p className="section-subtitle">
            Professional journey and hands-on experience in real-world projects.
          </p>
        </motion.div>

        {/* Journey: one row per experience — circle on left (in front), then card */}
        <div className="w-full max-w-4xl mx-auto relative">
          {/* Vertical line through circle centers */}
          <div
            className="absolute top-[2.75rem] bottom-[2.75rem] left-[1.375rem] sm:left-6 w-px bg-accent/30"
            aria-hidden
          />

          <div className="relative flex flex-col gap-0">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex items-stretch gap-0 min-h-[100px]"
              >
                {/* Circle in front (left) of this experience */}
                <div className="relative z-10 flex shrink-0 items-center justify-center w-11 sm:w-12 pt-6 pb-6 first:pt-2">
                  <div
                    className={`flex items-center justify-center rounded-full border-2 shrink-0 transition-colors ${
                      exp.isCurrent
                        ? "w-9 h-9 sm:w-10 sm:h-10 bg-accent border-accent"
                        : "w-7 h-7 sm:w-8 sm:h-8 bg-background border-border hover:border-accent"
                    }`}
                  >
                    {exp.isCurrent ? (
                      <Briefcase className="text-accent-foreground w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem]" />
                    ) : (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                    )}
                  </div>
                </div>

                {/* Card to the right of the circle */}
                <div className="flex-1 min-w-0 pl-4 sm:pl-5 pt-4 sm:pt-5 pb-8 sm:pb-10 first:pt-2">
                  <div className="section-card rounded-lg p-5 sm:p-6 h-full">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="font-semibold text-base sm:text-lg text-foreground tracking-tight">
                        {exp.title}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/15 text-accent border border-accent/30">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="text-accent w-4 h-4 shrink-0" />
                        <span className="text-foreground font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="text-muted-foreground w-4 h-4 shrink-0" />
                        <span className="text-muted-foreground">{exp.duration}</span>
                      </div>
                    </div>

                    {exp.project ? (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Code2 className="text-accent w-4 h-4 shrink-0" />
                          <h5 className="text-sm font-semibold text-foreground">
                            {exp.project}
                          </h5>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                          {exp.description}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
