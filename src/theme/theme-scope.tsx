import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type Density = "comfortable" | "compact";

export interface ThemeScopeProps extends HTMLAttributes<HTMLDivElement> {
  accent?: string;
  radius?: number | string;
  density?: Density;
  direction?: "ltr" | "rtl";
  children: ReactNode;
}

export function ThemeScope({
  accent,
  radius,
  density = "comfortable",
  direction,
  className,
  style,
  children,
  ...props
}: ThemeScopeProps) {
  const customStyle = {
    ...style,
    ...(accent ? { "--gui-accent": accent } : null),
    ...(radius !== undefined
      ? { "--gui-radius-md": typeof radius === "number" ? `${radius}px` : radius }
      : null)
  } as CSSProperties;

  return (
    <div
      className={cn("gui-theme", `gui-density-${density}`, className)}
      dir={direction}
      data-direction={direction}
      style={customStyle}
      {...props}
    >
      {children}
    </div>
  );
}
