import React from "react";

interface TechnologyCardProps {
  technologyIcon: React.ReactNode;
  technologyName: string;
}

export const TechnologyCard = ({ technologyIcon, technologyName }: TechnologyCardProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      {technologyIcon}
      <span className="text-slate-300">{technologyName}</span>
    </div>
  );
};
