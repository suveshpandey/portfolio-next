import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiTailwindcss,
  SiReactquery,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiVercel,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbApi, TbBroadcast, TbDatabaseCog } from "react-icons/tb";

const B = ({ children }: { children: ReactNode }) => (
  <span className="font-medium text-[var(--label)]">{children}</span>
);

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  duration: string;
  logo: string;
  /** One-liner used in list previews and the terminal */
  summary: string;
  points: ReactNode[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "euron-ase",
    company: "Euron",
    role: "Associate Software Engineer",
    duration: "Feb 2026 – Present",
    logo: "/images/euron-logo-v2.png",
    summary: "Euron CRM, a real-time AI voice-calling engine and an autonomous AI sales agent.",
    points: [
      <>
        Building <B>Euron CRM</B> — a multi-tenant B2B CRM (sales pipeline, leads &amp; deals,
        unified inbox, campaigns, payments, calendar) with an in-house{" "}
        <B>real-time AI voice-calling engine</B> and an <B>autonomous AI sales agent</B> at its
        core. Node/TypeScript + Kysely/Postgres backend, React 19 frontend, Python/Pipecat voice
        microservice.
      </>,
      <>
        Built the AI phone agent (Python/FastAPI + Pipecat, Twilio Media Streams over WebSocket)
        that talks to leads live — cascaded Deepgram STT → LLM → Cartesia TTS with Silero VAD,
        tuned to sub-second turn latency — and books meetings mid-call via LLM function-calling,
        writing outcomes straight to the CRM timeline.
      </>,
      <>
        Shipped the autonomous sales agent: spots hot leads, drafts context-grounded per-lead
        outreach, and runs multi-touch cadences that escalate to AI calls — draft-first with an
        approval queue, cooldowns, and reply-pause, keeping a human in control.
      </>,
      <>
        Built omnichannel messaging — WhatsApp (Meta Cloud API) and email (AWS SES) into a
        unified inbox with delivery tracking, a journeys/campaign engine, Razorpay/Stripe payment
        links, and inbound lead-capture webhooks — hardened with strict per-tenant isolation,
        RBAC, and a durable Redis/BullMQ job scheduler.
      </>,
      <>
        Engineered <B>OperyxAI</B>, a US AI healthcare platform with{" "}
        <B>live transcription of voices during meetings and calls</B> that turns conversations
        into SOAP notes and medical codes — built on Azure AI Speech (medical transcription) with
        email via Azure Communication Services.
      </>,
      <>
        Built <B>EuronTracker</B>, a Jira-class internal project-management platform —
        multi-view Kanban, real-time chat, time tracking, and analytics — with a three-tier RBAC
        system and 80+ REST endpoints.
      </>,
    ],
  },
  {
    id: "euron-intern",
    company: "Euron",
    role: "Software Engineering Intern",
    duration: "Nov 2025 – Jan 2026",
    logo: "/images/euron-logo-v2.png",
    summary: "StudyTap, a RAG study assistant serving 2K–4K students.",
    points: [
      <>
        Built <B>StudyTap</B>, a RAG-based AI platform serving 2K–4K students with answers in
        under 25s.
      </>,
      <>
        Developed async FastAPI pipelines on AWS (S3, Kendra, SQS), with PDF text and diagram
        extraction via PyMuPDF and OpenCV.
      </>,
    ],
  },
];

export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  duration: string;
  detail: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    id: "btech",
    school: "Mahatma Gandhi Chitrakoot Gramodaya Vishwavidyalaya",
    degree: "B.Tech in Information Technology",
    duration: "2023 – 2027",
    detail: "GPA: 8.2 / 10.0 · Chitrakoot, MP",
  },
  {
    id: "cbse",
    school: "CBSE",
    degree: "Senior Secondary (Class 12)",
    duration: "2022 – 2023",
    detail: "Percentage: 80.2%",
  },
];

export type Skill = { name: string; icon: IconType; color: string };

/** `color` is the brand tint used for the Launchpad-style icon tile. */
export const SKILL_GROUPS: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "JavaScript", icon: SiJavascript, color: "#E8C500" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#149ECA" },
      { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#0EA5E9" },
      { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#3C873A" },
      { name: "Express.js", icon: SiExpress, color: "#333333" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "REST APIs", icon: TbApi, color: "#5E5CE6" },
      { name: "Server-Sent Events", icon: TbBroadcast, color: "#FF9F0A" },
    ],
  },
  {
    title: "Data",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MySQL", icon: SiMysql, color: "#00758F" },
      { name: "MongoDB", icon: SiMongodb, color: "#13AA52" },
      { name: "Redis", icon: SiRedis, color: "#D82C20" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
      { name: "Kysely", icon: TbDatabaseCog, color: "#8E5CF7" },
    ],
  },
  {
    title: "Cloud & Tools",
    skills: [
      { name: "AWS", icon: FaAws, color: "#232F3E" },
      { name: "Vercel Sandbox", icon: SiVercel, color: "#000000" },
      { name: "Docker", icon: SiDocker, color: "#1D63ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
    ],
  },
];

export const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills.map((s) => s.name));

/** Google Drive file id of the current résumé (see CONTACT.resume). */
export const RESUME_DRIVE_ID = "1zHzOiL370mWoRrCARI_nlnuTjewu4Fn8";
