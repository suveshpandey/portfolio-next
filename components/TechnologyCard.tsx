import React from "react";

interface TechnologyCardProps {
  technologyIcon: React.ReactNode;
  technologyName: string;
}

export const TechnologyCard = ({ technologyIcon, technologyName }: TechnologyCardProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/60 border border-border text-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/5">
      {technologyIcon}
      <span className="text-muted-foreground">{technologyName}</span>
    </div>
  );
};
