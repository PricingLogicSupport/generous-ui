import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
  children: ReactNode;
}

export function Heading({ level = 2, className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={cn("gui-heading", `gui-heading-${level}`, className)} {...props}>
      {children}
    </Tag>
  );
}

export interface ProseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Prose({ className, children, ...props }: ProseProps) {
  return (
    <div className={cn("gui-prose", className)} {...props}>
      {children}
    </div>
  );
}
