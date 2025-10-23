"use client";
import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, Cloud } from "lucide-react";

export default function AboutSection() {
  const cards = [
    {
      icon: <GraduationCap className="text-green-400 w-6 h-6" />,
      title: "Education",
      subtitle: "B.Tech in Information Technology",
      place: "Mahatma Gandhi Chitrakoot Gramoday Vishwavidyalaya",
      detail: "CGPA: 8.2/10 (till 4th sem)",
      color: "border-green-500/30 hover:border-green-400/50",
    },
    {
      icon: <Award className="text-purple-400 w-6 h-6" />,
      title: "Achievements",
      subtitle: "Data Structures and Algorithms",
      place: "600+ LeetCode Problems • 5th rank in GFG in College",
      detail: "Rating 1500+ on LeetCode",
      color: "border-purple-500/30 hover:border-purple-400/50",
    },
    {
      icon: <Briefcase className="text-indigo-400 w-6 h-6" />,
      title: "Specialization",
      subtitle: "MERN Stack Development",
      place: "Seeking Internship Opportunities",
      detail: "MERN • Next.js • TypeScript • Scalable Web Apps • Problem Solving",
      color: "border-indigo-500/30 hover:border-indigo-400/50",
    },
    {
      icon: <Cloud className="text-orange-400 w-6 h-6" />,
      title: "Cloud & DevOps",
      subtitle: "Expanding Technical Stack",
      place: "Currently Learning",
      detail: "AWS • Docker • Kubernetes • CI/CD Pipelines • Infrastructure as Code",
      color: "border-orange-500/30 hover:border-orange-400/50",
    },
  ];

  return (
    <motion.div id="about" className="min-h-screen flex flex-col justify-center items-center sm:pt-0 pt-40">
      <div className="w-full">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col gap-y-2 items-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-linear-to-r from-blue-500 to-green-500 bg-clip-text py-2 text-transparent text-center">
            About Me
          </h2>

          <motion.div
            whileInView={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 1 }}
            className="w-60 mx-auto h-1 rounded-full bg-linear-to-r from-green-500 via-slate-500 to-blue-500"
          />

          <p className="text-gray-400 text-lg text-center">
            Blending technical expertise with a constant desire to grow and innovate.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 3 }}
              className={`flex flex-col py-6 px-6 rounded-xl border bg-neutral-900/40 transition-all duration-300 cursor-pointer ${card.color}`}
            >
              <div className="flex items-center gap-2 mb-4">
                {card.icon}
                <h3 className="font-semibold text-lg">{card.title}</h3>
              </div>
              <h4 className="text-lg font-medium mb-2">{card.subtitle}</h4>
              <p className="text-neutral-400 text-sm mb-3">{card.place}</p>
              <p className="text-sm text-blue-200 leading-relaxed">{card.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}