import type { ReactNode } from "react";

export interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="gui-tooltip">
      {children}
      <span className="gui-tooltip-bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}
