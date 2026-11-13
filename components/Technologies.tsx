"use client";
import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";

const skillGroups = [
  { label: "Languages", skills: ["C++", "JavaScript", "TypeScript", "Python"] },
  { label: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "TanStack Query"] },
  {
    label: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Server-Sent Events",
      "BullMQ",
    ],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    label: "AI Engineering",
    skills: [
      "LLM function calling",
      "RAG",
      "Multi-agent pipelines",
      "Deepgram STT",
      "Cartesia TTS",
    ],
  },
  {
    label: "Cloud & Tools",
    skills: [
      "AWS (S3, EC2, SQS, SES)",
      "Vercel Sandbox",
      "Docker",
      "Git",
    ],
  },
];

export default function Technologies() {
  return (
    <section id="technologies" className="section-wrapper w-full">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden />
          Working stack
        </p>
        <TextReveal as="h2" className="section-title">
          Tools I reach for.
        </TextReveal>
      </div>

      <div className="flex flex-col">
        {skillGroups.map((group, idx) => (
          <div
            key={group.label}
            className="flex flex-col gap-3 border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0 sm:flex-row sm:gap-6"
          >
            <h3 className="mono flex shrink-0 items-baseline gap-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:w-48 sm:pt-1.5">
              <span aria-hidden className="text-accent">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill, i) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.025, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="skill-pill"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
