import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export interface CopyFieldProps {
  label: string;
  value: string;
}

export function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <label className="gui-copy-field">
      <span>{label}</span>
      <span>
        <Input readOnly value={value} />
        <Button onClick={copyValue}>{copied ? "Copied" : "Copy"}</Button>
      </span>
    </label>
  );
}
