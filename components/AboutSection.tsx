"use client";
import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, Cloud } from "lucide-react";

export default function AboutSection() {
  const cards = [
    {
      icon: <GraduationCap className="text-accent w-6 h-6" />,
      title: "Education",
      subtitle: "B.Tech in Information Technology",
      place: "Mahatma Gandhi Chitrakoot Gramoday Vishwavidyalaya",
      detail: "CGPA: 8.2/10 (till 4th sem)",
    },
    {
      icon: <Award className="text-accent w-6 h-6" />,
      title: "Achievements",
      subtitle: "Data Structures and Algorithms",
      place: "600+ LeetCode Problems • 5th rank in GFG in College",
      detail: "Rating 1500+ on LeetCode",
    },
    {
      icon: <Briefcase className="text-accent w-6 h-6" />,
      title: "Specialization",
      subtitle: "MERN Stack Development",
      place: "Seeking Internship Opportunities",
      detail: "MERN • Next.js • TypeScript • Scalable Web Apps • Problem Solving",
    },
    {
      icon: <Cloud className="text-accent w-6 h-6" />,
      title: "Cloud & DevOps",
      subtitle: "Expanding Technical Stack",
      place: "Currently Learning",
      detail: "AWS • Docker • CI/CD Pipelines • Infrastructure as Code",
    },
  ];

  return (
    <motion.div id="about" className="section-wrapper w-full pt-24 sm:pt-32 pb-24">
      <div className="w-full">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="section-heading"
        >
          <h2 className="section-title">About Me</h2>
          <motion.div
            whileInView={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left center" }}
            className="section-divider"
          />
          <p className="section-subtitle">
            Blending technical expertise with a constant desire to grow and innovate.
          </p>
          
        </motion.div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="section-card flex flex-col py-6 px-6 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                {card.icon}
                <h3 className="font-semibold text-lg text-foreground">{card.title}</h3>
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">{card.subtitle}</h4>
              <p className="text-muted-foreground text-sm mb-3">{card.place}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}