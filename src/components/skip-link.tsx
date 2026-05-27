import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}

export function SkipLink({ children = "Skip to main content", className, href = "#main-content", ...props }: SkipLinkProps) {
  return (
    <a href={href} className={cn("gui-skip-link", className)} {...props}>
      {children}
    </a>
  );
}
