import type { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export type QualityStatus = "pass" | "review" | "fail";

export interface QualityCheckItem {
  label: ReactNode;
  description?: ReactNode;
  status: QualityStatus;
}

export interface QualityChecklistProps {
  title: string;
  description?: ReactNode;
  items: QualityCheckItem[];
  className?: string;
}

const qualityTone: Record<QualityStatus, "success" | "warning" | "danger"> = {
  pass: "success",
  review: "warning",
  fail: "danger"
};

const qualityLabel: Record<QualityStatus, string> = {
  pass: "Pass",
  review: "Review",
  fail: "Fail"
};

export function QualityChecklist({ title, description, items, className }: QualityChecklistProps) {
  return (
    <section className={cn("gui-quality-checklist", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <ul>
        {items.map((item, index) => (
          <li key={index} data-status={item.status}>
            <div>
              <strong>{item.label}</strong>
              {item.description ? <p>{item.description}</p> : null}
            </div>
            <Badge tone={qualityTone[item.status]}>{qualityLabel[item.status]}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
