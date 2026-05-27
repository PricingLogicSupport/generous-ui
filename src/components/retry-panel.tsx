import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export interface RetryPanelProps {
  title: string;
  message: ReactNode;
  retryLabel?: string;
  onRetry: () => void;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function RetryPanel({
  title,
  message,
  retryLabel = "Try again",
  onRetry,
  secondaryAction,
  className
}: RetryPanelProps) {
  return (
    <section className={cn("gui-retry-panel", className)}>
      <div>
        <h2>{title}</h2>
        <div className="gui-retry-message">{message}</div>
      </div>
      <div className="gui-retry-actions">
        <Button onClick={onRetry}>{retryLabel}</Button>
        {secondaryAction ? <Button onClick={secondaryAction.onClick}>{secondaryAction.label}</Button> : null}
      </div>
    </section>
  );
}
