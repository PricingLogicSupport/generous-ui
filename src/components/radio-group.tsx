export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  label: string;
  value: string;
  options: RadioOption[];
  onValueChange: (value: string) => void;
}

export function RadioGroup({ label, value, options, onValueChange }: RadioGroupProps) {
  return (
    <fieldset className="gui-radio-group">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <label key={option.value} className="gui-radio-option">
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={option.value === value}
              onChange={() => onValueChange(option.value)}
            />
            <span className="gui-radio-marker" aria-hidden="true" />
            <span>
              <strong>{option.label}</strong>
              {option.description ? <small>{option.description}</small> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
