import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ChoiceTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  icon?: ReactNode;
  selected?: boolean;
}

export const ChoiceTile = forwardRef<HTMLButtonElement, ChoiceTileProps>(
  ({ title, description, icon, selected = false, className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn("gui-choice-tile", className)}
        data-selected={selected || undefined}
        aria-pressed={selected}
        {...props}
      >
        <span className="gui-choice-marker" aria-hidden="true" />
        {icon ? <span className="gui-choice-icon">{icon}</span> : null}
        <span className="gui-choice-copy">
          <strong>{title}</strong>
          <span>{description}</span>
        </span>
      </button>
    );
  }
);

ChoiceTile.displayName = "ChoiceTile";
