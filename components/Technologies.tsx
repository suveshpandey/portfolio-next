"use client";
import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";

const skillGroups = [
  { label: "Languages", skills: ["C++", "JavaScript", "TypeScript"] },
  { label: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "TanStack Query"] },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Server-Sent Events"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Kysely"],
  },
  { label: "Cloud & Tools", skills: ["AWS", "Vercel Sandbox", "Docker", "Git"] },
];

export default function Technologies() {
  return (
    <section id="technologies" className="section-wrapper w-full">
      <div className="section-heading">
        <TextReveal as="h2" className="section-title">
          Skills
        </TextReveal>
      </div>

      <div className="section-card divide-y divide-dashed divide-border">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4 sm:px-5"
          >
            <h3 className="flex shrink-0 items-baseline gap-3 text-sm uppercase tracking-wider text-muted-foreground sm:w-44">
              <span aria-hidden className="text-muted-foreground/50">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {group.label}
            </h3>
            <p className="pl-7 text-base leading-snug text-foreground sm:pl-0">
              {group.skills.map((skill, i) => (
                <span key={skill}>
                  {i > 0 && <span className="text-muted-foreground/40"> / </span>}
                  <span className="whitespace-nowrap">{skill}</span>
                </span>
              ))}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
