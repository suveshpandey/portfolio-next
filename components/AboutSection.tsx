"use client";
import TextReveal from "@/components/TextReveal";

export default function AboutSection() {
  return (
    <section id="about" className="section-wrapper w-full">
      <div className="section-heading">
        <TextReveal as="h2" className="section-title">
          About
        </TextReveal>
      </div>

      <TextReveal
        as="p"
        delay={0.08}
        stagger={0.012}
        className="text-base leading-relaxed text-muted-foreground"
      >
        I&apos;m a software engineer focused on building{" "}
        <span className="font-medium text-foreground">AI-powered products</span>. At{" "}
        <span className="font-medium text-foreground">Euron</span>, I&apos;ve shipped
        production systems end to end — most recently a multi-tenant CRM with a{" "}
        <span className="font-medium text-foreground">
          real-time AI voice-calling engine
        </span>{" "}
        and an autonomous AI sales agent, alongside an AI healthcare platform and a
        RAG study assistant used by thousands of students. I work across the stack
        with <span className="font-medium text-foreground">TypeScript</span>,{" "}
        <span className="font-medium text-foreground">Next.js</span>,{" "}
        <span className="font-medium text-foreground">Node.js</span>,{" "}
        <span className="font-medium text-foreground">FastAPI</span>, and{" "}
        <span className="font-medium text-foreground">AWS</span>, and care
        about clean architecture and shipping things that actually work.
      </TextReveal>
    </section>
  );
}
