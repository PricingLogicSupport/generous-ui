import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ label, className, dir = "auto", ...props }, ref) => {
    return (
      <label className="gui-search-field">
        <span className="gui-sr-only">{label}</span>
        <input ref={ref} type="search" className={cn("gui-search-input", className)} dir={dir} {...props} />
      </label>
    );
  }
);

SearchField.displayName = "SearchField";
