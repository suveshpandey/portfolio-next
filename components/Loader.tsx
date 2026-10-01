"use client";

import { useEffect, useState } from "react";

const NAME = "SUVESH PANDEY";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@*+=<>/";
// Fixed first frame so the server and client markup match before the loop starts.
const INITIAL = "X7#K2@ 9$QZ&4";

const START_DELAY = 250; // pure scramble before the first character locks (ms)
const PER_CHAR = 60; // time between consecutive characters locking (ms)
const SWAP_EVERY = 40; // how often unlocked characters change (ms)
const HOLD = 280; // pause on the finished name (ms)
const EXIT = 550; // slide-away duration (ms)

function scramble(locked: number) {
  return NAME.split("")
    .map((ch, i) =>
      i < locked || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    )
    .join("");
}

export default function Loader() {
  const [frame, setFrame] = useState({ text: INITIAL, locked: 0, progress: 0 });
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 0 : START_DELAY + NAME.length * PER_CHAR;
    const hold = reduce ? 0 : HOLD;
    const start = performance.now();
    let lastSwap = 0;
    let rafId = 0;
    let exitTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= total) {
        setFrame({ text: NAME, locked: NAME.length, progress: 1 });
        exitTimer = setTimeout(() => setPhase("exit"), hold);
        doneTimer = setTimeout(() => setPhase("done"), hold + EXIT);
        return;
      }
      if (now - lastSwap >= SWAP_EVERY) {
        lastSwap = now;
        const locked = Math.max(0, Math.floor((elapsed - START_DELAY) / PER_CHAR));
        setFrame({ text: scramble(locked), locked, progress: Math.max(0, elapsed / total) });
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      style={{ transition: `transform ${EXIT}ms cubic-bezier(0.76, 0, 0.24, 1)` }}
      className={`site-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background ${
        phase === "exit" ? "-translate-y-full" : ""
      }`}
    >
      <p className="whitespace-pre font-mono text-3xl tracking-[0.2em] sm:text-5xl">
        {frame.text.split("").map((ch, i) => (
          <span
            key={i}
            className={i < frame.locked ? "text-foreground" : "text-muted-foreground/60"}
          >
            {ch}
          </span>
        ))}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <span className="block h-px w-40 overflow-hidden bg-border">
          <span
            className="block h-full origin-left bg-foreground transition-transform duration-75 ease-linear"
            style={{ transform: `scaleX(${frame.progress})` }}
          />
        </span>
        <span className="w-10 text-right font-mono text-sm tabular-nums text-muted-foreground">
          {Math.round(frame.progress * 100)}%
        </span>
      </div>
    </div>
  );
}
