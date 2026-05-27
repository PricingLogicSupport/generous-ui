import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

export function ButtonGroup({ label, children, className, ...props }: ButtonGroupProps) {
  return (
    <div className={cn("gui-button-group", className)} role="group" aria-label={label} {...props}>
      {children}
    </div>
  );
}
