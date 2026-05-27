import type { ImgHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ name, size = "md", src, alt, className, ...props }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className={cn("gui-avatar", `gui-avatar-${size}`, className)} title={name}>
      {src ? <img src={src} alt={alt ?? name} {...props} /> : <span aria-hidden="true">{initials}</span>}
      <span className="gui-sr-only">{name}</span>
    </span>
  );
}
