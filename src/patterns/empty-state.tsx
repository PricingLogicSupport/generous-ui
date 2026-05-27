import type { ReactNode } from "react";
import { Button } from "../components/button";
import type { ButtonProps } from "../components/button";

export interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps["variant"];
  };
  icon?: ReactNode;
}

export function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <section className="gui-empty-state">
      {icon ? <div className="gui-empty-icon">{icon}</div> : null}
      <div className="gui-empty-content">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
      {action ? (
        <Button variant={action.variant ?? "primary"} onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </section>
  );
}
