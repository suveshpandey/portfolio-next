"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Search, Moon, ExternalLink, Code2, GraduationCap } from "lucide-react";
import AppIcon from "./AppIcon";
import { APPS, DOCK_ORDER } from "./apps-meta";
import { useOS } from "./store";
import { PROJECTS, CONTACT } from "@/lib";
import { EXPERIENCE, EDUCATION, SKILL_GROUPS } from "@/lib/content";

type Result = { key: string; group: string; title: string; subtitle?: string; icon: ReactNode; haystack: string; run: () => void };

export default function Spotlight() {
  const { spotlightOpen, setSpotlightOpen, openApp, setThemeMode, isDark } = useOS();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [wasOpen, setWasOpen] = useState(spotlightOpen);
  if (spotlightOpen !== wasOpen) {
    setWasOpen(spotlightOpen);
    if (spotlightOpen) {
      setQ("");
      setSel(0);
    }
  }
  useEffect(() => {
    if (!spotlightOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [spotlightOpen]);

  const all = useMemo<Result[]>(() => {
    const ext = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...DOCK_ORDER.map((id) => ({
        key: `app-${id}`,
        group: "Applications",
        title: APPS[id].label,
        subtitle: APPS[id].name !== APPS[id].label ? APPS[id].name : undefined,
        icon: <AppIcon id={id} size={32} />,
        haystack: `${APPS[id].label} ${APPS[id].name} ${APPS[id].keywords}`,
        run: () => openApp(id),
      })),
      ...PROJECTS.map((p) => ({
        key: `proj-${p.name}`,
        group: "Projects",
        title: p.name,
        subtitle: p.title.split(/ [–-] /)[1] ?? p.description.slice(0, 60),
        icon: (
          <span className="relative block h-[26px] w-[26px] overflow-hidden rounded-md shadow-sm ring-[0.5px] ring-black/15">
            <Image src={p.image} alt="" fill sizes="52px" className="object-cover" />
          </span>
        ),
        haystack: `${p.title} ${p.technologies.join(" ")} ${p.tags.join(" ")}`,
        run: () => openApp("projects", { project: p.name }),
      })),
      ...EXPERIENCE.map((e) => ({
        key: `exp-${e.id}`,
        group: "Experience",
        title: `${e.role} · ${e.company}`,
        subtitle: e.duration,
        icon: <AppIcon id="notes" size={32} />,
        haystack: `${e.role} ${e.company} ${e.summary} experience work`,
        run: () => openApp("notes", { folder: "experience", note: e.id }),
      })),
      ...EDUCATION.map((e) => ({
        key: `edu-${e.id}`,
        group: "Education",
        title: e.degree,
        subtitle: e.school,
        icon: (
          <span className="grid h-[26px] w-[26px] place-items-center rounded-md bg-[#ffd84d] text-black/70">
            <GraduationCap size={15} />
          </span>
        ),
        haystack: `${e.degree} ${e.school} education college school`,
        run: () => openApp("notes", { folder: "education", note: e.id }),
      })),
      ...SKILL_GROUPS.flatMap((g) =>
        g.skills.map((s) => ({
          key: `skill-${s.name}`,
          group: "Skills",
          title: s.name,
          subtitle: g.title,
          icon: (
            <span className="grid h-[26px] w-[26px] place-items-center rounded-md text-white" style={{ background: s.color }}>
              <s.icon size={14} />
            </span>
          ),
          haystack: `${s.name} ${g.title} skill`,
          run: () => openApp("skills", { highlight: s.name }),
        }))
      ),
      {
        key: "act-dark",
        group: "Actions",
        title: isDark ? "Turn Dark Mode Off" : "Turn Dark Mode On",
        icon: (
          <span className="grid h-[26px] w-[26px] place-items-center rounded-md bg-[#5e5ce6] text-white">
            <Moon size={14} />
          </span>
        ),
        haystack: "dark mode light theme appearance toggle",
        run: () => setThemeMode(isDark ? "light" : "dark"),
      },
      ...[
        { t: "GitHub", h: CONTACT.github, i: "github" as const },
        { t: "LinkedIn", h: CONTACT.linkedin, i: "linkedin" as const },
        { t: "X (Twitter)", h: CONTACT.twitter, i: "x" as const },
      ].map((l) => ({
        key: `link-${l.t}`,
        group: "Links",
        title: l.t,
        subtitle: l.h.replace(/^https?:\/\//, ""),
        icon: <AppIcon id={l.i} size={32} />,
        haystack: `${l.t} social link profile`,
        run: ext(l.h),
      })),
    ];
  }, [openApp, setThemeMode, isDark]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return all.filter((r) => r.group === "Applications").slice(0, 6);
    const words = term.split(/\s+/);
    return all.filter((r) => words.every((w) => r.haystack.toLowerCase().includes(w) || r.title.toLowerCase().includes(w))).slice(0, 14);
  }, [q, all]);

  const run = (r?: Result) => {
    if (!r) return;
    r.run();
    setSpotlightOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(results.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter") {
      run(results[sel]);
    } else if (e.key === "Escape") {
      setSpotlightOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {spotlightOpen && (
        <motion.div
          className="fixed inset-0 z-[9800] flex justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onPointerDown={(e) => e.target === e.currentTarget && setSpotlightOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Spotlight Search"
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 520, damping: 34 }}
            className="glass-strong glass-rim h-fit w-full max-w-[640px] overflow-hidden rounded-[28px]"
          >
            <div className="flex h-[58px] items-center gap-3 px-5">
              <Search size={22} className="shrink-0 text-label-2" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={onKey}
                placeholder="Spotlight Search"
                aria-label="Spotlight Search"
                className="selectable w-full bg-transparent text-[22px] font-light text-label outline-none placeholder:text-label-3"
              />
              <kbd className="hidden shrink-0 rounded-md px-1.5 py-0.5 text-[11px] text-label-3 ring-[0.5px] ring-[var(--separator)] sm:block">
                esc
              </kbd>
            </div>
            {results.length > 0 && (
              <div className="mac-scroll max-h-[46vh] border-t-[0.5px] border-[var(--separator)] p-2">
                {results.map((r, i) => {
                  const showGroup = r.group !== lastGroup;
                  lastGroup = r.group;
                  return (
                    <div key={r.key}>
                      {showGroup && (
                        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold text-label-3">
                          {!q.trim() && r.group === "Applications" ? "Suggestions" : r.group}
                        </p>
                      )}
                      <button
                        type="button"
                        onMouseMove={() => setSel(i)}
                        onClick={() => run(r)}
                        className={`flex w-full items-center gap-3 rounded-[12px] px-3 py-1.5 text-left ${
                          i === sel ? "bg-[var(--accent)] text-white" : "text-label"
                        }`}
                      >
                        <span className="shrink-0">{r.icon}</span>
                        <span className="min-w-0 flex-1 truncate text-[14px]">{r.title}</span>
                        {r.subtitle && (
                          <span className={`max-w-[45%] truncate text-[12px] ${i === sel ? "text-white/75" : "text-label-3"}`}>
                            {r.subtitle}
                          </span>
                        )}
                        {r.group === "Links" && <ExternalLink size={13} className="shrink-0 opacity-60" />}
                        {r.group === "Projects" && i === sel && <Code2 size={13} className="shrink-0 opacity-70" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {q.trim() && results.length === 0 && (
              <p className="border-t-[0.5px] border-[var(--separator)] px-5 py-6 text-center text-[13px] text-label-3">
                No results for “{q}”
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
