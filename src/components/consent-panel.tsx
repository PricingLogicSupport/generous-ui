import { useId } from "react";
import type { ReactNode } from "react";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";
import { cn } from "../lib/cn";

export interface ConsentItem {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  required?: boolean;
}

export interface ConsentPanelProps {
  title: string;
  description?: ReactNode;
  items: ConsentItem[];
  onItemChange: (id: string, checked: boolean) => void;
  className?: string;
}

export function ConsentPanel({ title, description, items, onItemChange, className }: ConsentPanelProps) {
  const generatedId = useId();

  return (
    <section className={cn("gui-consent-panel", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <div className="gui-consent-items">
        {items.map((item) => {
          const inputId = `${generatedId}-${item.id}`;
          return (
            <div className="gui-consent-item" key={item.id}>
              <Checkbox
                id={inputId}
                checked={item.checked}
                onChange={(event) => onItemChange(item.id, event.currentTarget.checked)}
              />
              <label htmlFor={inputId}>
                <span>
                  <strong>{item.label}</strong>
                  {item.required ? <Badge tone="warning">Required</Badge> : null}
                </span>
                {item.description ? <small>{item.description}</small> : null}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
