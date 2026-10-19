"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { CONTACT } from "@/lib";
import TextReveal from "@/components/TextReveal";

const SPRING = { stiffness: 150, damping: 15, mass: 0.4 } as const;

function TiltPortrait() {
  const px = useMotionValue(0); // -0.5 .. 0.5 (horizontal)
  const py = useMotionValue(0); // -0.5 .. 0.5 (vertical)

  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), SPRING);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), SPRING);
  const glareX = useTransform(px, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["20%", "80%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4), transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative mx-auto w-full max-w-[300px] lg:mx-0 lg:justify-self-end"
      style={{ perspective: 1200 }}
    >
      {/* Offset accent frame for depth */}
      <span
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/35"
      />
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_20px_50px_-24px_rgba(32,39,31,0.45)]"
      >
        <Image
          src="/images/profilePic.jpg"
          alt="Suvesh Pandey"
          fill
          sizes="(min-width: 1024px) 300px, 70vw"
          className="object-cover"
          priority
        />
        {/* Subtle dark wash at the base to tie into the theme */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#20271f]/25 to-transparent"
        />
        {/* Cursor-tracked light glare, only while hovering */}
        <motion.span
          aria-hidden
          style={{ backgroundImage: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </motion.div>
    </motion.div>
  );
}

const fadeUp = (delay: number) => ({
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay } },
});

const META = [
  { label: "India · Remote-friendly" },
  { label: "Available for work" },
  { label: "GitHub ↗", href: CONTACT.github },
  { label: "LinkedIn ↗", href: CONTACT.linkedin },
  { label: "X ↗", href: CONTACT.twitter },
];

export default function HeroSection() {
  return (
    <section
      id="top"
      className="grid items-center gap-12 pt-16 pb-16 sm:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:gap-[70px] lg:pt-24 lg:pb-24"
    >
      <div className="min-w-0">
        <p className="eyebrow mb-6">
          <span className="status-dot" aria-hidden />
          Open to new roles
        </p>

        <TextReveal
          as="h1"
          stagger={0.05}
          className="text-[clamp(2.75rem,5.3vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.045em] text-foreground"
        >
          I build <span className="text-accent">AI-powered</span> products.
        </TextReveal>

        <TextReveal
          as="p"
          delay={0.12}
          stagger={0.02}
          className="mt-6 max-w-[480px] text-[15px] leading-[1.8] text-muted-foreground"
        >
          I&apos;m Suvesh, a software engineer shipping production AI systems — from
          real-time voice agents to the full stack behind them — with a focus on clean
          architecture and things that actually work.
        </TextReveal>

        <motion.div
          variants={fadeUp(0.32)}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href="#projects" className="btn btn-dark">
            Explore my work <span aria-hidden>↘</span>
          </a>
          <a
            href={CONTACT.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            Download resume <span aria-hidden>↓</span>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp(0.45)}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground"
        >
          {META.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <span key={item.label}>{item.label}</span>
            )
          )}
        </motion.div>
      </div>

      {/* Portrait with 3D cursor tilt */}
      <TiltPortrait />
    </section>
  );
}
