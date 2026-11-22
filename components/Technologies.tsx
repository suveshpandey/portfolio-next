"use client";
import { motion } from "motion/react";
import SectionHeader from "@/components/SectionHeader";

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
    skills: ["AWS (S3, EC2, SQS, SES)", "Vercel Sandbox", "Docker", "Git"],
  },
];

export default function Technologies() {
  return (
    <section id="technologies" className="section-wrapper w-full">
      <SectionHeader title="Skills" />

      {/* A label column on the left, the pills on the right, a hairline between rows */}
      <div className="divide-y divide-border">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[168px_1fr] sm:gap-6 sm:py-6 sm:first:pt-0 sm:last:pb-0"
          >
            <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-foreground sm:pt-1.5">
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
