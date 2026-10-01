"use client";

import Image from "next/image";
import { useOS } from "@/components/os/store";

const SPECS: [string, string][] = [
  ["Role", "Associate Software Engineer"],
  ["Company", "Euron"],
  ["Focus", "AI-powered products"],
  ["Stack", "TypeScript · Next.js · Node.js · FastAPI · AWS"],
  ["Education", "B.Tech IT, 2027 · GPA 8.2"],
  ["Location", "India · Open to remote"],
];

export default function AboutApp() {
  const { openApp } = useOS();
  return (
    <div className="flex h-full flex-col">
      <div data-drag className="h-[52px] shrink-0" />
      <div className="mac-scroll selectable flex-1 px-8 pb-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-[124px] w-[124px] overflow-hidden rounded-full shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] ring-[0.5px] ring-black/20">
            <Image src="/images/profilePic.jpg" alt="Suvesh Pandey" fill sizes="248px" className="object-cover" priority />
          </div>
          <h1 className="mt-5 text-[26px] font-bold tracking-[-0.02em] text-label">Suvesh Pandey</h1>
          <p className="mt-0.5 text-[13px] text-label-2">Software Engineer · AI &amp; Full-Stack</p>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[rgb(52_199_89/0.14)] px-3 py-1 text-[12px] font-medium text-[#1f9d45] dark:text-[#4cd964]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34c759] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34c759]" />
            </span>
            Available for full-time &amp; remote roles
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-[88px_1fr] gap-x-3 gap-y-1.5 text-[12.5px]">
          {SPECS.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-right font-medium text-label">{k}</dt>
              <dd className="text-label-2">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-[12.5px] leading-[1.6] text-label-2">
          I&apos;m a software engineer focused on building <b className="font-medium text-label">AI-powered products</b>.
          At <b className="font-medium text-label">Euron</b>, I&apos;ve shipped production systems end to end — most
          recently a multi-tenant CRM with a <b className="font-medium text-label">real-time AI voice-calling engine</b> and
          an autonomous AI sales agent, alongside an AI healthcare platform and a RAG study assistant used by thousands of
          students. I care about clean architecture and shipping things that actually work.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <button type="button" className="btn" onClick={() => openApp("notes", { folder: "experience" })}>
            More Info…
          </button>
          <button type="button" className="btn" onClick={() => openApp("resume")}>
            Resume
          </button>
          <button type="button" className="btn btn-primary" onClick={() => openApp("mail")}>
            Get in touch
          </button>
        </div>

        <p className="mt-6 text-center text-[10.5px] text-label-3">™ and © 2026 Suvesh Pandey. All rights reserved.</p>
      </div>
    </div>
  );
}
