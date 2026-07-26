"use client";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  logo: string;
  /** Bullets always visible; the rest collapse behind "Show more" */
  visiblePoints: number;
  points: ReactNode[];
};

const experiences: ExperienceEntry[] = [
  {
    company: "Euron",
    role: "Associate Software Engineer",
    duration: "Feb 2026 – Present",
    logo: "/images/euron-logo-v2.png",
    visiblePoints: 2,
    points: [
      <>
        Building <span className="font-medium text-foreground">Euron CRM</span> — a
        multi-tenant B2B CRM (sales pipeline, leads &amp; deals, unified inbox,
        campaigns, payments, calendar) with an in-house{" "}
        <span className="font-medium text-foreground">
          real-time AI voice-calling engine
        </span>{" "}
        and an{" "}
        <span className="font-medium text-foreground">autonomous AI sales agent</span>{" "}
        at its core. Node/TypeScript + Kysely/Postgres backend, React 19 frontend,
        Python/Pipecat voice microservice.
      </>,
      <>
        Built the AI phone agent (Python/FastAPI + Pipecat, Twilio Media Streams over
        WebSocket) that talks to leads live — cascaded Deepgram STT → LLM → Cartesia
        TTS with Silero VAD, tuned to sub-second turn latency — and books meetings
        mid-call via LLM function-calling, writing outcomes straight to the CRM
        timeline.
      </>,
      <>
        Shipped the autonomous sales agent: spots hot leads, drafts context-grounded
        per-lead outreach, and runs multi-touch cadences that escalate to AI calls —
        draft-first with an approval queue, cooldowns, and reply-pause, keeping a
        human in control.
      </>,
      <>
        Built omnichannel messaging — WhatsApp (Meta Cloud API) and email (AWS SES)
        into a unified inbox with delivery tracking, a journeys/campaign engine,
        Razorpay/Stripe payment links, and inbound lead-capture webhooks — hardened
        with strict per-tenant isolation, RBAC, and a durable Redis/BullMQ job
        scheduler.
      </>,
      <>
        Engineered <span className="font-medium text-foreground">OperyxAI</span>, a US
        AI healthcare platform with{" "}
        <span className="font-medium text-foreground">
          live transcription of voices during meetings and calls
        </span>{" "}
        that turns conversations into SOAP notes and medical codes — built on Azure AI
        Speech (medical transcription) with email via Azure Communication Services.
      </>,
      <>
        Built <span className="font-medium text-foreground">EuronTracker</span>, a
        Jira-class internal project-management platform — multi-view Kanban, real-time
        chat, time tracking, and analytics — with a three-tier RBAC system and 80+
        REST endpoints.
      </>,
    ],
  },
  {
    company: "Euron",
    role: "Software Engineering Intern",
    duration: "Nov 2025 – Jan 2026",
    logo: "/images/euron-logo-v2.png",
    visiblePoints: 1,
    points: [
      <>
        Built <span className="font-medium text-foreground">StudyTap</span>, a
        RAG-based AI platform serving 2K–4K students with answers in under 25s.
      </>,
      <>
        Developed async FastAPI pipelines on AWS (S3, Kendra, SQS), with PDF text and
        diagram extraction via PyMuPDF and OpenCV.
      </>,
    ],
  },
];

function PointsList({ points }: { points: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-4 marker:text-muted-foreground/50">
      {points.map((point, i) => (
        <li key={i} className="text-sm leading-relaxed text-muted-foreground">
          {point}
        </li>
      ))}
    </ul>
  );
}

function ExperienceItem({ exp, idx }: { exp: ExperienceEntry; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = exp.points.slice(0, exp.visiblePoints);
  const hidden = exp.points.slice(exp.visiblePoints);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      className="relative z-10 flex items-start gap-4"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
        <Image
          src={exp.logo}
          alt={`${exp.company} logo`}
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground">{exp.company}</h3>
            <p className="text-sm text-muted-foreground">{exp.role}</p>
          </div>
          <span className="shrink-0 text-sm text-muted-foreground sm:text-right">
            {exp.duration}
          </span>
        </div>

        <div className="mt-2">
          <PointsList points={visible} />

          <AnimatePresence initial={false}>
            {expanded && hidden.length > 0 && (
              <motion.div
                key="more-points"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="pt-1.5">
                  <PointsList points={hidden} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {hidden.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {expanded ? "Show less" : "Show more"}
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-wrapper w-full">
      <div className="section-heading">
        <h2 className="section-title">Work Experience</h2>
      </div>

      <div className="relative flex w-full flex-col gap-7">
        <span
          aria-hidden
          className="absolute left-[21px] top-6 bottom-6 w-px bg-border"
        />
        {experiences.map((exp, idx) => (
          <ExperienceItem key={idx} exp={exp} idx={idx} />
        ))}
      </div>
    </section>
  );
}
