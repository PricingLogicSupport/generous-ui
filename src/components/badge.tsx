import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return <span className={cn("gui-badge", className)} data-tone={tone} {...props} />;
}
