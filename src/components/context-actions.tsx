import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export interface ContextAction {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface ContextActionsProps {
  label: string;
  subject: ReactNode;
  actions: ContextAction[];
  className?: string;
}

export function ContextActions({ label, subject, actions, className }: ContextActionsProps) {
  return (
    <section className={cn("gui-context-actions", className)} aria-label={label}>
      <div className="gui-context-subject">{subject}</div>
      <div className="gui-context-action-list">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.destructive ? "danger" : "secondary"}
            disabled={action.disabled}
            onClick={action.onSelect}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
