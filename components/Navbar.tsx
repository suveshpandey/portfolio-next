"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Box, LayoutGrid, PenLine, Smile, User, type LucideIcon } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CONTACT } from "@/lib";
import { getLenis } from "@/lib/lenis";

const NAV: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "top", label: "Intro", icon: User },
  { id: "about", label: "About", icon: Smile },
  { id: "technologies", label: "Skills", icon: Box },
  { id: "projects", label: "Work", icon: LayoutGrid },
  { id: "contact", label: "Contact", icon: PenLine },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Themed tooltip that drops below its trigger on hover / keyboard focus. The trigger must be
 * `group relative`. Hover tooltips only apply on devices that can hover, so touch screens skip them.
 */
function Tip({
  label,
  align = "center",
  className = "",
}: {
  label: string;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const pos =
    align === "left" ? "left-0" : align === "right" ? "right-0" : "left-1/2 -translate-x-1/2";
  const arrow =
    align === "left" ? "left-3" : align === "right" ? "right-[14px] min-[340px]:right-[17px] min-[420px]:right-[19px]" : "left-1/2 -translate-x-1/2";
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute top-full z-10 mt-2.5 -translate-y-1 scale-95 whitespace-nowrap rounded-full bg-[var(--ink)] px-3 py-1.5 text-[11.5px] font-medium leading-none text-white opacity-0 shadow-[0_10px_24px_-10px_rgba(31,27,53,0.65)] transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 ${pos} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute -top-1 h-2 w-2 rotate-45 rounded-[2px] bg-[var(--ink)] ${arrow}`}
      />
      <span className="relative">{label}</span>
    </span>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("top");

  // The active item is the last section whose top has passed ~35% of the viewport
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = NAV[0].id;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const lenis = getLenis();
    if (id === "top") {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -88, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[760px] items-center justify-between gap-2 px-3 pt-3 min-[340px]:gap-3 min-[340px]:px-4 min-[360px]:px-5 sm:px-8 sm:pt-4">
        {/* Section pill */}
        <nav
          aria-label="Sections"
          className="pointer-events-auto flex shrink-0 items-center gap-0 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] p-0.5 shadow-[0_8px_30px_-12px_rgba(60,45,120,0.35)] backdrop-blur-xl backdrop-saturate-150 min-[340px]:gap-0.5 min-[340px]:p-1"
        >
          {NAV.map(({ id, label, icon: Icon }, i) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex h-7 items-center justify-center gap-1.5 rounded-full text-[13px] font-medium transition-colors min-[340px]:h-8 min-[420px]:h-9 ${
                  isActive
                    ? "px-2 text-foreground min-[340px]:px-2.5 min-[420px]:px-3"
                    : "w-7 text-muted-foreground hover:text-foreground min-[340px]:w-8 min-[420px]:w-9"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_-4px_rgba(60,45,120,0.4)]"
                  />
                )}
                <Icon size={16} strokeWidth={2} className="relative h-[15px] w-[15px] min-[340px]:h-4 min-[340px]:w-4" />
                {isActive && <span className="relative hidden min-[360px]:inline">{label}</span>}
                {/* The active item already shows its label from 360px up */}
                <Tip
                  label={label}
                  align={i === 0 ? "left" : "center"}
                  className={isActive ? "min-[360px]:hidden" : ""}
                />
              </a>
            );
          })}
        </nav>

        {/* Socials */}
        <div className="pointer-events-auto flex shrink-0 items-center gap-1 min-[340px]:gap-1.5">
          <a
            href={CONTACT.github}
            {...external}
            aria-label="GitHub"
            className="group relative grid h-[34px] w-[34px] place-items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] text-muted-foreground backdrop-blur-xl transition-colors hover:bg-white hover:text-foreground min-[340px]:h-[42px] min-[340px]:w-[42px] min-[420px]:h-[46px] min-[420px]:w-[46px]"
          >
            <FaGithub size={16} className="h-3.5 w-3.5 min-[340px]:h-4 min-[340px]:w-4" />
            <Tip label="GitHub" />
          </a>
          <a
            href={CONTACT.linkedin}
            {...external}
            aria-label="LinkedIn"
            className="group relative grid h-[34px] w-[34px] place-items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] text-muted-foreground backdrop-blur-xl transition-colors hover:bg-white hover:text-foreground min-[340px]:h-[42px] min-[340px]:w-[42px] min-[420px]:h-[46px] min-[420px]:w-[46px]"
          >
            <FaLinkedinIn size={16} className="h-3.5 w-3.5 min-[340px]:h-4 min-[340px]:w-4" />
            <Tip label="LinkedIn" align="right" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
