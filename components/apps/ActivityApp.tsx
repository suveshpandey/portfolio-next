"use client";

import { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useOS } from "@/components/os/store";
import { useWidth } from "@/components/os/useWidth";

const GITHUB_ACCOUNTS = [
  { id: "personal" as const, username: "suveshpandey", label: "Personal" },
  { id: "work" as const, username: "suvesheuron", label: "Work (Euron)" },
];

const CALENDAR_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#2a2a30", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const LEETCODE = "suveshpandey";

export default function ActivityApp() {
  const { isDark } = useOS();
  const [tab, setTab] = useState<"github" | "leetcode">("github");
  const [account, setAccount] = useState<"personal" | "work">("personal");
  const current = GITHUB_ACCOUNTS.find((a) => a.id === account)!;
  const [ref, width] = useWidth<HTMLDivElement>();
  const mode = isDark ? "dark" : "light";

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div data-drag className="flex h-[52px] shrink-0 items-center gap-2 pl-[88px] pr-3">
        <h2 className={`text-[15px] font-bold text-label ${width < 560 ? "hidden" : ""}`}>Activity</h2>
        <div className="flex-1" />
        <div className="tool-capsule p-0.5">
          <button type="button" className="tool-btn !h-[26px] gap-1.5 text-[12.5px]" data-on={tab === "github"} onClick={() => setTab("github")}>
            <FaGithub size={13} /> GitHub
          </button>
          <button type="button" className="tool-btn !h-[26px] gap-1.5 text-[12.5px]" data-on={tab === "leetcode"} onClick={() => setTab("leetcode")}>
            <SiLeetcode size={13} /> LeetCode
          </button>
        </div>
        <div className="flex-1" />
      </div>

      <div className="mac-scroll flex-1 px-4 pb-5">
        {tab === "github" ? (
          <div className="group-box p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-[15px] font-semibold text-label">GitHub — {current.label}</h3>
                <a
                  href={`https://github.com/${current.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-[12.5px] text-[var(--accent)] hover:underline"
                >
                  github.com/{current.username} <ExternalLink size={11} />
                </a>
              </div>
              <div className="tool-capsule p-0.5">
                {GITHUB_ACCOUNTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className="tool-btn !h-[26px] text-[12.5px]"
                    data-on={account === a.id}
                    onClick={() => setAccount(a.id)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mac-scroll mt-5 flex justify-center overflow-x-auto pb-1 text-label">
              <GitHubCalendar
                key={current.username}
                username={current.username}
                year="last"
                fontSize={12}
                blockSize={11}
                blockMargin={3}
                colorScheme={mode}
                theme={CALENDAR_THEME}
                hideColorLegend
                errorMessage={`Could not load contributions for ${current.username}.`}
              />
            </div>
            <p className="mt-3 text-center text-[11.5px] text-label-3">Contributions in the last 365 days</p>
          </div>
        ) : (
          <div className="group-box p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[15px] font-semibold text-label">LeetCode</h3>
                <a
                  href={`https://leetcode.com/u/${LEETCODE}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-[12.5px] text-[var(--accent)] hover:underline"
                >
                  leetcode.com/u/{LEETCODE} <ExternalLink size={11} />
                </a>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[10px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={mode}
                src={`https://leetcard.jacoblin.cool/${LEETCODE}?ext=heatmap&theme=${mode}`}
                alt="LeetCode stats and submission heatmap"
                className="mx-auto w-full max-w-[520px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
