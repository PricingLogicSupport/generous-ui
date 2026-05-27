import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio: string;
  children?: ReactNode;
}

export function AspectRatio({ ratio, children, className, style, ...props }: AspectRatioProps) {
  return (
    <div
      className={cn("gui-aspect-ratio", className)}
      style={{ "--gui-aspect-ratio": ratio, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
