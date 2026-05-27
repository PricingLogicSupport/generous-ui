import type { ReactNode } from "react";

export interface TimelineItem {
  title: string;
  time?: string;
  description?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="gui-timeline">
      {items.map((item) => (
        <li key={`${item.title}-${item.time ?? ""}`}>
          <span className="gui-timeline-marker" aria-hidden="true" />
          <div>
            <strong>{item.title}</strong>
            {item.time ? <time>{item.time}</time> : null}
            {item.description ? <p>{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
