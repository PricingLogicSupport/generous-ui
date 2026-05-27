import type { ReactNode } from "react";

export interface ActionBarProps {
  children: ReactNode;
  secondary?: ReactNode;
}

export function ActionBar({ children, secondary }: ActionBarProps) {
  return (
    <div className="gui-action-bar">
      <div className="gui-action-bar-secondary">{secondary}</div>
      <div className="gui-action-bar-primary">{children}</div>
    </div>
  );
}
