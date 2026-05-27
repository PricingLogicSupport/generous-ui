import { useMemo, useRef } from "react";

export interface OtpInputProps {
  label: string;
  value: string;
  length?: number;
  onValueChange: (value: string) => void;
}

export function OtpInput({ label, value, length = 6, onValueChange }: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = useMemo(() => Array.from({ length }, (_, index) => value[index] ?? ""), [length, value]);

  function updateAt(index: number, next: string) {
    const clean = next.replace(/\D/g, "").slice(-1);
    const parts = [...chars];
    parts[index] = clean;
    onValueChange(parts.join("").slice(0, length));
    if (clean && index < length - 1) refs.current[index + 1]?.focus();
  }

  return (
    <fieldset className="gui-otp">
      <legend>{label}</legend>
      <div>
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(node) => {
              refs.current[index] = node;
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label={`${label} digit ${index + 1}`}
            value={char}
            maxLength={1}
            onChange={(event) => updateAt(index, event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !chars[index] && index > 0) refs.current[index - 1]?.focus();
            }}
            onPaste={(event) => {
              event.preventDefault();
              const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
              onValueChange(pasted);
              refs.current[Math.min(pasted.length, length - 1)]?.focus();
            }}
          />
        ))}
      </div>
    </fieldset>
  );
}
