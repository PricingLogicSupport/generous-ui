import type { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export interface EvidenceItem {
  title: ReactNode;
  detail?: ReactNode;
  source?: ReactNode;
  strength?: "weak" | "medium" | "strong";
}

export interface EvidenceListProps {
  title: string;
  description?: ReactNode;
  evidence: EvidenceItem[];
  className?: string;
}

const strengthTone = {
  weak: "danger",
  medium: "warning",
  strong: "success"
} as const;

export function EvidenceList({ title, description, evidence, className }: EvidenceListProps) {
  return (
    <section className={cn("gui-evidence-list", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <ol>
        {evidence.map((item, index) => (
          <li key={index}>
            <div>
              <strong>{item.title}</strong>
              {item.detail ? <p>{item.detail}</p> : null}
              {item.source ? <small>{item.source}</small> : null}
            </div>
            {item.strength ? <Badge tone={strengthTone[item.strength]}>{item.strength}</Badge> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
