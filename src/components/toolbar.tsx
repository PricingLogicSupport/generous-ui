import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Toolbar({ title, description, leading, trailing, children, className, ...props }: ToolbarProps) {
  return (
    <div className={cn("gui-toolbar", className)} {...props}>
      <div className="gui-toolbar-main">
        {leading ? <div className="gui-toolbar-leading">{leading}</div> : null}
        {title || description ? (
          <div className="gui-toolbar-copy">
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
        ) : null}
      </div>
      {children ? <div className="gui-toolbar-controls">{children}</div> : null}
      {trailing ? <div className="gui-toolbar-trailing">{trailing}</div> : null}
    </div>
  );
}
