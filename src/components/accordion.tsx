import { useState } from "react";
import type { ReactNode } from "react";

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  allowCollapse?: boolean;
}

export function Accordion({
  items,
  defaultValue,
  value,
  onValueChange,
  allowCollapse = true
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const currentValue = value ?? internalValue;

  function toggle(nextValue: string) {
    const newValue = allowCollapse && currentValue === nextValue ? undefined : nextValue;
    setInternalValue(newValue);
    onValueChange?.(newValue);
  }

  return (
    <div className="gui-accordion">
      {items.map((item) => {
        const open = item.value === currentValue;
        return (
          <section className="gui-accordion-item" data-open={open || undefined} key={item.value}>
            <button
              type="button"
              className="gui-accordion-trigger"
              aria-expanded={open}
              onClick={() => toggle(item.value)}
            >
              <span>{item.title}</span>
              <span aria-hidden="true">{open ? "−" : "+"}</span>
            </button>
            {open ? <div className="gui-accordion-content">{item.content}</div> : null}
          </section>
        );
      })}
    </div>
  );
}
