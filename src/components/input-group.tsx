import { cloneElement, isValidElement } from "react";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
  invalid?: boolean;
  children: ReactNode;
}

export function InputGroup({
  leading,
  trailing,
  invalid = false,
  children,
  className,
  ...props
}: InputGroupProps) {
  const control =
    isValidElement(children) && typeof children.type !== "string"
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          invalid,
          className: cn("gui-input-group-control", (children.props as { className?: string }).className)
        })
      : children;

  return (
    <div className={cn("gui-input-group", className)} data-invalid={invalid || undefined} {...props}>
      {leading ? <span className="gui-input-group-slot">{leading}</span> : null}
      <span className="gui-input-group-field">{control}</span>
      {trailing ? <span className="gui-input-group-slot">{trailing}</span> : null}
    </div>
  );
}
