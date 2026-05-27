import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface MediaSlotProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio: string;
  children?: ReactNode;
}

export function MediaSlot({ aspectRatio, className, style, children, ...props }: MediaSlotProps) {
  return (
    <div
      className={cn("gui-media-slot", className)}
      style={{ "--gui-media-ratio": aspectRatio, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
