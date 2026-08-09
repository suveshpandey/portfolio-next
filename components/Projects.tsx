"use client";
import { useState } from "react";
import { PROJECTS, type ProjectHighlight } from "@/lib";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import { FaGithub } from "react-icons/fa";

/** Bullets always visible on a card; the rest collapse behind "Show more" */
const VISIBLE_HIGHLIGHTS = 2;

function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
      {label}
      <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
    </span>
  );
}

function HighlightList({ highlights }: { highlights: ProjectHighlight[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-4 marker:text-muted-foreground/50">
      {highlights.map((highlight, i) => (
        <li key={i} className="text-sm leading-relaxed text-muted-foreground">
          <TextReveal as="span" stagger={0.006} delay={i * 0.05}>
            {highlight.label ? (
              <>
                <span className="font-medium text-foreground">
                  {highlight.label}
                </span>{" "}
                — {highlight.text}
              </>
            ) : (
              highlight.text
            )}
          </TextReveal>
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = project.highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const hidden = project.highlights.slice(VISIBLE_HIGHLIGHTS);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="section-card p-5 sm:p-6"
    >
      <TextReveal
        as="h3"
        stagger={0.04}
        className="text-base font-semibold text-foreground sm:text-lg"
      >
        {project.title}
      </TextReveal>
      <TextReveal
        as="p"
        stagger={0.008}
        delay={0.06}
        className="mt-2 text-sm leading-relaxed text-muted-foreground"
      >
        {project.description}
      </TextReveal>

      <div className="mt-3.5">
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
              <div className="pt-1.5">
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
            className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {project.live && (
          <div className="group relative">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Globe size={15} />
              Website
            </a>
            <Tooltip label="Check it live" />
          </div>
        )}
        {project.github && (
          <div className="group relative">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/25"
            >
              <FaGithub size={15} />
              Source
            </a>
            <Tooltip label="View source code" />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-wrapper w-full">
      <div className="section-heading">
        <TextReveal as="h2" className="section-title">
          Projects
        </TextReveal>
        <TextReveal as="p" delay={0.08} stagger={0.015} className="section-subtitle">
          A selection of AI and full-stack apps I&apos;ve built, with the stack used and
          links to live demos or source.
        </TextReveal>
      </div>

      <div className="flex w-full flex-col gap-5">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
