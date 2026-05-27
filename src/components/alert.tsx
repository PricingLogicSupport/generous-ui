import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  tone?: "neutral" | "success" | "warning" | "danger";
  action?: ReactNode;
  children: ReactNode;
}

export function Alert({ title, tone = "neutral", action, children, className, ...props }: AlertProps) {
  return (
    <div className={cn("gui-alert", className)} data-tone={tone} role={tone === "danger" ? "alert" : "status"} {...props}>
      <div className="gui-alert-copy">
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
      {action ? <div className="gui-alert-action">{action}</div> : null}
    </div>
  );
}
