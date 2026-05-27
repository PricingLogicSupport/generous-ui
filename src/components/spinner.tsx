import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

export function Spinner({ label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <span className={cn("gui-spinner", className)} role="status" aria-label={label} {...props}>
      <span aria-hidden="true" />
    </span>
  );
}
