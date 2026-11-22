"use client";
import SectionHeader from "@/components/SectionHeader";

export default function AboutSection() {
  return (
    <section id="about" className="section-wrapper w-full">
      <SectionHeader title="About" />

      <p className="max-w-[640px] text-[15.5px] leading-[1.9] text-foreground/85">
        I&apos;m a software engineer focused on building{" "}
        <span className="hl hl-blue">AI-powered products</span>. At{" "}
        <span className="hl hl-green">Euron</span>, I&apos;ve shipped production systems end to
        end — most recently a multi-tenant CRM with a{" "}
        <span className="hl hl-orange">real-time AI voice-calling engine</span> and an
        autonomous AI sales agent, alongside an AI healthcare platform and a RAG study
        assistant used by thousands of students.
      </p>
      <p className="mt-4 max-w-[640px] text-[15.5px] leading-[1.9] text-foreground/85">
        Outside work, I&apos;m building <span className="hl hl-pink">Intervio.ai</span>, an AI
        voice interviewer that checks whether candidates can actually defend the claims on their
        resume. I work across the stack with{" "}
        <span className="font-medium text-foreground">TypeScript</span>,{" "}
        <span className="font-medium text-foreground">Next.js</span>,{" "}
        <span className="font-medium text-foreground">Node.js</span>,{" "}
        <span className="font-medium text-foreground">FastAPI</span> and{" "}
        <span className="font-medium text-foreground">AWS</span>, and care about clean
        architecture and shipping things that actually work.
      </p>
    </section>
  );
}
