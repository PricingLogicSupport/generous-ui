import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface FileDropProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export const FileDrop = forwardRef<HTMLInputElement, FileDropProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <label className={cn("gui-file-drop", className)} htmlFor={inputId}>
        <span>
          <strong>{label}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        <input ref={ref} id={inputId} type="file" {...props} />
      </label>
    );
  }
);

FileDrop.displayName = "FileDrop";
