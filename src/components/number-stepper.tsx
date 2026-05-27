import { Button } from "./button";
import { Input } from "./input";

export interface NumberStepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
}

export function NumberStepper({ label, value, min, max, step = 1, onValueChange }: NumberStepperProps) {
  function clamp(next: number) {
    if (min !== undefined && next < min) return min;
    if (max !== undefined && next > max) return max;
    return next;
  }

  return (
    <div className="gui-number-stepper">
      <label>{label}</label>
      <div>
        <Button disabled={min !== undefined && value <= min} onClick={() => onValueChange(clamp(value - step))}>
          Lower
        </Button>
        <Input
          inputMode="numeric"
          value={value}
          onChange={(event) => onValueChange(clamp(Number(event.currentTarget.value) || 0))}
        />
        <Button disabled={max !== undefined && value >= max} onClick={() => onValueChange(clamp(value + step))}>
          Raise
        </Button>
      </div>
    </div>
  );
}
