"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  Folder,
  FileText,
  Briefcase,
  Globe,
  Clock,
  ArrowUpRight,
  X,
  PanelLeft,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS, CONTACT, type ProjectTag } from "@/lib";
import { useOS } from "@/components/os/store";
import { useWidth } from "@/components/os/useWidth";

type Project = (typeof PROJECTS)[number];

export const TAG_COLORS: Record<ProjectTag, string> = {
  AI: "#af52de",
  "Real-time": "#ff9500",
  "Full-stack": "#007aff",
};

const subtitleOf = (p: Project) => p.title.split(/ [–-] /).slice(1).join(" – ") || p.description.split(".")[0];

function TagDots({ tags }: { tags: ProjectTag[] }) {
  return (
    <span className="inline-flex -space-x-1">
      {tags.map((t) => (
        <span
          key={t}
          className="h-[9px] w-[9px] rounded-full ring-[1.5px] ring-[var(--window-solid)]"
          style={{ background: TAG_COLORS[t] }}
        />
      ))}
    </span>
  );
}

function ProjectDetail({ p }: { p: Project }) {
  return (
    <motion.div
      key={p.name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="selectable mx-auto max-w-[760px] px-5 pb-10 pt-2 sm:px-8"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px] bg-black/5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.5)] ring-[0.5px] ring-black/15">
        <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(max-width: 800px) 100vw, 760px" className="object-cover object-top" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-[24px] font-bold tracking-[-0.02em] text-label">{p.name}</h1>
          <p className="mt-0.5 text-[13.5px] text-label-2">{subtitleOf(p)}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="chip gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: TAG_COLORS[t] }} />
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Globe size={14} /> Open Website
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn">
              <FaGithub size={14} /> Source
            </a>
          )}
        </div>
      </div>

      <p className="mt-5 text-[13.5px] leading-[1.65] text-label-2">{p.description}</p>

      <h2 className="mb-2 mt-7 px-1 text-[12px] font-semibold text-label-3">Highlights</h2>
      <div className="group-box">
        {p.highlights.map((h, i) => (
          <div key={i} className="group-row flex gap-3 px-4 py-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <p className="text-[13px] leading-[1.6] text-label-2">
              {h.label && <span className="font-semibold text-label">{h.label}. </span>}
              {h.text}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-2 mt-7 px-1 text-[12px] font-semibold text-label-3">Built with</h2>
      <div className="flex flex-wrap gap-1.5">
        {p.technologies.map((t) => (
          <span key={t} className="chip font-mono !text-[11px]">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function FinderApp({ args }: { args?: { nonce: number; project?: string } }) {
  const { openApp, isMobile } = useOS();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [tag, setTag] = useState<ProjectTag | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [hist, setHist] = useState<{ stack: (string | null)[]; i: number }>({ stack: [null], i: 0 });
  const [sidebar, setSidebar] = useState(true);

  const current = hist.stack[hist.i];
  const project = PROJECTS.find((p) => p.name === current);

  const go = (name: string | null) =>
    setHist((h) => (h.stack[h.i] === name ? h : { stack: [...h.stack.slice(0, h.i + 1), name], i: h.i + 1 }));

  // React to launch args (e.g. Spotlight → a project) by adjusting state during render
  const [seenNonce, setSeenNonce] = useState<number | undefined>(undefined);
  if (args?.nonce !== seenNonce) {
    setSeenNonce(args?.nonce);
    if (args?.project) {
      go(args.project);
      setSelected(args.project);
    }
  }

  const [ref, width] = useWidth<HTMLDivElement>();
  const wide = width >= 640;
  const [seenWide, setSeenWide] = useState(wide);
  if (wide !== seenWide) {
    setSeenWide(wide);
    setSidebar(wide);
  }

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!q || `${p.title} ${p.technologies.join(" ")} ${p.description}`.toLowerCase().includes(q))
    );
  }, [tag, query]);

  const open = (name: string) => {
    if (!wide) setSidebar(false);
    setSelected(name);
    go(name);
  };
  const coarse = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const title = project ? project.name : tag ? tag : "Projects";

  return (
    <div ref={ref} className="relative flex h-full">
      {/* Sidebar */}
      {sidebar && (
        <aside
          className={`mac-sidebar m-2 mr-0 flex w-[196px] shrink-0 flex-col overflow-hidden ${
            wide ? "" : "absolute inset-y-0 left-0 z-20 !bg-[var(--window-solid)] shadow-2xl"
          }`}
        >
          <div data-drag className="h-[46px] shrink-0" />
          <div className="mac-scroll flex-1 px-2.5 pb-3">
            <p className="side-heading">Favorites</p>
            <button type="button" className="side-item" data-selected={!project && !tag} onClick={() => { setTag(null); go(null); }}>
              <Folder size={15} className="text-[var(--accent)]" /> Projects
            </button>
            <button type="button" className="side-item" onClick={() => openApp("notes", { folder: "experience" })}>
              <Briefcase size={15} className="text-[var(--accent)]" /> Experience
            </button>
            <button type="button" className="side-item" onClick={() => openApp("resume")}>
              <FileText size={15} className="text-[var(--accent)]" /> Resume.pdf
            </button>
            <button type="button" className="side-item" onClick={() => openApp("activity")}>
              <Clock size={15} className="text-[var(--accent)]" /> Activity
            </button>

            <p className="side-heading mt-2">Locations</p>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="side-item">
              <FaGithub size={14} className="text-label-2" /> GitHub
              <ArrowUpRight size={12} className="ml-auto text-label-3" />
            </a>

            <p className="side-heading mt-2">Tags</p>
            {(Object.keys(TAG_COLORS) as ProjectTag[]).map((t) => (
              <button
                key={t}
                type="button"
                className="side-item"
                data-selected={tag === t && !project}
                onClick={() => {
                  setTag(tag === t ? null : t);
                  go(null);
                }}
              >
                <span className="ml-[3px] mr-[2px] h-[10px] w-[10px] rounded-full" style={{ background: TAG_COLORS[t] }} />
                {t}
              </button>
            ))}
          </div>
        </aside>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div
          data-drag
          className={`flex h-[52px] shrink-0 items-center gap-2 pr-3 ${sidebar && wide ? "pl-3" : "pl-[88px]"}`}
        >
          <button type="button" aria-label="Toggle sidebar" className="tool-btn" onClick={() => setSidebar((v) => !v)}>
            <PanelLeft size={16} />
          </button>
          <div className="tool-capsule">
            <button
              type="button"
              aria-label="Back"
              className="tool-btn"
              disabled={hist.i === 0}
              onClick={() => setHist((h) => ({ ...h, i: Math.max(0, h.i - 1) }))}
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              aria-label="Forward"
              className="tool-btn"
              disabled={hist.i >= hist.stack.length - 1}
              onClick={() => setHist((h) => ({ ...h, i: Math.min(h.stack.length - 1, h.i + 1) }))}
            >
              <ChevronRight size={17} />
            </button>
          </div>
          <h2 className="min-w-0 truncate pl-1 text-[15px] font-bold text-label">{title}</h2>
          <div className="flex-1" />
          {!project && (
            <div className={`tool-capsule ${width >= 480 ? "inline-flex" : "hidden"}`}>
              <button type="button" aria-label="Icon view" className="tool-btn" data-on={view === "grid"} onClick={() => setView("grid")}>
                <LayoutGrid size={15} />
              </button>
              <button type="button" aria-label="List view" className="tool-btn" data-on={view === "list"} onClick={() => setView("list")}>
                <List size={16} />
              </button>
            </div>
          )}
          <label className={`tool-capsule w-[190px] gap-1.5 px-3 ${width >= 720 ? "inline-flex" : "hidden"}`}>
            <Search size={14} className="shrink-0" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                go(null);
              }}
              placeholder="Search"
              aria-label="Search projects"
              className="selectable w-full bg-transparent text-[13px] text-label outline-none placeholder:text-label-3"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={13} />
              </button>
            )}
          </label>
        </div>

        <div className="mac-scroll relative flex-1" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <AnimatePresence mode="wait" initial={false}>
            {project ? (
              <ProjectDetail key={project.name} p={project} />
            ) : view === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-3 gap-y-5 p-4 sm:grid-cols-[repeat(auto-fill,minmax(176px,1fr))]"
                onClick={(e) => e.target === e.currentTarget && setSelected(null)}
              >
                {items.map((p) => {
                  const sel = selected === p.name;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => (coarse() ? open(p.name) : setSelected(p.name))}
                      onDoubleClick={() => open(p.name)}
                      onKeyDown={(e) => e.key === "Enter" && open(p.name)}
                      className="group flex flex-col items-center gap-2 text-center outline-none"
                    >
                      <span className={`w-full rounded-[12px] p-1.5 transition-colors ${sel ? "bg-[var(--pressed)]" : ""}`}>
                        <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-black/5 shadow-[0_6px_16px_-6px_rgb(0_0_0/0.45)] ring-[0.5px] ring-black/15 transition-transform duration-200 group-hover:-translate-y-0.5">
                          <Image src={p.image} alt="" fill sizes="220px" className="object-cover object-top" />
                        </span>
                      </span>
                      <span className="flex max-w-full items-center gap-1.5">
                        <span
                          className={`truncate rounded-[5px] px-1.5 py-[1px] text-[12.5px] ${
                            sel ? "bg-[var(--accent)] text-white" : "text-label"
                          }`}
                        >
                          {p.name}
                        </span>
                        <TagDots tags={p.tags} />
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="px-3 pb-3">
                <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.4fr)] gap-3 border-b-[0.5px] border-[var(--separator)] px-3 py-1.5 text-[11.5px] font-medium text-label-3">
                  <span>Name</span>
                  <span>Tags</span>
                  <span>Stack</span>
                </div>
                {items.map((p, i) => {
                  const sel = selected === p.name;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => (coarse() ? open(p.name) : setSelected(p.name))}
                      onDoubleClick={() => open(p.name)}
                      className={`grid w-full grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.4fr)] items-center gap-3 rounded-[7px] px-3 py-[5px] text-left text-[13px] ${
                        sel ? "bg-[var(--accent)] text-white" : i % 2 ? "bg-[var(--hover)] text-label" : "text-label"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="relative h-5 w-7 shrink-0 overflow-hidden rounded-[3px] ring-[0.5px] ring-black/20">
                          <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <span className="truncate">{p.name}</span>
                      </span>
                      <span className={`truncate ${sel ? "text-white/80" : "text-label-2"}`}>{p.tags.join(", ")}</span>
                      <span className={`truncate ${sel ? "text-white/80" : "text-label-2"}`}>{p.technologies.slice(0, 4).join(", ")}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
          {!project && items.length === 0 && (
            <p className="absolute inset-0 grid place-items-center text-[13px] text-label-3">No items match “{query}”</p>
          )}
        </div>

        <div className="flex h-[26px] shrink-0 items-center justify-center border-t-[0.5px] border-[var(--separator)] text-[11px] text-label-3">
          {project
            ? `${project.technologies.length} technologies · ${project.highlights.length} highlights`
            : `${items.length} item${items.length === 1 ? "" : "s"}${selected && !isMobile ? " · 1 selected — double-click to open" : ""}`}
        </div>
      </div>
    </div>
  );
}
