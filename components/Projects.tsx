"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PROJECTS, type ProjectHighlight, type ProjectRepo } from "@/lib";
import { getLenis } from "@/lib/lenis";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ChevronDown, Globe } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import { FaGithub } from "react-icons/fa";

type Project = (typeof PROJECTS)[number];

/** Bullets always visible on a card; the rest collapse behind "Show more" */
const VISIBLE_HIGHLIGHTS = 3;
/** How many cards peek out behind the front one */
const PEEK = 2;
/** Scroll distance (in viewport heights) spent on each card tearing off */
const SCROLL_PER_CARD = 95;
/** Quiet time after scrolling stops before the stack settles onto a card (ms) */
const SNAP_IDLE = 130;
/** How far past a card (0–1) you must scroll for it to commit to the next one */
const SNAP_COMMIT = 0.15;

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * A region that scrolls on its own when its content is taller than the space it gets.
 * Lenis hijacks the wheel for the whole page, so while this region overflows it opts out with
 * `data-lenis-prevent` and scrolls natively. When it does not overflow, the wheel still scrolls the page.
 * Below `lg` it chains to the page once it hits an end, so touch swipes can still move the stack along.
 */
function ScrollArea({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const check = () => setScrollable(inner.offsetHeight > outer.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      data-lenis-prevent={scrollable ? "" : undefined}
      className={`overflow-y-auto overscroll-auto lg:overscroll-contain ${className}`}
    >
      <div ref={innerRef} className={innerClassName}>
        {children}
      </div>
    </div>
  );
}

function HighlightList({ highlights }: { highlights: ProjectHighlight[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2.5 pl-4 marker:text-accent/60">
      {highlights.map((highlight, i) => (
        <li key={i} className="text-[13.5px] leading-[1.7] text-muted-foreground">
          {highlight.label ? (
            <>
              <span className="font-medium text-foreground">{highlight.label}</span> —{" "}
              {highlight.text}
            </>
          ) : (
            highlight.text
          )}
        </li>
      ))}
    </ul>
  );
}

/** One project's content. `fill` stretches it to the fixed card height used by the stack. */
function ProjectBody({
  project,
  index,
  total,
  fill,
}: {
  project: Project;
  index: number;
  total: number;
  fill: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = project.highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const hidden = project.highlights.slice(VISIBLE_HIGHLIGHTS);
  const repos: ProjectRepo[] =
    project.repos ?? (project.github ? [{ label: "Source", href: project.github }] : []);

  const grid = (
    <div
      className={`grid gap-6 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10 ${
        fill ? "lg:h-full lg:grid-rows-[minmax(0,1fr)]" : ""
      }`}
    >
      {/* Left: identity, summary and stack scroll together; links stay pinned below */}
      <div className="flex min-h-0 flex-col">
        <ScrollArea className="min-h-0 flex-1 pr-1">
          <div className="mb-4 flex items-center gap-3 text-[12px] text-muted-foreground">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {project.status && (
              <span className="inline-flex items-center gap-2 text-[#45643a]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {project.status}
              </span>
            )}
          </div>

          <h3 className="text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[26px]">
            {project.title}
          </h3>
          <p className="mt-3 text-[14px] leading-[1.75] text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </ScrollArea>

        <div className="flex flex-wrap gap-2.5 pt-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark !gap-2 !px-4 !py-2.5"
            >
              <Globe size={14} />
              Website
            </a>
          )}
          {repos.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light !gap-2 !px-4 !py-2.5"
            >
              <FaGithub size={14} />
              {repo.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right: highlights, scrolling on their own once expanded */}
      <div className="flex min-h-0 flex-col border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <p className="mb-4 text-[12px] text-muted-foreground">Highlights</p>
        <ScrollArea className="min-h-0 flex-1 pr-1">
          <HighlightList highlights={visible} />

          <AnimatePresence initial={false}>
            {expanded && hidden.length > 0 && (
              <motion.div
                key="more-highlights"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="pt-2.5">
                  <HighlightList highlights={hidden} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {hidden.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-accent transition-colors hover:text-[var(--accent-green-strong)]"
            >
              {expanded ? "Show less" : `Show ${hidden.length} more`}
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </ScrollArea>
      </div>
    </div>
  );

  // In the stack the card has a fixed height: the whole body scrolls on small screens,
  // and on desktop the two halves scroll independently instead.
  return fill ? (
    <ScrollArea className="h-full lg:overflow-y-visible" innerClassName="lg:h-full">
      {grid}
    </ScrollArea>
  ) : (
    grid
  );
}

/**
 * One card in the stack. `f` is the scroll position measured in cards:
 * f = 0 shows card 0 on top, f = 1 shows card 1 on top, and so on.
 *  - Cards still waiting (i > f) sit behind: smaller, pushed down, fading out past PEEK.
 *  - The card being torn off (f - 1 < i < f) pivots at its top edge, tilts and lifts away.
 * Every movement is eased, so cards accelerate and settle instead of tracking the wheel linearly.
 */
function StackLayer({
  project,
  i,
  total,
  f,
}: {
  project: Project;
  i: number;
  total: number;
  f: MotionValue<number>;
}) {
  // How far behind the front card (eased within each step), and how far torn off (eased 0 → 1)
  const depth = (v: number) => {
    const d = clamp(i - v, 0, PEEK + 1);
    const base = Math.floor(d);
    return base + easeInOutCubic(d - base);
  };
  const leave = (v: number) => easeInOutCubic(clamp(v - i));

  // Stack position (cards waiting behind)
  const scale = useTransform(f, (v) => 1 - depth(v) * 0.05);
  const y = useTransform(f, (v) => `${depth(v) * 22}px`);
  const opacity = useTransform(f, (v) => clamp(PEEK + 1 - depth(v)));

  // Tear-off (card leaving)
  const tearY = useTransform(f, (v) => `${-leave(v) * 125}%`);
  const tearRotate = useTransform(f, (v) => leave(v) * 28);
  const tearOpacity = useTransform(f, (v) => (leave(v) < 0.6 ? 1 : 1 - (leave(v) - 0.6) / 0.4));
  const pointerEvents = useTransform(f, (v) => (Math.abs(v - i) < 0.5 ? "auto" : "none"));
  // Veil over waiting cards so only a clean edge peeks out; it lifts as the card moves to the front
  const veil = useTransform(f, (v) => clamp(i - v));

  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        pointerEvents,
        zIndex: total - i,
        transformOrigin: "50% 100%",
        perspective: 1600,
        willChange: "transform, opacity",
      }}
      className="absolute inset-0"
    >
      <motion.article
        style={{
          y: tearY,
          rotateX: tearRotate,
          opacity: tearOpacity,
          transformOrigin: "50% 0%",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
        className="relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-30px_rgba(32,39,31,0.35)]"
      >
        <ProjectBody project={project} index={i} total={total} fill />
        <motion.span
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 z-10 bg-card"
        />
      </motion.article>
    </motion.div>
  );
}

function ProjectStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = PROJECTS.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Softer spring than the raw scroll so the whole stack glides
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.5,
    restDelta: 0.0005,
  });
  const f = useTransform(smooth, [0, 1], [0, total - 1]);

  // Magnetic snap: once scrolling stops, settle on a card. A small push past a card commits to the next.
  const lastF = useRef(0);
  const direction = useRef<1 | -1>(1);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const settle = () => {
    const track = trackRef.current;
    if (!track) return;
    const p = scrollYProgress.get();
    if (p <= 0 || p >= 1) return;

    const v = p * (total - 1);
    const base = Math.floor(v);
    const frac = v - base;
    if (frac < 0.005 || frac > 0.995) return;

    const target =
      direction.current > 0
        ? frac > SNAP_COMMIT ? base + 1 : base
        : frac < 1 - SNAP_COMMIT ? base : base + 1;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const y = trackTop + (target / (total - 1)) * (track.offsetHeight - window.innerHeight);

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1, easing: easeOutQuart });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = p * (total - 1);
    if (v !== lastF.current) direction.current = v > lastF.current ? 1 : -1;
    lastF.current = v;
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(settle, SNAP_IDLE);
  });
  useEffect(() => () => clearTimeout(idleTimer.current), []);

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `calc(100svh + ${(total - 1) * SCROLL_PER_CARD}svh)` }}
    >
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-center">
        <div className="relative h-[min(640px,calc(100svh-72px-110px))] w-full">
          {PROJECTS.map((project, i) => (
            <StackLayer key={i} project={project} i={i} total={total} f={f} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Plain list, used for people who prefer reduced motion */
function ProjectList() {
  const total = PROJECTS.length;
  return (
    <div className="flex w-full flex-col gap-5">
      {PROJECTS.map((project, i) => (
        <article
          key={i}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <ProjectBody project={project} index={i} total={total} fill={false} />
        </article>
      ))}
    </div>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="projects" className="section-wrapper w-full">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden />
          Projects
        </p>
        <TextReveal as="h2" className="section-title">
          Things I&apos;ve built, end to end.
        </TextReveal>
        <TextReveal as="p" delay={0.08} stagger={0.015} className="section-subtitle">
          A selection of AI and full-stack apps I&apos;ve built, with the stack used and
          links to live demos or source.
        </TextReveal>
      </div>

      {reduceMotion ? <ProjectList /> : <ProjectStack />}
    </section>
  );
}
