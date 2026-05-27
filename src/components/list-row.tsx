import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ListRowProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function ListRow({ title, description, leading, trailing, className, ...props }: ListRowProps) {
  return (
    <div className={cn("gui-list-row", className)} {...props}>
      {leading ? <div className="gui-list-leading">{leading}</div> : null}
      <div className="gui-list-copy">
        <strong>{title}</strong>
        {description ? <span>{description}</span> : null}
      </div>
      {trailing ? <div className="gui-list-trailing">{trailing}</div> : null}
    </div>
  );
}
