import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function ActionLink({ className, ...props }: ActionLinkProps) {
  return <a className={cn("gui-action-link", className)} {...props} />;
}
