"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 24 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="section-wrapper w-full"
    >
      <div className="section-heading">
        <h2 className="section-title">About</h2>
      </div>

      <p className="text-base leading-relaxed text-muted-foreground">
        I&apos;m a software engineer focused on building{" "}
        <span className="font-medium text-foreground">AI-powered products</span>. At{" "}
        <span className="font-medium text-foreground">Euron</span>, I&apos;ve shipped
        production systems end to end — an AI healthcare platform that converts live
        conversations into clinical notes, a{" "}
        <span className="font-medium text-foreground">RAG</span> study assistant serving
        thousands of students, and a Jira-class internal project-management platform. I
        work across the stack with{" "}
        <span className="font-medium text-foreground">Next.js</span>,{" "}
        <span className="font-medium text-foreground">TypeScript</span>,{" "}
        <span className="font-medium text-foreground">FastAPI</span>,{" "}
        <span className="font-medium text-foreground">Node.js</span>,{" "}
        <span className="font-medium text-foreground">PostgreSQL</span>, and{" "}
        <span className="font-medium text-foreground">AWS</span>, designing event-driven
        backends and real-time systems — and I care about clean architecture, performance,
        and shipping things that actually work.
      </p>
    </motion.section>
  );
}
