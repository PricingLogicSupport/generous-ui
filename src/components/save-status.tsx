import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export type SaveStatusState = "idle" | "unsaved" | "saving" | "saved" | "error";

const labels: Record<SaveStatusState, string> = {
  idle: "No changes yet",
  unsaved: "Unsaved changes",
  saving: "Saving changes",
  saved: "Changes saved",
  error: "Could not save changes"
};

export interface SaveStatusProps {
  state: SaveStatusState;
  message?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function SaveStatus({ state, message, action, className }: SaveStatusProps) {
  return (
    <section className={cn("gui-save-status", className)} data-state={state} role="status" aria-live="polite">
      <div>
        <strong>{labels[state]}</strong>
        {message ? <p>{message}</p> : null}
      </div>
      {action ? <Button onClick={action.onClick}>{action.label}</Button> : null}
    </section>
  );
}
