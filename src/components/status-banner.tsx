import type { ReactNode } from "react";
import { Button } from "./button";

export interface StatusBannerProps {
  title: string;
  message?: string;
  tone?: "neutral" | "success" | "warning" | "danger";
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function StatusBanner({ title, message, tone = "neutral", action, children }: StatusBannerProps) {
  return (
    <section className="gui-status-banner" data-tone={tone}>
      <div>
        <h2>{title}</h2>
        {message ? <p>{message}</p> : null}
        {children}
      </div>
      {action ? <Button onClick={action.onClick}>{action.label}</Button> : null}
    </section>
  );
}
