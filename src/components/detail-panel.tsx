import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface DetailPanelProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function DetailPanel({ title, description, children, action, className }: DetailPanelProps) {
  return (
    <section className={cn("gui-detail-panel", className)}>
      <header>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action ? <div className="gui-detail-panel-action">{action}</div> : null}
      </header>
      <div className="gui-detail-panel-body">{children}</div>
    </section>
  );
}
