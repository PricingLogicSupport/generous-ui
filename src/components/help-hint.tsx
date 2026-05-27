import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface HelpHintProps {
  label?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function HelpHint({ label = "Help", title, children, className }: HelpHintProps) {
  return (
    <details className={cn("gui-help-hint", className)}>
      <summary>{label}</summary>
      <div className="gui-help-hint-panel">
        {title ? <h2>{title}</h2> : null}
        <div>{children}</div>
      </div>
    </details>
  );
}
