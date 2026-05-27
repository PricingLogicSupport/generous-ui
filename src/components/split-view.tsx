import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { cn } from "../lib/cn";

export interface SplitViewProps {
  primary: ReactNode;
  secondary: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryWidth?: string;
  reverse?: boolean;
  className?: string;
}

export function SplitView({
  primary,
  secondary,
  primaryLabel = "Primary panel",
  secondaryLabel = "Secondary panel",
  secondaryWidth = "320px",
  reverse = false,
  className
}: SplitViewProps) {
  return (
    <div
      className={cn("gui-split-view", className)}
      data-reverse={reverse || undefined}
      style={{ "--gui-split-secondary": secondaryWidth } as CSSProperties}
    >
      <section aria-label={primaryLabel} className="gui-split-primary">
        {primary}
      </section>
      <aside aria-label={secondaryLabel} className="gui-split-secondary">
        {secondary}
      </aside>
    </div>
  );
}
