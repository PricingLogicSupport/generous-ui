import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  checked,
  onCheckedChange,
  className,
  disabled,
  onClick,
  type = "button",
  ...props
}: SwitchProps) {
  return (
    <button
      type={type}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cn("gui-switch", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onCheckedChange?.(!checked);
      }}
      {...props}
    >
      <span aria-hidden="true" />
    </button>
  );
}

export interface SwitchFieldProps extends SwitchProps {
  label: string;
  description?: string;
}

export function SwitchField({ label, description, ...props }: SwitchFieldProps) {
  return (
    <div className="gui-switch-field">
      <div className="gui-switch-copy">
        <span>{label}</span>
        {description ? <small>{description}</small> : null}
      </div>
      <Switch aria-label={label} {...props} />
    </div>
  );
}
