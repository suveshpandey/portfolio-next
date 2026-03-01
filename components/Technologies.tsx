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
    <div id="technologies" className="section-wrapper w-full text-foreground overflow-hidden pt-24 sm:pt-32 pb-24">
      <div className="w-full">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="section-heading"
        >
          <h2 className="section-title">Technologies & Tools</h2>
          <motion.div
            whileInView={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left center" }}
            className="section-divider"
          />
          <p className="section-subtitle">
            A comprehensive overview of my technical expertise across different domains.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-card flex flex-col py-6 px-6 cursor-pointer"
          >
            <h1 className="mb-5 text-center text-foreground font-bold text-lg">Programming Languages</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              <TechnologyCard technologyIcon={<FaC className="text-accent sm:size-6 size-5" />} technologyName="C" />
              <TechnologyCard technologyIcon={<TbBrandCpp className="text-accent sm:size-6 size-5" />} technologyName="C++" />
              <TechnologyCard technologyIcon={<RiJavascriptFill className="text-accent sm:size-6 size-5" />} technologyName="JavaScript" />
              <TechnologyCard technologyIcon={<BiLogoTypescript className="text-accent sm:size-6 size-5" />} technologyName="TypeScript" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-card flex flex-col py-6 px-6 cursor-pointer"
          >
            <h1 className="mb-5 text-center text-foreground font-bold text-lg">Frontend</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              <TechnologyCard technologyIcon={<RiReactjsLine className="text-accent sm:size-6 size-5" />} technologyName="ReactJS" />
              <TechnologyCard technologyIcon={<RiNextjsLine className="text-accent sm:size-6 size-5" />} technologyName="NextJS" />
              <TechnologyCard technologyIcon={<RiTailwindCssFill className="text-accent sm:size-6 size-5" />} technologyName="Tailwind" />
              <TechnologyCard technologyIcon={<FaHtml5 className="text-accent sm:size-6 size-5" />} technologyName="HTML" />
              <TechnologyCard technologyIcon={<FaCss3Alt className="text-accent sm:size-6 size-5" />} technologyName="CSS" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-card flex flex-col py-6 px-6 cursor-pointer"
          >
            <h1 className="mb-5 text-center text-foreground font-bold text-lg">Backend</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              <TechnologyCard technologyIcon={<FaNodeJs className="text-accent sm:size-6 size-5" />} technologyName="NodeJS" />
              <TechnologyCard technologyIcon={<SiExpress className="text-accent sm:size-6 size-5" />} technologyName="ExpressJS" />
              <TechnologyCard technologyIcon={<SiMongodb className="text-accent sm:size-6 size-5" />} technologyName="MongoDB" />
              <TechnologyCard technologyIcon={<BiLogoPostgresql className="text-accent sm:size-6 size-5" />} technologyName="PostgreSQL" />
              <TechnologyCard technologyIcon={<FaCodeCompare className="text-accent sm:size-6 size-5" />} technologyName="Rest APIs" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-card flex flex-col py-6 px-6 cursor-pointer"
          >
            <h1 className="mb-5 text-center text-foreground font-bold text-lg">Tools</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              <TechnologyCard technologyIcon={<FaGitAlt className="text-accent sm:size-6 size-5" />} technologyName="Git" />
              <TechnologyCard technologyIcon={<FaGithub className="text-accent sm:size-6 size-5" />} technologyName="Github" />
              <TechnologyCard technologyIcon={<FaDocker className="text-accent sm:size-6 size-5" />} technologyName="Docker" />
              <TechnologyCard technologyIcon={<FaAws className="text-accent sm:size-6 size-5" />} technologyName="AWS" />
              <TechnologyCard technologyIcon={<SiPostman className="text-accent sm:size-6 size-5" />} technologyName="Postman" />
              <TechnologyCard technologyIcon={<FaLinux className="text-accent sm:size-6 size-5" />} technologyName="Linux" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}