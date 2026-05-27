import type { ReactNode } from "react";

export interface FieldGroupProps {
  legend: string;
  description?: string;
  children: ReactNode;
}

export function FieldGroup({ legend, description, children }: FieldGroupProps) {
  return (
    <fieldset className="gui-field-group">
      <legend>{legend}</legend>
      {description ? <p>{description}</p> : null}
      <div>{children}</div>
    </fieldset>
  );
}
