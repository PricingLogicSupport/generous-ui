import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Button } from "./button";
import { Input } from "./input";

export interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function PasswordField({ label, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="gui-password-field">
      <span>{label}</span>
      <span>
        <Input type={visible ? "text" : "password"} {...props} />
        <Button onClick={() => setVisible((value) => !value)}>{visible ? "Hide" : "Show"}</Button>
      </span>
    </label>
  );
}
