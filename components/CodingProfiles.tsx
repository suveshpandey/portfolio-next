"use client";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

const GITHUB_ACCOUNTS = [
  { id: "personal" as const, username: "suveshpandey", label: "Personal" },
  { id: "work" as const, username: "suvesheuron", label: "Work (Euron)" },
];

export default function CodingProfiles() {
  const [githubAccount, setGithubAccount] = useState<"personal" | "work">("personal");
  const current = GITHUB_ACCOUNTS.find((a) => a.id === githubAccount) ?? GITHUB_ACCOUNTS[0];

  return (
    <div id="coding-profiles" className="section-wrapper w-full pt-24 sm:pt-32 pb-24">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="section-heading max-w-5xl"
      >
        <h2 className="section-title">Coding Activity</h2>
        <motion.div
          whileInView={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left center" }}
          className="section-divider"
        />
        <p className="section-subtitle">
          My coding profiles and activity heatmaps showcase my dedication to consistent practice and growth as a developer.
        </p>
      </motion.div>

      {/* GitHub Card */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl mb-8 px-4 sm:px-0"
      >
        <div className="bg-muted p-6 rounded-xl flex flex-col gap-6 border border-border hover:border-accent/40 backdrop-blur-sm transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <a
              href={`https://github.com/${current.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit flex items-center text-xl font-semibold gap-3 py-1 text-foreground hover:text-accent transition-colors group"
            >
              <div className="p-2 rounded-lg bg-background/80 group-hover:bg-accent/15 transition-colors">
                <FaGithub size={24} className="text-accent" />
              </div>
              <span>GitHub — {current.label}</span>
              <SquareArrowOutUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            {/* Toggle: Personal vs Work account */}
            <div className="flex rounded-lg border border-border bg-background/60 p-1 gap-0.5">
              {GITHUB_ACCOUNTS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => setGithubAccount(acc.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    githubAccount === acc.id
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full overflow-x-auto flex flex-col items-center justify-center bg-background/50 rounded-lg gap-2 py-2">
            <div key={`github-calendar-${current.username}`} className="w-full flex justify-center">
              <GitHubCalendar
                username={current.username}
                year="last"
                fontSize={14}
                hideColorLegend
                hideMonthLabels
                errorMessage={`Could not load contributions for ${current.username}. View profile on GitHub.`}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Contributions in the last 365 days (rolling from today)
            </p>
          </div>
        </div>
      </motion.div>

      {/* LeetCode Card */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full max-w-5xl px-4 sm:px-0"
      >
        <div className="bg-muted p-6 rounded-xl flex flex-col gap-6 border border-border hover:border-accent/40 backdrop-blur-sm transition-all duration-200">
          <a
            href="https://leetcode.com/u/suveshpandey/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex items-center text-xl font-semibold gap-3 py-1 text-foreground hover:text-accent transition-colors group"
          >
            <div className="p-2 rounded-lg bg-background/80 group-hover:bg-accent/15 transition-colors">
              <SiLeetcode size={24} className="text-accent" />
            </div>
            <span>LeetCode Profile</span>
            <SquareArrowOutUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <div className="w-full overflow-x-auto flex justify-center rounded-lg bg-background/50">
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