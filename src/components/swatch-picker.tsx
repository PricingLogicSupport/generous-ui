export interface SwatchOption {
  value: string;
  label: string;
}

export interface SwatchPickerProps {
  label: string;
  value: string;
  options: SwatchOption[];
  onValueChange: (value: string) => void;
}

export function SwatchPicker({ label, value, options, onValueChange }: SwatchPickerProps) {
  return (
    <div className="gui-swatch-picker" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onValueChange(option.value)}
        >
          <span style={{ background: option.value }} aria-hidden="true" />
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
