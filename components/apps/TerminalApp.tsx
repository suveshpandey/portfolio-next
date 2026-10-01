"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { TrafficLights } from "@/components/os/Window";
import { useOS } from "@/components/os/store";
import type { AppId } from "@/components/os/apps-meta";
import { PROJECTS, CONTACT } from "@/lib";
import { EXPERIENCE, EDUCATION, SKILL_GROUPS } from "@/lib/content";

type Line = { id: number; node: ReactNode };

const HOST = "golden-gate";
const COMMANDS = [
  "help",
  "whoami",
  "about",
  "neofetch",
  "skills",
  "experience",
  "education",
  "projects",
  "open",
  "contact",
  "socials",
  "resume",
  "theme",
  "ls",
  "cat",
  "echo",
  "date",
  "history",
  "clear",
  "exit",
];

const APP_ALIASES: Record<string, AppId> = {
  about: "about",
  me: "about",
  projects: "projects",
  finder: "projects",
  experience: "notes",
  notes: "notes",
  education: "notes",
  skills: "skills",
  launchpad: "skills",
  terminal: "terminal",
  activity: "activity",
  github: "activity",
  contact: "mail",
  mail: "mail",
  resume: "resume",
  "resume.pdf": "resume",
  preview: "resume",
  settings: "settings",
};

const c = {
  orange: "text-[#ff9f5a]",
  green: "text-[#5af78e]",
  blue: "text-[#57c7ff]",
  magenta: "text-[#ff6ac1]",
  yellow: "text-[#f3f99d]",
  dim: "text-white/45",
  bold: "font-bold text-white",
};

function Prompt() {
  return (
    <span className="whitespace-pre">
      <span className={c.green}>suvesh@{HOST}</span> <span className={c.blue}>~</span>{" "}
      <span className="text-white/90">%</span>{" "}
    </span>
  );
}

function Neofetch() {
  const art = String.raw`
      ‾|‾            ‾|‾
       |\            /|
      /| \          / |\
     / |  \________/  | \
  ═════╪══════════════╪═════
  ~~~~ |  ~~~~  ~~~~  | ~~~~
  ~~ ~~~~~ ~~~~ ~~~ ~~~~ ~~`;
  const rows: [string, string][] = [
    ["OS", "PortfolioOS 27 Golden Gate"],
    ["Host", "Next.js 16 · React 19"],
    ["Role", "Associate Software Engineer @ Euron"],
    ["Focus", "AI-powered products"],
    ["Stack", "TypeScript, Next.js, Node.js, FastAPI, AWS"],
    ["Shell", "zsh 5.9"],
    ["Location", "India · Open to remote"],
    ["Contact", CONTACT.email],
  ];
  return (
    <div className="flex flex-col gap-x-6 gap-y-2 py-1 sm:flex-row">
      <pre className={`${c.orange} leading-[1.25]`}>{art}</pre>
      <div className="leading-[1.5]">
        <p>
          <span className={c.green}>suvesh</span>@<span className={c.green}>{HOST}</span>
        </p>
        <p className={c.dim}>──────────────────</p>
        {rows.map(([k, v]) => (
          <p key={k}>
            <span className={c.orange}>{k}</span>: {v}
          </p>
        ))}
        <p className="mt-1.5 flex gap-0">
          {["#1e1e1e", "#ff5c57", "#5af78e", "#f3f99d", "#57c7ff", "#ff6ac1", "#9aedfe", "#f1f1f0"].map((col) => (
            <span key={col} className="inline-block h-3.5 w-6" style={{ background: col }} />
          ))}
        </p>
      </div>
    </div>
  );
}

