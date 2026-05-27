import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface NavigationMenuItem {
  label: ReactNode;
  description?: ReactNode;
  href?: string;
  current?: boolean;
  onClick?: () => void;
}

export interface NavigationMenuProps {
  label: string;
  items: NavigationMenuItem[];
  className?: string;
}

export function NavigationMenu({ label, items, className }: NavigationMenuProps) {
  return (
    <nav className={cn("gui-navigation-menu", className)} aria-label={label}>
      {items.map((item, index) => {
        const key = typeof item.label === "string" ? item.label : index;
        const content = (
          <>
            <strong>{item.label}</strong>
            {item.description ? <span>{item.description}</span> : null}
          </>
        );
        const sharedProps = {
          className: "gui-navigation-menu-item",
          "aria-current": item.current ? ("page" as const) : undefined
        };

        return item.href ? (
          <a key={key} href={item.href} onClick={item.onClick} {...sharedProps}>
            {content}
          </a>
        ) : (
          <button key={key} type="button" onClick={item.onClick} {...sharedProps}>
            {content}
          </button>
        );
      })}
    </nav>
  );
}
