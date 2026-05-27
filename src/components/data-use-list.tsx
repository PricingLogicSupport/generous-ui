import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface DataUseItem {
  data: ReactNode;
  purpose: ReactNode;
  retention: ReactNode;
}

export interface DataUseListProps {
  title: string;
  description?: ReactNode;
  items: DataUseItem[];
  className?: string;
}

export function DataUseList({ title, description, items, className }: DataUseListProps) {
  return (
    <section className={cn("gui-data-use-list", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <div className="gui-data-use-table" role="table" aria-label={title}>
        <div role="row">
          <strong role="columnheader">Data</strong>
          <strong role="columnheader">Purpose</strong>
          <strong role="columnheader">Retention</strong>
        </div>
        {items.map((item, index) => (
          <div role="row" key={index}>
            <span role="cell">{item.data}</span>
            <span role="cell">{item.purpose}</span>
            <span role="cell">{item.retention}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