export default function TerminalApp() {
  const { openApp, closeApp, setThemeMode, activeId } = useOS();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number | null>(null);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const push = (...nodes: ReactNode[]) =>
    setLines((l) => [...l, ...nodes.map((node) => ({ id: ++idRef.current, node }))]);

  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const d = new Date();
    const stamp = d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    push(
      <span className={c.dim}>Last login: {stamp.replace(/,/g, "")} on ttys000</span>,
      <Neofetch />,
      <span>
        Type <span className={c.yellow}>help</span> to see what I can do.
      </span>
    );
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  useEffect(() => {
    if (activeId === "terminal") inputRef.current?.focus({ preventScroll: true });
  }, [activeId]);

  const run = (raw: string) => {
    const cmdline = raw.trim();
    push(
      <span>
        <Prompt />
        {cmdline}
      </span>
    );
    if (!cmdline) return;
    setHistory((h) => [...h, cmdline]);
    const [cmd, ...rest] = cmdline.split(/\s+/);
    const arg = rest.join(" ");
    const lower = cmd.toLowerCase();

    switch (lower) {
      case "help":
        push(
          <div className="grid grid-cols-[110px_1fr] gap-x-3 leading-[1.55]">
            {[
              ["whoami", "who is this?"],
              ["about", "a short bio"],
              ["neofetch", "system info, but it's me"],
              ["skills", "tech I work with"],
              ["experience", "where I've worked"],
              ["education", "where I've studied"],
              ["projects", "things I've built"],
              ["open <x>", "open an app or project (e.g. open inferloop)"],
              ["contact", "how to reach me"],
              ["socials", "GitHub, LinkedIn, X"],
              ["resume", "open my résumé"],
              ["theme <mode>", "light | dark | auto"],
              ["clear", "clear the screen"],
              ["exit", "close Terminal"],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <span className={c.yellow}>{k}</span>
                <span className="text-white/70">{v}</span>
              </div>
            ))}
          </div>
        );
        break;
      case "whoami":
        push("suvesh — software engineer building AI-powered products with solid full-stack engineering.");
        break;
      case "about":
      case "cat":
        if (lower === "cat" && !/readme/i.test(arg)) {
          push(`cat: ${arg || "<file>"}: No such file or directory`);
          break;
        }
        push(
          <p className="max-w-[70ch] text-white/85">
            I&apos;m a software engineer focused on building AI-powered products. At Euron, I&apos;ve shipped production
            systems end to end — most recently a multi-tenant CRM with a real-time AI voice-calling engine and an
            autonomous AI sales agent, alongside an AI healthcare platform and a RAG study assistant used by thousands of
            students. I work across the stack with TypeScript, Next.js, Node.js, FastAPI, and AWS.
          </p>
        );
        break;
      case "neofetch":
        push(<Neofetch />);
        break;
      case "skills":
        push(
          <div className="leading-[1.6]">
            {SKILL_GROUPS.map((g) => (
              <p key={g.title}>
                <span className={c.magenta}>{g.title.padEnd(14, " ")}</span>
                <span className="text-white/85">{g.skills.map((s) => s.name).join(", ")}</span>
              </p>
            ))}
          </div>
        );
        break;
      case "experience":
        push(
          <div className="leading-[1.6]">
            {EXPERIENCE.map((e) => (
              <div key={e.id} className="mb-1">
                <p>
                  <span className={c.bold}>{e.role}</span> <span className={c.dim}>@</span>{" "}
                  <span className={c.orange}>{e.company}</span> <span className={c.dim}>· {e.duration}</span>
                </p>
                <p className="text-white/70">  {e.summary}</p>
              </div>
            ))}
            <p className={c.dim}>→ open experience for the full story</p>
          </div>
        );
        break;
      case "education":
        push(
          <div className="leading-[1.6]">
            {EDUCATION.map((e) => (
              <p key={e.id}>
                <span className={c.bold}>{e.degree}</span> <span className={c.dim}>· {e.duration}</span>
                <br />
                <span className="text-white/70">  {e.school} — {e.detail}</span>
              </p>
            ))}
          </div>
        );
        break;
      case "projects":
      case "ls":
        if (lower === "ls" && !/proj/i.test(arg)) {
          push(
            <p className="flex flex-wrap gap-x-6">
              <span className={c.blue}>Projects/</span>
              <span className={c.blue}>Experience/</span>
              <span>Resume.pdf</span>
              <span>README.md</span>
            </p>
          );
          break;
        }
        push(
          <div className="leading-[1.6]">
            {PROJECTS.map((p, i) => (
              <p key={p.name}>
                <span className={c.dim}>{String(i + 1).padStart(2, " ")}.</span>{" "}
                <button type="button" className={`${c.blue} underline-offset-2 hover:underline`} onClick={() => openApp("projects", { project: p.name })}>
                  {p.name}
                </button>{" "}
                <span className="text-white/60">— {p.title.split(/ [–-] /)[1] ?? p.description.slice(0, 50)}</span>
              </p>
            ))}
            <p className={c.dim}>→ open &lt;name&gt; to view one</p>
          </div>
        );
        break;
      case "open": {
        const key = arg.toLowerCase();
        if (!key) {
          push("usage: open <app | project>");
          break;
        }
        const app = APP_ALIASES[key];
        if (app) {
          openApp(app, key === "education" ? { folder: "education" } : undefined);
          push(<span className={c.dim}>Opening {key}…</span>);
          break;
        }
        const proj = PROJECTS.find((p) => p.name.toLowerCase().replace(/[^a-z]/g, "").startsWith(key.replace(/[^a-z]/g, "")));
        if (proj) {
          openApp("projects", { project: proj.name });
          push(<span className={c.dim}>Opening {proj.name}…</span>);
        } else push(`The file ${arg} does not exist.`);
        break;
      }
      case "contact":
        push(
          <div className="leading-[1.6]">
            <p>
              <span className={c.orange}>email</span>    {CONTACT.email}
            </p>
            <p>
              <span className={c.orange}>phone</span>    +91 {CONTACT.phoneNo}
            </p>
            <p>
              <span className={c.orange}>location</span> India · Open to remote
            </p>
          </div>
        );
        break;
      case "socials":
        push(
          <div className="leading-[1.6]">
            {[
              ["github", CONTACT.github],
              ["linkedin", CONTACT.linkedin],
              ["x", CONTACT.twitter],
            ].map(([k, v]) => (
              <p key={k}>
                <span className={c.orange}>{k.padEnd(9, " ")}</span>
                <a href={v} target="_blank" rel="noopener noreferrer" className={`${c.blue} hover:underline`}>
                  {v}
                </a>
              </p>
            ))}
          </div>
        );
        break;
      case "resume":
        openApp("resume");
        push(<span className={c.dim}>Opening Resume.pdf in Preview…</span>);
        break;
      case "theme":
        if (arg === "light" || arg === "dark" || arg === "auto") {
          setThemeMode(arg);
          push(<span className={c.dim}>Appearance set to {arg}.</span>);
        } else push("usage: theme <light | dark | auto>");
        break;
      case "echo":
        push(arg);
        break;
      case "date":
        push(new Date().toString());
        break;
      case "history":
        push(
          <div>
            {[...history, cmdline].map((h, i) => (
              <p key={i}>
                <span className={c.dim}>{String(i + 1).padStart(4, " ")}</span>  {h}
              </p>
            ))}
          </div>
        );
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        closeApp("terminal");
        break;
      case "sudo":
        push("suvesh is not in the sudoers file. This incident will be reported.");
        break;
      case "rm":
        push(<span className={c.magenta}>nice try.</span>);
        break;
      default:
        push(`zsh: command not found: ${cmd}`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHIndex(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIndex === null) return;
      const i = hIndex + 1;
      if (i >= history.length) {
        setHIndex(null);
        setInput("");
      } else {
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [cmd, ...rest] = input.split(" ");
      if (rest.length === 0) {
        const m = COMMANDS.filter((x) => x.startsWith(cmd.toLowerCase()));
        if (m.length === 1) setInput(m[0] + " ");
        else if (m.length > 1) push(<span className="text-white/70">{m.join("  ")}</span>);
      } else if (cmd === "open") {
        const opts = [...Object.keys(APP_ALIASES), ...PROJECTS.map((p) => p.name.toLowerCase())];
        const m = opts.filter((x) => x.startsWith(rest.join(" ").toLowerCase()));
        if (m.length === 1) setInput(`open ${m[0]}`);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[rgb(24_24_28/0.9)] font-mono text-[12.5px] text-[#e8e8ea]" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <header data-drag className="relative flex h-[38px] shrink-0 items-center justify-center border-b border-black/60 bg-[rgb(44_44_50/0.9)]">
        <TrafficLights id="terminal" className="absolute left-[14px] top-1/2 -translate-y-1/2" />
        <span className="font-sans text-[13px] font-semibold text-white/75">suvesh — -zsh — 80×24</span>
      </header>
      <div className="mac-scroll selectable flex-1 px-3 py-2 [scrollbar-color:rgb(255_255_255/0.3)_transparent]">
        {lines.map((l) => (
          <div key={l.id} className="whitespace-pre-wrap break-words">
            {l.node}
          </div>
        ))}
        <div className="flex whitespace-pre" ref={endRef}>
          <Prompt />
          <span className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal input"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="w-full bg-transparent text-[#e8e8ea] caret-transparent outline-none"
            />
            <span
              aria-hidden
              className="caret pointer-events-none absolute top-[1px] h-[15px] w-[7.5px] bg-white/80"
              style={{ left: `${input.length}ch` }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
