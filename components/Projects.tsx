"use client";
import { PROJECTS } from "@/lib";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
      {label}
      <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
    </span>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-wrapper w-full">
      <div className="section-heading">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          A selection of AI and full-stack apps I&apos;ve built, with the stack used and
          links to live demos or source.
        </p>
      </div>

      <div className="flex w-full flex-col gap-5">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="section-card p-5 sm:p-6"
          >
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

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
        ))}
      </div>
    </section>
  );
}
