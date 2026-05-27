import { Button } from "./button";
import { cn } from "../lib/cn";

export interface FilterSummaryItem {
  id: string;
  label: string;
  value?: string;
}

export interface FilterSummaryProps {
  label?: string;
  filters: FilterSummaryItem[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterSummary({
  label = "Active filters",
  filters,
  onRemove,
  onClearAll,
  className
}: FilterSummaryProps) {
  if (!filters.length) {
    return null;
  }

  return (
    <section className={cn("gui-filter-summary", className)} aria-label={label}>
      <strong>{label}</strong>
      <div className="gui-filter-summary-list">
        {filters.map((filter) => (
          <button key={filter.id} type="button" onClick={() => onRemove(filter.id)}>
            <span>{filter.label}</span>
            {filter.value ? <em>{filter.value}</em> : null}
            <b aria-hidden="true">x</b>
          </button>
        ))}
      </div>
      {onClearAll ? <Button onClick={onClearAll}>Clear all</Button> : null}
    </section>
  );
}
