import type { ReactNode } from "react";
import { Checkbox } from "./checkbox";
import { cn } from "../lib/cn";

export interface SelectionListItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  disabled?: boolean;
}

export interface SelectionListProps {
  label: string;
  items: SelectionListItem[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  className?: string;
}

export function SelectionList({ label, items, selectedIds, onSelectionChange, className }: SelectionListProps) {
  function toggle(id: string, checked: boolean) {
    onSelectionChange(checked ? [...selectedIds, id] : selectedIds.filter((selectedId) => selectedId !== id));
  }

  return (
    <section className={cn("gui-selection-list", className)} aria-label={label}>
      {items.map((item) => {
        const checked = selectedIds.includes(item.id);
        const controlId = `${item.id}-selection`;
        return (
          <div key={item.id} className="gui-selection-row" data-selected={checked || undefined}>
            <Checkbox
              id={controlId}
              checked={checked}
              disabled={item.disabled}
              onChange={(event) => toggle(item.id, event.currentTarget.checked)}
            />
            <label htmlFor={controlId}>
              <strong>{item.title}</strong>
              {item.description ? <span>{item.description}</span> : null}
            </label>
            {item.meta ? <div className="gui-selection-meta">{item.meta}</div> : null}
          </div>
        );
      })}
    </section>
  );
}
