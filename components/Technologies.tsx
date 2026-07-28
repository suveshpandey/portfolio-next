"use client";
import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";

const skills = [
  "C++",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "FastAPI",
  "Tailwind CSS",
  "TanStack Query",
  "Prisma",
  "Kysely",
  "REST APIs",
  "Server-Sent Events",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Vercel Sandbox",
  "Docker",
  "Git",
];

export default function Technologies() {
  return (
    <section id="technologies" className="section-wrapper w-full">
      <div className="section-heading">
        <TextReveal as="h2" className="section-title">
          Skills
        </TextReveal>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="skill-pill"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
