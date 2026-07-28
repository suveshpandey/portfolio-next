"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import TextReveal from "@/components/TextReveal";

const education = [
  {
    school: "Mahatma Gandhi Chitrakoot Gramodaya Vishwavidyalaya",
    degree: "B.Tech in Information Technology",
    duration: "2023 – 2027",
    detail: "GPA: 8.2 / 10.0 · Chitrakoot, MP",
  },
  {
    school: "CBSE",
    degree: "Senior Secondary (Class 12)",
    duration: "2022 – 2023",
    detail: "Percentage: 80.2%",
  },
];

export default function Education() {
  return (
    <section id="education" className="section-wrapper w-full">
      <div className="section-heading">
        <TextReveal as="h2" className="section-title">
          Education
        </TextReveal>
      </div>

      <div className="relative flex w-full flex-col gap-7">
        <span aria-hidden className="absolute left-[21px] top-6 bottom-6 w-px bg-border" />
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="relative z-10 flex items-start gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-foreground">
              <GraduationCap size={18} />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <TextReveal
                    as="h3"
                    stagger={0.02}
                    className="text-base font-semibold text-foreground"
                  >
                    {edu.school}
                  </TextReveal>
                  <TextReveal
                    as="p"
                    stagger={0.02}
                    delay={0.05}
                    className="text-sm text-muted-foreground"
                  >
                    {edu.degree}
                  </TextReveal>
                </div>
                <TextReveal
                  as="span"
                  stagger={0.03}
                  className="shrink-0 font-mono text-[13px] text-muted-foreground sm:text-right"
                >
                  {edu.duration}
                </TextReveal>
              </div>
              <TextReveal
                as="p"
                stagger={0.02}
                delay={0.1}
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
              >
                {edu.detail}
              </TextReveal>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
