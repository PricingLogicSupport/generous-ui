import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
}

export function Progress({ value, max = 100, label, className, ...props }: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const percent = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div className={cn("gui-progress", className)} {...props}>
      {label ? (
        <div className="gui-progress-label">
          <span>{label}</span>
          <strong>{Math.round(percent)}%</strong>
        </div>
      ) : null}
      <div
        className="gui-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={value}
        aria-label={label}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
