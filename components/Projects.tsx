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
    <section id="projects" className="min-h-screen h-auto sm:pt-0 pt-40 py-10">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col gap-y-2 items-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-linear-to-r from-blue-500 to-green-500 bg-clip-text py-2 text-transparent text-center">
          Featured Projects
        </h2>
        <motion.div
          whileInView={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 1 }}
          className="w-60 mx-auto h-1 rounded-full bg-linear-to-r from-green-500 via-slate-500 to-blue-500"
        />
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto text-center"
        >
          A showcase of my work, highlighting practical applications of my skills and creativity.
        </motion.p>
      </motion.div>

      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent className="py-4">
            {PROJECTS.map((project, index) => (
              <CarouselItem key={index} className="sm:basis-4/5 md:basis-2/3 lg:basis-2/3">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                  className="relative group rounded-2xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm shadow-lg p-6 hover:border-indigo-500/50 transition duration-500 h-full flex flex-col min-h-[550px]"
                >
                  <div className="flex flex-col items-center gap-6 flex-1">
                    {/* Image Container */}
                    <div className="w-full">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl border border-neutral-800 shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="w-full flex-1 flex flex-col">
                      {/* Title */}
                      <h2 className="text-xl font-semibold mb-3 text-white text-center md:text-left wrap-break-words">
                        {project.title}
                      </h2>
                      
                      {/* Description - Removed line-clamp and increased space */}
                      <div className="flex-1 mb-4 overflow-y-auto">
                        <p className="text-neutral-400 leading-relaxed text-sm">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4 justify-center">
                        {project.technologies.map((tech, i) => {
                          const colors = [
                            "from-blue-500/10 to-cyan-500/10 border-blue-400/20 text-blue-300 hover:from-blue-500/20 hover:to-cyan-500/20",
                            "from-green-500/10 to-emerald-500/10 border-green-400/20 text-green-300 hover:from-green-500/20 hover:to-emerald-500/20",
                            "from-purple-500/10 to-pink-500/10 border-purple-400/20 text-purple-300 hover:from-purple-500/20 hover:to-pink-500/20",
                            "from-orange-500/10 to-red-500/10 border-orange-400/20 text-orange-300 hover:from-orange-500/20 hover:to-red-500/20",
                            "from-yellow-500/10 to-amber-500/10 border-yellow-400/20 text-yellow-300 hover:from-yellow-500/20 hover:to-amber-500/20"
                          ];
                          const colorClass = colors[i % colors.length];
                          
                          return (
                            <span
                              key={i}
                              className={`rounded-lg bg-linear-to-r border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm transition-all duration-300 ${colorClass}`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleBtnClick(project.live || "")}
                          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-linear-to-tr from-indigo-800 via-blue-700 to-sky-600 hover:from-indigo-700 hover:via-blue-600 hover:to-sky-500 text-white font-medium transition duration-300 cursor-pointer text-sm flex-1 justify-center"
                        >
                          <GoDotFill className="mr-2 animate-ping" size={14} />
                          Live
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBtnClick(project.github || "")}
                          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-linear-to-tr from-gray-900 via-slate-800 to-gray-700 hover:to-gray-600 text-white font-medium transition duration-300 cursor-pointer text-sm flex-1 justify-center"
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
          <CarouselPrevious className="left-2 sm:left-4 bg-slate-700/80 hover:bg-slate-600 border border-slate-600 size-8 sm:size-10" />
          <CarouselNext className="right-2 sm:right-4 bg-slate-700/80 hover:bg-slate-600 border border-slate-600 size-8 sm:size-10" />
        </Carousel>
      </div>
    </section>
  );
}