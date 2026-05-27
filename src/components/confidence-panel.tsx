import type { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export interface ConfidencePanelProps {
  title: string;
  level: "low" | "medium" | "high";
  reason: ReactNode;
  limits?: ReactNode[];
  className?: string;
}

const levelTone = {
  low: "danger",
  medium: "warning",
  high: "success"
} as const;

export function ConfidencePanel({ title, level, reason, limits = [], className }: ConfidencePanelProps) {
  return (
    <section className={cn("gui-confidence-panel", className)} data-level={level}>
      <header>
        <div>
          <h2>{title}</h2>
          <p>{reason}</p>
        </div>
        <Badge tone={levelTone[level]}>{level} confidence</Badge>
      </header>
      {limits.length ? (
        <ul>
          {limits.map((limit, index) => (
            <li key={index}>{limit}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
