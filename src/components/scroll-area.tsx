import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  maxHeight: number | string;
  children: ReactNode;
}

export function ScrollArea({ maxHeight, children, className, style, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cn("gui-scroll-area", className)}
      style={{
        "--gui-scroll-max-height": typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        ...style
      } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
