import type { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export interface ActivityLogItem {
  title: string;
  description?: ReactNode;
  time: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}

export interface ActivityLogProps {
  title: string;
  items: ActivityLogItem[];
  className?: string;
}

export function ActivityLog({ title, items, className }: ActivityLogProps) {
  return (
    <section className={cn("gui-activity-log", className)}>
      <h2>{title}</h2>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`}>
            <div>
              <strong>{item.title}</strong>
              {item.description ? <p>{item.description}</p> : null}
            </div>
            <Badge tone={item.tone ?? "neutral"}>{item.time}</Badge>
          </li>
        ))}
      </ol>
    </section>
  );
}
