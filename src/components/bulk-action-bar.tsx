import { Button } from "./button";
import { cn } from "../lib/cn";

export interface BulkAction {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface BulkActionBarProps {
  selectedCount: number;
  itemLabel?: string;
  actions: BulkAction[];
  onClearSelection?: () => void;
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  itemLabel = "item",
  actions,
  onClearSelection,
  className
}: BulkActionBarProps) {
  if (selectedCount <= 0) {
    return null;
  }

  const label = selectedCount === 1 ? itemLabel : `${itemLabel}s`;

  return (
    <section className={cn("gui-bulk-action-bar", className)} aria-label="Bulk actions">
      <strong>
        {selectedCount} {label} selected
      </strong>
      <div className="gui-bulk-actions">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.destructive ? "danger" : "secondary"}
            disabled={action.disabled}
            onClick={action.onSelect}
          >
            {action.label}
          </Button>
        ))}
        {onClearSelection ? <Button onClick={onClearSelection}>Clear selection</Button> : null}
      </div>
    </section>
  );
}
