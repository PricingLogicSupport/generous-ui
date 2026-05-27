import type { ReactNode } from "react";

export interface DescriptionItem {
  term: string;
  detail: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
}

export function DescriptionList({ items }: DescriptionListProps) {
  return (
    <dl className="gui-description-list">
      {items.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
