import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, selected = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("gui-card", selected && "gui-card-selected", className)}
        data-selected={selected || undefined}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
