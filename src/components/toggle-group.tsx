export interface ToggleItem {
  value: string;
  label: string;
}

export interface ToggleGroupProps {
  label: string;
  values: string[];
  items: ToggleItem[];
  onValuesChange: (values: string[]) => void;
}

export function ToggleGroup({ label, values, items, onValuesChange }: ToggleGroupProps) {
  function toggle(value: string) {
    onValuesChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  return (
    <div className="gui-toggle-group" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={values.includes(item.value)}
          onClick={() => toggle(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
