import { forwardRef } from "react";
import type { ForwardedRef, InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

interface BaseTemporalFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export interface DateFieldProps extends BaseTemporalFieldProps {}
export interface TimeFieldProps extends BaseTemporalFieldProps {}

function TemporalField({
  label,
  description,
  type,
  className,
  ...props
}: BaseTemporalFieldProps & { type: "date" | "time" }, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <label className="gui-temporal-field">
      <span>{label}</span>
      {description ? <small>{description}</small> : null}
      <input ref={ref} type={type} className={cn("gui-temporal-input", className)} {...props} />
    </label>
  );
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>((props, ref) =>
  TemporalField({ ...props, type: "date" }, ref)
);

DateField.displayName = "DateField";

export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>((props, ref) =>
  TemporalField({ ...props, type: "time" }, ref)
);

TimeField.displayName = "TimeField";
