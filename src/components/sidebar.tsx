import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SidebarItem {
  label: string;
  description?: string;
  current?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  title: string;
  description?: string;
  items: SidebarItem[];
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({ title, description, items, footer, className }: SidebarProps) {
  return (
    <aside className={cn("gui-sidebar", className)}>
      <header>
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </header>
      <nav aria-label={`${title} navigation`}>
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-current={item.current ? "page" : undefined}
            onClick={item.onClick}
          >
            <span>{item.label}</span>
            {item.description ? <small>{item.description}</small> : null}
          </button>
        ))}
      </nav>
      {footer ? <footer>{footer}</footer> : null}
    </aside>
  );
}
