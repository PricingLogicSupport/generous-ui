import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, invalid = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        aria-invalid={invalid || undefined}
        className={cn("gui-checkbox-input", className)}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface CheckboxFieldProps extends CheckboxProps {
  label: string;
  description?: string;
}

export function CheckboxField({ label, description, id, className, ...props }: CheckboxFieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const descriptionId = description ? `${controlId}-description` : undefined;

  return (
    <div className="gui-check-field">
      <Checkbox id={controlId} aria-describedby={descriptionId} className={className} {...props} />
      <label className="gui-check-copy" htmlFor={controlId}>
        <span>{label}</span>
        {description ? <small id={descriptionId}>{description}</small> : null}
      </label>
    </div>
  );
}
