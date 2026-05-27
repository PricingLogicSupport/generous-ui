import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ChangeReviewItem {
  label: ReactNode;
  before: ReactNode;
  after: ReactNode;
}

export interface ChangeReviewProps {
  title: ReactNode;
  description?: ReactNode;
  changes: ChangeReviewItem[];
  className?: string;
}

export function ChangeReview({ title, description, changes, className }: ChangeReviewProps) {
  return (
    <section className={cn("gui-change-review", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <dl>
        {changes.map((change, index) => (
          <div key={index}>
            <dt>{change.label}</dt>
            <dd>
              <span>{change.before}</span>
              <strong>{change.after}</strong>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
