"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Home, FileText, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CONTACT } from "@/lib";

const BASE_SIZE = 40;
const MAX_SIZE = 62;
const RANGE = 150;
const SPRING = { mass: 0.18, stiffness: 160, damping: 15 } as const;

function DockItem({
  mouseX,
  label,
  href,
  onClick,
  children,
}: {
  mouseX: MotionValue<number>;
  label: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-RANGE, 0, RANGE], [BASE_SIZE, MAX_SIZE, BASE_SIZE]);
  const width = useSpring(widthSync, SPRING);

  const iconScaleSync = useTransform(distance, [-RANGE, 0, RANGE], [1, 1.22, 1]);
  const iconScale = useSpring(iconScaleSync, SPRING);

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full bg-muted opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100"
      />
      <motion.span style={{ scale: iconScale }} className="relative z-10 flex items-center justify-center">
        {children}
      </motion.span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ width, height: BASE_SIZE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-lg"
          >
            {label}
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
          </motion.span>
        )}
      </AnimatePresence>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative flex h-full w-full items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          className="group relative flex h-full w-full items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const mouseX = useMotionValue(Infinity);

  const links = [
    { label: "Home", icon: <Home size={18} />, onClick: scrollToTop },
    { label: "GitHub", icon: <FaGithub size={18} />, href: CONTACT.github },
    { label: "LinkedIn", icon: <FaLinkedinIn size={17} />, href: CONTACT.linkedin },
    { label: "X (Twitter)", icon: <BsTwitterX size={15} />, href: CONTACT.twitter },
    { label: "Resume", icon: <FileText size={17} />, href: "/suvesh_resume.pdf" },
  ];

  return (
    <motion.nav
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="nav-surface flex items-center gap-1 rounded-full px-2.5 py-1.5"
      >
        {links.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            label={item.label}
            href={item.href}
            onClick={item.onClick}
          >
            {item.icon}
          </DockItem>
        ))}

        <span className="mx-1 h-6 w-px self-center bg-border" />

        <DockItem mouseX={mouseX} label="Toggle theme" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </DockItem>
      </div>
    </motion.nav>
  );
}
