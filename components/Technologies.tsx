"use client";
import { RiReactjsLine, RiNextjsLine, RiJavascriptFill, RiTailwindCssFill } from "react-icons/ri";
import { SiMongodb, SiExpress, SiPostman } from "react-icons/si";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaDocker } from "react-icons/fa";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { TbBrandCpp } from "react-icons/tb";
import { FaAws, FaC } from "react-icons/fa6";
import { motion } from "framer-motion";
import { TechnologyCard } from "./TechnologyCard";
import { FaLinux } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";

export default function Technologies() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center overflow-hidden sm:pt-0 pt-40">
      <div className="w-full mx-auto px-4 sm:px-0">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col gap-y-3 items-center mb-10"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent text-center">
            Technologies & Tools
          </h2>

          <motion.div
            whileInView={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 1 }}
            className="w-60 mx-auto h-1 rounded-full bg-gradient-to-r from-green-500 via-slate-500 to-blue-500"
          />

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="flex flex-col py-4 px-4 rounded-xl border bg-neutral-900/40 border-green-500/30 hover:border-green-400/50 duration-200 cursor-pointer"
          >
            <h1 className="mb-4 text-center text-slate-300 font-bold">Programming Languages</h1>
            <div className="flex flex-wrap gap-3">
              <TechnologyCard technologyIcon={<FaC className="text-blue-500 sm:size-6 size-5" />} technologyName="" />
              <TechnologyCard technologyIcon={<TbBrandCpp className="text-blue-500 sm:size-6 size-5" />} technologyName="" />
              <TechnologyCard technologyIcon={<RiJavascriptFill className="text-yellow-500 sm:size-6 size-5" />} technologyName="JavaScript" />
              <TechnologyCard technologyIcon={<BiLogoTypescript className="text-blue-500 sm:size-6 size-5" />} technologyName="TypeScript" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="flex flex-col py-4 px-4 rounded-xl bg-neutral-900/40 border border-purple-500/30 hover:border-purple-400/50 duration-300 cursor-pointer"
          >
            <h1 className="mb-4 text-center text-slate-300 font-bold">Frontend</h1>
            <div className="flex flex-wrap gap-3">
              <TechnologyCard technologyIcon={<RiReactjsLine className="text-sky-500 sm:size-6 size-5" />} technologyName="ReactJS" />
              <TechnologyCard technologyIcon={<RiNextjsLine className="text-white sm:size-6 size-5" />} technologyName="NextJS" />
              <TechnologyCard technologyIcon={<RiTailwindCssFill className="text-purple-500 sm:size-6 size-5" />} technologyName="Tailwind" />
              <TechnologyCard technologyIcon={<FaHtml5 className="text-orange-500 sm:size-6 size-5" />} technologyName="HTML" />
              <TechnologyCard technologyIcon={<FaCss3Alt className="text-sky-500 sm:size-6 size-5" />} technologyName="CSS" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="flex flex-col py-4 px-4 rounded-xl bg-neutral-900/40 border border-blue-500/30 hover:border-blue-400/50 duration-300 cursor-pointer"
          >
            <h1 className="mb-4 text-center text-slate-300 font-bold">Backend</h1>
            <div className="flex flex-wrap gap-3">
              <TechnologyCard technologyIcon={<FaNodeJs className="text-green-500 sm:size-6 size-5" />} technologyName="NodeJS" />
              <TechnologyCard technologyIcon={<SiExpress className="text-white sm:size-6 size-5" />} technologyName="ExpressJS" />
              <TechnologyCard technologyIcon={<SiMongodb className="text-green-500 sm:size-6 size-5" />} technologyName="MongoDB" />
              <TechnologyCard technologyIcon={<BiLogoPostgresql className="text-sky-500 sm:size-6 size-5" />} technologyName="PostgreSQL" />
              <TechnologyCard technologyIcon={<FaCodeCompare className="text-sky-500 sm:size-6 size-5" />} technologyName="Rest APIs" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="flex flex-col py-4 px-4 rounded-xl bg-neutral-900/40 border border-yellow-500/30 hover:border-yellow-400/50 duration-300 cursor-pointer"
          >
            <h1 className="mb-4 text-center text-slate-300 font-bold">Tools</h1>
            <div className="flex flex-wrap gap-3">
              <TechnologyCard technologyIcon={<FaGitAlt className="text-orange-500 sm:size-6 size-5" />} technologyName="Git" />
              <TechnologyCard technologyIcon={<FaGithub className="text-white sm:size-6 size-5" />} technologyName="Github" />
              <TechnologyCard technologyIcon={<FaDocker className="text-sky-500 sm:size-6 size-5" />} technologyName="Docker" />
              <TechnologyCard technologyIcon={<FaAws className="text-orange-400 sm:size-6 size-5" />} technologyName="AWS" />
              <TechnologyCard technologyIcon={<SiPostman className="text-orange-300 sm:size-6 size-5" />} technologyName="Postman" />
              <TechnologyCard technologyIcon={<FaLinux className="text-white sm:size-6 size-5" />} technologyName="Linux" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
