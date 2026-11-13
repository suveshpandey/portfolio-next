"use client";
import TextReveal from "@/components/TextReveal";
import { CONTACT } from "@/lib";

export default function AboutSection() {
  return (
    <section id="about" className="section-wrapper w-full">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden />
          About
        </p>
        <TextReveal as="h2" className="section-title">
          Building AI products that hold up in production.
        </TextReveal>
      </div>

      <TextReveal
        as="p"
        delay={0.08}
        stagger={0.012}
        className="max-w-[640px] text-[15px] leading-[1.9] text-muted-foreground"
      >
        I&apos;m a software engineer focused on building{" "}
        <span className="font-medium text-foreground">AI-powered products</span>. At{" "}
        <span className="font-medium text-foreground">Euron</span>, I&apos;ve shipped
        production systems end to end — most recently a multi-tenant CRM with a{" "}
        <span className="font-medium text-foreground">
          real-time AI voice-calling engine
        </span>{" "}
        and an autonomous AI sales agent, alongside an AI healthcare platform and a
        RAG study assistant used by thousands of students. Outside work, I&apos;m
        building <span className="font-medium text-foreground">Intervio.ai</span>, an
        AI voice interviewer that checks whether candidates can actually defend the
        claims on their resume. I work across the stack
        with <span className="font-medium text-foreground">TypeScript</span>,{" "}
        <span className="font-medium text-foreground">Next.js</span>,{" "}
        <span className="font-medium text-foreground">Node.js</span>,{" "}
        <span className="font-medium text-foreground">FastAPI</span>, and{" "}
        <span className="font-medium text-foreground">AWS</span>, and care
        about clean architecture and shipping things that actually work.
      </TextReveal>

      <a
        href={CONTACT.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline mt-7 inline-flex text-[13px] text-foreground"
      >
        Connect on LinkedIn ↗
      </a>
    </section>
  );
}
