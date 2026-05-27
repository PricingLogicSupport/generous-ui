import { cloneElement, forwardRef, isValidElement, useId } from "react";
import type { InputHTMLAttributes, ReactElement, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, dir = "auto", ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn("gui-input", className)}
        dir={dir}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid = false, dir = "auto", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn("gui-input gui-textarea", className)}
        dir={dir}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, description, error, children }: FormFieldProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const control =
    isValidElement(children) && typeof children.type !== "string"
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          "aria-describedby": describedBy,
          invalid: Boolean(error)
        })
      : children;

  return (
    <label className="gui-field">
      <span className="gui-field-label">{label}</span>
      {description ? (
        <span id={descriptionId} className="gui-field-description">
          {description}
        </span>
      ) : null}
      <span className="gui-field-control">{control}</span>
      {error ? (
        <span id={errorId} className="gui-field-error">
          {error}
        </span>
      ) : null}
    </label>
  );
}
