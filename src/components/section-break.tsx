import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SectionBreakProps extends HTMLAttributes<HTMLHRElement> {
  weight?: "normal" | "strong";
}

export function SectionBreak({ weight = "strong", className, ...props }: SectionBreakProps) {
  return <hr className={cn("gui-section-break", `gui-section-break-${weight}`, className)} {...props} />;
}
