import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface KbdProps extends HTMLAttributes<HTMLElement> {}

export function Kbd({ className, ...props }: KbdProps) {
  return <kbd className={cn("gui-kbd", className)} {...props} />;
}
