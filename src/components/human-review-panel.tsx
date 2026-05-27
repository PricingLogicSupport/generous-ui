import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export interface HumanReviewPanelProps {
  title: string;
  message: ReactNode;
  reviewer?: ReactNode;
  action: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function HumanReviewPanel({
  title,
  message,
  reviewer,
  action,
  secondaryAction,
  className
}: HumanReviewPanelProps) {
  return (
    <section className={cn("gui-human-review-panel", className)}>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        {reviewer ? <small>{reviewer}</small> : null}
      </div>
      <div className="gui-human-review-actions">
        <Button onClick={action.onClick}>{action.label}</Button>
        {secondaryAction ? <Button onClick={secondaryAction.onClick}>{secondaryAction.label}</Button> : null}
      </div>
    </section>
  );
}
