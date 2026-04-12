"use client";

import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface EcoScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function EcoScore({ score, size = "md", showLabel = false }: EcoScoreProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const gaps = {
    sm: "gap-0.5",
    md: "gap-1",
    lg: "gap-1.5",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex items-center", gaps[size])}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Leaf
            key={i}
            className={cn(
              sizes[size],
              i < score
                ? "fill-primary text-primary"
                : "fill-muted text-muted-foreground/30"
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-sm text-muted-foreground">
          {score}/5 Eco Score
        </span>
      )}
    </div>
  );
}

interface EcoScoreBadgeProps {
  score: number;
  className?: string;
}

export function EcoScoreBadge({ score, className }: EcoScoreBadgeProps) {
  const getColor = () => {
    if (score >= 4.5) return "bg-primary text-primary-foreground";
    if (score >= 3.5) return "bg-secondary text-secondary-foreground";
    if (score >= 2.5) return "bg-accent text-accent-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        getColor(),
        className
      )}
    >
      <Leaf className="h-3 w-3" />
      {score.toFixed(1)}
    </div>
  );
}
