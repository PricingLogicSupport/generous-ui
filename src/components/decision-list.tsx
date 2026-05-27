import type { ReactNode } from "react";

export interface DecisionItem {
  value: string;
  title: string;
  description?: string;
  meta?: ReactNode;
}

export interface DecisionListProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: DecisionItem[];
}

export function DecisionList({ label, value, onValueChange, items }: DecisionListProps) {
  return (
    <fieldset className="gui-decision-list">
      <legend>{label}</legend>
      <div className="gui-decision-options">
        {items.map((item) => {
          const selected = item.value === value;
          return (
            <label className="gui-decision" data-selected={selected || undefined} key={item.value}>
              <input
                type="radio"
                name={label}
                value={item.value}
                checked={selected}
                onChange={() => onValueChange(item.value)}
              />
              <span className="gui-decision-marker" aria-hidden="true" />
              <span className="gui-decision-copy">
                <strong>{item.title}</strong>
                {item.description ? <small>{item.description}</small> : null}
              </span>
              {item.meta ? <span className="gui-decision-meta">{item.meta}</span> : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
