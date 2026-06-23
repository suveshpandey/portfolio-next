"use client";
import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";

const GITHUB_ACCOUNTS = [
  { id: "personal" as const, username: "suveshpandey", label: "Personal" },
  { id: "work" as const, username: "suvesheuron", label: "Work (Euron)" },
];

const CALENDAR_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function useThemeMode() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const read = () =>
      setMode(document.documentElement.classList.contains("dark") ? "dark" : "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return mode;
}

export default function CodingProfiles() {
  const [githubAccount, setGithubAccount] = useState<"personal" | "work">("personal");
  const current = GITHUB_ACCOUNTS.find((a) => a.id === githubAccount) ?? GITHUB_ACCOUNTS[0];
  const themeMode = useThemeMode();

  return (
    <div id="coding-profiles" className="section-wrapper w-full">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="section-heading"
      >
        <h2 className="section-title">Coding Activity</h2>
      </motion.div>

      {/* GitHub Card */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="mb-6 w-full"
      >
        <div className="section-card rounded-xl p-6 flex flex-col gap-6 transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <a
              href={`https://github.com/${current.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-xl font-semibold py-1 text-foreground transition-colors"
            >
              GitHub — {current.label}
            </a>
            {/* Toggle: Personal vs Work account */}
            <div className="flex rounded-lg border border-border bg-background/70 p-1 gap-0.5">
              {GITHUB_ACCOUNTS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => setGithubAccount(acc.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    githubAccount === acc.id
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full overflow-x-auto flex flex-col items-center justify-center bg-background/60 rounded-lg gap-2 py-2">
            <div key={`github-calendar-${current.username}`} className="w-full flex justify-center">
              <GitHubCalendar
                username={current.username}
                year="last"
                fontSize={14}
                colorScheme={themeMode}
                theme={CALENDAR_THEME}
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
        className="w-full"
      >
        <div className="section-card rounded-xl p-6 flex flex-col gap-6 transition-all duration-200">
          <a
            href="https://leetcode.com/u/suveshpandey/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-xl font-semibold py-1 text-foreground transition-colors"
          >
            LeetCode Profile
          </a>
          <div className="w-full overflow-x-auto flex justify-center rounded-lg bg-background/60">
            <img
              key={themeMode}
              src={`https://leetcard.jacoblin.cool/suveshpandey?ext=heatmap&theme=${themeMode}`}
              alt="LeetCode Stats"
              className="w-full rounded-md transition-transform duration-300"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}