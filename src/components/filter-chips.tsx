export interface FilterChip {
  value: string;
  label: string;
}

export interface FilterChipsProps {
  label: string;
  values: string[];
  chips: FilterChip[];
  onValuesChange: (values: string[]) => void;
}

export function FilterChips({ label, values, chips, onValuesChange }: FilterChipsProps) {
  function toggle(value: string) {
    onValuesChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  return (
    <div className="gui-filter-chips" aria-label={label}>
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          aria-pressed={values.includes(chip.value)}
          onClick={() => toggle(chip.value)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
