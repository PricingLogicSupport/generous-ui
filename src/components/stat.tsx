import type { ReactNode } from "react";

export interface StatProps {
  label: string;
  value: ReactNode;
  description?: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}

export function Stat({ label, value, description, tone = "neutral" }: StatProps) {
  return (
    <div className="gui-stat" data-tone={tone}>
      <span>{label}</span>
      <strong>{value}</strong>
      {description ? <small>{description}</small> : null}
    </div>
  );
}
