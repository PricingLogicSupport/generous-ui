export interface SegmentItem {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  label: string;
  value: string;
  items: SegmentItem[];
  onValueChange: (value: string) => void;
}

export function SegmentedControl({ label, value, items, onValueChange }: SegmentedControlProps) {
  return (
    <div className="gui-segmented" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={item.value === value}
          onClick={() => onValueChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
