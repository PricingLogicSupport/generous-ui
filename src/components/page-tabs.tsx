import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface PageTabItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
  onClick?: () => void;
}

export interface PageTabsProps {
  label: string;
  items: PageTabItem[];
  className?: string;
}

export function PageTabs({ label, items, className }: PageTabsProps) {
  return (
    <nav className={cn("gui-page-tabs", className)} aria-label={label}>
      {items.map((item, index) => {
        const key = typeof item.label === "string" ? item.label : index;
        const sharedProps = {
          className: "gui-page-tab",
          "aria-current": item.current ? "page" as const : undefined
        };

        return item.href ? (
          <a key={key} href={item.href} onClick={item.onClick} {...sharedProps}>
            {item.label}
          </a>
        ) : (
          <button key={key} type="button" onClick={item.onClick} {...sharedProps}>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
