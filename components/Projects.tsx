"use client";
import { PROJECTS } from "@/lib";
import { FaGithub } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function Projects() {
  const handleBtnClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section id="projects" className="section-wrapper w-full pt-24 sm:pt-32 pb-24">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="section-heading w-full"
      >
        <h2 className="section-title">Featured Projects</h2>
        <motion.div
          whileInView={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left center" }}
          className="section-divider"
        />
        <p className="section-subtitle">
          A showcase of my work, highlighting practical applications of my skills and creativity.
        </p>
      </motion.div>

      <div className="w-full relative">
        <Carousel 
          className="w-full" 
          opts={{
            align: "start",
            loop: true,
            duration: 25,
            dragFree: false,
          }}
        >
          <CarouselContent className="py-4 -ml-2 md:-ml-4">
            {PROJECTS.map((project, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-4/5 md:basis-2/3 lg:basis-2/3">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative group rounded-xl section-card p-6 h-full flex flex-col min-h-[550px]"
                >
                  <div className="flex flex-col items-center gap-6 flex-1">
                    {/* Image Container */}
                    <div className="w-full">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl border border-border shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="w-full flex-1 flex flex-col">
                      {/* Title */}
                      <h2 className="text-xl font-semibold mb-3 text-foreground text-center md:text-left wrap-break-words">
                        {project.title}
                      </h2>
                      
                      {/* Description - Removed line-clamp and increased space */}
                      <div className="flex-1 mb-4 overflow-y-auto">
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4 justify-center">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-accent/10 border border-accent/20 px-3 py-1.5 text-xs font-medium text-accent transition-all duration-200 hover:border-accent/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleBtnClick(project.live || "")}
                          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold transition duration-200 cursor-pointer text-sm flex-1 justify-center hover:opacity-90 shadow-lg shadow-accent/20"
                        >
                          <GoDotFill className="mr-2 animate-ping" size={14} />
                          Live
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBtnClick(project.github || "")}
                          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-muted border border-border hover:border-accent/40 text-foreground font-medium transition duration-200 cursor-pointer text-sm flex-1 justify-center"
                        >
                          <FaGithub className="mr-2" size={14} />
                          GitHub
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 sm:left-4 md:-left-12 lg:-left-14 bg-muted border-2 border-border text-foreground hover:border-accent hover:text-accent size-10 sm:size-12 md:size-14 shadow-lg transition-all duration-200 hover:scale-105 z-20" />
          <CarouselNext className="right-2 sm:right-4 md:-right-12 lg:-right-14 bg-muted border-2 border-border text-foreground hover:border-accent hover:text-accent size-10 sm:size-12 md:size-14 shadow-lg transition-all duration-200 hover:scale-105 z-20" />
        </Carousel>
      </div>
    </section>
  );
}