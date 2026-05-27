import type { ReactNode } from "react";

export interface SummaryCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export function SummaryCard({ title, action, children }: SummaryCardProps) {
  return (
    <section className="gui-summary-card">
      <header>
        <h2>{title}</h2>
        {action ? <div>{action}</div> : null}
      </header>
      <div>{children}</div>
    </section>
  );
}
