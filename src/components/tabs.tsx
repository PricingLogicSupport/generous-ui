import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  label: string;
}

export function Tabs({ items, defaultValue, value, onValueChange, label }: TabsProps) {
  const id = useId();
  const firstValue = items[0]?.value ?? "";
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstValue);
  const currentValue = value ?? internalValue;
  const selectedItem = useMemo(
    () => items.find((item) => item.value === currentValue) ?? items[0],
    [currentValue, items]
  );

  function select(nextValue: string) {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <div className="gui-tabs">
      <div className="gui-tab-list" role="tablist" aria-label={label}>
        {items.map((item) => {
          const selected = item.value === selectedItem?.value;
          return (
            <button
              key={item.value}
              id={`${id}-${item.value}-tab`}
              type="button"
              className="gui-tab"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-${item.value}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selectedItem ? (
        <div
          id={`${id}-${selectedItem.value}-panel`}
          className="gui-tab-panel"
          role="tabpanel"
          aria-labelledby={`${id}-${selectedItem.value}-tab`}
        >
          {selectedItem.content}
        </div>
      ) : null}
    </div>
  );
}
