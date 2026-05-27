import { useId } from "react";
import { Textarea } from "./input";

export interface CharacterCountProps {
  label: string;
  value: string;
  maxLength: number;
  onValueChange: (value: string) => void;
}

export function CharacterCount({ label, value, maxLength, onValueChange }: CharacterCountProps) {
  const id = useId();
  const remaining = maxLength - value.length;
  const overLimit = remaining < 0;

  return (
    <label className="gui-character-count">
      <span>{label}</span>
      <Textarea
        id={id}
        value={value}
        aria-invalid={overLimit || undefined}
        aria-describedby={`${id}-count`}
        onChange={(event) => onValueChange(event.currentTarget.value)}
      />
      <small id={`${id}-count`} data-over-limit={overLimit || undefined}>
        {overLimit ? `${Math.abs(remaining)} characters too many` : `${remaining} characters remaining`}
      </small>
    </label>
  );
}
