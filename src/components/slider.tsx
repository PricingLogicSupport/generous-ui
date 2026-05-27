import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(({ className, ...props }, ref) => {
  return <input ref={ref} type="range" className={cn("gui-slider", className)} {...props} />;
});

Slider.displayName = "Slider";

export interface SliderFieldProps extends SliderProps {
  label: string;
  valueLabel?: string;
  description?: string;
}

export function SliderField({ label, valueLabel, description, id, ...props }: SliderFieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <div className="gui-slider-field">
      <div className="gui-slider-heading">
        <label htmlFor={controlId}>{label}</label>
        {valueLabel ? <strong>{valueLabel}</strong> : null}
      </div>
      {description ? <p>{description}</p> : null}
      <Slider id={controlId} {...props} />
    </div>
  );
}
