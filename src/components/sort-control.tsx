import { useId } from "react";
import { Select } from "./select";
import { cn } from "../lib/cn";

export interface SortOption {
  value: string;
  label: string;
}

export interface SortControlProps {
  label: string;
  value: string;
  options: SortOption[];
  onValueChange: (value: string) => void;
  className?: string;
}

export function SortControl({ label, value, options, onValueChange, className }: SortControlProps) {
  const id = useId();

  return (
    <div className={cn("gui-sort-control", className)}>
      <label htmlFor={id}>{label}</label>
      <Select id={id} value={value} onChange={(event) => onValueChange(event.currentTarget.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
