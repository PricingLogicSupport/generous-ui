import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "quiet";
type ButtonSize = "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn("gui-button", `gui-button-${variant}`, `gui-button-${size}`, className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: Extract<ButtonVariant, "secondary" | "quiet" | "danger">;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "quiet", type = "button", title, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        title={title ?? props["aria-label"]}
        className={cn("gui-icon-button", `gui-button-${variant}`, className)}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";
