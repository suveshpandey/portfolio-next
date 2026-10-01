"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { SKILL_GROUPS } from "@/lib/content";
import { Squircle } from "@/components/os/AppIcon";

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}

export default function SkillsApp({ args }: { args?: { nonce: number; highlight?: string } }) {
  const [q, setQ] = useState("");
  const [flash, setFlash] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const [seenNonce, setSeenNonce] = useState<number | undefined>(undefined);
  if (args?.nonce !== seenNonce) {
    setSeenNonce(args?.nonce);
    if (args?.highlight) {
      setQ("");
      setFlash(args.highlight);
    }
  }

  useEffect(() => {
    if (!args?.highlight) return;
    const t1 = window.setTimeout(() => {
      scroller.current
        ?.querySelector(`[data-skill="${CSS.escape(args.highlight!)}"]`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 250);
    const t2 = window.setTimeout(() => setFlash(null), 2200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [args?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return SKILL_GROUPS;
    return SKILL_GROUPS.map((g) => ({
      ...g,
      skills: g.skills.filter((s) => s.name.toLowerCase().includes(term) || g.title.toLowerCase().includes(term)),
    })).filter((g) => g.skills.length);
  }, [q]);

  const total = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 justify-center px-4 pb-3">
        <label className="tool-capsule w-full max-w-[260px] gap-2 px-3">
          <Search size={14} className="shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${total} skills`}
            aria-label="Search skills"
            className="selectable w-full bg-transparent text-[13px] text-label outline-none placeholder:text-label-3"
          />
        </label>
      </div>
      <div ref={scroller} className="mac-scroll flex-1 px-5 pb-8">
        {groups.map((g, gi) => (
          <section key={g.title} className="mb-6">
            <h3 className="mb-3 px-1 text-[12px] font-semibold text-label-3">{g.title}</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-y-5">
              {g.skills.map((s, i) => {
                const light = isLight(s.color);
                const lit = flash === s.name;
                return (
                  <motion.div
                    key={s.name}
                    data-skill={s.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: lit ? [1, 1.14, 1, 1.1, 1] : 1 }}
                    transition={{ delay: lit ? 0.3 : gi * 0.05 + i * 0.025, duration: lit ? 1 : 0.3 }}
                    className="group flex flex-col items-center gap-1"
                  >
                    <span
                      className={`block rounded-[22px] transition-transform duration-200 group-hover:scale-105 ${
                        lit ? "bg-[var(--accent-soft)] ring-2 ring-[var(--accent)]" : ""
                      }`}
                    >
                      <Squircle
                        size={74}
                        bg={`linear-gradient(165deg, color-mix(in srgb, ${s.color} 72%, white), ${s.color} 55%, color-mix(in srgb, ${s.color} 78%, black))`}
                      >
                        <span className="absolute inset-0 grid place-items-center">
                          <s.icon size={30} color={light ? "#1a1a1a" : "#fff"} />
                        </span>
                      </Squircle>
                    </span>
                    <span className="max-w-full truncate px-1 text-center text-[12px] text-label">{s.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
        {groups.length === 0 && <p className="pt-16 text-center text-[13px] text-label-3">No skills match “{q}”</p>}
      </div>
    </div>
  );
}
