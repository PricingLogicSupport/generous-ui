import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface InsetNoticeProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export function InsetNotice({ title, children, action, className, ...props }: InsetNoticeProps) {
  return (
    <aside className={cn("gui-inset-notice", className)} {...props}>
      <div className="gui-inset-copy">
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
      {action ? <div className="gui-inset-action">{action}</div> : null}
    </aside>
  );
}
