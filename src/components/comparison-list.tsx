import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ComparisonFact {
  label: ReactNode;
  value: ReactNode;
}

export interface ComparisonItem {
  title: ReactNode;
  description?: ReactNode;
  facts?: ComparisonFact[];
  selected?: boolean;
  recommended?: boolean;
  action?: ReactNode;
}

export interface ComparisonListProps {
  label: string;
  items: ComparisonItem[];
  className?: string;
}

export function ComparisonList({ label, items, className }: ComparisonListProps) {
  return (
    <section className={cn("gui-comparison-list", className)} aria-label={label}>
      {items.map((item, index) => (
        <article key={index} data-selected={item.selected || undefined}>
          <header>
            <div>
              <h2>{item.title}</h2>
              {item.description ? <p>{item.description}</p> : null}
            </div>
            {item.recommended ? <span className="gui-comparison-marker">Recommended</span> : null}
          </header>
          {item.facts?.length ? (
            <dl>
              {item.facts.map((fact, factIndex) => (
                <div key={factIndex}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {item.action ? <div className="gui-comparison-action">{item.action}</div> : null}
        </article>
      ))}
    </section>
  );
}
