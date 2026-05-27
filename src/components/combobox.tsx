import { useMemo, useState } from "react";
import { Input } from "./input";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  label: string;
  value: string;
  options: ComboboxOption[];
  onValueChange: (value: string) => void;
}

export function Combobox({ label, value, options, onValueChange }: ComboboxProps) {
  const [query, setQuery] = useState("");
  const selected = options.find((option) => option.value === value);
  const visibleOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query]);

  return (
    <div className="gui-combobox">
      <label>{label}</label>
      <Input
        role="combobox"
        aria-expanded="true"
        value={query || selected?.label || ""}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <div role="listbox">
        {visibleOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={option.value === value}
            onClick={() => {
              onValueChange(option.value);
              setQuery("");
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
