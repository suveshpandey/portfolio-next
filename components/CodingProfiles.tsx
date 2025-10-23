"use client";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

export default function CodingProfiles() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-32 pb-20">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl flex flex-col gap-y-2 items-center mb-16"
      >
        <h2 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text py-2 text-transparent text-center">
          Coding Activity
        </h2>
        <motion.div
          whileInView={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-72 h-1 rounded-full bg-linear-to-r from-emerald-400 via-blue-400 to-emerald-400"
        />
        <p className="text-gray-300 text-lg max-w-2xl mx-auto text-center mt-4 leading-relaxed">
          My coding profiles and activity heatmaps showcase my dedication to consistent practice and growth as a developer.
        </p>
      </motion.div>

      {/* GitHub Card */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl mb-8"
      >
        <div className="bg-neutral-800/40 p-6 rounded-2xl flex flex-col gap-6 border border-green-800/50 hover:border-green-600/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
          <a
            href="https://github.com/suveshpandey"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex items-center text-xl font-semibold gap-3 py-1 text-gray-200 hover:text-emerald-300 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-neutral-700 group-hover:bg-emerald-400/10 transition-colors">
              <FaGithub size={24} className="text-white" />
            </div>
            <span>GitHub Profile</span>
            <SquareArrowOutUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <div className="w-full overflow-x-auto flex justify-center bg-neutral-900/50 rounded-lg">
            <GitHubCalendar username="suveshpandey" fontSize={14} hideColorLegend hideMonthLabels />
          </div>
        </div>
      </motion.div>

      {/* LeetCode Card */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-neutral-800/40 p-6 rounded-2xl flex flex-col gap-6 border border-yellow-800/50 hover:border-yellow-600/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
          <a
            href="https://leetcode.com/u/suveshpandey/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex items-center text-xl font-semibold gap-3 py-1 text-gray-200 hover:text-amber-300 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-neutral-700 group-hover:bg-amber-400/10 transition-colors">
              <SiLeetcode size={24} className="text-amber-400" />
            </div>
            <span>LeetCode Profile</span>
            <SquareArrowOutUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <div className="w-full overflow-x-auto flex justify-center rounded-lg bg-neutral-900/50">
            <img 
              src="https://leetcard.jacoblin.cool/suveshpandey?ext=heatmap" 
              alt="LeetCode Stats" 
              className="w-full rounded-md transition-transform duration-300" 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}