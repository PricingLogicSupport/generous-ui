import { useMemo } from "react";
import type { InputHTMLAttributes } from "react";
import { CalendarMonth } from "./calendar-month";
import { cn } from "../lib/cn";

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateValue(value?: string) {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> {
  label: string;
  description?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  showCalendar?: boolean;
  calendarMonth?: Date;
}

export function DatePicker({
  label,
  description,
  value,
  onValueChange,
  showCalendar = false,
  calendarMonth,
  className,
  ...props
}: DatePickerProps) {
  const selectedDate = useMemo(() => fromDateValue(value), [value]);
  const month = calendarMonth ?? selectedDate ?? new Date();

  return (
    <div className={cn("gui-date-picker", className)}>
      <label className="gui-temporal-field">
        <span>{label}</span>
        {description ? <small>{description}</small> : null}
        <input
          type="date"
          className="gui-temporal-input"
          value={value ?? ""}
          onChange={(event) => onValueChange?.(event.currentTarget.value)}
          {...props}
        />
      </label>
      {showCalendar ? (
        <CalendarMonth
          month={month}
          selectedDate={selectedDate}
          onDateSelect={(date) => onValueChange?.(toDateValue(date))}
        />
      ) : null}
    </div>
  );
}
