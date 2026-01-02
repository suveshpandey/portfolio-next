"use client";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, Code2 } from "lucide-react";

export default function Experience() {
  const experience = {
    icon: <Briefcase className="text-cyan-400 w-6 h-6" />,
    title: "Web Development Intern",
    company: "Euron",
    duration: "November 2025 - Present",
    project: "RAG-based Chatbot for University Students",
    description: "Working on a RAG (Retrieval-Augmented Generation) based chatbot that provides comprehensive answers to university students, including both text responses and diagram visualizations.",
    color: "border-cyan-500/30 hover:border-cyan-400/50",
  };

  return (
    <motion.div id="experience" className="min-h-screen flex flex-col justify-center items-center sm:pt-0 pt-40 pb-20">
      <div className="w-full">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col gap-y-2 items-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-linear-to-r from-blue-500 to-green-500 bg-clip-text py-2 text-transparent text-center">
            Experience
          </h2>

          <motion.div
            whileInView={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 1 }}
            className="w-60 mx-auto h-1 rounded-full bg-linear-to-r from-green-500 via-slate-500 to-blue-500"
          />

          <p className="text-gray-400 text-lg text-center">
            Professional journey and hands-on experience in real-world projects.
          </p>
        </motion.div>

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className={`flex flex-col py-6 px-6 rounded-xl border bg-neutral-900/40 transition-all duration-300 cursor-pointer ${experience.color}`}
          >
            <div className="flex items-center gap-2 mb-4">
              {experience.icon}
              <h3 className="font-semibold text-lg">{experience.title}</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="text-neutral-400 w-4 h-4" />
                <h4 className="text-lg font-medium">{experience.company}</h4>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="text-neutral-400 w-4 h-4" />
                <p className="text-neutral-400 text-sm">{experience.duration}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="text-blue-400 w-5 h-5" />
                <h5 className="text-md font-semibold text-blue-300">{experience.project}</h5>
              </div>
              <p className="text-sm text-blue-200 leading-relaxed ml-7">
                {experience.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

